class Inimigo extends Personagem {
  constructor (vd, atk, def, dialogo = []) {
    super(0, 0, vd, atk, def, 0, []);
    this.dialogo = dialogo;
  }
}
let hanniman = new Inimigo (100, 20, 35, [
  "* Eu não acredito nisso!   ", 
  "* Meu próprio monitor se viran\ndo contra mim??   ",
  "* Eu terei minha vingança!   ",
  "> Prof. Hanniman escolheu...\nASCENSÃO INTERATÔMICA!   ",
])