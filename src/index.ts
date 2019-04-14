import h from './utils';

let counter = 3;
let x: any = { a: 1 };
const y = { ...x };


class a {
  asd = () => {
    console.log('asdd');
  }
}

x = new a();
console.log(x, y);

setInterval(() => {
  h();
  console.log(counter++);
}, 1000);

const z = "22222233233";

console.log("blabla")

console.log(z);