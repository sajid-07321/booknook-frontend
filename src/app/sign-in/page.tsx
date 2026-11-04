"use client"
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const user = Object.fromEntries(formData.entries()) as {email: string, password: string} 
     
  
      const {data, error} = await authClient.signIn.email({
        ...user,
      })
      if(data) {
        toast.success("Signed in successfully! Redirecting...")
        redirect('/')
      }
      if(error) {
        toast.error(error.message || "Invalid email or password.")
      }
    }

    const handleGoogleSignIn = async () => {
      const {data, error} = await authClient.signIn.social({
    provider: "google",
  });
  if(data) {
    toast.info("Redirecting to Google sign in...")
  }
  if(error) {
    toast.error(error.message || "Google sign in failed. Please try again.")
  }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121615] px-4 py-10 text-white">
      <Card className="w-full max-w-md border border-white/10 bg-[#151b19] text-white shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-2xl">
            🔐
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-gray-400">
            Sign in to continue to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
          onSubmit={handleSignIn}
          className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email Address
              </Label>

              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="h-11 border-white/10 bg-[#0b0f0e] text-white placeholder:text-gray-500 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
              </div>

              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="h-11 border-white/10 bg-[#0b0f0e] text-white placeholder:text-gray-500 focus-visible:ring-emerald-500"
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-emerald-500 font-semibold text-black hover:bg-emerald-400"
            >
              Sign In
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Button
            onClick={handleGoogleSignIn}
              type="button"
              variant="outline"
              className="h-11 w-full border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white"
            >
              <span className="mr-2 font-bold">Google</span>
               
            </Button>

            <p className="text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-emerald-400 hover:text-emerald-300"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default SignInPage;
