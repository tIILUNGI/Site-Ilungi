<div align="center">
  <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" width="200" />
  <h1>ILUNGI - Global Consulting & Corporate Solutions</h1>
  <p>Sistema de gestão empresarial, consultoria ISO e soluções digitais</p>
</div>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Traduções](#traduções)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Publicação](#publicação)
- [Configurações](#configurações)
- [Páginas e Links](#páginas-e-links)
- [Cores e Estilos](#cores-e-estilos)
- [Contato](#contato)

---

## 📖 Sobre o Projeto

O **ILUNGI** é um site institucional e plataforma web para uma empresa de consultoria empresarial sediada em Angola. O site apresenta os serviços da empresa, permite contacto direto e possui um portal alumni para antigos formandos.

### Objetivos
- Apresentar serviços de consultoria (ISO, Gestão de Riscos, Procurement, PMO/IT Support)
- Divulgar a academia de formação com cursos certificados
- Permitir contacto através de formulário funcional
- Disponibilizar portal exclusivo para alumni (AILUNGI)

---

## ✨ Funcionalidades

### 🌐 Página Principal (Home)
- Hero section com slide de serviços
- Apresentação dos 4 pilares: Consultoria ISO, Gestão de Projetos, Soluções Digitais, Academia
- Carousel de parceiros institucionais
- Links para todas as secções do site

### 📋 Consultoria / Serviços
- Página geral com áreas de atuação
- Cards interativos para cada serviço
- Slider de vantagens competitivas

**Áreas de Atuação:**
1. **Consultoria de Sistemas de Gestão & Projectos** - Implementação e acompanhamento a certificação
2. **Serviço de Notação de Risco** - Classificação e análise de riscos corporativos
3. **Procurement** - Optimização do processo de aquisição
4. **Assistência e Suporte de TI** - Apoio a necessidades tecnológicas

### 🏆 Sistemas de Gestão ISO
- Normas implementadas: 9001, 14001, 45001, 27001, 37001, 22301, 31000, 22000, 13485, 37301
- Metodologia de implementação
- Estatísticas de empresas certificadas
- Testemunhos de clientes

### 🎓 Academia / AILUNGI
- Lista de cursos disponíveis
- Sistema de Portal AILUNGI
- Login/autenticação simulada
- Dashboard do aluno

**Sistema de Cursos:**
- Catálogo de cursos com certificação internacional
- Portal AILUNGI para formandos
- Verificação de certificados online

### 🤝 Parceiros
- Carousel interativo de logos
- Links para sites dos parceiros

### 📞 Contacto
- Formulário de contacto funcional (via Formspree)
- Informações de contacto
- Mapa de localização (Google Maps)
- Equipa visível com fotos

### 🔐 Portal AILUNGI
- Sistema de login
- Redirecionamento automático
- Logout funcional
- Dashboard simulado

---

## 🌐 Traduções

O site possui sistema completo de tradução PT/EN comutável através de seletor no header.

### Menu de Navegação (PT/EN)

| Item | Português | English |
|------|-----------|---------|
| Serviços | Serviços | Services |
| Academia | Academia | Academy |
| Soluções | Soluções | Solutions |
| Parceiros | Parceiros | Partners |
| Contacto | Contacto | Contact |

### Descrições do Menu de Consultoria

| Serviço | Descrição PT | Descrição EN |
|---------|---------------|--------------|
| Consultoria de Sistemas de Gestão & Projectos | implementação e acompanhamento a certificação | Implementation and monitoring of certification |
| Procurement | Optimização do processo de aquisição | Optimization of the acquisition process |
| Assistência e Suporte de TI | Apoio a necessidades tecnológicas | Support for technological needs |

### Portal Alumni
- Alterado de "Alumni ILUNGI" para "AILUNGI"
- Portal exclusivo para formandos e certificações

---

## 🛠️ Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| **React 19** | Framework principal |
| **TypeScript** | Tipagem estática |
| **Vite** | Build tool e servidor de desenvolvimento |
| **Tailwind CSS** | Framework de estilos |
| **Framer Motion** | Animações |
| **React Router DOM** | Navegação |
| **Lucide React** | Ícones |
| **Formspree** | Envio de emails |
| **Google Maps** | Mapa de localização |

---

## 📁 Estrutura do Projeto

```
Site Ilungi/
├── App.tsx                    # Componente principal e roteamento
├── index.html                 # HTML principal
├── index.tsx                  # Entry point React
├── package.json               # Dependências
├── vite.config.ts             # Configuração Vite
├── tsconfig.json              # Configuração TypeScript
├── translations.ts            # Traduções PT/EN
├── types.ts                   # Tipos TypeScript
├── metadata.json              # Metadados do site
│
├── components/
│   ├── Navbar.tsx             # Barra de navegação (mega menu)
│   ├── Footer.tsx             # Rodapé com tagline
│   ├── EditableText.tsx       # Editor de texto inline
│   ├── EditModeToggle.tsx     # Toggle modo de edição
│   ├── InlineEditor.tsx       # Componente de edição inline
│   └── ReferenceCard.tsx      # Card de referência
│
├── pages/
│   ├── Home.tsx               # Página inicial
│   ├── Consulting.tsx         # Página de consultoria
│   ├── ISOPage.tsx            # Página ISO
│   ├── Academy.tsx            # Página academia
│   ├── AILUNGILogin.tsx       # Login AILUNGI
│   ├── AILUNGIPortal.tsx      # Portal AILUNGI
│   ├── CertificateVerify.tsx  # Verificação certificados
│   ├── Certifications.tsx     # Página de certificações
│   ├── Contact.tsx            # Página contacto
│   ├── Partners.tsx           # Página parceiros
│   ├── ProductDemo.tsx        # Demo produtos
│   ├── ServiceDetail.tsx      # Detalhes de serviço
│   ├── Solutions.tsx         # Página soluções
│   ├── ReferenceDetail.tsx   # Detalhes de referência
│   ├── CourseCatalog.tsx      # Catálogo de cursos
│   ├── AdminLogin.tsx         # Login admin
│   ├── AdminDashboard.tsx     # Dashboard admin
│   ├── AdminCourses.tsx       # Gestão de cursos
│   ├── AdminPartners.tsx      # Gestão de parceiros
│   ├── AdminReferences.tsx    # Gestão de referências
│   ├── AdminServices.tsx      # Gestão de serviços
│   ├── AdminSolutions.tsx     # Gestão de soluções
│   ├── AdminConfig.tsx        # Configurações admin
│   └── AdminBlog.tsx          # Gestão de blog
│
├── lib/
│   ├── contentManager.ts      # Gestor de conteúdo
│   ├── courseCatalogData.ts   # Dados do catálogo de cursos
│   ├── dataSync.ts           # Sincronização de dados
│   ├── supabase.ts           # Cliente Supabase
│   └── useScrollReveal.ts    # Hook para animações scroll
│
└── public/
    ├── imagens/               # Imagens do site
    ├── Nossas Referências/    # Logos de clientes/parceiros
    └── _redirects            # Configuração de rotas
```

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos

1. **Instalar dependências:**
   
```
bash
   npm install
   
```

2. **Executar localmente:**
   
```
bash
   npm run dev
   
```

3. **Aceder ao site:**
   - URL: http://localhost:5173

---

## 🌐 Publicação

### Opção 1: Vercel (Recomendado)

1. Crie conta em [vercel.com](https://vercel.com)
2. Instale Vercel CLI: `npm i -g vercel`
3. Na pasta do projeto:
   
```
bash
   vercel
   
```

### Opção 2: Netlify

1. Build do projeto:
   
```
bash
   npm run build
   
```
2. Arraste a pasta `dist/` para [Netlify Drop](https://app.netlify.com/drop)

### Opção 3: GitHub Pages

1. Instale gh-pages:
   
```
bash
   npm install -D gh-pages
   
```
2. Adicione ao package.json:
   
```
json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   
```
3. Execute:
   
```
bash
   npm run deploy
   
```

---

## ⚙️ Configurações

### Tradução (PT/EN)

O sistema suporta PT e EN. Para alterar:
- Use o seletor no header do site
- Ou edite `translations.ts`

### Email de Contacto

**Email visível no site:** geral@ilungi.ao

**Email que recebe mensagens:** devfront0ilungui@gmail.com (configurado no Formspree)

Para alterar o email que recebe mensagens:
1. Aceda ao [Formspree Dashboard](https://formspree.io/dashboard)
2. Edite as configurações do formulário
3. Altere o email de destino

### Formspree Endpoint

O endpoint atual está em `pages/Contact.tsx`:
```
typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgeknpd';
```

### Footer

O footer inclui:
- Logo ILUNGI (com função de scroll to top)
- Tagline: "Estrutura gera previsibilidade. Previsibilidade gera reputação. Reputação gera crescimento."
- Links de redes sociais
- Links de navegação
- Informações de contacto
- Links de políticas

---

## 📱 Páginas e Links

| Página | URL |
|--------|-----|
| Home | / |
| Consultoria | /consultoria |
| ISO | /consultoria/iso |
| Risco | /consultoria/risco |
| Procurement | /consultoria/procurement |
| PMO/IT | /consultoria/pmo |
| Academia | /academia |
| Login AILUNGI | /academia/login |
| Portal AILUNGI | /academia/alumni |
| Verificar Certificado | /academia/verificar |
| Catálogo de Cursos | /academia/cursos |
| School of Corporate Reputation | /academia/scr |
| Soluções | /solucoes |
| Salya | /solucoes/salya |
| ToComply | /solucoes/tocomply |
| Parceiros | /parceiros |
| Contacto | /contacto |
| Certificações | /certificacoes |

---

## 🎨 Cores e Estilos

**Cores principais:**
- Verde ILUNGI: `#1B3C2B`
- Roxo/Purple: `#6a00a3` (original: `#6B0FA3`)

**Tailwind CSS** é usado para todos os estilos.

---

## 📄 Funcionalidades Especiais

### Mega Menu
- Menu de navegação com mega menu para secções principais
- Descrições personalizadas para cada serviço

### Animações
- Framer Motion para transições suaves
- Scroll reveal para elementos

### Admin
- Sistema de administração para gestão de conteúdo
- Edição inline de textos

### Portal AILUNGI
- Dashboard para formandos
- Gestão de cursos e certificados

---

## 📄 Licença

Este projeto é propriedade da ILUNGI.

---

## 📧 Suporte

Para questões sobre o site:
- Email: geral@ilungi.ao
- Telefone: +244 935 793 270

---

<div align="center">
  <p>Desenvolvido com ❤️ para ILUNGI</p>
  <p>© 2025 ILUNGI - Global Consulting & Corporate Solutions</p>
</div>
