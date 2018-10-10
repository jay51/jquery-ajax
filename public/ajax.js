// $.get("/todos", function(data) {
// 	// debugger opens chrome debuging tools when it hits this point
// 	debugger;
// });

// listen for form submit
$("form").submit(function(e) {
	e.preventDefault();
	// converte the data to string
	const formData = $(this).serialize();
	// send post to same domain post route
	$.post("/todos", formData, function(res) {
		console.log("The data we got back:", res);
	});
});
