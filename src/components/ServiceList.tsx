
import Image from "next/image";
import Link from "next/link";


export default function ResponsiveItems() {
  const items = [
    { image: "/task.webp",text: "Task", link:"/ptc" },
    { image: "/deposit.webp",text: "deposit",link:"/deposit" },
    { image: "/withdraw.webp",text: "withdraw", link:"/withdraw" },
    { image: "/plan.webp",text: "plan", link:"/plans" },
    { image: "/profile.webp",text: "Profile", link:"/profile-setting" },
    { image: "/transaction.webp",text: "transaction", link:"/transactions" },
    { image: "/refer.webp",text: "Refer", link:"/referred-users" },
    { image: "/helpline.webp",text: "helpline", link:"/helpline" },
  
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Grid layout for items */}

      <h2 className='text-[#7baa1b] text-xl font-bold ml-6'>All Services</h2>
      
      <div className="grid mt-2  shadow grid-cols-4 gap-5 bg-white rounded-lg  p-4"> 
        
        {items.map((item, index) => (
          <div key={index} className="cursor-pointer ">
      <Link href={"/user"+item.link}>
      
      <div className="flex justify-center items-center flex-col ">
<div className="border-2 border-[#f7faf7] rounded-full">
<Image
     src={item
    .image} alt={item.text}
      width={48} height={48}
    
    className="h-[48px] w[48px] cursor-pointer "
  />
</div>

            </div>
      </Link>
            
            <h3 className="text-black mt-2 text-center text-sm">{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
