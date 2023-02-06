const sliderValue = document.getElementById("slider_value");
const slider = document.getElementById("slider");
const rangeInputs = document.querySelectorAll('input[type="range"]');
const barOne = document.getElementById("bar_1");
const barTwo = document.getElementById("bar_2");
const barThree = document.getElementById("bar_3");
const barFour = document.getElementById("bar_4");
const levelTxt = document.getElementById("level_text");

/* slider */
sliderValue.innerHTML = slider.value;
barOne.classList.add("medium");
barTwo.classList.add("medium");
barThree.classList.add("medium");

slider.oninput = function () {
  sliderValue.innerHTML = this.value;

  /* Strength */


  if (slider.value < 7) {
    levelTxt.innerHTML = "too weak!";
    barOne.classList.remove("tooWeak", "weak", "medium", "strong");
    barTwo.classList.remove("tooWeak", "weak", "medium", "strong");
    barThree.classList.remove("tooWeak", "weak", "medium", "strong");
    barFour.classList.remove("tooWeak", "weak", "medium", "strong");
    barOne.classList.remove("weak");
    barOne.classList.add("tooWeak");
  }

  if (slider.value < 9 && slider.value >= 7) {
    levelTxt.innerHTML = "weak";
    barOne.classList.remove("tooWeak", "weak", "medium", "strong");
    barTwo.classList.remove("tooWeak", "weak", "medium", "strong");
    barThree.classList.remove("tooWeak", "weak", "medium", "strong");
    barFour.classList.remove("tooWeak", "weak", "medium", "strong");
    barOne.classList.add("weak");
    barTwo.classList.add("weak");
  }

  if (slider.value < 11 && slider.value >= 9) {
    levelTxt.innerHTML = "medium";
    barOne.classList.remove("tooWeak", "weak", "medium", "strong");
    barTwo.classList.remove("tooWeak", "weak", "medium", "strong");
    barThree.classList.remove("tooWeak", "weak", "medium", "strong");
    barFour.classList.remove("tooWeak", "weak", "medium", "strong");
    barOne.classList.add("medium");
    barTwo.classList.add("medium");
    barThree.classList.add("medium");
  }

  if (slider.value >= 11) {
    levelTxt.innerHTML = "strong";
    barOne.classList.remove("tooWeak", "weak", "medium", "strong");
    barTwo.classList.remove("tooWeak", "weak", "medium", "strong");
    barThree.classList.remove("tooWeak", "weak", "medium", "strong");
    barFour.classList.remove("tooWeak", "weak", "medium", "strong");
    barOne.classList.add("strong");
    barTwo.classList.add("strong");
    barThree.classList.add("strong");
    barFour.classList.add("strong");
  }
};

function handleInputChange(e) {
  let target = e.target;

  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

/*    Copy to clipboard */
const copyIcon = document.getElementById("copy_icon");
const copyMsg = document.getElementById("copy_message");

copyIcon.addEventListener("click", copyField);

function copyField() {
  let copyText = document.getElementById("field_text").innerHTML;
  navigator.clipboard.writeText(copyText);
  copyMsg.style.display = "initial";
  setTimeout(function () {
    copyMsg.style.display = "none";
  }, 1500);
}

/* Generate button */
const generateBtn = document.getElementById("generate_btn");
generateBtn.addEventListener("click", generate);
const fieldText = document.getElementById("field_text");

function generate(length) {
  const uppercase = document.getElementById("inclUppercase");
  const lowercase = document.getElementById("inclLowercase");
  const numbers = document.getElementById("inclNumber");
  const symbols = document.getElementById("inclSymbol");
  const alert = document.getElementById("alert");

  if (
    uppercase.checked === false &&
    lowercase.checked === false &&
    numbers.checked === false &&
    symbols.checked === false
  ) {
    alert.style.display = "block";
  } else {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbersChars = "0123456789";
    const symbolsChars = "@#&(§!-)^$*%+=/?";

    let chars = "";
    let length = slider.value;

    if (uppercase.checked === true) {
      chars += uppercaseChars;
    }
    if (lowercase.checked === true) {
      chars += lowercaseChars;
    }
    if (numbers.checked === true) {
      chars += numbersChars;
    }
    if (symbols.checked === true) {
      chars += symbolsChars;
    }

    let password = "";
    let passwordLength = length;
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < passwordLength; i++) {
      password += chars[array[i] % chars.length]; 
    }

    fieldText.innerHTML = password;
    fieldText.style.color = "hsl( let(--clr-almostWhite) )";
    copyMsg.style.display = "none";
    alert.style.display = "none";

    return password;
  }
}
