




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