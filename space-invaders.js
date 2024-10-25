// Obtém o elemento canvas do documento HTML usando
// seu ID 'telaJogo' e armazena na variável 'telaJogo'.
const telaJogo = document.getElementById('telaJogo');

// Cria um contexto de desenho 2D para a variável 'telaJogo',
// que será usado para desenhar gráficos no canvas.
const contexto = telaJogo.getContext('2d');

// Obtém o elemento de áudio do documento HTML usando
// seu ID 'somTiro' e armazena na variável 'somTiro'.
const somTiro = document.getElementById('somTiro');

// Obtém o contêiner da modal do documento HTML usando
// seu ID 'modal' e armazena na variável 'modal'.
const modal = document.getElementById('modal');

// Obtém o elemento dentro da modal que será usado para
// exibir mensagens, usando seu ID 'mensagemModal' e armazena
// na variável 'mensagemModal'.
const mensagemModal = document.getElementById('mensagemModal');

// Obtém o botão dentro da modal que permite ao usuário
// continuar o jogo, usando seu ID 'botaoContinuar' e
// armazena na variável 'botaoContinuar'.
const botaoContinuar = document.getElementById('botaoContinuar');

// Obtém o botão dentro da modal que permite ao usuário
// terminar o jogo, usando seu ID 'botaoTerminar' e
// armazena na variável 'botaoTerminar'.
const botaoTerminar = document.getElementById('botaoTerminar');

// Define a classe 'Objeto', que é uma estrutura
// base para outros elementos gráficos do jogo.
class Objeto {

    // O construtor é um método especial para criar e
    // inicializar um objeto criado a partir de uma classe.
    constructor(x, y, largura, altura, cor) {
  
      // Inicializa a propriedade 'x' do objeto, que
      // representa a posição horizontal no canvas.
      this.x = x;
  
      // Inicializa a propriedade 'y' do objeto, que
      // representa a posição vertical no canvas.
      this.y = y;
  
      // Inicializa a propriedade 'largura' do objeto, que
      // representa a largura do objeto no canvas.
      this.largura = largura;
  
      // Inicializa a propriedade 'altura' do objeto, que
      // representa a altura do objeto no canvas.
      this.altura = altura;
  
      // Inicializa a propriedade 'cor' do objeto, que
      // define a cor de preenchimento do objeto.
      this.cor = cor;
  
    }
  
    // Define o método 'desenhar' para a classe 'Objeto'.
    desenhar() {
  
      // Define a cor de preenchimento para o desenho no
      // contexto do canvas, usando a propriedade 'cor' do objeto.
      contexto.fillStyle = this.cor;
  
      // Desenha um retângulo no canvas nas coordenadas
      // especificadas (x, y) com as dimensões especificadas (largura, altura).
      // O método 'fillRect' é usado para desenhar um retângulo preenchido.
      contexto.fillRect(this.x, this.y, this.largura, this.altura);
  
    }
}


// Define a classe 'Jogador' como uma subclasse de 'Objeto',
// o que significa que 'Jogador' herda características e
// comportamentos da classe 'Objeto'.
class Jogador extends Objeto {

    // O construtor é uma função especial que é chamada para
    // criar um novo objeto da classe. Aqui, ele configura um novo jogador.
    constructor(x, y, largura, altura, imagem) {
  
      // 'super' é usado para chamar o construtor da classe
      // pai, 'Objeto'. Isso é necessário para garantir que o
      // jogador tenha todas as propriedades de um 'Objeto'.
      super(x, y, largura, altura);
  
      // 'this.imagem' armazena uma referência para o
      // objeto 'Image' que representa a imagem visual do
      // jogador. Isso será usado ao desenhar o jogador no canvas.
      this.imagem = imagem;
  
      // 'this.velocidade' é usada para controlar a rapidez com
      // que o jogador se move no eixo x. Inicializado como 0,
      // significa que o jogador está parado.
      this.velocidade = 0;
  
      // 'this.vidas' armazena o número de vidas que o jogador tem.
      // Ela tenta recuperar esse número do localStorage; se
      // não houver nada salvo, o padrão será 3.
      // 'parseInt' é usado para garantir que o valor
      // recuperado é um número inteiro.
      // O segundo argumento, '10', especifica a base decimal para a conversão.
      this.vidas = parseInt(localStorage.getItem('vidas'), 10) || 3;
  
    }

