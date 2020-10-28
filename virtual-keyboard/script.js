const openBtn = document.querySelector('.open-btn')
const keyboardOutput = document.querySelector('.keyboard-output')
let capslock = false
let shiftOn = false
let soundOn = true
let language = 'eng'
let audio

openBtn.addEventListener('click', function () {

  if (keyboard.classList.contains('keyboard__hidden')) {
    keyboard.classList.toggle('keyboard__hidden')
    openBtn.textContent = 'close me'
    openBtn.setAttribute('data-open', 'close')
    keyboardOutput.focus()
    if (soundOn) {
      const audio = document.querySelector(`audio[data-open = 'open']`)
      audio.play()
    }
  } else {
    keyboard.classList.toggle('keyboard__hidden')
    openBtn.setAttribute('data-open', 'open')
    openBtn.textContent = 'open me'
    if (soundOn) {
      const audio = document.querySelector(`audio[data-open = 'close']`)
      audio.play()
    }
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

const keysCode = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7",
  "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT",
  "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "CapsLock", "KeyA", "KeyS",
  "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "KeyZ",
  "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight", "", "", "", "Space", "ArrowLeft", "ArrowRight"
]

const likeLetters = ["Backquote", "Minus", "Equal", "BracketLeft", "BracketRight", "Backslash", "Semicolon", "Quote", "Comma", "Period", "Slash"]

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
        keyElement.classList.add('keyboard__key--lang')
        keyElement.setAttribute('data-key', 'lang')
        keyElement.addEventListener('click', () => {
          if (soundOn) {
            const audio = document.querySelector(`audio[data-key = 'lang']`)
            audio.play()
          }
          if (elem.top === 'en') {
            language = "eng"
            delKeyboard()
            drawKeyboard(keysBtnAllEng)
          } else {
            language = "rus"
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
          keyElement.classList.add("keyboard__key--backspace")
          keyElement.textContent = elem
          break;

        case "space":
          keyElement.classList.add("keyboard__key--space")
          keyElement.textContent = elem
          break;

        case "caps":
          keyElement.classList.add('keyboard__key--double', 'keyboard__key--activable', 'keyboard__key--caps')
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
          keyElement.classList.add("keyboard__key--sound-on")
          break;
        case "voice":
          keyElement.textContent = elem
          keyElement.classList.add("keyboard__key--voice-off")
          break;
        case "back":
          keyElement.textContent = elem
          keyElement.classList.add("keyboard__key--back")
          break;
        case "next":
          keyElement.textContent = elem
          keyElement.classList.add("keyboard__key--next")
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

  const Allkeys = keyboard.querySelectorAll('.keyboard__key')

  for (let i = 0; i < Allkeys.length; i++) {
    Allkeys[i].setAttribute('data-code', keysCode[i])
  }

}

drawKeyboard(keysBtnAllEng)


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
    shiftKeys.forEach(elem => {
      btnPressON(elem)
    })
  } else {
    shiftKeys.forEach(elem => {
      btnPressOFF(elem)
    })
  }
}



const btnPressON = (btn) => {
  btn.style.boxShadow = '0 0 0 60px rgba(0, 0, 0, .05) inset'
  btn.style.top = '.1em'
  btn.style.left = '.1em'
}

const btnPressOFF = (btn) => {
  btn.style.boxShadow = ''
  btn.style.top = ''
  btn.style.left = ''
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
    if (elem.lastChild.textContent === 'shift' || elem.lastChild.textContent === 'en' || elem.lastChild.textContent === 'ru') {
      return
    } else {
      const top = elem.firstChild.textContent
      const down = elem.lastChild.textContent
      elem.firstChild.textContent = down
      elem.lastChild.textContent = top
    }
  })
  toggleCapsLock()
  enterText()
}

const keyClick = (evt) = {

}

