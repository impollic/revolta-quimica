// INTERVALO DA ASCENSÃO INTERATÔMICA
function acionarIntervalo() {

  let atirar = setInterval(() => {
    if (AtaqueHan == "ASCENSÃO INTERATÔMICA") {
      for (let j = 1; j <=3; j++) {
        for (let i = 1; i<=5; i++) {
          atomos.push(new Atom (i*width/5 - 60,-10));
        }
      }
    }
    v++;
    if (v>=7) {
      // Encerrar o próprio intervalo
      clearInterval(atirar);
    }
  }, 2000);

}

// ANIMAÇÃO DO JOGADOR
let JOGADOR_ANIMACAO_ATIVOU = false;

// EXPLOSÃO DE DIFERENTES ATAQUES 
function explosion() { 
  if (!JOGADOR_ANIMACAO_ATIVOU) {
    JOGADOR_ANIMACAO_ATIVOU = true;
    ativarAnimacaoAtaque('./Sprites/Personagens/pollicATK.gif');
    gameplay.elementos[2].img = hanCoraSprite;
  }


  energias.forEach(e => {
    if (! e.mover()){
      e.desenhar();
    }
    push();
      fill("white");
      strokeWeight(0);
      text(e.nome, width/2 - 140, height - 20);
    pop();
  });

  // RETORNO / FIM DO ATAQUE
  if (!exploOne) {
    setTimeout(() => {
      if (AtaqueHan == "ASCENSÃO INTERATÔMICA") {
        hanniman.dialogo = [
          "* Hahaha!   ",
          "* Você pensou que iria me derro\ntar tão fácil assim?    ",
          "* Veja do que um químico \né capaz!    ",
          "> Prof. Hanniman escolheu...\nMANIPULAÇÃO INORGÂNICA!    "
        ];

        musica_batalha_atual.stop();
        musica_batalha_atual = lastsur;
      } 
      if (AtaqueHan == "MANIPULAÇÃO INORGÂNICA") {
        hanniman.dialogo = [
          "* Você é bem insistente!   ",
          "* Vamos ver até onde você\naguenta, que tal?    ",
          "* Não terei pena.  ",
          "> Prof. Hanniman escolheu...\nDESCARGA VOLTAICA!    "
        ];
        apollo.vida = 20;
      }
      if (AtaqueHan == "DESCARGA VOLTAICA") {
        hanniman.dialogo = [
          "* Toda essa luta está me dei\nxando cansado...    ",
          "* Sua resistência é admirável, \nmas inútil!    ",
          "* Agora, testemunhe o verdadei\nro poder da química...    ",
          "> Prof. Hanniman escolheu...\nCOLAPSO ESTEQUIOMÉTRICO!    "
        ];

        musica_batalha_atual.stop();
        musica_batalha_atual = goingdown;

      }
      if (AtaqueHan == "COLAPSO ESTEQUIOMÉTRICO") {
        hanniman.dialogo = [
          "* Você realmente acha que tem \nchance contra mim?    ",
          "* Prepare-se para o fim, pois \nnão há mais volta.    ",
          "* Esse será o último erro \nda sua vida...    ",
          "> Prof. Hanniman escolheu...\nNAOSEI!    "
        ];

        
        apollo.vida = 20;
        
      }
      
      reset();
      energias = [];

      //MUDANÇAS
      if (AtaqueHan == "DESCARGA VOLTAICA") {
        irPara(gameplay, recVida);
      } else if (AtaqueHan == "FINAL") {
        irPara(gameplay, fimJogo);
      } else {
        irPara(gameplay, menu);
        // MUDANÇA
      }

    }, 7000);
    exploOne = "PARE!";
  }
}

// RESETAR TUDO PARA O DEFAULT
function reset() {
  v = 0;
  energias = [];
  exploOne = true;
  JOGADOR_ANIMACAO_ATIVOU = false;
  atomos = [];
  apollo.x = width/2;
  apollo.y = height/2;
  hanniman.g = 0;
  hanniman.n = 0;
  AtaqueHan = novoAtaqueHan(AtaqueHan);


  preJogo.elementos[3].texto = `\nHP: ${hanniman.vida}/${hanniman.vidaOriginal}\nATK:${hanniman.ataque}\nDEF:${hanniman.defesa}\nLV:20`;
  preJogo.elementos[6].frases = hanniman.dialogo;
  preJogo.elementos[4].texto = `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`;
  preJogo.elementos[5].w = 120 * apollo.vida/apollo.vidaOriginal;
  escolhas.elementos[6].texto = `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`;
  escolhas.elementos[7].w = 120 * apollo.vida/apollo.vidaOriginal;

  if (AtaqueHan !== 'COLAPSO ESTEQUIOMÉTRICO') {
    preJogo.elementos[1].img = loadImage("./Sprites/Hann/hanFalando.gif");
  } else {
    preJogo.elementos[1].img = loadImage("./Sprites/Hann/hanCanFalando.gif");
  }


  gameplay.elementos[2].img = hanSpriteGame();
  menu.elementos[menu.elementos.length-1].w = 120 * apollo.vida/apollo.vidaOriginal;
  menu.elementos[menu.elementos.length-2].texto = `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`;
  inventario.elementos[0].texto = `\n * Apollo *\n  LV 10\n  HP ${apollo.vida}/${apollo.vidaOriginal}\n  EXP 33`;


  carregarEnergias();
}

// MUDAR SPRITE DE HANNIMAN APÓS CADA BATALHA
function hanSpriteGame () {
  switch (AtaqueHan) {
    case "ASCENSÃO INTERATÔMICA":
      return loadImage("./Sprites/Hann/hanIdle.gif");
      break;
    case "MANIPULAÇÃO INORGÂNICA":
      return loadImage("./Sprites/Hann/hanBraco.gif");
      break;
    case "DESCARGA VOLTAICA":
      return loadImage("./Sprites/Hann/hanBracos.gif");
      break;
    case "COLAPSO ESTEQUIOMÉTRICO":
      return loadImage("./Sprites/Hann/hanCansado.gif");
      break;
      
  }
}

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
