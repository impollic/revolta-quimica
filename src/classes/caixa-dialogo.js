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
        preJogo.elementos[1].img = ImageCache.load("./Sprites/Hann/hanOlho.gif");
      }
    }
    // VELOCIDADE TEXTO
    this.g += this.veloc * (typeof dt !== 'undefined' ? dt : 1);
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
