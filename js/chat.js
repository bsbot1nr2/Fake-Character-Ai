const chat = document.getElementById("chat");
const textInput = document.getElementById("text");

function addMessage(msg, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.textContent = msg;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// User sendet Nachricht
function sendUser() {
  if (!textInput || !textInput.value) return;

  const msg = textInput.value;
  addMessage(msg, "user");
  saveMessage(msg, "user");
  textInput.value = "";
}

// Speicherfunktion
function saveMessage(msg, type) {
  const history = JSON.parse(localStorage.getItem("chat_history") || "[]");
  history.push({ msg, type });
  localStorage.setItem("chat_history", JSON.stringify(history));
}

// Chat laden
function loadChat() {
  const history = JSON.parse(localStorage.getItem("chat_history") || "[]");
  history.forEach(m => addMessage(m.msg, m.type));
}
loadChat();

// AI-Antwort empfangen
setInterval(() => {
  const aiMsg = localStorage.getItem("ai_response");
  if (aiMsg) {
    addMessage(aiMsg, "char");
    saveMessage(aiMsg, "char");
    localStorage.removeItem("ai_response");
  }
}, 800);
