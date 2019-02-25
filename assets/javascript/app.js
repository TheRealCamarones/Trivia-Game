// thought about creating an array of objects, but I think it would be simpler for my understanding to make three arrays
var questionsArray = ["Who won the first Super Bowl?",
    "Who is the NHL's All Time leading goal scorer?",
    "Which team has won the most NBA Championships?",
    "Who is the PGA Tour's All Time Leading Money Earner?",
    "Who is the MLB pitcher with the most career wins?"];

// This one will be an array of arrays
var answersArray = [
    ["The Minnesota Vikings", "The Green Bay Packers", "The Saskatoon Snowmen", "The Chicago Cubs"],
    ["Jaromir Jagr", "Sidney Crosby", "Mario Lemieux", "Wayne Gretzky"],
    ["Los Angeles Lakers", "Chicago Bulls", "Boston Celtics", "Harlem Globetrotters"],
    ["Vijay Singh", "Tiger Woods", "Ernie Els", "Jordan Spieth"],
    ["Cy Young", "Randy Johnson", "Babe Ruth", "Jim Abbott"]
];

var correctAnswerArray = ["The Green Bay Packers", "Wayne Gretzky", "Boston Celtics", "Tiger Woods", "Cy Young"];

// create an array to store all of my images
// pretty DRY, but I can't think of a better way to do what I'm trying to do
var imgArray = new Array();
imgArray[0] = "<img class='d-block mx-auto' src='../images/greenbaypackers.jpg'>";
imgArray[1] = "<img class='d-block mx-auto' src='../images/gretzky.jpg'>";
imgArray[2] = "<img class='d-block mx-auto' src='../images/bostonceltics.jpg'>";
imgArray[3] = "<img class='d-block mx-auto' src='../images/tigerwoods.jpg'>";
imgArray[4] = "<img class='d-block mx-auto' src='../images/cyyoung.jpg'>";

// and a variable for an image that I may or may not actually ever use
var schwabImage = "<img class='d-block mx-auto' src='../images/theschwab.jpg'>";

// set a timer globally that we'll keep coming back to
var timer = 25;
// will need a global variable that lets me know which question we're on
var questionCounter = 0;
// will need a variable to keep track of the wins and losses
var correct = 0;
var incorrect = 0;

// set variables to manipulate the DOM
var questionDisplay;
var answerDisplay;
var userGuess;
var timeRemaining;
var theClock;
var answerValue;

$("document").ready(function () {
    function newGame() {
        correct = 0;
        incorrect = 0;
        gameRunning = true;
        questionCounter = 0;
        timer = 25;
        displayQuestions();
        theTimer();
    }

    function displayQuestions() {
        // display the timer
        timeRemaining = $("#time-remaining-display").text("Time Remaining: " + timer);
        // I had nested loops in here to display the questions and answers, but that wasn't working right
        // pretty sure i'll just end up incrementing the questionCounter and then running this function again
        questionDisplay = $("#display-question").append(questionsArray[questionCounter]);

        // have a loop that for every answer option only associated with current question counter creates a new div
        // with class of answer-choice, attr of the correct answer sets the HTML to the answer option A-D and then appends
        for (var i = 0; i < answersArray.length; i++) {
            answerDisplay = $("<div>");
            answerDisplay.addClass("answer-choice");
            answerDisplay.attr(answerValue, answersArray[questionCounter][i]);
            answerDisplay.html(answersArray[questionCounter][i]);
            $(".answer-display").append(answerDisplay);
        }

        // add something to run here to grab the value of the choice the user clicks on 
        $("answer-choice").on("click", function () {
            userGuess = $(this).attr(answerValue);
            console.log(answerValue);
        })

    }

    function theTimer() {
        // set the clock to an interval of 25 seconds
        clearInterval(theClock);
        theClock = setInterval(decrement, 1000);
        function decrement() {
            if (timer === 0) {
                clearInterval(theClock);
                incorrectAnswer();
            } else if (timer > 0) {
                timer--;
            }
            $("#time-remaining-display").text("Time Remaining: " + timer);
        }
    };


    function incorrectAnswer() {

    };

    function generateWin() {

    };

    // this function will end up being called a lot as we need to wipe the screen clear of data
    function clear() {

    }

    // event handler for the newGame button
    $("#new-game-button").on("click", function () {
        newGame();
    })
});
