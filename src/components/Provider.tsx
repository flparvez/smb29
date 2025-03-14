"use client";

import { SessionProvider } from "next-auth/react";

import { NotificationProvider } from "./notification";
import { Toaster } from "react-hot-toast";


export default function Providers({ children }: { children: React.ReactNode }) {


  return (
    <SessionProvider refetchInterval={5 * 60}>
      <NotificationProvider>
 
          <Toaster />
          {children}
    
      </NotificationProvider>
    </SessionProvider>
  );
}