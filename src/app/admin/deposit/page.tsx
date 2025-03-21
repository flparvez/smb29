"use client"
import AdminDepositApproval from '@/components/admin/DepositPage'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const DepositAdmin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔒 Check Admin Access
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.admin) {
      toast.error("You are not authorized to access this page.");
      router.push("/user/dashboard");
    }
  }, [session, status, router]);

  return (
    <div>
      <AdminDepositApproval />
    </div>
  )
}

export default DepositAdmin
