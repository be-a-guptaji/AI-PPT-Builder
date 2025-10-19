import { getAllProjects } from "@/actions/projects";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import { Project } from "@prisma/client";
import React from "react";

const DashboardPage = async () => {
  const allProjects = await getAllProjects();
  const projectData = allProjects.data as Project[];

  return (
    <div className="relative flex w-full flex-col gap-6 p-4 md:p-4">
      <div className="flex w-full flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start">
          <h1 className="dark:text-primary text-2xl font-semibold backdrop-blur-lg">
            Projects
          </h1>
          <p className="dark:text-secondary-foreground/50 text-base font-normal">
            All of your work in one place
          </p>
        </div>
      </div>

      {allProjects.data && projectData.length > 0 ? (
        <Projects projects={projectData} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
