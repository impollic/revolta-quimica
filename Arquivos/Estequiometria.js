let projeteis_estequiometricos = [];

class Area_Estequiometrica {
    constructor(x, y, toX, toY) {
        this.x = x;
        this.y = y;
        this.toX = toX;
        this.toY = toY;
        this.d = 10;
        this.dOriginal = this.d;
        this.velocidade_aumento = 1.5;
        this.velocidade_aumento_neg = -1.5;
        this.velocidade_movimento = 3;
    }
    mostrar() {
        push();
            strokeWeight(3);
            fill("rgba(123, 17, 17, 0.25)");
            stroke("rgb(99, 10, 10)");
            circle(this.x, this.y, this.d);
        pop();
    }
    mover () {
        if (dist(this.x, this.y, this.toX, this.toY) < 5 ) return false;
        if (this.x < this.toX) {
            this.x += this.velocidade_movimento;
        } else {
            this.x -= this.velocidade_movimento;
        }
        if (this.y < this.toY) {
            this.y += this.velocidade_movimento;
        } else {
            this.y -= this.velocidade_movimento;
        }
        return true;
    }
    aumentarDiametro () {
        if (this.d / this.dOriginal > 8) this.velocidade_aumento = this.velocidade_aumento_neg;
        this.d += this.velocidade_aumento;
        if (this.d < 0) return false; 
        return true;
    }
    colidiu () {
        return (dist(this.x, this.y, apollo.x, apollo.y) < 10 + this.d/2) && (this.d !== this.dOriginal);
    }
    static adicionar_area () {
        for (let i = 0; i<10; i++) {
            projeteis_estequiometricos.push(new Area_Estequiometrica(random(0, width), random(0, height), random(width/2 - 140, width/2 + 140), random(height/2 - 70, height/2 + 210)))
        }
    }
}
let area_vezes_repetida = 1;
