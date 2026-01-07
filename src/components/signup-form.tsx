"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Auth from "./assets/auth.jpeg";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { coreAPI } from "../../lib/coreAPI";
import { CheckCircle, XCircle } from "lucide-react";
type FormState = {
  fieldErrors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  formError?: string;
  success?: boolean;
};

const initialState: FormState = {};
async function signUpAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const fieldErrors: FormState["fieldErrors"] = {};
  if (!username) fieldErrors.username = "Username is required";
  if (!email) fieldErrors.email = "Email is required";
  if (!password) fieldErrors.password = "Password is required";
  if (!confirmPassword)
    fieldErrors.confirmPassword = "Confirm Password is required";
  if (password !== confirmPassword)
    fieldErrors.confirmPassword = "Passwords do not match";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }
  try {
    await coreAPI.post("/api/sign-up", {
      username,
      email,
      password,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    const data = error?.response?.data;

    if (data?.fieldErrors) {
      return {
        fieldErrors: data.fieldErrors,
      };
    }
    return {
      formError:
        error?.response?.data?.message || "Something went wrong during sign up",
    };
  }
}
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(signUpAction, initialState);
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (state.formError) {
      setShowError(true);
    }
  }, []);
  if (state.success) {
    router.push("/sign-in");
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center h-screen",
        className
      )}
      {...props}
    >
      {state.formError && showError && (
        <div
          id="alert-border-4"
          className="flex sm:items-center p-4 mb-4 text-sm text-fg-warning bg-warning-soft border-t-4 border-warning-subtle"
          role="alert"
        >
          <svg
            className="w-4 h-4 shrink-0 mt-0.5 md:mt-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-2 text-sm ">{state.formError}</div>
          <button
            type="button"
            onClick={() => setShowError(false)}
            className="ms-auto -mx-1.5 -my-1.5 rounded focus:ring-2 focus:ring-warning-medium p-1.5 hover:bg-warning-medium inline-flex items-center justify-center h-8 w-8 shrink-0"
            data-dismiss-target="#alert-border-4"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>
      )}
      <Card className="overflow-hidden p-0 w-[90%] md:w-[70%] flex">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            style={{ padding: "20px" }}
            action={action}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>

              <Field className="relative">
                <FieldLabel htmlFor="name">User Name</FieldLabel>
                <Input
                  style={{ padding: "12px" }}
                  id="name"
                  type="text"
                  placeholder="Jhon Vicktor"
                  name="username"
                  className={cn(
                    "input-base",
                    state.fieldErrors?.username &&
                      "ring-1 ring-red-400 border-red-400 focus-visible:border-red-600 focus-visible:ring-red-500/50 focus-visible:ring-[3px]"
                  )}
                />
                {state.fieldErrors?.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {state.fieldErrors.username}
                  </p>
                )}
              </Field>
              <Field className="relative">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  style={{ padding: "12px" }}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  className={cn(
                    "input-base",
                    state.fieldErrors?.email &&
                      "ring-1 ring-red-400 border-red-400 focus-visible:border-red-600 focus-visible:ring-red-500/50 focus-visible:ring-[3px]"
                  )}
                />
                {state.fieldErrors?.email && (
                  <FieldDescription className="text-red-500 text-sm mt-1">
                    {state.fieldErrors.email}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field className="relative">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      style={{ padding: "12px" }}
                      id="password"
                      name="password"
                      type="password"
                      className={cn(
                        "input-base",
                        state.fieldErrors?.password &&
                          "ring-1 ring-red-400 border-red-400 focus-visible:border-red-600 focus-visible:ring-red-500/50 focus-visible:ring-[3px]"
                      )}
                    />
                    {state.fieldErrors?.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {state.fieldErrors.password}
                      </p>
                    )}
                  </Field>
                  <Field className="relative">
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      style={{ padding: "12px" }}
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      className={cn(
                        "input-base",
                        state.fieldErrors?.confirmPassword &&
                          "ring-1 ring-red-400 border-red-400 focus-visible:border-red-600 focus-visible:ring-red-500/50 focus-visible:ring-[3px]"
                      )}
                    />
                    {state.fieldErrors?.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {state.fieldErrors.confirmPassword}
                      </p>
                    )}
                  </Field>
                </Field>

                {/* <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription> */}
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with{" "}
                <span className="text-red-500">[ Currently Disabled ]</span>
              </FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Apple</span>
                </Button>
                <Button variant="outline" type="button" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
                <Button variant="outline" type="button" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Meta</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/sign-in">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={Auth}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
