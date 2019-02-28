// array of arrays sucks let's make an object
// DOM is brilliant he gave me a great idea for how to compare if the answer is  
// right using index instead of comparing strings, way easier
var questions = [{
    question: "Who won the first Super Bowl?",
    answers: ["The Minnesota Vikings", "The Green Bay Packers", "The Saskatoon Snowmen", "The Chicago Cubs"],
    correct: 1,
    image: "<img class='d-block mx-auto display-image' src='assets/images/greenbaypackers.jpg'>",
    schwabImage : "<img class='d-block mx-auto' src='assets/images/theschwab.jpg'>"
}, {
    question: "Who is the NHL's All time leading goal scorer?",
    answers: ["Jaromir Jagr", "Sidney Crosby", "Mario Lemieux", "Wayne Gretzky"],
    correct: 3,
    image: "<img class='d-block mx-auto display-image' src='assets/images/gretzky.jpg'>",
}, {
    question: "Which team has won the most NBA Championships?",
    answers: ["Los Angeles Lakers", "Chicago Bulls", "Boston Celtics", "Harlem Globetrotters"],
    correct: 2,
    image: "<img class='d-block mx-auto display-image' src='assets/images/bostonceltics.jpg'>",
}, {
    question: "Who is the PGA Tour All Time Leading Money Earner?",
    answers: ["Vijay Singh", "Tiger Woods", "Ernie Els", "Jordan Spieth"],
    correct: 1,
    image: "<img class='d-block mx-auto display-image' src='assets/images/tigerwoods.jpg'>",
}, {
    question: "Who is the MLB pitcher with the most career wins?",
    answers: ["Cy Young", "Randy Johnson", "Babe Ruth", "Jim Abbott"],
    correct: 0,
    image: "<img class='d-block mx-auto display-image' src='assets/images/cyyoung.jpg'>",
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
var $schwabDisplay;
var $schwabMessage;

$("document").ready(function () {
    // new game function to reset stats
    function newGame() {
        clear();
        correctAnswers = 0;
        incorrectAnswers = 0;
        gameRunning = true;
        questionCounter = 0;
        // timer = 25;
        displayQuestions();
    }

    function displayQuestions() {
        clear();
        // display the timer
        theTimer();
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
            answerDisplay.attr("id", "answer-option");
            answerDisplay.html(questions[questionCounter].answers[i]);
            $(".answer-display").append(answerDisplay);
        };

        

        // add something to run here to grab the value of the choice the user clicks on 
        $(".answer-choice").on("click", function () {
            userGuess = $(this).attr("data");
            console.log(userGuess);
            clearInterval(theClock);
            checkAnswer();
        });
        // variables that I set up top, these will help me compare and display answers
        answerValue = questions[questionCounter].correct;
        answerDisplayText = questions[questionCounter].answers[answerValue];
    };

    function theTimer() {
        // set the clock to an interval of 25 seconds
        timer = 25;
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
        // this function also will essentially do what I was going to do in a separate pause function so I'll just leave it here
        clear();
            
        // compare the value of the answer clicked on against the correct answer
        // I remember being told not to use double equals, but MDN says it does type conversion while comparing
        // plus it works
        if (userGuess == answerValue) {
            // if they match, increment the number of correct, add the corresponding image and display the answer
            correctAnswers++;
            $("#answer-image").html(questions[questionCounter].image);
            $("#answer-message").html("Correct! " + answerDisplayText);
            console.log(answerDisplayText);
        } else {
            // otherwise display the image of the Schwab and let them know what the correct answer was
            incorrectAnswers++;
            $("#answer-image").html(questions[0].schwabImage);
            $("#answer-message").html("Sorry, the correct answer was: " + answerDisplayText);
        }

        // if that question counter has more questions to display, increment the counter
        // this keeps trying to continue to run the game for some reason
        if (questionCounter < questions.length - 1) {
            questionCounter++;
            setTimeout(displayQuestions, 3 * 1000);
        } else {
            setTimeout(displayResults, 3 * 1000)
        }
    };

    function displayResults() {
        clear();
        $("#schwab-display").show();
        // $("#directions-text").show();
        $("#new-game-button").show();
        $("#number-correct").html("You got " + correctAnswers + " correct");
        $("#number-incorrect").html("You got " + incorrectAnswers + " incorrect");
        // conditional to display different messages depending on how well you did
        if (incorrectAnswers === 0) {
            $("#game-over-message").html("<h2>Congratulations! You Stumped the Schwab!</h2>")
        } else if (incorrectAnswers === 1) {
            $("#game-over-message").html("<h2>You were so close! You almost Stumped the Schwab!</h2>")
        } else {
            $("#game-over-message").html("<h2>Looks like the Schwab Stumped You!</h2>")
        }
    };

    // this function will end up being called a lot as we need to wipe the screen clear of data
    function clear() {
        $("#display-question").empty();
        $(".answer-display").empty();
        $("#answer-image").empty();
        $("#answer-message").empty();
        $(".answer-choice").empty();
        $("#time-remaining-display").empty();
        $("#number-correct").empty();
        $("#number-incorrect").empty();
        $("#schwab-message").empty();
        $("#game-over-message").empty();
        // hide for these two because we want to use them multiple times without refilling
        $("#schwab-display").hide();
        $("#new-game-button").hide();
        $("#directions-text").hide();  
    };

    // event handler for the newGame button
    $("#new-game-button").on("click", function () {
        newGame();
    });
});