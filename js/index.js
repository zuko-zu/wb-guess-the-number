document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.querySelector('.start-window__start-btn');
  const restartGameBtns = document.querySelectorAll('.restart-btn');
  const guessBtn = document.querySelector('.guess-window__guess-btn');
  const minValueInput = document.querySelector('#minValue');
  const maxValueInput = document.querySelector('#maxValue');
  const guessInput = document.querySelector('#guessNumber');
  const guessWindow = document.querySelector('.guess-window');
  const countElement = document.querySelector('.guess-window__attempt-count');
  
  startGameBtn.addEventListener('click', startGame);
  guessBtn.addEventListener('click', handleGuessBtnClick);
  restartGameBtns.forEach((btn) => {
    btn.addEventListener('click', restartGame);
  });

  let randomInt = null;
  let attempts = 0;
  let inputValue = '';

  function toggleWindows(windowClassName) {
    const windows = document.querySelectorAll('.playground__section');
    windows.forEach(window => {
      window.style.display = window.classList.contains(windowClassName) ? 'block' : 'none';
    });
  }

  function showHint() {
    const guessInputValue = guessInput.value;
    const hint = guessInputValue > randomInt ? "Число больше загаданного!" : "Число меньше загаданного!";
    let hintElement = document.querySelector('.guess-window__hint');
  
    if (!hintElement) {
      hintElement = document.createElement('p');
      hintElement.classList.add('guess-window__hint');
      guessWindow.appendChild(hintElement);
    }
  
    hintElement.innerText = hint;
  
    if (attempts === 3) {
      hintElement = document.createElement('p');
      hintElement.classList.add('guess-window__hint');
      hint = guessInputValue % 2 === 0 ? "Число четное!" : "Число не четное!";
      hintElement.innerText = hint;
      guessWindow.appendChild(hintElement);
    }
  }

  function restartGame() {
    attempts = 0;
    // countElement.innerHTML = "";
    minValueInput.value = 1;
    maxValueInput.value = 1000;
    guessInput.value = '';
    inputValue = ''
    const hints = document.querySelectorAll('.guess-window__hint');
    hints.forEach(hint => hint.remove());
    toggleWindows('start-window');
  }

  function startGame() {
    attempts = 0;
    const minValue = minValueInput.value;
    const maxValue = maxValueInput.value;

    if (!minValue || !maxValue) {
      alert('Поля не должны быть пустыми!');
      return;
    }
    if (minValue < 1 || maxValue > 1000) {
      alert('Допустимы значения только в диапазоне от 1 до 1000');
      return;
    }
    toggleWindows('guess-window');
    randomInt = getRandomInt(minValue, maxValue);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleGuessBtnClick() {
    const guessInputValue = +guessInput.value;
    console.log(maxValueInput.value, minValueInput.value, guessInputValue)

    if (!guessInputValue) {
      alert('Введите число!');
      return;
    }

    if (guessInputValue > maxValueInput.value || guessInputValue < minValueInput.value) {
      alert(`Введите число в диапазоне от ${minValueInput.value} до ${maxValueInput.value}`);
      return;
    }

    if (guessInputValue == randomInt) {
      toggleWindows('finish-window');
    }

    if (guessInputValue == inputValue) return;
    inputValue = guessInputValue;
    attempts++;
    countElement.innerHTML = attempts;
    showHint();
  }
});