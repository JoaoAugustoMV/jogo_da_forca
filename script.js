// -----------divs-----------
var div_escolher = document.getElementById('escolher')
var div_jogar = document.getElementById('jogar')
var div_resul = document.getElementById('resul')

// -----------inputs-----------
var btn = document.getElementsByClassName('botao')
var palavra_escolhida = document.getElementById('palavra_escolhida')
var letra = document.getElementById('input_letra') // Letra informada pelo jogador

//-----------EventListener-----------
palavra_escolhida.addEventListener('keypress', function(enter){
    if(enter.key === 'Enter'){
        btn[0].click()
    }
})
letra.addEventListener('keypress', function(enter){
    if (enter.key === 'Enter'){
        btn[1].click()
    }
})


//-----------ps-----------
var p_escondida = document.getElementById('escondida')
var p_status = document.getElementById('status')
var p_resultado = document.getElementById('resultado')


// -----------vars-----------
var img = document.createElement('img')
var tentativas = 6
var letras_erradas = [] // Guarda os acertos
var letras_corretas = [] // Guarda os erros

//----------- Inicio-----------
palavra_escolhida.focus() // Cursor na caixa de texto

function tem(x, lista){ // Diz se tal valor tem na lista
    for (i in lista){
        if (lista[i] == x)
        return true
    }
    return false
}

function boneco(tentativas){ // Retorna como esta a situação do boneco(um caminho de imagem)
    let fontes =  // array com cada caminho
    ['img_boneco/braco_direito6.png',
    'img_boneco/braco_esquerdo5.png',
    'img_boneco/perna_direita4.png',
    'img_boneco/perna_esquerda3.png',
    'img_boneco/tronco2.png',
    'img_boneco/cabeca1.png',
    'img_boneco/vazio0.png',]

    return fontes[tentativas] 
} // end boneco()

function confirmar(){ // Escolha da palavra
    let tag_p = document.createElement('p') // Criando a tag p
    let texto_p = document.createTextNode('Palavra confirmada') // Criando um str para adicionar na tag p
    tag_p.appendChild(texto_p) // Adicionando o texto na tag p
    div_escolher.appendChild(tag_p) // Adicionando a tag p na div
    
    setTimeout(function (){ // Espera x milissegundos para executar a função passada
        div_escolher.style.display = 'none' // Esconde a div
        div_jogar.style.display = 'block' // Mostra a div
        div_resul.style.display = 'block'
        letra.focus() // Cursor na caixa de texto
    }, 1000)
    
} // end confirmar()


function tentativa(){ // Testa a tentativa do jogador
    var escondida = ''
    
    for (l in palavra_escolhida.value){ // Varre a palavra escolhida
        if (tem(letra.value, palavra_escolhida.value)){ // Se tem a letra informada na palavra
             
            if (!tem(letra.value, letras_corretas)){ // Se não tem a letra correta nos acertos ainda
                letras_corretas.push(letra.value) // Add ao array
            }
            
        } else{ // Se NAO tem a letra informada na palavra
            if (!tem(letra.value, letras_erradas)){ // Se NAO tem a letra incorreta nos erros ainda
                letras_erradas.push(letra.value) // Add ao array
                tentativas -= 1 // Perde uma vida
                
            }
        }
        if (tem(palavra_escolhida.value[l], letras_corretas)){ // Se a letra do indice esta nas já acertadas
            escondida += palavra_escolhida.value[l] // Exibe a letra acertada
        } else{ // Se a letra do indice nao foi acertada
            escondida += ' _ ' // 
        }
        
    } // end for palavra_escolhida*/
    p_escondida.innerText = escondida
    p_status.innerText = (`Erradas: ${letras_erradas}, corretas: ${letras_corretas}, tentativas: ${tentativas}`)
        
    letra.value = ''
    
    img.setAttribute('src', boneco(tentativas))
    div_resul.appendChild(img)
    if (tentativas == 0){
        p_resultado.style.display = 'block'
        p_resultado.innerText = 'Perdeu'
        div_jogar.style.display = 'none'
    }
    if (escondida.indexOf('_') == -1){
        p_resultado.style.display = 'block'
        p_resultado.innerText = 'Ganhou'
        div_jogar.style.display = 'none'
    }

    
} // end tentativa()



/* 
 - Ler palavra a ser descoberta (check)
 - Ler a letra do chute (check)
 - Verifica se a letra do chute tem na palavra escolhida (check)
 - Acompanhar as tentativas restante (check)
 - Exibir os acertos e erros (check)
 - Acabar o jogo quando zerar as tentativas (check)
 - Fazer ganhar o jogo (check)
 - Fazer o bonequinho responder aos erros (check)
 - Mexer nos estilos
*/