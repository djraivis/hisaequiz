// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Snow / 雪 / Yuki?",
        imgSrc : "img/snow.jpeg",
        choiceA : "Sniegs",
        choiceB : "Medus",
        choiceC : "Krējums",
        correct : "A"
    },{
        question : "Winter / 冬 / Fuyu? ",
        imgSrc : "img/winter.jpg",
        choiceA : "Rudens",
        choiceB : "Ziema",
        choiceC : "Vasara",
        correct : "B"
    },{
        question : "Flowers / フラワーズ / Furawāzu?",
        imgSrc : "img/flowers.png",
        choiceA : "Puķes",
        choiceB : "Pavasaris",
        choiceC : "Zvirbulis",
        correct : "A"
    },{
        question : "Sparrow / スズメ / Suzume?",
        imgSrc : "img/zvirbulis.png",
        choiceA : "Balodis",
        choiceB : "Kaija",
        choiceC : "Zvirbulis",
        correct : "C"
    },{
        question : "Honey / はちみつ / Hachimitsu ?",
        imgSrc : "img/honey.png",
        choiceA : "Tēja",
        choiceB : "Medus",
        choiceC : "Siers",
        correct : "B"
    },{
        question : "Soured Cream / サワークリーム / Sawākurīmu? ",
        imgSrc : "img/krejums.png",
        choiceA : "Piens",
        choiceB : "Kefīrs",
        choiceC : "Krējums",
        correct : "C"
    },{
        question : "NHL Player Teddy Blueger is playing for?",
        imgSrc : "img/blueger.png",
        choiceA : "Edmonton Oilers",
        choiceB : "Pittsburgh Penguins",
        choiceC : "Montreal Canadians",
        correct : "B"
    },{
        question : "My name's day is in?",
        imgSrc : "img/may.jpeg",
        choiceA : "May",
        choiceB : "November",
        choiceC : "June",
        correct : "A"
    },{
        question : "Līgo in Latvia we celebrate in?",
        imgSrc : "img/ligo.png",
        choiceA : "May 25th",
        choiceB : "June 23rd",
        choiceC : "July 20th",
        correct : "B"
    },{
        question : "I'm in love with?",
        imgSrc : "img/treegirl.jpg",
        choiceA : "Winter Queen",
        choiceB : "Cindarella",
        choiceC : "Tree Girl",
        correct : "C"
    },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















