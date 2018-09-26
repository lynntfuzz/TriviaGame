$(function() {
    console.log( "ready!" );
    
    var QUESTION_TIME_LIMIT = 30;
    var RESULT_DISPLAY_TIME= 5000;
    var currentQuestion = -1;
    var numCorrect = 0;
    var addedListeners = false;

    var question1 = {
        "question":"Where did Gloria Mundy and Tony Carlson first meet?",
        "answer1":"At a protest in the Haight-Ashbury District",
        "answer2":"At a coctail party in Marin County",
        "answer3":"At the Nuart Theater",
        "answer4":"At the scene of a murder.",
        "correct-answer":"answer2",
        "associated-image":"assets/images/party.gif",
        "info":"Goldie Hawn and Chevy Chase's characters first meet at a friend's coctail party in Belvedere, an exclusie Marin County city with spectacular views of San Francisco and the Golden Gate Bridge.", 
    }

    var question2 = {
        "question":"How did Gloria meet Scotty?",
        "answer1":"At a cocktail party in Marin County",
        "answer2":"At the library where she works",
        "answer3":"She picked him up when he was hitchiking",
        "answer4":"She had a car accident with him",
        "correct-answer":"answer3",
        "associated-image":"assets/images/incar.jpg",
        "info":"Gloria drove home from the cocktail party in her yellow convertible Volkswagon bug, and she saw a man on the side of the road with his car broken down. He was hitchiking and Gloria decided to pull over and pick him up, because her friend at the party told her she needed a little more excitement in her life.", 
    }

    var question3 = {
        "question":"What did Scotty warn Gloria about before dying?",
        "answer1":"Beware of the dwarf.",
        "answer2":"Don't forget your umbrella.",
        "answer3":"Don't go to the Opera, there will be a murder.",
        "answer4":"Beware of the Bishop.",
        "correct-answer":"answer1",
        "associated-image":"assets/images/movie.jpeg",
        "info":"Scotty and Gloria met for a date at the movie theater, but scotty arrived late. In distress, he said to her \"Beware of the Dwarf\" and then Gloria saw that he was bleeding from his stomach. She screamed and ran out to the lobby."    
    }

    var question4 = {
        "question":"What did Gloria use to kill the intruder?",
        "answer1":"Poison",
        "answer2":"An umbrella",
        "answer3":"Kitchen knife",
        "answer4":"Knitting needles",
        "correct-answer":"answer4",
        "associated-image":"assets/images/knitting-needles.jpg",
        "info":"An intruder attacked Gloria in her apartment, wanting the cigarettes that Scotty gave her to hold. She stabbed him with knitting needles and then fainted."    
    }

    var question5 = {
        "question":"Who played Gloria's landlord?",
        "answer1":"Dudley Moore",
        "answer2":"Burgess Meredith",
        "answer3":"Chevy Chase",
        "answer4":"Brian Dennehy",
        "correct-answer":"answer2",
        "associated-image":"assets/images/burgess.jpg",
        "info":"as Gloria's landlord, Burgess Meredith's character was very useful, especially because he is a black belt in karate."    
    }

    var question6 = {
        "question":"What is the profession of Dudley Moore's character?",
        "answer1":"International Spy",
        "answer2":"Anthropology Professor",
        "answer3":"Masseuse",
        "answer4":"Conductor",
        "correct-answer":"answer4",
        "associated-image":"assets/images/Dudley.jpg",
        "info":"While Stanley Tibbets might enjoy a massage or binocular viewing in his spare time, his main profession is as a conductor."    
    }

    var quiz = [question1, question2, question3, question4, question5, question6 ];
    var intervalId;
    var clockRunning = false;
    var timeLeft = QUESTION_TIME_LIMIT;

    var startQuiz = function() {
        console.log("start quiz");
        numCorrect = 0;
        currentQuestion = -1;
        nextQuestion();      
    }

    var restartQuiz = function () {
        $(".start-container").css("display", "block");
        $(".question-container").css("display", "none");
        $(".answer-container").css("display", "none");
        $(".end-of-game-container").css("display", "none");
    }

    $("#start-btn").click(startQuiz);
    $("#restart-btn").click(restartQuiz);

        // advances to and displays the next question (if there is one), otherwise game over.
    var nextQuestion = function(index) {
        currentQuestion++;
        console.log("Advancing to next question Number" + currentQuestion);
        
        if (currentQuestion === quiz.length) { gameOver(); }
        else {
            
            $(".start-container").css("display", "none");
            $(".question-container").css("display", "block");
            $(".answer-container").css("display", "none");
            $("#actual-question").text(quiz[currentQuestion].question);
            $("#answer1").text(quiz[currentQuestion].answer1);
            $("#answer2").text(quiz[currentQuestion].answer2);
            $("#answer3").text(quiz[currentQuestion].answer3);
            $("#answer4").text(quiz[currentQuestion].answer4);

            if (!addedListeners) {
                $("#answer1").click(function() { questionAnswered("answer1")});
                $("#answer2").click(function() { questionAnswered("answer2")});
                $("#answer3").click(function() { questionAnswered("answer3")});
                $("#answer4").click(function() { questionAnswered("answer4")});
                addedListeners = true;
            }
            
            timeLeft = QUESTION_TIME_LIMIT;
            intervalId = setInterval(updateCountdownClock, 1000);
            clockRunning = true;
        }
        }

    var updateCountdownClock = function () {
        //console.log("seconds elapsed: " + timeLeft);
        $("#time-remaining").text(timeLeft);
        timeLeft--;
        if (timeLeft === 0) {
            //clearInterval(intervalId);
            console.log("Timed out on quesetion number " + currentQuestion);
            displayAnswer(false);
        }
    }

    function questionAnswered(answer) {
        //console.log("answered " + $(this));
        //clearInterval(intervalId);
        var question = quiz[currentQuestion];
       // console.log("question's correct answer is: " + question["correct-answer"])
        if (question["correct-answer"] === answer) {
            displayAnswer(true);
            numCorrect++;
            console.log("Correct answer!!! Number " + currentQuestion);
        } else {
            console.log("Incorrect answer!!! Nuymber " + currentQuestion  );
            displayAnswer(false);
        }
    }

    // This shows the answer and whether or not it was correct
    function displayAnswer(correct) {
        clearInterval(intervalId);
        var question = quiz[currentQuestion];
        if(correct) {
            $("#notification").text("Correct!!!!");
        } else $("#notification").text("Nope!!!!");
        
        switch(question["correct-answer"]) {
            case ("answer1"): $("#explanation").text("The correct answer is: " + question.answer1); break;
            case ("answer2"): $("#explanation").text("The correct answer is: " + question.answer2); break;
            case ("answer3"): $("#explanation").text("The correct answer is: " + question.answer3); break;
            case ("answer4"): $("#explanation").text("The correct answer is: " + question.answer4); break;
        }    
        $(".question-container").css("display", "none");
        $(".answer-container").css("display", "block");
        //console.log("Looking up image at " + question["associated-image"]);
        $("#answer-image").attr("src", question["associated-image"]);
        $("#info-blurb").text(question.info);
        setTimeout(nextQuestion, RESULT_DISPLAY_TIME);
    }

    var gameOver = function() {
        console.log("game over");
        $(".start-container").css("display", "none");
        $(".question-container").css("display", "none");
        $(".answer-container").css("display", "none");
        $(".end-of-game-container").css("display", "block");
        $("#number-correct").text("Number Correct: " + numCorrect + " out of " + quiz.length);
    }
});