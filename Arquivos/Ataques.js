class Ataques {
    // Entalpia Explosiva
    // Força Ionizante
    // Oxidação Reduzida
    constructor(nome, projDano, x, y, toX, toY) {
        this.nome = nome;
        this.projDano = projDano;
        
        this.x = x;
        this.y = y;
        this.toX = toX;
        this.toY = toY;

        this.random_vx = random(5, -5);
        this.random_vy = random(5, -5);
        this.random_d = random(5, 15);

        this.img_default = loadImage('./Sprites/entalpia2.png');
    }
    desenhar() {
      image(this.img_default, this.x - 16, this.y - 16, 32, 32);
    }
    atualizar () {
        this.x += this.random_vx;
        this.y += this.random_vy; 
    }

}
class EntalpiaExplosiva extends Ataques {
    constructor(x, y, toX, toY) {
        super("ENTALPIA EXPLOSIVA", 1, x, y, toX, toY);
        this.vx = 5;
        this.vy = 5;
        this.proj = [];
        for(let i = 0; i < 20; i++) {
            this.proj.push(new Ataques("Partícula", 0, this.toX, this.toY));
        }
        this.img = loadImage('./Sprites/entalpia1.png');
    }
    desenhar () {
      image(this.img, this.x - 16, this.y - 16, 32, 32);
    }
    mover() {
        if (dist(this.x, this.y, this.toX, this.toY) < 15) {
            this.explodir();    
            return true;
        }
        if (this.x > this.toX) {
            this.x -= this.vx;
        } else {
            this.x += this.vx;
        }
        if (this.y > this.toY) {
            this.y -= this.vy;
        } else {
            this.y += this.vy;
        }
        return false;
    }
    explodir () {
        this.proj.forEach(p => {
            p.desenhar();
            p.atualizar();
        });
    }
}
class OxidacaoReduzida extends Ataques {
  constructor(projDano, x, y, toX, toY, vn, vw) {
    super("OXIDAÇÃO REDUZIDA", projDano,x, y, toX, toY, vn = 3, vw = 3);
      this.vx = vn;
      this.vy = vw;
      this.img_default = loadImage('./Sprites/oxired.png');

      this.proj = [];

      // AJEITAR DEPOIS (PASSAR PARA O CONSTRUTOR)
      let atk = new Ataques('particula', 0, this.toX, this.toY);
      atk.img_default = loadImage('./Sprites/oxired.png');
      atk.random_vy = 2;
      this.proj.push(atk);
      
  }
  desenhar() {
    image(this.img_default, this.x - 16, this.y - 16, 32, 32);
  }
  mover() {
    if (dist(this.x, this.y, this.toX, this.toY) < 15) {
      this.explodir();    
      return true;
    } 
    if (this.x > this.toX) {
        this.x -= this.vx;
    } else {
        this.x += this.vx;
    }
    if (this.y > this.toY) {
        this.y -= this.vy;
    } else {
        this.y += this.vy;
    }
    return false;
  }
  explodir() {
    this.proj.forEach(p => {
      p.desenhar();
      p.atualizar();
     });
  }
}

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
          this.img = loadImage('./Sprites/Feixes/ing_right.png');
        } else {
          this.img = loadImage('./Sprites/Feixes/ing_left.png');
        }
      } else {
        if (this.vx > 0) {
          this.img = loadImage('./Sprites/Feixes/ingR_right.png');
        } else {
          this.img = loadImage('./Sprites/Feixes/ingR_left.png');
        }
      }
    } else {
      if (this.cor == "white") {
        if (this.vy > 0) {
          this.img = loadImage('./Sprites/Feixes/ing_down.png');
        } else {
          this.img = loadImage('./Sprites/Feixes/ing_up.png');
        }
      } else {
        if (this.vy > 0) {
          this.img = loadImage('./Sprites/Feixes/ingR_down.png');
        } else {
          this.img = loadImage('./Sprites/Feixes/ingR_up.png');
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
  mover() {
    this.x += this.vx;
    this.y += this.vy;
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
class ForcaIonizante extends Ataques {
  constructor(projDano, x, y, toX, toY, vn, vw) {
      super("FORÇA IONIZANTE", projDano,x, y, toX, toY, vn = 1, vw = 3);
      this.vx = vn;
      this.vy = vw;
      this.img_default = loadImage('./Sprites/ionizante.png');

      this.proj = [];
      for (let i = 0; i<2; i++) {
        // AJEITAR DEPOIS (PASSAR PARA O CONSTRUTOR)
        let atk = new Ataques('particula', 0, this.toX, this.toY);
        atk.img_default = loadImage('./Sprites/ionizante.png');
        atk.random_vx = (i%2==0) ? 5 : -5;
        atk.random_vy = random(1, -1);
        this.proj.push(atk);
      }
  }
  desenhar() {  
    image(this.img_default, this.x - 16, this.y - 16, 32, 32);
  }
  mover() {
      if (dist(this.x, this.y, this.toX, this.toY) < 15) {
        this.explodir();    
        return true;
      } 
      if (this.x > this.toX) {
          this.x -= this.vx;
      } else {
          this.x += this.vx;
      }
      if (this.y > this.toY) {
          this.y -= this.vy;
      } else {
          this.y += this.vy;
      }
      return false;
  }
  explodir() {
    this.proj.forEach(p => {
      p.desenhar();
      p.atualizar();
     });
  }
}

let energias = [];
function carregarEnergias () {
  // "\n\n ENTALPIA \nEXPLOSIVA"
  // "\n\n  FORÇA \nIONIZANTE"
  // "\n\n OXIDAÇÃO \n REDUZIDA"
  if (optEscolhida == "\n\n ENTALPIA \nEXPLOSIVA") {
    energias.push(
      new EntalpiaExplosiva(width/2 - 140, height/2, width/2, 112.5),
      new EntalpiaExplosiva(width/2 - 140, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(width/2 + 140, height/2, width/2, 112.5),
      new EntalpiaExplosiva(width/2 + 140, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(0, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(width, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(width, height/2, width/2, 112.5),
      new EntalpiaExplosiva(0, height/2, width/2, 112.5),
      new EntalpiaExplosiva(0, height/2 - 70, width/2, 112.5),
      new EntalpiaExplosiva(width, height/2 - 70, width/2, 112.5),
    );
  }
  if (optEscolhida == "\n\n  FORÇA \nIONIZANTE") {
    for (let j = 0; j< 5; j++) {
      for (let i = 1; i<= 8; i++) {
        energias.push(new ForcaIonizante(0, width/2 - 140 + 70*j, height + 15*i, width/2, 112.5));
      }
    } 
  }
  if (optEscolhida == "\n\n OXIDAÇÃO \n REDUZIDA") {
    for (let j = 0; j< 3; j++) {
      for (let i = 1; i<= 5; i++) {
        energias.push(new OxidacaoReduzida(0, -32*j, 120*i, width/2, 112.5));
      }
    }
    for (let j = 0; j< 3; j++) {
      for (let i = 1; i<= 5; i++) {
        energias.push(new OxidacaoReduzida(0, width +32*j, 120*i, width/2, 112.5));
      }
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



