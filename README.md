# SpookyBathrooms
A minigame made in WebGL using Three.js library. A project I made when I was in college.

## About this project:
Spooky Bathrooms! is a minigame in which your objective is to get a high score by closing the opened doors of the bathrooms. But beware! If a door opens completely, and your cursor passes through the door, a spooky ghost will throw you an object! Lucky for you, you can defend yourself with a shield, but triggering it will stagger you.

Also supports local multiplayer, which your rival will open doors to make you fail!

***This page has been made for learning and personal purposes.***

### Background of the project
Back when I was in college, one of our projects was to make a web game using WebGL and Three.js as a library. My idea? Making a door game.
I figured to upload it, since I think it could help to show some of the stuff I've done.
This project used to have a share button to Facebook, but I decided to remove the share script, and comment the lines which made it work.
Keep in mind I didn't include sounds or music, due to time restraints.

### Pre-requisites ⚙️
If you want to edit and play with the code, you can use a code editor like [Visual Studio Code](https://code.visualstudio.com/).

Some of the tools you'll be needing:

* _[Apache Web Server, PHP and MySQL](https://www.apachefriends.org/) - You'll need a server and a database to run the project. I recommend using XAMPP, since it includes an Apache Web Server, MySQL and PHP._

### Installing the project 🔧
1. Clone this project. You can download the project by pressing the `Code` button in the main project, and download the ZIP. However, if you'd like to use [Git](https://git-scm.com/) to clone the project, you can run the next line:

```
git clone https://github.com/LauroLlano/SpookyBathrooms
```

2. Run the MySQL scripts. First the table scripts, then the stored procedure.

3. Inside the source, search for `webservice/webservice.php`. Change the database credentials to the one you have created.

Your project is ready to go. Start the server and MySQL, and locate the project.

### Controls
Player 1: Use WASD to move through the doors. If a door is opening, press 'E' to close it. If a door completely opens and your cursor is on the room, a ghost will throw an object. To pull your shield up, press 'Q'. Getting your shield will stagger you for a few moments before allowing you to move again. To pause the game, press 'Z'.

Player 2: Use IJKL to move through the doors. To open a door, press the 'O' key. To pause the game, press 'M'. You can't take damage.

### Technologies used ⌨️
This project was made using the next technologies:
* _HTML, CSS, using [Bootstrap 4.3](https://getbootstrap.com/docs/4.3/getting-started/download/) for the visuals._
* _JavaScript, using [jQuery library](https://jquery.com/) included in Bootstrap 4. I used AJAX so I don't reload the page on each request. To develop on WebGL, I used the [Three.js library](https://threejs.org/). Worth mentioning that the scripts OBJLoader and MTLLoader are part of Three.js._
* _A bit of PHP for backend. You'll need to create an account to enter the app._
* _A bit of MySQL for storing user data._
* _I modeled and texturized the objects in [Maya](https://www.autodesk.es/products/maya/), and exported them to .obj, which also generates the .mtl._

---
Project developed by [Lauro Llano 👾](https://github.com/LauroLlano)