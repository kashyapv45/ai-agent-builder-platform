"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Database, Headphones, LayoutDashboard, User2Icon, WalletCards, Leaf, Zap, Crown } from 'lucide-react'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { UserDetailContext } from '@/context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { set } from 'zod'


const MenuOptions = [{
    title: "Dashboard",
    url: "/Dashboard",
    icon: LayoutDashboard,
},
{
    title: "AI Agents",
    url: "/Dashboard/My-Agents",
    icon: Headphones,
},
{
    title: "Pricing",
    url: "/Dashboard/Pricing",
    icon: WalletCards,
},
{
    title: "Profile",
    url: "/Dashboard/Profile",
    icon: User2Icon,
}]


function AppSidebar() {
    const { open } = useSidebar();
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    const path = usePathname();
    const router = useRouter();
    const UpgradeClicked = () => {
        router.push('/Dashboard/Pricing');
    }
    const { has } = useAuth();
    const hasProAccess = has && has({ plan: 'pro_plan' })
    const hasUltimateAccess = has && has({ plan: 'ultimate_plan' })
    const userPlan = hasUltimateAccess ? 'ultimate' : hasProAccess ? 'pro' : 'free';
    const convex = useConvex();

    const [totalRemainingTokens, setTotalRemainingTokens] = useState<number>(0);
    useEffect(() => {
        if (!hasProAccess && !hasUltimateAccess && userDetails?._id) {
            GetUserAgent();
        }
    }, [hasProAccess, hasUltimateAccess])
    const GetUserAgent = async () => {
        const result = await convex.query(api.agent.GetUserAgents, {
            userId: userDetails?._id,
        });
        setTotalRemainingTokens(0);
    }

    const planLimits = {
        free: { max: 100, icon: <Leaf className='text-green-500' />, label: "Free" },
        pro: { max: 500, icon: <Zap className='text-yellow-300' />, label: "Pro" },
        ultimate: { max: 5000, icon: <Crown className='text-amber-400' />, label: "Ultimate" }
    };

    const current = planLimits[userPlan];

    return (
        <Sidebar collapsible='icon' className='bg-white border-r border-neutral-200/80 shadow-sm'>
            <SidebarHeader className="px-4 py-3">
                <div className='flex gap-2.5 items-center'>
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                    {open && <h2 className='font-bold text-xl tracking-tight text-neutral-900'>NodeMind</h2>}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-xs font-bold uppercase tracking-widest text-neutral-400 mt-6 mb-2'>Navigations</SidebarGroupLabel>
                    {open && <Separator className='bg-neutral-100 mb-2' />}
                    <SidebarContent>
                        <SidebarMenu>
                            {MenuOptions.map((menu, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild size={open ? 'lg' : 'default'}
                                        isActive={path === menu.url}
                                        className={`transition-all hover:bg-neutral-100 ${path === menu.url ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-500'}`}
                                    >
                                        <Link href={menu.url}>
                                            <menu.icon className={`me-2 ${path === menu.url ? 'text-indigo-600' : ''}`} />
                                            <span>{menu.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            {open && 
            <SidebarFooter className='mb-7 px-4'>
                <div className='flex gap-2 items-center mb-1'>
                    {current.icon}
                    <h2 className='font-semibold text-neutral-900'>Plan: {current.label}</h2>
                </div>
                <div className='text-sm text-neutral-500 mb-4'>
                    Tokens: {userDetails?.token || 0} / {current.max}
                </div>

                <Button onClick={UpgradeClicked} variant={userPlan === 'ultimate' ? 'outline' : 'default'} className="rounded-full font-semibold shadow-sm w-full">
                    {userPlan === 'ultimate' ? "Manage Plan" : "Upgrade Plan"}
                </Button>
            </SidebarFooter>}

        </Sidebar>
    )
}

export default AppSidebar