import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import * as z from "zod";

// List all consumer domains you want to block.
// You can add more domains to this array as needed.
const consumerDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "aol.com", "icloud.com"];

// 1. Define a Zod schema to match your new Prisma model fields
const UserSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .refine(
      (val) => {
        const domain = val.split("@")[1]?.toLowerCase() || "";
        return !consumerDomains.includes(domain);
      },
      {
        message: "Consumer email addresses are not allowed",
      }
    ),
  // Optional fields
  company: z.string().max(100, "Company name must be less than 100 characters").optional(),
  jobTitle: z.string().max(100, "Job title must be less than 100 characters").optional(),

  // Password fields
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    console.log("Received request to /api/user");

    const rawBody = await req.text();
    console.log("Raw request body:", rawBody);

    // Attempt to parse JSON
    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch (jsonError) {
      console.error("Failed to parse JSON body:", jsonError);
      return NextResponse.json({ user: null, message: "Invalid JSON body" }, { status: 400 });
    }

    // 2. Validate the parsed body with the new Zod schema
    let parsedData;
    try {
      parsedData = UserSchema.parse(body);
    } catch (zodError: any) {
      console.error("Zod validation error:", zodError.errors);
      return NextResponse.json(
        { user: null, message: zodError.errors?.[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    // 3. Destructure validated fields
    const { email, firstName, lastName, company, jobTitle, password } = parsedData;

    // 4. Check if the email already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      console.warn(`Email already exists: ${email}`);
      return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
    }

    // 5. Hash the password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password successfully");

    const newUser = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        company, // optional
        jobTitle, // optional
        password: hashedPassword,
      },
    });

    // 6. Omit password before sending response
    const { password: _, ...sanitizedUser } = newUser;

    return NextResponse.json({ user: sanitizedUser, message: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("An error occurred in POST /api/user:", error?.message || error);
    return NextResponse.json({ user: null, message: "Something went wrong" }, { status: 500 });
  }
}
