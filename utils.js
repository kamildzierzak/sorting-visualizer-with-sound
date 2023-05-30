const swap = (array, i, j) => {
  ;[array[i], array[j]] = [array[j], array[i]]
}

const indexOfMin = (array, start) => {
  let min = start

  for (let i = start; i < array.length; i++) {
    if (array[i] < array[min]) {
      min = i
    }
  }

  return min
}

const partition = (array, left, right) => {
  let i = left + 1
  let j = right
  let pivot = array[left]
  let temp

  do {
    while (i < right && array[i] <= pivot) i++
    while (j > left && array[j] >= pivot) j--

    if (i < j) {
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  } while (i < j)

  if (array[i] > pivot) {
    array[left] = array[i - 1]
    array[i - 1] = pivot
    return i - 1
  } else {
    array[left] = array[i]
    array[i] = pivot
    return i
  }
}

export { swap, indexOfMin, partition }
