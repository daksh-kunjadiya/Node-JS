const express = require("express");
let app = express();
app.use(express.json());
let todo = [
    { title: "HTML", isCompleted: true, id: 1 },
    { title: "javascript", isCompleted: true, id: 2 },
    { title: "React", isCompleted: false, id: 3 },
];
app.get("/", (req, res) => {
    res.send("welcome to the todoapi");
});
app.post("/addtodo", (req, res) => {
    const { title, isCompleted } = req.body;
    const newTodo = {
        title: title,
        isCompleted: isCompleted,
        id: Date.now(),
    };
    todo.push(newTodo);
    res.send(newTodo);
});
app.patch("/update/:id", (req, res) => {
    let { id } = req.params;
    const data = todo.map((ele) =>
        ele.id == id ? { ...ele, ...req.body } : ele);
    todo = data;
    const updatedTodo = todo.find((todo) => todo.id == id);
    res.send(updatedTodo);
});
app.get("/todo/:id", (req, res) => {
    let { id } = req.params;
    const found = todo.find((todo) => todo.id == id);
    res.send(found);
});
app.get("/todos", (req, res) => {
    res.send(todo);
});
app.get("/findbystatus", (req, res) => {
    let { isCompleted } = req.query;
    if (isCompleted === "true") {
        const TrueTodo = todo.filter((todo) => todo.isCompleted === true);
        res.send(TrueTodo);
    } else if (isCompleted === "false") {
        const FalseTodo = todo.filter((todo) => todo.isCompleted === false);
        res.send(FalseTodo);
    } else {
        res.send({ message: "Invalid query parameter." });
    }
});
app.delete("/delete/:id", (req, res) => {
    let { id } = req.params;
    const Delete = todo.find((todo) => todo.id == id);
    if (Delete) {
        todo.filter((todo) => todo.id != id);
        res.send({ deletedTodo: Delete, todos: todo });
    } else {
        res.send({ message: `Todo with ID ${id} not found` });
    }
});
app.listen(8090, () => {
    console.log("server is running on port 8090");
});
