/*const gameArea = document.querySelector(".gameArea"); // Creamos el contenedor del area del juego
const btn = document.createElement("button"); // Creamos el boton de inicio del juego
const output = document.createElement("div"); // Creamos el contenedor de las palabras
const inWord = document.createElement("input"); // Creamos el input para ingresar la palabra
const scoreBoard = document.createElement("div"); // Creamos el contenedor del puntaje
scoreBoard.textContent = "Puntaje: 0"; // Texto del puntaje
scoreBoard.style.fontSize = "2em"; // Tamaño de la fuente
scoreBoard.style.color = "#4C048C"; // Color del texto
scoreBoard.style.backgroundColor = "#FFD700"; // Color de fondo
inWord.setAttribute("type", "text"); // Tipo de input
inWord.classList.add("myInput"); // Clase de bootstrap
output.style.textAlign = "center"; // Alineamos el texto al centro
output.style.marginBottom = "10px"; // Margen inferior
btn.textContent = "Iniciar Juego"; // Texto del boton
output.textContent = "Clic en el boton"; // Texto del contenedor de las palabras
console.log(btn);

// Agregar a la pagina del HTML
gameArea.appendChild(scoreBoard);
gameArea.appendChild(output);
gameArea.appendChild(btn);
gameArea.appendChild(inWord);
//gameArea.appendChild(btn);

// Elementos ocultos
inWord.style.display = "none";
scoreBoard.style.display = "none";

// Valores iniciales del juego
const myWords = ["cocodrilo", "gato", "raton"];
const game = {
  sel: "",
  scramble: "",
  correct: 0,
  incorrect: 0,
  wordsLeft: 0,
  played: myWords.length,
};

// evento click del boton
btn.addEventListener("click", function (e) {
  gameArea.appendChild(btn);
  btn.style.display = "none"; // Ocultamos el boton
  inWord.style.display = "inline"; // Mostramos el input
  scoreBoard.style.display = "block"; // Mostramos el puntaje
  myWords.sort(() => {
    return 0.5 - Math.random();
  }); // Ordenamos las palabras de forma aleatoria
  game.sel = myWords[0]; // Seleccionamos la primera palabra
  game.scramble = sorter(game.sel); // Llamamos a la funcion sorter
  output.style.fontSize = "3em"; // Tamaño de la fuente
  inWord.setAttribute("maxlength", game.sel.length); // Maximo de caracteres del input
  inWord.focus(); // Enfocamos el input
  output.textContent = game.scramble; // Mostramos la palabra ordenada
  console.log(game.sel, game.scramble);

  if (myWords.length === 0) {
    // Fin del juego
    gameArea.innerHTML = `<h2>Fin del juego</h2>`;
    const resultMessage = document.createElement("div");
    resultMessage.innerHTML = `Correctas: <b>${game.correct}</b> VS incorrectas: <b>${game.incorrect}</b> <small>de ${game.played} palabras jugadas</small>`;
    gameArea.appendChild(resultMessage);

    // Ocultamos elementos
    inWord.disabled = true;
    btn.style.display = "none";
    inWord.style.display = "none";
    scoreBoard.style.display = "none";
  } else {
    // Si hay palabras restantes, continuamos el juego
    inWord.disabled = false; // Habilitamos el input
    btn.style.display = "none"; // Ocultamos el boton
    inWord.style.display = "inline"; // Mostramos el input
    scoreBoard.style.display = "block"; // Mostramos el puntaje

    myWords.sort(() => {
      return 0.5 - Math.random();
    }); // Ordenamos las palabras de forma aleatoria
    game.sel = myWords.shift(); // Seleccionamos la primera palabra
    game.wordsLeft = myWords.length; // Cantidad de palabras restantes
    game.scramble = sorter(game.sel); // Llamamos a la funcion sorter
    addScore(); // Llamamos a la funcion addScore
    output.style.fontSize = "3em"; // Tamaño de la fuente
    inWord.setAttribute("maxlength", game.sel.length); // Maximo de caracteres del input
    inWord.focus(); // Enfocamos el input
    output.textContent = game.scramble; // Mostramos la palabra ordenada
  }
});

// Cuando presionamos "Enter" o alcanzamos el largo de la palabra
inWord.addEventListener("keypress", (e) => {
  console.log(e);
  inWord.style.borderColor = "#4C048C";
  inWord.style.borderWidth = "1px";
  if (inWord.value.length === game.sel.length || e.code === "Enter") {
    console.log("verificando....");
    winChecker();
  }
});

function addScore() {
  let tempOutput = `Correctas: <b>${game.correct}</b> VS incorrectas: <b>${game.incorrect}</b>`;
  tempOutput += ` <small>Palabras restantes: ${game.wordsLeft}</small>`;
  scoreBoard.innerHTML = tempOutput;
}

function winChecker() {
  inWord.style.borderWidth = "5px";
  if (inWord.value === game.sel) {
    console.log("Ganaste");
    inWord.style.borderColor = "green";
    game.correct++;
    addScore();
    inWord.disabled = true;
    btn.style.display = "inline";
    btn.textContent = "Siguiente Palabra";
    inWord.value = "";
  } else {
    inWord.style.borderColor = "red";
    console.log("Perdiste");
    inWord.value = "";
    inWord.focus();
    game.incorrect++;
    addScore();
  }
}

function sorter(word) {
  let temp = word.split(""); // Separamos la palabra en letras
  temp.sort(() => {
    return 0.5 - Math.random();
  }); // Ordenamos las letras de forma aleatoria
  temp = temp.join(""); // Unimos las letras
  console.log(temp); // Mostramos la palabra en consola
  if (word === temp) {
    console.log(word, temp);
    return sorter(word); // Si la palabra es igual a la palabra ordenada, llamamos a la funcion sorter
  }
  return temp; // Retornamos la palabra ordenada
}
*/

