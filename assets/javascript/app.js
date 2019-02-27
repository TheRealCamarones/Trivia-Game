// array of arrays sucks let's make an object
// DOM is brilliant he gave me a great idea for how to compare if the answer is  
// right using index instead of comparing strings, way easier
var questions = [{
    question: "Who won the first Super Bowl?",
    answers: ["The Minnesota Vikings", "The Green Bay Packers", "The Saskatoon Snowmen", "The Chicago Cubs"],
    correct: 1,
    image: "<img class='d-block mx-auto display-image' src='assets/images/greenbaypackers.jpg'>"
    
}, {
    question: "Who is the NHL's All time leading goal scorer?",
    answers: ["Jaromir Jagr", "Sidney Crosby", "Mario Lemieux", "Wayne Gretzky"],
    correct: 3,
    image: "<img class='d-block mx-auto display-image' src='assets/images/gretzky.jpg'>",
}, {
    question: "Which team has won the most NBA Championships?",
    answers: ["Los Angeles Lakers", "Chicago Bulls", "Boston Celtics", "Harlem Globetrotters"],
    correct: 2,
    image: "<img class='d-block mx-auto' src='assets/images/bostonceltics.jpg'>",
}, {
    question: "Who is the PGA Tour All Time Leading Money Earner?",
    answers: ["Vijay Singh", "Tiger Woods", "Ernie Els", "Jordan Spieth"],
    correct: 1,
    image: "<img class='d-block mx-auto' src='assets/images/tigerwoods.jpg'>",
}, {
    question: "Who is the MLB pither with the most career wins?",
    answers: ["Cy Young", "Randy Johnson", "Babe Ruth", "Jim Abbott"],
    correct: 0,
    image: "<img class='d-block mx-auto' src='assets/images/cyyoung.jpg'>",
}, {
    schwabImage : "<img class='d-block mx-auto' src='assets/images/theschwab.jpg'>",
}];

// set a timer globally that we'll keep coming back to
var timer = 25;
// will need a global variable that lets me know which question we're on
var questionCounter = 0;
// will need a variable to keep track of the wins and losses
var correctAnswers = 0;
var incorrectAnswers = 0;

// set variables to manipulate the DOM
var questionDisplay;
var answerDisplay;
var userGuess;
var timeRemaining;
var theClock;
var answerValue;
var answerDisplayText;

$("document").ready(function () {
    function newGame() {
        correctAnswers = 0;
        incorrectAnswers = 0;
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
        // i'll end up incrementing the questionCounter and then running this function again
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
            parseInt(userGuess);
            console.log(userGuess);
            clearInterval(theClock);
            checkAnswer();
            pause();
        });
        // variables that I set up top, these will help me compare and display answers
        answerValue = questions[questionCounter].correct;
        answerDisplayText = questions[questionCounter].answers[answerValue];
        // console.log(answerValue);
        // console.log(answerDisplayText);
    };

    function theTimer() {
        // set the clock to an interval of 25 seconds
        clearInterval(theClock);
        theClock = setInterval(decrement, 1000);
        function decrement() {
            if (timer === 0) {
                clearInterval(theClock);
                checkAnswer();
            } else if (timer > 0) {
                timer--;
            }
            $("#time-remaining-display").text("Time Remaining: " + timer);
        }
    };

    function checkAnswer() {
        clear();
            console.log(answerDisplayText);
            console.log(typeof(userGuess));
            console.log(typeof(answerValue));
        // compare the value of the answer clicked on against the correct answer
        if (userGuess = answerValue) {
            // if they match, increment the number of correct, add the corresponding image and display the answer
            correctAnswers++;
            $("#answer-image").html(questions[questionCounter].image);
            $("#answer-message").html(answerDisplayText);
            console.log(answerDisplayText);
        } else {
            // otherwise display the image of the Schwab and let them know what the correct answer was
            $("#answer-image").html(questions.schwabImage);
            $("#answer-message").html("Sorry, the correct answer was: " + answerDisplayText)
            
        }

        // if that question counter has more questions to display, increment the counter
        if (questionCounter < questions.length) {
            questionCounter++;
            setTimeout(displayQuestions, 3 * 1000);
        } else {
            setTimeout(displayResults, 3 * 1000)
        }
    };

    function pause() {

    };

    function displayResults() {

    };

    // this function will end up being called a lot as we need to wipe the screen clear of data
    function clear() {
        $("#display-question").empty();
        $(".answer-display").empty();
        $("#answer-image").empty();
        $("#answer-message").empty();
        $(".answer-choice").empty();
    };

    // event handler for the newGame button
    $("#new-game-button").on("click", function () {
        newGame();
    });
});