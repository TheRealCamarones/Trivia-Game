// array of arrays sucks let's make an object
// DOM is brilliant he gave me a great idea for how to compare if the answwer is right using index instead of comparing strings
var questions = [{
    question: "Who won the first Super Bowl?",
    answers: ["The Minnesota Vikings", "The Green Bay Packers", "The Saskatoon Snowmen", "The Chicago Cubs"],
    correct: 1,
    image: "<img class='d-block mx-auto' src='../images/greenbaypackers.jpg'>"
}, {
    question: "Who is the NHL's All time leading goal scorer?",
    answers: ["Jaromir Jagr", "Sidney Crosby", "Mario Lemieux", "Wayne Gretzky"],
    correct: 3,
    image: "<img class='d-block mx-auto' src='../images/gretzky.jpg'>",
}, {
    question: "Which team has won the most NBA Championships?",
    answers: ["Los Angeles Lakers", "Chicago Bulls", "Boston Celtics", "Harlem Globetrotters"],
    correct: 2,
    image: "<img class='d-block mx-auto' src='../images/bostonceltics.jpg'>",
}, {
    question: "Who is the PGA Tour All Time Leading Money Earner?",
    answers: ["Vijay Singh", "Tiger Woods", "Ernie Els", "Jordan Spieth"],
    correct: 1,
    image: "<img class='d-block mx-auto' src='../images/tigerwoods.jpg'>",
}, {
    question: "Who is the MLB pither with the most career wins?",
    answers: ["Cy Young", "Randy Johnson", "Babe Ruth", "Jim Abbott"],
    correct: 0,
    image: "<img class='d-block mx-auto' src='../images/cyyoung.jpg'>",
}, {
    schwabImage : "<img class='d-block mx-auto' src='../images/theschwab.jpg'>",
}];

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
        clear();
        displayQuestions();
        theTimer();
    }

    function displayQuestions() {
        // display the timer
        timeRemaining = $("#time-remaining-display").text("Time Remaining: " + timer);
        // I had nested loops in here to display the questions and answers, but that wasn't working right
        // pretty sure i'll just end up incrementing the questionCounter and then running this function again
        questionDisplay = $("#display-question").append(questions[questionCounter].question);

        // have a loop that for every answer option only associated with current question counter creates a new div
        // with class of answer-choice, attr of the correct answer sets the HTML to the answer option A-D and then appends
        for (var i = 0; i < questions[questionCounter].answers.length; i++) {
            answerDisplay = $("<div>");
            answerDisplay.addClass("answer-choice");
            answerDisplay.attr("data", i);
            answerDisplay.html(questions[questionCounter].answers[i]);
            $(".answer-display").append(answerDisplay);
        };

        // add something to run here to grab the value of the choice the user clicks on 
        $(".answer-choice").on("click", function () {
            userGuess = $(this).attr("data");
            console.log(userGuess);
        });
    };

    function theTimer() {
        // set the clock to an interval of 25 seconds
        clearInterval(theClock);
        theClock = setInterval(decrement, 1000);
        function decrement() {
            if (timer === 0) {
                clearInterval(theClock);
                ifIncorrect();
            } else if (timer > 0) {
                timer--;
            }
            $("#time-remaining-display").text("Time Remaining: " + timer);
        }
    };

    function ifIncorrect() {

    };

    function ifCorrect() {

    };

    // this function will end up being called a lot as we need to wipe the screen clear of data
    function clear() {
        $("#display-question").empty();
        $(".answer-display").empty();
    };

    // event handler for the newGame button
    $("#new-game-button").on("click", function () {
        newGame();
    });
});