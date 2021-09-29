const wordEl = document.querySelector('#word')
const wrongLettersEl = document.querySelector('#wrong-letters')
const playAgainBtn = document.querySelector('.play-button')
const popup = document.querySelector('#popup-container')
const notification = document.querySelector('#notification-container')
const finalMessage = document.querySelector('#final-message')

const wordList = ["programming","centaur","unicorn"]

const selectedWord = wordList[Math.floor(Math.random() * wordList.length)]
const selectedWordSet = new Set(selectedWord.split(""))
const uniqueSelectedWord = [...selectedWordSet]
uniqueSelectedWord.sort()

const correctLetters = []
const wrongLetters = []

function renderWord(){
    wordEl.innerHTML = `
    ${selectedWord.split("").map(l => `
    <span class="letter">
        ${correctLetters.includes(l) ? l : ''}
    </span>`).join("")}`
}

function renderWrongLetters(){
    wrongLettersEl.innerText = `${wrongLetters.join(",")}`
}

function renderHangMan(){
    const figurePart = document.querySelector('.figure-part')
    figurePart.classList.remove('figure-part')
}

function checkStatusOfGame(){
    correctLetters.sort()
    if(wrongLetters.length >= 7){
        showPopUp("You Lose!")
    }
    else if(JSON.stringify(uniqueSelectedWord) == JSON.stringify(correctLetters)){
        showPopUp("You Won!")
    }
}

function showPopUp(msg){
    popup.style.display = 'flex'
    finalMessage.innerText = msg
}

function isLetter(keyCode){
    var charCode = keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
        return true;
    else
        return false;
}

function initialize(){
    window.location.reload();
}

document.addEventListener('keyup', e => {
    if(isLetter(e.keyCode)){
        let clickedLetter = String.fromCharCode(e.keyCode)
        clickedLetter = clickedLetter.toLowerCase()
        if([...correctLetters,...wrongLetters].includes(clickedLetter)){
            notification.classList.add('show')
            setTimeout(() => {
                notification.classList.remove('show')
            }, 1000);
        }
        else if(uniqueSelectedWord.includes(clickedLetter)){
            correctLetters.push(clickedLetter)
            renderWord()
        }
        else{
            wrongLetters.push(clickedLetter)
            renderWrongLetters()
            renderHangMan()
        }
        checkStatusOfGame()
    }
})

playAgainBtn.addEventListener('click', initialize)

renderWord()