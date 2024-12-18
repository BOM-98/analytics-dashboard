import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    company: string | null;
    jobTitle: string | null;
  }

  interface JWT {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
  }
  interface Session {
    user: User & {
      email: string;
      firstName: string;
      lastName: string;
      company: string;
      jobTitle: string;
      plan: string;
    };
    token: {
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      company: string;
      jobTitle: string;
    };
  }
}
