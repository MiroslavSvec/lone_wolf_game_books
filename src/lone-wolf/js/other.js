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



