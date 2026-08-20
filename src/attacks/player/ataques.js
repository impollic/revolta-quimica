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

        this.img_default = ImageCache.get('./Sprites/entalpia2.png');
    }
    desenhar() {
      image(this.img_default, this.x - 16, this.y - 16, 32, 32);
    }
    atualizar (dt = 1) {
        this.x += this.random_vx * dt;
        this.y += this.random_vy * dt; 
    }
}
