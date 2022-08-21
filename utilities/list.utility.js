export const sortObjectsByProperty =
  (property, descending = false) =>
  (a, b) => {
    const moveDown = -1;
    const moveUp = 1;

    const isFirstObjectSmaller = a[property] < b[property];

    if (descending) return isFirstObjectSmaller ? moveUp : moveDown;

    return isFirstObjectSmaller ? moveDown : moveUp;
  };
