let order = [];
let clickedOrder = [];
let score = 0;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul
const pontos = document.querySelector('.pontos')
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

// cria ordem aleatoria
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
        console.log (order[i]);
        console.log(Number(i) + 1)
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, 500);
}

//checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê Acertou! Iniciando próximo nível!`)
        nextLevel();
    }
}

//função para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();   
    }, 250);
}

// função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    }else if (color == 1){
        return red;
    }else if (color == 2){
        return yellow;
    }else if (color == 3){
        return blue;
    }
}

// função para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\n Clique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = []

    playGame();
}

//função de inicio do jogo
let playGame = () => {
    //alert('Bem vindo ao Gênesis! Iniciando novo jogo!')
    score = 0;

    nextLevel();
}

let apertei = (color) => 
    {   
        createColorElement(color).classList.add('selected');
        console.log('Apertei')
    };
let soltei = (color) => 
    {
        console.log('soltei')
        green.classList.remove('selected');
        setTimeout(() => {
            clickedOrder[clickedOrder.length] = color;
            checkOrder();
        }, 250);
         
        
    };

//eventos de clique para as cores
green.onmouseup = () => soltei(0);
green.onmousedown = () => apertei(0);

//green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame();