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





/*

Character Creation Functions

*/

function combat_skill_roll() {
	roll_dice();
	lone_wolf.cs[0] = lone_wolf.random_number + 10;
	lone_wolf.cs[2] = lone_wolf.cs[0];
	book.inner_list_value(
		$("#combat-skills li"),
		$("#combat-skills li p"),
		lone_wolf.cs
	);
	$("#combat-skills").fadeIn(3000);
	game.update_data(lone_wolf);
	book.remove_button(button); // bug - possible add class with opacity instead
}
function endurance_skill_roll() {
	roll_dice();
	lone_wolf.maximum_ep[0] = lone_wolf.random_number + 20;
	lone_wolf.maximum_ep[2] = lone_wolf.maximum_ep[0];
	book.inner_list_value(
		$("#endurance-points li"),
		$("#endurance-points li p"),
		lone_wolf.maximum_ep
	);
	$("#endurance-points").fadeIn(3000);
	game.update_data(lone_wolf);
	book.remove_button(button);
}
function kai_discipline_choosing() {
	const profile = auto_save_data();
	while (profile.kai > 5) {
		
	}
}

/*

game_rulles_check: function (index) {
	if (data[index].game_rulles == "overwrite_book_write") {
		game.character_creation();
	} else if (data[index].game_rulles == "check_me") {
		if (index == NaN || index == undefined) {
			alert("Sorry there seems to be a problem...");
		} else if (lone_wolf.ep <= 0) {
			alert("You lost the game"); // Change message add animation
		}
		game.main_game();
	} else {
		if (index == NaN || index == undefined) {
			alert("Sorry there seems to be a problem...");
		} else if (lone_wolf.ep <= 0) {
			alert("You lost the game"); // Change message add animation
		}
		$("#book").fadeOut();

		setTimeout(function () {
			book.write_book();
		}, 1000);
	}
},
character_creation: function (index) {
	
	
		
	} else if (index == 5) {
		var id = data[index].button_target.split(","); // bug when rapidly clicking buttons
		var active_button = $(button).index();

		$(".visible")
			.fadeOut(1000)
			.removeClass("visible");
		setTimeout(function () {
			$(id[active_button])
				.removeClass("hidden")
				.addClass("visible")
				.fadeIn(1500);
		}, 1000);
	} else if (index == 6) {
		if (
			$(button)
				.parent()
				.hasClass("selected")
		) {
			$(button)
				.html("Select")
				.removeClass("flashing");
			$(button)
				.parent()
				.removeClass("selected");
		} else {
			$(button)
				.html("Selected")
				.addClass("flashing");
			$(button)
				.parent()
				.addClass("selected");
		}

		var selected_disciplines_count = $(".selected");
		var selected_disciplines_names = $(".selected").attr("id");

		if (selected_disciplines_count.length == 5) {
			$("#book").fadeOut(1000);

			for (let i = 0; i < selected_disciplines_count.length; i++) {
				lone_wolf.kai.push($(selected_disciplines_count[i]).attr("id"));
			}

			book.inner_list_item(
				$("#kai-disciplines"),
				lone_wolf.kai,
				"Kai Disciplines"
			);
			$("#kai-disciplines").fadeIn(1000);

			book.check_value(lone_wolf.kai, "weapon-skill", 8, 7);
			game.update_data(lone_wolf);

			$("#book").fadeOut();

			setTimeout(function () {
				book.write_book();
			}, 1000);
		}
	} else if (index == 9) {
		roll_dice();
		var mastery_weapons = [
			"dagger",
			"spear",
			"mace",
			"short sword",
			"warhammer",
			"sword",
			"axe",
			"sword",
			"quarterstaff",
			"broadsword"
		];
		var mastery_weapon = mastery_weapons[lone_wolf.random_number];
		lone_wolf.mastery_weapon = mastery_weapon;
		if (lone_wolf.weapons == lone_wolf.mastery_weapon) {
			lone_wolf.cs[1] = +2;
			lone_wolf.cs[2] = lone_wolf.cs[0] + 2;
			book.inner_list_value(
				$("#combat-skills li"),
				$("#combat-skills li p"),
				lone_wolf.cs
			);
		}
		game.update_data(lone_wolf);
		$(".section-header").fadeOut(1000);
		setTimeout(function () {
			$(".section-header")
				.html("Your mastery weapon is " + mastery_weapon)
				.fadeIn(1000);
		}, 1000);

		setTimeout(function () {
			$("#book").fadeOut(1000);
		}, 3000);

		setTimeout(function () {
			index = 7;
			book.write_book();
		}, 4000);
	} else if (index == 11) {
		$("#weapons").fadeIn(3000);
		roll_dice();
		lone_wolf.golds_arrows[0] =
			lone_wolf.golds_arrows[0] + lone_wolf.random_number;
		$(".section-header").fadeOut(1000);
		if (lone_wolf.golds_arrows[0] == 0) {
			setTimeout(function () {
				$(".section-header")
					.html("The pouch is empty!")
					.fadeIn(1000);
				book.inner_list_value(
					$("#golds-arrows ul li"),
					$("#golds-arrows ul li p"),
					lone_wolf.golds_arrows
				);
				$("#golds-arrows").fadeIn(3000);
				$("#backpack").fadeIn(3000);
				book.remove_button(button);
			}, 1000);
		} else if (lone_wolf.golds_arrows[0] == 1) {
			setTimeout(function () {
				$(".section-header")
					.html("You found 1 gold.")
					.fadeIn(1000);
				book.inner_list_value(
					$("#golds-arrows ul li"),
					$("#golds-arrows ul li p"),
					lone_wolf.golds_arrows
				);
				$("#golds-arrows").fadeIn(3000);
				$("#backpack").fadeIn(3000);
				book.remove_button(button);
			}, 1000);
		} else {
			setTimeout(function () {
				$(".section-header")
					.html("You found " + lone_wolf.random_number + " golds.")
					.fadeIn(1000);
				book.inner_list_value(
					$("#golds-arrows ul li"),
					$("#golds-arrows ul li p"),
					lone_wolf.golds_arrows
				);
				game.update_data(lone_wolf);
				$("#golds-arrows").fadeIn(3000);
				$("#backpack").fadeIn(3000);
				book.remove_button(button);
			}, 1000);
		}
	} else if (index == 12) {
		roll_dice();
		var items = $("#img-container div");
		var found_item = items[lone_wolf.random_number];
		var item_name = data[index].items_names.split(",");
		$("#equipment-header").fadeOut(1500);

		if (lone_wolf.random_number == 8) {
			lone_wolf.golds_arrows[0] = lone_wolf.golds_arrows[0] + 12;
			book.inner_list_value(
				$("#golds-arrows ul li"),
				$("#golds-arrows ul li p"),
				lone_wolf.golds_arrows
			);
			game.update_data(lone_wolf);
		} else if (lone_wolf.random_number == 1 || lone_wolf.random_number == 3) {
			if (lone_wolf.random_number == 1) {
				lone_wolf.maximum_ep[1] = +2;
				lone_wolf.maximum_ep[2] =
					lone_wolf.maximum_ep[0] + lone_wolf.maximum_ep[1];
				lone_wolf.ep = lone_wolf.maximum_ep[2];
				book.inner_list_value(
					$("#endurance-points li"),
					$("#endurance-points li p"),
					lone_wolf.maximum_ep
				);
			} else {
				lone_wolf.maximum_ep[1] = +4;
				lone_wolf.maximum_ep[2] =
					lone_wolf.maximum_ep[0] + lone_wolf.maximum_ep[1];
				lone_wolf.ep = lone_wolf.maximum_ep[2];
				book.inner_list_value(
					$("#endurance-points li"),
					$("#endurance-points li p"),
					lone_wolf.maximum_ep
				);
			}
			lone_wolf.special_items.push(item_name[lone_wolf.random_number]);
			book.inner_list_item(
				$("#special-items"),
				lone_wolf.special_items,
				"Special Items"
			);
			$("#special-items").fadeIn(3000);
		} else if (lone_wolf.random_number == 2 || lone_wolf.random_number == 5) {
			if (lone_wolf.random_number == 2) {
				lone_wolf.backpack.push(item_name[lone_wolf.random_number]) * 2;
			}
			lone_wolf.backpack.push(item_name[lone_wolf.random_number]);
			book.inner_list_item($("#backpack"), lone_wolf.backpack, "Backpack");
		} else {
			if (item_name[lone_wolf.random_number] == lone_wolf.mastery_weapon) {
				lone_wolf.cs[1] = +2;
				lone_wolf.cs[2] = lone_wolf.cs[0] + 2;
				book.inner_list_value(
					$("#combat-skills li"),
					$("#combat-skills li p"),
					lone_wolf.cs
				);
			}
			lone_wolf.weapons.push(item_name[lone_wolf.random_number]);
			game.update_data(lone_wolf);
			book.inner_list_value(
				$("#weapons ul li"),
				$("#weapons ul li p"),
				lone_wolf.weapons
			);
		}

		setTimeout(function () {
			$(found_item)
				.fadeIn(1500)
				.removeClass("hidden");
			game.update_data(lone_wolf);
			$("#weapons").fadeIn(3000);
			$("#golds-arrows").fadeIn(3000);
			$("#backpack").fadeIn(3000);
			book.remove_button(button);
		}, 1500);
	} else {
		setTimeout(function () {
			book.write_book();
		}, 1000);
	}
}, */
// index - new game 0.1 / game 1

