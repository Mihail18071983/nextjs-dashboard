import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("user", auth?.user);
      const isLoggedIn = !!auth?.user;
      console.log('is logged in:',isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      console.log('is on dashboard:',isOnDashboard);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
        
      }
      return true;
    },
  },

} satisfies NextAuthConfig;
