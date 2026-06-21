import { Suspense } from "react";
import { SignInPageContent } from "@/components/auth/SignInPageContent";

export default function SignInRoute() {
  return (
    <Suspense>
      <SignInPageContent />
    </Suspense>
  );
}
