import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/graphql/context";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieName } from "@/utils/authCookie";

export async function GET(req: NextRequest, { params }: { params: { action: string } }) {
  const callbackUrl = req.nextUrl.searchParams.get("callbackUrl")!;
  // const session = await getServerSession({ req });
  const token = await getToken({
    req: req as any,
    secret: process.env.SECRET_KEY,
  });

  if (!token) {
    return NextResponse.redirect(`${process.env.ROOT_URL}/login?error=unauthorized&callbackUrl=${callbackUrl}`, { status: 307 });
  }

  if (params.action === "logout") {
    const sessions = await prisma.session.findMany({
      where: {
        author_id: Number(token.sub)!,
      },
    });
    if (!sessions.length) {
      return NextResponse.redirect(callbackUrl, { status: 307 });
    }

    const urls = sessions.map((session) => `${session.domain}/api/identity/logout?origin=${callbackUrl}`).join("&next=");
    await prisma.session.deleteMany({
      where: {
        author_id: Number(token.sub)!,
      },
    });
    return NextResponse.redirect(urls, { status: 307 });
  }

  if (params.action === "login") {
    try {
      if (!callbackUrl) {
        return NextResponse.redirect(process.env.ROOT_URL + "/login?error=callbackUrl_is_missing", { status: 307 });
      }
      const cookieStore = cookies();

      console.log(token, "=========token======xx")
      /**
        const headers = new Headers();
        headers.append('set-cookie', `__Secure-next-auth.session-token=${cookieStore.get(getAuthCookieName())?.value!}; SameSite=None; Secure; HttpOnly; Max-Age=60*60*24`);
        headers.append('location', callbackUrl);
        return new Response(undefined, { status: 307, headers });
      */
      const sessionToken = cookieStore.get(getAuthCookieName())?.value!;
      const found = await prisma.session.findFirst({
        where: {
          author_id: Number(token.sub),
          domain: new URL(callbackUrl).origin,
        },
      });
      if (found) {
        if (found.token !== sessionToken) {
          await prisma.session.update({
            where: {
              id: found.id,
            },
            data: {
              token: sessionToken,
              expiresAt: new Date(token?.exp! as Date),
            },
          });
        }
      } else {
        await prisma.session.create({
          data: {
            domain: new URL(callbackUrl).origin,
            token: cookieStore.get(getAuthCookieName())?.value!,
            expiresAt: new Date(token?.exp! as Date),
            author: {
              connect: {
                id: Number(token.sub),
              },
            },
          },
        });
      }
      const response = NextResponse.redirect(`${callbackUrl}?token=${sessionToken}`, { status: 302 });
      response.cookies.set(getAuthCookieName(), sessionToken);
      return response;
    } catch (e) {
      console.log(e);
      // return NextResponse.redirect("/login?error=callbackUrl is missing", { status: 307 });
    }
  }
}
