import { prisma } from "@/lib/prisma";

import {
  AddSubscriberDocument,
  CreateAuthorDocument,
  CreatePostDocument,
  ForgotPasswordDocument,
  UpdateAuthorDocument,
  UpdateSubscriberDocument,
} from "@/__generated__/queries/mutations.graphql";
import { EmailTemplates } from "@/graphql/types";
import { getToken } from "@/shared/token";

import { getEmailTemplate } from "./getTemplate";
import { API } from "../../../../tests/testClient";

describe("Email templates", () => {
  it("gets new post email template", async () => {
    const post = await API({
      query: CreatePostDocument,
      variables: {
        data: {
          title: "new-post-test",
          type: "post",
          cover_image: { src: "https://a.com/image.jpg" },
        },
      },
    });

    const subscriberEmail = "subscriber@test.com";
    await API({
      query: AddSubscriberDocument,
      variables: {
        email: subscriberEmail,
      },
    });
    await API({
      query: UpdateSubscriberDocument,
      variables: {
        data: {
          verified: true,
          secret_id: getToken({ data: { email: subscriberEmail } }),
        },
      },
    });
    const data = await getEmailTemplate(
      {
        template_id: EmailTemplates.NewPost,
        post_id: post.createPost.id,
      },
      prisma
    );
    if (data?.ok) {
      expect(data.content).toMatchInlineSnapshot(`
        {
          "html": "Hello Letterpad User, <br><br><strong>My new blog</strong> published a new post.<br><br><img src="https://a.com/image.jpg" width="100%"><br><h2>new-post-test</h2><br><br><br/><br><a target="_blank" class="btn" href="http://localhost:3000/post/new-post-test">Read More</a><br><br/><br><br>Cheers,<br>Robert Smith<br>",
          "subject": "My new blog - New Post",
          "to": [
            {
              "email": "subscriber@test.com",
              "id": 1,
            },
          ],
        }
      `);
    }
  });

  it("gets new subscriber verification email", async () => {
    const subscriberEmail = "subscriber@test.com";
    await API({
      query: AddSubscriberDocument,
      variables: { email: subscriberEmail },
    });
    const data = await getEmailTemplate(
      {
        template_id: EmailTemplates.VerifySubscriber,
        subscriber_id: 1,
        author_id: 2,
      },
      prisma
    );
    if (data?.ok) {
      data.content.html = removeToken(data.content.html);
      expect(data.content).toMatchInlineSnapshot();
    }
  });

  it("gets new subscriber verification success email", async () => {
    const subscriberEmail = "subscriber@test.com";
    await API({
      query: UpdateSubscriberDocument,
      variables: {
        data: {
          verified: true,
          secret_id: getToken({ data: { email: subscriberEmail } }),
        },
      },
    });
    const data = await getEmailTemplate(
      {
        template_id: EmailTemplates.SubscriberVerified,
        subscriber_id: 1,
        author_id: 2,
      },
      prisma
    );
    if (data?.ok) {
      expect(data.content).toMatchInlineSnapshot();
    }
  });

  it("gets new user verification email", async () => {
    const newUserEmail = "newuser@test.com";

    const resonse = await API({
      query: CreateAuthorDocument,
      variables: {
        data: {
          name: "foo",
          email: newUserEmail,
          password: "foofoofoo",
          username: "foo",
          setting: {
            site_title: "Test site title",
          },
          token: "this token wont be validated in test environment",
        },
      },
    });

    const data = await getEmailTemplate(
      {
        template_id: EmailTemplates.VerifyNewUser,
        author_id: resonse.createAuthor.id,
      },
      prisma
    );
    if (data?.ok) {
      data.content.html = removeToken(data.content.html);
      expect(data.content).toMatchInlineSnapshot(`
        {
          "html": "Hello foo, <br><br>You have used this email address while registering in <strong><a href="https://letterpad.app">Letterpad</a></strong>. Please click the below button to verify this email address.<br><br><a target="_blank" href="http://localhost:3000/api/verify?token=",
          "subject": "Letterpad - Verify Email",
          "to": "newuser@test.com",
        }
      `);
    }
  });

  it("gets change email verification email - Step 1", async () => {
    const userEmail = "useremail@test.com";
    const changedEmail = "newUserEmail@email.com";
    const response1 = await API({
      query: CreateAuthorDocument,
      variables: {
        data: {
          name: "foo",
          email: userEmail,
          password: "foofoofoo",
          username: "mrrobot",
          setting: {
            site_title: "Test site title",
          },
          token: "this recaptcha token wont be validated in test environment",
        },
      },
    });

    await API({
      query: UpdateAuthorDocument,
      variables: {
        author: {
          email: changedEmail,
          id: response1.createAuthor.id,
        },
      },
      sessionId: response1.createAuthor.id,
    });

    const data = await getEmailTemplate(
      {
        template_id: EmailTemplates.VerifyChangedEmail,
        author_id: response1.createAuthor.id,
      },
      prisma
    );
    if (data?.ok) {
      data.content.html = removeToken(data.content.html);
      // The to email is wrong below, because when the email changed, the session was changed, so the update query failed. Leaving it as a bug.
      expect(data.content).toMatchInlineSnapshot(`
        {
          "html": "Hello foo, <br><br>You have requested to change your email address to this email address in <strong><a href="https://letterpad.app">Letterpad</a></strong>. Please click the below button to verify this email address.<br><br><a target="_blank" href="http://localhost:3000/api/verify?token=",
          "subject": "Letterpad - Email Change Verification",
          "to": "newUserEmail@email.com",
        }
      `);
    }
  });

  it("forgot password", async () => {
    await API({
      query: ForgotPasswordDocument,
      variables: {
        email: "demo@demo.com",
      },
    });

    const data = await getEmailTemplate(
      {
        template_id: EmailTemplates.ForgotPassword,
        author_id: 2,
      },
      prisma
    );
    if (data?.ok) {
      data.content.html = removeToken(data.content.html);
      expect(data.content).toMatchInlineSnapshot(`
        {
          "html": "Hello foo,<br><br>We have received a request to change the password for your <strong><a href="https://letterpad.app">Letterpad</a></strong> account. Please click the below button to change your password.<br><br><a target="_blank"  href="http://localhost:3000/resetPassword?token=",
          "subject": "Letterpad - Reset your password",
          "to": "newuser@test.com",
        }
      `);
    }
  });
});

export { };

function removeToken(content: string) {
  const [_part1, part2] = content.split("token=");
  const [token, _part3] = part2.split("&");
  return content.replace(token, "");
}
