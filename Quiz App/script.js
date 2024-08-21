const quizData = {
  general: [
      {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: "Paris"
      },
      {
          question: "Who wrote 'To Kill a Mockingbird'?",
          options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
          answer: "Harper Lee"
      },
      {
          question: "What is the chemical symbol for gold?",
          options: ["Au", "Ag", "Pb", "Fe"],
          answer: "Au"
      },
      {
         question: 'What is the capital of France?',
         options: ['Paris', 'London', 'Rome', 'Berlin'],
         answer: 'Paris'      
      },
      {
         question: 'Who wrote "Hamlet"?',
         options: ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen'], 
         answer: 'William Shakespeare' 
      },
      { question: 'What is the largest planet in our solar system?', 
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], 
        answer: 'Jupiter' 
      },
      {
        question: 'What is the boiling point of water?', 
        options: ['100°C', '90°C', '110°C', '95°C'], 
        answer: '100°C' 
      },
      { 
        question: 'Who painted the Mona Lisa?', 
        options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'], 
        answer: 'Leonardo da Vinci' 
      },
      { 
        question: 'What is the currency of Japan?', 
        options: ['Yuan', 'Won', 'Yen', 'Dollar'], 
        answer: 'Yen' 
      },
      { 
        question: 'What is the tallest mountain in the world?', 
        options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'], 
        answer: 'Mount Everest' 
      },
      { 
        question: 'What is the smallest prime number?', 
        options: ['1', '2', '3', '5'], 
        answer: '2' },
      { 
        question: 'What is the fastest land animal?', 
        options: ['Cheetah', 'Lion', 'Horse', 'Ostrich'], 
        answer: 'Cheetah' 
      },
      { 
        question: 'What element does "O" represent on the periodic table?', 
        options: ['Oxygen', 'Osmium', 'Gold', 'Hydrogen'], 
        answer: 'Oxygen' 
      },
  ],
  science: [
      {
          question: "What planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          answer: "Mars"
      }
  ],
  history: [
      {
          question: "Who was the first President of the United States?",
          options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
          answer: "George Washington"
      }
  ],
  dsa: [
    { question: 'What is a stack?', options: ['A type of tree', 'A linear data structure', 'A type of graph', 'None of the above'], answer: 'A linear data structure' },
    { question: 'What is a queue?', options: ['A type of list', 'A linear data structure', 'A type of array', 'None of the above'], answer: 'A linear data structure' },
    { question: 'What is a linked list?', options: ['A tree data structure', 'A sequence of nodes', 'A circular structure', 'None of the above'], answer: 'A sequence of nodes' },
    { question: 'Which of these is not a sorting algorithm?', options: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Search Sort'], answer: 'Search Sort' },
    { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'], answer: 'O(log n)' },
    { question: 'Which data structure is used for BFS in graph traversal?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 'Queue' },
    { question: 'Which data structure is used for DFS in graph traversal?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 'Stack' },
    { question: 'What is the best case time complexity of bubble sort?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'], answer: 'O(n)' },
    { question: 'What is the worst-case time complexity of quicksort?', options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(1)'], answer: 'O(n^2)' },
    { question: 'Which of the following is a divide and conquer algorithm?', options: ['Merge Sort', 'Bubble Sort', 'Selection Sort', 'Insertion Sort'], answer: 'Merge Sort' },
],
};

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let startTime;
let totalTime = 0;
let usedHint = false;
const selectedAnswers = [];

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('next-question').addEventListener('click', nextQuestion);
document.getElementById('prev-question').addEventListener('click', prevQuestion);
document.getElementById('restart-quiz').addEventListener('click', restartQuiz);
document.getElementById('hint').addEventListener('click', useHint);
document.getElementById('review-answers').addEventListener('click', reviewAnswers);
document.getElementById('back-to-results').addEventListener('click', backToResults);
document.getElementById
document.getElementById('back-to-results').addEventListener('click', backToResults);
document.getElementById('share-result').addEventListener('click', shareResult);
document.getElementById('theme-select').addEventListener('change', changeTheme);
document.getElementById('dark-mode-toggle').addEventListener('change', toggleDarkMode);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    totalTime = 0;
    usedHint = false;
    selectedAnswers.length = 0;
    startTime = Date.now();
    timeLeft = 30;
    progress = 0;
    
    document.getElementById('quiz-settings').classList.add('d-none');
    document.getElementById('quiz-header').classList.add('d-none');
    document.getElementById('quiz-content').classList.remove('d-none');
    document.getElementById('quiz-results').classList.add('d-none');
    document.getElementById('review-section').classList.add('d-none');

    showQuestion();
    startTimer();
    updateProgressBar();
}

function showQuestion() {
    const category = document.getElementById('category').value;
    const questionData = quizData[category][currentQuestion];
    
    document.getElementById('question').innerText = questionData.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary option-btn';
        button.innerText = option;
        button.addEventListener('click', () => selectOption(option));
        optionsDiv.appendChild(button);
    });

    document.getElementById('hint').disabled = usedHint;
}

