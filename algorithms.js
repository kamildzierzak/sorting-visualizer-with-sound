import { swap, indexOfMin } from './utils.js'

const bubbleSort = array => {
  const moves = []
  let swapped

  do {
    swapped = false
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true
        moves.push({ indicies: [i - 1, i], type: 'swap' })
        ;[array[i - 1], array[i]] = [array[i], array[i - 1]]
      }
    }
  } while (swapped)

  return moves
}

const selectionSort = array => {
  const moves = []
  let i = 0

  while (i < array.length) {
    let min = indexOfMin(array, i)
    moves.push({ indicies: [i, min], type: 'swap' })
    swap(array, i, min)
    i++
  }

  return moves
}

export { bubbleSort, selectionSort }
