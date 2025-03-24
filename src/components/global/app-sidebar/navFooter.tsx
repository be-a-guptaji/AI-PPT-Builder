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
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hover">
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 dark:bg-white/5 rounded-xl group-data-[collapsible=icon]:hidden bg-black/10">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-kraton">Creative AI</span>
                </p>
                <span className="text-sm dark:text-secondary-foreground/50">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="w-full rounded-full p-[1px] bg-kraton-gradient">
                <Button
                  variant={"default"}
                  size={"lg"}
                  onClick={handleUpgradeing}
                  className="w-full bg-background/7 hover:bg-background text-primary rounded-full font-bold cursor-pointer transition-all duration-300 ease-in-out hover:opacity-80"
                >
                  {loading ? "Upgrading" : "Get Creative AI"}
                </Button>
              </div>
            </div>
          )}
          <SignedIn>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-black/10 dark:hover:bg-white/10 border-2"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-xs text-secondary-foreground/50">
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
