let shuffledQuestions = [];

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}



const startBtn = document.querySelector(".start-btn");
const popup = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const continueBtn = document.querySelector(".continue-btn");

const home = document.querySelector(".home");
const quiz = document.querySelector(".quiz-section");
const result = document.querySelector(".result-box");

const qText = document.querySelector(".question-text");
const optList = document.querySelector(".option-list");
const nextBtn = document.querySelector(".next-btn");
const total = document.querySelector(".total");
const scoreEl = document.querySelector(".score");

const percent = document.querySelector(".percent");
const scoreText = document.querySelector(".score-text");

let index = 0;
let score = 0;

startBtn.onclick = () => popup.classList.add("active");
exitBtn.onclick = () => popup.classList.remove("active");

continueBtn.onclick = () => {
  popup.classList.remove("active");
  home.classList.remove("active");
  quiz.classList.add("active");

  // RESET QUIZ
  index = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";

  // 🔥 NEW QUIZ EVERY TIME
  shuffledQuestions = shuffleArray([...questions]);

  loadQuestion();
};


function loadQuestion() {
const q = shuffledQuestions[index];
  qText.textContent = q.q;
  optList.innerHTML = "";

  q.o.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(div, i);
    optList.appendChild(div);
    nextBtn.disabled = true;

  });

  total.textContent = `${index + 1} of ${questions.length} Questions`;
}

function checkAnswer(el, i) {
  document.querySelectorAll(".option").forEach(o => o.style.pointerEvents = "none");

  if (i === questions[index].a) {
    score++;
    el.classList.add("correct");
  } else {
    el.classList.add("wrong");
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}


nextBtn.onclick = () => {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quiz.classList.remove("active");
  result.classList.add("active");

  const percentage = Math.round((score / questions.length) * 100);

  percent.textContent = percentage + "%";
  scoreText.textContent = `Your Score ${score} out of ${questions.length}`;
}
const tryBtn = document.querySelector(".try-btn");
const homeBtn = document.querySelector(".home-btn");

tryBtn.onclick = () => {
  // reset quiz
  index = 0;
  score = 0;

  result.classList.remove("active");
  quiz.classList.add("active");

  scoreEl.textContent = "Score: 0";
  loadQuestion();
};

homeBtn.onclick = () => {
  location.reload();
};

