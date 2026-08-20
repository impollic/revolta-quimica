let [
  moverDireita,
  moverEsquerda,
  moverCima,
  moverBaixo
] = [
  false,
  false,
  false,
  false
]

function irDireita() { moverDireita = true; }
function NAOirDireita() { moverDireita = false; }
function irEsquerda() { moverEsquerda = true; }
function NAOirEsquerda() { moverEsquerda = false; }
function irCima() { moverCima = true; }
function NAOirCima() { moverCima = false; }
function irBaixo() { moverBaixo = true; }
function NAOirBaixo() { moverBaixo = false; }

class Personagem {
  constructor (x, y, vd, atk, def, ag, sprites = []) {
    this.x = x;
    this.y = y;
    this.vidaOriginal = vd;
    this.vida = vd;
    this.ataque = atk;
    this.defesa = def;
    this.agilidade = ag;
    this.sprites = sprites;
    this.vivo = true;
    this.pendul = sprites[0];
  }
  mostrar() {
    image(this.pendul, this.x - 16, this.y - 17, 16 * 2, 17 * 2);
  }
  mover(dt = 1) {
    let dx = 0, dy = 0;
    if (keyIsDown(87) || keyIsDown(38) || moverCima)    dy -= 1;
    if (keyIsDown(83) || keyIsDown(40) || moverBaixo)   dy += 1;
    if (keyIsDown(65) || keyIsDown(37) || moverEsquerda) dx -= 1;
    if (keyIsDown(68) || keyIsDown(39) || moverDireita)  dx += 1;
    if (dx !== 0 && dy !== 0) {
      dx *= INV_SQRT2;
      dy *= INV_SQRT2;
    }
    let step = this.agilidade / 3 * dt;
    let nx = this.x + dx * step;
    let ny = this.y + dy * step;
    if (nx >= 170 + 20 && nx <= 425 - 10) this.x = nx;
    if (ny >= 245 + 20 && ny <= 500 - 10) this.y = ny;
  }
}

let apollo;