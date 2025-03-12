import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-sm shadow-xl bg-white p-6 rounded-lg relative">
        {/* Logo */}
        <div className="relative w-24 h-24 mx-auto -top-12 border-4 border-green-500 rounded-full bg-white shadow-lg">
          <Image
            src="/logo1.webp"
            alt="logo"
            layout="fill"
            className="rounded-full object-cover"
          />
        </div>


        <CardContent>
          <form className="space-y-4">
            {/* Phone Number Field */}
            <div className="flex items-center border border-black rounded-md bg-white text-black overflow-hidden">
              <div className="h-12 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 cursor-pointer w-6 text-gray-900"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.5 9.75a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l4.72-4.72a.75.75 0 111.06 1.06L16.06 9h2.69a.75.75 0 01.75.75z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <Input
                type="number"
                placeholder="Enter Mobile Number"
                className="bg-white text-black border-none focus:ring-0 w-full"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center border border-black rounded-md bg-white text-black overflow-hidden">
              <div className="h-12 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-8 cursor-pointer w-6 text-gray-900"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <Input
                type="password"
                placeholder="Enter Password"
                className="bg-white text-black border-none focus:ring-0 w-full"
                required
              />
            </div>

            {/* Login Button */}
            <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full mt-6 border bg-[#7baa1b] shadow-none flex gap-3 justify-center items-center rounded-lg">
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center mt-4 text-sm text-black">
            Dont have an account?{" "}
           
             <Link className="text-black font-semibold" href="/register"> Register</Link>
           
   
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
