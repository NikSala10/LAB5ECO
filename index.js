const express = require("express");
const path = require("path");
const app = express();
const userRoutes = require("./server/routes/users.routes")
const postRoutes = require("./server/routes/posts.routes")

app.use(express.json());
app.use("/screen-user-post", express.static(path.join(__dirname, "screen-user-post")));
app.use("/screen-all", express.static(path.join(__dirname, "screen-all")));


app.use("/", userRoutes);
app.use("/", postRoutes);

app.listen(5057);
