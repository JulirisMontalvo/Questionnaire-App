// VARIABLES: HTML Elements
let startBtn = document.getElementById("start-btn");
let startScreen = document.getElementById("start-screen");
let questionScreen = document.getElementById("question-screen");

let questionNumberEl = document.getElementById("question-number");
let questionTextEl = document.getElementById("question-text");
let choicesContainerEl = document.getElementById("choices-container");

let resultScreen = document.getElementById("result-screen");
let houseResultEl = document.getElementById("house-result");
let houseDescriptionEl = document.getElementById("house-description");
let restartBtn = document.getElementById("restart-btn");

// INSTRUCTIONS MODAL VARIABLES
let helpBtn = document.getElementById("help-btn");
let modalOverlay = document.getElementById("modal-overlay");
let closeModalBtn = document.getElementById("close-modal-btn");

// FEEDBACK MODAL VARIABLES
let feedbackBtn = document.getElementById("feedback-btn");
let feedbackModalOverlay = document.getElementById("feedback-modal-overlay");
let feedbackInput = document.getElementById("feedback-input");
let submitFeedbackBtn = document.getElementById("submit-feedback-btn");
let closeFeedbackBtn = document.getElementById("close-feedback-btn");
let feedbackConfirmation = document.getElementById("feedback-confirmation");

// HOUSE SCORES
let houseScores = {
  Gryffindor: 0,
  Ravenclaw: 0,
  Hufflepuff: 0,
  Slytherin: 0
};

// HOUSE DESCRIPTIONS
let houseDescriptions = {
  Gryffindor: "You belong in Gryffindor! Where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart.",
  Ravenclaw: "You belong in Ravenclaw! Where those of wit and learning, will always find their kind.",
  Hufflepuff: "You belong in Hufflepuff! Where they are just and loyal, patient, true, and unafraid of toil.",
  Slytherin: "You belong in Slytherin! Here you'll make your real friends, these cunning folk use any means to achieve their ends."
};

// QUESTION DATA
let questions = [
  {
    text: "Which trait do you value most in yourself?",
    choices: [
      { text: "Bravery and courage", house: "Gryffindor" },
      { text: "Intelligence and wisdom", house: "Ravenclaw" },
      { text: "Loyalty and dedication", house: "Hufflepuff" },
      { text: "Ambition and cunning", house: "Slytherin" }
    ]
  },
  {
    text: "Which magical creature would you choose as a pet?",
    choices: [
      { text: "A majestic Lion-like creature", house: "Gryffindor" },
      { text: "A wise Eagle or Owl", house: "Ravenclaw" },
      { text: "A loyal Badger or dog", house: "Hufflepuff" },
      { text: "A clever Snake or reptile", house: "Slytherin" }
    ]
  },
  {
    text: "What type of potion would you rather brew?",
    choices: [
      { text: "A draught of bravery and heroism", house: "Gryffindor" },
      { text: "A potion that gives infinite knowledge", house: "Ravenclaw" },
      { text: "A potion that heals all wounds", house: "Hufflepuff" },
      { text: "A potion that grants power and influence", house: "Slytherin" }
    ]
  },
  {
    text: "How do you handle a difficult challenge?",
    choices: [
      { text: "Face it head-on with courage!", house: "Gryffindor" },
      { text: "Analyze it carefully and make a smart plan", house: "Ravenclaw" },
      { text: "Work hard with my friends to overcome it", house: "Hufflepuff" },
      { text: "Find a clever way to turn it to my advantage", house: "Slytherin" }
    ]
  },
  {
    text: "Which class at Hogwarts sounds most exciting?",
    choices: [
      { text: "Defense Against the Dark Arts", house: "Gryffindor" },
      { text: "Charms and Spells Theory", house: "Ravenclaw" },
      { text: "Herbology and Care of Magical Creatures", house: "Hufflepuff" },
      { text: "Potions and Dark Arts Secrets", house: "Slytherin" }
    ]
  },
  {
    text: "What kind of legacy do you want to leave behind?",
    choices: [
      { text: "To be remembered as a true hero", house: "Gryffindor" },
      { text: "To be remembered for great discoveries", house: "Ravenclaw" },
      { text: "To be remembered as a true and loyal friend", house: "Hufflepuff" },
      { text: "To be remembered as a great leader", house: "Slytherin" }
    ]
  },
  {
    text: "Which room in Hogwarts would you spend most of your time in?",
    choices: [
      { text: "The Common Room fire watching the castle grounds", house: "Gryffindor" },
      { text: "The Great Library surrounded by books", house: "Ravenclaw" },
      { text: "The cozy Kitchens near the house-elves", house: "Hufflepuff" },
      { text: "The Dungeon common room under the lake", house: "Slytherin" }
    ]
  },
  {
    text: "If you found a locked chest, what would you do?",
    choices: [
      { text: "Break it open boldly!", house: "Gryffindor" },
      { text: "Decipher the lock mechanism logically", house: "Ravenclaw" },
      { text: "Find who owns it and return it", house: "Hufflepuff" },
      { text: "Find the key and keep what's inside", house: "Slytherin" }
    ]
  },
  {
    text: "What quality do you look for most in a friend?",
    choices: [
      { text: "Boldness and adventure", house: "Gryffindor" },
      { text: "Insightful conversation", house: "Ravenclaw" },
      { text: "Kindness and honesty", house: "Hufflepuff" },
      { text: "Resourcefulness and drive", house: "Slytherin" }
    ]
  },
  {
    text: "Which magical artifact would you pick?",
    choices: [
      { text: "The Sword of Gryffindor", house: "Gryffindor" },
      { text: "Ravenclaw's Diadem of Wisdom", house: "Ravenclaw" },
      { text: "Hufflepuff's Cup of Kindness", house: "Hufflepuff" },
      { text: "Slytherin's Locket of Power", house: "Slytherin" }
    ]
  }
];

