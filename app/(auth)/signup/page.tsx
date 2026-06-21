import { Suspense } from "react";
import { SignUpPageContent } from "@/components/auth/SignUpPageContent";

export default function SignUpRoute() {
  return (
    <Suspense>
      <SignUpPageContent />
    </Suspense>
  );
}
