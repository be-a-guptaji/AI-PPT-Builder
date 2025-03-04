"use server"

import client from "@/lib/prisma"
import { onAuthenticateUser } from "./user"
import { OutlineCard, ReturnProps } from "@/lib/types"

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
