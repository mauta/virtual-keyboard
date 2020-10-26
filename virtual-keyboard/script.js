const openBtn = document.querySelector('.open-btn')
const keyboardOutput = document.querySelector('.keyboard-output')

openBtn.addEventListener('click', function () {

  if (keyboard.classList.contains('keyboard__hidden')) {
    keyboard.classList.toggle('keyboard__hidden')
    openBtn.textContent = 'close me'
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


const keysBtnAll = [
  "esc",{top:"!",down:"1"}, {top:"@",down:"2"}, {top:"#",down:"3"},{top:"$",down:"4"}, {top:"%",down:"5"}, {top:"^",down:"6"}, {top:"&",down:"7"}, {top:"*",down:"8"}, {top:"(",down:"9"}, {top:")",down:"0"}, {top:"_",down:"-"}, {top:"+",down:"="}, "backspace",
  "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
  "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
  "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
  "space"
]
let capslock = false

const toggleCapsLock = () => {
  capslock = !capslock;

  for (const key of document.querySelectorAll('.keyboard__key')) {
      if (key.childElementCount === 0) {
          key.textContent = capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
      }
  }
}

console.log(keysBtnAll[1])
console.log(typeof keysBtnAll[1])

keysBtnAll.forEach(elem => {
  const keyElement = document.createElement("button")
  const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(elem) !== -1
  keyElement.classList.add("keyboard__key")
  keyElement.setAttribute("type", "button")

  if(typeof elem ==='object'){
    keyElement.textContent = elem.down
    keyElement.classList.add('keyboard__key--switch')
  } else {
    switch (elem) {

      case "backspace":
        keyElement.classList.add("keyboard__key--double")
        keyElement.innerHTML = `<i class="material-icons">${'backspace'}</i>`
        keyElement.addEventListener('click', () => {
          keyboardOutput.textContent = keyboardOutput.textContent.slice(0,keyboardOutput.textContent.length-1)
        })
        break;
  
      case "space":
        keyElement.classList.add("keyboard__key--space")
        keyElement.innerHTML = `<i class="material-icons">${'space_bar'}</i>`
        keyElement.addEventListener('click', () => {
          keyboardOutput.textContent += ' '
        })
        break;
  
      case "caps":
        keyElement.classList.add('keyboard__key--double', 'keyboard__key--activable')
        keyElement.innerHTML = `<i class="material-icons">${'keyboard_capslock'}</i>`
  
        keyElement.addEventListener('click', function () {
          keyElement.classList.toggle('keyboard__key--active')
          toggleCapsLock()
        })
        break;
  
      case "enter":
        keyElement.classList.add("keyboard__key--double")
        keyElement.innerHTML = `<i class="material-icons">${'keyboard_return'}</i>`
        keyElement.addEventListener('click', () => {
          keyboardOutput.textContent += '\n'
        })
        break;
        case "tab":
          keyElement.classList.add("keyboard__key--double")
          keyElement.innerHTML = `<i class="material-icons">${'keyboard_tab'}</i>`
          keyElement.addEventListener('click', () => {
            keyboardOutput.textContent += '    '
          })
          break;
  
      default:
        capslock ? keyElement.textContent = elem.toUpperCase() : keyElement.textContent = elem.toLowerCase()
  
        keyElement.addEventListener('click', () => {
          keyboardOutput.textContent += capslock ? elem.toUpperCase() : elem.toLowerCase()
        })
  
        break;
    }
  }




  keyboardKeys.appendChild(keyElement)

  if (insertLineBreak) {
    keyboardKeys.appendChild(document.createElement("br"))
  }
})