let currentQuestionIndex = 0;

// FUNCTION: Displays current question and choices on screen
function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  
  questionNumberEl.textContent = "Question " + (currentQuestionIndex + 1) + " of 10";
  questionTextEl.textContent = currentQuestion.text;
  choicesContainerEl.innerHTML = "";
  
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choice = currentQuestion.choices[i];
    let btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.classList.add("choice-btn");
    
    btn.addEventListener("click", function() {
      selectAnswer(choice.house);
    });
    
    choicesContainerEl.appendChild(btn);
  }
}

// FUNCTION: Handles selecting an answer, adding a point, and advancing
function selectAnswer(selectedHouse) {
  houseScores[selectedHouse]++;
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// FUNCTION: Calculates winning house and updates the result screen
function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  
  let winningHouse = "Gryffindor";
  let maxScore = -1;
  
  for (let house in houseScores) {
    if (houseScores[house] > maxScore) {
      maxScore = houseScores[house];
      winningHouse = house;
    }
  }
  
  houseResultEl.textContent = winningHouse;
  houseDescriptionEl.textContent = houseDescriptions[winningHouse];

  resultScreen.classList.remove("house-Gryffindor", "house-Ravenclaw", "house-Hufflepuff", "house-Slytherin");
  resultScreen.classList.add("house-" + winningHouse);
}

// EVENT LISTENER: Start button
startBtn.addEventListener("click", function() {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
});

// EVENT LISTENER: Restart button
restartBtn.addEventListener("click", function() {
  currentQuestionIndex = 0;
  houseScores = { Gryffindor: 0, Ravenclaw: 0, Hufflepuff: 0, Slytherin: 0 };
  
  resultScreen.classList.remove("house-Gryffindor", "house-Ravenclaw", "house-Hufflepuff", "house-Slytherin");
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

// EVENT LISTENERS: Instructions Modal
helpBtn.addEventListener("click", function() {
  modalOverlay.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", function() {
  modalOverlay.classList.add("hidden");
});

// EVENT LISTENERS: Feedback Modal
feedbackBtn.addEventListener("click", function() {
  feedbackModalOverlay.classList.remove("hidden");
  feedbackConfirmation.classList.add("hidden");
  feedbackInput.value = "";
});

closeFeedbackBtn.addEventListener("click", function() {
  feedbackModalOverlay.classList.add("hidden");
});

submitFeedbackBtn.addEventListener("click", function() {
  let userFeedback = feedbackInput.value;
  
  if (userFeedback.trim() !== "") {
    feedbackConfirmation.classList.remove("hidden");
    feedbackInput.value = "";
    
    setTimeout(function() {
      feedbackModalOverlay.classList.add("hidden");
    }, 2000);
  } else {
    alert("Please enter a message before sending!");
  }
});