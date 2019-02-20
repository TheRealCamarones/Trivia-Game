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

var correctAnswerArray = ["The Green Bay Packers", "Wayne Gretzky", "Boston Celtics", "Tiger Woods", "Cy Young"]

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

    }

    function displayQuestions() {
        // display the timer
        timeRemaining = $("#time-remaining-display").text(timer);
        questionDisplay = $("#display-question").text
    }

    $("#new-game-button").click(newGame())
});
