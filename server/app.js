var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	expressSanitizer = require("express-sanitizer");

mongoose.connect(
	"mongodb://localhost:27017/todo_app",
	{ useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Cotnent-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

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
			res.json(todos);
		}
	});
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
