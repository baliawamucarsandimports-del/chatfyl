const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const username = document.getElementById("username");
const messages = document.getElementById("messages");

// Send message
form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (input.value && username.value) {
        socket.emit("chat message", {
            user: username.value,
            msg: input.value
        });
        input.value = "";
    }
});

// Receive message
socket.on("chat message", function(data) {
    const item = document.createElement("li");
    item.textContent = data.user + ": " + data.msg;
    messages.appendChild(item);
});

// 🔥 STEP 4: Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(() => console.log("Service Worker Registered"))
            .catch(err => console.log("SW failed:", err));
    });
}