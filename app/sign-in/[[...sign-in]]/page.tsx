import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import FloatingNav from "@/components/FloatingNav";

export default function SignInPage() {
  return (
    <div className="auth-page">
      <FloatingNav mode="auth">
        <span>New here?</span>
        <Link href="/sign-up">Create account</Link>
      </FloatingNav>
      <div className="auth-page__form">
        <SignIn />
      </div>
    </div>
  );
}
