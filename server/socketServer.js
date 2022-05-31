const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET , POST",
  },
});

const Redis = require("redis");
const redisClient = Redis.createClient({
  url: "redis://redis:6379",
});

const connectRedisClient = async () => {
  try {
    const connection = await redisClient.connect();
    console.log("successfully connected");
  } catch (error) {
    console.log(error);
  }
};

connectRedisClient();

const isUserExist = async (userId) => {
  return await redisClient.get(userId);
};

const addUser = async (userId, socketId) => {
  const user = await isUserExist(userId);
  console.log("we found ", user);
  if (user) {
    return false;
  }
  await redisClient.setEx(userId, 720, socketId);
  console.log(await redisClient.get(userId));
  console.log("user is set inside database ");
  return true;
};

const disconnectUser = async (userId) => {
  console.log("the needed user to delete is " + userId);
  if (!userId) {
    return;
  }
  return await redisClient.del(userId);
};

const findSocketId = async (userId) => {
  if (!userId) {
    return null;
  }
  return await redisClient.get(userId);
};

io.on("connection", (socket) => {
  socket.on("addUser", async (id) => {
    console.log(id);
    const userAdded = await addUser(id, socket.id);
    console.log(userAdded);
    if (!userAdded) {
      return socket.disconnect();
    }
    socket.user = id;
  });

  socket.on("message", async ({ senderId, text, recieverId }) => {
    const senderSocketId = await findSocketId(senderId);
    const recieverSocketId = await findSocketId(recieverId);
    if (!senderSocketId) {
      return false;
    }
    console.log(recieverSocketId, text, senderId);
    io.to(recieverSocketId).emit("message", { senderId, text });
  });

  socket.on("disconnect", () => {
    disconnectUser(socket.user);
    console.log(socket.id + " is disconncted");
  });
});

httpServer.listen(5000, () => {
  console.log("socket server is listening on port 5000");
});
