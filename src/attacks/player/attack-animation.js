const PERSONAGEM_ATACAR_ANIMACAO = document.getElementById('personagem-atacar-animacao');
let ESTE_CANVAS;

function ativarAnimacaoAtaque (imagem) {
  ESTE_CANVAS.style.filter =  'brightness(0.8)';

  PERSONAGEM_ATACAR_ANIMACAO.style.backgroundImage = `url('${imagem}')`;
  PERSONAGEM_ATACAR_ANIMACAO.style.display = 'block';
  PERSONAGEM_ATACAR_ANIMACAO.style.animation = '3s animacaoLuta ease-out';
  setTimeout(() => {
    ESTE_CANVAS.style.filter =  'brightness(1)';
  }, 2700)
  setTimeout(() => {
    PERSONAGEM_ATACAR_ANIMACAO.style.animation = '';
    PERSONAGEM_ATACAR_ANIMACAO.style.display = 'none';
  }, 3000);
}
