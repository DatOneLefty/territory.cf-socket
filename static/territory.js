
var c = document.getElementById('game'),
canvas = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;
canvas.beginPath();
canvas.rect(0, 0, window.innerWidth, window.innerHeight);
canvas.fillStyle = "#1e1e1e";
canvas.fill();

	width = window.innerWidth;
	height = window.innerHeight;
	console.log(width);
	console.log(height);
	document.getElementById("game").innerHTML = "";
	blocksx = Math.round(width / 40 - 1);
	blocksy = Math.round(height / 40);

	var tw = 0;
	var th = 0;

			canvas.beginPath();
			canvas.rect(0, 0, 40, 40);
			canvas.fillStyle = "purple";
			canvas.fill();

	for (var i = 0; i < blocksy; i++) {
		for (var b = 0; b <= blocksx; b++) {
			canvas.beginPath();
			canvas.rect(tw, th, tw + 40, th + 40);
			canvas.fillStyle = "#1e1e1e";
			canvas.fill();
			tw = tw + 40;
		}
	}




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


  var socket = io();
var id = "";
if (getCookie("id") == "") {
socket.emit("new-user", "help");
} else {
socket.emit("new-join", getCookie("id"));
id = getCookie("id");
}
var x, y, color;
    socket.on('info', function(msg){
	var inf = msg.split(",");
	document.getElementById("game-pos").innerHTML = "<b>Position: </b>" + inf[0] + ", " + inf[1];
	document.getElementById("game-button").style.backgroundColor = inf[2];
	document.getElementById("game-button").disabled = false;
	x = inf[0];
	y = inf[1];
	color = inf[2];
    });

socket.on('new-info', function(msg){
	setCookie("id", msg, 365 * 5);
	socket.emit("new-join", getCookie("id"));
	id = getCookie("id");
    });


		socket.on('new-claim', function(msg){
			
		    });


function update() {
	socket.emit("move", x + "," + y + "," + id);
}
var open = true;
		function move(d) {
			if (open == true) {
			if (d == 1) {
				y++;
				update();
			}
			if (d == 2) {
				y--;
				update();
			}
			if (d == 3) {
				x--;
				update();
			}
			if (d == 4) {
				x++;
				update();
			}
		}
		}


			function checkKey(e) {
			e = e || window.event;
			var code = e.keyCode;
			if (code == 38) {
				move(1); // up
			}
			if (code == 40) {
				move(2); // down
			}
			if (code == 37) {
				move(3); // left
			}
			if (code == 39) {
				move(4); // right
			}
			}
			document.onkeydown = checkKey;
