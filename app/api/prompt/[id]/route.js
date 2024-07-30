import { connectToMongo } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToMongo();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed To Fetch All Prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToMongo();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully Updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToMongo();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
