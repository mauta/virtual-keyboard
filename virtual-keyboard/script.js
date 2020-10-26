const openBtn = document.querySelector('.open-btn')
const keyboardOutput = document.querySelector('.keyboard-output')
let capslock = false
let shiftOn = false

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
  "shift", "z", "x", "c", "v", "b", "n", "m", {
    top: '<',
    down: ','
  }, {
    top: '>',
    down: '.'
  }, {
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
        keyElement.classList.add("keyboard__key--shift")
      }
      if (elem.down === 'en' || elem.down === 'ru') {
        keyElement.style.paddingLeft = '25px'
        keyElement.classList.add('keyboard__key--lang')
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

    } else {
      switch (elem) {

        case "shift":
          keyElement.classList.add("keyboard__key--double")
          keyElement.classList.add("keyboard__key--shift")
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

drawKeyboard(keysBtnAllRu)


const enterText = () => {
  keyboardOutput.textContent = keyboardOutput.value
  keyboardOutput.focus()
  keyboardOutput.selectionStart = keyboardOutput.value.length;
}


const toggleCapsLock = () => {
  capslock = !capslock;

  for (const key of document.querySelectorAll('.keyboard__key')) {
    if (key.childElementCount === 0 && key.classList.contains('keyboard__key--letter')) {
      key.textContent = capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
    }
  }
}

const toggleShift = () => {
  shiftOn = !shiftOn
  let shiftKeys = keyboard.querySelectorAll('.keyboard__key--shift')
  if (shiftOn) {
    shiftKeys.forEach(elem =>{
      elem.style.boxShadow = '0 0 0 60px rgba(0, 0, 0, .05) inset'
      elem.style.top = '.1em'
      elem.style.left = '.1em'
    })
 
  } else {
    shiftKeys.forEach(elem =>{
      elem.style.boxShadow = '0 0 0 60px rgba(0, 0, 0, 0) inset, .1em .1em .2em gray'
      elem.style.top = '0'
      elem.style.left = '0'
    })
  }

}




const delKeyboard = () => {
  const keyboardForDel = document.querySelectorAll('.keyboard__key')
  const brForDel = document.querySelectorAll('br')
  brForDel.forEach(el => el.remove())
  keyboardForDel.forEach(el => el.remove())
}



const shiftKeyPress = () => {
  let switchKeys = keyboard.querySelectorAll('.keyboard__key--switch')
  switchKeys.forEach(elem => {
    if (elem.lastChild.textContent === 'shift') {
      return
    } else {
      const top = elem.firstChild.textContent
      const down = elem.lastChild.textContent
      elem.firstChild.textContent = down
      elem.lastChild.textContent = top
    }
  })
  toggleCapsLock()

}

keyboard.addEventListener('click', (evt) => {

  if (evt.target.classList.contains('keyboard__key--switch') || evt.target.parentNode.classList.contains('keyboard__key--switch')) {
    if (evt.target.classList.contains('keyboard__key--double') || evt.target.parentNode.classList.contains('keyboard__key--double')) {
      return
    }
    if (evt.target.classList.contains('keyboard__key--lang') || evt.target.parentNode.classList.contains('keyboard__key--lang')) {
      return
    }
    if (evt.target.classList.contains('keyboard__key-top')) {
      keyboardOutput.value += evt.target.nextSibling.textContent
    } else if (evt.target.classList.contains('keyboard__key--switch')) {
      keyboardOutput.value += evt.target.lastChild.textContent
    } else {
      keyboardOutput.value += evt.target.textContent
    }
    enterText()

  } else if (evt.target.classList.contains('keyboard__key')) {
    let key = evt.target.textContent
    console.log('и тут я' + evt.target)
    switch (key) {
      case "shift":
        shiftKeyPress()
        toggleShift()
        break;
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