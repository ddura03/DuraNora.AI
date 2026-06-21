import Link from "next/link";

export function ReturnHomeLink() {
  return (
    <Link href="/" className="auth-home-link">
      <span className="auth-home-link-arrow">←</span>
      Return to home
    </Link>
  );
}
