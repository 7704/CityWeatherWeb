// javascript for typewriter
let title = document.querySelector(".main_heading");
let myjs = "Hello Everyone...👋";

let index = 1;

const typewriter = () => {
  let newtitle = myjs.slice(0, index);
  title.innerText = newtitle;
  index++;

  if (index > myjs.length) {
    index = 1;
  } else {
    index++;
  }

  setTimeout(() => {
    typewriter();
  }, 900);
};

typewriter();
