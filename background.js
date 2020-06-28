const body = document.querySelector('body');
const IMG_NUMBER = 14;



function paintImage(imgNumber) {
    const img = new Image();
    img.src = `img/${imgNumber + 1}.jpg`;
    img.classList.add("bgimg");
    body.prepend(img);
}

function genRandomNumber() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandomNumber();
    paintImage(randomNumber);
}

init();