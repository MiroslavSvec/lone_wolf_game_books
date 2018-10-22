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

