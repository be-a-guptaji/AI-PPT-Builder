"use client";

import { buySubscription } from "@/actions/lemonSqueezy";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleUpgradeing = async () => {
    try {
      setLoading(true);

      const res = await buySubscription(prismaUser.id);

      if (res.status !== 200) {
        toast.error("Payment Failed", {
          description: "Something went wrong! Please contact support",
        });
        return;
      }

      router.push(res.data);

      toast.success("Payment Successful", {
        description: "You can now use all features",
      });
    } catch (error) {
      console.error(error);
      toast.error("Payment Failed", {
        description: "Something went wrong! Please contact support",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="group-data-[collapsible=icon]:hover flex flex-col items-start gap-y-6">
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start gap-4 rounded-xl bg-black/10 p-2 pb-3 group-data-[collapsible=icon]:hidden dark:bg-white/5">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-kraton">Creative AI</span>
                </p>
                <span className="dark:text-secondary-foreground/50 text-sm">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="bg-kraton-gradient w-full rounded-full p-[1px]">
                <Button
                  variant={"default"}
                  size={"lg"}
                  onClick={handleUpgradeing}
                  className="bg-background/7 hover:bg-background text-primary w-full cursor-pointer rounded-full font-bold transition-all duration-300 ease-in-out hover:opacity-80"
                >
                  {loading ? "Upgrading" : "Get Creative AI"}
                </Button>
              </div>
            </div>
          )}
          <SignedIn>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-2 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="text-secondary-foreground/50 truncate text-xs">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
