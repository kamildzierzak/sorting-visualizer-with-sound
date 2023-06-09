const insertionSort = array => {
  const moves = []
  let next

  for (next = 1; next < array.length; next++) {
    let current = next
    let temp = array[next]

    moves.push({ indices: [current, current - 1], type: 'compare' })
    while (current > 0 && temp < array[current - 1]) {
      moves.push({ indices: [current, current - 1], type: 'swap' })
      array[current] = array[current - 1]
      current--
    }

    array[current] = temp
  }

  return moves
}

export { insertionSort }
