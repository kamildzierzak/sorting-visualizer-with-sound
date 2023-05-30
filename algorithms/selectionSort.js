import { swap } from '../utils.js'

const selectionSort = array => {
  const moves = []
  let i = 0

  while (i < array.length) {
    let min = i

    // let min = indexOfMin(array, i)
    // indexOfMin(array, i)
    for (let j = i; j < array.length; j++) {
      moves.push({ indicies: [j, min], type: 'compare' })
      if (array[j] < array[min]) {
        min = j
      }
    }

    moves.push({ indicies: [i, min], type: 'swap' })
    swap(array, i, min)
    i++
  }

  return moves
}

export { selectionSort }
