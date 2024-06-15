import { CREATOR_GITHUB_LINK, CREATOR_GITHUB_NAME } from "@/config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto flex justify-center  bg-gradient-to-bl from-slate-700 to-slate-800 text-white px-4 py-6">
      <div className="max-w-screen-xl text-center text-sm text-slate-400 grow">
        Made with <span className="text-red-200">love</span>, by{" "}
        <Link
          className="text-green-300 hover:underline"
          href={CREATOR_GITHUB_LINK}
        >
          {CREATOR_GITHUB_NAME}
        </Link>
      </div>
    </footer>
  );
}
