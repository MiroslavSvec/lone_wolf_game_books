
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