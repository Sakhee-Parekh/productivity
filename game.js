function characterStats(name, hp, ap, apConstant) {
	this.name = name;				//Name
	this.hp = hp;					//Health Points
	this.ap = ap;					//Attack Points [initial] (will be updated every round for hero)
	this.apConstant = apConstant;	//Attack Point Constant (the number that AP will be increased by every round)
}

var knight1 = new characterStats(
	'knight1',
	'45',
	'7',
	'7'
);

var knight2 = new characterStats(
	'Marcus',
	'43',
	'6.5',
	'6.5'
);

var hero = "";
var enemy = "";
var characters = ['knight1', 'knight2'];

function displayCharacters() {
	$('#message').html('<h2>Pick Your Character</h2>');

	for (var i = 0; i < characters.length; i++) {
		var chara = characters[i];
		var html = '<div class="character ' + chara + '"><img class="character-img ' + chara + '" src="images copy/profile/' + chara + '.gif" alt="' + this[chara].name + '" value="' + chara + '"></div>';
		$('#character-portraits').append(html);
	}
}


function pickCharacters() {

	$('.character-img').on('click', function() {
		if (hero === "") {
	
			hero = $(this).attr('value');
			console.log("Hero: " + window[hero].name);

			$('.character .'+hero).attr('class','animated fadeOut character ' + hero);
			setTimeout(function() {
				$('.character .'+hero).remove();
			},500);

			$('#message').html('<h2>Pick Your Enemy</h2>');
			$('#arena').append('<img id="hero" src="images copy/battle/' + hero + '.gif">');
			$('#hero').attr('class','animated fadeInRight');
			$('#hero-name').html(window[hero].name);
			$('#hero-stats').html('100<br><div id="hero-ap">' + window[hero].ap + '</div>0');
			$('#hero-hp').html(window[hero].hp);
			$('#hero-name, #hero-stats, #hero-hp').attr('class','animated fadeIn');

			setTimeout(function() {
				$('#hero-name, #hero-stats, #hero-hp').attr('class','');
			},1000);

			charaIndex = characters.indexOf(hero);
			characters.splice(charaIndex,1);
		}

		//If no enemy has been chosen
		else if (enemy === "") {
			//Update enemy variable with character name
			enemy = $(this).attr('value');
			console.log("Enemy: " + window[enemy].name);

			//Character portrait fades out and is removed after .5 seconds
			$('.character .' + enemy).attr('class','animated fadeOut character ' + enemy);
			setTimeout(function() {
				$('.character .' + enemy).remove();
			},500);

			//Add enemy and enemy stats to arena
			$('#arena').append('<img id="enemy" src="images copy/battle/enemy/' + enemy + '.gif">');
			$('#enemy').attr('class','animated fadeInLeft');
			$('#enemy-name').html(window[enemy].name);
			$('#enemy-stats').html('100<br>' + window[enemy].ap + '<br>0');
			$('#enemy-hp').html(window[enemy].hp);
			$('#enemy-name, #enemy-stats, #enemy-hp').attr('class','animated fadeIn');

			//Remove enemy stats animation classes after 1 second
			setTimeout(function() {
				$('#enemy-name, #enemy-stats, #enemy-hp').attr('class','');
			},1000);

			//Remove enemy from charactesr array
			charaIndex = characters.indexOf(enemy);
			characters.splice(charaIndex,1);
		}
	});
}

//Increase Hero AP every round and update display
function increaseHeroAP() {
	window[hero].ap = parseInt(window[hero].ap) + parseInt(window[hero].apConstant);
	$('#hero-ap').html(window[hero].ap);
	$('#hero-ap').attr('class','animated rubberBand');

	//Reset herp HP animation classes after 1 second
	setTimeout(function() {
		$('#hero-ap').attr('class','');
	},1000);
}

