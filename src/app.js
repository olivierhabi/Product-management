import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//(API) Endpoints

app.get("/", (req, res) => {
  console.log({ message: "Welcome Product Management" });
  return res.status(200).send({
    status: 200,
    message: "Welcome Product Management",
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);

export default app;
