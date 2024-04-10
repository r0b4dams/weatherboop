import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/map",
  }),
  signup: handleLogin({
    returnTo: "/map",
    authorizationParams: {
      screen_hint: "signup",
    },
  }),
  logout: handleLogout({
    returnTo: "/",
  }),
});
