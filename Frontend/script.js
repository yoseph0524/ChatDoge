const chatBox = document.querySelector(".chat-box");
let userMessages = [];
let assistantMessages = [];
let myDateTime = "";

function spinner() {
  document.getElementById("loader").style.display = "block";
}

function start() {
  const date = document.getElementById("date").value;
  const hour = document.getElementById("hour").value;
  if (date === "") {
    alert("Enter your date of birthday");
    return;
  }
  myDateTime = date + hour;
  document.getElementById("intro").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

const sendMessage = async () => {
  const chatInput = document.querySelector(".chat-input input");
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message");
  chatMessage.innerHTML = `
<p>${chatInput.value}</p>
`;
  chatBox.appendChild(chatMessage);

  //userMessage append
  userMessages.push(chatInput.value);

  chatInput.value = "";

  const response = await fetch("http://localhost:3000/fortuneTell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      myDateTime: myDateTime,
      userMessages: userMessages,
      assistantMessages: assistantMessages,
    }),
  });

  const data = await response.json();
  document.getElementById("loader").style.display = "none";

  //assistantMessage append
  assistantMessages.push(data.assistant);

  const astrologerMessage = document.createElement("div");
  astrologerMessage.classList.add("chat-message");

  let formattedMessage = data.assistant.replace(/\n\s*-/g, "<br>-");
  console.log(formattedMessage);
  astrologerMessage.innerHTML = `<p class='assistant'>${formattedMessage}</p>`;
  const hr = document.createElement("hr");
  astrologerMessage.appendChild(hr);
  const p = document.createElement("p");
  p.innerHTML =
    "You'll be even more lucky if you click the link and give a small fund. => ";
  p.classList.add("assistant", "lucky");
  const link = document.createElement("a");
  link.href = "https://toss.me/jocoding";
  link.innerHTML = "Sponsor";
  p.appendChild(link);
  astrologerMessage.appendChild(p);
  ("<p> <a href='https://toss.me/jocoding'>Sponsor</a></p>");
  chatBox.appendChild(astrologerMessage);
};

document
  .querySelector(".chat-input button")
  .addEventListener("click", sendMessage);
