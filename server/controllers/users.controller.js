const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../db/users.json");

let users = [];


if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

const createUser = (request, response) => {
    const { userName, name, urlImg, password } = request.body;
    const existingUser = users.find(user => user.userName === userName);

    if (existingUser) {
        return response.status(400).json({ error: "Usuario ya registrado" });
    }

    const newUser = { id: users.length + 1, userName, name, urlImg, password };
    users.push(newUser);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    response.status(201).json({ message: "Usuario registrado correctamente", user: newUser });
}

const loginUser = (request, response) => { 
    const { userName, password } = request.body;
    const user = users.find(u => u.userName === userName);

    if (!user) {
        return response.status(404).json({ error: "Usuario no registrado" });
    }

    if (user.password !== password) {
        return response.status(401).json({ error: "Contraseña incorrecta" });
    }
 
    response.status(200).json({ message: "Login exitoso", user });
}

const getUsers = (request, response) => {
    response.status(200).send(users);
}

module.exports = { 
    createUser,
    loginUser,
    getUsers
}