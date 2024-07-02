import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        href="/profile"
        className="text-md font-semibold hover:text-indigo-500 ml-2 no-underline  text-indigo-600"
      >
        Click For Profile View
      </Link>
    </main>
  );
}
