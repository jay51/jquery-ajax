// open the clinet app with VS code live server
$.get("http://localhost:3000/todos", function(todos) {
	todos.forEach(function(todo) {
		$("#todo-list").append(
			`<li class="list-group-item">
			
			<form id="edit-todo-form" action="/todos/${todo._id}" method="POST">
			<div class="form-group">
			<label for="${todo._id}" >Item Text</label>
			<input type="text" value="${todo.text}" name="todo[text]" id="${
				todo._id
			}" class="form-control">
			</div>
			<button class="btn btn-primary">Update Item</button>
			</form>
			
			<span class="lead">
			${todo.text}
			</span>
			<div class="pull-right">
			<button id="edit-btn" class="btn btn-sm btn-warning">Edit</button>
			<form id="delete-todo-form" style="display: inline" method="POST" action="/todos/${
				todo._id
			}">
			<button type="submit" class="btn btn-sm btn-danger">Delete</button>
			</form>
			</div>
			<div class="clearfix"></div>
			</li>`
		);
	});
});

// listen for form submit POST
$("#new-todo-form").submit(function(e) {
	e.preventDefault();
	// converte the data to string
	const todoItem = $(this).serialize();
	// send post to same domain post route
	$.post("http://localhost:3000/todos", todoItem, function(todo) {
		// update the todos ul
		$("#todo-list").append(
			`<li class="list-group-item">

			<form id="edit-todo-form" action="/todos/${todo._id}" method="POST">
				<div class="form-group">
					<label for="${todo._id}" >Item Text</label>
					<input type="text" value="${todo.text}" name="todo[text]" id="${
				todo._id
			}" class="form-control">
				</div>
				<button class="btn btn-primary">Update Item</button>
			</form>

				<span class="lead">
					${todo.text}
				</span>
				<div class="pull-right">
					<button id="edit-btn" class="btn btn-sm btn-warning">Edit</button>
					<form id="delete-todo-form" style="display: inline" method="POST" action="/todos/${
						todo._id
					}">
						<button type="submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>
			</li>`
		);

		// delete input text
		$("#new-todo-form")
			.find(".form-control")
			.val("");
	});
});

// Inside #todo-list, any time element with #edit-btn clicked do function
$("#todo-list").on("click", "#edit-btn", function() {
	$(this)
		.parent()
		.siblings("#edit-todo-form")
		.toggle();
});

// Inside #todo-list, any time element with #edit-todo-form submited do function
$("#todo-list").on("submit", "#edit-todo-form", function(e) {
	e.preventDefault();
	const formData = $(this).serialize();
	const formAction = "http://localhost:3000" + $(this).attr("action");
	const originalTodo = $(this).parent(".list-group-item");
	$.ajax({
		url: formAction,
		data: formData,
		type: "PUT",
		// originalTodo,// he passed originalTodo to ajax to acesses it inside the callbeck but..
		success: function(todo) {
			originalTodo.html(
				`<form id="edit-todo-form" action="/todos/${todo._id}" method="POST">
				<div class="form-group">
				<label for="${todo._id}" >Item Text</label>
				<input type="text" value="${todo.text}" name="todo[text]" id="${
					todo._id
				}" class="form-control">
				</div>
				<button type="submit" class="btn btn-primary">Update Item</button>
			</form>
			<span class="lead">
				${todo.text}
			</span>
			<div class="pull-right">
				<button id="edit-btn" class="btn btn-sm btn-warning">Edit</button>
				<form id="delete-todo-form" style="display: inline" method="POST" action="/todos/${
					todo._id
				}">
					<button type="submit" class="btn btn-sm btn-danger">Delete</button>
				</form>
			</div>
			<div class="clearfix"></div>`
			);
		}
	});
});

// listen for form submit DELETE
$("#todo-list").on("submit", "#delete-todo-form", function(e) {
	e.preventDefault();
	const confirmRes = confirm("Are you sure?");
	if (confirmRes) {
		const originalTodo = $(this).closest(".list-group-item");
		const formAction = "http://localhost:3000" + $(this).attr("action");
		$.ajax({
			url: formAction,
			type: "DELETE",
			// originalTodo,
			success: function(data) {
				originalTodo.remove();
			}
		});
	}
	$(this)
		.find("button")
		.blur();
});
