"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// shadcn UI components
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define Zod schema for login form
const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

// Define TypeScript type for form values
type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true); // Set loading to true during submission
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Sign In Error",
        description: `Sign in failed: ${signInData.error}`,
        variant: "destructive",
      });
      setLoading(false); // Stop loader if sign-in fails
    } else {
      router.refresh();
      router.push("/");
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
          <h1 className="text-2xl font-semibold text-black mb-2">Welcome back</h1>
          <p className="text-gray-600">Please enter your details to sign in</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="h-12 focus:ring-[#FF0099] focus:border-[#FF0099]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 pr-10 focus:ring-[#FF0099] focus:border-[#FF0099]"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF0099]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Checkbox */}
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-gray-300 text-[#FF0099] focus:ring-[#FF0099]"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-600">Remember for 30 days</FormLabel>
                  </FormItem>
                )}
              />
              <Link href="/forgot-password" className="text-sm text-[#FF0099] hover:text-pink-600 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button with Loader */}
            <Button
              type="submit"
              disabled={loading} // Disable button when loading
              className={`w-full h-12 bg-[#FF0099] hover:bg-pink-600 text-white transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> {/* Loading spinner */}
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#FF0099] hover:text-pink-600 font-medium transition-colors">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