    // 'desenhar' é um método para exibir o jogador no canvas.
    desenhar() {

        // 'contexto.drawImage' é um método do contexto 2D do canvas que desenha uma imagem.
        // 'this.imagem' é a imagem do jogador a ser desenhada.
        // 'this.x' e 'this.y' são as coordenadas no canvas onde a imagem será posicionada.
        // 'this.largura' e 'this.altura' especificam o tamanho da imagem ao ser desenhada.
        contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);

    }

    // Método 'atualizar' da classe Jogador. Este método é
    // usado para atualizar o estado do jogador a cada frame do jogo.
    atualizar() {

        // Atualiza a posição horizontal 'x' do jogador,
        // adicionando a 'velocidade' atual a 'x'.
        // Se 'velocidade' for positiva, o jogador se
        // move para a direita; se negativa, para a esquerda.
        this.x += this.velocidade;

        // Garante que o jogador não saia dos limites do canvas.
        // 'Math.max(0, ...)' impede que 'x' seja menor
        // que 0 (borda esquerda do canvas).
        // 'Math.min(this.x, telaJogo.width - this.largura)' impede
        // que 'x' seja maior que a largura do canvas menos a largura do jogador,
        // o que evita que o jogador desapareça na borda direita do canvas.
        this.x = Math.max(0, Math.min(this.x, telaJogo.width - this.largura));

    }

    // Método 'mover' é chamado para mudar a direção do
    // jogador com base na entrada do usuário.
    mover(direcao) {

        // Define uma constante 'velocidade' com valor 5, que é a
        // quantidade de pixels que o jogador se move por atualização.
        const velocidade = 5;

        // Define a 'velocidade' do jogador baseado na
            // direção passada ao método.
        // Se a direção for 'esquerda', 'velocidade' é
            // definida como -5, fazendo com que 'x' diminua.
        // Se não for 'esquerda' (ou seja, 'direita'),
            // 'velocidade' é 5, fazendo com que 'x' aumente.
        this.velocidade = direcao === 'esquerda' ? -velocidade : velocidade;

    }

    // Método 'parar' é usado para parar o movimento do
    // jogador ao zerar a 'velocidade'.
    parar() {

        // Atribui 0 à 'velocidade' do jogador, efetivamente
        // parando seu movimento lateral.
        this.velocidade = 0;
        
    }

    // Método 'perderVida' na classe Jogador. Este método é
    // chamado sempre que o jogador é atingido por um
    // inimigo ou por um projétil.
    perderVida() {

        // Decrementa o número de vidas do jogador em 1.
        this.vidas--;

        // Atualiza o texto do elemento HTML que mostra
            // as vidas restantes do jogador.
        // 'document.getElementById('vidas')' obtém o
            // elemento HTML com ID 'vidas'.
        // '.innerText' é uma propriedade que permite
            // modificar o texto dentro de um elemento HTML.
        // 'Vidas: ${this.vidas}' é uma template string que
            // incorpora o valor atual de 'this.vidas'.
        document.getElementById('vidas').innerText = `Vidas: ${this.vidas}`;

        // Verifica se o jogador está sem vidas.
        if (this.vidas === 0) {

            // Se o jogador não tem mais vidas, redefine o
                // número de vidas no localStorage para 3.
            // 'localStorage.setItem('vidas', 3)' armazena a
                // chave 'vidas' com o valor '3' no localStorage do navegador.
            // Isso é útil para reiniciar o estado do jogo
                // com 3 vidas na próxima vez que o jogo for carregado.
            localStorage.setItem('vidas', 3);

            // Exibe uma modal informando ao jogador que
                // ele perdeu e que o jogo terminou.
            // 'exibirModal' é uma função que cria e mostra
                // uma janela modal com uma mensagem.
            // 'Você perdeu! Game Over' é a mensagem exibida.
            // O segundo argumento, 'false', indica que o botão
                // para continuar não deve ser exibido na modal.
            exibirModal('Você perdeu! Game Over', false);

        }
    }

}

// Define a classe 'Bala', que herda características da classe 'Objeto'.
// Essa classe é usada para criar e gerenciar as balas disparadas no jogo.
class Bala extends Objeto {

  // O construtor é chamado quando um novo objeto 'Bala' é criado.
  constructor(x, y, largura, altura, cor, velocidade) {

    // Chama o construtor da classe pai (Objeto) com
          // as propriedades necessárias.
    // Essas propriedades definem a posição inicial,
          // tamanho e cor da bala.
    super(x, y, largura, altura, cor);

    // 'this.velocidade' armazena a velocidade da bala. Esta
          // propriedade controla a rapidez com que a
          // bala se move no canvas.
    // O valor de 'velocidade' pode ser positivo ou negativo,
          // dependendo da direção que a bala deve se
          // mover (para cima ou para baixo).
    this.velocidade = velocidade;

  }

  // Método 'atualizar' é usado para atualizar o estado da bala.
  // É chamado a cada frame do jogo para mover a bala na tela.
  atualizar() {

    // Incrementa 'this.y' pela 'this.velocidade'. Isso
          // move a bala verticalmente no canvas.
    // Se 'velocidade' for positiva, a bala move-se para
          // baixo; se negativa, para cima.
    this.y += this.velocidade;

  }

}


// Define a classe 'Inimigo' que herda da classe 'Objeto'.
// Esta classe é utilizada para criar e gerenciar os
      // inimigos no jogo, definindo suas
      // características e comportamentos.
class Inimigo extends Objeto {

  // O construtor é chamado para criar uma nova instância de 'Inimigo'.
  constructor(x, y, largura, altura, imagem) {

    // Chama o construtor da classe base 'Objeto' para
          // inicializar as propriedades comuns como
          // posição e tamanho.
    super(x, y, largura, altura);

    // 'this.imagem' armazena uma referência ao objeto
          // Image que representa visualmente o inimigo.
    // Esta imagem é usada quando o inimigo é desenhado no canvas.
    this.imagem = imagem;

    // 'this.chanceTiro' define a probabilidade de o
          // inimigo disparar um tiro em cada atualização de frame.
    // Um valor muito pequeno como 0.0003 significa que o
          // inimigo tem uma chance baixa, mas constante, de atirar.
    this.chanceTiro = 0.0003;

    // 'this.direcao' inicializa a direção do movimento do inimigo.
    // O valor 1 indica que o inimigo se moverá para a
          // direita. Um valor -1 indicaria movimento para a esquerda.
    // Esta propriedade é usada para controlar a
          // direção horizontal do inimigo no jogo.
    this.direcao = 1;
  }

  // Método 'desenhar' para exibir o inimigo no canvas.
  desenhar() {

    // 'contexto.drawImage' é uma função do contexto 2D
          // do canvas usada para desenhar uma imagem.
    // 'this.imagem' é a imagem que será desenhada no canvas.
    // 'this.x' e 'this.y' são as coordenadas no canvas onde a
          // imagem do inimigo será posicionada.
    // 'this.largura' e 'this.altura' definem o tamanho da imagem quando desenhada.
    contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    
  }

  // Método 'atualizar' que é chamado a cada frame para
        // atualizar a posição e verificar se o inimigo deve atirar.
  atualizar() {

    // Incrementa a posição horizontal 'x' do inimigo pela sua direção.
    // Se 'this.direcao' for 1, o inimigo se move para a
        // direita; se for -1, para a esquerda.
    this.x += this.direcao;

    // Utiliza 'Math.random()' para gerar um número aleatório entre 0 e 1.
    // Se esse número for menor que 'this.chanceTiro', o inimigo atira.
    // 'this.chanceTiro' é a probabilidade de o inimigo
          // atirar a cada atualização de frame,
          // estabelecida como 0.0003.
    if (Math.random() < this.chanceTiro) {

        // Chama o método 'atirar' se a condição for verdadeira.
        this.atirar();

    }
  }

