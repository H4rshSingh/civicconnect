"use client";
import React from 'react'
import { adminSidebarLinks, sidebarLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';

const AdminSidebar = () => {
    const { userId } = useAuth();
    const router = useRouter()
    const pathname = usePathname()
    return (
        <section className='custom-scrollbar overflow-hidden leftsidebar'>
            <div className='flex w-full flex-1 flex-col gap-2 px-6'>
                {
                    adminSidebarLinks.map((link) => {
                        // const isActive = (pathname.startsWith(link.route) && link.route.length > 1 && !pathname.endsWith('/admin')) || (pathname === link.route)

                        return (
                            <Link href={link.route} key={link.route} className={`leftsidebar_link hover:bg-neutral-600 transition fade-in-30 ${'hover:bg-primary-500'}`}>
                                <p className="text-light-1 max-lg:hidden">{link.label}</p>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
                        <div className='flex cursor-pointer gap-4 p-4 rounded-md  hover:bg-neutral-600 transition fade-in-30'>
                            <Image
                                src='/assets/logout.svg'
                                alt='logout'
                                width={24}
                                height={24}
                            />
                            <p className='text-light-2 max-lg:hidden'>Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default AdminSidebar