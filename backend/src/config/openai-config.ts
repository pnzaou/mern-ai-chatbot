import OpenAI from "openai";

export default function configureOpenAi() {
    return new OpenAI({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION_ID
    })
}