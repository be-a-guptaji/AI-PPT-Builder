import { Project } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { containerVaraints } from "@/lib/constant";
import ProjectCard from "../project-card";

type ProjectsProps = {
    projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
    return (
        <motion.div
            className="grid gird-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4"
            variants={containerVaraints}
            initial="hidden"
            animate="visible"
        >
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    projectId={project.id}
                    title={project.title}
                    createdAt={project.createdAt.toString()}
                    isDeleted={project.isDeleted}
                    slideData={project.slides}
                    themeName={project.themeName}
                />
            ))}
        </motion.div>
    );
};

export default Projects;
