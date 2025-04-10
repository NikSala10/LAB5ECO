const fs = require("fs");
const path = require("path");
const postsFilePath = path.join(__dirname, "../db/posts.json");
const usersFilePath = path.join(__dirname, "../db/users.json");

let users = [];
let posts = [];


if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

if (fs.existsSync(postsFilePath)) {
    posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
}

const createPost = (request, response) => { 
    const { name, urlImg, title, description } = request.body;

    const user = users.find(u => u.name === name);

    if (!user) {
        return response.status(404).json({ error: "Usuario no encontrado" });
    }

    const newPost = { 
        postId: posts.length + 1,
        name: user.name,
        urlImg: urlImg || "", 
        title, 
        description 
    };

    posts.push(newPost);

    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

    response.status(201).json({ message: "Post creado exitosamente", post: newPost });
}

const getPosts = (request, response) => { 
    response.status(200).send(posts);
}

module.exports = { 
    createPost,
    getPosts
}