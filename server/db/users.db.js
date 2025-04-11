const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../db/users.json");

let users = [];

const loadUsers = () => {
    if (!fs.existsSync(usersFilePath)) return [];
    return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  };
  
  const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  };
  
  module.exports = {
    loadUsers,
    saveUsers
  };