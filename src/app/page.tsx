import UserDetails from "@/components/UserDetails";
import Link from "next/link";

export default function Home() {
  return (
    <div>
<h2>This is home page</h2>
<Link href="/login">Login</Link>
<UserDetails />
    </div>
  );
}
