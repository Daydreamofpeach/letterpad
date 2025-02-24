import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { queueSubscribeEmails } from "@/lib/redis";

import { MailStatus, PostStatusOptions } from "@/__generated__/__types__";

interface Base {
  post_id: number;
  author_id: number;
  to: string;
  title: string;
  excerpt: string;
  link: string;
  author_name: string;
  site_title: string;
  cover_image: string;
}
interface Subscribers extends Base {
  subscriber_id: number;
  __typename: "Subscribers";
}

interface Followers extends Base {
  follower_name: string;
  __typename: "Followers";
}

type Variables = Subscribers | Followers;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // return new Response("Unauthorized", {
    //   status: 401,
    // });
  }

  const authors = await prisma.author.findMany({
    include: {
      posts: {
        where: {
          status: PostStatusOptions.Published,
          mail_status: MailStatus.Active,
        },
      },
      subscribers: {
        where: {
          verified: true,
        },
      },
      followers: {
        include: {},
      },
      setting: {
        select: {
          site_url: true,
          site_title: true,
        },
      },
    },
  });

  const followerIds = Array.from(
    new Set(
      authors
        .map((author) =>
          author.followers.map((follower) => follower.follower_id)
        )
        .flat()
    )
  );
  const followers = await prisma.author.findMany({
    select: {
      email: true,
      id: true,
      name: true,
    },
    where: {
      id: {
        in: followerIds,
      },
    },
  });

  const followersMap = followers.reduce(
    (acc, obj) => {
      acc[obj.id] = obj;
      return acc;
    },
    {} as Record<number, (typeof followers)[0]>
  );

  const variables: Record<number, Variables[]> = [];
  authors.forEach((author) => {
    author.posts.forEach((post) => {
      if (!variables[post.id]) variables[post.id] = [];
      author.subscribers.forEach((subscriber) => {
        variables[post.id].push({
          author_id: author.id,
          post_id: post.id,
          to: subscriber.email,
          subscriber_id: subscriber.id,
          title: post.title,
          author_name: author.name,
          cover_image: post.cover_image,
          excerpt: post.excerpt ?? post.sub_title,
          site_title: author.setting?.site_title!,
          link: new URL(`/post/${post.slug}`, author.setting?.site_url).href,
          __typename: "Subscribers",
        });
      });
      author.followers.forEach((follower) => {
        variables[post.id].push({
          follower_name: followersMap[follower.follower_id].name,
          author_id: author.id,
          post_id: post.id,
          to: followersMap[follower.follower_id].email,
          title: post.title,
          author_name: author.name,
          cover_image: post.cover_image,
          excerpt: post.excerpt ?? post.sub_title,
          site_title: author.setting?.site_title!,
          link: new URL(`/post/${post.slug}`, author.setting?.site_url).href,
          __typename: "Followers",
        });
      });
    });
  });

  await Promise.all(
    Object.keys(variables).map(async (post_id) => {
      return queueSubscribeEmails(Number(post_id), variables[post_id]);
    })
  );

  return Response.json({ success: true });
}
