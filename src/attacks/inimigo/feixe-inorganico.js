class FeixeInorganico {
  constructor(x, y, h, w, vx, vy, cor = "white") {
    this.x = x 
    this.y = y;
    this.h = h;
    this.w = w;
    this.cor = cor;
    this.vx = vx;
    this.vy = vy;

    if (!this.vy) {
      if (this.cor == "white") {
        if (this.vx > 0) {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-comum/feixe_right.png');
        } else {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-comum/feixe-left.png');
        }
      } else {
        if (this.vx > 0) {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-right.png');
        } else {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-left.png');
        }
      }
    } else {
      if (this.cor == "white") {
        if (this.vy > 0) {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-comum/feixe-down.png');
        } else {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-comum/feixe_up.png');
        }
      } else {
        if (this.vy > 0) {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-down.png');
        } else {
          this.img = ImageCache.get('./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-up.png');
        }
      }
    }   
    }
  desenhar() {
    push();
      strokeWeight(0);
      fill(this.cor);
      if (this.img) {
        image(this.img, this.x, this.y, this.w, this.h);
      }
    pop();
  }
  mover(dt = 1) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    if (this.y > height || this.y < - 300 || this.x < - 300 || this.x + this.w > width + 250) {
      return false;
    }
    return true;
  }
  colidiu() {
    // Fórmula de colisão entre circulo e retangulo 
    const pontoMaisProximoX = Math.max(this.x, Math.min(apollo.x, this.x + this.w));
    const pontoMaisProximoY = Math.max(this.y, Math.min(apollo.y, this.y + this.h));
    const distancia = (apollo.x - pontoMaisProximoX) ** 2 + (apollo.y - pontoMaisProximoY) ** 2;
    return distancia <= 10 ** 2;
  }
}

class FeixeInorganicoMeio extends FeixeInorganico {
  constructor (y, h, w, vy, cor, desloca = random(120, -120)) {
    if (abs(desloca) < 80) {
      let n = (parseInt(random(0, 10))%2==0 ? 100 : -100)
      super(width/2-10 + n + random(80, -80), y, h, w, 0, vy, cor);
    } else {
      super(width/2-10 + desloca, y, h, w, 0, vy, cor);
    }
  }
}

function GETraiosInorganicos () {
    raiosInorganicos = [ 
        new FeixeInorganico(120, 0, 200, 20, 0, 20),
        new FeixeInorganico(70, -200, 200, 20, 0, 20),
        new FeixeInorganico(20, -400, 200, 20, 0, 20),
        new FeixeInorganico(460, 0, 200, 20, 0, 20),
        new FeixeInorganico(510, -200, 200, 20, 0, 20),
        new FeixeInorganico(560, -400, 200, 20, 0, 20),
        new FeixeInorganico(width/2-140 + 25,-200, 150, 20, 0,25, "red" ),
        new FeixeInorganico(width/2-10, -200,150, 20, 0, 25, "red" ),
        new FeixeInorganico(width/2+120 - 25,-200, 150, 20, 0, 25, "red" ),
    ];
    for (let i = 0; i<8; i++) {
        let n = (parseInt(random(0, 10))%2==0 ? -200: height-10);
        raiosInorganicos.push(
            new FeixeInorganicoMeio( n, 150, 20, (n<0)?15:-15, "white"),
            new FeixeInorganicoMeio( n, 150, 20, (n<0)?20:-20, "red"),
            new FeixeInorganicoMeio( n, 150, 20, (n<0)?15:-15, "white")
        )
    } 
    for (let i = 0; i<10; i++) {
        let n = (parseInt(random(0, 10))%2==0 ? -190: width);
        raiosInorganicos.push(
            new FeixeInorganico(n, random(height/2-70, height/2 + 210), 20, 150, (n == -190)?15:-15, 0, "white" ),
            new FeixeInorganico(n, random(height/2-70, height/2 + 210), 20, 150, (n == -190)?25:-25, 0, "red" ),
            new FeixeInorganico(n, random(height/2-70, height/2 + 210), 20, 150, (n == -190)?15:-15, 0, "white" )
        )
    } 
}