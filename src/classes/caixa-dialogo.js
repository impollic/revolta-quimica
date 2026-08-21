class CaixaDialogo extends Caixa {
  constructor(x, y, h, w, frases = [], veloc = 0.2, noBorder = 0) {
    super(x, y, h, w, "white", "?", "black", noBorder, 1, 0);
    this.frases = frases;
    this.n = 0;
    this.g = 0;
    this.veloc = veloc;
    this.velocidade_Original = veloc;
    this.pronta = false;
  }
  reiniciar() {
    [this.n, this.g] = [0, 0];
    this.pronta = false;
    this.texto = "";
  }
  passarFrase() {
    if (this.n >= this.frases.length) {
      this.reiniciar();
      return true;
    }
    const fraseAtual = this.frases[this.n];
    if (this.pronta) {
      if (entradaDialogoAgora) {
        this.g = 0;
        this.n++;
        this.pronta = false;
        if (this.n >= this.frases.length) {
          this.reiniciar();
          return true;
        }
      }
      return false;
    }
    if (entradaDialogoAgora) {
      this.g = fraseAtual.length;
    } else {
      this.g += this.veloc * (typeof dt !== 'undefined' ? dt : 1);
    }
    if (this.g >= fraseAtual.length) {
      this.g = fraseAtual.length;
      this.pronta = true;
    }
    this.texto = "\n" + fraseAtual.substring(0, this.g);
    return false;
  }
  acelerar() {
    if (!this.pronta && keyIsDown(90)) {
      this.veloc = 1.5;
    } else {
      this.veloc = this.velocidade_Original;
    }
  }
  desenhar() {
    super.desenhar();
    if (this.pronta && this.n < this.frases.length && frameCount % 60 < 30) {
      push();
      noStroke();
      fill(255);
      const px = this.x + this.w - 26;
      const py = this.y + this.h - 22;
      triangle(px, py, px + 16, py, px + 8, py + 10);
      pop();
    }
  }
}
