const configureSocket = (io) => {
    let activeUsers = [];

    io.on("connection", (socket) => {
        socket.on("new-user-add", (newUserId) => {
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({
                    userId: newUserId,
                    socketId: socket.id,
                });
            }
            io.emit("get-users", activeUsers);
        });
        console.log(activeUsers)
        socket.on("send-message", (data)=>{
            const user = activeUsers.find((user)=> user.socketId !== socket.id);
            if(user){
                io.to(user.socketId).emit("receive-message", data);
            }
        })
        
        socket.on("disconnect", () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            io.emit("get-users", activeUsers);
        });
    });
};
export default configureSocket;
