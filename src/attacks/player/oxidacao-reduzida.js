class OxidacaoReduzida extends Ataques {
  constructor(projDano, x, y, toX, toY, vn, vw) {
    super("OXIDAÇÃO REDUZIDA", projDano,x, y, toX, toY, vn = 3, vw = 3);
      this.vx = vn;
      this.vy = vw;
      this.img_default = ImageCache.get('./assets/sprites/attacks/oxireducao/oxireducao.png');

      this.proj = [];

      // AJEITAR DEPOIS (PASSAR PARA O CONSTRUTOR)
      let atk = new Ataques('particula', 0, this.toX, this.toY);
      atk.img_default = ImageCache.get('./assets/sprites/attacks/oxireducao/oxireducao.png');
      atk.random_vy = 2;
      this.proj.push(atk);
      
  }
  desenhar() {
    image(this.img_default, this.x - 16, this.y - 16, 32, 32);
  }
  mover(dt = 1) {
    if (dist(this.x, this.y, this.toX, this.toY) < 15) {
      this.explodir(dt);    
      return true;
    } 
    if (this.x > this.toX) {
        this.x -= this.vx * dt;
    } else {
        this.x += this.vx * dt;
    }
    if (this.y > this.toY) {
        this.y -= this.vy * dt;
    } else {
        this.y += this.vy * dt;
    }
    return false;
  }
  explodir(dt = 1) {
    this.proj.forEach(p => {
      p.desenhar();
      p.atualizar(dt);
     });
  }
}