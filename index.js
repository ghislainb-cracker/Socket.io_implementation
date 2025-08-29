import express from "express";
import http from "http";;
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
})

io.on("connection", (client) => {
    console.log("user connected to server ✅");
    client.emit('message', "Server ")
    client.on("disconnect", () => {
        console.log("user disconnected from the server ❌")
    })
})


server.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}`)
})