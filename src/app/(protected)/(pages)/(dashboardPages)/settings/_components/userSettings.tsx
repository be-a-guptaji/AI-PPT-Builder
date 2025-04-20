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
    <div className="mr-16 mb-12 rounded-md border-2 bg-black/30 px-8 py-12 dark:bg-white/10">
      <div className="mx-12 flex items-center justify-between text-2xl">
        <div className="cursor-default">
          <h1 className="dark:text-primary text-2xl font-semibold backdrop-blur-lg">
            {User.name}
          </h1>
          <div className="dark:text-secondary-foreground/50 text-sm font-normal">
            {User.email}
          </div>
        </div>
        <Image
          src={User.profileImage || ""}
          alt="User PFP"
          width={24}
          height={24}
          className="size-12 rounded-full"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4">
        <div className="w-full">
          <div className="ml-2 font-semibold text-white">
            Lemon Squeezy Api Key
          </div>
          <input
            type="text"
            className="flex h-12 w-full items-center justify-between rounded bg-black/60 px-8 py-4 text-white"
            value={lemonSqueezyAPIKey}
            onChange={(e) => setLemonSqueezyAPIKey(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Store ID</div>
          <input
            type="text"
            className="flex h-12 w-full items-center justify-between rounded bg-black/60 px-8 py-4 text-white"
            value={storeID}
            onChange={(e) => setStoreID(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Web Hook Secret</div>
          <input
            type="text"
            className="flex h-12 w-full items-center justify-between rounded bg-black/60 px-8 py-4 text-white"
            value={webhookSecret}
            onChange={(e) => setWebhookSecret(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Subscription</div>
          <input
            type="text"
            className={cn(
              "flex h-12 w-full cursor-default items-center justify-between rounded bg-black/60 px-8 py-4 text-white",
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
            className="flex h-12 w-full cursor-default items-center justify-between rounded bg-black/60 px-8 py-4 text-white"
            value={new Date(User.createdAt).toLocaleDateString()}
            readOnly
          />
        </div>

        <div className="w-full">
          <div className="ml-2 font-semibold text-white">Updated On</div>
          <input
            type="text"
            className="flex h-12 w-full cursor-default items-center justify-between rounded bg-black/60 px-8 py-4 text-white"
            value={new Date(User.updatedAt).toLocaleDateString()}
            readOnly
          />
        </div>

        <div className="mt-8 flex w-full flex-col gap-4 md:flex-row">
          <Button
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded bg-red-600 px-8 py-4 font-bold tracking-widest text-white transition-colors duration-200 hover:bg-red-700"
            onClick={handleReset}
          >
            Discard Changes
          </Button>
          <Button
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded bg-green-600 px-8 py-4 font-bold tracking-widest text-white transition-colors duration-200 hover:bg-green-700"
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
