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
  let { myDateTime, userMessages, assistantMessages } = req.body;

  let todayDateTime = new Date();
  let messages = [
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
        "Greetings, I am Chat-Dogi, the world's best astrologist and fortune-teller. How can I assist you today with your fortune? Please go ahead and ask me any question you have, and I will provide you with a clear answer. I will write in bullet points and indents or new lines to make it clear",
    },
    {
      role: "user",
      content: `My birtday is ${myDateTime} and today is ${todayDateTime}`,
    },
    {
      role: "assistant",
      content: `I have confirmed that your date of birth is ${myDateTime} and today's date is ${todayDateTime}. Ask me anything about your fortune! I will not ask anything about your information now `,
    },
  ];

  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      messages.push(
        JSON.parse(
          '{"role": "user", "content": "' +
            String(userMessages.shift()).replace(/\n/g, "") +
            '"}'
        )
      );
    }
    if (assistantMessages.length != 0) {
      messages.push(
        JSON.parse(
          '{"role": "assistant", "content": "' +
            String(assistantMessages.shift().replace(/\n/g, "<br>")) +
            '"}'
        )
      );
    }
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  let fortune = completion.choices[0].message["content"];
  console.log(fortune);
  res.json({ assistant: fortune });
});
app.listen(3000);
