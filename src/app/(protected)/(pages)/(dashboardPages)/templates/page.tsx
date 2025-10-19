import { getAllSellableProjects } from "@/actions/projects";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import { Project } from "@prisma/client";
import React from "react";

const DashboardPage = async () => {
  const allSellableProjects = await getAllSellableProjects();
  const projectData = allSellableProjects.data as Project[];

  return (
    <div className="relative flex w-full flex-col gap-6 p-4 md:p-4">
      <div className="flex w-full flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start">
          <h1 className="dark:text-primary text-2xl font-semibold backdrop-blur-lg">
            Templates
          </h1>
          <p className="dark:text-secondary-foreground/50 text-base font-normal">
            Market place for templates buy and sell your templates as you like
          </p>
        </div>
      </div>

      {allSellableProjects.data && projectData.length > 0 ? (
        <Projects projects={projectData} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
