class Cenarios {
  constructor (desc, ativo = false) {
    this.desc = desc;
    this.ativo = ativo;
    this.elementos = [];
  }
}
const menu = new Cenarios ('Menu');
const ajuda = new Cenarios ('Ajuda');
const escolhas = new Cenarios ('Ataques');
const intro = new Cenarios ('Revolta Química by ImPollic', true);
const preJogo = new Cenarios ('Diálogo');
const gameplay = new Cenarios ('...');
const gameOver = new Cenarios ('...');
const loreContada = new Cenarios ('História');
const recVida = new Cenarios ('Checkpoint');
const lab = new Cenarios('Cutscene - Laboratório');
const creditos = new Cenarios('Créditos');
const inventario = new Cenarios('Inventário');
const fimJogo = new Cenarios('Fim de Jogo');

function carregarPaginas () {
  // Montando o menu
  menu.elementos.push(
    new Caixa (width/2 - 250, height/2 - 30, 200, 500, "white", "\n* Escolha uma opção", 0, 0, 1, 0),
    new Caixa (width/2 - 250, 10, 250, 500, "red", "", "black", 1, 0, 0, './Sprites/Personagens/pollic2.gif'),
    new Caixa(0, height - 90, 80, 142, "orange", "  LUTAR", 0, 0, 0, 1, undefined, '🗡'),
    new Caixa(152, height - 90, 80, 142, "orange", "  ITEM", 0, 0, 0, 1, undefined, '༄'),
    new Caixa(304, height - 90, 80, 142, "orange", "  CREDIT", 0, 0, 0, 1, undefined, '✦'),
    new Caixa(456, height - 90, 80, 142, "orange", "  AJUDA", 0, 0, 0, 1, undefined, '♥︎'),
    new Caixa(width/2 - 260, height/2 + 180, 20, 400, "white", `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`, 0, 1),
    new Caixa(width/2 - 30, height/2 + 180, 20, 120, "yellow", "", "yellow")
  );
  // Montando a tela de ajuda 
  ajuda.elementos.push(
    new Caixa (10, 10, height - 20, width - 20, "white", `\nComo jogar?\n\n1. Escolha a opção LUTAR\n2. Escolha um dos ataques disponíveis\n3. Desvie dos ataques do professor\n- Utilize WASD/Setas para se mover\n4. Espere seu ataque carregar\n5. Repita o processo até nocautear\nou ser nocauteado\n\nSe divirta!\n`, "black", 1, 1),
    new Caixa (width - 200, 20, 60, 180, "orange", "   VOLTAR", "black", 0, 0, 1, undefined, '⮞'),
    new Caixa (width - 260, height - 250, 250, 250, "gray", " Emilly (Micro Coulomb)", "black", 1, 1, 0, './Sprites/Personagens/emilly.png' )
  );
  // Montando a tela de escolhas
  escolhas.elementos.push(
    new Caixa (width/2 - 250, height/2 - 30, 200, 500, "white", "", 0, 0),
    new Caixa (width/2 - 245, height/2 - 25, 190, 160, "#de5a0d", "\n\n ENTALPIA \nEXPLOSIVA", 0, 0, 1, true),
    new Caixa (width/2 - 80, height/2 - 25, 190, 160, "#6b096b", "\n\n  FORÇA \nIONIZANTE", 0, 0, 1, true),
    new Caixa (width/2 + 85, height/2 - 25, 190, 160, "#03ff07", "\n\n OXIDAÇÃO \n REDUZIDA", 0, 0, 1,  true),
    //new Caixa (width - 50, 10, 40, 40, "orange", ">", 0, 0, 0,  true),
    new Caixa (width/2 - 250, height - 80, 50, 500, "gray", "       Escolha um ataque!", 0, 0),
    new Caixa (width/2 - 250, 10, 250, 500, "red", "", "black", 1, 0, 0, './Sprites/Personagens/pollic3.gif'),
    new Caixa(width/2 - 260, height/2 + 180, 20, 400, "white", `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`, 0, 1),
    new Caixa(width/2 - 30, height/2 + 180, 20, 120, "yellow", "", "yellow")
  );
  // Montando a tela de introdução
  intro.elementos.push(
    new Caixa (10, 10, 580, 580, "magenta", "", 0, 1, 0, 0, './Sprites/intro.png'),
    new Caixa (width/2 - 47.5, height/2 + 160, 40, 95, color('rgba(255, 255, 255, 0.4)'), "", 0, 0, 0, 1, './Sprites/jogar.png'),
    new Caixa (width - 100, height - 20, 1, 0, 'white', 'v10.0', 0, 1),
  );
  // Montando a tela de preJogo
  preJogo.elementos.push(
    new Caixa (width/2 - 250, height/2 - 30, 280, 500, "white", "", 0, 0),
    new Caixa (width/2, 10, 250, 250, "red", "", "black", 1, 0, 0, './Sprites/Hann/hanFalando.gif'),
    new Caixa (width/2 - 250, 10, 50, 240, "white", "Prof. Hanniman", "black", 0, 0),
    new Caixa (width/2 - 250, 60, 200, 240, "gray", `\nHP: ${hanniman.vida}/${hanniman.vidaOriginal}\nATK:${hanniman.ataque}\nDEF:${hanniman.defesa}\nLV:20`, "black", 1, 1, 0),
    new Caixa(width/2 - 260, height - 40, 20, 400, "white", `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`, 0, 1),
    new Caixa(width/2 - 30, height - 40, 20, 120, "yellow", "", "yellow"),
    new CaixaDialogo(width/2 - 240, height/2 - 20, 260, 480, hanniman.dialogo, 0.2) // MUDANÇAS
  );
  // Montando a tela de gameplay
  gameplay.elementos.push(
    new Caixa(width/2 - 130 , height - 80, 20, 400, "white", `HP         ${apollo.vida}/${apollo.vidaOriginal}`, 0, 1),
    new Caixa(width/2 - 85, height - 80, 20, 120, "yellow", "", "yellow"),
    new Caixa(width/2 - 100, 12.5, 200, 200, "white", "", 0, 1, 0, 0, './Sprites/title.png')
  );
  // Montando a tela de créditos
  creditos.elementos.push(
    new Caixa(0, 0, height, width, 255, `\nREVOLTA QUÍMICA por ImPollic (Final)\n\nPROGRAMAÇÃO: Apollo Borges\n\nPERSONAGENS:\n - Professor Hanniman\n - Emilly Victoria (Micro Coulomb)\n\nSPRITES: Autorais\nINSPIRAÇÃO: Undertale por Toby Fox\n\nMÚSICAS: Instrumental da saga Persona\nCOVER: Anselmo Kotch, Geovana Salem\nLuaDelChiaro, Sunna Lux, Vinny Connect\nSafira Lucca`, 0, 1, 1),
    new Caixa(450, 110, 80, 142, 'orange', '  VOLTAR', 0, 0, 0, 1, undefined, '⮞')
  )
  // Montando a tela de gameover
  gameOver.elementos.push(
    new Caixa(width/2 - 75, height - 150, 40, 150, "white", "Reiniciar", 0, 0, 0, 1),
    new Caixa (width/2 - 80, 150, 1, 1, "red", "GAME OVER.", 0, 1),
    new Caixa(width/2 - 95, height/2 - 100, 200, 200, "white", "", 0, 1, 0, 0, "./Sprites/pendulQ.png")
  );
  // Montando a tela de préintrodução
  loreContada.elementos.push(
    new Caixa (10, width/2 + 70, 220, 580, "white", "", 0, 0, 0, 0),
    new Caixa (20, width/2 + 80, 200, 200, "gray", "Emilly (Micro Coulomb)", 0, 1, 1, 0,'./Sprites/Personagens/emi32v1.png'),
    new CaixaDialogo (220, width/2 + 70, 220, 370, [
      "* Pois bem...   ",
      "* Nossa história se pas\nsa no final de janeiro    ",
      "* A direção geral pediu\npara os monitores elabo\nrarem um relatório fi\nnal para o fim da moni\ntoria      ",
      "* Mas o prazo que deram\nfoi extremamente curto      ",
      "* E o Apollo não conse\nguiu entregar à tempo        ",
      "* O professor o chamou\nno laboratório de\nquímica para 'conversar'          ",
      "* E é para onde ele es\ntá indo agora...         ",
      "* E agora, se você me\nder licença, tenho\nque ir para a aula de\nNelson, adeus.                   ",
    ], 0.2, 1),
  );
  // Montando a tela de diálogo de recuperação de vida
  recVida.elementos.push(
    new Caixa (10, width/2 + 70, 220, 580, "white", "", 0, 0, 0, 0),
    new Caixa (20, width/2 + 80, 200, 200, "gray", "Emilly (Micro Coulomb)", 0, 1, 1, 0,'./Sprites/Personagens/emi32v1.png'),
    new CaixaDialogo (220, width/2 + 70, 220, 370, [
      "* Voltei!       ",
      "* Nossa, você parece\nestar muito machucado...    ",
      "* Tenho uma coisa\nque pode lhe ajudar!      ",
      "* Não é muito mas\ndeve servir...      ",
      "* ...        ",
      "> Micro Coulomb\nescolheu... CORRENTE\nCURATIVA!        ",
      "> Você recebeu um cho\nque elétrico que\nrestaurou seu HP        "
    ], 0.2, 1),
  );
  // Montando a tela de inventário
  inventario.elementos.push(
    new Caixa (0, 10, 200, 200, 255, `\n * Apollo *\n  LV 10\n  HP ${apollo.vida}/${apollo.vidaOriginal}\n  EXP 33`, 0, 0, 1),
    new Caixa (0, 220, 150, 200, 255, '\n    ITEM\n    STAT\n    CELL', 0, 0, 1),
    new Caixa (0, 380, 50, 200, 'orange', '   VOLTAR', 0, 0, 0, 1, undefined, '⮞'),
    new Caixa (210, 10, 480, 390, 255, '\n  Sua bolsa está vazia!', 0, 0, 1, 0, undefined,'\n✦' ),
    new Caixa (220, 430, 50, 370, 255, '  USE     INFO    DROP', 0, 0),
  );
  // Montando a tela de fim de jogo
  fimJogo.elementos.push(
    new Caixa (width/2 - 150, height/2 - 20, 1, 1, 255, "Obrigado por jogar!", 0, 1),
    new Caixa (10, height/2 + 30, 1, 1, "gray", "Agradecimentos especiais para:\n* Emilly Victoria - 1SER#2\n* Nicolas Lima - 1TIN\n* Grazielle Mariano - 1TIN\n* Walmir Lima - 3TIN\n* Erika Travassos - 2TIN", 0, 1),
    new Caixa (width/2 - 250, 10, 250, 500, "red", "", "black", 1, 0, 0, './Sprites/Personagens/pollic3.gif'),
  )
}