/*

This is a javascript implementation of a simple ascii art RPG game

TODO: smart terrain generation
TODO: player object
TODO: inventory
TODO: skills
TODO: moving around
TODO: edge of the world : how to deal with it? 


*/

// Below we initialize the player object
var player = {
  score: 0,
  name: "Player",
  level: 1,
  rank: "ready to be eaten",
  kingdom: "None",
  reputation: "huh?",
  skills: [["not dying",1], ["running away",10]],
  location_X: 0,
  location_Y: 0,
  location_Z: 0,
  health: 100,
  magic: 100,
  strength: 10,
  intelligence: 10,
  wisdom: 10,
  dexterity: 10,
  constitution: 10,
  charisma: 10,
  luck: 10,
  region: "newbie",
  inventory: {
                weapon_1: {
                    name: 'The feeble axe of butterfly death!',
                    category: 'weapon',
                    damage: 20,
                    cursed: 0,
                    material: 'wood',
                    plus_to_hit: 0,
                    plus_to_damage: 0,
                    level: 1,
                    type: 'axe',
                    cost: 5,
                    equipped: 'no' 
                },

                weapon_2: {
                    name: 'The feeble axe of mosquito death!',
                    category: 'weapon',
                    damage: 20,
                    cursed: 0,
                    material: 'wood',
                    plus_to_hit: 0,
                    plus_to_damage: 0,
                    level: 1,
                    type: 'axe',
                    cost: 5,
                    equipped: 'no'
                },
                weapon_3: {
                    name: 'The strong axe of killing small things!',
                    category: 'weapon',
                    damage: 20,
                    cursed: 0,
                    material: 'wood',
                    plus_to_hit: 0,
                    plus_to_damage: 0,
                    level: 1,
                    type: 'axe',
                    cost: 5,
                    equipped: 'no'
                },
                thing_1: {
                    name: 'Incredible potion of doing nothing',
                    category: 'potion',
                    damage: 0,
                    cursed: 0,
                    material: 'glass',
                    plus_to_hit: 0,
                    plus_to_damage: 0,
                    level: 1,
                    type: 'potion',
                    cost: 2,
                    equipped: 'no'
                }

            }

}

const entries = Object.entries(player)
console.log(entries)



// initialize other variables

const main_map = document.getElementById('main_map');
// a turn is a player action in the game. if they check their inventory, look at a character sheet, etc, it shouldn't count.
var turn = 0;
var grid = [];
var terrain;
// the variable below tracks the terrain type the player moved from. When they move again, we replace the old terrain stored in this variable.
// the reason we have empty terrain is for the very first move of the game.
var destination_terrain = '<i class=\"fas fa-ellipsis-h fa-fw\" style=\"color:#D2B48C\"></i>';
// the line below is because I was testing row length and got annoyed having to continually adjust 

var counter = 1;
while ( counter <= 1189 ) {
  // the line below creates some random terrain. totally random, TODO: this needs to be smart.
  terrain = Math.floor(Math.random() * 5)+1;
  grid.push(terrain);
  counter += 1;
}

// make player starting location. It's 1 just TOTALLY for testing. Also, we should track the current player location for
// reasons. 
grid.splice(9, 0, 6);



function draw_map(grid) {

var counter = 0;
var arrayLength = grid.length;
for (var i = 0; i < arrayLength; i++) {


  if (grid[i] === 1 || grid[i] === 2 || grid[i] === 3){
    // this is plain, open terrain
    grid[i] = "<i class=\"fas fa-ellipsis-h fa-fw\" style=\"color:#D2B48C\"></i>";
  } else if (grid[i] === 4) {
    // this is a tree
    grid[i] = "<i class=\"fas fa-tree fa-fw\" style=\"color:green\"></i>";
  } else if (grid[i] === 5) {
    // this is a mountain or hill
    grid[i] = "<i class=\"fas fa-mountain fa-fw\" style=\"color:grey\"></i>";
  } else if (grid[i] === 6) {
  // this is a mountain or hill
  grid[i] = "<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>";
}

}
grid = grid.join('');
return grid;
}

