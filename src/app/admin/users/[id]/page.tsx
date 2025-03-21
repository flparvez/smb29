import EditUser from "@/components/admin/EditUser"
import Link from "next/link"
export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params
    return <div>
      <Link href="/admin/users" className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 font-bold cursor-pointer w-7"
      >
        <path
          fillRule="evenodd"
          d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
          clipRule="evenodd"
        ></path>
      </svg>

      <h2 className="text-xl font-bold">Edit User Details</h2>
    </Link>

     <EditUser userId={id} />
    
    </div>
  }