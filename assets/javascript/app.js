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
// state variable to know if the game is running or not
var gameRunning = false;
// set variables to manipulate the DOM
var questionDisplay;
var answerDisplay;
var timeRemaining;

$("document").ready(function () {
    function newGame() {
        correct = 0;
        incorrect = 0;
        gameRunning = true;
        questionCounter = 0;
        timer = 25;
        displayQuestions();
        console.log(questionsArray[0]);

    }

    function displayQuestions() {
        // display the timer
        timeRemaining = $("#time-remaining-display").text("Time Remaining: " + timer);
        // this might be a classic rookie mistake, but looks like the best way to get the questions 
        // to display their respective assignments together is to have a nested loop
        // so this one will loop through all of the questions
        for (var i = 0; i < questionsArray.length; i++) {
            questionDisplay = $("#display-question").html(questionsArray[i]);
            // and then this loop will correspond it's answer options along with it
            for (var j = 0; j < answersArray.length; j++) {
                answerDisplay = $(".answer-display").append(answersArray[i][j]);
            }
        }
    }

    $("#new-game-button").click(newGame())
});
