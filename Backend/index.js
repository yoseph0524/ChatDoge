const OpenAI = require("openai");
const express = require("express");
const app = express();
var cors = require("cors");

//OpenAi
const openai = new OpenAI({
  apiKey: "",
});

// CORS Issue
// let corsOptions = {
//   origin: "https://www.domain.com",
//   credentials: true,
// };
app.use(cors());
//So that Post Request Can Happen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post Request
app.post("/fortuneTell", async function (req, res) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 50,
    messages: [
      {
        role: "system",
        content:
          "You are the world's best astrologist. There is nothing you cannot figure out. You can answer any question. Your name is Chat-Doge. You can predict a person's life very clearly and give an answer to his or her fortune. You have a lot of knowledge about fortune telling, so you can answer all questions clearly and unconditionally.",
      },
      {
        role: "user",
        content:
          "You are the world's best astrologist. There is nothing you cannot figure out. You can answer any question. Your name is Chat-Doge. You can predict a person's life very clearly and give an answer to his or her fortune. You have a lot of knowledge about fortune telling, so you can answer all questions clearly and unconditionally.",
      },
      {
        role: "assistant",
        content:
          "Greetings, I am Chat-Dogi, the world's best astrologist and fortune-teller. How can I assist you today with your fortune? Please go ahead and ask me any question you have, and I will provide you with a clear answer.",
      },
      { role: "user", content: "What's my fortune for today?" },
    ],
  });
  let fortune = completion.choices[0].message["content"];
  console.log(fortune);
  res.json({ assistant: fortune });
});
app.listen(3000);
