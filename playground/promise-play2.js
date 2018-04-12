// promise.then(
//   onFulfilled ?: Function,
//   onRejected ?: Function
// ) => Promise

// promise resolve before caller call then
// const apromise1 = new Promise(((resolve) => { // B
//   resolve('apromise1'); // B
// }));


// const apromise1Then = apromise1.then((x) => { // B
//   console.log(x); // B
//   return x + x;
// });

// const apromise1ThenThen = apromise1Then.then((x) => { // B
//   console.log(x); // B
// });

// apromise1ThenThen.then((x) => { // B
//   console.log(x); // B
// });

const aPromiseReturnValue = new Promise((resolve, reject) => {
  console.log('promise run');
  setTimeout(() => {
    const result = Math.random();
    console.log(`setTimeout run ${result}`);
    if (result > 0.3) {
      resolve(result);
    } else {
      reject(result);
    }
  }, 300);
});

// setTimeout(() => {
//   aPromiseReturnValue
//     .then(result => console.log(`onFullFilled ${result}`))
//     .catch(reason => console.log(`onRejected ${reason}`));
// }, 500);

setTimeout(() => {
  aPromiseReturnValue
  // .then() must return a new promise, promise2.
  // If onFulfilled() or onRejected() return a value x, and x is a promise,
  // promise2 will lock in with (assume the same state and value as) x.
  // Otherwise, promise2 will be fulfilled with the value of x.
    .then(result => console.log(`onFullFilled ${result}`)) // return value of undefined which is return value of console.log
    .then((result) => { // return a promise
      console.log(`onFullFilled2 ${result}`);
      return new Promise((resolve, reject) => {
        const newResult = Math.random();
        console.log(`nested promise run ${newResult}`);
        if (newResult > 0.3) {
          resolve(`bigger ${newResult}`);
        } else {
          reject(Error(`smaller ${newResult}`));
        }
      });
    })
    .then((result) => {
      console.log(`onFullFilled3 ${result}`);
      // return 'onFullFilled3 result';
      throw Error('onFullFilled3 error');
    })
    .then('notafunction') // If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
    .then(result => console.log(`onFullFilled4 ${result}`))
    .catch(reason => console.log(`onRejected ${reason}`));
}, 10);
