import { swap } from './utils.js'
import { bubbleSort } from './algorithms.js'

const algorithms = {
  'Bubble Sort': bubbleSort,
}

let selectedAlgorithm = bubbleSort
let howManyRandomNumbers = 20
let arrayOfRandomNumbers = []
let audioCtx = null
const duration = 0.1

const init = () => {
  arrayOfRandomNumbers = []

  for (let i = 0; i < howManyRandomNumbers; i++) {
    arrayOfRandomNumbers.push(Math.random())
  }

  showAlgorithmsOptions()
  showBars()
}

const play = () => {
  const copyOfArrayOfRandomNumbers = [...arrayOfRandomNumbers]
  const moves = selectedAlgorithm(copyOfArrayOfRandomNumbers)
  animate(moves)
}

const animate = moves => {
  if (moves.length === 0) {
    showBars()
    return
  }

  const move = moves.shift()
  const [i, j] = move.indicies

  if (move.type === 'swap') {
    swap(arrayOfRandomNumbers, i, j)
  }

  playNote(arrayOfRandomNumbers[i] * 500 + 200, duration)
  playNote(arrayOfRandomNumbers[j] * 500 + 200, duration)

  showBars(move)

  setTimeout(() => animate(moves), 50)
}

const showBars = move => {
  playground.innerHTML = ''

  for (let i = 0; i < arrayOfRandomNumbers.length; i++) {
    const bar = document.createElement('div')
    bar.style.height = arrayOfRandomNumbers[i] * 100 + '%'
    bar.classList.add('bar')

    if (move && move.indicies.includes(i)) {
      bar.style.backgroundColor = move.type === 'swap' ? '#E52B50' : '#4A9976'
    }
    playground.appendChild(bar)
  }
}

const showAlgorithmsOptions = () => {
  selectButton.innerHTML = ''

  const keys = Object.keys(algorithms)
  keys.forEach(name => {
    const option = document.createElement('option')
    option.value = name
    option.innerText = name
    selectButton.appendChild(option)
  })
}

const selectAlgorithm = () =>
  (selectedAlgorithm = algorithms[selectButton.value])

const playNote = (frequency, duration) => {
  if (!audioCtx) {
    audioCtx =
      new AudioContext() ||
      new webkitAudioContext() ||
      new window.webkitAudioContext()
  }

  const oscillator = audioCtx.createOscillator()
  const node = audioCtx.createGain()

  oscillator.frequency.value = frequency
  oscillator.start()
  oscillator.stop(audioCtx.currentTime + duration)

  node.gain.value = 0.1
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration)

  oscillator.connect(node)
  node.connect(audioCtx.destination)
}

const playground = document.querySelector('#playground')

const selectButton = document.querySelector('#algorithm-select')
const generateButton = document.querySelector('#generate')
const playButton = document.querySelector('#play')

selectButton.addEventListener('change', selectAlgorithm)
generateButton.addEventListener('click', init)
playButton.addEventListener('click', play)

init()
