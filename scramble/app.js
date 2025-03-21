// Clase Game: Lógica del juego
class Game {
  constructor(words) {
    this.words = words;
    this.sel = "";
    this.scramble = "";
    this.correct = 0;
    this.incorrect = 0;
    this.wordsLeft = 0;
    this.played = words.length;
  }

  start() {
    if (this.words.length === 0) {
      return this.end();
    }

    this.sel = this.words.shift();
    this.wordsLeft = this.words.length;
    this.scramble = this.sorter(this.sel);
  }

  winChecker(input) {
    if (input === this.sel) {
      this.correct++;
      return true;
    } else {
      this.incorrect++;
      return false;
    }
  }

  sorter(word) {
    let temp = word.split("");
    temp.sort(() => 0.5 - Math.random());
    temp = temp.join("");
    if (word === temp) {
      return this.sorter(word);
    }
    return temp;
  }

  addScore() {
    return `Correctas: <b>${this.correct}</b> VS incorrectas: <b>${this.incorrect}</b> <small>Palabras restantes: ${this.wordsLeft}</small>`;
  }

  end() {
    return {
      correct: this.correct,
      incorrect: this.incorrect,
      played: this.played
    };
  }
}

// Clase UI: Interacción con el DOM
class UI {
  constructor(gameArea) {
    this.gameArea = gameArea;
    this.game = null;

    this.btn = document.createElement("button");
    this.output = document.createElement("div");
    this.inWord = document.createElement("input");
    this.scoreBoard = document.createElement("div");

    this.initializeUI();
  }

  initializeUI() {
    this.scoreBoard.textContent = "Puntaje: 0";
    this.scoreBoard.style.fontSize = "2em";
    this.scoreBoard.style.color = "#4C048C";
    this.scoreBoard.style.backgroundColor = "#FFD700";
    
    this.inWord.setAttribute("type", "text");
    this.inWord.classList.add("myInput");
    
    this.output.style.textAlign = "center";
    this.output.style.marginBottom = "10px";
    
    this.btn.textContent = "Iniciar Juego";
    this.output.textContent = "CLICK PARA INICIAR JUEGO";
    this.output.style.fontSize = "2em";
    
    this.gameArea.appendChild(this.scoreBoard);
    this.gameArea.appendChild(this.output);
    this.gameArea.appendChild(this.btn);
    this.gameArea.appendChild(this.inWord);

    this.inWord.style.display = "none";
    this.scoreBoard.style.display = "none";
    
    this.btn.addEventListener("click", () => this.startGame());
    this.inWord.addEventListener("keypress", (e) => {
      if (this.inWord.value.length === this.game.sel.length || e.code === "Enter") {
        this.winChecker();
      }
    });
  }

  startGame() {
    if (!this.game) return;

    if (this.game.words.length === 0) {
      this.endGame();
      return;
    }

    this.game.start();

    this.btn.style.display = "none";
    this.inWord.style.display = "inline";
    this.scoreBoard.style.display = "block";

    this.inWord.setAttribute("maxlength", this.game.sel.length);
    this.inWord.value = ""; 
    this.inWord.disabled = false;
    this.inWord.style.borderColor = "gray";
    this.output.style.color = "black";
    this.inWord.focus();
    this.output.textContent = this.game.scramble;

    this.updateScore();
  }

  winChecker() {
    this.inWord.style.borderWidth = "5px";
    if (this.game.winChecker(this.inWord.value)) {
      this.output.textContent = "¡Adivinaste la palabra!";
      this.output.style.color = "green";
      this.inWord.disabled = true;
      this.inWord.style.display = "none";
      this.btn.style.display = "inline";
      this.btn.textContent = "Siguiente Palabra";
    } else {
      this.output.textContent = "Incorrecto";
      this.output.style.color = "red";
      this.inWord.value = "";
      this.inWord.disabled = true;
      setTimeout(() => {
        this.inWord.disabled = false;
        this.inWord.style.borderColor = "gray";
        this.startGame();
      }, 700);
    }

    this.updateScore();

    if (this.game.correct + this.game.incorrect === this.game.played) {
      this.endGame();
    }
  }

  updateScore() {
    this.scoreBoard.innerHTML = this.game.addScore();
  }

  endGame() {
    const result = this.game.end();
    this.gameArea.innerHTML = `<h2>Fin del juego</h2>`;
    const resultMessage = document.createElement("div");

    if (result.correct === result.played) {
      resultMessage.innerHTML = `<h3>¡Ganaste!</h3> Correctas: <b>${result.correct}</b> VS incorrectas: <b>${result.incorrect}</b> <small>de ${result.played} palabras jugadas</small>`;
    } else {
      resultMessage.innerHTML = `<h3>¡Perdiste!</h3> Correctas: <b>${result.correct}</b> VS incorrectas: <b>${result.incorrect}</b> <small>de ${result.played} palabras jugadas</small>`;
    }

    this.gameArea.appendChild(resultMessage);

    this.inWord.disabled = true;
    this.btn.style.display = "none";
    this.inWord.style.display = "none";
    this.scoreBoard.style.display = "none";
  }
}

// Inicialización del juego
const gameArea = document.querySelector(".gameArea");
const myWords = ["cocodrilo", "gato", "raton"];
const game = new Game(myWords);  
const ui = new UI(gameArea);     
ui.game = game;                  
