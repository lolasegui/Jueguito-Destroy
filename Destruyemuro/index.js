const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

canvas.height = 512;
canvas.width = 448;

//variables pilota
const radiPilota = 10;

let x = canvas.width / 2
let y = canvas.height - 30


// VELOCITAT PILOTA

let dx = 2
let dy = -2

// variables de pala
let amplePala= 70;
let alturaPala = 10;

let sensibilitat = 8;
let dreta = false;
let esquerra = false;


let palaX =(canvas.width-amplePala) / 2
let palaY = canvas.height- alturaPala - 10


function pintarPilota() {
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF";
    ctx.fill();

    ctx.closePath();
}

function pintarPala() {
    ctx.fillSyle = "FFF"
    ctx.fillRect(palaX,palaY,amplePala, alturaPala)

}

function pintarMurs() {

}
function deteccioColisio() {

}

function movimentPilota() {
    // REBOT EIX X

    if(x > canvas.width - radiPilota || x+ dx<= 0 + radiPilota){
        dx= -dx;
    }

    // rebot eix Y
    if(y + dy <= 0){
        dy= -dy;
    }

    // game over
    if(y + dy > canvas.height){
        console.log("GAME OVER")
        document.location.reload();
    }
    
    // moviment
    x += dx
    y += dy

}

function movimentPala() {
    if(dreta && palaX <canvas.width -amplePala){
        palaX +=sensibilitat
    }else if(esquerra && palaX > 0){
        palaX -=sensibilitat
    }
}

function borrarPantalla() {
    canvas.height = 512;
    canvas.width = 448;
}

function inicialitzadorEvents(){
    document.addEventListener("keydown", pulsar);
    document.addEventListener("keyup", soltar)

    function pulsar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = true;
        }

        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = true;
        }

          if(event.key ==  '+'){
            amplePala = amplePala*2;
        }

        if(event.key ==  '-'){
            amplePala = amplePala*2;
        }
    }

    function soltar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = false;
        }

        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = false;
        }
    }

}

function pintarCanvas() {
    console.log("Hola");
    borrarPantalla();
    pintarPilota();
    pintarPala();
    pintarMurs();
    deteccioColisio();
    movimentPilota();
    movimentPala();
    window.requestAnimationFrame(pintarCanvas);
}

pintarCanvas();
inicialitzadorEvents();