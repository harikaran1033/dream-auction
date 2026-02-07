const registerSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected : ", socket.id);
    });
  });
};

export default registerSockets;
