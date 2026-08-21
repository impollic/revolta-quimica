// CARREGANDO JOGO
function sairJogo() {
  document.getElementById('jogo').innerHTML = `<p>404 Game Not Found :/ </p>`;
}

// INSTRUÇÕES DE DIÁLOGO (DOM)
let _instrucoesDialogoVisivel = null;
function atualizarInstrucoesDialogo(visivel) {
  if (_instrucoesDialogoVisivel === visivel) return;
  _instrucoesDialogoVisivel = visivel;
  const el = document.getElementById('instrucoes-dialogo');
  if (el) el.classList.toggle('visivel', visivel);
}
// CARREGANDO AS MÍDIAS
function preload() {
  somClique = loadSound('./assets/sfx/click.mp3');
  dano = loadSound('./assets/sfx/damage.mp3');
  cutscene = createVideo('./assets/sprites/cutscene/animated-cutscene.mp4');

  // PRELOAD ALL IMAGES INTO CACHE
  ImageCache.preload([
    "./assets/sprites/characters/hanniman/hanniman-coracao.gif",
    "./assets/sprites/characters/hanniman/hanniman-falando.gif",
    "./assets/sprites/characters/hanniman/hanniman-olho.gif",
    "./assets/sprites/characters/hanniman/hanniman-idle.gif",
    "./assets/sprites/characters/hanniman/hanniman-braco.gif",
    "./assets/sprites/characters/hanniman/hanniman-bracos.gif",
    "./assets/sprites/characters/hanniman/hanniman-cansado.gif",
    "./assets/sprites/characters/hanniman/hanniman-cansado-falando.gif",
    "./assets/sprites/characters/emilly/emilly-idle.png",
    "./assets/sprites/characters/emilly/emilly-olho-fechado.png",
    "./assets/sprites/characters/emilly/emilly-chateada.png",
    "./assets/sprites/characters/emilly/emilly-menu.png",
    "./assets/sprites/characters/apollo/apollo-menu.gif",
    "./assets/sprites/characters/apollo/apollo-preparar-ataque.gif",
    "./assets/sprites/characters/apollo/apollo-atacando-animated.gif",
    "./assets/sprites/characters/apollo/pingente/pingente.png",
    "./assets/sprites/characters/apollo/pingente/pingente-quebrado.png",
    "./assets/sprites/intro/intro.png",
    "./assets/sprites/intro/jogar.png",
    "./assets/sprites/attacks/atomos/atomo-azul.png",
    "./assets/sprites/attacks/atomos/atomo-verde.png",
    "./assets/sprites/attacks/atomos/atomo-vermelho.png",
    "./assets/sprites/attacks/entalpia/entalpia-1.png",
    "./assets/sprites/attacks/entalpia/entalpia-2.png",
    "./assets/sprites/attacks/forca-ionizante/forca-ionizante.png",
    "./assets/sprites/attacks/oxireducao/oxireducao.png",
    "./assets/sprites/attacks/descarga-voltaica/esfera-eletrostatica.png",
    "./assets/sprites/attacks/feixes/feixe-comum/feixe_right.png",
    "./assets/sprites/attacks/feixes/feixe-comum/feixe-left.png",
    "./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-right.png",
    "./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-left.png",
    "./assets/sprites/attacks/feixes/feixe-comum/feixe-down.png",
    "./assets/sprites/attacks/feixes/feixe-comum/feixe_up.png",
    "./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-down.png",
    "./assets/sprites/attacks/feixes/feixe-vermelho/feixe-vermelho-up.png"
  ]);
}

