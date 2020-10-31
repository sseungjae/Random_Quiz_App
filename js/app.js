
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
    console.log(availableQuestions)
}

window.onload = function(){
    setAvailableQuestions();
}