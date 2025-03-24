"use client";

import { updateUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type UserSettingsProps = {
  User?: User;
};

const UserSettings = ({ User }: UserSettingsProps) => {
  if (!User) {
    redirect("/");
  }

  const router = useRouter();
  const [lemonSqueezyAPIKey, setLemonSqueezyAPIKey] = useState<string>(
    User.lemonSqueezyAPIKey || "Lemon Squeezy API Key"
  );
  const [storeID, setStoreID] = useState<string>(User.storeID || "Store ID");
  const [webhookSecret, setWebhookSecret] = useState<string>(
    User.webhookSecret || "Web Hook Secret"
  );

  const handleReset = () => {
    router.refresh();

    setLemonSqueezyAPIKey(User.lemonSqueezyAPIKey || "Lemon Squeezy API Key");
    setStoreID(User.storeID || "Store ID");
    setWebhookSecret(User.webhookSecret || "Web Hook Secret");
    toast.success("Reset Profile", {
      description: "Changes have been discarded successfully.",
    });
  };

  const handleSave = async () => {
    const updatedProfile = await updateUser(
      lemonSqueezyAPIKey,
      storeID,
      webhookSecret
    );

    if (updatedProfile.status !== 200) {
      toast.error("Error Updating Profile", {
        description: updatedProfile.error,
      });
      return;
    }

    toast.success("Profile Updated", {
      description: "Changes have been saved successfully.",
    });

    router.refresh();
  };

  return (
    <div className="border-2 rounded-md px-8 py-12 bg-black/30 dark:bg-white/10 mb-12 mr-16">
      <div className="text-2xl flex justify-between items-center mx-12">
        <div className="cursor-default">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            {User.name}
          </h1>
          <div className="text-sm font-normal dark:text-secondary-foreground/50">
            {User.email}
          </div>
        </div>
        <Image
          src={User.profileImage || ""}
          alt="User PFP"
          width={24}
          height={24}
          className="rounded-full size-12"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
        <div className="w-full">
          <div className="ml-2 font-semibold text-white">
            Lemon Squeezy Api Key
          </div>
          <input
            type="text"
            className="flex items-center h-12 w-full justify-between px-8 py-4 rounded bg-black/60 text-white"
            value={lemonSqueezyAPIKey}
            onChange={(e) => setLemonSqueezyAPIKey(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Store ID</div>
          <input
            type="text"
            className="flex items-center h-12 w-full justify-between px-8 py-4 rounded bg-black/60 text-white"
            value={storeID}
            onChange={(e) => setStoreID(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Web Hook Secret</div>
          <input
            type="text"
            className="flex items-center h-12 w-full justify-between px-8 py-4 rounded bg-black/60 text-white"
            value={webhookSecret}
            onChange={(e) => setWebhookSecret(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Subscription</div>
          <input
            type="text"
            className={cn(
              "flex items-center h-12 w-full justify-between px-8 py-4 rounded bg-black/60 cursor-default text-white",
              User.subscription && "text-green-500"
            )}
            value={User.subscription ? "Subscribed" : "Not Subscribed"}
            readOnly
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Joined On</div>
          <input
            type="text"
            className="flex items-center h-12 w-full justify-between px-8 py-4 rounded bg-black/60 cursor-default text-white"
            value={new Date(User.createdAt).toLocaleDateString()}
            readOnly
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Updated On</div>
          <input
            type="text"
            className="flex items-center h-12 w-full justify-between px-8 py-4 rounded bg-black/60 cursor-default text-white"
            value={new Date(User.updatedAt).toLocaleDateString()}
            readOnly
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 mt-8">
          <Button
            className="flex items-center h-12 w-full justify-center px-8 py-4 rounded bg-red-600 cursor-pointer text-white font-bold tracking-widest transition-colors duration-200 hover:bg-red-700"
            onClick={handleReset}
          >
            Discard Changes
          </Button>
          <Button
            className="flex items-center h-12 w-full justify-center px-8 py-4 rounded bg-green-600 cursor-pointer text-white font-bold tracking-widest transition-colors duration-200 hover:bg-green-700"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
