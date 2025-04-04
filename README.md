# Kanbanager

**Kanbanager** é uma aplicação de gerenciamento de tarefas baseada no estilo Kanban, desenvolvida com React + Vite. Seu foco é oferecer uma interface rápida, responsiva e intuitiva para organização de projetos pessoais.

## ✨ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [pnpm](https://pnpm.io/)
- [SCSS](https://sass-lang.com/)
- [React Router DOM](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [ESLint](https://eslint.org/)

---

## 🚀 Como iniciar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/kanbanager.git
cd kanbanager
```

### 2. Instale as dependências com pnpm

> Certifique-se de ter o `pnpm` instalado. Caso não tenha, instale com:

```bash
npm install -g pnpm
```

Depois, rode:

```bash
pnpm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

---

## 🧪 Scripts disponíveis

- `pnpm dev` — Inicia o servidor de desenvolvimento
- `pnpm build` — Gera a build de produção
- `pnpm preview` — Pré-visualiza a build de produção
- `pnpm lint` — Executa o linter com ESLint

---

## 📁 Estrutura básica de pastas

```
src/
├── assets/         # Imagens e recursos estáticos
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas do app
├── styles/         # Estilos globais (SCSS)
└── main.jsx
```

---

## 📦 Build de Produção

Para gerar a versão de produção:

```bash
pnpm build
```

Os arquivos otimizados estarão na pasta `dist/`.

---

## 🧹 Lint

Este projeto já vem com ESLint configurado. Para rodar a verificação de código:

```bash
pnpm lint
```

---

## 📝 Licença

Este projeto está sob a licença MIT.
