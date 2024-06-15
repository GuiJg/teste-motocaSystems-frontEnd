Teste MotocaSystems Frontend
Este projeto é o frontend para o sistema de teste da MotocaSystems, desenvolvido em React com Vite. O sistema inclui operações de CRUD integradas com uma API fake simulada através do JSON Server. Utiliza bibliotecas como react-hot-toast, axios, react-router-dom e sweetalert2 para melhorar a experiência do usuário.


Funcionalidades
CRUD Completo: Permite gerenciar recursos através das operações de criação, leitura, atualização e exclusão.
Integração com API: Utiliza Axios para se comunicar com a API simulada.
Feedback Visual: Utiliza react-hot-toast para notificações visuais de ações e sweetalert2 para modais de confirmação.
Navegação: Utiliza react-router-dom para navegação entre diferentes páginas da aplicação.
Pré-requisitos
Antes de começar, assegure-se de ter instalado:

Node.js (v14.x ou superior)
npm ou Yarn
Como Usar
Passo 1: Clone o repositório
Clone este repositório para sua máquina local utilizando o seguinte comando:

bash
Copy code
git clone https://github.com/GuiJg/teste-motocaSystems-frontEnd.git
Passo 2: Instale as dependências
Navegue até o diretório do projeto e instale as dependências necessárias:

bash
Copy code
cd teste-motocaSystems-frontEnd
npm install  # ou yarn install
Passo 3: Inicie o servidor de desenvolvimento
Para iniciar o servidor de desenvolvimento Vite:

bash
Copy code
npm run dev  # ou yarn dev
O servidor estará disponível em http://localhost:3000.

Passo 4: Inicie o servidor JSON Server
Abra outro terminal na mesma pasta do projeto e inicie o servidor JSON Server para simular o backend:

bash
Copy code
npm run server  # ou yarn server
O JSON Server estará acessível em http://localhost:8000, utilizando o arquivo db.json.

Passo 5: Acesse a aplicação
Abra seu navegador e acesse http://localhost:3000 para visualizar a aplicação em execução.

Personalizações
Ajuste as rotas em src/routes/index.js.
Configure o JSON Server em json-server.json.
Personalize o estilo e comportamento das notificações e modais com react-hot-toast e sweetalert2.
Deploy
Este projeto pode ser implantado em serviços como Vercel, Netlify ou similar. Certifique-se de configurar as variáveis de ambiente necessárias.

Contribuições
Contribuições são bem-vindas! Para sugestões, abra um issue. Para alterações significativas, por favor abra um pull request descrevendo suas modificações propostas.
