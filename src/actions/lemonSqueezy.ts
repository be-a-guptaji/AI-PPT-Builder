"use server";

import { ReturnProps } from "@/lib/types";
import lemonSqueezyClient from "@/lib/axios";
import axios from "axios"; // Import axios for error handling
import { getProjectById } from "./projects";
import client from "@/lib/prisma";
import { onAuthenticateUser } from "./user";

export const buySubscription = async (
  buyUserID: string
): Promise<ReturnProps> => {
  try {
    // Verify if environment variables are set
    if (
      !process.env.LEMON_SQUEEZY_API_KEY ||
      !process.env.LEMON_SQUEEZY_STORE_ID ||
      !process.env.LEMON_SQUEEZY_VARIANT_ID
    ) {
      throw new Error(
        "Missing environment variables: Ensure LEMON_SQUEEZY_API_KEY, LEMON_SQUEEZY_STORE_ID, and LEMON_SQUEEZY_VARIANT_ID are set."
      );
    }

    const res = await lemonSqueezyClient(
      process.env.LEMON_SQUEEZY_API_KEY
    ).post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              buyUserID: buyUserID, // Ensure that `buyUserID` is valid
            },
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`, // Ensure redirect URL is valid
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID, // Ensure this is a valid store ID
            },
          },
          variant: {
            data: {
              type: "variants",
              id: process.env.LEMON_SQUEEZY_VARIANT_ID, // Ensure this is a valid variant ID
            },
          },
        },
      },
    });

    // Extract the checkout URL from the response
    const checkoutURL = res.data.data.attributes.url;

    return {
      status: 200,
      data: checkoutURL,
    };
  } catch (error) {
    // Check if the error is an AxiosError and log the detailed error response
    if (axios.isAxiosError(error)) {
      // Check for validation errors or other specific errors in the response
      if (error.response?.data?.errors) {
        return {
          status: 422, // Specific status code for validation errors
          error: error.response?.data.errors[0]?.detail || "Validation error",
        };
      } else {
        return {
          status: error.response?.status || 500,
          error:
            error.response?.data?.message ||
            "Request failed with an unknown error",
        };
      }
    } else {
      return {
        status: 500,
        error:
          "Internal Server Error: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }
};

export const buyTemplate = async (projectId: string): Promise<ReturnProps> => {
  try {
    // Retrieve project details
    const project = await getProjectById(projectId);

    if (project.status !== 200) {
      throw new Error(`Failed to retrieve project: ${project.error}`);
    }

    // Retrieve owner details using userId from the project
    const ownerDetails = await client.user.findUnique({
      where: {
        id: project.data.userId,
      },
    });

    if (!ownerDetails) {
      throw new Error("Failed to retrieve user details.");
    }

    // Ensure the `lemonSqueezyAPIKey` and `storeID` are available
    if (!ownerDetails.lemonSqueezyAPIKey || !ownerDetails.storeID) {
      throw new Error("Owner details are incomplete.");
    }

    // Authenticate the user
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return {
        status: 403,
        error: "User not authenticated.",
      };
    }

    // Proceed with the checkout process
    const res = await lemonSqueezyClient(ownerDetails.lemonSqueezyAPIKey).post(
      "/checkouts",
      {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                buyUserID: checkUser.user.id,
              },
            },
            product_options: {
              redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: ownerDetails.storeID,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: project.data.variantId,
              },
            },
          },
        },
      }
    );

    // Extract the checkout URL from the response
    const checkoutURL = res.data.data.attributes.url;

    return {
      status: 200,
      data: checkoutURL,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.errors) {
        return {
          status: 422,
          error: error.response?.data.errors[0]?.detail || "Validation error",
        };
      } else {
        return {
          status: error.response?.status || 500,
          error:
            error.response?.data?.message ||
            "Request failed with an unknown error",
        };
      }
    } else {
      return {
        status: 500,
        error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }
};
