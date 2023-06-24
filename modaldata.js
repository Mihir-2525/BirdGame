document.addEventListener("DOMContentLoaded", function () {
    // Rest of the code

    // Get the button and modal elements
    var addScoreBtn = document.getElementById("add-score-btn");
    var scoreModal = document.getElementById("score-modal");
    var closeModalBtn = document.querySelector("#score-modal .close");
    var saveScoreBtn = document.getElementById("save-score-btn");
    var playerNameInput = document.getElementById("player-name");
    var playerScoreInput = document.getElementById("player-score");

    // Open the modal when the button is clicked
    addScoreBtn.addEventListener("click", function () {
        scoreModal.style.display = "block";
    });

    // Close the modal when the close button is clicked
    closeModalBtn.addEventListener("click", function () {
        scoreModal.style.display = "none";
    });

    // Save the score when the save button is clicked
    saveScoreBtn.addEventListener("click", function () {
        var playerName = playerNameInput.value;
        var playerScore = playerScoreInput.value;

        // Do something with the player name and score (e.g., send them to a server or store them locally)

        // Close the modal
        scoreModal.style.display = "none";

        // Reset the input fields
        playerNameInput.value = "";
        playerScoreInput.value = "";
    });

    // Rest of the code
});
