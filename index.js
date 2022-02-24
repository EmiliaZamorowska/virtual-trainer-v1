import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import exercisesRoutes from "./routes/exercises.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/exercises", exercisesRoutes);
app.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("frontend", "build", "index.html"));
  });
}
console.log(`🟢 ${process.env.NODE_ENV}🟢`);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`🚀🚀🚀 Server running on port: ${PORT} 🚀🚀🚀`)
    )
  )
  .catch((error) => console.log(error.message));
