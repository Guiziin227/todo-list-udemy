
//puxando o html para o js
const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')



function criaLi(){
    const li = document.createElement('li') //criando uma tag html por meio do js                                               
    return li
}

function limpaInput() { //criando um function para limpar o input após utilizado
    inputTarefa.value = ''; //ao enviarmos um tarefa, a barra de escrita vai resetar e ficar vazia
    inputTarefa.focus() //para colocar o foco no input
}

function criaBtnApagar(li) { // criando função para apagar tarefas já concluidas 
    li.innerHTML += '   ' // esta linha serve para que haja um espaço entre o texto do li e o btn apagar(poderia ser facilmente resolvido com css)
    const btnApagar = document.createElement('button'); // criação do botao apagar no html pelo js
    btnApagar.innerHTML = 'Apagar' //adicionando um texto no btn
    btnApagar.setAttribute('class', 'apagar') //setando um atributo ao botao
    btnApagar.setAttribute('title', 'Apagar está tarefa') 
    li.appendChild(btnApagar) //aninhando ele a um pai
}


inputTarefa.addEventListener('keypress', function(e){ //função para poder usar o enter como "enviar" e não somente clicar com o mouse
    //console.log(e) fazendo isso estamos pegando o codigo da tecla que queremos pressionar para dar o efeito de submit
    if(e.keyCode === 13){ //"Se o enter for pressionado..."
        if(!inputTarefa.value) return; // criando a função para ao clicar no botão ver se tem algum valor dentro do input
        criaTarefa(inputTarefa.value) // se tiver valor vai passar para a função cria tarefa
        limpaInput() //usando a function para limpar o input após utilizado
    }
})

function criaTarefa(textInput){ //para criarmos uma tarefa
  const li = criaLi() // criando o li em si
  li.innerHTML = textInput // vai pegar o valor do  parâmetro e escrever em html para aparecer na tela, 'nó filho'
  tarefas.appendChild(li)// peguei o nó 'pai' e adicionei o nó 'filho' a ele, ou seja, coloquei o li dentro do ul
  criaBtnApagar(li) //adicionando botao apagar
  salvarTarefas() //função para salvar tarefa mesmo dps de fechar a aba
}

btnTarefa.addEventListener('click', function(){ // para o botao dar o submit
    if(!inputTarefa.value) return; // criando a função para ao clicar no botão ver se tem algum valor dentro do input
    criaTarefa(inputTarefa.value) // se tiver valor vai passar para a função cria tarefa
    limpaInput() //usando a function para limpar o input após utilizado
})

document.addEventListener('click', function(e){
    const el = e.target; // criando um método para saber qual elemento está sendo clicado na tela
    //console.log(el) //com isso  podemos manipular mais ainda o código
    if(el.classList.contains('apagar')){ //se esse elemento clicado contem a classe apagar...
        el.parentElement.remove();//do meu elemento o pai dele será removido 
    salvarTarefas()//adicionamos o salvar tarefa no apagar, pois quando apagarmos iremos estar salvando o li apagado, ou seja, apagando ele, pois no mesmo  não terá mais nada
}})
        
function salvarTarefas(){ // criando a função para salvar as tarefas
    const liTarefas = tarefas.querySelectorAll('li') //capturar todas as li criadas e não excluidas
    const listaDeTarefas = [] //criando um array das tarefas

    for(let tarefa of liTarefas){ //passando todas as li's
        let tarefaTexto = tarefa.innerText //criando uma variável  para apagar o btnApagar
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    
        //JSON é uma notação de objeto JavaScript usada para armazenar e transmitir dados estruturados em formato de texto. Ele consiste em pares chave/valor e é amplamente utilizado em APIs da web.

    const tarefasJSON = JSON.stringify(listaDeTarefas)//transformou a array de strings em uma string que poderá futuramente ser uma array de strings.
    localStorage.setItem('tarefas',tarefasJSON) //mini base de dados do navegador para salvar nossas tarefas se fecharmos a aba

    
}

function adicionaTarefasSalvar() { //recuperando os dados salvos para exibir na tela novamente
    const tarefas = localStorage.getItem('tarefas') //puxando os dados salvos para o console
    const listaDeTarefas = JSON.parse(tarefas) //Está desconvertendo o objeto JS que foi convertido anteriormente de um array de string para uma string

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvar()


  

