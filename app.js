require("dotenv").config();
const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");
// const { sequelize } = require('./models')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/collection",CollectionRoute);
app.use("/creator", CreatorRoute);
app.use("/question", QuestionRoute);
app.use("/quiz", QuizRoute);
app.use("/user", UserRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use(errorMiddleware);

// sequelize.sync({ force: true}).then(() => console.log('DB sync'))

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));
