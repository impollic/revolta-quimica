class Atom {
  constructor (x, y, escalaVelocidade = 1) {
    this.x = x;
    this.baseX = x;
    this.y = y;
    this.vy = random(3, 4) * escalaVelocidade;
    let num = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.cor = (num == 1) ? "blue" : (num == 2) ? "green" : "red";
    this.sprite = ImageCache.get((num == 1) ? './assets/sprites/attacks/atomos/atomo-azul.png' : (num == 2) ? './assets/sprites/attacks/atomos/atomo-verde.png' : './assets/sprites/attacks/atomos/atomo-vermelho.png');

    // VERMELHOS SÃO MAIORES E BATEM MAIS FORTE
    this.tamanho = (this.cor == "red") ? 34 : 28;
    this.raio = this.tamanho * 0.55;
    this.dano = (this.cor == "red") ? 3 : 2;
    // SENOIDAL (TOUHOU): O ÁTOMO ONDULA EM VOLTA DO baseX ENQUANTO CAI,
    // CADA UM COM SUA PRÓPRIA AMPLITUDE, FREQUÊNCIA E FASE
    this.swayAmp = random(8, 16);
    this.swayFreq = random(0.03, 0.06);
    this.swayPhase = Math.random() * Math.PI * 2;
  }
  desenhar() {
   image(this.sprite, this.x - this.tamanho / 2, this.y - this.tamanho / 2 , this.tamanho, this.tamanho);
  }
  mover(dt = 1) {
    // O X SEGUE UMA SENOIDE EM TORNO DO baseX; O Y CAI EM LINHA RETA
    this.swayPhase += this.swayFreq * dt;
    this.x = this.baseX + Math.sin(this.swayPhase) * this.swayAmp;
    this.y += this.vy * dt;
  }
  colidir() {
    if (dist(this.x, this.y, apollo.x, apollo.y) < this.raio ) {
      apollo.vida -= this.dano;
      dano.play();
      if (apollo.vida<=0) apollo.vivo = false;
      return true;
    }
    if (this.x + this.raio > width || this.x - this.raio < 0 || this.y + this.raio > height) {
      return true;
    }
    return false;
  }
}

let atomos = [];