//CODIGO MAS COMPLETO PERO SIN CLASES
/*const gameArea = document.querySelector(".gameArea");
const btn = document.createElement("button");
const output = document.createElement("div");
const inWord = document.createElement("input");
const scoreBoard = document.createElement("div");

scoreBoard.textContent = "Puntaje: 0";
scoreBoard.style.fontSize = "2em";
scoreBoard.style.color = "#4C048C";
scoreBoard.style.backgroundColor = "#FFD700";
inWord.setAttribute("type", "text");
inWord.classList.add("myInput");
output.style.textAlign = "center";
output.style.marginBottom = "10px";
btn.textContent = "Iniciar Juego";
output.textContent = "CLICK PARA INICIAR JUEGO";
output.style.fontSize = "2em";

gameArea.appendChild(scoreBoard);
gameArea.appendChild(output);
gameArea.appendChild(btn);
gameArea.appendChild(inWord);

inWord.style.display = "none";
scoreBoard.style.display = "none";

const myWords = ["cocodrilo", "gato", "raton"];
const game = {
  sel: "",
  scramble: "",
  correct: 0,
  incorrect: 0,
  wordsLeft: 0,
  played: myWords.length,
};

btn.addEventListener("click", startGame);
inWord.addEventListener("keypress", (e) => {
  if (inWord.value.length === game.sel.length || e.code === "Enter") {
    winChecker();
  }
});

function startGame() {
  if (myWords.length === 0) {
    endGame();
    return;
  }

  btn.style.display = "none";
  inWord.style.display = "inline";
  scoreBoard.style.display = "block";

  game.sel = myWords.shift();
  game.wordsLeft = myWords.length;
  game.scramble = sorter(game.sel);

  output.style.fontSize = "3em";
  inWord.setAttribute("maxlength", game.sel.length);
  inWord.value = ""; // Limpiar el input
  inWord.disabled = false; // Habilitar el input
  inWord.style.borderColor = "gray"; // Restablecer el color del borde a gris
  output.style.color = "black"; // Restablecer el color del texto a negro
  inWord.focus();
  output.textContent = game.scramble;

  addScore();
}

function endGame() {
  gameArea.innerHTML = `<h2>Fin del juego</h2>`;
  const resultMessage = document.createElement("div");
  if (game.correct === game.played) {
    resultMessage.innerHTML = `<h3>¡Ganaste!</h3> Correctas: <b>${game.correct}</b> VS incorrectas: <b>${game.incorrect}</b> <small>de ${game.played} palabras jugadas</small>`;
  } else {
    resultMessage.innerHTML = `<h3>¡Perdiste!</h3> Correctas: <b>${game.correct}</b> VS incorrectas: <b>${game.incorrect}</b> <small>de ${game.played} palabras jugadas</small>`;
  }
  gameArea.appendChild(resultMessage);

  inWord.disabled = true;
  btn.style.display = "none";
  inWord.style.display = "none";
  scoreBoard.style.display = "none";
}

function addScore() {
  let tempOutput = `Correctas: <b>${game.correct}</b> VS incorrectas: <b>${game.incorrect}</b>`;
  tempOutput += ` <small>Palabras restantes: ${game.wordsLeft}</small>`;
  scoreBoard.innerHTML = tempOutput;
}

function winChecker() {
  inWord.style.borderWidth = "5px";
  if (inWord.value === game.sel) {
    output.textContent = "¡Adivinaste la palabra!";
    output.style.color = "green"; // Cambiar el color del texto a verde
    game.correct++;
    inWord.disabled = true;
    inWord.style.display = "none"; // Ocultar el input
    btn.style.display = "inline";
    btn.textContent = "Siguiente Palabra";
    btn.removeEventListener("click", startGame); // Evitar múltiples eventos
    btn.addEventListener("click", startGame);
    if (game.correct + game.incorrect === game.played) {
      endGame();
    }
  } else {
    output.textContent = "Incorrecto";
    output.style.color = "red"; // Cambiar el color del texto a rojo
    game.incorrect++;
    inWord.value = "";
    inWord.disabled = true; // Deshabilitar el input temporalmente
    setTimeout(() => {
      inWord.disabled = false; // Habilitar el input
      inWord.style.borderColor = "gray"; // Restablecer el color del borde a gris
      startGame(); // Cambiar a la siguiente palabra después de 1 segundo
    }, 700);
  }
  addScore();
}

function sorter(word) {
  let temp = word.split("");
  temp.sort(() => 0.5 - Math.random());
  temp = temp.join("");
  if (word === temp) {
    return sorter(word);
  }
  return temp;
}*/