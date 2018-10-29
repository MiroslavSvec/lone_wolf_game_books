

// Get Character creation data from db and store them in localStorage
// Redirect user to game if data exists
function create_data() {
	$.get("/new-game", function (data) {
		store_data(data);
		check_character_creation_data_ls();
	}).fail(function (xhr, status, error) {
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
	return false;
}

// Log out the user from Flask Session

function log_out() {
	$.get("/log-out", function(data) {
		// For error messages later on
		console.log(data)
	}).fail(function(xhr, status, error) {
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
	return false;
}

// Check Character creation data in localStorage
function check_character_creation_data_ls() {
	if (localStorage.character_creation_data && localStorage.inventory && localStorage.kai_disciplines && localStorage.lone_wolf) {
		window.location.replace("/character-creation");
	} else {
		console.log(localStorage.character_creation_data);
		console.log(localStorage.inventory);
		console.log(localStorage.kai_disciplines);
		console.log(localStorage.lone_wolf);
		let message = "Some of the data could not be saved...";
		alerts(message);
	}
}

// Push Data TO localStorage
function store_data(data) {
	localStorage.setItem("character_creation_data", JSON.stringify(data.character_creation));
	localStorage.setItem("kai_disciplines", JSON.stringify(data.kai_disciplines));
	localStorage.setItem("lone_wolf", JSON.stringify(data.lw));
	localStorage.setItem("inventory", JSON.stringify(data.inventory));
}


// Get Charcter creation data
function character_creation_data() {
	let get_character_creation_data = localStorage.getItem("character_creation_data");
	let character_creation = JSON.parse(get_character_creation_data);
	return character_creation;

}
// Get Main Game data
function main_game_data() {
	let get_main_data = localStorage.getItem("main_data");
	var main_data = JSON.parse(get_main_data);
	return main_data;
}
// Get Kai Disciplines data
function kai_disciplines_data() {
	let get_kai_disciplines = localStorage.getItem("kai_disciplines");
	let kai_disciplines = JSON.parse(get_kai_disciplines);
	return kai_disciplines;
}
// Get Inventory data
function inventory() {
	let get_inventory = localStorage.getItem("inventory");
	let inventory = JSON.parse(get_inventory);
	return inventory;
}
// Get Save data
function lone_wolf() {
	let get_lone_wolf = localStorage.getItem("lone_wolf");
	let lone_wolf = JSON.parse(get_lone_wolf);
	return lone_wolf;
}
// Get Data FROM localStorage
function get_all_data() {
	let data = [main_game_data(), character_creation_data(), kai_disciplines_data(), lone_wolf(), inventory()];
	console.log(data);
	return data;
}

// Clear localStorage
function clear_local_storage() {
	localStorage.clear();
	location.reload(true);
}



/* 
Start new game
*/

function new_game() {	
	create_data();
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

// Fade Out and In helper function
function fade_out_in(element, speed, fade_in, fade_in_ele) {
	$(element).fadeOut(speed)
	if (fade_in) {
		setTimeout(function() {
			$(fade_in_ele).fadeIn(speed);
		}, speed);		
	}
}




/*
Alerts modal
*/

$(document).ready(function() {
	flashed_messages();
});

function alerts(message) {
	$("#messages").html(`<p>${message}</p>`);
	$("#alerts").slideDown(1500);
	setTimeout(() => {
		$("#alerts").slideUp(1500);
	}, 4000);
}

function flashed_messages() {
	let messages = parseInt($("#messages p").length);
	if (messages) {
		$("#alerts").slideDown(1500);
		setTimeout(() => {
			$("#alerts").slideUp(1500);
		}, 5000);
	}
}


