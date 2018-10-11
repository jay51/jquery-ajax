// $.get("/todos", function(data) {
// 	// debugger opens chrome debuging tools when it hits this point
// 	debugger;
// });

// listen for form submit POST
// $("form").submit(function(e) {
// 	e.preventDefault();
// 	// converte the data to string
// 	const formData = $(this).serialize();
// 	// send post to same domain post route
// 	$.post("/todos", formData, function(res) {
// 		console.log("The data we got back:", res);
// 	});
// });

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
$("form").submit(function(e) {
	e.preventDefault();
	const formAction = $(this).attr("action");
	$.ajax({
		url: formAction,
		type: "DELETE",
		success: function(data) {
			debugger;
		}
	});
});
