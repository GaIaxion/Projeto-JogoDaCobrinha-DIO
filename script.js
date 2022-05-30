//chamando o elemento canva e atribuindo ele a variável canvas
let canvas = document.getElementById("snake");
//contecto reindeniza o desenho que vai acontecer dentro do canvas, no caso como é 2D ele vai tratar o arquivo como plano 2d
let context = canvas.getContext("2d");
//tamanho do box onde a cobrinha vai andar
let box = 32;
//declare a variavel snake com um array vazio, pq a cobrinha vai ser um array
let snake = [];
//aqui eu to colocando o que tem dentro do array snake
snake[0] = {
    x: 8 * box,
    y: 8 * box
// 8 ta mais relacionado a posição da cobrinha do que ao tamanho
}
// variavel de direção para onde a cobrinha vai
let direction = "right";
let food ={ 
    // o Math.Floor retinha parte do .random, o .random sempre terorna um numero aleatoria até 1
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//declaração da function criarBG, que sarve para
function criarBG() {
    //context e fullStyle  são objetos, e eu atribui a cor lightgreen, o full style trabalha com o estilo do canvas no contexto
    context.fillStyle = "lightgreen";
    //trabalha com o retêngulo onde vai acontecer o jogo, ele trabalha com 4 paâmetros, o posição de x e y e a altura e largura, no jogo o tamanho do quedradinho vai ser 32 pixels
    context.fillRect(0, 0, 16*box, 16*box); //16+16=32-->tamanho total do retangulo
}

//criando a cobrinha
function criarCobrinha(){
//utilizar um for para percorrer todo o tamanho do array e incrementar
/*For cria um loop que consiste em três expressões opcionais, dentro de parênteses e separadas por ponto e vírgula, 
seguidas por uma declaração ou uma sequência de declarações executadas em sequência.*/
//i++ para adicionar 1
for(i = 0; i < snake.length; i++){
    context.fillStyle = "green"; //pintou a cobrinha de verde
    context.fillRect(snake[i].x, snake[i].y, box, box); // tamanhao da cobrinha, x, y  e box que eu já defini
}
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
drawFood()
}
//faze o caomputador receber o toque e transmitir para o jogo
//criou o EventListener Keydow, que é um evento de clique e vai chamar a função update
document.addEventListener('keydown',update);
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = 'left';
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}


function iniciarJogo(){
        //o for vai comparara se a posição da cabeça se choca com a posição do corpinho
        for(i = 1; i < snake.length; i++){
            if(snake[0].x == snake[i].x && snake [0].y == snake [i].y){
                clearInterval(jogo);
                alert('Game Over:(');
            }
        }

        //plano carteziano
        if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0; 
        if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
        if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
        if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;   
        // na parte de iniciar o jogo colocamos a funções de chamada
            //O retangulo não tinha aparecido porque eu não chamei a função, agora eu chamei de deu certo
        criarBG();
        criarCobrinha();
        // para a cobrinha se mover a gente vai tirar um elemento e adicionaar um ultimo
        // variavel indicando a posinação da cobra en x e y 0
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        //condicionais que mostram pra onde a cobrinha vai estar indo
        // Ajustando posições no eixo x (direite e esquerda), então ao ir para a direita a cobrinha ganha um box e ao ir para a esquerda ela perde 1 box, para dar a alusão de movimento
        if(direction == "right") snakeX += box;
        if(direction == "left") snakeX -= box;
        //Ajustando diração no eixo y
        if(direction == "up") snakeY -= box;
        if(direction == "down") snakeY += box;
        //adicionando a função pop, que retira o ultimo elemento do array(snake)
        if(snakeX != food.x || snakeY != food.y){
            snake.pop();
        }
        else{
            food.x = Math.floor(Math.random() * 15 + 1) * box,
            food.y = Math.floor(Math.random() * 15 + 1) * box
        }
        
       //vamos fazer a cabeça da cobra
        let newHead = {
            x: snakeX,
            y: snakeY
        }
        snake.unshift(newHead);
    } 
//função que atualize o jogo de tempos em tempos para a cobrinha se mover, vamo utilizar a setinteval
let jogo = setInterval(iniciarJogo, 100);