function selectOption(option) {
    const category = document.getElementById('category').value;
    const questionData = quizData[category][currentQuestion];
    selectedAnswers[currentQuestion] = option;

    if (option === questionData.answer) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
}

function showFeedback(isCorrect) {
    const feedback = document.createElement('div');
    feedback.className = 'alert mt-3 ' + (isCorrect ? 'alert-success' : 'alert-danger');
    feedback.innerText = isCorrect ? 'Correct!' : 'Wrong!';
    document.getElementById('quiz-content').appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    const category = document.getElementById('category').value;
    if (currentQuestion < quizData[category].length - 1) {
        currentQuestion++;
        showQuestion();
        resetTimer();
    } else {
        endQuiz();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        resetTimer();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
    startTimer();
}

function useHint() {
    usedHint = true;
    const category = document.getElementById('category').value;
    const questionData = quizData[category][currentQuestion];
    const correctOption = questionData.answer;

    const options = Array.from(document.getElementsByClassName('option-btn'));
    const incorrectOptions = options.filter(btn => btn.innerText !== correctOption);
    
    incorrectOptions.slice(0, 2).forEach(btn => btn.disabled = true);
    document.getElementById('hint').disabled = true;
}

function endQuiz() {
    clearInterval(timer);
    const totalTimeTaken = Math.round((Date.now() - startTime) / 1000);
    const avgTime = (totalTimeTaken / quizData[document.getElementById('category').value].length).toFixed(2);
    const accuracy = ((score / quizData[document.getElementById('category').value].length) * 100).toFixed(2);

    document.getElementById('score').innerText = `${score} / ${quizData[document.getElementById('category').value].length}`;
    document.getElementById('accuracy').innerText = accuracy;
    document.getElementById('avg-time').innerText = avgTime;

    document.getElementById('quiz-content').classList.add('d-none');
    document.getElementById('quiz-results').classList.remove('d-none');
}

function reviewAnswers() {
    document.getElementById('quiz-results').classList.add('d-none');
    document.getElementById('review-section').classList.remove('d-none');

    const category = document.getElementById('category').value;
    const reviewContent = document.getElementById('review-content');
    reviewContent.innerHTML = '';

    quizData[category].forEach((questionData, index) => {
        const questionReview = document.createElement('div');
        questionReview.className = 'review-item';

        const questionText = document.createElement('p');
        questionText.innerText = `${index + 1}. ${questionData.question}`;
        questionReview.appendChild(questionText);

        const selectedAnswer = document.createElement('p');
        selectedAnswer.innerText = `Your Answer: ${selectedAnswers[index] || 'Not Answered'}`;
        selectedAnswer.className = selectedAnswers[index] === questionData.answer ? 'text-success' : 'text-danger';
        questionReview.appendChild(selectedAnswer);

        const correctAnswer = document.createElement('p');
        correctAnswer.innerText = `Correct Answer: ${questionData.answer}`;
        questionReview.appendChild(correctAnswer);

        reviewContent.appendChild(questionReview);
    });
}

function backToResults() {
    document.getElementById('review-section').classList.add('d-none');
    document.getElementById('quiz-results').classList.remove('d-none');
}

function shareResult() {
    // Placeholder for sharing result as an image
    alert("Feature to share results on social media will be implemented here.");
}

function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    document.body.className = theme + '-theme';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function restartQuiz() {
    document.getElementById('quiz-settings').classList.remove('d-none');
    document.getElementById('quiz-header').classList.remove('d-none');
    document.getElementById('quiz-content').classList.add('d-none');
    document.getElementById('quiz-results').classList.add('d-none');
    document.getElementById('review-section').classList.add('d-none');
}
function updateProgressBar() {
    progress += 10;
    document.getElementById('progress-bar').style.width = progress + '%';
}





