const startBtn = document.querySelector(".startBtn button");
const infoBox = document.querySelector(".infoBox");
const exit = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const result = document.querySelector(".result");
const options = document.querySelector(".options");
const timeline = document.querySelector("header .timeline");
const timeText = document.querySelector(".timer .timeText");
const timeCount = document.querySelector(".timer .timerSec");

startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo");
}

continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.add("activeQuiz"); 
    showQuestions(0); 
    questionsCounter(1); 
    startTimer(15);
    startTimerLine(0); 
}

let timeValue =  15;
let questionCount = 0;
let questionsNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result.querySelector(".buttons .restart");
const quit_quiz = result.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); 
    result.classList.remove("activeResult"); 
    timeValue = 15; 
    questionCount = 0;
    questionsNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(questionsCount);
    questionsCounter(questionsNumb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next.classList.remove("show"); 
}

quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next = document.querySelector("footer .next");
const bottom_ques_counter = document.querySelector("footer .totalQuestions");

// if  the "Next Que" button is clicked
next.onclick = ()=>{
    if(questionCount < quest.length - 1){ 
        questionCount++; 
        questionsNumb++; 
        showQuestions(questionCount); 
        questionsCounter(questionsNumb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}


function showQuestions(index){
    const questions = document.querySelector(".questions");

    
    let que_tag = '<span>'+ quest[index].numb + ". " + quest[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ quest[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ quest[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ quest[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ quest[index].options[3] +'</span></div>';
    questions.innerHTML = que_tag; 
    options.innerHTML = option_tag; 
    
    const option = options.querySelectorAll(".option");

   
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if the user clicks on the option
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = quest[questionCount].answer; 
    const allOptions = options.children.length; 

    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(options.children[i].textContent == correcAns){ 
                options.children[i].setAttribute("class", "option correct"); 
                options.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        options.children[i].classList.add("disabled"); 
    }
    next.classList.add("show"); 
}
function showResult(){
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.remove("activeQuiz"); 
    result.classList.add("activeResult");
    const scoreText = result.querySelector(".score");
    if (userScore > 40){ 
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ quest.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 20){ 
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ quest.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ quest.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = options.children.length; 
            let correcAns = questions[questionCount].answer; 
            for(i=0; i < allOptions; i++){
                if(options.children[i].textContent == correcAns){ 
                    options.children[i].setAttribute("class", "option correct"); 
                    options.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                options.children[i].classList.add("disabled");
            }
            next.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        timeline.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function questionsCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ quest.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}