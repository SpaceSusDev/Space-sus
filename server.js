
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("SPACE SUS multiplayer está online! 🚀");
});

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({
    type: "welcome",
    message: "Bem-vindo ao SPACE SUS!"
  }));

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`SPACE SUS online na porta ${PORT}`);
});
