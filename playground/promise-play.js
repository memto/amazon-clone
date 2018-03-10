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

  function handle(handler) {
    if (state === 'pending') { // B
      deferred = handler; // B
      return;
    }

    if (!handler.onResolved) { // B
      handler.resolve(value); // B
      return;
    }

    const ret = handler.onResolved(value);
    handler.resolve(ret); // B
  }

  this.then = function (onResolved) {
    return new PromiseX(function async(resolve) {
      handle({
        onResolved,
        resolve,
      });
    });
  };

  fn(resolve); // B
}

// promise resolve before caller call then
const apromise1 = new PromiseX(function (resolve) { // B
  resolve('apromise1'); // B
});

const apromise1Then = apromise1.then((x) => { // B
  console.log(x); // B
  return x + x;
});

const apromise1ThenThen = apromise1Then.then((x) => { // B
  console.log(x); // B
});

apromise1ThenThen.then((x) => { // B
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