  // Método 'atirar' responsável por criar uma
        // nova bala e adicioná-la ao jogo.
  atirar() {

    // Cria uma nova instância de 'Bala'.
    // A posição 'x' da bala é calculada para ser
          // disparada do meio do inimigo, ajustando-se
          // com 'this.largura / 2 - 2'.
    // A posição 'y' é ajustada para começar logo após o
          // final do inimigo, usando 'this.y + this.altura'.
    // '4' e '10' são a largura e altura da bala, respectivamente.
    // 'blue' define a cor da bala.
    // '2' é a velocidade da bala, indicando que ela se
          // move para baixo a uma taxa de 2 pixels por frame.
    balasInimigas.push(new Bala(this.x + this.largura / 2 - 2, this.y + this.altura, 4, 10, 'blue', 2));
  }

}


// Define a função 'exibirModal' que é responsável por
      // exibir uma janela modal com uma mensagem personalizada para o jogador.
function exibirModal(mensagem, podeContinuar) {

    // Atribui o texto passado como parâmetro 'mensagem' ao
          // elemento HTML que exibe o texto na modal.
    // 'mensagemModal' é o elemento HTML onde a mensagem será mostrada.
    mensagemModal.innerText = mensagem;

    // Verifica o parâmetro booleano 'podeContinuar' para
          // decidir se o botão de continuar deve ser mostrado.
    if (podeContinuar) {

        // Se 'podeContinuar' for verdadeiro, o botão 'Continuar' é exibido.
        // 'inline-block' permite que o botão seja mostrado e
              // ocupa apenas o espaço necessário para seu conteúdo.
        botaoContinuar.style.display = 'inline-block';

    } else {

        // Se 'podeContinuar' for falso, o botão 'Continuar' é ocultado.
        // 'none' faz com que o botão não seja exibido e
              // também não ocupe espaço no layout.
        botaoContinuar.style.display = 'none';

    }

    // Configura a modal para ser exibida.
    // 'flex' é um valor de display que ativa o modelo de
              // layout flexível para o container, permitindo
              // que itens dentro dele sejam alinhados e distribuídos.
    modal.style.display = 'flex';

}

// Define a classe 'GradeInimigos', que é responsável
      // por criar e gerenciar uma formação de inimigos.
class GradeInimigos {

  // O construtor é chamado para criar uma nova instância de 'GradeInimigos'.
  constructor(linhas, colunas, espacamentoInimigo, larguraInimigo, alturaInimigo) {

    // 'this.linhas' define o número de linhas de inimigos na grade.
    this.linhas = linhas;

    // 'this.colunas' define o número de colunas de inimigos na grade.
    this.colunas = colunas;

    // 'this.espacamentoInimigo' estabelece a distância entre
          // cada inimigo na grade, tanto vertical
          // quanto horizontalmente.
    this.espacamentoInimigo = espacamentoInimigo;

    // 'this.larguraInimigo' define a largura de
          // cada inimigo na grade.
    this.larguraInimigo = larguraInimigo;

    // 'this.alturaInimigo' define a altura de cada inimigo na grade.
    this.alturaInimigo = alturaInimigo;

    // 'this.inimigos' é um array para armazenar todos os
          // inimigos criados. Inicialmente, está vazio.
    this.inimigos = [];

    // 'this.criarInimigos()' é um método chamado para
          // popular a grade com inimigos usando os
          // parâmetros fornecidos.
    this.criarInimigos();

    // 'this.velocidade' define a velocidade com que a
          // grade inteira de inimigos se move. Inicialmente é 1,
          // o que significa um pixel por frame.
    this.velocidade = 1;

    // 'this.direcao' estabelece a direção inicial do
          // movimento da grade de inimigos. Um valor
          // de 1 indica para a direita; -1 para a esquerda.
    this.direcao = 1;

    // 'this.pontuacao' inicializa a pontuação gerada pela
          // destruição dos inimigos. Começa em 0 e é
          // incrementada conforme os inimigos são derrotados.
    this.pontuacao = 0;

  }


