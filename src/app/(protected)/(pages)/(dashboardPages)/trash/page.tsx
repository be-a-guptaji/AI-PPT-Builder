import React from "react";
import DeleteAllButton from "./_components/deleteAllButton";
import { getDeletedProjects } from "@/actions/projects";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import { Project } from "@prisma/client";

const Page = async () => {
  const deletedProjects = await getDeletedProjects();
  const projectData = deletedProjects.data as Project[];

  if (!deletedProjects.data || projectData.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="relative flex flex-col gap-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="dark:text-primary text-2xl font-semibold backdrop-blur-lg">
            Trash
          </h1>
          <p className="dark:text-secondary-foreground/50 text-base font-normal">
            All your deleted projects
          </p>
        </div>

        <DeleteAllButton Projects={projectData} />
      </div>

      {projectData.length > 0 ? (
        <Projects projects={projectData} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Page;