/*

Events

*/

// Add Event Eistener
function event_listeners() {
	document.addEventListener("DOMContentLoaded", game_data);
}

event_listeners();

/*

Game Data

*/

function game_data() {
	if (localStorage.length === 0) {
		create_data();
		console.log(localStorage);
		show_profiles();
	} else {
		show_profiles();
		console.log(localStorage);		
	}
}
// Push Data TO localStorage
function create_data() {
	const index = 0;
	const profiles = [];
	// Change it to Auto Save
	var lone_wolf = {
		ep: 1,
		maximum_ep: [{ basic: 0 }, { adition: 0 }, { final: 0 }],
		cs: [{ basic: 0 }, { adition: 0 }, { final: 0 }],
		kai: [],
		weapons: ["axe"],
		mastery_weapon: "",
		golds_arrows: [{ golds: 0 }, { arrows: 0 }],
		backpack: ["meal"],
		special_items: [],
		random_number: 0
	};
	queue()
		.defer(d3.csv, "data/character-creation.csv")
		.defer(d3.csv, "data/main-data.csv")
		.defer(d3.csv, "data/kai.csv")
		.await(store_data);

	function store_data(error, character_creation_data, main_data, kai_disciplines) {
		localStorage.setItem("error", JSON.stringify(error));
		localStorage.setItem("character_creation_data", JSON.stringify(character_creation_data));
		localStorage.setItem("main_data", JSON.stringify(main_data));
		localStorage.setItem("index", JSON.stringify(index));
		localStorage.setItem("kai_disciplines", JSON.stringify(kai_disciplines));
		localStorage.setItem("lone_wolf", JSON.stringify(lone_wolf));
		localStorage.setItem("profiles", JSON.stringify(profiles));
	}
}

