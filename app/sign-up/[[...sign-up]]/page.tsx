import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import FloatingNav from "@/components/FloatingNav";

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <FloatingNav mode="auth">
        <span>Already a member?</span>
        <Link href="/sign-in">Sign in</Link>
      </FloatingNav>
      <div className="auth-page__form">
        <SignUp />
      </div>
    </div>
  );
}
