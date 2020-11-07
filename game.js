function heroBase(userName, health, attack, armor) { 
    this.userName = name; 
    this.health = health; 
    this.attack = attack; 
    this.armor = armor; 
}

var hero = new heroBase(
    'Hero',
    '20',
    '7', 
    '2', 
); 

function villainBase(userName, health, attack, armor) { 
    this.userName = name; 
    this.health = health; 
    this.attack = attack; 
    this.armor = armor; 
}

var water = new villainBase(
	'Water',
	'20',
    '5',
	'1'
);

var work = new villainBase(
	'Work',
	'21',
	'7',
	'0'
);

var sleep = new villainBase(
	'Sleep',
	'19',
	'6',
	'1',
);

var health = new villainBase(
	'Health',
	'23',
	'6.5',
	'1.5'
);

var villain = ['water', 'work', 'sleep', 'health']; 

// add animations for background and player locations @ Teju Edidi

function battleEnd() {
    if (window[hero].health <= 0) {
        // code for hero fading out and "you lose" message
    }

    else if(window[villain].health <= 0) {
        // code for villain fading out and "you win" message
        

    }
}