  // Método 'criarInimigos' define como os inimigos são
        // inicialmente criados e posicionados em uma grade.
  criarInimigos() {

      // Limpa o array 'this.inimigos' para garantir que ele
            // esteja vazio antes de adicionar novos inimigos.
      // Isso é útil quando precisamos recriar a grade de
            // inimigos sem acumular entradas antigas.
      this.inimigos = [];

      // Laço 'for' que itera sobre cada linha da grade de inimigos.
      for (let linha = 0; linha < this.linhas; linha++) {

          // Laço 'for' aninhado que itera sobre cada coluna na linha atual.
          for (let coluna = 0; coluna < this.colunas; coluna++) {

              // Cria uma nova instância da classe 'Inimigo'
                    // para cada posição na grade.
              // Os parâmetros para o construtor de 'Inimigo' incluem:
              // 1. A posição 'x', calculada como o número da
                    // coluna multiplicado pela soma da largura do
                    // inimigo e o espaçamento entre inimigos.
              //    Isso assegura que cada inimigo é posicionado
                    // horizontalmente com o espaçamento correto.
              // 2. A posição 'y', similarmente calculada, usando o
                    // número da linha e a altura do inimigo.
                    // Isso posiciona verticalmente cada inimigo na grade.
              // 3. A largura do inimigo.
              // 4. A altura do inimigo.
              // 5. A imagem a ser usada para esse inimigo, supondo
                    // que 'imagemInimigo' é uma variável previamente
                    // definida ou uma constante que representa a imagem.
              this.inimigos.push(new Inimigo(
                  coluna * (this.larguraInimigo + this.espacamentoInimigo),
                  linha * (this.alturaInimigo + this.espacamentoInimigo),
                  this.larguraInimigo,
                  this.alturaInimigo,
                  imagemInimigo
              ));
          }
      }
  }

  

  
  // Método 'atualizar' da classe 'GradeInimigos', usado
        // para atualizar o estado de todos os inimigos na grade.
  atualizar() {

    // 'atingiuParede' é uma flag (sinalizador) que indica se
          // algum inimigo atingiu a borda lateral do canvas.
    let atingiuParede = false;

    // 'this.inimigos.forEach' é um método que itera sobre
          // cada elemento no array 'this.inimigos'.
    // Para cada 'inimigo', executa a função passada como argumento.
    this.inimigos.forEach(inimigo => {

        // Chama o método 'atualizar' de cada inimigo, que
            // atualiza a posição do inimigo
            // baseado em sua direção e velocidade.
        inimigo.atualizar();

        // Verifica se o inimigo atingiu a borda esquerda
            // do canvas (inimigo.x <= 0) ou
        // a borda direita do canvas (inimigo.x + inimigo.largura >= telaJogo.width).
        // 'telaJogo.width' é a largura total do canvas
            // onde os inimigos estão sendo desenhados.
        if (inimigo.x <= 0 || inimigo.x + inimigo.largura >= telaJogo.width) {

            // Se qualquer inimigo atingir uma das bordas, a
                  // flag 'atingiuParede' é setada como true.
            atingiuParede = true;
            
        }
    });

    
    // Este bloco de código é executado se algum inimigo na
          // grade atingiu a parede lateral do canvas, como
          // detectado pela flag 'atingiuParede'.
    if (atingiuParede) {

      // Inverte a direção horizontal de movimento da
          // grade de inimigos.
      // Multiplica a direção atual por -1. Se a direção
          // era 1 (movendo-se para a direita), agora
          // será -1 (movendo-se para a esquerda), e vice-versa.
      this.direcao *= -1;

      // 'offsetY' é uma variável que calcula o quanto
          // todos os inimigos na grade devem se mover
          // verticalmente para baixo.
      // É definido como a altura de um inimigo mais o
          // espaçamento entre os inimigos, garantindo que
          // eles desçam um espaço claro sem sobreposição.
      const offsetY = this.alturaInimigo + this.espacamentoInimigo;

      // Itera sobre cada inimigo na grade novamente.
      this.inimigos.forEach(inimigo => {

          // Atualiza a direção de cada inimigo
                // individualmente para a nova direção.
          // Isso assegura que todos os inimigos começarão a
                // se mover na nova direção horizontal depois
                // de atingir a parede.
          inimigo.direcao = this.direcao;

          // Move cada inimigo para baixo adicionando
                // 'offsetY' à posição 'y' de cada inimigo.
          // Isso faz com que a grade inteira de inimigos desça
                // cada vez que qualquer inimigo atinge uma
                // das bordas laterais do canvas.
          inimigo.y += offsetY;

      });
    }


    // Itera sobre cada inimigo na lista 'this.inimigos'.
    this.inimigos.forEach(inimigo => {

        // Primeira condição: verifica se há uma
              // colisão entre o inimigo e o jogador.
        // A condição verifica quatro aspectos para determinar
              // se os retângulos que representam o inimigo e
              // o jogador se sobrepõem.
        if (

            // Verifica se o lado direito do inimigo está à
                // direita do lado esquerdo do jogador.
            inimigo.x < jogador.x + jogador.largura &&

            // Verifica se o lado esquerdo do inimigo está à
                // esquerda do lado direito do jogador.
            inimigo.x + inimigo.largura > jogador.x &&

            // Verifica se a parte inferior do inimigo
                // está abaixo da parte superior do jogador.
            inimigo.y + inimigo.altura > jogador.y &&

            // Verifica se a parte superior do inimigo está
                // acima da parte inferior do jogador.
            inimigo.y < jogador.y + jogador.altura

        ) {

            // Se todas as condições acima forem verdadeiras,
                // uma colisão foi detectada.
            // Chama o método 'perderVida' do jogador,
                // indicando que o jogador foi atingido.
            jogador.perderVida();

        }

        // Segunda condição: verifica se algum inimigo
                // atingiu a parte inferior do canvas.
        // Isso é geralmente usado para indicar que o jogo
                // está perdido, ou para fazer o jogador perder uma vida,
        // dependendo das regras específicas do jogo.
        if (inimigo.y + inimigo.altura >= telaJogo.height) {

            // Se a parte inferior do inimigo atingir
                // ou passar da altura do canvas,
            // chama 'perderVida' no jogador.
            jogador.perderVida();

        }


      // Itera sobre cada bala na lista 'balasJogador',
            // usando um loop forEach que também fornece
            // o 'indice' da bala atual.
      balasJogador.forEach((bala, indice) => {

        // Condição para detectar colisão entre uma bala e um inimigo.
        // A condição verifica se os retângulos que
              // representam a bala e o inimigo se sobrepõem.
        if (

            // Verifica se o lado direito da bala está à
                  // direita do lado esquerdo do inimigo.
            bala.x < inimigo.x + inimigo.largura &&

            // Verifica se o lado esquerdo da bala está à
                  // esquerda do lado direito do inimigo.
            bala.x + bala.largura > inimigo.x &&

            // Verifica se a parte inferior da bala está
                  // abaixo da parte superior do inimigo.
            bala.y < inimigo.y + inimigo.altura &&

            // Verifica se a parte superior da bala está
                  // acima da parte inferior do inimigo.
            bala.y + bala.altura > inimigo.y

        ) {

            // Se todas as condições acima forem verdadeiras,
                  // uma colisão foi detectada.
            // Remove a bala do array 'balasJogador'
                  // usando 'splice', que elimina o
                  // elemento no 'indice' especificado.
            balasJogador.splice(indice, 1);

            // Remove o inimigo do array 'this.inimigos'.
            // 'this.inimigos.indexOf(inimigo)' encontra o
                  // índice do inimigo que foi atingido para
                  // que possa ser removido.
            this.inimigos.splice(this.inimigos.indexOf(inimigo), 1);

            // Chama o método 'aumentarPontuacao' para
                  // incrementar a pontuação do jogador
                  // após acertar um inimigo.
            this.aumentarPontuacao();
            
        }
      });


      // Itera sobre cada bala na lista 'balasInimigas',
            // usando um loop forEach que também fornece o 'indice' da bala atual.
      balasInimigas.forEach((bala, indice) => {

        // Condição para detectar colisão entre uma
              // bala inimiga e o jogador.
        // A condição verifica se os retângulos que
              // representam a bala e o jogador se sobrepõem.
        if (

            // Verifica se o lado direito da bala está à
                  // direita do lado esquerdo do jogador.
            bala.x < jogador.x + jogador.largura &&

            // Verifica se o lado esquerdo da bala está à
                  // esquerda do lado direito do jogador.
            bala.x + bala.largura > jogador.x &&

            // Verifica se a parte inferior da bala está
                  // abaixo da parte superior do jogador.
            bala.y < jogador.y + jogador.altura &&

            // Verifica se a parte superior da bala está
                  // acima da parte inferior do jogador.
            bala.y + bala.altura > jogador.y

        ) {

            // Se todas as condições acima forem verdadeiras,
                  // uma colisão foi detectada.
            // Remove a bala do array 'balasInimigas' usando
                  // 'splice', que elimina o elemento no 'indice' especificado.
            balasInimigas.splice(indice, 1);

            // Chama o método 'perderVida' do jogador,
                  // indicando que o jogador foi atingido pela bala.
            jogador.perderVida();

        }

      });

    });

    // Verifica se a lista de inimigos está vazia e se o
          // jogador ainda tem vidas restantes.
    if (this.inimigos.length === 0 && jogador.vidas > 0) {

        // Se não há mais inimigos na lista (todos foram
                // destruídos) e o jogador ainda possui pelo menos uma vida,
        // um novo 'chefe' é criado para introduzir um novo desafio ao jogo.

        // Cria uma nova instância do 'Chefe'. Os parâmetros
                // para o construtor incluem:
        // 1. Posição 'x' inicial do chefe, que é calculada
                // para ser o centro horizontal do canvas menos 200 pixels.
        //    Isso é feito para centralizar o chefe que tem
                // uma largura de 400 pixels.
        // 2. Posição 'y' inicial do chefe, que é definida
              // como 0, posicionando-o no topo do canvas.
        // 3. Largura do chefe, definida como 400 pixels, fazendo
              // com que o chefe seja visualmente maior que os inimigos comuns.
        // 4. Altura do chefe, definida como 200 pixels,
              // aumentando sua presença visual.
        // 5. 'imagemChefe' é a imagem gráfica usada para
              // representar o chefe visualmente no jogo.
        chefe = new Chefe(telaJogo.width / 2 - 200, 0, 400, 200, imagemChefe);
        
    }

  }

