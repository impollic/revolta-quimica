// CARREGANDO JOGO
function sairJogo() {
  document.getElementById('jogo').innerHTML = `<p>404 Game Not Found :/ </p>`;
}
setTimeout(() => document.getElementById('estadoCarregamento').style.display='none', 4900);

// CARREGANDO AS MÍDIAS
function preload() {
  somClique = loadSound('./Sons/click1.mp3');
  dano = loadSound('./Sons/dano.mp3');

  roadlesstaken = loadSound('./musicasPersona/roadlesstaken.mp3');
  takeover = loadSound('./musicasPersona/takeover.mp3');
  cutscene = createVideo('./Sprites/Cutscene/cutscene.mp4');
  goingdown = loadSound('./musicasPersona/goingdown.mp3');
  massdestruc = loadSound('./musicasPersona/breakout.mp3'); //massdestruc
  lastsur = loadSound('./musicasPersona/lastsur.mp3');
  youstrong = loadSound('./musicasPersona/youstrong.mp3');
  fullmoon = loadSound('./musicasPersona/fullmoon.mp3');
  axegrind = loadSound('./musicasPersona/axegrind.mp3');
  colornightins = loadSound('./musicasPersona/colornightins.mp3');
  colornight = loadSound('./musicasPersona/colornight.mp3');

  musica_batalha_atual = massdestruc;

  fonteSans = loadFont('./Fonte/determination-mono-web-font/DeterminationSansWebRegular-369X.ttf');
  hanCoraSprite = loadImage("./Sprites/Hann/hanCora.gif");
}

// FUNÇÃO SETUP
function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('container-canvas');
  
  // CONFIGURAÇÃO DO CANVAS
  textSize(30);
  textFont(loadFont('./Fonte/determination-mono-web-font/DeterminationMonoWebRegular-Z5oq.ttf'));
  noSmooth();
 
  //para filtros
  ESTE_CANVAS = document.querySelector('canvas');;

  // VOLUME DAS MÍDIAS
  somClique.setVolume(0.05);
  dano.setVolume(0.8);
  cutscene.hide();
  cutscene.volume(0.2);
  [takeover, goingdown, lastsur, massdestruc, roadlesstaken, youstrong, axegrind, fullmoon, colornightins, colornight].forEach(msc => msc.setVolume(0.1));
  [takeover].forEach(msc => msc.setVolume(0.05));
  goingdown.setVolume(0.25);
  lastsur.setVolume(0.25);
  //MÚSICA DO MENU (NÃO TOCA IMEDIATAMENTE)
  fullmoon.play();
  
  // PLAYER (velocidade alterada para 12)
  apollo = new Personagem (width/2, height/2, 20, 5, 10, 12, [loadImage('Sprites/pendul.gif')]);

  // DEFINIÇÃO DE FUNÇÕES RECARREGÁVEIS
  carregarPaginas();
  GETraiosInorganicos();
  novoAtaqueHan  = (atk) => {
    if (atk == null) {
      return "ASCENSÃO INTERATÔMICA";
    }
    if (atk == "ASCENSÃO INTERATÔMICA") {
      for(let i = 0; i<6; i++) {
        atomos.push(raiosInorganicos.shift());
      }
      return "MANIPULAÇÃO INORGÂNICA";
    }
    if (atk == "MANIPULAÇÃO INORGÂNICA") {
      Descarga_Atomica.Criar_Descarga();
      return "DESCARGA VOLTAICA";
    }
    if (atk == "DESCARGA VOLTAICA") {
      Area_Estequiometrica.adicionar_area();
      return "COLAPSO ESTEQUIOMÉTRICO";
    }
    if (atk == "COLAPSO ESTEQUIOMÉTRICO") {
      return "FINAL";
    }
  }
  AtaqueHan = novoAtaqueHan(null);  //"MODO TESTE"
  gameplay.elementos[2].img = hanSpriteGame();
  
  //Descarga_Atomica.Criar_Descarga();
  
}