function move(direction) {
// issue with not counting until the first move.
  if (direction === 'r'){
    // let's start by getting the current location of the player
    var current_location = grid.indexOf('<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>');
    // the line below is for debugging
    console.log(current_location);
    // now the destination. This ASSUMES A 34 LENGTH array
    var destination = current_location + 1;
    // now lets replace the terrain that was in the old place.
    grid[destination - 1] = destination_terrain;
    // now let's get the terrain the place they want to go. we need this so we can replace it when they move later on. 
    destination_terrain = grid[current_location + 1];
    // now let's move the player icon. 
    grid[destination] = '<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>';
    // now lets update the player_X position
    player.location_X = player.location_X + 1


    


  } else if (direction === 'l'){
        // let's start by getting the current location of the player
        var current_location = grid.indexOf('<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>');
        // the line below is for debugging
        console.log(current_location);
        // now the destination. This ASSUMES A 34 LENGTH array
        var destination = current_location - 1;
        // now lets replace the terrain that was in the old place.
        grid[destination+1] = destination_terrain;
        // now let's get the terrain the place they want to go. we need this so we can replace it when they move later on. 
        destination_terrain = grid[current_location - 1];
        // now let's move the player icon. 
        grid[destination] = '<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>';
       // now lets update the player_X position
        player.location_X = player.location_X - 1
        


    } else if (direction === 'u'){
        // let's start by getting the current location of the player
        var current_location = grid.indexOf('<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>');
        // the line below is for debugging
        console.log(current_location);
        // now the destination. This ASSUMES A 34 LENGTH array
        var destination = current_location - 34;
        // now lets replace the terrain that was in the old place.
        grid[destination + 34] = destination_terrain;
        // now let's get the terrain the place they want to go. we need this so we can replace it when they move later on. 
        destination_terrain = grid[current_location - 34];
        // now let's move the player icon. 
        grid[destination] = '<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>';
        // now lets update the player_Y position
        player.location_Y = player.location_Y - 34
        

    } else if (direction === 'd'){
        // let's start by getting the current location of the player
        var current_location = grid.indexOf('<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>');
        // the line below is for debugging
        console.log(current_location);
        // now the destination. This ASSUMES A 34 LENGTH array
        var destination = current_location + 34;
        // now lets replace the terrain that was in the old place.
        grid[destination - 34] = destination_terrain;
        // now let's get the terrain the place they want to go. we need this so we can replace it when they move later on. 
        destination_terrain = grid[current_location + 34];
        // now let's move the player icon. 
        grid[destination] = '<i class=\"fas fa-child fa-fw\" style=\"color:red\"></i>';
        // now lets update the player_Y position
        player.location_Y = player.location_Y + 34
        

    return
  }

} // end move function

function update_footer(){
    document.getElementById("footer").innerHTML = "Health: " + player.health + " | Magic: " + player.magic + " | Turn: " + turn;
}

function update_messages(){
    document.getElementById("messages").innerHTML = 
    "Location X: " + player.location_X + "<br />" + 
    "Location Y: " + player.location_Y + "<br />" + 
    "Location Z: " + player.location_Z + "<br />";
}

function inventory() {

    console.log(Object.keys(player.inventory).length);
    modal_body.innerHTML = "";
    modal_body.innerHTML += "You are currently carrying an impossibly large number of items. <br /><br />";
    var print_weapons_header = false;
    var print_potion_header = false;
    for (var i in player.inventory) {
        
        if (player.inventory[i].category === 'weapon') {
            if (!print_weapons_header) {
                modal_body.innerHTML += "<strong>Things to poke your enemies with and prevent your inevitable death:</strong><ul>";
                print_weapons_header = true;
            }
            modal_body.innerHTML += "<li>" + player.inventory[i].name + "</li>";
            }
            modal_body.innerHTML += "</ul>";

            if (player.inventory[i].category === 'potion') {
                if (!print_potion_header) {
                    modal_body.innerHTML += "<br /><strong>Strange liquid in a glass jars:</strong><ul>";
                    print_potion_header = true;
                }
                modal_body.innerHTML += "<li>" + player.inventory[i].name + "</li>";
                }
                modal_body.innerHTML += "</ul>";





        }
    


    $(document).ready(function() {
        $('#exampleModal').modal('show');
    });
}

// the code below is used from https://medium.com/@uistephen/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
// I also used this site for keycodes: https://keycode.info/
// the code below listens for keys being released, and then trigger a function which "does something". 

document.addEventListener('keyup', function (event) {
  if (event.defaultPrevented) {
      return;
  }

  var key = event.key || event.keyCode;

  if (key === 'Escape' || key === 'Esc' || key === 27) {
    document.getElementById("messages").innerHTML = key;
    } else if (key === 'ArrowRight' || key === 39) {
        // then we call the move function and pass 'r' for right.
        move('r')
        // we update the three parts of the UI after the move has been completed (but this might no belong here).
        document.getElementById("main_map").innerHTML = draw_map(grid); 
        // increment the turn counter 
        turn = turn + 1;
        update_footer();
        update_messages();
        

        
    } else if (key === 'ArrowLeft' || key === 39) {
        // then we call the move function and pass 'r' for right.
        move('l')
        // finally, we update the map after the move has been completed (but this might no belong here).
        document.getElementById("main_map").innerHTML = draw_map(grid); 
        // increment the turn counter 
        turn = turn + 1;
        update_footer();
        update_messages();  



    } else if (key === 'ArrowUp' || key === 39) {
        // then we call the move function and pass 'r' for right.
        move('u')
        // finally, we update the map after the move has been completed (but this might no belong here).
        document.getElementById("main_map").innerHTML = draw_map(grid); 
        // increment the turn counter 
        turn = turn + 1;
        update_footer();
        update_messages();
        





    } else if (key === 'ArrowDown' || key === 39) {
        // then we call the move function and pass 'r' for right.
        move('d')
        // finally, we update the map after the move has been completed (but this might no belong here).
        document.getElementById("main_map").innerHTML = draw_map(grid); 
        // increment the turn counter 
        turn = turn + 1;
        update_footer();
        update_messages();  
        


        
    } else if (key === '?' || key === 191) {
        document.getElementById("messages").innerHTML = key;  
    } else if (key === 'i' || key === 73 || key === 'I') {
        inventory();
    
  }
});


document.getElementById("main_map").innerHTML = draw_map(grid);
document.getElementById("footer").innerHTML = "Health: " + player.health + " | Magic: " + player.magic + " | Turn: " + turn;