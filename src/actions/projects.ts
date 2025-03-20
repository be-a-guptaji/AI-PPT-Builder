"use server"

import client from "@/lib/prisma"
import { onAuthenticateUser } from "./user"
import { OutlineCard, ReturnProps } from "@/lib/types"
import { JsonValue } from "@prisma/client/runtime/library"

export const getAllProjects = async (): Promise<ReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        if (projects.length === 0) {
            return {
                status: 404,
                error: "No projects found",
            }
        }

        return {
            status: 200,
            data: projects,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}

export const getRecentProjects = async (): Promise<ReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: "desc",
            },
            take: 5,
        })

        if (projects.length === 0) {
            return {
                status: 404,
                error: "No recent projects available",
            }
        }

        return {
            status: 200,
            data: projects,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}

export const recoverProject = async (
    projectId: string
): Promise<ReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: false,
            },
        })

        if (!updatedProject) {
            return {
                status: 500,
                error: "Failed to recover project",
            }
        }

        return {
            status: 200,
            data: updatedProject,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}

export const deleteProject = async (
    projectId: string
): Promise<ReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: true,
            },
        })

        if (!updatedProject) {
            return {
                status: 500,
                error: "Failed to delete project",
            }
        }

        return {
            status: 200,
            data: updatedProject,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}

export const createProject = async (
    title: string,
    outlines: OutlineCard[]
): Promise<ReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        if (!title || !outlines || outlines.length === 0) {
            return { status: 400, error: "Title and outlines are required" }
        }

        const allOutlines = outlines.map((outline) => outline.title)

        const project = await client.project.create({
            data: {
                title,
                outlines: allOutlines,
                userId: checkUser.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        if (!project) {
            return {
                status: 500,
                error: "Failed to create project",
            }
        }

        return {
            status: 200,
            data: project,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}

export const getProjectById = async (
    projectId: string
): Promise<ReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const project = await client.project.findFirst({
            where: {
                id: projectId,
            },
        })

        if (!project) {
            return {
                status: 404,
                error: "Project not found",
            }
        }

        return {
            status: 200,
            data: project,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}

export const updateSlides = async (
    projectId: string,
    slides: JsonValue
): Promise<ReturnProps> => {
    try {
        if (!projectId || !slides) {
            return { status: 400, error: "Project ID and slides are required" }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                slides,
                updatedAt: new Date(),
            },
        })

        if (!updatedProject) {
            return {
                status: 500,
                error: "Failed to update slides",
            }
        }

        return {
            status: 200,
            data: updatedProject,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}

export const updateTheme = async (
    projectId: string,
    theme: string
): Promise<ReturnProps> => {
    try {
        if (!projectId || !theme) {
            return { status: 400, error: "Project ID and theme are required" }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                themeName: theme,
                updatedAt: new Date(),
            },
        })

        if (!updatedProject) {
            return {
                status: 500,
                error: "Failed to update slides",
            }
        }

        return {
            status: 200,
            data: updatedProject,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}
export const deleteAllProjects = async (
    projectIDs: string[]
): Promise<ReturnProps> => {
    try {
        if (!Array.isArray(projectIDs) || projectIDs.length === 0) {
            return {
                status: 400,
                error: "Project IDs are required",
            }
        }

        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const userID = checkUser.user.id

        const projectToDelete = await client.project.findMany({
            where: {
                id: {
                    in: projectIDs,
                },
                userId: userID,
            },
        })

        if (projectToDelete.length === 0) {
            return {
                status: 404,
                error: "No projects found to delete",
            }
        }

        const deletedProjects = await client.project.deleteMany({
            where: {
                id: {
                    in: projectToDelete.map((project) => project.id),
                },
            },
        })

        return {
            status: 200,
            data: `${deletedProjects.count} projects deleted successfully.`,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error: " + (error as Error).message,
        }
    }
}

export const getDeletedProjects = async (): Promise<ReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const userID = checkUser.user.id

        const projects = await client.project.findMany({
            where: {
                userId: userID,
                isDeleted: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        if (projects.length === 0) {
            return {
                status: 400,
                error: "No projects found to delete",
                data: [],
            }
        }

        return {
            status: 200,
            data: projects,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error: " + (error as Error).message,
        }
    }
}
