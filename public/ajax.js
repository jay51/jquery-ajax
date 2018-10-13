// $.get("/todos", function(data) {
// 	// debugger opens chrome debuging tools when it hits this point
// 	debugger;
// });

// listen for form submit POST
$("#new-todo-form").submit(function(e) {
	e.preventDefault();
	// converte the data to string
	const todoItem = $(this).serialize();
	console.log(todoItem);
	// send post to same domain post route
	$.post("/todos", todoItem, function(todo) {
		console.log("The data we got back:", todo);
		// update the todos ul
		$("#todo-list").append(
			`<li class="list-group-item">
				<span class="lead">
					${todo.text}
				</span>
				<div class="pull-right">
					<a href="/todos/${todo._id}/edit" class="btn btn-sm btn-warning">Edit</a>
					<form style="display: inline" method="POST" action="/todos/${todo._id}">
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

// // listen for form submit PUT
// $("form").submit(function(e) {
// 	e.preventDefault();
// 	const formData = $(this).serialize();
// 	const formAction = $(this).attr("action");
// 	$.ajax({
// 		url: formAction,
// 		data: formData,
// 		type: "PUT",
// 		success: function(data) {
// 			debugger;
// 		}
// 	});
// });

// listen for form submit DELETE
// $("form").submit(function(e) {
// 	e.preventDefault();
// 	const formAction = $(this).attr("action");
// 	$.ajax({
// 		url: formAction,
// 		type: "DELETE",
// 		success: function(data) {
// 			debugger;
// 		}
// 	});
// });
