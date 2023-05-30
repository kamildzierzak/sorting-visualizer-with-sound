import { swap } from './utils.js'
import { selectionSort } from './algorithms/selectionSort.js'
import { insertionSort } from './algorithms/insertionSort.js'
import { bubbleSort } from './algorithms/bubbleSort.js'

const algorithms = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  // 'Merge Sort': mergeSort,
  // 'Quick Sort': quickSort,
}

let selectedAlgorithm = bubbleSort
let howManyRandomNumbers = 50
let arrayOfRandomNumbers = []
let audioCtx = null
let animateDuration = 10
let animationTimeout = null
const noteDuration = 0.1

const init = () => {
  arrayOfRandomNumbers = []

  for (let i = 0; i < howManyRandomNumbers; i++) {
    arrayOfRandomNumbers.push(Math.random())
  }

  showBars()
}

const play = () => {
  const copyOfArrayOfRandomNumbers = [...arrayOfRandomNumbers]
  const moves = selectedAlgorithm(copyOfArrayOfRandomNumbers)
  animate(moves)
}

const stop = () => {
  clearTimeout(animationTimeout)
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

  playNote(arrayOfRandomNumbers[i] * 500 + 200, noteDuration)
  playNote(arrayOfRandomNumbers[j] * 500 + 200, noteDuration)

  showBars(move)

  animationTimeout = setTimeout(() => animate(moves), animateDuration)
}

const showBars = move => {
  barsContainer.innerHTML = ''

  for (let i = 0; i < arrayOfRandomNumbers.length; i++) {
    const bar = document.createElement('div')
    bar.style.height = arrayOfRandomNumbers[i] * 100 + '%'
    bar.classList.add('bar')

    if (move && move.indicies.includes(i)) {
      if (move.type === 'compare') {
        bar.style.backgroundColor = '#4A9976'
      }
      if (move.type === 'swap') {
        bar.style.backgroundColor = '#E52B50'
      }
      if (move.type === 'sorted') {
        bar.style.backgroundColor = '#FFBF00'
      }
    }

    barsContainer.appendChild(bar)
  }
}

const showAlgorithmsOptions = () => {
  const keys = Object.keys(algorithms)
  keys.forEach(name => {
    const option = document.createElement('option')
    option.value = name
    option.innerText = name
    selectButton.appendChild(option)
  })
}

const selectAlgorithm = () => {
  selectedAlgorithm = algorithms[selectButton.value]
  stop()
}

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

const barsContainer = document.querySelector('#barsContainer')

const selectButton = document.querySelector('#algorithmSelect')
const rangeInput = document.querySelector('#powerRanger')
const rangeValueText = document.querySelector('#quantity')
const speedInput = document.querySelector('#speedRanger')
const speedValueText = document.querySelector('#speed')
const generateButton = document.querySelector('#generateBtn')
const playButton = document.querySelector('#playBtn')
const stopButton = document.querySelector('#stopBtn')

selectButton.addEventListener('change', selectAlgorithm)

rangeInput.addEventListener('input', e => {
  let selectedValue = rangeInput.value
  howManyRandomNumbers = selectedValue
  rangeValueText.innerText = selectedValue
})
rangeInput.addEventListener('change', e => {
  stop()
  init()
})

speedInput.addEventListener('input', e => {
  let selectedValue = speedInput.value
  animateDuration = selectedValue
  speedValueText.innerText = selectedValue
})

generateButton.addEventListener('click', e => {
  stop()
  init()
})

playButton.addEventListener('click', play)

stopButton.addEventListener('click', stop)

init()
showAlgorithmsOptions()
