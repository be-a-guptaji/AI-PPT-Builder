import { Project } from "@prisma/client";
import React from "react";

type ProjectsProps = {
    projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
    return <div>Projects</div>;
};

export default Projects;
