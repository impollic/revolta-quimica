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
      this.img = ImageCache.get(imagem);
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