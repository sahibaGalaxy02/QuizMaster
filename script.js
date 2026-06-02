let shuffledQuestions = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

const tryBtn = document.querySelector(".try-btn");
const homeBtn = document.querySelector(".home-btn");

let index = 0;
let score = 0;

startBtn.onclick = () => popup.classList.add("active");
exitBtn.onclick = () => popup.classList.remove("active");

continueBtn.onclick = () => {
  popup.classList.remove("active");
  home.classList.remove("active");
  result.classList.remove("active");
  quiz.classList.add("active");

  index = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";

  shuffledQuestions = shuffleArray([...questions]);
  loadQuestion();
};

function loadQuestion() {
  const q = shuffledQuestions[index];
  qText.textContent = q.q;
  optList.innerHTML = "";
  nextBtn.disabled = true;

  q.o.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(div, i);
    optList.appendChild(div);
  });

  total.textContent = `${index + 1} of ${shuffledQuestions.length} Questions`;
}

function checkAnswer(el, i) {
  const correctIndex = shuffledQuestions[index].a;
  const options = document.querySelectorAll(".option");

  options.forEach(o => o.style.pointerEvents = "none");

  if (i === correctIndex) {
    score++;
    el.classList.add("correct");
  } else {
    el.classList.add("wrong");
    options[correctIndex].classList.add("correct");
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  index++;
  if (index < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quiz.classList.remove("active");
  result.classList.add("active");

  const percentage = Math.round((score / shuffledQuestions.length) * 100);
  percent.textContent = percentage + "%";
  scoreText.textContent = `Your Score ${score} out of ${shuffledQuestions.length}`;
}

tryBtn.onclick = () => {
  index = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";
  shuffledQuestions = shuffleArray([...questions]);

  result.classList.remove("active");
  quiz.classList.add("active");
  loadQuestion();
};

homeBtn.onclick = () => {
  location.reload();
};