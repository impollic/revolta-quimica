// CARREGANDO JOGO
function sairJogo() {
  document.getElementById('jogo').innerHTML = `<p>404 Game Not Found :/ </p>`;
}
// CARREGANDO AS MÍDIAS
function preload() {
  somClique = loadSound('./Sons/click1.mp3');
  dano = loadSound('./Sons/dano.mp3');
  cutscene = createVideo('./Sprites/Cutscene/cutscene.mp4');

  // PRELOAD ALL IMAGES INTO CACHE
  ImageCache.preload([
    "./Sprites/Hann/hanCora.gif",
    "./Sprites/Hann/hanFalando.gif",
    "./Sprites/Hann/hanOlho.gif",
    "./Sprites/Hann/hanIdle.gif",
    "./Sprites/Hann/hanBraco.gif",
    "./Sprites/Hann/hanBracos.gif",
    "./Sprites/Hann/hanCansado.gif",
    "./Sprites/Hann/hanCanFalando.gif",
    "./Sprites/Personagens/emi32v1.png",
    "./Sprites/Personagens/emi32v2.png",
    "./Sprites/Personagens/emi32v3.png",
    "./Sprites/Personagens/emilly.png",
    "./Sprites/Personagens/pollic2.gif",
    "./Sprites/Personagens/pollic3.gif",
    "./Sprites/Personagens/pollicATK.gif",
    "./Sprites/pendul.gif",
    "./Sprites/pendulQ.png",
    "./Sprites/intro.png",
    "./Sprites/jogar.png",
    "./Sprites/atomAzul.png",
    "./Sprites/atomVerde.png",
    "./Sprites/atomVermelho.png",
    "./Sprites/entalpia1.png",
    "./Sprites/entalpia2.png",
    "./Sprites/ionizante.png",
    "./Sprites/oxired.png",
    "./Sprites/esferaEletrostatica.png",
    "./Sprites/Feixes/ing_right.png",
    "./Sprites/Feixes/ing_left.png",
    "./Sprites/Feixes/ingR_right.png",
    "./Sprites/Feixes/ingR_left.png",
    "./Sprites/Feixes/ing_down.png",
    "./Sprites/Feixes/ing_up.png",
    "./Sprites/Feixes/ingR_down.png",
    "./Sprites/Feixes/ingR_up.png"
  ]);
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
  ESTE_CANVAS = document.querySelector('canvas');

  // VOLUME DAS MÍDIAS
  somClique.setVolume(0.05);
  dano.setVolume(0.8);
  cutscene.hide();
  cutscene.volume(0.2);

  // PLAYER (velocidade alterada para 12)
  apollo = new Personagem (width/2, height/2, 20, 5, 10, 12, [ImageCache.load('./Sprites/pendul.gif')]);

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
let _loadingHidden = false;
function draw() {
  let dt = deltaTime / 16.667;
  if (!_loadingHidden) {
    _loadingHidden = true;
    const el = document.getElementById('estadoCarregamento');
    el.style.opacity = '0';
    setTimeout(() => el.style.display = 'none', 300);
  }
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
          preJogo.elementos[1].img = ImageCache.load("./Sprites/Hann/hanFalando.gif");
          irPara(loreContada, lab);
        } else {
          if (caixa.n == 3) loreContada.elementos[1].img = ImageCache.load('./Sprites/Personagens/emi32v2.png');
          if (caixa.n == 7) loreContada.elementos[1].img = ImageCache.load('./Sprites/Personagens/emi32v3.png');
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
          preJogo.elementos[1].img = ImageCache.load("./Sprites/Hann/hanFalando.gif");
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
      apollo.mover(dt);

      // ATAQUE DE ASCENSÃO INTERATÔMICA 
      if (AtaqueHan == "ASCENSÃO INTERATÔMICA") {
        if (v < 7) {
          ascensaoSpawnTimer += deltaTime;
          if (ascensaoSpawnTimer >= 2000) {
            ascensaoSpawnTimer -= 2000;
            for (let j = 1; j <= 3; j++) {
              for (let i = 1; i <= 5; i++) {
                atomos.push(new Atom(i * width / 5 - 60, -10));
              }
            }
            v++;
          }
        }
        if (atomos.length == 0 && v > 3) {
          if (exploOne !== "PARE!") {
            exploOne = false;
          }
          explosion(dt);        
        }
        for (let i = atomos.length - 1; i >= 0; i--) {
          let a = atomos[i];
          a.desenhar(); 
          a.mover(dt); 
          if (a.colidir()) {
            atomos.splice(i, 1);
          }
        }
      }
      // ATAQUE DE MANIPULAÇÃO INORGÂNICA
      if (AtaqueHan == "MANIPULAÇÃO INORGÂNICA") {
        for (let i = atomos.length - 1; i >= 0; i--) {
          let a = atomos[i];
          a.desenhar(); 
          if (!a.mover(dt)) {
            atomos.splice(i, 1);
            if (atomos.length == 0) {
              for(let j = 0; j<3; j++) {
                if (raiosInorganicos.length) {
                  atomos.push(raiosInorganicos.shift());
                } else {
                  atomos.length = 0;
                }
              }
            }
          } else if (a.colidiu()) {
            atomos.splice(i, 1);
            apollo.vida -= (a.cor == "red")?2:1;
            dano.play();
            if (apollo.vida <= 0) {
              apollo.vivo = false;
            }
          }
        }
        if (!atomos.length) {
          if (exploOne !== "PARE!") {
            exploOne = false;
          }
          explosion(dt);
        }
      }
      // DESCARGA VOLTAICA
      if (AtaqueHan == "DESCARGA VOLTAICA") {
        if (descarga_vezes_repetida >= 7) {
          if (exploOne !== "PARE!") exploOne = false;
          explosion(dt);
          return;
        }
        let [ descarga_comum_parou_mover, descarga_eletrica_parou_mover ] = [0, 0];
        for (let descarga of descargas) {
          descarga.mostrar();
          if (!descarga.moverPara(dt)) {
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
          explosion(dt);
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
          if (!area.mover(dt)) {
            area_parou_mover++;
          }
        }
        if (area_parou_mover == 10) {
          for (let area of projeteis_estequiometricos) {
            if (!area.aumentarDiametro(dt)) {
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
