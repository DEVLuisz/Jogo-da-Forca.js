const word = document.querySelector(".word");
const wrongLettersBox = document.querySelector(".wrong-letters");
const playButton = document.querySelector("button");
const popup = document.querySelector(".popup");
const notification = document.querySelector(".notification");
const message = document.querySelector(".message");
const revealWord = document.querySelector(".reveal-word");

const parts = document.querySelectorAll(".part");

const words = [
  "javascript", "farmacologia", "frontend", 
"backend", "fullstack", "typescript", "react",
"desenvolvimento","tecnologia","angular",
"svelte","vuejs","postgres","elixir","python",
"javascript", "fortnite", "sinuca","razer",
"alienware","logitech","estetica","cosmetica",
"linux","hackintosh","macintosh","goku","gon",
"guitarra","microagulhamento","xiaomi","huawei",
"apple","gamamay","hyperx","husky","uno","lua"
];

let selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  word.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ""}
                    </span>
                `
          )
          .join("")}`;
  const innerWord = word.textContent.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    message.textContent = "Você Ganhou!";
    revealWord.textContent = "";
    popup.style.display = "flex";

    playable = false;
  }
}

function updateWrongLettersBox() {
  wrongLettersBox.innerHTML = `
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  parts.forEach((part, index) => {
    const errors = wrongLetters.length;

    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });

  if (wrongLetters.length === parts.length) {
    message.textContent = "Você Perdeu!";
    revealWord.textContent = `Palavra Correta: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");

  const timer = setTimeout(() => {
    notification.classList.remove("show");
    clearTimeout(timer);
  }, 2000);
}

document.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toUpperCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersBox();
        } else {
          showNotification();
        }
      }
    }
  }
});

playButton.addEventListener("click", () => {
  playable = true;

  correctLetters.length = 0;
  wrongLetters.length = 0;

  selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

  displayWord();

  updateWrongLettersBox();

  popup.style.display = "none";
});

displayWord();