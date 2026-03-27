const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const proton = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    raio: 15,
    cor: "#ff4d4d"
};

const eletron = {
    x: canvas.width / 2,
    y: (canvas.height / 2) - 150,
    vx: Math.sqrt(2000 / 150),
    vy: 0,
    raio: 5,
    cor: "#4da6ff",
    rastro: []
};

const forcaAtracao = 2000;

function animar(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let dx = proton.x - eletron.x;
    let dy = proton.y - eletron.y;
    let distancia = Math.sqrt(dx * dx + dy * dy);
    let forca = forcaAtracao / (distancia * distancia);
    let aceleracaoX = (dx / distancia) * forca;
    let aceleracaoY = (dy / distancia) * forca;

    eletron.vx = eletron.vx + aceleracaoX;
    eletron.vy = eletron.vy + aceleracaoY;
    eletron.x = eletron.x + eletron.vx;
    eletron.y = eletron.y + eletron.vy;

    eletron.rastro.push({x: eletron.x, y: eletron.y});

    if (eletron.rastro.length > 40) {
        eletron.rastro.shift();
    }

    for (let i = 0; i < eletron.rastro.length; i++) {
        let ponto = eletron.rastro[i];

        ctx.beginPath();

        let tamanhoRastro = (i / eletron.rastro.length) * eletron.raio;
        ctx.arc(ponto.x, ponto.y, tamanhoRastro, 0, Math.PI * 2);

        ctx.globalAlpha = i / eletron.rastro.length;
        ctx.fillStyle = eletron.cor;
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(proton.x, proton.y, proton.raio, 0, Math.PI * 2);
    ctx.fillStyle = proton.cor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(eletron.x, eletron.y, eletron.raio, 0, Math.PI * 2);
    ctx.fillStyle = eletron.cor;
    ctx.fill();

    requestAnimationFrame(animar);
}

animar();