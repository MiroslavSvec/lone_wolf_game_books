/*

Functions for innering Book

*/


///// CREATE TEMPLATES INSTEAD FOR EVERY SECTION.

// Get input and load data
function play_game(button) {
	const index = parseFloat(button.value);
	const clicked_button = button;
	// ADD IF STATMENT
	const get_data = character_creation_data();
	const data = get_data[index];

	return write_book_page(data, index, clicked_button);
}
function write_book_page(data, index, clicked_button) {
	$("#book").fadeOut(1200);
	setTimeout(function () {
		write_book(data, index, clicked_button);
		inner_buttons(data, index, clicked_button);
	}, 1300);
	
	
}
// Inner Header and sections to HTML
function write_book(data, index, clicked_button) {
	// Create a csv file with templates or take it out to external file
	let sections = [];
	$("#book").html(`
				<img class="background-img" src="assets/files/img/ui/book/background.png" alt="Book section background">`);
	$("#book").append(`
				<div class="row header">
					<div class="col-xs-12">
						<h1 class="col-xs-10 pull-right">${data.header}</h1>
						<img class="book-header-ornament" src="assets/files/img/ui/book/book-header-ornament.png" alt="Book Header Ornament">
					</div>
				</div>
				<hr/>`);
	function create_sections(section) {
		sections.push(section);
	}
	create_sections(data.top_section);
	create_sections(data.middle_section);
	create_sections(data.bottom_section);

	for (let i = 0; i < sections.length; i++) {
		if (i == 1 && data.img == "TRUE") {
			$("#book").append(`
						<div class="img-container sections row text-center">
							<img src="assets/files/img/${data.img_src}" alt="${
				data.img_alt
				}" >
						</div>`);
		} else if (
			i == 2 &&
			index == 4 &&
			data.game_rulles == "choose_disciplines"
		) {
			$("#book").append(`
						<div id="disciplines-container" class="sections col-xs-12 text-center"></div>`);
			$("#kai-disciplines").empty();

			var section_id = data.section_id.split(",");
			var disciplines_button_name = data.button_name.split(",");

			for (let i = 0; i < kai_disciplines.length; i++) {
				$("#disciplines-container").append(`
						<div id="${section_id[i]}" class="row text-center hidden">
							<h3 class=" col-xs-12">
								${kai_disciplines[i].name}</h3>
							<hr>
							<p class="col-xs-12">
								${kai_disciplines[i].description}
							</p>
							<button value="6" name="${
					disciplines_button_name[i]
					}" onclick="return game_book(this);" class="btn btn-basic">
								<img src="assets/files/img/ui/main-menu/button.png" />
								<h5>Select</h5>
							</button>
						</div>`);
			}
			$("#disciplines-container .row:first")
				.removeClass("hidden")
				.addClass("visible");
		} else if (
			i == 2 &&
			index == 10 &&
			data.game_rulles == "equipment_roll"
		) {
			$("#book").append(`
						<div id="img-container" class="sections row text-center"></div>`);

			var img_src = data.img_src.split(",");
			var img_alt = data.img_alt.split(",");

			for (let i = 0; i < img_src.length; i++) {
				$("#img-container").append(`
							<div class="${[i]} hidden">
								<h4>${img_alt[i]}</h4>
								<img class="" src="assets/files/img/${img_src[i]}" alt="${img_alt[i]}">
							</div>`);
			}
		} else {
			$("#book").append(
				`<div class="sections col-xs-12"><p>${sections[i]}</p></div>`
			);
		}
	}
	$("#book").append(`<hr/>`);

	setTimeout(function () {
		$("#book").fadeIn(3000);
	}, 1000);

	
}
// Inner buttons to HTML
function inner_buttons(data, index, clicked_button) {
	$("#book").append(`<div class="button-container text-center"></div>`);

	let button_targets = data.button_target.split(",");
	let button_names = data.button_name.split(",");

	for (let i = 0; i < button_names.length; i++) {
		if (data.game_rulles == "check_me") {
			let id = data.button_id.split(",");
			$(".button-container").append(`	
						<button id="${id[i]}" value="${button_targets[i]}" onclick="return ${data.button_function}(this);" class="btn btn-basic">
							<img src="assets/files/img/ui/book/book-button.png" />
								<p>${button_names[i]}</p>
						</button>`);
		} else {
			$(".button-container").append(`	
						<button value="${button_targets[i]}" onclick="return ${
				data.button_function
				}(this);" class="btn btn-basic">
							<img src="assets/files/img/ui/book/book-button.png" />
								<p>${button_names[i]}</p>
						</button>`);
			if (button_names[i] == "Continue" && button_names.length > 1) {
				$(".button-container button:last-child").addClass("hidden"); // Continue button always last
			}
		}
	}
}
//