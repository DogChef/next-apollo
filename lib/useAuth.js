import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

export const auth = ctx => {
  const { signedIn } = nextCookie(ctx);

  if (!signedIn) {
    redirect({ ctx, uri: "/sign-in" });
  }

  return signedIn;
};

export const redirect = ({ ctx, uri }) => {
  if (ctx?.req) {
    ctx.res.writeHead(302, { Location: uri });
    ctx.res.end();
    return;
  } else {
    Router.push(uri);
  }
};

export const logout = () => {
  cookie.remove("token");
  Router.push("/sign-in");
};
