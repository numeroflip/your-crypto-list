import { SITE_NAME } from "@/config";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" bg-gradient-to-tl border-b   text-white from-slate-700 to-slate-800 flex justify-center  px-4 py-5">
      <div className="max-w-screen-xl items-center grow flex">
        <Link href="/" className="font-medium ">
          {SITE_NAME}
        </Link>
        <div className="size-2 ml-3 shadow-inner rounded-full bg-gradient-to-tr from-green-200 to-green-300" />
        <div className="size-2 ml-2 shadow-inner rounded-full bg-gradient-to-tr from-yellow-200 to-yellow-300" />
        <div className="size-2 ml-2 shadow-inner rounded-full bg-gradient-to-tr from-orange-200 to-orange-300" />
      </div>
    </header>
  );
}
