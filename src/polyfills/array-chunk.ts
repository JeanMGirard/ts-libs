/**
 * @version 1.0
 */

// Array.prototype.chunk = function(chunkSize) {
//   let R = [];
//   for (let i = 0; i < this.length; i += chunkSize)
//     R.push(this.slice(i, i + chunkSize));
//   return R;
// };

Object.defineProperty(Array.prototype, 'chunk', {
  value: function<T=any>(chunkSize: number, fill: T) {
    let R = [];

    if(typeof fill !== "undefined"){
      const append = chunkSize - (this.length % chunkSize);
      if(append !== chunkSize)
        for (let a = 0; a < append; a++) this.push(fill);
    }

    for (let i = 0; i < this.length; i += chunkSize) {
      // @ts-ignore
      R.push(this.slice(i, i + chunkSize));
    }

    return R;
  }
});
