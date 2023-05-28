export const swap = (array, i, j) => {
  ;[array[i], array[j]] = [array[j], array[i]]
}

export const indexOfMin = (array, start) => {
  let min = start

  for (let i = start; i < array.length; i++) {
    if (array[i] < array[min]) {
      min = i
    }
  }

  return min
}
