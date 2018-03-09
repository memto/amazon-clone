function PromiseX(fn) {
  let state = 'pending'; // B
  let value;
  let deferred;

  function resolve(newValue) {
    value = newValue; // B
    state = 'resolved';

    if (deferred) {
      handle(deferred); // B
    }
  }

  function handle(onResolved) {
    if (state === 'pending') {
      deferred = onResolved; // B
      return;
    }

    onResolved(value); // B
  }

  this.then = function (onResolved) {
    handle(onResolved); // B
  };

  fn(resolve); // B
}

// promise resolve before caller call then
const apromise1 = new PromiseX(function (resolve) { // B
  resolve('apromise1'); // B
});

apromise1.then((x) => { // B
  console.log(x); // B
});

// caller call then before promise resolved
const apromise2 = new PromiseX(function (resolve) { // B
  setTimeout(() => { // B
    resolve('apromise2'); // B
  }, 3000);
});

apromise2.then((x) => { // B
  console.log(x); // B
});
