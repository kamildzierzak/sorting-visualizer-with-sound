import { swap, indexOfMin } from '../utils.js'

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

export { selectionSort }
