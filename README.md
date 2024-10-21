# Diário de Classe Online (EM CONSTRUÇÃO)

Um sistema moderno para gerenciamento de turmas, focado em chamada de alunos e registro de notas. Projetado para suportar múltiplas turmas e professores.

## Funcionalidades Principais
 
### 1. Chamada de Alunos
- O professor pode marcar a presença ou ausência dos alunos de forma simples e rápida.
- Registro da frequência de cada aluno por data e associação à turma correspondente.
 
### 2. Registro de Notas
- Permite o registro e atualização das notas dos alunos ao longo do semestre.
- Acompanhamento individual do desempenho dos alunos.
 
### 3. Gerenciamento de Turmas
- O administrador pode criar, editar e excluir turmas.
- Associação de diferentes professores a cada turma.
- Organização das informações das turmas, incluindo alunos, horários e disciplinas.
 
### 4. Acesso dos Professores
- Acesso às turmas e alunos sob responsabilidade do professor de qualquer dispositivo.
- Realização de chamadas de alunos e lançamento de notas de forma flexível.
 
### 5. Relatórios de Desempenho
- Geração de relatórios de frequência e notas para todas as turmas.
- Acesso aos relatórios de desempenho acadêmico pelos coordenadores.
 
### 6. Suporte a Múltiplos Usuários
- Suporte a múltiplos professores e turmas simultaneamente, garantindo escalabilidade.
 
---
 
## Requisitos Funcionais
 
- **Chamada de Alunos**: Marcar presença e ausência de alunos, registrando a frequência de cada um por data.
- **Registro de Notas**: Registrar e atualizar as notas dos alunos ao longo do semestre, permitindo acompanhamento individual do desempenho.
- **Gerenciamento de Turmas**: Criar, editar e excluir turmas; associar professores e organizar informações de cada turma.
- **Acesso dos Professores**: Acesso de qualquer dispositivo para marcar presença e registrar notas.
- **Relatórios de Desempenho**: Geração de relatórios de frequência e notas para coordenadores.
- **Suporte a Múltiplos Usuários**: Suporte para múltiplos professores e turmas ao mesmo tempo.
 
---
 
## Requisitos Não Funcionais
 
- **Acessibilidade**: O sistema deve ser acessível de qualquer dispositivo com conexão à internet (smartphones, tablets, desktops).
- **Desempenho**: Operações como registro de presença, notas e geração de relatórios devem ser em tempo real, sem atrasos perceptíveis.
- **Segurança**: Implementação de autenticação e criptografia dos dados de alunos e professores.
- **Usabilidade**: Interface intuitiva e fácil de usar para todos os perfis de usuários.
- **Escalabilidade**: O sistema deve ser capaz de crescer conforme o aumento de turmas, professores e alunos.
- **Confiabilidade**: O sistema deve garantir a integridade dos dados e alta disponibilidade.

## Tecnologias Utilizadas

- Frontend: React.js
- Backend: Golang
- Banco de Dados: Supabase
- Estilização: Tailwind CSS

## Funcionalidades Principais

- Gerenciamento de turmas
- Chamada de alunos
- Registro de notas
- Suporte a múltiplos professores
- Interface responsiva e intuitiva

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Go (versão 1.16 ou superior)
- Conta no Supabase

## Configuração do Projeto

1. Clone o repositório:
   ```
   git clone https://github.com/GustavoSRodriguess/diarioDeClasse2.0
   cd diarioDeClasse2.0
   ```

2. Instale as dependências do frontend:
   ```
   cd frontend
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto frontend
   - Adicione as seguintes variáveis:
     ```
     REACT_APP_SUPABASE_URL=sua_url_do_supabase
     REACT_APP_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
     ```

4. Instale as dependências do backend:
   ```
   cd ../backend
   go mod tidy
   ```

5. Configure o backend:
   - Crie um arquivo `config.yaml` na pasta `backend`
   - Adicione as configurações necessárias

## Executando o Projeto

1. Inicie o backend:
   ```
   cd backend
   go run main.go
   ```

2. Em outro terminal, inicie o frontend:
   ```
   cd frontend
   npm start
   ```

3. Acesse o aplicativo em `http://localhost:3000`

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
