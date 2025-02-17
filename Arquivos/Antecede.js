const dispositivo = localStorage.getItem('dispositivo');

if (dispositivo == 'celular') {
    document.getElementById('jogo').innerHTML = `
    
        <div class="title">
        <div class="lado" id="lado"></div>
        <div class="exit" id="botaosair" onclick="sairJogo();">✖</div>
      </div>
      <div class="container">
        <div class="ladoVertical" id="ladoEsq"></div>
        <div class="container-canvas" id="container-canvas">
          <div class="acima" id="personagem-atacar-animacao"></div>
        </div>
        <div class="ladoVertical" id="ladoDir"></div>
      </div>
      <div class="botoes">
        <button class="botao" ontouchstart="irEsquerda()" ontouchend="NAOirEsquerda()">⬅️</button>
        <button class="botao" ontouchstart="irCima()" ontouchend="NAOirCima()">⬆️</button>
        <button class="botao" ontouchstart="irBaixo()" ontouchend="NAOirBaixo()">⬇️</button>
        <button class="botao" ontouchstart="irDireita()" ontouchend="NAOirDireita()">➡️</button>
      </div>
    `;
    document.getElementById('estadoCarregamento').innerHTML = `
        Carregando Revolta Química Mobile...
    `
}
