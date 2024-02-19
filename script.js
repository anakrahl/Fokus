const tagHTML = document.querySelector('html')
const botaoDeFoco = document.querySelector('.app__card-button--foco')
const botaoDescansoCurto = document.querySelector('.app__card-button--curto')
const botaoDescansoLongo = document.querySelector('.app__card-button--longo')
const bannerFoto = document.querySelector('.app__image')
const titulo_txt = document.querySelector('.app__title')
const allButtons = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const SonsMusicas = new Audio('sons/luna-rise-part-one.mp3')
const SonsPausar = new Audio('sons/pause.mp3')
const SonsPlayAudio = new Audio('sons/play.wav')
const SomFimBeep = new Audio('sons/beep.mp3')
const buttonStartPause = document.querySelector('#start-pause')
const iniciarPausarBotao = document.querySelector('#start-pause span')
const iconPausePlay = document.querySelector('.app__card-primary-button-icon')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

SonsMusicas.loop = true

musicaFocoInput.addEventListener('change', () =>{
    if(SonsMusicas.paused){
        SonsMusicas.play()
    } else{
        SonsMusicas.pause()
    }
})

botaoDeFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    botaoDeFoco.classList.add('active');
})

botaoDescansoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    botaoDescansoCurto.classList.add('active');
})
botaoDescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    botaoDescansoLongo.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo()
    allButtons.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    tagHTML.setAttribute('data-contexto', contexto);
    bannerFoto.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo_txt.innerHTML =
                `Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo_txt.innerHTML =
                `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo_txt.innerHTML =
                `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        SomFimBeep.play()
        alert("Tempo finalizado")
        zerarTemporizador()
        return 
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}
buttonStartPause.addEventListener("click", iniciarPausar)

function iniciarPausar(){
    if(intervaloId){
        SonsPausar.play()
        zerarTemporizador()
        return
    }
    SonsPlayAudio.play()
    intervaloId = setInterval((contagemRegressiva), 1000)
    iniciarPausarBotao.textContent = "Pausar"
    iconPausePlay.setAttribute('src', `imagens/pause.png`)


}
function zerarTemporizador(){
    clearInterval(intervaloId)
    iniciarPausarBotao.textContent = "Começar"
    iconPausePlay.setAttribute('src', `imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempoValor = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempoValor.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
