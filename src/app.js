import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import CreateAdmin from "./controllers/AdminController";
import userRoutes from "./routes/UserRoutes";

import models from "./models";

dotenv.config();

CreateAdmin();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Product Management (API)
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Welcome to Product Management",
  });
});

models.sequelize
  .sync({
    force: false,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    )
  );

export default app;
