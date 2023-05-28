const n = 20
let array = []
let audioCtx = null
const duration = 0.1

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

const init = () => {
  array = []
  for (let i = 0; i < n; i++) {
    array.push(Math.random())
  }
  showBars()
}

const play = () => {
  const copy = [...array]
  const moves = bubbleSort(copy)
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
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  playNote(array[i] * 500 + 200, duration)
  playNote(array[j] * 500 + 200, duration)

  showBars(move)

  setTimeout(() => animate(moves), 50)
}

const bubbleSort = array => {
  const moves = []
  let swapped
  do {
    swapped = false
    for (let i = 1; i < array.length; i++) {
      //moves.push({ indicies: [i - 1, i], type: 'comparison' })
      if (array[i - 1] > array[i]) {
        swapped = true
        moves.push({ indicies: [i - 1, i], type: 'swap' })
        ;[array[i - 1], array[i]] = [array[i], array[i - 1]]
      }
    }
  } while (swapped)
  return moves
}

const showBars = move => {
  playground.innerHTML = ''

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div')
    bar.style.height = array[i] * 100 + '%'
    bar.classList.add('bar')

    if (move && move.indicies.includes(i)) {
      bar.style.backgroundColor = move.type === 'swap' ? 'red' : 'green'
    }
    playground.appendChild(bar)
  }
}

init()