// Add profile to localStorage
function add_profile(input) {
	const profiles = profiles_data();
	let profile = input.name.value;

	// Check if field is not empty
	if (profile === null || profile === "") {
		alert("Please add profile name");
		return false;
	}
	// Check if there is profile already in localStorage
	if (profiles === undefined) {
		profiles = [];
	}
	// Check if profile already exist

	// Maximum 3 profiles
	if (profiles.length === 3) {
		alert("Maximum profiles reached");
		return false;
	}
	// Create new profile object and store it in localStorage
	function Profile(id) {
		this.id = id;
		this.profile_index = 0,
		this.profile_game_data = [];
		this.start_date = new Date();
	}
	const new_profile = new Profile(profile);

	profile = new_profile;
	profiles.push(profile);
	localStorage.setItem("profiles", JSON.stringify(profiles));

	input.name.value = "";
	show_profiles();

	return false;
}
// Get Charcter creation data
function character_creation_data() {
	const get_character_creation_data = localStorage.getItem("character_creation_data");
	const character_creation = JSON.parse(get_character_creation_data);
	return character_creation;

}
// Get Main Game data
function main_game_data() {
	const get_main_data = localStorage.getItem("main_data");
	var main_data = JSON.parse(get_main_data);
	return main_data;
}
// Get index 
function get_index() {
	const get_index = localStorage.getItem("index");
	const index = JSON.parse(get_index);
	return index;
}
// Get Kai Disciplines data
function kai_disciplines_data() {
	const get_kai_disciplines = localStorage.getItem("kai_disciplines");
	const kai_disciplines = JSON.parse(get_kai_disciplines);
	return kai_disciplines;
}
// Get Auto Save data
function auto_save_data() {
	const get_lone_wolf = localStorage.getItem("lone_wolf");
	const lone_wolf = JSON.parse(get_lone_wolf);
	return lone_wolf;
}
// Get Profiles data
function profiles_data() {
	const get_profiles = localStorage.getItem("profiles");
	const profiles = JSON.parse(get_profiles);
	console.log(profiles);
	
	return profiles;
}
// Get Data FROM localStorage
function get_all_data() {
	const character_creation = character_creation_data();
	const main_data = main_game_data();
	const index = get_index();
	const kai_disciplines = kai_disciplines_data();
	const auto_save = auto_save_data();
	const profiles = profiles_data();
	const data = [
		character_creation_data,
		main_data,
		index,
		kai_disciplines,
		auto_save,
		profiles
	];
	console.log(data);
	return data;
}

