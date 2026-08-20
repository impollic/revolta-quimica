class Atom {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(1.5,-1.5);
    this.vy = random(3, 4);
    let num = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.sprite = ImageCache.get((num == 1) ? './Sprites/atomAzul.png' : (num == 2) ? './Sprites/atomVerde.png' : './Sprites/atomVermelho.png');
    
  }
  desenhar() {
   image(this.sprite, this.x - 16, this.y - 16 , 32, 32);
  }
  mover(dt = 1) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
  colidir() {
    if (dist(this.x, this.y, apollo.x, apollo.y) < 20 ) {
      apollo.vida -= 2;
      dano.play();
      if (apollo.vida<=0) apollo.vivo = false;
      return true;
    }
    if (this.x + 10 > width || this.x - 10 < 0 || this.y + 10 > height) {
      return true;
    }
    return false;
  }
}

let atomos = [];