import { onAuthenticateUser } from "@/actions/user";
import React from "react";
import UserSettings from "./_components/userSettings";

const Page = async () => {
  const checkUser = await onAuthenticateUser();

  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="dark:text-primary text-2xl font-semibold backdrop-blur-lg">
            Settings
          </h1>
          <p className="dark:text-secondary-foreground/50 text-base font-normal">
            All of your settings
          </p>
        </div>
      </div>
      <UserSettings User={checkUser.user} />
    </div>
  );
};

export default Page;
