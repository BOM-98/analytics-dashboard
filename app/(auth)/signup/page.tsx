"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Same consumer domain array as in the first snippet
const consumerDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "aol.com", "icloud.com"];

// Zod schema based on the first snippet, but company and jobTitle optional again
const SignupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .email("Invalid email")
      .refine((val) => {
        const domain = val.split("@")[1]?.toLowerCase() || "";
        return !consumerDomains.includes(domain);
      }, "Must be a company email (e.g. not gmail/outlook)."),
    // Make company and jobTitle optional again to match the first snippet
    company: z.string().max(100, "Company name must be less than 100 characters").optional(),
    jobTitle: z.string().max(100, "Job title must be less than 100 characters").optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof SignupSchema>;

export default function SignupModal() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "", // optional
      jobTitle: "", // optional
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const goNextStep = async () => {
    let fieldsToValidate: (keyof SignupFormValues)[] = [];
    if (currentStep === 1) {
      // Step 1: Validate firstName, lastName, email
      fieldsToValidate = ["firstName", "lastName", "email"];
    } else if (currentStep === 2) {
      // Step 2: Validate company, jobTitle (optional fields, but let's still trigger them)
      fieldsToValidate = ["company", "jobTitle"];
      // Even if they are optional, we still run trigger so the user sees any errors if present
    } else if (currentStep === 3) {
      // Step 3: Validate password, confirmPassword, acceptTerms
      fieldsToValidate = ["password", "confirmPassword", "acceptTerms"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const goPrevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company || null, // optional fields can be null if empty
          jobTitle: data.jobTitle || null,
          password: data.password,
        }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center">
            <Globe className="w-6 h-6 text-[#FF0099]" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-black mb-2">Create an account</h1>
          <p className="text-gray-600">Sign up to get started with Qrious Insight</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Step 1 Fields: firstName, lastName, email */}
            {currentStep === 1 && (
              <>
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your first name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your last name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your company email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Step 2 Fields: company, jobTitle (optional) */}
            {currentStep === 2 && (
              <>
                <FormField
                  name="company"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your company name (optional)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="jobTitle"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your job title (optional)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Step 3 Fields: password, confirmPassword, acceptTerms */}
            {currentStep === 3 && (
              <>
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword.password ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF0099]"
                        >
                          {showPassword.password ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword.confirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF0099]"
                        >
                          {showPassword.confirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="acceptTerms"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-300 text-[#FF0099] focus:ring-[#FF0099]"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#FF0099] hover:text-pink-600 transition-colors">
                          Terms and Conditions
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button variant="outline" type="button" onClick={goPrevStep}>
                  Previous
                </Button>
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={goNextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FF0099] hover:text-pink-600 font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
