import { Translation } from './types';

export const translations: Record<'pt' | 'en', any> = {
  pt: {
    nav: {
      consulting: "Serviços",
      academy: "Academia",
      solutions: "Soluções",
      partners: "Parceiros",
      contact: "Contacto",
      iso: "Consultoria de Sistemas de Gestão & Projectos",
      risk: "Serviço de Notação de Risco",
      procurement: "Procurement",
      pmo: "Assistência e Suporte de TI",
      alumni: "AILUNGI",
      courses: "Cursos",
      verify: "Verificar Certificado",
      scr: "School of Corp. Reputation",
      demo: "Demonstração",
      home: "Início",
    },
    navDescriptions: {
      iso: "implementação e acompanhamento a certificação",
      procurement: "Optimização do processo de aquisição",
      pmo: "Apoio a necessidades tecnológicas",
    },
    home: {
      heroTitle: "Excelência em Consultoria e Soluções Digitais",
      heroSubtitle: "Transformamos o compliance e a gestão em valor estratégico para empresas globais.",
      ctaPrimary: "Solicitar Proposta",
      ctaSecondary: "Saiba Mais",
      services: {
        iso: "Consultoria ISO",
        isoDesc: "Implementação e certificação em normas internacionais (9001, 27001, etc).",
        projects: "Gestão de Projectos",
        projectsDesc: "Governance e PMO estratégico para grandes infraestruturas e operações.",
        tech: "SaaS & Tech",
        techDesc: "Plataformas digitais para compliance, risco e gestão eficiente.",
        academy: "Academia ILUNGI",
        academyDesc: "Formação de excelência com certificação internacional.",
      },
      stats: {
        projects: "Projectos Concluídos",
        clients: "Clientes Atendidos",
        students: "Alunos Certificados",
        experience: "Anos de Mercado"
      },
      solutions: {
        title: "Soluções Digitais sob medida para sua Gestão",
        desc: "Impulsionamos a transformação digital da sua empresa com plataformas inovadoras. Automatize processos, fortaleça a governança e tome decisões baseadas em dados.",
        feature1: "Dashboards em Tempo Real",
        feature2: "Segurança da Informação de Ponta",
        feature3: "Interface Intuitiva & Mobile",
        cta: "Descobrir Soluções",
      },
      gallery: {
        iso: "Consultoria ISO",
        risk: "Gestão de Risco",
        projects: "Gestão de Projectos",
      },
      partners: "Nossos Parceiros",
    },
    contact: {
      title: "Entre em Contacto",
      subtitle: "Estamos prontos para elevar o nível da sua organização.",
      formName: "Nome Completo",
      formEmail: "Email Corporativo",
      formSubject: "Assunto",
      formMessage: "Como podemos ajudar?",
      formSubmit: "Enviar Mensagem",
      phone: "Telefone",
      phoneDesc: "Segunda - Sexta: 08:00 - 18:00",
      email: "Email",
      emailDesc: "Respostas em até 24 horas úteis.",
      location: "Localização",
      locationDesc: "Luanda, Projeto Nova Vida, Prédio E209",
      teamOnline: "Nossa equipa de consultores está online.",
    },
    consulting: {
      title: "Consultoria Estratégica",
      subtitle: "Soluções integradas de governança, risco e compliance para empresas que buscam liderança e sustentabilidade no mercado global.",
      whyTitle: "Por que escolher a ILUNGI?",
      features: [
        "Metodologias Internacionais Adaptadas ao Mercado Local",
        "Consultores Especializados",
        "Foco em Resultados Mensuráveis",
        "Suporte Completo do Diagnóstico à Eficiência"
      ],
      explore: "Explorar Soluções",
      cta: "Agendar Reunião Técnica",
    },
    consultingAreas: {
      iso: {
        title: "Consultoria de Sistemas de Gestão & Projectos",
        desc: "Implementação de sistemas de gestão e condução de projectos de melhoria com foco em padrões e eficiência operacional."
      },
      risk: {
        title: "Serviço de Notação de Risco",
        desc: "Classificação e análise de riscos corporativos para suporte à decisão estratégica."
      },
      procurement: {
        title: "Procurement",
        desc: "Otimização da cadeia de suprimentos, redução de custos e compliance em compras."
      },
      pmo: {
        title: "Assistência e suporte de TI",
        desc: "Suporte técnico contínuo para operação, infraestrutura e continuidade dos serviços de TI."
      }
    },
    academy: {
      title: "FORMAÇÕES E EDUCAÇÃO CORPORATIVA",
      subtitle: "Reconhecendo as especificidades de cada empresa, desenhamos soluções formativas personalizadas. Disponibilizamos todo o auxílio necessário na gestão integrada do plano de formação, para que as empresas possam alcançar, eficiente e eficazmente, os seus objetivos.",
      description: "A educação corporativa, neste contexto de serviço, uma estratégia de acompanhamento voltada para a gestão de pessoas da sua empresa, em que habilidades devem ser desenvolvidas em favor do contexto organizacional. Isso significa que a prática vai muito além de oferecermos treinamentos ou simplesmente qualificar a mão de obra.",
      features: {
        cert: "Certificação Int.",
        certDesc: "Certificados válidos globalmente.",
        mentoria: "Mentoria",
        mentoriaDesc: "Acompanhamento com especialistas.",
        material: "Material Premium",
        materialDesc: "Acesso vitalício a recursos exclusivos.",
        networking: "Networking",
        networkingDesc: "Comunidade restrita de ex-alunos.",
      },
      coursesTitle: "Cursos em Destaque",
      coursesDesc: "Inscrições abertas para o próximo trimestre.",
      viewAll: "Ver todos os cursos",
      level: {
        expert: "Expert",
        intermediate: "Intermédio",
        base: "Base",
      },
      duration: "h",
      viewDetails: "Ver Detalhes",
      banner: {
        title: "Já é nosso aluno?",
        desc: "Acesse o seu portal exclusivo para baixar certificados, materiais e interagir com outros membros.",
        portal: "Aceder ao Portal AILUNGI",
        verify: "Verificar Autenticidade",
      }
    },
    partners: {
      title: "Nossa Rede de Parceiros",
      subtitle: "Colaboramos com as melhores instituições globais para entregar soluções de excelência.",
      visit: "Visitar Site",
    },
    solutions: {
      title: "Soluções Digitais",
      subtitle: "Tecnologia de ponta para gestão eficiente do seu negócio.",
      sicloc: {
        title: "SICLIC",
        desc: "Solução cloud para gestão do relacionamento com o cliente baseada em 4 conceitos: Potencial cliente, cliente, contrato e relatório. As relações são entre pessoas, e o SICLIC auxiliar na gestão e fidelização do consumidor.\nwww.siclic.ao | contacto@siclic.ao",
      },
      tocomply: {
        title: "ToComply360º",
        desc: "Sistema baseado na cloud que garante flexibilidade e agilidade na gestão de processos de conformidade empresarial.",
      },
    },
    services: {
      iso: {
        title: "CONSULTORIA E AUDITORIA EM SISTEMAS DE GESTÃO & PROJECTOS",
        desc: "Especialistas em implementação e auditoria de sistemas de gestão ISO.",
        content: "Actuamos na implementação à medida e cirúrgica de sistemas de gestão baseados nas normas ISO, acompanhamos os nossos parceiros até à auditoria de certificação, bem como realizamos auditorias internas e de fornecedores.\nIMPLEMENTAÇÃO E AUDITORIA EM SISTEMAS DE GESTÃO:\nGestão de Qualidade ISO 9001\nGestão Ambiental ISO 14001\nGestão de Saúde e Segurança Ocupacional ISO 45001 \nGestão da Informação ISO 27001\nGestão de Compliance e Antissuborno ISO 37001 e ISO 37301\nGestão da Segurança Alimentar ISO 22000 / HACCP\nGestão de Risco ISO 31000 e COSO",
        items: {
          "9001": { title: "ISO 9001 - Gestão da Qualidade", benefit: "Padroniza processos e aumenta a satisfação do cliente." },
          "14001": { title: "ISO 14001 - Gestão Ambiental", benefit: "Reduz o impacto ambiental e garante conformidade legal." },
          "45001": { title: "ISO 45001 - Saúde e Segurança Ocupacional", benefit: "Melhora a segurança ocupacional e reduz acidentes." },
          "27001": { title: "ISO 27001 - Gestão de Informação", benefit: "Protege dados críticos e fortalece a confiança." },
          "22301": { title: "ISO 22301 - Gestão de Continuidade", benefit: "Garante continuidade do negócio em crises." },
          "37001": { title: "ISO 37001 - Gestão de Compliance e Antissuborno", benefit: "Implementa controles eficazes contra suborno." },
          "37301": { title: "ISO 37301 - Compliance", benefit: "Estrutura o compliance e reduz riscos legais." },
          "31000": { title: "ISO 31000 - Gestão de Risco", benefit: "Identifica, avalia e trata riscos com método." },
          "22000": { title: "ISO 22000 - Segurança Alimentar", benefit: "Assegura segurança alimentar em toda a cadeia." }
        }
      },
      risk: {
        title: "SERVIÇO DE NOTAÇÃO DE RISCO",
        desc: "Em processo de regularização pela CMC",
        content: "\nO Serviço de notação de risco da ILUNGI tem como finalidade contribuir para a transparência, credibilidade e eficiência do mercado, através da avaliação independente da capacidade de cumprimento de obrigações financeiras por parte de entidades e instrumentos financeiros.\n"
      },
      procurement: {
        title: "Procurement",
        desc: "Serviço completo de procurement para sua empresa.",
        content: "O nosso serviço de procurement tem como objectivo possibilitar que o cliente tenha tempo para focar seus esforços em outros assuntos ligados a sua empresa. Ante a necessidade de serviços, ferramentas ou equipamentos essenciais que a sua empresa esteja a necessitar, nós compramos para si dentro e for a de Angola. Podemos cuidar de tudo, desde notificação de serviços, especificações e certificados de serviço, monitoramento de faturas de vários fornecedores – a preços competitivos e com preços fixos globalmente e a partir de um único ponto de contacto"
      },
      pmo: {
        title: "ASSISTÊNCIA E SUPORTE DE T.I",
        desc: "Serviços de Assistência e suporte de TI",
        content: "Se você busca reduzir/controlar custos na área de tecnologia, sabe que contratar outsourcing de TI é uma forma eficaz de economizar recursos, além de possibilitar qualidade e eficiência no serviço prestado. Também é possível otimizar as operações da sua empresa, aumentar a flexibilidade e a produtividade das entregas. Sem falar na prestação de contas, que também é uma condição favorável através do instrumento de contratação.\nOferecemos diferentes planos de terceirização de suporte técnico de TI."
      }
    },
    alumni: {
      login: {
        title: "Bem-vindo AILUNGI",
        subtitle: "Aceda à sua área exclusiva",
        email: "Email",
        password: "Palavra-passe",
        remember: "Lembrar-me",
        forgot: "Esqueci a palavra-passe",
        button: "Aceder",
        noAccount: "Ainda não tens conta?",
        register: "Regista-te aqui",
      },
      portal: {
        welcome: "Olá",
        welcomeDesc: "Bem-vindo de volta ao seu portal de excelência.",
        dashboard: "Dashboard",
        courses: "Meus Cursos",
        certificates: "Certificados",
        history: "Histórico",
        support: "Suporte",
        logout: "Sair",
        stats: {
          active: "Cursos Ativos",
          certs: "Certificados",
          hours: "Carga Horária",
        },
        inProgress: "Em Andamento",
        continue: "Continuar Aula",
        completed: "concluído",
      }
    },
    iso: {
      title: "CONSULTORIA E AUDITORIA EM SISTEMAS DE GESTÃO & PROJECTOS",
      subtitle: "Actuamos na implementação à medida e cirúrgica de sistemas de gestão baseados nas normas ISO, acompanhamos os nossos parceiros até à auditoria de certificação, bem como realizamos auditorias internas e de fornecedores.",
      stats: {
        certified: "Várias Empresas Certificadas",
        rate: "Taxa de Aprovação",
      },
      methodology: "Nossa Metodologia de Implementação",
      steps: {
        gap: "Diagnóstico GAP",
        gapDesc: "Análise profunda do estado atual vs requisitos da norma.",
        planning: "Planeamento & Implementação",
        planningDesc: "Plano detalhado e implementação dos requisitos com acompanhamento contínuo.",
        training: "Treinamento de Equipe",
        trainingDesc: "Capacitação dos colaboradores para aplicar e manter o sistema.",
        internalAudit: "Auditoria Interna",
        internalAuditDesc: "Verificação interna para assegurar conformidade e corrigir desvios.",
        report: "Elaboração de Relatório",
        reportDesc: "Documentação de resultados, evidências e plano de melhorias.",
        goLive: "Go-Live para Auditoria de Certificação",
        goLiveDesc: "Preparação final e acompanhamento durante a auditoria de certificação.",
      },
      cta: "Falar com Consultor Senior",
      testimonial: "A ILUNGI foi fundamental para nossa expansão internacional através da ISO 9001.",
      testimonialAuthor: "",
    },
    references: {
      title: "Nossas Referências",
      subtitle: "Empresas que confiaram nos nossos serviços",
      viewDetails: "Ver Detalhes",
      clients: [
        {
          id: "esmac",
          name: "Esmac,Lda",
          logo: "/Nossas Refeências/Esmac.Lda.webp",
          role: "Coordenador",
          comment: "Excelente, recomendo.",
          person: "Márcio Dumbo",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "velonet",
          name: "Velonet",
          logo: "/Nossas Refeências/Velonet.png",
          role: "Gestor de Qualidade",
          comment: "Muito dedicados, comprometidos e profissionais.",
          person: "Alves Ulo",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "interseguros",
          name: "InterSeguros-Corretores de Seguros, S.A.",
          logo: "/Nossas Refeências/Inter Seguros.png",
          role: "Diretora Geral",
          comment: "Acompanhamento excelente durante e após o processo de certificação. Um parceiro que, certamente, nos acompanhará ao longo de muitos anos.",
          person: "Avelina Rocha",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "aclean",
          name: "Aclean,Lda",
          logo: "/Nossas Refeências/A Clean.jpg",
          role: "Diretor Geral",
          comment: "Foi de facto muito boa a prestação, a atenção dedicada, bem como a formulação ao detalhe do sistema, o entendimento dos consultores e a maneira interativa.",
          person: "Gelson Salvador",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "saqia",
          name: "SAQIA--Salvador e Quintas Arquitectura,Lda",
          logo: "/Nossas Refeências/SAQIA.png",
          role: "Diretor Geral",
          comment: "Foi muito bom ter trabalhado com vocês e pretendemos continuar futuramente pela manutenção e atualização.",
          person: "Gelson Salvador",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "diway",
          name: "Diway",
          logo: "/Nossas Refeências/Diway.jpg",
          role: "Coordenadora da Qualidade",
          comment: "Experiência agradável.",
          person: "Nadiry Celestino",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "imovias-urbanismo-sa",
          name: "Imovias Urbanismo e Construção SA",
          logo: "/Nossas Refeências/Imovias.png",
          role: "PCA",
          comment: "Equipa diligente.",
          person: "Joaquim Alves",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "imovias-energy",
          name: "Imovias Energy SA",
          logo: "/Nossas Refeências/Imovias.png",
          role: "PCA",
          comment: "Equipa diligente.",
          person: "Joaquim Alves",
          service: "iso",
          description: "Consultoria e auditoria em sistemas de gestão.",
          attachments: []
        },
        {
          id: "goldproc",
          name: "Gold Procurement",
          logo: "/Nossas Refeências/Gold Proc.jpg",
          role: "Serviço de Procurement",
          comment: "Serviço de procurement eficiente e profissional. Recomendo.",
          person: "Director de Compras",
          service: "procurement",
          description: "Serviços de procurement de materiais e equipamentos",
          attachments: []
        },
        {
          id: "bureauveritas",
          name: "Bureau Veritas",
          logo: "/Nossas Refeências/Bureau_Veritas-Logo.wine.png",
          role: "Serviço de Procurement",
          comment: "Excelente parceria em serviços de procurement. Qualidade garantida.",
          person: "Director de Operações",
          service: "procurement",
          description: "Serviços de procurement e consultoria",
          attachments: []
        },
        {
          id: "petromar",
          name: "PetroMar",
          logo: "/Nossas Refeências/PetroMar.jpg",
          role: "Serviço de Procurement",
          comment: "Serviço de procurement de excelência. A ILUNGI entregou com qualidade.",
          person: "Director de Compras",
          service: "procurement",
          description: "Serviços de procurement para indústria petrolífera",
          attachments: []
        },
        {
          id: "pensana",
          name: "Pensana",
          logo: "/Nossas Refeências/pensana-logo-sticky-blue-standard.png",
          role: "Serviço de Assistência e Suporte de TI",
          comment: "Suporte técnico eficiente e acompanhamento contínuo para as nossas operações.",
          person: "Director de Operações",
          service: "pmo",
          description: "Migração de dados e suporte de TI para as operações",
          attachments: []
        },
        {
          id: "bioprev",
          name: "BioPrev",
          logo: "/Nossas Refeências/BioPrev.webp",
          role: "Serviço de Assistência e Suporte de TI",
          comment: "A ILUNGI garantiu estabilidade e melhoria dos nossos sistemas de TI.",
          person: "Director de Tecnologia",
          service: "pmo",
          description: "Implementação do Primavera e suporte de TI",
          attachments: []
        }
      ]
    }
  },
  en: {
    nav: {
      consulting: "Services",
      academy: "Academy",
      solutions: "Solutions",
      partners: "Partners",
      contact: "Contact",
      iso: "Management Systems & Projects Consulting",
      risk: "Risk Rating Service",
      procurement: "Procurement",
      pmo: "IT Assistance and Support",
      alumni: "AILUNGI",
      courses: "Courses",
      verify: "Verify Certificate",
      scr: "School of Corporate Reputation",
      demo: "Demo",
      home: "Home",
    },
    navDescriptions: {
      iso: "Implementation and monitoring of certification",
      procurement: "Optimization of the acquisition process",
      pmo: "Support for technological needs",
    },
    home: {
      heroTitle: "Excellence in Consulting and Digital Solutions",
      heroSubtitle: "We transform compliance and management into strategic value for global companies.",
      ctaPrimary: "Request a Proposal",
      ctaSecondary: "Learn More",
      services: {
        iso: "ISO Consulting",
        isoDesc: "Implementation and certification of international standards (9001, 27001, etc.).",
        projects: "Project Management",
        projectsDesc: "Strategic governance and PMO for large infrastructure and operations.",
        tech: "SaaS & Tech",
        techDesc: "Digital platforms for compliance, risk, and efficient management.",
        academy: "ILUNGI Academy",
        academyDesc: "High-level training with international certification.",
      },
      stats: {
        projects: "Projects Completed",
        clients: "Clients Served",
        students: "Certified Students",
        experience: "Years in the Market"
      },
      solutions: {
        title: "Digital Solutions Tailored to Your Management",
        desc: "We drive your company's digital transformation with innovative platforms. Automate processes, strengthen governance, and make data-driven decisions.",
        feature1: "Real-Time Dashboards",
        feature2: "State-of-the-Art Information Security",
        feature3: "Intuitive & Mobile Interface",
        cta: "Discover Solutions",
      },
      gallery: {
        iso: "ISO Consulting",
        risk: "Risk Management",
        projects: "Project Management",
      },
      partners: "Our Partners",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "We are ready to elevate your organization to the next level.",
      formName: "Full Name",
      formEmail: "Corporate Email",
      formSubject: "Subject",
      formMessage: "How can we help?",
      formSubmit: "Send Message",
      phone: "Phone",
      phoneDesc: "Monday - Friday: 08:00 - 18:00",
      email: "Email",
      emailDesc: "Responses within 24 business hours.",
      location: "Location",
      locationDesc: "Luanda, Projeto Nova Vida, Prédio E209",
      teamOnline: "Our team of consultants is online.",
    },
    consulting: {
      title: "Strategic Consulting",
      subtitle: "Integrated governance, risk, and compliance solutions for companies seeking leadership and sustainability in the global market.",
      whyTitle: "Why choose ILUNGI?",
      features: [
        "International methodologies adapted to the local market",
        "Specialized consultants",
        "Focus on measurable results",
        "End-to-end support from diagnosis to efficiency"
      ],
      explore: "Explore Solutions",
      cta: "Schedule a Technical Meeting",
    },
    consultingAreas: {
      iso: {
        title: "Management Systems & Projects Consulting",
        desc: "Implementation of management systems and improvement projects focused on standards and operational efficiency."
      },
      risk: {
        title: "Risk Rating Service",
        desc: "Corporate risk classification and analysis to support strategic decision-making."
      },
      procurement: {
        title: "Procurement",
        desc: "Supply chain optimization, cost reduction, and procurement compliance."
      },
      pmo: {
        title: "IT Assistance and Support",
        desc: "Continuous technical support for operations, infrastructure, and continuity of IT services."
      }
    },
    academy: {
      title: "TRAINING AND CORPORATE EDUCATION",
      subtitle: "Recognizing the specific needs of each company, we design customized training solutions. We provide all the necessary support in the integrated management of the training plan so companies can efficiently and effectively achieve their objectives.",
      description: "Corporate education, in this service context, is a follow-up strategy focused on people management in your company, where skills are developed in line with the organizational context. This means the practice goes far beyond offering training or simply qualifying the workforce.",
      features: {
        cert: "Int. Certification",
        certDesc: "Globally valid certificates.",
        mentoria: "Mentoring",
        mentoriaDesc: "Follow-up with specialists.",
        material: "Premium Materials",
        materialDesc: "Lifetime access to exclusive resources.",
        networking: "Networking",
        networkingDesc: "Exclusive community of alumni.",
      },
      coursesTitle: "Featured Courses",
      coursesDesc: "Enrollment open for the next quarter.",
      viewAll: "View all courses",
      level: {
        expert: "Expert",
        intermediate: "Intermediate",
        base: "Basic",
      },
      duration: "h",
      viewDetails: "View Details",
      banner: {
        title: "Already our student?",
        desc: "Access your exclusive portal to download certificates, materials, and interact with other members.",
        portal: "Access AILUNGI Portal",
        verify: "Verify Authenticity",
      }
    },
    partners: {
      title: "Our Partner Network",
      subtitle: "We collaborate with the best global institutions to deliver excellent solutions.",
      visit: "Visit Website",
    },
    solutions: {
      title: "Digital Solutions",
      subtitle: "Cutting-edge technology for efficient business management.",
      sicloc: {
        title: "SICLIC",
        desc: "Cloud solution for customer relationship management based on 4 concepts: potential client, client, contract, and report. Relationships are between people, and SICLIC helps manage and build customer loyalty.\nwww.siclic.ao | contacto@siclic.ao",
      },
      tocomply: {
        title: "ToComply360º",
        desc: "Cloud-based system that ensures flexibility and agility in managing corporate compliance processes.",
      },
    },
    services: {
      iso: {
        title: "CONSULTING AND AUDITING IN MANAGEMENT SYSTEMS AND PROJECTS",
        desc: "Specialists in the implementation and auditing of ISO management systems.",
        content: "We provide tailored and precise implementation of management systems based on ISO standards. We support our partners through the certification audit and also conduct internal and supplier audits.\nIMPLEMENTATION AND AUDITING IN MANAGEMENT SYSTEMS:\nQuality Management ISO 9001\nEnvironmental Management ISO 14001\nOccupational Health and Safety ISO 45001\nInformation Security Management ISO 27001\nCompliance and Anti-Bribery ISO 37001 and ISO 37301\nFood Safety Management ISO 22000 / HACCP\nRisk Management ISO 31000 and COSO",
        items: {
          "9001": { title: "ISO 9001 - Quality Management", benefit: "Standardizes processes and improves customer satisfaction." },
          "14001": { title: "ISO 14001 - Environmental Management", benefit: "Reduces environmental impact and ensures legal compliance." },
          "45001": { title: "ISO 45001 - Occupational Health and Safety", benefit: "Improves occupational safety and reduces accidents." },
          "27001": { title: "ISO 27001 - Information Security Management", benefit: "Protects critical data and builds trust." },
          "22301": { title: "ISO 22301 - Business Continuity", benefit: "Ensures business continuity during disruptions." },
          "37001": { title: "ISO 37001 - Compliance and Anti-Bribery", benefit: "Implements effective anti-bribery controls." },
          "37301": { title: "ISO 37301 - Compliance", benefit: "Structures compliance and reduces legal risk." },
          "31000": { title: "ISO 31000 - Risk Management", benefit: "Systematically identifies, assesses, and treats risks." },
          "22000": { title: "ISO 22000 - Food Safety", benefit: "Ensures food safety across the supply chain." }
        }
      },
      risk: {
        title: "RISK RATING SERVICE",
        desc: "Under regularization by the CMC",
        content: "\nILUNGI's risk rating service aims to contribute to market transparency, credibility, and efficiency through the independent assessment of the ability to meet financial obligations by entities and financial instruments.\n"
      },
      procurement: {
        title: "PROCUREMENT",
        desc: "Complete procurement service for your company.",
        content: "Our procurement service aims to give the client time to focus their efforts on other matters related to their company. When services, tools, or essential equipment are needed, we purchase for you inside and outside Angola. We can take care of everything, from service notification, specifications, and service certificates to monitoring invoices from multiple suppliers, at competitive prices with globally fixed rates and a single point of contact."
      },
      pmo: {
        title: "IT ASSISTANCE AND SUPPORT",
        desc: "IT assistance and support services",
        content: "If you want to reduce or control costs in the technology area, know that hiring IT outsourcing is an effective way to save resources while ensuring quality and efficiency in the service provided. It is also possible to optimize your company's operations, increase flexibility, and improve delivery productivity. Not to mention accountability, which is also strengthened through the contracting instrument.\nWe offer different IT technical support outsourcing plans."
      }
    },
    alumni: {
      login: {
        title: "Welcome AILUNGI",
        subtitle: "Access your exclusive area",
        email: "Email",
        password: "Password",
        remember: "Remember me",
        forgot: "Forgot password",
        button: "Log In",
        noAccount: "Don't have an account yet?",
        register: "Register here",
      },
      portal: {
        welcome: "Hello",
        welcomeDesc: "Welcome back to your excellence portal.",
        dashboard: "Dashboard",
        courses: "My Courses",
        certificates: "Certificates",
        history: "History",
        support: "Support",
        logout: "Logout",
        stats: {
          active: "Active Courses",
          certs: "Certificates",
          hours: "Training Hours",
        },
        inProgress: "In Progress",
        continue: "Continue Lesson",
        completed: "completed",
      }
    },
    iso: {
      title: "CONSULTING AND AUDITING IN MANAGEMENT SYSTEMS AND PROJECTS",
      subtitle: "We provide tailored and precise implementation of management systems based on ISO standards. We support our partners through the certification audit, as well as conduct internal and supplier audits.",
      stats: {
        certified: "Several Certified Companies",
        rate: "Approval Rate",
      },
      methodology: "Our Implementation Methodology",
      steps: {
        gap: "Gap Analysis",
        gapDesc: "Deep analysis of the current state versus standard requirements.",
        planning: "Planning & Implementation",
        planningDesc: "Detailed plan and implementation of requirements with continuous follow-up.",
        training: "Team Training",
        trainingDesc: "Training teams to apply and sustain the management system.",
        internalAudit: "Internal Audit",
        internalAuditDesc: "Internal verification to ensure compliance and correct deviations.",
        report: "Report Preparation",
        reportDesc: "Documentation of results, evidence, and the improvement plan.",
        goLive: "Go-Live for Certification Audit",
        goLiveDesc: "Final readiness and support during the certification audit.",
      },
      cta: "Talk to a Senior Consultant",
      testimonial: "ILUNGI was fundamental to our international expansion through ISO 9001.",
      testimonialAuthor: "",
    },
    references: {
      title: "Our References",
      subtitle: "Companies that trusted our services",
      viewDetails: "View Details",
      clients: [
        {
          id: "esmac",
          name: "Esmac,Lda",
          logo: "/Nossas Refeências/Esmac.Lda.webp",
          role: "Coordinator",
          comment: "Excellent, I recommend it.",
          person: "Márcio Dumbo",
          service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "velonet",
          name: "Velonet",
          logo: "/Nossas Refeências/Velonet.png",
          role: "Quality Manager",
          comment: "Very dedicated, committed, and professional.",
          person: "Alves Ulo",
          service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "interseguros",
          name: "InterSeguros-Corretores de Seguros, S.A.",
          logo: "/Nossas Refeências/Inter Seguros.png",
          role: "General Director",
          comment: "Excellent follow-up during and after the certification process. A partner that will certainly accompany us for many years.",
          person: "Avelina Rocha",
          service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "aclean",
          name: "Aclean,Lda",
          logo: "/Nossas Refeências/A Clean.jpg",
          role: "General Director",
          comment: "The service was truly very good, with dedicated attention, detailed system formulation, clear understanding by the consultants, and an interactive approach.",
          person: "Gelson Salvador",
          service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "saqia",
          name: "SAQIA--Salvador e Quintas Arquitectura,Lda",
          logo: "/Nossas Refeências/SAQIA.png",
          role: "General Director",
          comment: "It was very good to work with you and we intend to continue in the future for maintenance and updates.",
          person: "Gelson Salvador",
          service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "diway",
          name: "Diway",
          logo: "/Nossas Refeências/Diway.jpg",
          role: "Quality Coordinator",
          comment: "Pleasant experience.",
          person: "Nadiry Celestino",
           service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "imovias-urbanismo-sa",
          name: "Imovias Urbanismo e Construção SA",
          logo: "/Nossas Refeências/Imovias.png",
          role: "Chairman of the Board",
          comment: "Diligent team.",
          person: "Joaquim Alves",
          service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "imovias-energy",
          name: "Imovias Energy SA",
          logo: "/Nossas Refeências/Imovias.png",
          role: "Chairman of the Board",
          comment: "Diligent team.",
          person: "Joaquim Alves",
          service: "iso",
          description: "Consulting and auditing of management systems.",
          attachments: []
        },
        {
          id: "goldproc",
          name: "Gold Procurement",
          logo: "/Nossas Refeências/Gold Proc.jpg",
          role: "Procurement Service",
          comment: "Efficient and professional procurement service. Recommended.",
          person: "Procurement Director",
          service: "procurement",
          description: "Procurement services for materials and equipment",
          attachments: []
        },
        {
          id: "bureauveritas",
          name: "Bureau Veritas",
          logo: "/Nossas Refeências/Bureau_Veritas-Logo.wine.png",
          role: "Procurement Service",
          comment: "Excellent partnership in procurement services. Quality guaranteed.",
          person: "Operations Director",
          service: "procurement",
          description: "Procurement and consultancy services",
          attachments: []
        },
        {
          id: "petromar",
          name: "PetroMar",
          logo: "/Nossas Refeências/PetroMar.jpg",
          role: "Procurement Service",
          comment: "Excellent procurement service. ILUNGI delivered with quality.",
          person: "Procurement Director",
          service: "procurement",
          description: "Procurement services for oil industry",
          attachments: []
        },
        {
          id: "pensana",
          name: "Pensana",
          logo: "/Nossas Refeências/pensana-logo-sticky-blue-standard.png",
          role: "IT Assistance and Support Service",
          comment: "Efficient technical support and ongoing monitoring for our operations.",
          person: "Operations Director",
          service: "pmo",
          description: "Data migration and IT support for operations",
          attachments: []
        },
        {
          id: "bioprev",
          name: "BioPrev",
          logo: "/Nossas Refeências/BioPrev.webp",
          role: "IT Assistance and Support Service",
          comment: "ILUNGI ensured stability and improvements in our IT systems.",
          person: "Technology Director",
          service: "pmo",
          description: "Primavera implementation and IT support",
          attachments: []
        }
      ]
    }
  }
};
