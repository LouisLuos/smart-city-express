# Smart City - Plataforma de Gestão de Demandas Urbanas

Plataforma profissional de gestão pública que conecta cidadãos a gestores urbanos para o registro e acompanhamento de demandas de infraestrutura (iluminação, saneamento, vias, etc.).

---

## 🚀 Tecnologias & Stack

### Frontend
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Chakra UI
- **Estado:** Zustand

### Backend
- **Framework:** [Express](https://expressjs.com/)
- **Linguagem:** TypeScript
- **Validação:** [Zod](https://zod.dev/)
- **Autenticação:** JSON Web Token (JWT) & bcrypt
- **Ferramentas de Desenvolvimento:** Nodemon & tsx

### Infraestrutura & Roadmap (Próximas Fases)
- **Banco de Dados:** PostgreSQL (Relacional) + Prisma ORM
- **Cache & Performance:** Redis
- **Containerização:** Docker & Docker Compose
- **Monitoramento:** Sentry (Error Tracking)
- **Logs:** Winston / Pino
- **CI/CD:** GitHub Actions

---

## 🛠️ Funcionalidades (Backlog de Evolução)

### Fase 1: Persistência e Infraestrutura
- [ ] **Dockerização:** Configurar ambientes de desenvolvimento e produção isolados.
- [ ] **Banco de Dados:** Migrar de Mock API para PostgreSQL usando Prisma ORM.
- [ ] **Modelagem de Dados:** Estruturar relações entre Usuários, Demandas e Categorias.

### Fase 2: Segurança e Performance
- [ ] **Auth Segura:** Implementar persistência de sessão via Cookies HttpOnly.
- [ ] **Cache Layer:** Utilizar Redis para cache de listagem de demandas frequentes.
- [ ] **Rate Limiting:** Proteção contra abusos na API.

### Fase 3: Experiência do Usuário (UX)
- [ ] **Upload de Mídia:** Suporte para anexar fotos de evidências nas demandas (Integração AWS S3).
- [ ] **Notificações Real-time:** Feedback instantâneo sobre mudanças de status via WebSockets.

---

## 📖 Como Rodar o Projeto (MVP Atual)

### Pré-requisitos
- Node.js (v24+)
- npm ou yarn

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/ndrfelipe/smart-city.git
   ```
2. Instale as dependências do Frontend:
   ```bash
   cd frontend && npm install
   ```
3. Instale as dependências do Backend:
   ```bash
   cd ../backend && npm install
   ```

### Execução

Para rodar o projeto em modo de desenvolvimento, você precisará abrir dois terminais:

#### Terminal 1: Frontend
```bash
cd frontend
npm run dev
```

#### Terminal 2: Backend
```bash
cd backend
npm run dev
```

O frontend estará disponível em `http://localhost:3000` e o backend em `http://localhost:5000`.

---

## 📈 Metas de Desenvolvimento
O objetivo deste projeto é evoluir de um MVP para uma aplicação **Production-Ready**, focando em:
1. **Escalabilidade:** Capaz de aguentar alto volume de acessos.
2. **Segurança:** Proteção de dados sensíveis dos cidadãos.
3. **Resiliência:** Logs e monitoramento para rápida resolução de bugs.
