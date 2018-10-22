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
