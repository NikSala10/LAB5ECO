const path = require("path");
const { loadUsers } = require("../db/users.db");
const { loadPosts, savePosts } = require("../db/posts.db");

const createPost = (request, response) => { 
    const { name, urlImg, title, description } = request.body;

    const users = loadUsers();  
    const posts = loadPosts(); 

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
    savePosts(posts);   

    response.status(201).json({ message: "Post creado exitosamente", post: newPost });
}

const getPosts = (request, response) => { 
    const posts = loadPosts();
    response.status(200).send(posts);
}

module.exports = { 
    createPost,
    getPosts
}