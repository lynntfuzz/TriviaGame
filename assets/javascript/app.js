$(function() {
    console.log( "ready!" );
    
    var QUESTION_TIME_LIMIT = 30;
    var RESULT_DISPLAY_TIME= 4000;
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
        "info":"Gloria drove home from the cocktail party in her yellow convertible Volkswagon bug, and she picked up hitchhiker with his car broken down. She impulsively agreed to go to a movie with him because her best friend told her she needed to take more risks.", 
    }

    var question3 = {
        "question":"What did Scotty warn Gloria about before dying?",
        "answer1":"Beware of the dwarf!",
        "answer2":"Don't forget your umbrella!",
        "answer3":"Don't go to the Opera, there will be a murder!",
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
        "info":"As Gloria's landlord, Mr. Hennessey, Burgess Meredith's character was very useful, especially because he is a black belt in karate."    
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

    var question7 = {
        "question":"Dudley Moore's role of Stanley Tibbets was written for:",
        "answer1":"Tim Conway",
        "answer2":"Don Rickles",
        "answer3":"Robin Williams",
        "answer4":"Steve Martin",
        "correct-answer":"answer1",
        "associated-image":"assets/images/timconway.jpg",
        "info":"Colin Higgins originally wrote the role of Stanley Tibbets for Tim Conway, but Tim Conway turned down the role."    
    }

    var question8 = {
        "question":"Who attacked and kidnapped Gloria in the library?",
        "answer1":"Rupert Stiltskin",
        "answer2":"The Dwarf",
        "answer3":"The Albino",
        "answer4":"Whitey Jackson",
        "correct-answer":"answer3",
        "associated-image":"assets/images/albino.jpeg",
        "info":"William Frankfather played the character of Whitey Jackson, an albino. William Frankfather is not actually an albino. He died in 1998 at the UCLA hospital due to complications of liver disease."    
    }

    var question9 = {
        "question":"During the car chase in the grand finale, where is the tourist couple in the back of the limo from?",
        "answer1":"Japan",
        "answer2":"Kansas",
        "answer3":"Germany",
        "answer4":"China",
        "correct-answer":"answer1",
        "associated-image":"assets/images/japanese-couple.jpg",
        "info":"The Japanese couple in the back of the taxi don't speak English, but they are able to explain to them that Chevy Chase's character is a detective like Kojak. The portrayal of this couple is now seen as racist and cut out of television airings of Foul Play."    
    }

    var question10 = {
        "question":"What is the the name of the musical conducted by Dudley Moore's character at the end of the movie?",
        "answer1":"Kind Hearts and Coronets",
        "answer2":"Oklahoma!",
        "answer3":"The Mikado",
        "answer4":"Flower Drum Song",
        "correct-answer":"answer3",
        "associated-image":"assets/images/mikado.jpg",
        "info":"Stanley Tibbets is conducting The Mikado while the Pope is in the audience and the assassination attempt takes place."    
    }

    var quiz = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 ];
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