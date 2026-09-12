
  # NutriAcesso — HTML, CSS e JavaScript

  Abra **frontend/index.html** com dois cliques no navegador. O **index.html** da raiz também leva ao site. Não precisa instalar Node.js, npm ou dependências.

  ## Arquivos para editar

  - `frontend/index.html`: estrutura das sete seções.
  - `frontend/styles.css`: cores, fontes e layout responsivo.
  - `frontend/responsive.css`: melhorias de leitura, controles de toque e adaptação para celular, tablet e desktop.
  - `frontend/data.js`: 18 serviços (oito originais e dez exemplos fictícios) e quatro resumos de artigos.
  - `frontend/carousel.js`: carrossel inicial com três imagens, troca a cada cinco segundos, navegação e pausa.
  - `frontend/app.js`: busca, filtros, menu móvel e formulário.
  - `frontend/assets/logo.png`: logo local.
  - `backend/`: pasta reservada; ainda não há servidor implementado.
  - `legacy/`: configurações e dependências antigas, preservadas como referência.
  - `src/`: código React original; o Windows bloqueou a movimentação desta pasta. Não é carregado pelo site atual.
  - `tests/`: verificações da busca e dos filtros.
  - `docs/`: documentação da conversão.

  ## Funcionamento

  A busca funciona localmente e aceita nomes sem acentos. Fotos do Unsplash e fontes do Google usam internet; existem alternativas com a logo local e fontes do sistema.

  O catálogo mostra seis resultados por vez, com botão para carregar os próximos seis. Alterar a busca ou os filtros retorna ao primeiro grupo. O resumo indica os filtros selecionados e permite limpá-los. O menu destaca a seção atual e se adapta a telas de até 1100 px.

  O formulário prepara uma mensagem no aplicativo de e-mail do visitante. O envio precisa ser finalizado nesse aplicativo. Não há backend nem confirmação automática de entrega.

  Os serviços, contatos, autoria e credenciais dos artigos vieram do protótipo e não foram verificados. Revise antes de publicar. As datas dos serviços são de 2024; os números na página representam o catálogo local. Os artigos são resumos, pois o original não contém textos completos.

  ## Testes opcionais

  Se tiver Node instalado, execute `node tests/search.test.cjs`. Node não é necessário para abrir o site.

  Para verificar o avanço automático e a navegação circular, execute `node tests/carousel.test.cjs`. O carrossel inicia automaticamente e troca de imagem a cada cinco segundos, inclusive com o mouse sobre a imagem ou foco nos controles. A interface tem apenas setas e indicadores. A aba oculta suspende o temporizador e a reprodução retorna ao reabrir a aba. A preferência por movimento reduzido desativa a transição visual, mantendo a troca automática.

  Referência original: https://www.figma.com/design/E3RA1KQTDpywPUVd5pq3g0/NutriAcesso-website-design.
  
