var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	expressSanitizer = require("express-sanitizer"),
	methodOverride = require("method-override");

mongoose.connect(
	"mongodb://localhost:27017/todo_app",
	{ useNewUrlParser: true }
);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

var todoSchema = new mongoose.Schema({
	text: String
});

var Todo = mongoose.model("Todo", todoSchema);

// this will remove all todos befor redirecting
app.get("/", function(req, res) {
	Todo.remove({}, function() {
		res.redirect("/todos");
	});
});

app.get("/todos", function(req, res) {
	Todo.find({}, function(err, todos) {
		if (err) {
			console.log(err);
		} else {
			// if request was sent vi ajax by checking the request header & send json back
			if (req.xhr) {
				res.json(todos);
			} else {
				res.render("index", { todos: todos });
			}
		}
	});
});

app.get("/todos/new", function(req, res) {
	res.render("new");
});

app.post("/todos", function(req, res) {
	console.log("befor sanitize:", req.body);
	req.body.todo.text = req.sanitize(req.body.todo.text);
	console.log("after sanitize:", req.body);
	var formData = req.body.todo;
	Todo.create(formData, function(err, newTodo) {
		if (err) {
			res.render("new");
		} else {
			res.json(newTodo);
		}
	});
});

app.get("/todos/:id/edit", function(req, res) {
	Todo.findById(req.params.id, function(err, todo) {
		if (err) {
			console.log(err);
			res.redirect("/");
		} else {
			res.render("edit", { todo: todo });
		}
	});
});

app.put("/todos/:id", function(req, res) {
	Todo.findByIdAndUpdate(req.params.id, req.body.todo, { new: true }, function(
		err,
		todo
	) {
		if (err) {
			console.log(err);
		} else {
			res.json(todo);
		}
	});
});

app.delete("/todos/:id", function(req, res) {
	Todo.findByIdAndRemove(req.params.id, function(err, todo) {
		if (err) {
			console.log(err);
		} else {
			res.json(todo);
		}
	});
});

app.listen(3000, function() {
	console.log("Server running on port 3000");
});

// // Uncomment the three lines of code below and comment out or remove lines 84 - 86 if using cloud9
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The server has started!");
// });
