const fs = require("fs");
const path = require("path");

const postsFilePath = path.join(__dirname, "posts.json");

const loadPosts = () => {
  if (!fs.existsSync(postsFilePath)) return [];
  return JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
};

const savePosts = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

module.exports = {
  loadPosts,
  savePosts
};