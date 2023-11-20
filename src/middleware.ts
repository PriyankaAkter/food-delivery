// export {default} from "next-auth/middleware"
import { request } from "http";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      console.log({ req, token });
      const pathname = req.nextUrl.pathname;
      console.log({ pathname });

      if (pathname.startsWith("/dashboard")) {
        // Allow access for users with the role "admin"
        return token?.role === "ADMIN";
      }
      if (pathname.startsWith("/all-dashboard")) {
        // Allow access for users with the role "admin"
        return token?.role === "SUPER_ADMIN";
      }

      // For other paths, ensure the user is authenticated
      return !!token;
    },
  },
});





// export const config = { matcher: ["/admin/:path*"] };
export const config = { matcher: ["/dashboard/:path*","/all-dashboard/:path*"] };