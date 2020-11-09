
const questionNumber = document.querySelector(".question_number");
const questionText = document.querySelector(".question_text");
const optionContainer = document.querySelector(".option_container");
const answersIndicatorContainer = document.querySelector(".answers_indicator");
const homeBox = document.querySelector(".home_box");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

//set question number and question and option
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the position of 'questionIndex' from the availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);

    //remove the questionIndex from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1, 1);
        //condole.log(questionIndex)
        //console.log(availableQuestions)

    //set options
    //get the length of options 
    const optionLen = currentQuestion.options.length

    //push options into availableOptions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    
    optionContainer.innerHTML ='';

    let animationDelay = 0.15;
    //create option in in HTMLß
    for(let i=0; i<optionLen; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        //get the position of 'optionIndex' from the availableOptions Array
        const index2 = availableOptions.indexOf(optionIndex);

        //remove the ' optionIndex' from the availableOptions Array, so that the option does not repeat
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++
}

//get the result of current attempt question
function getResult(element){
    //get the answer by comparing the id of clicked option
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        // set the green color to the correct option
        element.classList.add("correct")
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        
    }
    else{
        // set the red color to the incorrect option
        element.classList.add("wrong");
        // add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        //if the answer is incorrect the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();

}

// make all the options unclickable once the user select a option(RESTART THE USER TO CHANGE THE OPTION AGAIN)
function  unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){ 
    // hide quiz quizBox
    quizBox.classList.add("hide");

    // show result Box
    resultBox.classList.remove("hide");
    quizResult();
}

// get the quiz Result
function quizResult(){
    resultBox.querySelector(".total_question").innerHTML = quiz.length;
    resultBox.querySelector(".total_attempt").innerHTML = attempt;
    resultBox.querySelector(".total_correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total_wrong").innerHTML = attempt - correctAnswers;

    const percentage = (correctAnswers/quiz.length) *100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total_score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    // hide the resultBox
    resultBox.classList.add("hide");

    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide result Box
    resultBox.classList.add("hide");

    // show home Box
    homeBox.classList.remove("hide");
    resetQuiz();
}

// ### STARTING POINT ###

function startQuiz(){
    // hide home box
    homeBox.classList.add("hide");
    // show quiz Box
    quizBox.classList.remove("hide");

    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();

    //second we will call getNewQuestion(); function
    getNewQuestion();

    // to create indicator of answers
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total_question").innerHTML = quiz.length;
}