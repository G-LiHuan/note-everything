import './styles/index.css';

const aaa = {
  b: 1,
};

// eslint-disable-next-line no-console
console.log(aaa.b);

if (aaa.b === 1) {
  aaa.b = 2;
}

if (module.hot) {
  module.hot.accept();
}