// LOOP PRINCIPAL
function draw() {
  background(0);
  // MENU
  if (menu.ativo) {
    menu.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) {
        switch(caixa.texto) {
          case '  AJUDA':
            irPara(menu, ajuda);
          break;
          case '  CREDIT':
            irPara(menu, creditos);
          break;
          case '  LUTAR':
            irPara(menu, escolhas);
          break;
          case '  ITEM':
            irPara(menu, inventario);
          break;
        }
      }
    }); 
  }
  // ÁREA DE AJUDA
  if (ajuda.ativo) {
    ajuda.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) {
        irPara(ajuda, menu)
      }
    });  
  }
  // INVENTÁRIO
  if (inventario.ativo) {
    inventario.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) {
        irPara(inventario, menu)
      }
    })
  }
  // FIM DE JOGO
  if (fimJogo.ativo) {
    fimJogo.elementos.forEach(caixa => {
      caixa.desenhar();
    })
  }

  // ESCOLHAS DOS ATAQUES
  if (escolhas.ativo) {
    escolhas.elementos.forEach(caixa => {
      caixa.desenhar()
      if (caixa.apertavel && caixa.apertado()) {
        if (caixa.texto == ">") {
          irPara(escolhas, menu);
        } else {
          optEscolhida = caixa.texto;
          irPara(escolhas, preJogo);
        }
      }
    });
  }
  // INTRODUÇÃO
  if (intro.ativo) {
    intro.elementos.forEach(caixa => {
      caixa.desenhar()
      if (caixa.apertavel && caixa.apertado()) {
        irPara(intro, loreContada);
      }
    });
  }
  // DIALOGO PRE-GAMEPLAY
  if (preJogo.ativo) {
    preJogo.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa instanceof CaixaDialogo) {
        if (caixa.passarFrase()) {
          hanniman.vida -= 25;
          carregarEnergias();
          irPara(preJogo, gameplay);
        }
        caixa.acelerar();
      };
    });
  }
  // DIALOGO DE PRE-MENU
  if (loreContada.ativo) {
    loreContada.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa instanceof CaixaDialogo) {
        caixa.acelerar();
        if (caixa.passarFrase()) {
          preJogo.elementos[1].img = loadImage("./Sprites/Hann/hanFalando.gif");
          irPara(loreContada, lab);
        } else {
          if (caixa.n == 3) loreContada.elementos[1].img = loadImage('./Sprites/Personagens/emi32v2.png');
          if (caixa.n == 7) loreContada.elementos[1].img = loadImage('./Sprites/Personagens/emi32v3.png');
        }
      };
    })
  }
  // CUTSCENE DO LABORATÓRIO
  if (lab.ativo) {
    if (playCutscene) {
      playCutscene = false;
      cutscene.play();
      setTimeout( () => {
        irPara(lab, menu);
      }, 8000);
    }
    square(width/2 - 155, height/2 - 155, 310);
    image(cutscene, width/2 - 150, height/2 - 150, 300, 300);
  }
  // DIÁLOGO DE RECUPERAÇÃO DE VIDA 1
  if (recVida.ativo) {
    recVida.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa instanceof CaixaDialogo) {
        caixa.acelerar();
        if (caixa.passarFrase()) {
          preJogo.elementos[1].img = loadImage("./Sprites/Hann/hanFalando.gif");
          irPara(recVida, menu); 
          // MUDANÇAS
        } 
      }
    })
  }
  // TELA DE GAME OVER
  if (gameOver.ativo) {
    gameOver.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) {
        window.location.reload();
      }
    })
  }
  // TELA DE CREDITOS
  if (creditos.ativo) { 
    creditos.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) {
        irPara(creditos, menu);
      }
    })
    
  }

  // GAMEPLAY
  if (gameplay.ativo) {
    gameplay.elementos.forEach(caixa => caixa.desenhar());
    if (accONe) {
       // MUDE SE FOR INICIAR NO COMBATE
       //acionarIntervalo();
       //accONe = false;
      }
      gameplay.elementos[0].texto = `HP         ${apollo.vida}/${apollo.vidaOriginal}`;
      gameplay.elementos[1].w = 120 * apollo.vida/apollo.vidaOriginal;

    push();
      stroke("white");
      strokeWeight(2);
      fill(0);
      if (!apollo.vivo) {
        apollo.vivo = true;
        apollo.vida = 20;
        return irPara(gameplay, gameOver);
        
      }
      square(width/2 - 140, height/2 - 70, 280);

      apollo.mostrar();
      apollo.mover();

      // ATAQUE DE ASCENSÃO INTERATÔMICA 
      if (AtaqueHan == "ASCENSÃO INTERATÔMICA") {
        if (atomos.length == 0 && v > 3) {
          if (exploOne !== "PARE!") {
            exploOne = false;
          }
          explosion();        
        }
        atomos.forEach(a => {
          a.desenhar(); 
          a.mover(); 
          a.colidir();
        });
      }
      // ATAQUE DE MANIPULAÇÃO INORGÂNICA
      if (AtaqueHan == "MANIPULAÇÃO INORGÂNICA") {
        atomos.forEach(a => {
          if (atomos.length) {
            a.desenhar(); 
            if (!a.mover()) {
              atomos.splice(atomos.indexOf(a), 1);
              if (atomos.length == 0) {
                for(let i = 0; i<3; i++) {
                  if (raiosInorganicos.length) {
                    atomos.push(raiosInorganicos.shift());
                  } else {
                    atomos.length = 0;
                  }
                }
              }
            }
            if (a.colidiu()) {
              atomos.splice(atomos.indexOf(a), 1);
              apollo.vida -= (a.cor == "red")?2:1;
              dano.play();
              if (apollo.vida <= 0) {
                apollo.vivo = false;
              }
            }
          } 
        });
        if (!atomos.length) {
          if (exploOne !== "PARE!") {
            exploOne = false;
          }
          explosion();
        }
      }
      // DESCARGA VOLTAICA
      if (AtaqueHan == "DESCARGA VOLTAICA") {
        if (descarga_vezes_repetida >= 7) {
          if (exploOne !== "PARE!") exploOne = false;
          explosion();
          return;
        }
        let [ descarga_comum_parou_mover, descarga_eletrica_parou_mover ] = [0, 0];
        for (let descarga of descargas) {
          descarga.mostrar();
          if (!descarga.moverPara()) {
            if (descarga instanceof Descarga_Atomica) {
              descarga_comum_parou_mover++;
            } else {
              descarga_eletrica_parou_mover++;
            }
          }
          if (descarga instanceof Descarga_Atomica_Eletricidade && descarga.colidiu()) {
            apollo.vida-=1;
            dano.play();
            if (apollo.vida <= 0) {
              apollo.vivo = false;
            }
          }
        }
        if (descarga_eletrica_parou_mover == 4) {
          descargas = [];
          Descarga_Atomica.Criar_Descarga();
          descarga_vezes_repetida++;
          descargas.forEach(d => d.velocidade = 2 + 0.2 * descarga_vezes_repetida)

          return;
        }
        if (descarga_comum_parou_mover == 4) {
          descargas.forEach(descarga => {
            if (descarga instanceof Descarga_Atomica) {
              descarga.adicionarFeixe();
            }
          })
        }
      }
      // COLAPSO ESTEQUIOMÉTRICO
      if (AtaqueHan == "COLAPSO ESTEQUIOMÉTRICO") { 

        if (area_vezes_repetida >= 10) {
          if (exploOne !== "PARE!") exploOne = false;
          explosion();
          return;
        }
        let [projeteis_parou_aumentar, area_parou_mover] = [0, 0];
        for (let area of projeteis_estequiometricos ) {
          area.mostrar();
          if (area.colidiu()) {
            apollo.vida-=1;
            dano.play();
            if (apollo.vida <= 0) apollo.vivo = false;  
          }
          if (!area.mover()) {
            area_parou_mover++;
          }
        }
        if (area_parou_mover == 10) {
          for (let area of projeteis_estequiometricos) {
            if (!area.aumentarDiametro()) {
              projeteis_parou_aumentar++;
            }
          }
        }
        if (projeteis_parou_aumentar == 10) {
          projeteis_estequiometricos = [];
          Area_Estequiometrica.adicionar_area();
          area_vezes_repetida++;
          projeteis_estequiometricos.forEach(d => d.velocidade_movimento = 3 + 0.2 * area_vezes_repetida);
        }
      }
      // MODO TESTE
      if (AtaqueHan == "MODO TESTE") { 

      }
    pop();
  }
}
