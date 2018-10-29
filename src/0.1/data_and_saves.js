

// Get data from db
function create_data() {
	$.get("/new-game", function (data) {
		store_data(data);
	}).fail(function (xhr, status, error) {
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
	return false;
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

