const questions = [
    {
        question: "What is Ohm's Law?",
        choices: ["A. V = I * R", "B. P = I^2 * R", "C. E = P * t", "D. F = ma"],
        correct: "A"
    },
    {
        question: "If a circuit has 12V and 6Ω resistance, what is the current?",
        choices: ["A. 0.5A", "B. 1A", "C. 2A", "D. 3A"],
        correct: "C"
    },
    {
        question: "Which of the following is a characteristic of a series circuit?",
        choices: ["A. Same current flows through each component", "B. Same voltage across each component", "C. Components have independent paths", "D. Total resistance is lower"],
        correct: "A"
    },
    {
        question: "What happens to the total resistance if you add more resistors in parallel?",
        choices: ["A. It increases", "B. It decreases", "C. It stays the same", "D. It becomes zero"],
        correct: "B"
    },
    {
        question: "What is the unit of electrical resistance?",
        choices: ["A. Ohm", "B. Coulomb", "C. Volt", "D. Ampere"],
        correct: "A"
    },
    {
        question: "In a parallel circuit, how does the voltage across each component compare?",
        choices: ["A. Voltage is the same across all components", "B. Voltage increases with each added component", "C. Voltage decreases with each added component", "D. Voltage is zero across all components"],
        correct: "A"
    },
    {
        question: "What is the symbol for a resistor in a circuit diagram?",
        choices: ["A. A zigzag line", "B. A straight line", "C. A triangle", "D. A circle"],
        correct: "A"
    },
    {
        question: "If a 10Ω resistor and a 20Ω resistor are connected in series, what is their total resistance?",
        choices: ["A. 10Ω", "B. 15Ω", "C. 30Ω", "D. 20Ω"],
        correct: "C"
    },
    {
        question: "What is the relationship between power, current, and voltage?",
        choices: ["A. P = I * V", "B. P = I / V", "C. P = V / I", "D. P = I^2 * V"],
        correct: "A"
    },
    {
        question: "Which of these materials is an electrical conductor?",
        choices: ["A. Glass", "B. Rubber", "C. Copper", "D. Plastic"],
        correct: "C"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let isAnswerSelected = false;
let score = 0;

function showQuestion(index) {
    const questionData = questions[index];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('options').innerHTML = questionData.choices.map((choice, i) => 
        `<button class="choice-button" onclick="selectAnswer('${String.fromCharCode(65 + i)}')">${choice}</button>`
    ).join('');
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('prevButton').style.display = index > 0 ? 'inline-block' : 'none';
    document.getElementById('nextButton').style.display = isAnswerSelected && index < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('seeAnswersButton').style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        document.getElementById('feedback').innerHTML = `<span class="correct">Correct!</span>`;
        score++;
    } else {
        document.getElementById('feedback').innerHTML = `<span class="incorrect">Incorrect.</span>`;
    }
    userAnswers[currentQuestionIndex] = answer;
    isAnswerSelected = true;
    document.getElementById('nextButton').style.display = 'inline-block';
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        isAnswerSelected = false;
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showCorrectAnswers() {
    const answersHtml = questions.map((question, index) => {
        return `
            <div>
                <p><strong>Question ${index + 1}:</strong> ${question.correct}</p>
            </div>
        `;
    }).join('');
    document.getElementById('question').innerHTML = `<p><strong>Your Score: ${score} / ${questions.length}</strong></p>`;
    document.getElementById('options').innerHTML = '';
    document.getElementById('feedback').innerHTML = answersHtml;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('seeAnswersButton').style.display = 'none';
}

function goBack() {
    window.history.back();
}

showQuestion(currentQuestionIndex);
