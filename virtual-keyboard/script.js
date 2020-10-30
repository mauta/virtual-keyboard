const openBtn = document.querySelector('.open-btn')
const keyboardOutput = document.querySelector('.keyboard-output')
let capslock = false
let shiftOn = false
let soundOn = true
let language = 'eng'
let audio
let cursorPos = 0
let left = ''
let right = ''
let isKeyboardOpen = false
let isVoiceOn = false
let clearAll
let btnBcsp = document.querySelector('.keyboard__key--backspace')

openBtn.addEventListener('click', function () {
  if (!isKeyboardOpen) {
    keyboard.classList.add('keyboard-on')
    keyboard.classList.remove('keyboard-off')
    isKeyboardOpen = !isKeyboardOpen
    openBtn.textContent = 'close me'
    openBtn.setAttribute('data-open', 'close')
    keyboardOutput.focus()
    if (soundOn) {
      audio = document.querySelector(`audio[data-open = 'open']`)
      audio.play()
    }
  } else if (isKeyboardOpen) {
    keyboard.classList.add('keyboard-off')
    keyboard.classList.remove('keyboard-on')
    isKeyboardOpen = !isKeyboardOpen
    openBtn.setAttribute('data-open', 'open')
    openBtn.textContent = 'open me'
    if (soundOn) {
      audio = document.querySelector(`audio[data-open = 'close']`)
      audio.play()
    }
  }
})


let keyboard = document.createElement('div')
keyboard.classList.add('keyboard')
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
            audio.currentTime = 0
            audio.play()
          }
          if (elem.top === 'en') {
            language = "eng"
            delKeyboard()
            drawKeyboard(keysBtnAllEng)
            keyboardOutput.focus()
          } else {
            language = "rus"
            delKeyboard()
            drawKeyboard(keysBtnAllRu)
            keyboardOutput.focus()
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
          if (capslock) {
            keyElement.classList.add('keyboard__key--active')
          }
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
          if (soundOn) {
            keyElement.classList.add("keyboard__key--sound-on")
          } else {
            keyElement.classList.add("keyboard__key--sound-off")
          }
          break;
        case "voice":
          keyElement.textContent = elem
          keyElement.classList.add("keyboard__key--voice")
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

  btnBcsp = document.querySelector('.keyboard__key--backspace')
  btnBcsp.addEventListener('mousedown', () => {
    console.log('удалили')
    let mouserun = () => {
      document.removeEventListener('mouseup', mouserun)
      clearTimeout(clearAll)
    }
    let standart = () => {
      clearOutput()
      document.removeEventListener('mouseup', mouserun)
    }
    clearAll = setTimeout(standart, 700)

    document.addEventListener('mouseup', mouserun)
  })
}

drawKeyboard(keysBtnAllEng)


const enterText = () => {
  keyboardOutput.value = left + right
  keyboardOutput.focus()
  keyboardOutput.selectionStart = cursorPos
  keyboardOutput.selectionEnd = cursorPos
}


const toggleCapsLock = () => {
  capslock = !capslock
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



keyboard.addEventListener('click', (evt) => {
  cursorPos = keyboardOutput.selectionStart;
  left = keyboardOutput.value.slice(0, cursorPos);
  right = keyboardOutput.value.slice(cursorPos);

  if (evt.target.classList.contains('keyboard__keys')) {
    enterText()
  }
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

    if (btnPress.classList.contains('keyboard__key--shift')) {
      return
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

    left += btnPress.lastChild.textContent
    cursorPos++
    enterText()

  } else if (evt.target.classList.contains('keyboard__key')) {
    let key = evt.target.textContent

    switch (key) {
      case "next":
        if (soundOn) {
          audio = document.querySelector("audio[data-key = 'arrow']")
          audio.currentTime = 0
          audio.play()
        }
        cursorPos++
        enterText()
        break;
      case "back":
        if (soundOn) {
          audio = document.querySelector("audio[data-key = 'arrow']")
          audio.currentTime = 0
          audio.play()
        }
        cursorPos--
        enterText()
        break;
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

        left = left.slice(0, left.length - 1)
        if (right !== '') {
          cursorPos--
        }

        enterText()

        break;
      case "space":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'Space']")
          audio.currentTime = 0
          audio.play()
        }
        if (keyboardOutput.selectionStart === keyboardOutput.selectionEnd) {
          left += ' '
          cursorPos++
          enterText()
        } else if (keyboardOutput.selectionStart !== keyboardOutput.selectionEnd) {
          keyboardOutput.setRangeText(' ')
          cursorPos++
          keyboardOutput.selectionStart = cursorPos
          keyboardOutput.selectionEnd = cursorPos
          keyboardOutput.focus()
        }
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
        left += '\n'
        cursorPos++
        enterText()
        break;
      case "tab":
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'CapsLock']")
          audio.currentTime = 0
          audio.play()
        }
        left += '    '
        cursorPos += 4
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


        if (keyboardOutput.selectionStart === keyboardOutput.selectionEnd) {
          left += key
          cursorPos++
          enterText()
        } else if (keyboardOutput.selectionStart !== keyboardOutput.selectionEnd) {
          keyboardOutput.setRangeText(key)
          cursorPos++
          keyboardOutput.selectionStart = cursorPos
          keyboardOutput.selectionEnd = cursorPos
          keyboardOutput.focus()
        }

        break;


    }
  }


})


