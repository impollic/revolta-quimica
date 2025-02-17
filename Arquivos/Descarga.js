let descargas = [];

class Descarga_Atomica_Eletricidade {
    constructor(x, y, toX, toY, w, h, DIRECAO_X, DIRECAO_Y, ) {
        this.x = x;
        this.y = y;
        this.toX = toX;
        this.toY = toY;
        this.velocidade = 3;
        this.w = w;
        this.h = h;

        //this.vx = (DIRECAO_X > 0) ? 5 : (DIRECAO_X < 0) ? -5 : 0
        //this.vy = (DIRECAO_Y > 0) ? 5 : 0;

        this.velocidade_propagacao = 1;
    }
    mostrar() {
        push();
            stroke("#f2eb99");
            fill("#f2eb99");
            rect(this.x, this.y, this.w, this.h);
        pop();
    }
    moverPara() {
        //this.x += this.vx;
        //this.y += this.vy;
        if (this.h > this.w) {
            if (this.w == 0) return false;
            this.w += this.velocidade_propagacao;
            if (this.w > 21) {
                this.velocidade_propagacao*=-1;
            }
            return true;
        } else {
            if (this.h  == 0) return false;
            this.h += this.velocidade_propagacao;
            if (this.h > 21) {
                this.velocidade_propagacao*=-1;
            }
            return true;
        }
    }
    colidiu () {
        // Fórmula de colisão entre circulo e retangulo 
        const pontoMaisProximoX = Math.max(this.x, Math.min(apollo.x, this.x + this.w));
        const pontoMaisProximoY = Math.max(this.y, Math.min(apollo.y, this.y + this.h));
        const distancia = (apollo.x - pontoMaisProximoX) ** 2 + (apollo.y - pontoMaisProximoY) ** 2;
        return distancia <= 10 ** 2;
    }
}

class Descarga_Atomica {
    constructor(toX, toY) {
        this.x = random(0, width);
        this.y = random(0, height);
        this.toX = toX;
        this.toY = toY;
        this.velocidade = 2;
        this.sprite = loadImage("./Sprites/esferaEletrostatica.png");
        this.adicionou_uma_descarga = false;
    }
    mostrar() {
        image(this.sprite, this.x - 16, this.y - 16, 32, 32);
    }
    adicionarFeixe() {
        if (!this.adicionou_uma_descarga) {
            this.adicionou_uma_descarga = true;
        } else {
            return;
        }

        const DIRECAO_X = (this.toX == 500) ? this.toX + 300 : (this.toX == 100) ? this.toX - 300 : 0;
        const DIRECAO_Y = (this.toY == 170) ? this.toY + 300 : 0; 
        const TAMANHO_RAIO = 600;
        const TAMANHO_LATERAL = 1;

        const DESCARGA_ELETRICA = new Descarga_Atomica_Eletricidade((DIRECAO_X == this.toX + 300) ? this.x - TAMANHO_RAIO : this.x, this.y, DIRECAO_X, DIRECAO_Y, (DIRECAO_X == this.toX - 300 || DIRECAO_X == this.toX + 300) ? TAMANHO_RAIO : TAMANHO_LATERAL, (DIRECAO_Y == this.toY + 300) ? TAMANHO_RAIO : TAMANHO_LATERAL, (DIRECAO_X!==0) ? (DIRECAO_X == this.toX + 300) ? -5 : 5 : 0, DIRECAO_Y);

        descargas.push(DESCARGA_ELETRICA);
    }

    moverPara() {
        if (dist(this.x, this.y, this.toX, this.toY) < 10 ) return false;
        if (this.x < this.toX) {
            this.x += this.velocidade;
        } else {
            this.x -= this.velocidade;
        }
        if (this.y < this.toY) {
            this.y += this.velocidade;
        } else {
            this.y -= this.velocidade;
        }

        return true;
    }
    static Criar_Descarga () {
        descargas.push(
            new Descarga_Atomica(random(170, 445), 170),
            new Descarga_Atomica(500, random(230, 510)),
            new Descarga_Atomica(100, random(230, 510)),

            new Descarga_Atomica(random(170, 445), 170),
            //new Descarga_Atomica(500, random(230, 510)),
            //new Descarga_Atomica(100, random(230, 510)),

        )
    }
}
let descarga_vezes_repetida = 0;