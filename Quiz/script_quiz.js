const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { option: "Banglore", name: "q1", correct: false },
            { option: "Delhi", name: "q1", correct: true },
            { option: "Chandigarh", name: "q1", correct: false },
            { option: "Mumbai", name: "q1", correct: false },
        ],
        difficulty: "easy",
        time: 20
    },
    {
        question: "Which river is often referred to as the 'Ganga' in India?",
        answers: [
            { option: "Yamuna", name: "q2", correct: false },
            { option: "Brahmaputra", name: "q2", correct: false },
            { option: "Ganges", name: "q2", correct: true },
            { option: "Godavari", name: "q2", correct: false },
        ],
        difficulty: "easy",
        time: 20
    },
    {
        question: "Who is known as the 'Father of the Nation' in India?",
        answers: [
            { option: "Jawaharlal Nehru", name: "q3", correct: false },
            { option: "Sardar Patel", name: "q3", correct: false },
            { option: "Mahatma Gandhi", name: "q3", correct: true },
            { option: "Subhas Chandra Bose", name: "q3", correct: false },
        ],
        difficulty: "easy",
        time: 20
    },

    {
        question: "In which year did India gain independence from British rule?",
        answers: [
            { option: "1945", name: "q4", correct: false },
            { option: "1947", name: "q4", correct: true },
            { option: "1950", name: "q4", correct: false },
            { option: "1962", name: "q4", correct: false },
        ],
        difficulty: "medium",
        time: 30
    },
    {
        question: "Which mountain range separates the Indian subcontinent from the Tibetan Plateau?",
        answers: [
            { option: "Himalayas", name: "q5", correct: true },
            { option: "Western Ghats", name: "q5", correct: false },
            { option: "Eastern Ghats", name: "q5", correct: false },
            { option: "Vindhya Range", name: "q5", correct: false },
        ],
        difficulty: "medium",
        time: 30
    },
    {
        question: "What is the currency of India?",
        answers: [
            { option: "Rupee", name: "q6", correct: true },
            { option: "Rupiah", name: "q6", correct: false },
            { option: "Ringgit", name: "q6", correct: false },
            { option: "Baht", name: "q6", correct: false },
        ],
        difficulty: "medium",
        time: 30
    },

    {
        question: "Which Indian state is known as the 'Land of Five Rivers'?",
        answers: [
            { option: "Punjab", name: "q7", correct: true },
            { option: "Haryana", name: "q7", correct: false },
            { option: "Uttar Pradesh", name: "q7", correct: false },
            { option: "Bihar", name: "q7", correct: false },
        ],
        difficulty: "difficult",
        time: 40
    },
    {
        question: "Who was the first woman Prime Minister of India?",
        answers: [
            { option: "Indira Gandhi", name: "q8", correct: true },
            { option: "Sonia Gandhi", name: "q8", correct: false },
            { option: "Mamata Banerjee", name: "q8", correct: false },
            { option: "Pratibha Patil", name: "q8", correct: false },
        ],
        difficulty: "difficult",
        time: 40
    },
    {
        question: "Which ancient Indian text is a compilation of teachings on various subjects and is often referred to as the 'Science of Life'?",
        answers: [
            { option: "Mahabharata", name: "q9", correct: false },
            { option: "Ramayana", name: "q9", correct: false },
            { option: "Vedas", name: "q9", correct: false },
            { option: "Ayurveda", name: "q9", correct: true },
        ],
        difficulty: "difficult",
        time: 40

    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let fil;

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    const selectedDifficulty = document.getElementById('difficulty').value;
    let filteredQuestions;
    filteredQuestions = questions.filter(question => question.difficulty === selectedDifficulty);
    displayQuestion(currentQuestionIndex, filteredQuestions);
}


function startTimer(time) {
    let timeLeft = time; 
    timer = setInterval(function () {
        document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            nextQuestion();
        }

        timeLeft--;
    }, 1000);
}


function displayQuestion(index, questionSet) {
    clearInterval(timer);

    const question = questionSet[index];
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');

    questionContainer.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.answers.forEach((answer, idx) => {
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.id = `option${idx}`;
        optionInput.value = answer.correct;
        optionInput.name = answer.name;
        optionsContainer.appendChild(optionInput);

        const optionLabel = document.createElement('span');
        optionLabel.textContent = answer.option;
        optionsContainer.appendChild(optionLabel);

        const br = document.createElement("br");
        optionsContainer.appendChild(br);
    });

    startTimer(question.time);
}


function nextQuestion() {

    document.getElementById('quiz-container').style.display = 'none';

    if (fil - 2 < currentQuestionIndex) {
        document.getElementById('question-container').style.display = 'none'
    }

    clearInterval(timer);

    const selectedOption = document.querySelector('input[type=radio]:checked');

    if (selectedOption !== null) {
        if (selectedOption.value === 'true') {
            score++;
        }
    }

    currentQuestionIndex++;

    const selectedDifficulty = document.getElementById('difficulty').value;
    let filteredQuestions;

    filteredQuestions = questions.filter(question => question.difficulty === selectedDifficulty);
    fil = filteredQuestions.length;

    if (currentQuestionIndex < filteredQuestions.length) {
        displayQuestion(currentQuestionIndex, filteredQuestions);
    } else {
        showResult();
    }
}


function submitQuiz() {

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    clearInterval(timer);

    const selectedDifficulty = document.getElementById('difficulty').value;
    let filteredQuestions;
    filteredQuestions = questions.filter(question => question.difficulty === selectedDifficulty);
    fil = filteredQuestions.length;

    const selectedOption = document.querySelector('input[type=radio]:checked');

    if (selectedOption !== null) {
        if (selectedOption.value === 'true') {
            score++;
        }
    }

    showResult();
}


function showResult() {
    document.getElementById("resultContainer").style.display = "block";
    clearInterval(timer);

    const totalQuestions = fil;

    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `<p>Total Questions: ${totalQuestions}</p>  
                                <p>Score: ${score}</p>
                                `;

    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'Restart Quiz';
    reloadButton.id = 'reload-btn';
    reloadButton.onclick = function () {
        location.reload();
    };
    resultContainer.appendChild(reloadButton);

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.style.display = 'none';
}


window.onload = function () {
    let currentQuestionIndex = 0;
    document.getElementById('difficulty').addEventListener('change', function () {
        const selectedDifficulty = this.value;
        currentQuestionIndex = 0;
        score = 0;

        let filteredQuestions;
        filteredQuestions = questions.filter(question => question.difficulty === selectedDifficulty);


        
            displayQuestion(currentQuestionIndex, filteredQuestions);
            document.getElementById('next-btn').disabled = false;
            document.getElementById('submit-btn').disabled = false;
        
    });
};

