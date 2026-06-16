import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from "@aws-sdk/client-bedrock-agent-runtime";

const client = new BedrockAgentRuntimeClient({ region: "us-east-1" });

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const question = body.question;

  const command = new RetrieveAndGenerateCommand({
    input: { text: question },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId: "KN803QPEAO",
        modelArn: "arn:aws:bedrock:us-east-1:780142025167:inference-profile/us.anthropic.claude-haiku-4-5-20251001-v1:0"
      }
    }
  });

  const response = await client.send(command);

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ answer: response.output.text })
  };
};