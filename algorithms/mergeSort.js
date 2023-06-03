// TODO: Implement merge sort
const mergeSortWrapper = array => {
  const moves = []
  const copyOfArray = [...array]
  const sorted = mergeSortInPlace(copyOfArray, 0, copyOfArray.length - 1, moves)
  return moves
}

const mergeSortInPlace = (array, start, end, moves) => {
  if (start < end) {
    const middle = Math.floor((start + end) / 2)
    mergeSortInPlace(array, start, middle, moves)
    mergeSortInPlace(array, middle + 1, end, moves)
    merge(array, start, middle, end, moves)
  }
}

const merge = (array, start, middle, end, moves) => {
  let nextStart = middle + 1

  if (array[middle] <= array[nextStart]) {
    return
  }

  while (start <= middle && nextStart <= end) {
    if (array[start] <= array[nextStart]) {
      moves.push({ indices: [start, nextStart], type: 'compare' })
      start++
    } else {
      const value = array[nextStart]
      let index = nextStart

      while (index !== start) {
        array[index] = array[index - 1]
        index--
        moves.push({ indices: [index, index + 1], type: 'swap' })
      }

      array[start] = value

      start++
      middle++
      nextStart++
    }
  }
}

export { mergeSortWrapper }
