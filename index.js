const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  let users = await prisma.user.findMany();
  res.send(users);
});

app.post("/users/create", async (req, res) => {
  const { email, name } = req.body;
  let user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.send(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
