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


function pintarPilota() {
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF";
    ctx.fill();

    ctx.closePath();
}

function pintarPala() {

}

function pintarMurs() {

}
function deteccioColisio() {

}

function movimentPilota() {
    if(x > canvas.width || x<= 0){
        dx= -dx;
    }
    if(y > canvas.height || y<= 0){
        dy= -dy;
    }
    x += dx
    y += dy

}

function movimentPala() {

}

function borrarPantalla() {
    canvas.height = 512;
    canvas.width = 448;
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