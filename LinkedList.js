import { ListNode } from './ListNode.js'

class LinkedList {
  constructor(head = null) {
    this.head = head
  }

  add(value) {
    const newNode = new ListNode(value)

    if (!this.head) {
      this.head = newNode
    } else {
      let current = this.head

      while (current.next) {
        current = current.next
      }

      current.next = newNode
    }
  }

  remove(value) {
    if (!this.head) {
      return
    }

    if (this.head.value === value) {
      this.head = this.head.next
      return
    }

    let current = this.head
    let prev = null

    while (current) {
      if (current.value === value) {
        prev.next = current.next
        return
      }

      prev = current
      current = current.next
    }
  }

  fromArray(array) {
    this.head = null
    let current = null

    for (let i = 0; i < array.Length; i++) {
      const newNode = new ListNode(array[i])

      if (!this.head) {
        this.head = newNode
        current = this.head
      } else {
        current.next = newNode
        current = current.next
      }
    }
  }
}

export { LinkedList }
