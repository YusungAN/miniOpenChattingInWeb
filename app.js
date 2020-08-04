const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let carray = new Array();

app.use(express.static("js"));
app.use(express.static("css"));


app.get("/chatting", (req, res) => {
    res.sendFile(__dirname + "/chatting.html");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/chatindex.html");
});

io.on("connection", socket => {
    console.log(`user connected`);
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log(`user disconnected`);
    });

    socket.on("noticeDisconnect", data => {
        const nindex = carray.indexOf(data.name);
        carray.splice(nindex, 1);
        console.log(carray);
        io.emit("printDisconnect", {
            name: data.name,
            ccount: carray.length
        });
    });

    socket.on("noticeConnect", data => {
        carray.push(data.name);
        console.log(carray);
        io.emit("printConnect", {
            name: data.name,
            ccount: carray.length,
            carray: carray
        });
    });

    socket.on("sendMsg", data => {
        socket.broadcast.emit("writeMsg", {
            username: data.username,
            description: data.words
        });
    });
});

http.listen(8001, () => {
    console.log("listening on *:8001");
});
