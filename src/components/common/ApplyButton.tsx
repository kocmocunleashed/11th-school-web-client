import Link from "next/link";

export function ApplyButton() {
  return (
    <Link
      className="hover:underline text-center flex-1"
      href="/apply"
    >
      Apply
    </Link>
  );
}
