const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 3600;
const server = http.createServer(express);
const socketServer = new WebSocket.Server({ server });

socketServer.on(
    'connection',
    (connection = (ws) => {
        ws.on(
            'message',
            (incoming = (data) => {
                socketServer.clients.forEach(
                    (each = (client) => {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(data);
                        }
                    }),
                );
            }),
        );
    }),
);

server.listen(port, function () {
    console.log(`Server is open ${port}`);
});
