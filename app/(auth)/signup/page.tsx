"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// shadcn UI components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const consumerDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];

// Zod schema for signup
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
    company: z.string().min(1, "Company name is required"),
    jobTitle: z.string().min(1, "Job title is required"),
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
  const [loading, setLoading] = useState(false); // Loading state
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
      company: "",
      jobTitle: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const goNextStep = async () => {
    let fieldsToValidate: (keyof SignupFormValues)[] = [];
    if (currentStep === 1) fieldsToValidate = ["firstName", "lastName", "email"];
    else if (currentStep === 2) fieldsToValidate = ["company", "jobTitle"];
    else if (currentStep === 3) fieldsToValidate = ["password", "confirmPassword", "acceptTerms"];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const goPrevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true); // Start loading spinner
    try {
      const response = await fetch("api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          jobTitle: data.jobTitle,
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
      setLoading(false); // Stop loading spinner
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
            {/* Step Fields */}
            {currentStep === 1 && (
              <>
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter first name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name & Email */}
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={goPrevStep}>
                  Previous
                </Button>
              )}

              {currentStep < 3 ? (
                <Button onClick={goNextStep}>Next</Button>
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
          <Link href="/login" className="text-[#FF0099] hover:text-pink-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
