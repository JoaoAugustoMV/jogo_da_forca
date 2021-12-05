// -----------divs-----------
var div_escolher = document.getElementById('escolher')
var div_jogar = document.getElementById('jogar')
var div_resul = document.getElementById('resul')
var body = document.getElementsByTagName('body')[0]

// -----------ul-----------
var ul = document.createElement('ul')

var list_status = [letras_corretas, letras_erradas, tentativas] // Lista com as informações da partida
for (i in list_status){ // for para criar e preencher os itens(os li) da lista ul
    var li = document.createElement('li')
    li.appendChild(document.createTextNode('list_status[i]'))
    ul.appendChild((li))
} // end for
div_resul.appendChild(ul) // Add a lista ul a div resul
var lis = document.getElementsByTagName('li') // Agrupa as tag li
ul.style.display = 'none' // Esconde a lista ul

var h1 = document.getElementsByTagName('h1')[0] // Pega as tag h1, no caso só tem uma 

// -----------inputs-----------
var btn = document.getElementsByClassName('botao')
var palavra_escolhida = document.getElementById('palavra_escolhida')
var letra = document.getElementById('input_letra') // Letra informada pelo jogador

//-----------EventListener-----------
// Ao apertar enter
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



function tem(x, lista){ // Diz se tal valor tem na lista
    for (i in lista){
        if (lista[i] == x)
        return true
    }
    return false
}
function validaLetra(l){ // Valida se é letra ou se já foi informada
    let code = l.charCodeAt() // codigo ASCII
    let letras_informadas = []
    letras_informadas = (letras_informadas.concat(letras_corretas, letras_erradas))
    
    // A = 65
    // Z = 90
    if (code >= 65 && code <= 90){ // Se é letra
        if (letras_informadas.includes(l)){ // Se a letra já foi digitada, retorna false
            alert('Letra já informada, digite outra')
            return false
        } // end if(letras_informadas.includes(l))

        return true // Se é letra e não foi digitada ainda, retorna true

    //  end if (code >= 65 && code <= 90)    

    } else{ // Se não é letra, retorna false
        alert('Por favor, informe uma letra')
        return false
    } // end else
} // end validaLetra()

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
        h1.innerText = 'Hora de Jogar!'
    }, 1000)
    
} // end confirmar()


function tentativa(){ // Testa a tentativa do jogador
    var escondida = '' // str para mostrar como esta os acertos da palavra
    let palavra = palavra_escolhida.value.toUpperCase()
    let letter = letra.value.toUpperCase()
    
        if(validaLetra(letter)){ // Se for letra

            for (l in palavra){ // Varre a palavra escolhida
                if (tem(letter, palavra)){ // Se tem a letra informada na palavra
                    body.style.backgroundColor = 'green'
                    if (!tem(letter, letras_corretas)){ // Se não tem a letra correta nos acertos ainda
                        letras_corretas.push(letter) // Add ao array
                    } // end if
                    
                } else{ // Se NAO tem a letra informada na palavra
                    body.style.backgroundColor = 'red'
                    if (!tem(letter, letras_erradas)){ // Se NAO tem a letra incorreta nos erros ainda
                        letras_erradas.push(letter) // Add ao array
                        tentativas -= 1 // Perde uma vida   
                    } // end if
                } // end else

                if (tem(palavra[l], letras_corretas)){ // Se a letra do indice esta nas já acertadas
                    escondida += palavra[l] // Exibe a letra acertada
                } else{ // Se a letra do indice nao foi acertada
                    escondida += ' _ ' // 
                } // end else
                
            } // end for palavra_escolhida*/

            p_escondida.innerText = escondida
            
            let list_status = [letras_corretas, letras_erradas, tentativas]
            let lista = [`Corretas: ${list_status[0]}`, `Incorretas: ${list_status[1]}`, `Tentativas Restantes: ${list_status[2]}` ] // status

            for (i in lista){
                lis[i].innerText = lista[i]
            } // end for
            
            ul.style.display = 'block' // Exibe a lista
            letra.value = '' // Limpa a caixa de texto
            
            img.setAttribute('src', boneco(tentativas))// Indica a fonte da imagem pela função boneco(retorna a imagem em função das tentativas restantes)
            div_resul.appendChild(img) // Add a img a div

            if (tentativas == 0){ // Se acabar as tentativas, o jogador perde
                p_resultado.style.display = 'block' //
                p_resultado.innerHTML = `Perdeu <br> A palavra era ${palavra}`
                div_jogar.style.display = 'none'
            } // end if
            if (escondida.indexOf('_') == -1){ // Se não tiver '_' significa que o jogador acertou todas a letras, logo venceu
                p_resultado.style.display = 'block'
                p_resultado.innerText = 'Ganhou'
                div_jogar.style.display = 'none'
            } // end if

        } /* end if(validaLetra) */ else{
            letra.value = ''
        }
} // end tentativa()

//----------- Inicio-----------
palavra_escolhida.focus() // Cursor na caixa de texto

/* 
 - Ler palavra a ser descoberta (check)
 - Ler a letra do chute (check)
 - Verifica se a letra do chute tem na palavra escolhida (check)
 - Acompanhar as tentativas restante (check)
 - Exibir os acertos e erros (check)
 - Acabar o jogo quando zerar as tentativas (check)
 - Fazer ganhar o jogo (check)
 - Fazer o bonequinho responder aos erros (check)
 - Validar se é letra (check)
 - Validar se a letra já fui informada (check)
 - Mexer nos estilos (1/2)
*/
