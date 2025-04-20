import React from "react";
import DeleteAllButton from "./_components/deleteAllButton";
import { getDeletedProjects } from "@/actions/projects";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";

const Page = async () => {
  const deletedProjects = await getDeletedProjects();

  if (!deletedProjects.data || deletedProjects.data.length === 0) {
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

        <DeleteAllButton Projects={deletedProjects.data} />
      </div>

      {deletedProjects.data.length > 0 ? (
        <Projects projects={deletedProjects.data} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Page;
