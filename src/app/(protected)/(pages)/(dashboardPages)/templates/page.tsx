import { getAllSellableProjects } from "@/actions/projects";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import React from "react";

const DashboardPage = async () => {
  const allSellableProjects = await getAllSellableProjects();

  return (
    <div className="w-full flex flex-col gap-6 relative p-4 md:p-4">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Templates
          </h1>
          <p className="text-base font-normal dark:text-secondary-foreground/50">
            Market place for templates buy and sell your templates as you like
          </p>
        </div>
      </div>

      {allSellableProjects.data && allSellableProjects.data.length > 0 ? (
        <Projects projects={allSellableProjects.data} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
