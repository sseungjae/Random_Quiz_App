
const questionNumber = document.querySelector(".question_number");
const questionText = document.querySelector(".question_text");
const optionContainer = document.querySelector(".option_container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];


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
    //console.log(availableOptions)

    //create option in in HTMLß
    for(let i=0; i<optionLen; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        //get the position of 'optionIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);

        //remove the ' optionIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2, 1);
        console.log(optionIndex)
        console.log(availableOptions)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = i;
        option.className = "option";
        optionContainer.appendChild(option)
    }

    questionCounter++
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
    }
    else{
        getNewQuestion();
    }
}



window.onload = function(){
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
}