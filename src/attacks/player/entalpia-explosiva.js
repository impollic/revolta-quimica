class EntalpiaExplosiva extends Ataques {
    constructor(x, y, toX, toY) {
        super("ENTALPIA EXPLOSIVA", 1, x, y, toX, toY);
        this.vx = 5;
        this.vy = 5;
        this.proj = [];
        for(let i = 0; i < 20; i++) {
            this.proj.push(new Ataques("Partícula", 0, this.toX, this.toY));
        }
        this.img = ImageCache.get('./Sprites/entalpia1.png');
    }
    desenhar () {
      image(this.img, this.x - 16, this.y - 16, 32, 32);
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
    explodir (dt = 1) {
        this.proj.forEach(p => {
            p.desenhar();
            p.atualizar(dt);
        });
    }
}