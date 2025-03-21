"use client"
import AdminDepositApproval from '@/components/admin/DepositPage'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const DepositAdmin = () => {
  const { data: session } = useSession();

  const admin = session?.user?.admin;

    const router = useRouter();
      // Use useEffect to handle redirect after component render
      useEffect(() => {
        if (!admin) {
         toast.error("You are not Admin to access this page.");

          router.push('/user/dashboard');
        }
      }, [session, router,admin]);

  return (
    <div>
      <AdminDepositApproval />
    </div>
  )
}

export default DepositAdmin
