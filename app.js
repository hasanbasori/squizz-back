require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const errorMiddleware = require("./middlewares/error");
const CollectionRoute = require("./routes/CollectionRoute");
const CreatorRoute = require("./routes/CreatorRoute");
const QuestionRoute = require("./routes/QuestionRoute");
const QuizRoute = require("./routes/QuizRoute");
const UserRoute = require("./routes/UserRoute");
const UserHistory = require("./routes/UserHistoryRoute");
const PointRecord = require("./routes/PointRecordRoute");

// const { sequelize } = require('./models')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/collection", CollectionRoute);
app.use("/creator", CreatorRoute);
app.use("/question", QuestionRoute);
app.use("/quiz", QuizRoute);
app.use("/user", UserRoute);
app.use("/userhistory", UserHistory);
app.use("/pointrecord", PointRecord);

app.use((req, res, next) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use(errorMiddleware);

// sequelize.sync({ force: true}).then(() => console.log('DB sync'))

io.on("connection", (socket) => {
  console.log("creator connect");

  socket.on("hello", (arg) => {
    console.log(arg);
  });
  // socket.emit("hello", "world");

  socket.on("disconnect", () => {
    /* … */
  });
});

const port = process.env.PORT;
http.listen(port, () => console.log(`server is running on port ${port}`));
