// Kérdések és válaszok
const quizData = [
    {
        question: "He said, I have finished my homework.",
        answers: ["He said that he had finished his homework", "He said that he finishes his homework.", "He said that he has finished his homework.", "He said that he will finish his homework."],
        correct: 0
    },
    {
        question: "Where did you buy this book? She asked me.",
        answers: ["She asked me where did I buy that book.", "She asked me where I had bought that book. ", "She asked me where I have bought that book.", "She asked me where I was buying that book."],
        correct: 1
    },
    {
        question: "She asked, why aren't you coming to the party? ",
        answers: ["She asked why I wasn’t coming to the party.", "She asked why I didn’t come to the party.", "She asked why wasn’t I coming to the party.", "She asked why I am not coming to the party."],
        correct: 1
    },
    {
        question: "I can't find my keys, he said.",
        answers: ["He said he couldn’t find his keys.", "He said he can’t find his keys.", "He said he didn't could find his keys.", "He said he couldn’t found his keys."],
        correct: 0
    },
    {
        question: "I would have helped you if I had known about the problem, Mark said.",
        answers: ["Mark said he had helped me if he would have known about the problem.", "Mark said he will help me if he had known about the problem.", "Mark said he would help me if he knew about the problem.", "Mark said that he would have helped me if he had known about the problem."],
        correct: 3
    },
    {
        question: "She ___ me that she was tired.",
        answers: ["saying", "say", "said", "told"],
        correct: 2
    },
        {
        question: "He ___ me to be quiet.",
        answers: ["sayed", "says", "said", "told"],
        correct: 3
    },
        {
        question: "What did she ___?",
        answers: ["say", "telling", "told", "says"],
        correct: 0
    },
        {
        question: "I ___ him I would be late.",
        answers: ["say", "told", "tell", "said"],
        correct: 1
    },
        {
        question: "They ___ that they didn’t like the movie.",
        answers: ["sayed", "told to me", "told", "said"],
        correct: 3
    },
            {
        question: "Which sentence uses the past perfect correctly?",
        answers: ["She had went to the store before I arrived.", "She has gone to the store before I arrived.", "She had gone to the store before I arrived.", "She go to the store before I arrived."],
        correct: 2
    },
                {
        question: "When we got to the station, the train ___.",
        answers: ["had left", "left", "has left", "was leaving"],
        correct: 0
    },
                {
        question: "I didn’t recognize her because she ___ her hair.",
        answers: ["had cut", "cut", "was cutting", "has cut"],
        correct: 0
    },
                {
        question: "Which sentence contains the past perfect tense?",
        answers: ["By the time he finishes dinner, I already left.", "By the time he finished dinner, I already leave.", "By the time he finished dinner, I already leaving.", "By the time he finished dinner, I had already left."],
        correct: 3
    },
                {
        question: "They were tired because they ___ all day.",
        answers: ["worked", "were working", "had been working", "had working"],
        correct: 2
    },
                    {
        question: "When I got to the party, Tom __________ already __________. (leave)",
        answers: ["had already left", "has already left", "left already", "was already leave"],
        correct: 0
    },
                    {
        question: "We __________ the match because we __________ the tickets. (miss, forget)",
        answers: ["missed / had forgotten", "had missed / forgot", "had miss / had forgot", "miss / had forget"],
        correct: 0
    },
                        {
        question: "She __________ a lot better after she __________ the medicine. (feel, take)",
        answers: ["felt / tooked", "had felt / take", "feel / had took", "felt / had taken"],
        correct: 3
    },
                        {
        question: "They __________ their homework before the teacher __________ the classroom. (finish, enter)",
        answers: ["finishing / entered", "have finished / enters", "had finished / entered ", "finished / had entered"],
        correct: 2
    },
                        {
        question: "I __________ the email after I __________ dinner. (write, have)",
        answers: ["had wrote / had had", "wrote / had had", "write / had", "wrote / have had"],
        correct: 1
    },
];

// DOM elemek
const questionElement = document.getElementById('question');
const answerElements = [
    document.getElementById('answer1'),
    document.getElementById('answer2'),
    document.getElementById('answer3'),
    document.getElementById('answer4')
];
const progressElement = document.getElementById('progress');
const questionNumberElement = document.getElementById('question-number');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const resultScore = document.getElementById('result-score');
const resultPercentage = document.getElementById('result-percentage');
const restartBtn = document.getElementById('restart-btn');

// Quiz állapot
let currentQuestion = 0;
let score = 0;

// Quiz betöltése
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    for (let i = 0; i < answerElements.length; i++) {
        answerElements[i].textContent = question.answers[i];
        answerElements[i].className = 'answer-option'; // Reset classes
    }
    
    // Frissítjük a progress bárt
    progressElement.style.width = `${(currentQuestion / quizData.length) * 100}%`;
    questionNumberElement.textContent = `${currentQuestion + 1}/${quizData.length}`;
}

// Eredmény megjelenítése
function showResults() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    resultScore.textContent = `Eredmény: ${score} / ${quizData.length}`;
    resultPercentage.textContent = `Százalék: ${percentage}%`;
}

// Válasz kiválasztása
answerElements.forEach((answer, index) => {
    answer.addEventListener('click', () => {
        // Ha már válaszoltunk, ne tegyen semmit
        if (answer.classList.contains('correct') || answer.classList.contains('incorrect')) {
            return;
        }

        // Kijelöljük az aktuális választ
        answer.classList.add('selected');
        
        // Ellenőrizzük a választ
        setTimeout(() => {
            const correctIndex = quizData[currentQuestion].correct;
            
            if (index === correctIndex) {
                answer.classList.replace('selected', 'correct');
                score++;
            } else {
                answer.classList.replace('selected', 'incorrect');
                // A helyes választ is zöldre színezzük
                answerElements[correctIndex].classList.add('correct');
            }
            
            // Következő kérdés
            setTimeout(() => {
                currentQuestion++;
                
                if (currentQuestion < quizData.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            }, 1000);
        }, 500);
    });
});

// Quiz újraindítása
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
});

// Betöltjük az első kérdést
loadQuestion();