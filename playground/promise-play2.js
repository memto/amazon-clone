// promise resolve before caller call then
const apromise1 = new Promise(function (resolve) { // B
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
