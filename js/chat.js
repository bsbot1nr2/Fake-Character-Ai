const chat = document.getElementById("chat");
const text = document.getElementById("text");

function addMessage(msg, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.textContent = msg;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function sendUser() {
  if (!text.value) return;
  addMessage(text.value, "user");
  text.value = "";
}

// Checkt jede Sekunde, ob auf /ai geantwortet wurde
setInterval(() => {
  const aiMsg = localStorage.getItem("ai_response");
  if (aiMsg) {
    addMessage(aiMsg, "char");
    localStorage.removeItem("ai_response");
  }
}, 1000);
