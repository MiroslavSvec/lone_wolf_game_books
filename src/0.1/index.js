
/* 
Start new game
*/

function new_game() {	
	create_data();
	check_ls();	
}

// Check data in localStorage
function check_ls() {
	if (character_creation_data() && kai_disciplines_data() && lone_wolf() && inventory()) {
		window.location.replace("/character-creation");
	} else {
		let message = 'Some of the data could not be saved...'
		alerts(message);
	}
}

