import { OrganizationSwitcher, SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Topbar = () => {

    return (
        <nav className="topbar">
            <Link href='/' className='flex items-center gap-4'>
                <Image src='/logo.svg' alt='logo' width={28} height={28} />
                <p className='text-heading4-medium sm:text-heading3-bold  text-light-1 max-xs:hidden'>Civic Connect</p>
            </Link>

            <div className='flex items-center gap-4'>
                <div className='block md:hidden'>
                    <SignedIn>
                        <SignOutButton>
                            <div className='flex cursor-pointer'>
                                <Image
                                    src='/assets/logout.svg'
                                    alt='logout'
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <UserButton />
            </div>


        </nav>
    )
}

export default Topbar