/* 

Main Menu 

*/

// Show Profiles list
function show_profiles() {
	const data = character_creation_data();
	const profiles = profiles_data();

	if (profiles == [] || profiles === null) {
		return false;
	} else {
		$("#profiles-list").empty();

		for (let i = 0; i < profiles.length; i++) {
			$("#profiles-list").append(`
			<div id="${profiles[i].id}" class="row">
				<div class="col-xs-8">
					<h3 class="text-left">${profiles[i].id}</h3>
				</div>
				<div class="col-xs-2">
					<button value="${profiles[i].profile_index}" onclick="return load_game(this);" 
					class="btn btn-basic">
						<i class="fas fa-upload fa-2x"></i>
					</button>
				</div>
				<div class="col-xs-2">
					<a id="" href="#" onclick="return delete_profile(${profiles[i].id})">
						<i class="far fa-trash-alt fa-2x"></i>
					</a>
				</div>
				<hr/>
			</div>`);
		}
		$("#profiles-list").fadeIn(1500);
		$("#profiles-list").fadeIn(1500);
	} 
}
// Delete Profiles
function delete_profile(delete_profile) {
	const profiles = profiles_data();
	for (var i = 0; i < profiles.length; i++) {
		if (profiles[i].id == delete_profile.id) {
			profiles.splice(i, 1);
			break;
		}
	}
	localStorage.setItem("profiles", JSON.stringify(profiles));
	$(delete_profile)
		.fadeOut(1500)
		.remove();
	console.log(localStorage.profiles);
}
// Load Game
function load_game(button) {
	$("#main-menu").fadeOut(1000);
	play_game(button);
}

/*
Testing
*/

// Clear localStorage
function clear_local_storage() {
	localStorage.clear();
	location.reload(true);
}

/*

Misc Functions

*/

// Random Number 0-9
function roll_dice() {
	lone_wolf.random_number = Math.floor(Math.random() * 10);
}
// Check if is in it
function is_in_it(array, element) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === element) {
			return true;
		}else {
			return false;
		}
		
	}
}



// TESTING
//////////////////////////////////////////////////////////////////
const book = {
	sections: [],
	buttons: [],

	check_value: function(items_to_check, check_me, yes, no) {
		for (let i = 0; i < items_to_check.length; i++) {
			if (check_me == items_to_check[i]) {
				index = yes;
				break;
			} else {
				index = no;
			}
		}
	},

	
	create_section: function(section) {
		this.sections.push(section);
	},
	disciplines_buttons: function(hide_this, check_discipline) {
		//camouflage,hunting,sixth-sense,tracking,healing,weapon-skill,mindshield,mindblast,animal-kinship,mind-over-matter

		for (let i = 0; i < lone_wolf.kai.length; i++) {
			if (lone_wolf.kai[i] != check_discipline) {
				$(hide_this).remove();
			} 
		}
	},
	remove_button: function(button) {
		$(button).fadeOut(1500);

		setTimeout(function() {
			$(button).remove();

			if ($(".button-container button").length == 1) {
				$(".button-container button")
					.fadeIn(3000)
					.removeClass("hidden");
			}
		}, 1500);
	},
	inner_list_item: function(target, new_items, list_name) {
		$(target).empty();

		$(target).append(`<h3>${list_name}</h3>`);

		for (let i = 0; i < new_items.length; i++) {
			var item = new_items[i];

			$(target).append(`
					<li class="col-xs-12">
						<h4>${item}</h4>
					</li>`);
		}
	},
	inner_list_value: function(li, p, value) {
		for (let i = 0; i < p.length; i++) {
			$(li[i]).val(value[i]);
			$(p[i]).html(value[i]);
		}
	}
};
	/////////////////////////////////////////////////////////////////