let energias = [];
function carregarEnergias () {
  // "\n\n ENTALPIA \nEXPLOSIVA"
  // "\n\n  FORÇA \nIONIZANTE"
  // "\n\n OXIDAÇÃO \n REDUZIDA"
  if (optEscolhida == "\n\n ENTALPIA \nEXPLOSIVA") {
    energias.push(
      new EntalpiaExplosiva(width/2 - 140, height/2, width/2, 112.5),
      new EntalpiaExplosiva(width/2 - 140, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(width/2 + 140, height/2, width/2, 112.5),
      new EntalpiaExplosiva(width/2 + 140, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(0, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(width, height/2 + 70, width/2, 112.5),
      new EntalpiaExplosiva(width, height/2, width/2, 112.5),
      new EntalpiaExplosiva(0, height/2, width/2, 112.5),
      new EntalpiaExplosiva(0, height/2 - 70, width/2, 112.5),
      new EntalpiaExplosiva(width, height/2 - 70, width/2, 112.5),
    );
  }
  if (optEscolhida == "\n\n  FORÇA \nIONIZANTE") {
    for (let j = 0; j< 5; j++) {
      for (let i = 1; i<= 8; i++) {
        energias.push(new ForcaIonizante(0, width/2 - 140 + 70*j, height + 15*i, width/2, 112.5));
      }
    } 
  }
  if (optEscolhida == "\n\n OXIDAÇÃO \n REDUZIDA") {
    for (let j = 0; j< 3; j++) {
      for (let i = 1; i<= 5; i++) {
        energias.push(new OxidacaoReduzida(0, -32*j, 120*i, width/2, 112.5));
      }
    }
    for (let j = 0; j< 3; j++) {
      for (let i = 1; i<= 5; i++) {
        energias.push(new OxidacaoReduzida(0, width +32*j, 120*i, width/2, 112.5));
      }
    } 
  }
}
