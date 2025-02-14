const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

canvas.height = 512;
canvas.width = 448;
let colors = ["#c953e8","#7b1c7e","#8f62d9", "#ed3f76","#da1772","#3b376f"]

let musica = new Audio('./audioo/fun-amp-quirky-upbeat-retro-136510.mp3')
musica.play();

musica.addEventListener('ended', function() {
    console.log('RELOAD')
    this.currentTime = 0;
    this.play();
}, false);

//variables des Mexicans
const filas = 6
const columnes = 12
const ampleMur= 30;
const alturaMur = 14;
const margeTMur = 80;
const margeEMur = 30;
const sepMurs = 2;


const sprites = document.getElementById("sprites");
const mur  = document.getElementById("mur");

const murs= []
const ESTAT_MUR = {
    DESTRUIT: 0,
    SHOW: 1
}

for( let c= 0; c<columnes; c++){
    murs[c] = [];
    for(let f=0; f<filas; f++){
        const color = Math.floor(Math.random()*6)
        const murX = margeEMur+c* (ampleMur+sepMurs)
        const murY = margeTMur+f*(alturaMur+sepMurs)
        murs[c][f] = {
            x: murX,
            y: murY,
            status: ESTAT_MUR.SHOW,
            color: color

        }


    }
}

//variables pilota
let radiPilota = 10;

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

let vida=3;




function pintarPilota() {
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF";
    ctx.fill();

    ctx.closePath();
}

function pintarPala() {
    //ctx.fillStyle = "#FFF";
    //ctx.fillRect(palaX, palaY, amplePala, alturaPala);

    ctx.drawImage(
        sprites,
        0, 
        0,
        240,
        180,
        palaX, 
        palaY,
        amplePala,
        alturaPala,

    )
}



function pintarMurs() {
    for( let c= 0; c<columnes; c++){
        for(let f=0; f<filas; f++){
            const murActual = murs[c][f];
            if(murActual.status == ESTAT_MUR.DESTRUIT){
                continue;
             }
             let clipX = murActual.color * (517/6)
             ctx.drawImage(
                mur,
                clipX, 
                0,
                (517/6),
                40,
                murActual.x, 
                murActual.y,
                ampleMur,
                alturaMur,
        
            )
        
        }
     
}
}
function deteccioColisio() {
    for( let c= 0; c<columnes; c++){
        for(let f=0; f<filas; f++){
            const murActual = murs[c][f];
            if(murActual.status == ESTAT_MUR.DESTRUIT)
                continue;
        
            const mateixaXMur = x > murActual.x && x < murActual.x + ampleMur
            const mateixaYMur = y > murActual.y && y < murActual.y + alturaMur
            if(mateixaYMur && mateixaXMur){
                dy=-dy
                murActual.status =  ESTAT_MUR.DESTRUIT
            }
    }

}


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


    const mateixaX = x > palaX && x < palaX + amplePala;
    const mateixaY = y + dy > palaY

    // game over
    if(mateixaX && mateixaY){
        dy = -dy;

    }else if (y + dy > canvas.height){
            vida--
            x = canvas.width / 2
            y = canvas.height -30
            dx = 2
            dy = -2

            if(vida == 0){
                console.log ("GAME OVER")
                
            }

    }


    
    // moviment
    x += dx
    y += dy
}

    


function movimentPala() {
    if(dreta && palaX < canvas.width-amplePala){
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
            amplePala = amplePala/2;
        }
         if(event.key ==  '.'){
            radiPilota = radiPilota*2;
        }

        if(event.key ==  ','){
            radiPilota = radiPilota/2;

        }
        if(event.key ==  'm'){
            sensibilitat = sensibilitat*2;
        }

        if(event.key ==  'n'){
            sensibilitat = sensibilitat/2;
        }
        if(event.key ==  'w'){
            dx = dx*2;
        }

        if(event.key ==  'e'){
            dy = dy/2;
        }

        if(event.key ==  'c'){

            let dxNova = dx;
            let dyNova = dx;
            
            dy = 0
            dx = 0
            setTimeout (() =>{
                dy= dxNova;
                dx =dyNova;
            },3000)
            
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
    if (vida == 0 ) {
        ctx.fillText("GAME OVER", canvas.width / 2 -80, canvas.height / 2);
        return;
    }
    console.log("Hola");
    borrarPantalla();
    pintarPilota();
    pintarPala();
    pintarMurs();
    deteccioColisio();
    movimentPilota();
    movimentPala();
    window.requestAnimationFrame(pintarCanvas);

    ctx.fillText("Vidas: "+vida, 10, 10)
    
  
}





pintarCanvas();
inicialitzadorEvents();