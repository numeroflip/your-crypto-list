import { SITE_NAME } from "@/config";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" bg-gradient-to-tr border-b   text-white md:text-lg  from-slate-700 to-slate-800 flex justify-center  px-4 py-5">
      <div className="max-w-screen-xl items-center justify-center grow flex">
        <div className="hidden xs:block size-2 mr-2 shadow-inner rounded-full bg-gradient-to-tr from-orange-300 to-orange-400" />
        <div className="size-2 mr-2 shadow-inner rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-400" />
        <div className="size-2 mr-3 shadow-inner rounded-full bg-gradient-to-tr from-green-300 to-green-400" />

        <Link href="/" className="font-medium ">
          {SITE_NAME}
        </Link>

        <div className="size-2 ml-3 shadow-inner rounded-full bg-gradient-to-tr from-green-300 to-green-400" />
        <div className="size-2 ml-2 shadow-inner rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-400" />
        <div className="hidden xs:block size-2 ml-2 shadow-inner rounded-full bg-gradient-to-tr from-orange-300 to-orange-400" />
      </div>
    </header>
  );
}