keyboard.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('keyboard__key--switch') || evt.target.parentNode.classList.contains('keyboard__key--switch')) {
    if (evt.target.classList.contains('keyboard__key--double') || evt.target.parentNode.classList.contains('keyboard__key--double')) {
      if (soundOn) {
        audio = document.querySelector('audio[data-code = "Shift"]')
        audio.currentTime = 0
        audio.play()
      }
      shiftKeyPress()
      toggleShift()
    }
    if (evt.target.classList.contains('keyboard__key--lang') || evt.target.parentNode.classList.contains('keyboard__key--lang')) {
      return
    }

    let btnPress


    if (evt.target.classList.contains('keyboard__key-top') || evt.target.classList.contains('keyboard__key-down')) {
      btnPress = evt.target.parentNode
    } else if (evt.target.classList.contains('keyboard__key--switch')) {
      btnPress = evt.target
    }
    if (soundOn) {
      let digit = btnPress.getAttribute('data-code')
      if (likeLetters.includes(digit)) {
        (language === 'rus') ? audio = document.querySelector("audio[data-code = 'letter']"): audio = document.querySelector("audio[data-code = 'english']")
        audio.currentTime = 0
        audio.play()
      } else {
        const audio = document.querySelector(`audio[data-code = "${digit}"]`)
        audio.currentTime = 0
        audio.play()
      }

    }
    keyboardOutput.value += btnPress.lastChild.textContent
    enterText()

  } else if (evt.target.classList.contains('keyboard__key')) {
    let key = evt.target.textContent
    switch (key) {
      case "sound":
        soundOn = !soundOn
        evt.target.classList.toggle('keyboard__key--sound-on')
        evt.target.classList.toggle('keyboard__key--sound-off')
        break;
        case "voice":
          evt.target.classList.toggle('keyboard__key--voice-on')
          evt.target.classList.toggle('keyboard__key--voice-off')
          break;
      case "shift":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'Shift']")
          audio.currentTime = 0
          audio.play()
        }
        shiftKeyPress()
        toggleShift()
        break;
      case "backspace":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'BackSpace']")
          audio.currentTime = 0
          audio.play()
        }
        keyboardOutput.value = keyboardOutput.value.slice(0, keyboardOutput.value.length - 1)
        enterText()
        break;
      case "space":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'Space']")
          audio.currentTime = 0
          audio.play()
        }
        keyboardOutput.value += ' '
        enterText()
        break;
      case "caps":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'CapsLock']")
          audio.currentTime = 0
          audio.play()
        }
        evt.target.classList.toggle('keyboard__key--active')
        toggleCapsLock()
        enterText()
        break;
      case "enter":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'Enter']")
          audio.currentTime = 0
          audio.play()
        }
        keyboardOutput.value += '\n'
        enterText()
        break;
      case "tab":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'CapsLock']")
          audio.currentTime = 0
          audio.play()
        }
        keyboardOutput.value += '    '
        enterText()
        break;
      default:
        if (soundOn) {

          if (language === 'rus') {
            audio = document.querySelector("audio[data-code = 'letter']")
          } else if (language === 'eng') {
            audio = document.querySelector("audio[data-code = 'english']")
          }
          audio.currentTime = 0
          audio.play()
        }
        keyboardOutput.value += key
        enterText()
        break;
    }
  }
})






const keyPress = (btn) => {
  const allKeys = keyboard.querySelectorAll('.keyboard__key')
  allKeys.forEach(elem => {
    if (elem.getAttribute('data-code') === btn.code) {
      btnPressON(elem)

      if (btn.code === 'CapsLock') {
        keyboard.querySelector('.keyboard__key--caps').classList.toggle('keyboard__key--active')
        toggleCapsLock()
      }

      if (btn.code === 'ShiftRight' || btn.code === 'ShiftLeft') {
        shiftKeyPress()
        toggleShift()
      }

    }
  })
}
const keyUnpress = (btn) => {
  const allKeys = keyboard.querySelectorAll('.keyboard__key')
  allKeys.forEach(elem => {
    if (elem.getAttribute('data-code') === btn.code) {
      if (btn.code === 'ShiftRight' || btn.code === 'ShiftLeft') {
        return
      }
      if (btn.code === 'Tab') {
        keyboardOutput.value += '    '
        enterText()
      }
      btnPressOFF(elem)
    }
  })
}

keyboardOutput.addEventListener('keydown', keyPress)

document.addEventListener('keyup', keyUnpress)