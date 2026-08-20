// ANIMAÇÃO DO JOGADOR
let JOGADOR_ANIMACAO_ATIVOU = false;

// EXPLOSÃO DE DIFERENTES ATAQUES 
function explosion(dt = 1) { 
  if (!JOGADOR_ANIMACAO_ATIVOU) {
    JOGADOR_ANIMACAO_ATIVOU = true;
    ativarAnimacaoAtaque('./Sprites/Personagens/pollicATK.gif');
    gameplay.elementos[2].img = ImageCache.get("./Sprites/Hann/hanCora.gif");
  }

  energias.forEach(e => {
    if (! e.mover(dt)){
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

        MusicManager.stop(musica_batalha_atual);
        musica_batalha_atual = 'lastsur';
      } 
      if (AtaqueHan == "MANIPULAÇÃO INORGÂNICA") {
        MusicManager.stop(musica_batalha_atual);
        musica_batalha_atual = 'axegrind';

        hanniman.dialogo = [
          "* Você é bem insistente!   ",
          "* Vamos ver até onde você\naguenta, que tal?    ",
          "* Não terei pena.  ",
          "> Prof. Hanniman escolheu...\nDESCARGA VOLTAICA!    "
        ];
        apollo.vida = 20;
      }
      if (AtaqueHan == "DESCARGA VOLTAICA") {
        MusicManager.stop(musica_batalha_atual);
        musica_batalha_atual = 'goingdown';

        hanniman.dialogo = [
          "* Toda essa luta está me dei\nxando cansado...    ",
          "* Sua resistência é admirável, \nmas inútil!    ",
          "* Agora, testemunhe o verdadei\nro poder da química...    ",
          "> Prof. Hanniman escolheu...\nCOLAPSO ESTEQUIOMÉTRICO!    "
        ];

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
      }

    }, 7000);
    exploOne = "PARE!";
  }
}