  // Método 'desenhar' da classe 'GradeInimigos'.
  desenhar() {

    // Itera sobre cada 'inimigo' no array 'this.inimigos'.
    // Para cada inimigo, chama o método 'desenhar()' que
          // é definido na classe 'Inimigo'.
    // Esse método é responsável por renderizar
          // visualmente o inimigo no canvas.
    this.inimigos.forEach(inimigo => inimigo.desenhar());

  }


  // Método 'aumentarPontuacao' é usado para incrementar a
        // pontuação do jogador e atualizar a exibição da pontuação.
  aumentarPontuacao() {

      // Incrementa a pontuação por 1. 'this.pontuacao' mantém a
              // pontuação total acumulada pelo jogador ao destruir inimigos.
      this.pontuacao++;

      // Formata a pontuação para o formato numérico local
              // brasileiro usando 'toLocaleString'.
      // Isso adiciona separadores de milhar conforme
              // apropriado, facilitando a leitura dos números.
      const pontuacaoFormatada = this.pontuacao.toLocaleString('pt-BR');

      // Atualiza o elemento HTML que mostra a pontuação. O elemento é
              // identificado por seu ID 'pontuacao'.
      // '.innerText' define o texto dentro desse elemento
              // para mostrar a pontuação formatada.
      document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacaoFormatada}`;

      // Salva a pontuação atual no 'localStorage'. Isso permite
              // que a pontuação seja persistida entre sessões de jogo.
      // A pontuação pode ser recuperada quando o jogo é recarregado,
              // permitindo que o jogador continue de onde parou.
      localStorage.setItem('pontuacao', this.pontuacao);

  }

}


// Define a classe 'Chefe', que herda da classe 'Objeto'.
// 'Chefe' representa um inimigo mais forte e desafiador no jogo.
class Chefe extends Objeto {

  // Construtor de 'Chefe', chamado ao criar uma nova
        // instância desta classe.
  constructor(x, y, largura, altura, imagem) {

    // Chama o construtor da classe base 'Objeto' com
        // parâmetros de posição e tamanho.
    // Esses parâmetros definem onde e quão grande o
        // chefe aparecerá no canvas.
    super(x, y, largura, altura);

    // 'this.imagem' armazena a imagem gráfica que
        // representa o chefe visualmente.
    // Esta imagem é usada para desenhar o
        // chefe no método 'desenhar'.
    this.imagem = imagem;

    // 'this.vidas' define a quantidade de vidas
        // ou saúde que o chefe tem.
    // 100 vidas significam que o chefe pode ser
        // atingido muitas vezes antes de ser derrotado.
    this.vidas = 100;

    // 'this.chanceTiro' define a probabilidade de o
        // chefe atirar em cada ciclo de atualização do jogo.
    // 0.02 indica uma chance de 2% de atirar a cada
        // ciclo, o que é relativamente alto comparado a outros inimigos.
    this.chanceTiro = 0.02; // Aumentado para atirar mais frequentemente

    // 'this.direcao' inicializa a direção horizontal de movimento do chefe.
    // Um valor de 1 significa que o chefe começa se movendo para a direita.
    this.direcao = 1; // Direção inicial

    // 'this.velocidade' define quão rápido o chefe se move pelo canvas.
    // Um valor de 2 significa que o chefe se move 2 pixels
          // por ciclo de atualização, o que é relativamente rápido.
    this.velocidade = 2; // Velocidade de movimento do chefe

  }


  // Método 'desenhar' da classe 'Chefe'.
  desenhar() {

      // Utiliza o contexto do canvas para desenhar a imagem do chefe.
      // 'this.imagem' é a imagem gráfica do chefe.
      // 'this.x' e 'this.y' são as coordenadas no
            // canvas onde a imagem será posicionada.
      // 'this.largura' e 'this.altura' são as dimensões da imagem.
      // Esses valores determinam onde e quão grande o chefe aparece no jogo.
      contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
  }


  // Método 'atualizar' é chamado em cada ciclo de
        // atualização do jogo para alterar o estado do chefe.
  atualizar() {

    // Atualiza a posição horizontal do chefe,
          // incrementando 'this.x' pela direção multiplicada pela velocidade.
    // 'this.direcao' pode ser 1 (movendo para a direita) ou -1 (movendo para a esquerda).
    // 'this.velocidade' é a taxa de deslocamento do
          // chefe em pixels por ciclo.
    this.x += this.direcao * this.velocidade;

    // Verifica se o chefe atinge as bordas laterais do canvas.
    // 'this.x <= 0' verifica se o chefe atinge ou
          // ultrapassa a borda esquerda do canvas.
    // 'this.x + this.largura >= telaJogo.width' verifica
          // se o chefe atinge ou ultrapassa a borda direita do canvas.
    // 'telaJogo.width' é a largura total do canvas.
    if (this.x <= 0 || this.x + this.largura >= telaJogo.width) {

        // Se qualquer uma das condições for verdadeira,
              // inverte a direção do movimento do chefe.
        this.direcao *= -1; // Inverte a direção ao bater na borda

    }

    // Gera um número aleatório e verifica se é menor
              // que 'this.chanceTiro'.
    // 'this.chanceTiro' é a probabilidade do chefe atirar em
              // um dado ciclo, definido como 0.02 ou 2%.
    if (Math.random() < this.chanceTiro) {

        // Se a condição for verdadeira, chama o método 'atirar'.
        this.atirar();

    }

  }


  // Método 'atirar' da classe 'Chefe', usado para que o
        // chefe dispare projéteis contra o jogador.
  atirar() {

      // Adiciona um novo objeto 'Bala' ao array 'balasInimigas'.
      // Esta bala é criada com as seguintes especificações:
      // 1. Posição x: Calculada para ser disparada do centro
              // do chefe, ajustado ligeiramente para alinhar
              // visualmente com sua posição.
      //    'this.x + this.largura / 2 - 2' calcula o meio do
              // chefe e ajusta a posição inicial da bala para
              // parecer que está saindo do centro do chefe.
      // 2. Posição y: 'this.y + this.altura' coloca a bala
              // logo abaixo do chefe, garantindo que ela apareça
              // como se estivesse sendo disparada dele.
      // 3. Largura da bala: 4 pixels.
      // 4. Altura da bala: 10 pixels.
      // 5. Cor da bala: 'blue', para diferenciar visualmente as
              // balas do chefe das balas do jogador.
      // 6. Velocidade da bala: 2, indicando que a bala se move
              // para baixo na tela a uma velocidade de 2 pixels
              // por ciclo de atualização.
      balasInimigas.push(new Bala(this.x + this.largura / 2 - 2, this.y + this.altura, 4, 10, 'blue', 2));

  }


  // Método 'levarDano' da classe 'Chefe', chamado quando o
        // chefe é atingido por uma bala do jogador.
  levarDano() {

    // Decrementa o número de vidas do chefe por um a
        // cada vez que ele é atingido.
    this.vidas--;

    // Verifica se as vidas do chefe chegaram a zero ou
        // menos, o que indica que ele foi derrotado.
    if (this.vidas <= 0) {

        // Adiciona 100 pontos à pontuação total
            // quando o chefe é derrotado.
        gradeInimigos.pontuacao += 100;

        // Formata a pontuação para o formato numérico
              // local brasileiro usando 'toLocaleString'.
        // Isso adiciona separadores de milhar conforme
              // apropriado, facilitando a leitura dos números.
        const pontuacaoFormatada = gradeInimigos.pontuacao.toLocaleString('pt-BR');

        // Atualiza o elemento HTML que mostra a pontuação.
        // O elemento é identificado por seu ID 'pontuacao'.
        // '.innerText' define o texto dentro desse elemento
              // para mostrar a pontuação formatada.
        document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacaoFormatada}`;

