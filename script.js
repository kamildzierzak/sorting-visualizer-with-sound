import { swap } from './utils.js'
import { selectionSort } from './algorithms/selectionSort.js'
import { insertionSort } from './algorithms/insertionSort.js'
import { bubbleSort } from './algorithms/bubbleSort.js'
import { mergeSortWrapper as mergeSort } from './algorithms/mergeSort.js'

const algorithms = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Merge Sort': mergeSort,
  // 'Quick Sort': quickSort,
}

let selectedAlgorithm = bubbleSort

let windowWidth = window.innerWidth
let barWidth = 10
const barsMarginWidth = 1
let barTotalWidth = barWidth + barsMarginWidth
let maximumNumberOfBars = Math.floor(((9 / 10) * windowWidth) / barTotalWidth)
let howManyRandomNumbers = 10
let arrayOfRandomNumbers = []
let audioCtx = null
let animateDuration = 25
let animationTimeout = null
const noteDuration = 0.1

const generate = () => {
  arrayOfRandomNumbers = []

  for (let i = 0; i < howManyRandomNumbers; i++) {
    arrayOfRandomNumbers.push(Math.random())
  }

  showBars()
}

const start = () => {
  const copyOfArrayOfRandomNumbers = [...arrayOfRandomNumbers]
  const moves = selectedAlgorithm(copyOfArrayOfRandomNumbers)
  animate(moves)
}

const stop = () => {
  clearTimeout(animationTimeout)
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

const animate = moves => {
  if (moves.length === 0) {
    showBars()
    return
  }

  const move = moves.shift()
  const [i, j] = move.indices

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

    if (move && move.indices.includes(i)) {
      if (move.type === 'compare') {
        bar.style.backgroundColor = '#4A9976'
      }
      if (move.type === 'swap') {
        bar.style.backgroundColor = '#E52B50'
      }
    }

    barsContainer.appendChild(bar)
  }
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

const handleWindowResize = () => {
  windowWidth = window.innerWidth
  barWidth = (2 * windowWidth) / 100
  barTotalWidth = barWidth + barsMarginWidth
}

window.addEventListener('resize', handleWindowResize)

const barsContainer = document.querySelector('#barsContainer')

const selectButton = document.querySelector('#algorithmSelect')
selectButton.addEventListener('change', selectAlgorithm)

const rangeInput = document.querySelector('#powerRanger')
const rangeValueText = document.querySelector('#quantity')
rangeInput.addEventListener('input', e => {
  let selectedValue = rangeInput.value
  howManyRandomNumbers = selectedValue
  rangeValueText.innerText = selectedValue
})
rangeInput.addEventListener('change', e => {
  stop()
  generate()
})

const speedInput = document.querySelector('#speedRanger')
const speedValueText = document.querySelector('#speed')
speedInput.addEventListener('input', e => {
  let selectedValue = speedInput.value
  animateDuration = selectedValue
  speedValueText.innerText = selectedValue
})

const generateButton = document.querySelector('#generateBtn')
generateButton.addEventListener('click', e => {
  stop()
  generate()
})

const playButton = document.querySelector('#playBtn')
playButton.addEventListener('click', start)

const stopButton = document.querySelector('#stopBtn')
stopButton.addEventListener('click', stop)

const setupOptions = () => {
  rangeInput.max = maximumNumberOfBars
}

showAlgorithmsOptions()
setupOptions()
generate()
