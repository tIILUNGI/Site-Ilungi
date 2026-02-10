<div align="center">
  <img src="/imagens/ilungi_logo.jpg" alt="ILUNGI Logo" width="200" />
  <h1>ILUNGI - Global Consulting & Corporate Solutions</h1>
  <p>Sistema de gestão empresarial, consultoria ISO e soluções digitais</p>
</div>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Publicação](#publicação)
- [Configurações](#configurações)
- [Contato](#contato)

---

## 📖 Sobre o Projeto

O **ILUNGI** é um site institucional e plataforma web para uma empresa de consultoria empresarial sediada em Angola. O site apresenta os serviços da empresa, permite contacto direto e possui um portal alumni para antigos formandos.

### Objetivos
- Apresentar serviços de consultoria (ISO, Gestão de Riscos, Procurement, PMO)
- Divulgar a academia de formação com cursos certificados
- Permitir contacto através de formulário funcional
- Disponibilizar portal exclusivo para alumni

---

## ✨ Funcionalidades

### 🌐 Página Principal (Home)
- Hero section com slide de serviços
- Apresentação dos 4 pilares: Consultoria ISO, Gestão de Projetos, Soluções Digitais, Academia
- Carousel de parceiros institucionais
- Links para todas as secções do site

### 📋 Consultoria
- Página geral com áreas de atuação
- Cards interativos para cada serviço
- Slider de vantagens competitivas

### 🏆 Sistemas de Gestão ISO
- Normas implementadas: 9001, 14001, 45001, 27001, 37001
- Metodologia de implementação
- Estatísticas de empresas certificadas
- Testemunhos de clientes

### 🎓 Academia
- Lista de cursos disponíveis
- Sistema de Portal Alumni
- Login/autenticação simulada
- Dashboard do aluno (em desenvolvimento)

### 🤝 Parceiros
- Carousel interativo de logos
- Links para sites dos parceiros

### 📞 Contacto
- Formulário de contacto funcional (via Formspree)
- Informações de contacto
- Mapa de localização (Google Maps)
- Equipa visível com fotos

### 🔐 Portal Alumni
- Sistema de login
- Redirecionamento automático
- Logout funcional
- Dashboard simulado

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
├── vite.config.ts            # Configuração Vite
├── tsconfig.json              # Configuração TypeScript
├── translations.ts            # Traduções PT/EN
├── types.ts                  # Tipos TypeScript
│
├── components/
│   ├── Navbar.tsx            # Barra de navegação
│   └── Footer.tsx            # Rodapé
│
├── pages/
│   ├── Home.tsx              # Página inicial
│   ├── Consulting.tsx         # Página de consultoria
│   ├── ISOPage.tsx           # Página ISO
│   ├── Academy.tsx           # Página academia
│   ├── AlumniLogin.tsx       # Login alumni
│   ├── AlumniPortal.tsx      # Dashboard alumni
│   ├── CertificateVerify.tsx # Verificação certificados
│   ├── Contact.tsx           # Página contacto
│   ├── Partners.tsx          # Página parceiros
│   ├── ProductDemo.tsx       # Demo produtos (Salya/Tocomply)
│   ├── ServiceDetail.tsx     # Detalhes de serviço
│   └── Solutions.tsx         # Página soluções
│
└── imagens/
    ├── ilungi_logo.jpg       # Logo principal
    ├── ISO.png               # Imagem ISO
    ├── CFC-institute.png     # Parceiro
    ├── GPMoi.png            # Parceiro
    └── *.png, *.jpg         # Outras imagens
```

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar localmente:**
   ```bash
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
   ```bash
   vercel
   ```

### Opção 2: Netlify

1. Build do projeto:
   ```bash
   npm run build
   ```
2. Arraste a pasta `dist/` para [Netlify Drop](https://app.netlify.com/drop)

### Opção 3: GitHub Pages

1. Instale gh-pages:
   ```bash
   npm install -D gh-pages
   ```
2. Adicione ao package.json:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Execute:
   ```bash
   npm run deploy
   ```

---

## ⚙️ Configurações

### Tradução (PT/EN)

O sistema suporta PT e EN. Para alterar:
- Use o seletor no footer do site
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
```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgeknpd';
```

Para criar um novo formulário:
1. Vá a https://formspree.io
2. Crie conta com devfront0ilungui@gmail.com
3. Crie um novo formulário
4. Copie o endpoint e substitua no código

### Imagens

Todas as imagens estão na pasta `imagens/`. Para adicionar novas:
1. Coloque a imagem na pasta `imagens/`
2. Referencie como: `/imagens/nome-do-ficheiro.extensão`

### Links dos Parceiros

Para adicionar/editar parceiros:
1. Edite `pages/Partners.tsx`
2. Adicione o logo na pasta `imagens/`
3. Configure o nome e URL do site

---

## 📱 Páginas e Links

| Página | URL |
|--------|-----|
| Home | / |
| Consultoria | /consultoria |
| ISO | /consultoria/iso |
| Academia | /academia |
| Login Alumni | /academia/login |
| Portal Alumni | /academia/alumni |
| Verificar Certificado | /academia/verificar |
| Soluções | /solucoes |
| Parceiros | /parceiros |
| Contacto | /contacto |

---

## 🎨 Cores e Estilos

**Cores principais:**
- Verde ILUNGI: `#1B3C2B`
- Roxo/Purple: `#6B0FA3`

**Tailwind CSS** é usado para todos os estilos.

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
  <p>© 2024 ILUNGI - Global Consulting & Corporate Solutions</p>
</div>
