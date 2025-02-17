// Tenho que ajeitar essa classe depois
class Caixa {
  constructor (x, y, h, w, cor, texto, corFundo = 0, apenasArea = 0, textoTOPO = 0, apertavel = false, imagem = undefined, symbol = '') {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.cor = cor;
    this.texto = texto;
    this.corFundo = corFundo;
    this.apenasArea = apenasArea;
    this.textoTOPO = textoTOPO;
    this.apertavel = apertavel;
    if (imagem) {
      this.img = loadImage(imagem);
    }
    
    this.symbol = symbol;
    
  }
  desenhar() {
    push();
      if (this.img) textSize(18);
      if (this.cor == "orange" && this.selecionado()) {
        stroke("yellow");
      } else {
        stroke(this.cor);
      }
      fill(this.corFundo);
      strokeWeight(3);
      if (!this.apenasArea) {
        rect(this.x, this.y, this.w, this.h);
      }
      if (this.img) {
        image(this.img, this.x, this.y, this.w, this.h);
      }
      strokeWeight(0.1);
      if (this.cor == "orange" && this.selecionado()) {
        fill("yellow");
      } else {
        fill(this.cor);
      }
      if (!this.textoTOPO) {
        text(this.texto, this.x + 10, this.y + this.h/2 + 8);
        push();
          textFont('Arial');
          text(this.symbol, this.x + 10, this.y + this.h/2 + 8);
        pop();
      } else {
        text(this.texto, this.x + 10, this.y + 10);
        push();
          textFont('Arial');
          text(this.symbol, this.x + 10, this.y + 10);
        pop();
      }
    pop();
  }
  selecionado() {
    return (mouseX < this.x + this.w && mouseX > this.x && mouseY > this.y && mouseY < this.y + this.h);
  }
  apertado () {
    return (mouseX < this.x + this.w && mouseX > this.x && mouseY > this.y && mouseY < this.y + this.h && mouseIsPressed);
  }
}

// BOTOES MOBILE
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

// CLASSE PERSONAGEM

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
  mover() {
    if (keyIsDown(87) || keyIsDown(38) || moverCima) {
      // W
      if (this.y + this.agilidade/3 <= 245 + 20) return;
      this.y -= this.agilidade/3;
    }    
    if (keyIsDown(65) || keyIsDown(37) || moverEsquerda) {
      // A
      if (this.x + this.agilidade/3 <= 170 + 20) return;
      this.x -= this.agilidade/3;
    }
    if (keyIsDown(83) || keyIsDown(40) || moverBaixo) {
      // S
      if (this.y + this.agilidade/3 >= 500 - 10) return;
      this.y += this.agilidade/3;
    }
    if (keyIsDown(68) || keyIsDown(39) || moverDireita) {
      // D
      if (this.x + this.agilidade/3 >= 425 - 10) return;
      this.x += this.agilidade/3;
    }
  }
}
class Atom {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(1.5,-1.5);
    this.vy = random(3, 4);
    let num = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.sprite = loadImage((num == 1) ? './Sprites/atomAzul.png' : (num == 2) ? './Sprites/atomVerde.png' : './Sprites/atomVermelho.png');
    
  }
  desenhar() {
   image(this.sprite, this.x - 16, this.y - 16 , 32, 32);
  }
  mover() {
    this.x += this.vx;
    this.y += this.vy;
  }
  colidir() {
    if (dist(this.x, this.y, apollo.x, apollo.y) < 20 ) {
      apollo.vida -= 2;
      dano.play();
      if (apollo.vida<=0) apollo.vivo = false;
      atomos.splice(atomos.indexOf(this), 1);
    }
    if (this.x + 10 > width || this.x - 10 < 0 || this.y + 10 > height) {
      atomos.splice(atomos.indexOf(this), 1);
    }
  }
}
let atomos = [];
let apollo;

class Inimigo extends Personagem {
  constructor (vd, atk, def, dialogo = []) {
    super(0, 0, vd, atk, def, 0, []);
    this.dialogo = dialogo;
  }
}
let hanniman = new Inimigo (100, 20, 35, [
  "* Eu não acredito nisso!   ", 
  "* Meu próprio monitor se viran\ndo contra mim??   ",
  "* Eu terei minha vingança!   ",
  "> Prof. Hanniman escolheu...\nASCENSÃO INTERATÔMICA!   ",
])

class CaixaDialogo extends Caixa {
  constructor(x, y, h, w, frases = [], veloc = 0.2, noBorder = 0) {
    super(x, y, h, w, "white", "?", "black", noBorder, 1, 0);
    this.frases = frases;
    this.n = 0;
    this.g = 0;
    this.veloc = veloc;
    this.velocidade_Original = veloc;
  }
  passarFrase() {
    if (this.n >= this.frases.length) { 
      [this.n, this.g] = [0, 0];
      return true;
    };
    this.texto = "\n"+this.frases[this.n].substring(0, this.g);
    if (this.g >= this.frases[this.n].length) {
      this.g = 0;
      this.n++;
      if (this.n == this.frases.length-1) {
        preJogo.elementos[1].img = loadImage("./Sprites/Hann/hanOlho.gif");
      }
    }
    // VELOCIDADE TEXTO
    this.g += this.veloc;
    return false;
  }
  acelerar() {
    if (mouseIsPressed) {
      this.veloc = 1.5;
    } else {
      this.veloc = this.velocidade_Original;
    }
  }
}
