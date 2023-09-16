const OpenAI = require("openai");

// ... rest of your code

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  };
  const completion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params);
}

main();
