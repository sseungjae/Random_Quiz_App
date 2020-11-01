
const questionNumber = document.querySelector(".question_number");
const questionText = document.querySelector(".question_text");
const optionContainer = document.querySelector(".option_container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];


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
}


window.onload = function(){
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
}