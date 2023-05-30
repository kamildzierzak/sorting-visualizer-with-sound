import { partition } from '../utils.js'

const quickSort = (array, left, right) => {
  if (left >= right) return

  let index = partition(array, left, right)

  quickSort(array, left, index - 1)
  quickSort(array, index + 1, right)
}

export { quickSort }
