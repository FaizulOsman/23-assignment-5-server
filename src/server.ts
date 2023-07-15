import express from "express";
const mongoose = require("mongoose");

const app = express();
const port = 5000;

// Database Connection
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Database Connected");
  } catch (error) {
    console.log(`Failed to connect database`, error);
  }
}
main();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
