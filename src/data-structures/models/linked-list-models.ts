export class LinkedNode<T> {
  constructor(public element: T, public next?: LinkedNode<T>) {}
}

export class DoublyNode<T> extends LinkedNode<T> {
  constructor(
    public element: T,
    public next?: DoublyNode<T>,
    public prev?: DoublyNode<T>
  ) {
    super(element, next);
  }
}