// FUNÇÃO SETUP
function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('container-canvas');
  
  // CONFIGURAÇÃO DO CANVAS
  textSize(30);
  textFont(loadFont('./assets/fonts/determination-mono-web-regular.ttf'));
  noSmooth();
 
  //para filtros
  ESTE_CANVAS = document.querySelector('canvas');

  // VOLUME DAS MÍDIAS
  somClique.setVolume(0.05);
  dano.setVolume(0.8);
  cutscene.hide();
  cutscene.volume(0.2);

  // PLAYER (velocidade alterada para 12)
  apollo = new Personagem (width/2, height/2, 20, 5, 10, 12, [ImageCache.load('./assets/sprites/characters/apollo/pingente/pingente.png')]);

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
  atualizarEntradaDialogo();
  atualizarInstrucoesDialogo(preJogo.ativo || loreContada.ativo || recVida.ativo);
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
    const dialogo = preJogo.elementos.find(caixa => caixa instanceof CaixaDialogo);
    let pulado = false;
    preJogo.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) pulado = true;
    });
    if (pulado) {
      dialogo.reiniciar();
      hanniman.vida -= 25;
      carregarEnergias();
      irPara(preJogo, gameplay);
    } else if (dialogo.passarFrase()) {
      hanniman.vida -= 25;
      carregarEnergias();
      irPara(preJogo, gameplay);
    } else {
      dialogo.acelerar();
      if (dialogo.n == dialogo.frases.length - 1) {
        preJogo.elementos[1].img = ImageCache.load("./assets/sprites/characters/hanniman/hanniman-olho.gif");
      }
    }
  }
  // DIALOGO DE PRE-MENU
  if (loreContada.ativo) {
    const dialogo = loreContada.elementos.find(caixa => caixa instanceof CaixaDialogo);
    let pulado = false;
    loreContada.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) pulado = true;
    });
    if (pulado) {
      dialogo.reiniciar();
      irPara(loreContada, lab);
    } else if (dialogo.passarFrase()) {
      preJogo.elementos[1].img = ImageCache.load("./assets/sprites/characters/hanniman/hanniman-falando.gif");
      irPara(loreContada, lab);
    } else {
      dialogo.acelerar();
      if (dialogo.n == 3) loreContada.elementos[1].img = ImageCache.load('./assets/sprites/characters/emilly/emilly-olho-fechado.png');
      if (dialogo.n == 7) loreContada.elementos[1].img = ImageCache.load('./assets/sprites/characters/emilly/emilly-chateada.png');
    }
  }
  // CUTSCENE DO LABORATÓRIO
  if (lab.ativo) {
    if (playCutscene) {
      playCutscene = false;
      cutscene.play();
      cutsceneTimeout = setTimeout( () => {
        irPara(lab, menu);
      }, 8000);
    }
    square(width/2 - 155, height/2 - 155, 310);
    image(cutscene, width/2 - 150, height/2 - 150, 300, 300);
    lab.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) {
        clearTimeout(cutsceneTimeout);
        cutscene.stop();
        irPara(lab, menu);
      }
    });
  }
  // DIÁLOGO DE RECUPERAÇÃO DE VIDA 1
  if (recVida.ativo) {
    const dialogo = recVida.elementos.find(caixa => caixa instanceof CaixaDialogo);
    let pulado = false;
    recVida.elementos.forEach(caixa => {
      caixa.desenhar();
      if (caixa.apertavel && caixa.apertado()) pulado = true;
    });
    if (pulado) {
      dialogo.reiniciar();
      preJogo.elementos[1].img = ImageCache.load("./assets/sprites/characters/hanniman/hanniman-falando.gif");
      irPara(recVida, menu);
    } else if (dialogo.passarFrase()) {
      preJogo.elementos[1].img = ImageCache.load("./assets/sprites/characters/hanniman/hanniman-falando.gif");
      irPara(recVida, menu);
    } else {
      dialogo.acelerar();
    }
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
        if (v < 10) {
          ascensaoSpawnTimer += deltaTime;
          if (ascensaoSpawnTimer >= 2000) {
            ascensaoSpawnTimer -= 2000;
            // A FORMAÇÃO INTEIRA PENDA PRA UM LADO A CADA VAGA (TENTANDO SEMPRE
            // INVERTER O LADO DA VAGA ANTERIOR), PRO JOGADOR NÃO DECORAR O RITMO
            let direcao = Math.random() < 0.5 ? -1 : 1;
            if (ultimaDirecaoAscensao !== 0 && Math.random() < 0.75) direcao = -ultimaDirecaoAscensao;
            ultimaDirecaoAscensao = direcao;
            let deslocamentoFormacao = direcao * random(10, 30);
            // COLUNAS DECORATIVAS NAS BEIRADAS (-190/+190) E 3 COLUNAS DE DESVIO
            // DENTRO DA ÁREA QUE O JOGADOR ANDA (-85/0/+85)
            let colunas = [-190, -85, 0, 85, 190];
            for (let j = 1; j <= 3; j++) {
              for (let i = 1; i <= 5; i++) {
                atomos.push(new Atom(width / 2 + colunas[i - 1] + deslocamentoFormacao, -10 - (j - 1) * 65, 1 + v * 0.05));
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