        // Salva a pontuação atual no 'localStorage'. Isso
              // permite que a pontuação seja persistida
              // entre sessões de jogo.
        // A pontuação pode ser recuperada quando o jogo é
              // recarregado, permitindo que o jogador continue de onde parou.
        localStorage.setItem('pontuacao', gradeInimigos.pontuacao);

        // Salva a quantidade de vidas do jogador no 'localStorage'.
        // Isso é feito para persistir o estado do jogo e permitir
              // que o jogador continue com o mesmo número de vidas
              // se o jogo for recarregado.
        localStorage.setItem('vidas', jogador.vidas);

        // Recarrega a página, reiniciando o jogo do zero.
        // 'document.location.reload()' é um método que
              // recarrega a página atual, reiniciando todo o estado do jogo
        // e a execução do script desde o início.
        document.location.reload();

    }
  }

}


// Inicia o processo de carregar imagens para serem usadas no jogo.
    // Cada variável do tipo Image será usada para representar
    // graficamente os diferentes personagens e objetos no jogo.

// Cria um novo objeto Image para representar o jogador.
const imagemJogador = new Image();

// Define o caminho do arquivo da imagem que
    // representa a nave do jogador.
imagemJogador.src = 'nave.png';

// Cria um novo objeto Image para representar
    // os inimigos comuns.
const imagemInimigo = new Image();

// Define o caminho do arquivo da imagem que
    // representa um inimigo comum.
imagemInimigo.src = 'inimigo.png';

// Cria um novo objeto Image para representar o chefe.
const imagemChefe = new Image();

// Define o caminho do arquivo da imagem que
    // será usada para o chefe no jogo.
imagemChefe.src = 'chefe.png';

// Cria um novo objeto 'Jogador', passando parâmetros
    // que definem sua posição inicial e a imagem a ser usada.
// 'telaJogo.width / 2 - 15' posiciona o jogador
    // horizontalmente no centro do canvas, ajustando
    // para que o meio da nave fique centrado.
// 'telaJogo.height - 30' posiciona o jogador na
    // parte inferior do canvas.
// '30' e '10' são a largura e a altura da nave, respectivamente.
const jogador = new Jogador(telaJogo.width / 2 - 15, telaJogo.height - 30, 30, 10, imagemJogador);

// Inicializa um array vazio para armazenar as
    // balas disparadas pelo jogador.
const balasJogador = [];

// Cria uma nova 'GradeInimigos', que gerencia
    // uma coleção de inimigos comuns.