const clearOutput = () => {
  cursorPos = 0
  left = ''
  right = ''
  keyboardOutput.value = ''
  keyboardOutput.textContent = ''
}






const keyPress = (btn) => {
  const allKeys = keyboard.querySelectorAll('.keyboard__key')
  allKeys.forEach(elem => {
    if (elem.getAttribute('data-code') === btn.code) {
      btnPressON(elem)
      let digit = elem.getAttribute('data-code')
      if (digit.slice(0, 5) === 'Digit') {
        const audio = document.querySelector(`audio[data-code = "${digit}"]`)
        audio.currentTime = 0
        audio.play()
      }

      if (digit.slice(0, 3) === 'Key' || likeLetters.includes(digit)) {

        (language === 'rus') ? audio = document.querySelector("audio[data-code = 'letter']"): audio = document.querySelector("audio[data-code = 'english']")
        audio.currentTime = 0
        audio.play()

      }


      if (btn.code === 'CapsLock') {
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'CapsLock']")
          audio.currentTime = 0
          audio.play()
        }
        keyboard.querySelector('.keyboard__key--caps').classList.toggle('keyboard__key--active')
        toggleCapsLock()
      }

      if (btn.code === 'ShiftRight' || btn.code === 'ShiftLeft') {

        if (btn.altKey || btn.ctrlKey) {
          if (soundOn) {
            audio = document.querySelector(`audio[data-key = 'lang']`)
            audio.play()
          }
          if (language === "rus") {
            language = "eng"
            delKeyboard()
            drawKeyboard(keysBtnAllEng)
          } else if (language === "eng") {
            language = "rus"
            delKeyboard()
            drawKeyboard(keysBtnAllRu)
          }
        } else {
          if (soundOn) {
            audio = document.querySelector("audio[data-code = 'Shift']")
            audio.currentTime = 0
            audio.play()
          }
          shiftKeyPress()
          toggleShift()
        }

      }

      if (btn.code === 'Backspace') {
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'BackSpace']")
          audio.currentTime = 0
          audio.play()
        }

        clearAll = setTimeout(clearOutput, 700)
      }

      if (btn.code === 'Enter') {
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'Enter']")
          audio.currentTime = 0
          audio.play()
        }
      }

      if (btn.code === 'Space') {
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'Space']")
          audio.currentTime = 0
          audio.play()
        }
      }

      if (btn.code === 'ArrowLeft' || btn.code === 'ArrowRight') {
        if (soundOn) {
          audio = document.querySelector("audio[data-key = 'arrow']")
          audio.currentTime = 0
          audio.play()
        }
      }
    }
  })

}

const keyUnpress = (btn) => {
  clearTimeout(clearAll)
  const allKeys = keyboard.querySelectorAll('.keyboard__key')
  allKeys.forEach(elem => {
    if (elem.getAttribute('data-code') === btn.code) {
      if (btn.code === 'ShiftRight' || btn.code === 'ShiftLeft') {
        return
      }
      if (btn.code === 'Tab') {
        if (soundOn) {
          audio = document.querySelector("audio[data-code = 'CapsLock']")
          audio.currentTime = 0
          audio.play()
        }
        console.log(left)
        console.log(cursorPos)
        left += '    '
        cursorPos += 4
        enterText()
      }
      btnPressOFF(elem)

      cursorPos = keyboardOutput.selectionStart;
      left = keyboardOutput.value.slice(0, cursorPos);
      right = keyboardOutput.value.slice(cursorPos);
    }
  })
}

keyboardOutput.addEventListener('keydown', keyPress)

document.addEventListener('keyup', keyUnpress)



const voiceRec = () => {
  console.log('я тебя слушаю')
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  console.log(recognition)
  recognition.interimResults = true;
  recognition.lang = 'ru-RU';
  recognition.interimResults = true
   


  recognition.start();
  recognition.addEventListener('end', recognition.start) 
  let transcript
  const tryRec = (e) =>{
    transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
  
    if (e.results[0].isFinal) {
      keyboardOutput.value += transcript + ' '
    }
  }
  const stopVoice = () =>{
    recognition.stop()
    cursorPos= keyboardOutput.value.length
    keyboardOutput.selectionStart = cursorPos
    keyboardOutput.selectionEnd = cursorPos
    keyboardOutput.focus()
    recognition.removeEventListener('end', recognition.start)
    recognition.removeEventListener('result',tryRec)
  
  }
  recognition.addEventListener('result',tryRec);
  document.querySelector('.keyboard__key--voice').addEventListener('click', stopVoice)
}

document.querySelector('.keyboard__key--voice').addEventListener('click', voiceRec)


