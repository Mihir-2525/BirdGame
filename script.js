
function playDialogue() {
    var audio = new Audio('./music/dailoug1.mp3');
    audio.play();
}
document.addEventListener("DOMContentLoaded", function () {
    var sky = document.getElementById("sky");
    var scoreDisplay = document.getElementById("score");
    var score = 0;
    var point = document.getElementById("cracked-point");
    var brokenImages = ['./Image/broke.png', './Image/broke1.png', './Image/broke2.png'];
    var gunshotAudio = document.getElementById("gunshot-audio");
    var popup = document.getElementById("popup");
    var inactiveTimer;
    var closeButton = document.querySelector("#popup .close-btn");
    var car = document.getElementById("car");
    car.addEventListener("click", function () {
        car.classList.add("move");
        car.style.pointerEvents = "none";
        // car.style.backgroundImage = "url('./Image/carclick.png')";

        // Wait for the animation to complete
        setTimeout(function () {
            car.classList.remove("move");
            car.style.pointerEvents = "auto";
            car.style.backgroundImage = "url('./Image/car.png')";
        }, 5000);
    });

    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
        resetInactiveTimer(); // Reset the idle time when the popup is closed manually
    });

    var idleTime = 0;

    function resetIdleTime() {
        idleTime = 0;
    }

    function showPopup() {
        popup.style.display = "block";
    }

    function hidePopup() {
        popup.style.display = "none";
        resetInactiveTimer();
    }

    function resetInactiveTimer() {
        clearTimeout(inactiveTimer);
        inactiveTimer = setTimeout(showPopup, 10000); // Set timeout for 10 seconds
    }

    setInterval(function () {
        idleTime += 1;
        if (idleTime >= 10) {
            popup.style.display = "block";
        }
    }, 1000);

    document.addEventListener("click", function () {
        resetIdleTime();
        hidePopup();
    });

    resetInactiveTimer();

    // Function to play gunshot sound based on whether a bird was clicked or not
    function playGunshotSound(isBirdClicked) {
        var gunshotAudio = isBirdClicked ? document.getElementById("gunshot-audio") : document.getElementById("gunshot-audio2");
        gunshotAudio.currentTime = 0;
        gunshotAudio.play();
    }

    // Function to create a bird element and handle click events
    function createBird() {
        var bird = document.createElement("div");
        bird.className = "bird";
        var isClicked = false;

        bird.addEventListener("click", function () {
            if (!isClicked) {
                bird.style.backgroundImage = "url('./Image/birddie.png')";
                bird.style.width = "7%";
                bird.style.paddingLeft = "12px";
                score++;
                scoreDisplay.innerText = "Score: " + score;

                isClicked = true;
                bird.style.pointerEvents = "none";
                bird.style.cursor = "default";

                var plusOne = document.createElement("div");
                plusOne.className = "plus-one";
                plusOne.style.color = "blue";
                plusOne.style.marginLeft = "75px";
                plusOne.style.fontSize = "35px";
                plusOne.innerText = "+1";
                sky.appendChild(plusOne);

                if (score % 10 == 0 && score != 0) {
                    viewScore();
                }
                // Set the position of the plusOne element
                var birdRect = bird.getBoundingClientRect();
                var skyRect = sky.getBoundingClientRect();
                plusOne.style.left = (birdRect.left - skyRect.left + birdRect.width / 2 - plusOne.offsetWidth / 2) + "px";
                plusOne.style.top = (birdRect.top - skyRect.top) + "px";
                plusOne.style.color = "darkblue";

                setTimeout(function () {
                    bird.style.backgroundImage = "url('./Image/em.jpg')";
                    bird.style.pointerEvents = "auto";
                    bird.style.cursor = "pointer";
                    sky.removeChild(bird);
                    sky.removeChild(plusOne);
                }, 300);

                playGunshotSound(true); // Play Gunshot.mp3
            } else {
                playGunshotSound(false); // Play Gunshot2.mp3
            }
        });

        return bird;
    }

    // Function to create and move a bird across the sky
    function moveBird() {
        var bird = createBird();
        sky.appendChild(bird);

        var x = Math.floor(Math.random() * (window.innerWidth - bird.offsetWidth));
        var y = Math.floor(Math.random() * (window.innerHeight * 0.4)) + (window.innerHeight * 0.05);
        bird.style.left = x + "px";
        bird.style.top = y + "px";
        bird.style.display = "block";

        setTimeout(function () {
            bird.style.display = "none";
            sky.removeChild(bird);
        }, 3000);
    }

    setInterval(moveBird, 2000);

    // Function to check if a bird was clicked based on the provided coordinates
    function isBirdClicked(x, y) {
        var birds = document.getElementsByClassName("bird");
        for (var i = 0; i < birds.length; i++) {
            var birdRect = birds[i].getBoundingClientRect();
            if (x >= birdRect.left && x <= birdRect.right && y >= birdRect.top && y <= birdRect.bottom) {
                return true;
            }
        }
        return false;
    }

    function handleClick(event) {
        var x = event.clientX;
        var y = event.clientY;
        var imageIndex = score % brokenImages.length;

        point.style.backgroundImage = "url('" + brokenImages[imageIndex] + "')";
        point.style.left = (x - 20) + "px";
        point.style.top = (y - 20) + "px";
        point.style.display = "block";

        if (point.style.backgroundImage.includes("./Image/em.jpg")) {
            score = 0;
            scoreDisplay.innerText = "Score: " + score;
        }
        if (isBirdClicked(x, y)) {
            playGunshotSound(true); // Play Gunshot.mp3
        } else {
            playGunshotSound(false); // Play Gunshot2.mp3
        }
        resetInactiveTimer();
    }


    function showPopup() {
        popup.style.display = "block";
    }

    function hidePopup() {
        popup.style.display = "none";
        resetInactiveTimer();
    }

    function resetInactiveTimer() {
        clearTimeout(inactiveTimer);
        inactiveTimer = setTimeout(showPopup, 10000); // Set timeout for 10 seconds
    }

    document.addEventListener("click", handleClick);

    popup.addEventListener("click", function () {
        hidePopup();
    });

    resetInactiveTimer();
});

function viewScore() {
    var score = document.getElementById("score").innerText;
    var message = document.getElementById("message");
    var elon = document.getElementById("elon");

    elon.innerHTML = "<img style=\"max-width:50vw\" src=\"./Image/em2.jpg\" alt=\"\">";
    message.innerText = "Congratulations! Your " + score + " points.";
    message.style.display = "block";
    elon.style.display = "block";
    setTimeout(function () {
        message.style.display = "none";
        elon.style.display = "none";
    }, 3000);
}

// JavaScript code to show the trees
var trees = document.querySelectorAll("#sky .tree");
trees.forEach(function (tree) {
    tree.style.display = "block";
});