// '10', '12' representam o número de linhas e
    // colunas de inimigos.
// '10', '30', '20' são o espaçamento entre os
    // inimigos, largura e altura de cada inimigo.
const gradeInimigos = new GradeInimigos(10, 12, 10, 30, 20);

// Inicializa um array vazio para armazenar as
    // balas disparadas pelos inimigos.
const balasInimigas = [];

// Inicializa uma variável 'chefe' como null, que será
    // usada para armazenar uma instância do chefe
    // quando ele for criado no jogo.
let chefe = null;


// Define a função 'loopJogo', que é o ciclo
// de atualização e renderização principal do jogo.
function loopJogo() {

    // Limpa toda a tela a cada ciclo, preparando o
            // canvas para um novo frame de desenho.
    // Isso evita sobreposições gráficas dos frames anteriores.
    contexto.clearRect(0, 0, telaJogo.width, telaJogo.height);

    // Chama o método 'atualizar' do jogador para
            // processar movimentos e outras lógicas de atualização.
    jogador.atualizar();

    // Chama o método 'desenhar' do jogador para
            // renderizá-lo na nova posição no canvas.
    jogador.desenhar();

    // Itera sobre cada 'bala' no array 'balasJogador'
          // para atualizar e desenhar cada uma.
    balasJogador.forEach((bala, indice) => {

        // Atualiza a posição da bala com base em sua velocidade.
        bala.atualizar();

        // Verifica se a bala saiu da tela pelo topo (coordenada y negativa).
        if (bala.y + bala.altura < 0) {

            // Remove a bala do array 'balasJogador' se ela saiu da tela.
            // Isso libera recursos e evita processamento desnecessário.
            balasJogador.splice(indice, 1);

        } else {

            // Se a bala ainda estiver visível na tela,
                  // chama seu método 'desenhar' para renderizá-la.
            bala.desenhar();

        }
    });

  // Itera sobre cada 'bala' no array 'balasInimigas',
        // atualizando seu estado e renderizando-as.
  balasInimigas.forEach((bala, indice) => {

      // Atualiza a posição da bala com base em sua velocidade.
      bala.atualizar();

      // Verifica se a bala ultrapassou o limite inferior do canvas.
      if (bala.y > telaJogo.height) {

          // Se a bala passou do limite inferior do
                // canvas, ela é removida do array.
          // Isso evita processamento desnecessário e
                // possíveis problemas de desempenho.
          balasInimigas.splice(indice, 1);

      } else {

          // Se a bala ainda estiver dentro dos limites
                // do canvas, ela é desenhada na tela.
          bala.desenhar();

      }
  });

  // Verifica se ainda existem inimigos vivos na grade de inimigos.
  if (gradeInimigos.inimigos.length > 0) {

      // Se houver inimigos, atualiza a posição e
            // o estado de cada inimigo na grade.
      gradeInimigos.atualizar();

      // Desenha os inimigos atualizados na tela.
      gradeInimigos.desenhar();

  }

  
  // Verifica se a variável 'chefe' é verdadeira,
        // indicando que um chefe foi criado e está ativo no jogo.
  if (chefe) {

      // Chama o método 'atualizar' do chefe para
            // processar seu movimento e ações, como disparar balas.
      chefe.atualizar();

      // Chama o método 'desenhar' do chefe para
            // renderizá-lo na tela na posição atualizada.
      chefe.desenhar();

  }


  // Itera sobre cada 'bala' no array 'balasJogador' para
            // atualizar seu estado e verificar colisões com o chefe.
  balasJogador.forEach((bala, indiceBala) => {

    // Verifica se 'chefe' existe e se a 'bala' atual está colidindo com ele.
    // A colisão é verificada por sobreposição de coordenadas.
    if (chefe && 

        // Verifica se o lado direito da bala está à
        // direita do lado esquerdo do chefe.
        bala.x < chefe.x + chefe.largura &&  

        // Verifica se o lado esquerdo da bala está à
        // esquerda do lado direito do chefe.
        bala.x + bala.largura > chefe.x &&   

        // Verifica se a parte inferior da bala está
        // abaixo da parte superior do chefe.
        bala.y < chefe.y + chefe.altura &&   

        // Verifica se a parte superior da bala está
        // acima da parte inferior do chefe.
        bala.y + bala.altura > chefe.y) {    
        
          // Se todas as condições de colisão forem
              // verdadeiras, o chefe recebe dano.
        chefe.levarDano();

        // A bala que colidiu é removida do array 'balasJogador'
              // para não ser mais processada ou desenhada.
        balasJogador.splice(indiceBala, 1);
        
    }


    // Itera sobre cada inimigo na lista de
          // inimigos mantida por 'gradeInimigos'.
    gradeInimigos.inimigos.forEach((inimigo, indiceInimigo) => {

      // Verifica se uma bala específica está colidindo com o inimigo atual.
      // A colisão é determinada pela sobreposição das
            // áreas retangulares de ambos.
      if (

          // Verifica se o lado direito da bala está à
          // direita do lado esquerdo do inimigo.
          bala.x < inimigo.x + inimigo.largura &&
          
          // Verifica se o lado esquerdo da bala está à
          // esquerda do lado direito do inimigo.
          bala.x + bala.largura > inimigo.x &&   

          // Verifica se a parte inferior da bala está
          // abaixo da parte superior do inimigo.
          bala.y < inimigo.y + inimigo.altura &&   

          // Verifica se a parte superior da bala está
          // acima da parte inferior do inimigo.
          bala.y + bala.altura > inimigo.y         
      
      ) {

          // Se a bala e o inimigo estão colidindo,
          // realiza as seguintes ações:

          // Remove o inimigo do array de inimigos, utilizando o
              // 'splice' para remover o item no índice detectado.
          gradeInimigos.inimigos.splice(indiceInimigo, 1);

          // Remove a bala do array de balas do jogador,
                // também utilizando 'splice'.
          // Isso evita que a mesma bala seja processada mais de
                // uma vez ou cause múltiplas colisões.
          balasJogador.splice(indiceBala, 1);

          // Chama o método 'aumentarPontuacao' da 'gradeInimigos'
                // para incrementar a pontuação do jogador.
          // Isso recompensa o jogador por acertar um inimigo.
          gradeInimigos.aumentarPontuacao();

      }
    });

  });

  // Itera sobre cada bala no array 'balasInimigas'
        // para verificar colisões com o jogador.
  balasInimigas.forEach((bala, indice) => {

      // Verifica se a bala atual está colidindo com o jogador.
      // A colisão é determinada pela sobreposição das
            // áreas retangulares de ambos.
      if (

          // Verifica se o lado direito da bala está à direita
                // do lado esquerdo do jogador.
          bala.x < jogador.x + jogador.largura &&
          
          // Verifica se o lado esquerdo da bala está à
                // esquerda do lado direito do jogador.
          bala.x + bala.largura > jogador.x &&   

          // Verifica se a parte inferior da bala está
                // abaixo da parte superior do jogador.
          bala.y < jogador.y + jogador.altura &&   

          // Verifica se a parte superior da bala está
                // acima da parte inferior do jogador.
          bala.y + bala.altura > jogador.y        

      ) {

          // Se a bala e o jogador estão colidindo,
                // realiza as seguintes ações:

          // Remove a bala do array 'balasInimigas', utilizando
                // 'splice' para remover o item no índice detectado.
          balasInimigas.splice(indice, 1);

          // Chama o método 'perderVida' do jogador,
                // indicando que ele foi atingido por uma bala.
          jogador.perderVida();

      }
  });


  // Verifica se o jogador ainda tem vidas restantes.
  if (jogador.vidas > 0) {

        // Se o jogador ainda possui vidas, o ciclo de jogo continua.
        // 'requestAnimationFrame' é usado para agendar a
            // próxima chamada do 'loopJogo', mantendo o
            // jogo em execução.
        requestAnimationFrame(loopJogo);

    }

        
    
}

