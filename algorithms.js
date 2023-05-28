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

const insertionSort = array => {
  const moves = []
  let next

  for (next = 1; next < array.length; next++) {
    let current = next
    let temp = array[next]

    while (current > 0 && temp < array[current - 1]) {
      moves.push({ indicies: [current, current - 1], type: 'swap' })
      array[current] = array[current - 1]
      current--
    }

    array[current] = temp
  }

  return moves
}

export { bubbleSort, selectionSort, insertionSort }
