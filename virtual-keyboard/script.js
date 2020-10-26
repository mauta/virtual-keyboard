const openBtn = document.querySelector('.open-btn')
const keyboardOutput = document.querySelector('.keyboard-output')

openBtn.addEventListener('click', function () {

  if (keyboard.classList.contains('keyboard__hidden')) {
    keyboard.classList.toggle('keyboard__hidden')
    openBtn.textContent = 'close me'
    keyboardOutput.focus()
  } else {
    keyboard.classList.toggle('keyboard__hidden')
    openBtn.textContent = 'open me'
  }

})


let keyboard = document.createElement('div')
keyboard.classList.add('keyboard', 'keyboard__hidden')
document.body.append(keyboard)

let keyboardKeys = document.createElement('div')
keyboardKeys.className = 'keyboard__keys'
keyboard.appendChild(keyboardKeys)





const keysBtnAllEng = [{
    top: "~",
    down: "`"
  }, {
    top: "!",
    down: "1"
  }, {
    top: "@",
    down: "2"
  }, {
    top: "#",
    down: "3"
  }, {
    top: "$",
    down: "4"
  }, {
    top: "%",
    down: "5"
  }, {
    top: "^",
    down: "6"
  }, {
    top: "&",
    down: "7"
  }, {
    top: "*",
    down: "8"
  }, {
    top: "(",
    down: "9"
  }, {
    top: ")",
    down: "0"
  }, {
    top: "_",
    down: "-"
  }, {
    top: "+",
    down: "="
  }, "backspace",
  "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", {
    top: "{",
    down: "["
  }, {
    top: "}",
    down: "]"
  }, {
    top: "|",
    down: "'\'"
  },
  "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", {
    top: ":",
    down: ";"
  }, {
    top: '"',
    down: '\''
  }, "enter",
  "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", {
    top: "?",
    down: "/"
  }, {
    top: "",
    down: "shift"
  },
  {
    top: "ru",
    down: "en"
  }, "sound", "voice", "space", "back", "next"
]

const keysBtnAllRu = [
  "ё", {
    top: "!",
    down: "1"
  }, {
    top: '"',
    down: "2"
  }, {
    top: "№",
    down: "3"
  }, {
    top: ";",
    down: "4"
  }, {
    top: "%",
    down: "5"
  }, {
    top: ":",
    down: "6"
  }, {
    top: "?",
    down: "7"
  }, {
    top: "*",
    down: "8"
  }, {
    top: "(",
    down: "9"
  }, {
    top: ")",
    down: "0"
  }, {
    top: "_",
    down: "-"
  }, {
    top: "+",
    down: "="
  }, "backspace",
  "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/",
  "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
  "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", {
    top: ",",
    down: "."
  }, {
    top: "",
    down: "shift"
  },
  {
    top: "en",
    down: "ru"
  }, "sound", "voice", "space", "back", "next"
]

let capslock = false

const toggleCapsLock = () => {
  capslock = !capslock;

  for (const key of document.querySelectorAll('.keyboard__key')) {
    if (key.childElementCount === 0 && key.classList.contains('keyboard__key--letter')) {
      key.textContent = capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
    }
  }
}

const delKeyboard = () => {
  const keyboardForDel = document.querySelectorAll('.keyboard__key')
  const brForDel = document.querySelectorAll('br')
  brForDel.forEach(el => el.remove())
  keyboardForDel.forEach(el => el.remove())
}



const drawKeyboard = (keys) => {
  keys.forEach(elem => {
    const keyElement = document.createElement("button")
    const insertLineBreak = ["backspace", "enter", "/"].indexOf(elem) !== -1 || elem.top === "|" || elem.down === "shift"
    keyElement.classList.add("keyboard__key")
    keyElement.setAttribute("type", "button")

    if (typeof elem === 'object') {
      keyElement.classList.add('keyboard__key--switch')
      const topSymbol = document.createElement('div')
      topSymbol.classList.add('keyboard__key-top')
      topSymbol.textContent = elem.top
      const downSymbol = document.createElement('div')
      downSymbol.classList.add('keyboard__key-down')
      downSymbol.textContent = elem.down
      keyElement.append(topSymbol)
      keyElement.append(downSymbol)
      if (elem.down === 'shift') {
        keyElement.classList.add("keyboard__key--double")
      }
      if (elem.down === 'en' || elem.down === 'ru') {
        keyElement.style.paddingLeft = '25px'

        keyElement.addEventListener('click', () => {
          if (elem.top === 'en') {
            delKeyboard()
            drawKeyboard(keysBtnAllEng)
          } else {
            delKeyboard()
            drawKeyboard(keysBtnAllRu)
          }
        })
      }

      if (elem.top === '№') {
        keyElement.firstChild.style.left = '3px'
        keyElement.firstChild.style.top = '0px'
      }

      keyElement.addEventListener('click', () => {
        if (elem.down !== 'en' && elem.down !== 'ru')
          keyboardOutput.textContent += elem.down
      })

    } else {
      switch (elem) {

        case "shift":
          keyElement.classList.add("keyboard__key--double")
          keyElement.textContent = elem
          break;

        case "backspace":
          keyElement.classList.add("keyboard__key--double")
          keyElement.textContent = elem
          break;

        case "space":
          keyElement.classList.add("keyboard__key--space")
          keyElement.textContent = elem
          break;

        case "caps":
          keyElement.classList.add('keyboard__key--double', 'keyboard__key--activable')
          keyElement.textContent = elem
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--double")
          keyElement.textContent = elem
          // отрисовка кнопки
          break;
        case "tab":
          keyElement.classList.add("keyboard__key--double")
          keyElement.textContent = elem
          break;
        case "sound":
          keyElement.textContent = elem
          // отрисовка кнопки
          break;
        case "voice":
          keyElement.textContent = elem
          // отрисовка кнопки
          break;
        case "back":
          keyElement.textContent = elem
          // отрисовка кнопки
          break;
        case "next":
          keyElement.textContent = elem
          // отрисовка кнопки
          break;
        default:
          capslock ? keyElement.textContent = elem.toUpperCase() : keyElement.textContent = elem.toLowerCase()
          keyElement.classList.add('keyboard__key--letter')
          break;
      }
    }



    keyboardKeys.appendChild(keyElement)

    if (insertLineBreak) {
      keyboardKeys.appendChild(document.createElement("br"))
    }
  })

}

var userLang = navigator.language || navigator.userLanguage;

console.log(userLang)

drawKeyboard(keysBtnAllRu)


const enterText = () => {
  keyboardOutput.textContent = keyboardOutput.value
  keyboardOutput.focus()
  keyboardOutput.selectionStart = keyboardOutput.value.length;
}

keyboard.addEventListener('click', (evt) => {
  console.log('я тут')
  if (evt.target.classList.contains('keyboard__key')) {
    let key = evt.target.textContent

    switch (key) {
      case "backspace":
        keyboardOutput.value = keyboardOutput.value.slice(0, keyboardOutput.value.length - 1)
        enterText()
        break;
      case "space":
        keyboardOutput.value += ' '
        enterText()
        break;
      case "caps":
        evt.target.classList.toggle('keyboard__key--active')
        toggleCapsLock()
        break;
      case "enter":
        keyboardOutput.value += '\n'
        enterText()
        break;
      case "tab":
        keyboardOutput.value += '    '
        enterText()
        break;
      default:
        keyboardOutput.value += key
        enterText()
        break;
    }


  }






})