function decreaseHP(attacker,defender) {
	window[defender].hp = window[defender].hp - window[attacker].ap;
}
function attackTimeout(attacker) {
	
	if ($('#hide-animation').prop('checked') === false) {
		if (attacker == "eliwood") {
			return 3000;
		}
		else if (attacker == "lyn") {
			return 3800;
		}
		else if (attacker == "hector") {
			return 6000;
		}
		else if (attacker == "marcus") {
			return 4000;
		}
	}
	//Else return .25 seconds
	else {
		return 250;
	}
}

function endBattle() {
	//If hero is defeated
	if (window[hero].hp <= 0) {
		$('#hero').attr('class','animated fadeOutRight');
		$('#hero-name, #hero-stats, #hero-hp').attr('class','animated fadeOut');

		setTimeout(function() {
			$('#message').html('<h2 class="red">You Lose!</h2>');
			$('.arena-area').append('<button type="button" id="reset" class="btn btn-primary" onclick="location.reload()">Play Again?</button>');
		},1000);
	}

	//If enemy is defeated
	else if (window[enemy].hp <= 0) {

		//Fade out enemy
		$('#enemy').attr('class','animated fadeOutLeft');
		$('#enemy-name, #enemy-stats, #enemy-hp').attr('class','animated fadeOut');

		//Remove enemy image and reset enemy stats animation classes after 1 second
		setTimeout(function() {
			$('#enemy').remove();
			$('#enemy-name, #enemy-stats, #enemy-hp').attr('class','');
			$('#enemy-name, #enemy-stats, #enemy-hp').html('');

			//Increase hero AP after .5 seconds
			setTimeout(function () {
				//If everyone is defeated
				if (characters.length === 0) {
					$('#message').html('<h2 class="green">You Win!</h2>');
					$('.arena-area').append('<button type="button" id="reset" class="btn btn-primary" onclick="location.reload()">Play Again?</button>');
				}

				//Reset enemy and choose a new enemy
				else {
					enemy = "";
					pickCharacters();
				}
			},500);

		},1000);
	}
}

function attack() {
	$('.arena-area').append('<br><input type="checkbox" id="hide-animation" name="hide-animation" checked> <label for="hide-animation">Hide attack animations</label>');
	$('.arena-area').append('<br><button type="button" id="attack" class="btn btn-danger">Attack</button>');
	console.log("Attack button initialized");

	//When Attack button is clicked
	$('#attack').on('click', function() {

		//If there's no enemy selected
		if (enemy == "" || window[hero].hp <= 0) {
			alert("No enemy selected!");
		}

		
		else {
		
			if ($('#hide-animation').prop('checked') === false) {
				$('#hero').attr('src','assets/images copy/battle/' + hero + '-attack.gif');
				$('#hero').attr('class','attacker');
				$('#enemy').attr('class','defender');
			}


			decreaseHP(hero,enemy);

			setTimeout(function() {
				if ($('#hide-animation').prop('checked') === false) {
					$('#enemy').attr('src','assets/images copy/battle/enemy/' + enemy + '-attack.gif');
					$('#hero').attr('class','defender');
					$('#enemy').attr('class','attacker');
				}
				decreaseHP(enemy,hero);


				setTimeout(function () {
					if (window[hero].hp <= 0) {
						$('#hero-hp').html('0');
					}
					else {
						$('#hero-hp').html(window[hero].hp);
					}
					$('#hero-hp').attr('class','animated bounce');

					if (window[enemy].hp <= 0) {
						$('#enemy-hp').html('0');
					}
					else {
						$('#enemy-hp').html(window[enemy].hp);
					}
					$('#enemy-hp').attr('class','animated bounce');

			
					setTimeout(function() {
						$('#hero-hp').attr('class','');
						$('#enemy-hp').attr('class','');
						increaseHeroAP();
						if (window[enemy].hp <= 0 || window[hero].hp <= 0) {
							endBattle();
						}
					},1000);

				},attackTimeout(enemy));

			},attackTimeout(hero));
		}
	});
}

window.onload = function() {
	displayCharacters();
	pickCharacters();
	attack();
};