// Adiciona um ouvinte de eventos ao botão 'botaoTerminar' que
      // executa uma função quando o botão é clicado.
botaoTerminar.addEventListener('click', () => {

    // Salva o valor 3 no localStorage com a chave 'vidas',
          // indicando que o jogador começará com 3 vidas na
          // próxima vez que o jogo for carregado.
    localStorage.setItem('vidas', 3); // Salva a quantidade de vidas no localStorage como 3

    // Recarrega a página atual, efetivamente
          // reiniciando o jogo do zero.
    // 'document.location.reload()' recarrega o
          // documento atual, reiniciando todo o estado
          // do jogo e a execução do script desde o início.
    document.location.reload(); // Reinicia o jogo do zero

});


// Adiciona um ouvinte de eventos ao objeto 'window'
      // para escutar eventos de pressionamento de tecla.
window.addEventListener('keydown', (e) => {

    // Verifica qual tecla foi pressionada e executa
          // ações baseadas na tecla específica.
    if (e.key === 'ArrowLeft') {

        // Se a tecla pressionada for a seta para a esquerda,
              // chama o método 'mover' do jogador com o argumento 'esquerda'.
        // Isso faz com que o jogador comece a se
              // mover para a esquerda.
        jogador.mover('esquerda');

    } else if (e.key === 'ArrowRight') {

        // Se a tecla pressionada for a seta para a direita,
              // chama o método 'mover' do jogador com o argumento 'direita'.
        // Isso faz com que o jogador comece a se mover para a direita.
        jogador.mover('direita');

    } else if (e.key === ' ' && balasJogador.length < 3) {

        // Se a tecla pressionada for a barra de espaço e
                // o número de balas do jogador em jogo for
                // menor que 3, permite disparar uma nova bala.
        // Adiciona uma nova bala ao array 'balasJogador' com
                // as seguintes propriedades:
        // - 'x': posição horizontal inicial da bala, ajustada
                // para sair do centro da nave do jogador.
        // - 'y': posição vertical inicial da bala, saindo da
                // frente da nave do jogador.
        // - 'largura': largura da bala, definida como 4 pixels.
        // - 'altura': altura da bala, definida como 10 pixels.
        // - 'cor': cor da bala, definida como 'red' para diferenciar visualmente.
        // - 'velocidade': velocidade da bala, definida como -4,
                // indicando que a bala se moverá para cima.
        balasJogador.push(new Bala(jogador.x + jogador.largura / 2 - 2, jogador.y, 4, 10, 'red', -4));
        
        // Reseta o tempo atual do som de tiro para 0 para
                // garantir que o som será reproduzido desde o início.
        somTiro.currentTime = 0;

        // Reproduz o som de tiro para fornecer
                // feedback auditivo ao jogador.
        somTiro.play();

    }
});



// Adiciona um ouvinte de eventos ao objeto 'window'
      // para escutar eventos de liberação de tecla.
window.addEventListener('keyup', (e) => {

  // Verifica se a tecla liberada é a seta para a
      // esquerda ou a seta para a direita.
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {

      // Chama o método 'parar' do jogador, fazendo
      // com que ele pare de se mover.
      jogador.parar();

  }
});

// Adiciona um ouvinte de eventos ao objeto 'document'
        // para escutar o evento 'DOMContentLoaded'.
document.addEventListener('DOMContentLoaded', () => {

    // Obtém a pontuação salva do localStorage.
    const pontuacaoSalva = localStorage.getItem('pontuacao');
    
    // Verifica se há uma pontuação salva.
    if (pontuacaoSalva !== null) {

        // Atualiza o elemento HTML que exibe a
              // pontuação com o valor salvo.
        document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacaoSalva}`;
        
        // Atualiza a pontuação na 'gradeInimigos' com a pontuação salva.
        gradeInimigos.pontuacao = parseInt(pontuacaoSalva, 10);

    }
    
    // Obtém as vidas salvas do localStorage, ou define 3
        // como padrão se não houver vidas salvas.
    const vidasSalvas = parseInt(localStorage.getItem('vidas'), 10) || 3;
    
    // Atualiza o número de vidas do jogador com o valor salvo.
    jogador.vidas = vidasSalvas;
    
    // Atualiza o elemento HTML que exibe as vidas com o valor salvo.
    document.getElementById('vidas').innerText = `Vidas: ${jogador.vidas}`;

});


// Inicia o ciclo principal do
      // jogo chamando 'loopJogo'.
loopJogo();

