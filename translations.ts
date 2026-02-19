
import { Translation } from './types';

export const translations: Record<'pt' | 'en', any> = {
  pt: {
    nav: {
      consulting: "Serviços",
      academy: "Academia",
      solutions: "Soluções",
      partners: "Parceiros",
      contact: "Contacto",
      iso: "Consultoria de Sistemas de gestão e projectos",
      risk: "Serviço de notação de risco",
      procurement: "Procurement",
      pmo: "Assistência e suporte de TI",
      alumni: "Alumni ILUNGI",
      courses: "Cursos",
      verify: "Verificar Certificado",
      scr: "School of Corp. Reputation",
      demo: "Demonstração",
      home: "Início",
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
        desc: "Desenvolvemos ecossistemas tecnológicos que simplificam o compliance, a auditoria e o acompanhamento estratégico. Conheça as plataformas Salya e Tocomply360.",
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
        "Metodologia internacional adaptada ao mercado local",
        "Consultores seniores com certificações globais",
        "Foco em resultados mensuráveis e eficiência",
        "Suporte completo do diagnóstico à certificação"
      ],
      explore: "Explorar Soluções",
      cta: "Agendar Reunião Técnica",
    },
    consultingAreas: {
      iso: {
        title: "Consultoria de Sistemas de gestão e projectos",
        desc: "Implementação de sistemas de gestão e condução de projectos de melhoria com foco em padrões e eficiência operacional."
      },
      risk: {
        title: "Serviço de notação de risco",
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
        portal: "Aceder ao Portal Alumni",
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
        desc: "Solução cloud para gestão do relacionamento com o cliente baseada em 4 conceitos: Potencial cliente, cliente, contrato e relatório. As relações são entre pessoas, e o SICLIC auxilia na gestão e fidelização do consumidor.\nwww.siclic.ao | contacto@siclic.ao",
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
        content: "Actuamos na implementação a medida e cirúrgica de sistemas de gestão baseada na normas ISSO, acompanhamos nossos parceiros até a auditoria de certificação, bem como realizamos auditorias de internas e de fornecedores.\nIMPLEMENTAÇAO E AUDITORIA EM SISTEMAS DE GESTÃO:\nGestão de Qualidade ISO 9001\nGestão Ambiental ISO 14001\nGestão de Saúde e Segurança Ocupacional ISO 45001 \nGestão de Informação ISO 27001\nGestão de Compliance e Antissuborno ISO 37001 e ISO 37301\nGestão da Segurança Alimentar ISO 22000 / HACCP\nGestão de Risco ISO 31000 e COSO",
        items: {
          "9001": { title: "ISO 9001 - Gestão da Qualidade", benefit: "Melhoria contínua e satisfação total do cliente." },
          "14001": { title: "ISO 14001 - Gestão Ambiental", benefit: "Sustentabilidade e conformidade legal verde." },
          "45001": { title: "ISO 45001 - Saúde e Segurança Ocupacional", benefit: "Ambiente de trabalho seguro e redução de acidentes." },
          "27001": { title: "ISO 27001 - Gestão de Informação", benefit: "Proteção de ativos digitais e confiança de dados." },
          "22301": { title: "ISO 22301 - Gestão de Continuidade", benefit: "Resiliência face a crises e interrupções." },
          "37001": { title: "ISO 37001 - Gestão de Compliance e Antissuborno", benefit: "Cultura ética e transparência corporativa." },
          "37301": { title: "ISO 37301 - Compliance", benefit: "Sistema de gestão de conformidade." },
          "31000": { title: "ISO 31000 - Gestão de Risco", benefit: "Identificação e mitigação de riscos empresariais." },
          "22000": { title: "ISO 22000 - Segurança Alimentar", benefit: "Garantia de segurança alimentar e HACCP." },
          "13485": { title: "ISO 13485 - Saúde", benefit: "Sistemas de gestão para dispositivos médicos." }
        }
      },
      risk: {
        title: "SERVIÇO DE NOTAÇÃO DE RISCO",
        desc: "Serviço de notação de risco pela ILUNGI",
        content: "Em processo de regularização pela CMC\nO Serviço de Notação de Risco da ILUNGI tem como finalidade contribuir para a transparência, credibilidade e eficiência do mercado, através da avaliação independente da capacidade de cumprimento de obrigações financeiras por parte de entidades e instrumentos financeiros.\nO Serviço de Notação de Risco é exercido com elevados padrões de rigor, imparcialidade, confidencialidade e responsabilidade institucional, estando sujeito a mecanismos internos de controlo, supervisão de compliance e acompanhamento contínuo."
      },
      procurement: {
        title: "Procurement",
        desc: "Serviço completo de procurement para sua empresa.",
        content: "O nosso serviço de procurement tem como objectivo possibilitar que o cliente tenha tempo para focar seus esforços em outros assuntos ligados a sua empresa. Ante a necessidade de serviços, ferramentas ou equipamentos essenciais que a sua empresa esteja a necessitar, nós compramos para si dentro e for a de Angola. Podemos cuidar de tudo, desde notificação de serviços, especificações e certificados de serviço, monitoramento de faturas de vários fornecedores – a preços competitivos e com preços fixos globalmente e a partir de um único ponto de contacto"
      },
      pmo: {
        title: "ASSISTÊNCIA E SUPORTE DE T.I",
        desc: "Serviços de assistência e suporte de TI",
        content: "Se você busca reduzir/controlar custos na área de tecnologia, saiba que contratar outsourcing de TI é uma forma eficaz de economizar recursos, além de possibilitar qualidade e eficiência no serviço prestado. Também é possível otimizar as operações da sua empresa, aumentar a flexibilidade e a produtividade das entregas. Sem falar na prestação de contas, que também é uma condição favorável através do instrumento de contratação.\nOferecemos diferentes planos de terceirização de suporte técnico de TI."
      }
    },
    alumni: {
      login: {
        title: "Bem-vindo Alumni",
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
      subtitle: "Actuamos na implementação a medida e cirúrgica de sistemas de gestão baseada na normas ISSO, acompanhamos nossos parceiros até a auditoria de certificação, bem como realizamos auditorias de internas e de fornecedores.",
      stats: {
        certified: "Várias Empresas Certificadas",
        rate: "Taxa de Aprovação",
      },
      methodology: "Nossa Metodologia de Implementação",
      steps: {
        gap: "Diagnóstico GAP",
        gapDesc: "Análise profunda do estado atual vs requisitos da norma.",
        planning: "Planeamento & Auditoria",
        planningDesc: "Estratégia personalizada e verificação interna rigorosa.",
        certification: "Certificação Final",
        certificationDesc: "Acompanhamento total durante a auditoria externa.",
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
          id: "aguiasSul",
          name: "Aguias do Sul",
          logo: "/Nossas Refeências/Aguias do Sul.png",
          role: "Implementação ISO 9001",
          comment: "A ILUNGI foi fundamental na transformação dos nossos processos de gestão. A certificação ISO 9001 trouxe maior eficiência e credibilidade.",
          person: "Director Geral",
          service: "iso",
          description: "Consultoria e implementação de sistema de gestão da qualidade ISO 9001",
          attachments: []
        },
        {
          id: "imobias",
          name: "IMOVIAS",
          logo: "/Nossas Refeências/Imovias.png",
          role: "Implementação ISO 14001",
          comment: "Excelente trabalho da ILUNGI na implementação da ISO 14001. A equipa demonstrou profissionalismo e conhecimento técnico.",
          person: "Director de Operações",
          service: "iso",
          description: "Consultoria e implementação de sistema de gestão ambiental ISO 14001",
          attachments: []
        },
        {
          id: "interSeguros",
          name: "Inter Seguros",
          logo: "/Nossas Refeências/Inter Seguros.png",
          role: "Implementação ISO 27001",
          comment: "A ILUNGI realizou um trabalho excepcional na implementação da ISO 27001. A segurança da nossa informação está agora garantida.",
          person: "Director de Tecnologia",
          service: "iso",
          description: "Consultoria e implementação de sistema de gestão de segurança da informação ISO 27001",
          attachments: []
        },
        {
          id: "aClean",
          name: "A Clean",
          logo: "/Nossas Refeências/A Clean.jpg",
          role: "Implementação ISO 22000",
          comment: "Graças à ILUNGI, obtivemos a certificação ISO 22000 com sucesso. O processo foi rigoroso e bem estruturado.",
          person: "Director Geral",
          service: "iso",
          description: "Consultoria e implementação de sistema de gestão de segurança alimentar ISO 22000 / HACCP",
          attachments: []
        },
        {
          id: "velonet",
          name: "Velonet",
          logo: "/Nossas Refeências/Velonet.png",
          role: "Implementação ISO 45001",
          comment: "A ILUNGI ajudou-nos a implementar a ISO 45001 de forma eficiente. O ambiente de trabalho tornou-se muito mais seguro.",
          person: "Director de Recursos Humanos",
          service: "iso",
          description: "Consultoria e implementação de sistema de gestão de saúde e segurança ocupacional ISO 45001",
          attachments: []
        },
        {
          id: "cmc",
          name: "CMC",
          logo: "/Nossas Refeências/CMC.png",
          role: "Serviço de Notação de Risco",
          comment: "A ILUNGI oferece um serviço de notação de risco com elevados padrões de rigor e impartialidade.",
          person: "Director Geral",
          service: "risk",
          description: "Serviço de notação de risco em processo de regularização pela CMC",
          attachments: []
        },
        {
          id: "anpg",
          name: "ANPG",
          logo: "/Nossas Refeências/ANPG.png",
          role: "Serviço de Procurement",
          comment: "A ILUNGI fornecer-nos os melhores equipamentos e serviços com eficiência e profissionalismo.",
          person: "Director de Compras",
          service: "procurement",
          description: "Serviços de procurement de equipamentos e ferramentas",
          attachments: ["/Nossas Refeências/cerANPG.png"]
        },
        {
          id: "brill",
          name: "BRILL",
          logo: "/Nossas Refeências/BRILL.png",
          role: "Serviço de Procurement",
          comment: "Excelente serviço de procurement. A ILUNGI sempre entregou no prazo e com qualidade.",
          person: "Director de Operações",
          service: "procurement",
          description: "Serviços de procurement de materiais e equipamentos",
          attachments: ["/Nossas Refeências/cerBRILL.png"]
        },
        {
          id: "petromar",
          name: "PetroMar",
          logo: "/Nossas Refeências/PetroMar.jpg",
          role: "Serviço de Assistência e Suporte de TI",
          comment: "A ILUNGI proporcionou-nos um suporte técnico de excelência. O serviço de TI melhorou significativamente as nossas operações.",
          person: "Director de Sistemas",
          service: "pmo",
          description: "Serviços de assistência e suporte de TI para operações de petróleo e gás",
          attachments: []
        },
        {
          id: "pmo",
          name: "PMO",
          logo: "/Nossas Refeências/PMO.jpg",
          role: "Serviço de Assistência e Suporte de TI",
          comment: "Excelente apoio técnico. A ILUNGI respondeu rapidamente às nossas necessidades de TI.",
          person: "Director de Operações",
          service: "pmo",
          description: "Serviços de gestão de projetos e suporte de TI",
          attachments: []
        },
        {
          id: "porto-do-lubito",
          name: "Porto do Lubito",
          logo: "/Nossas Refeências/Porto do Lubito.png",
          role: "Serviço de Assistência e Suporte de TI",
          comment: "O suporte de TI da ILUNGI foi fundamental para a modernização dos nossos sistemas.",
          person: "Director de Tecnologia",
          service: "pmo",
          description: "Serviços de assistência e suporte de TI para infraestrutura portuária",
          attachments: []
        },
        {
          id: "rnt",
          name: "RNT",
          logo: "/Nossas Refeências/RNT.png",
          role: "Serviço de Assistência e Suporte de TI",
          comment: "Serviço profissional e eficiente. A ILUNGI sempre manteve os nossos sistemas a funcionar.",
          person: "Director de Infraestrutura",
          service: "pmo",
          description: "Serviços de suporte técnico e infraestrutura de TI",
          attachments: []
        },
        {
          id: "tsco",
          name: "TSCO",
          logo: "/Nossas Refeências/TSCO.png",
          role: "Serviço de Assistência e Suporte de TI",
          comment: "A ILUNGI oferece um suporte técnico de alta qualidade. Recomendamos os seus serviços.",
          person: "Director Geral",
          service: "pmo",
          description: "Serviços de outsourcing de TI e suporte técnico",
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
      iso: "Management Systems and Projects Consulting",
      risk: "Risk Rating Service",
      procurement: "Procurement",
      pmo: "IT Assistance and Support",
      alumni: "ILUNGI Alumni",
      courses: "Courses",
      verify: "Verify Certificate",
      scr: "School of Corp. Reputation",
      demo: "Demo",
      home: "Home",
    },
    home: {
      heroTitle: "Excellence in Consulting and Digital Solutions",
      heroSubtitle: "Transforming compliance and management into strategic value for global companies.",
      ctaPrimary: "Request Proposal",
      ctaSecondary: "Learn More",
      services: {
        iso: "ISO Consulting",
        isoDesc: "Implementation and certification in international standards (9001, 27001, etc).",
        projects: "Project Management",
        projectsDesc: "Strategic Governance and PMO for large infrastructures and operations.",
        tech: "SaaS & Tech",
        techDesc: "Digital platforms for compliance, risk, and efficient management.",
        academy: "ILUNGI Academy",
        academyDesc: "Excellence training with international certification.",
      },
      stats: {
        projects: "Projects Completed",
        clients: "Clients Served",
        students: "Certified Students",
        experience: "Years in Market"
      },
      solutions: {
        title: "Digital Solutions Tailored to Your Management",
        desc: "We develop technological ecosystems that simplify compliance, auditing, and strategic monitoring. Discover the Salya and Tocomply360 platforms.",
        feature1: "Real-Time Dashboards",
        feature2: "Cutting-Edge Information Security",
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
        "International methodology adapted to the local market",
        "Senior consultants with global certifications",
        "Focus on measurable results and efficiency",
        "Complete support from diagnosis to certification"
      ],
      explore: "Explore Solutions",
      cta: "Schedule Technical Meeting",
    },
    consultingAreas: {
      iso: {
        title: "Consulting and Audit in Management Systems & Projects",
        desc: "Consulting for management systems implementation and project delivery focused on standards and operational efficiency."
      },
      risk: {
        title: "SERVIÇO DE NOTAÇÃO DE RISCO",
        desc: "Serviço de notação de risco"
      },
      procurement: {
        title: "Procurement",
        desc: "Serviço completo de procurement para sua empresa."
      },
      pmo: {
        title: "ASSISTÊNCIA E SUPORTE DE T.I",
        desc: "Serviços de assistência e suporte de TI"
      }
    },
    academy: {
      title: "TRAINING AND CORPORATE EDUCATION",
      subtitle: "Recognizing the specificities of each company, we design customized training solutions. We provide all the necessary assistance in the integrated management of the training plan, so that companies can efficiently and effectively achieve their objectives.",
      description: "Corporate education, in this service context, is a follow-up strategy aimed at people management in your company, where skills must be developed in favor of the organizational context. This means that the practice goes far beyond just offering training or simply qualifying the workforce.",
      features: {
        cert: "Int. Certification",
        certDesc: "Globally valid certificates.",
        mentoria: "Mentoring",
        mentoriaDesc: "Follow-up with specialists.",
        material: "Premium Material",
        materialDesc: "Lifetime access to exclusive resources.",
        networking: "Networking",
        networkingDesc: "Exclusive community of alumni.",
      },
      coursesTitle: "Featured Courses",
      coursesDesc: "Registrations open for the next quarter.",
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
        portal: "Access Alumni Portal",
        verify: "Verify Authenticity",
      }
    },
    partners: {
      title: "Our Partner Network",
      subtitle: "We collaborate with the best global institutions to deliver excellence solutions.",
      visit: "Visit Website",
    },
    solutions: {
      title: "Digital Solutions",
      subtitle: "Cutting-edge technology for efficient business management.",
      sicloc: {
        title: "SICLIC",
        desc: "Cloud solution for customer relationship management based on 4 concepts: Potential client, client, contract and report. Relationships are between people, and SICLIC helps manage and loyalize consumers.\nwww.siclic.ao | contacto@siclic.ao",
      },
      tocomply: {
        title: "ToComply360º",
        desc: "Cloud-based system that ensures flexibility and agility in business compliance process management.",
      },
    },
    services: {
      iso: {
        title: "CONSULTORIA E AUDITORIA EM SISTEMAS DE GESTÃO & PROJECTOS",
        desc: "Especialistas em implementação e auditoria de sistemas de gestão ISO.",
        content: "Actuamos na implementação a medida e cirúrgica de sistemas de gestão baseada na normas ISSO, acompanhamos nossos parceiros até a auditoria de certificação, bem como realizamos auditorias de internas e de fornecedores.\nIMPLEMENTAÇAO E AUDITORIA EM SISTEMAS DE GESTÃO:\nGestão de Qualidade ISO 9001\nGestão Ambiental ISO 14001\nGestão de Saúde e Segurança Ocupacional ISO 45001 \nGestão de Informação ISO 27001\nGestão de Compliance e Antissuborno ISO 37001 e ISO 37301\nGestão da Segurança Alimentar ISO 22000 / HACCP\nGestão de Risco ISO 31000 e COSO",
        items: {
          "9001": { title: "ISO 9001 - Gestão da Qualidade", benefit: "Melhoria contínua e satisfação total do cliente." },
          "14001": { title: "ISO 14001 - Gestão Ambiental", benefit: "Sustentabilidade e conformidade legal verde." },
          "45001": { title: "ISO 45001 - Saúde e Segurança Ocupacional", benefit: "Ambiente de trabalho seguro e redução de acidentes." },
          "27001": { title: "ISO 27001 - Gestão de Informação", benefit: "Proteção de ativos digitais e confiança de dados." },
          "22301": { title: "ISO 22301 - Gestão de Continuidade", benefit: "Resiliência face a crises e interrupções." },
          "37001": { title: "ISO 37001 - Gestão de Compliance e Antissuborno", benefit: "Cultura ética e transparência corporativa." },
          "37301": { title: "ISO 37301 - Compliance", benefit: "Sistema de gestão de conformidade." },
          "31000": { title: "ISO 31000 - Gestão de Risco", benefit: "Identificação e mitigação de riscos empresariais." },
          "22000": { title: "ISO 22000 - Segurança Alimentar", benefit: "Garantia de segurança alimentar e HACCP." },
          "13485": { title: "ISO 13485 - Saúde", benefit: "Sistemas de gestão para dispositivos médicos." }
        }
      },
      risk: {
        title: "SERVIÇO DE NOTAÇÃO DE RISCO",
        desc: "Serviço de notação de risco pela ILUNGI",
        content: "Em processo de regularização pela CMC\nO Serviço de Notação de Risco da ILUNGI tem como finalidade contribuir para a transparência, credibilidade e eficiência do mercado, através da avaliação independente da capacidade de cumprimento de obrigações financeiras por parte de entidades e instrumentos financeiros.\nO Serviço de Notação de Risco é exercido com elevados padrões de rigor, imparcialidade, confidencialidade e responsabilidade institucional, estando sujeito a mecanismos internos de controlo, supervisão de compliance e acompanhamento contínuo."
      },
      procurement: {
        title: "Procurement",
        desc: "Serviço completo de procurement para sua empresa.",
        content: "O nosso serviço de procurement tem como objectivo possibilitar que o cliente tenha tempo para focar seus esforços em outros assuntos ligados a sua empresa. Ante a necessidade de serviços, ferramentas ou equipamentos essenciais que a sua empresa esteja a necessitar, nós compramos para si dentro e for a de Angola. Podemos cuidar de tudo, desde notificação de serviços, especificações e certificados de serviço, monitoramento de faturas de vários fornecedores – a preços competitivos e com preços fixos globalmente e a partir de um único ponto de contacto"
      },
      pmo: {
        title: "ASSISTÊNCIA E SUPORTE DE T.I",
        desc: "Serviços de assistência e suporte de TI",
        content: "Se você busca reduzir/controlar custos na área de tecnologia, saiba que contratar outsourcing de TI é uma forma eficaz de economizar recursos, além de possibilitar qualidade e eficiência no serviço prestado. Também é possível otimizar as operações da sua empresa, aumentar a flexibilidade e a produtividade das entregas. Sem falar na prestação de contas, que também é uma condição favorável através do instrumento de contratação.\nOferecemos diferentes planos de terceirização de suporte técnico de TI."
      }
    },
    alumni: {
      login: {
        title: "Welcome Alumni",
        subtitle: "Access your exclusive area",
        email: "Email",
        password: "Password",
        remember: "Remember me",
        forgot: "Forgot password",
        button: "Access",
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
          hours: "Hours",
        },
        inProgress: "In Progress",
        continue: "Continue Lesson",
        completed: "completed",
      }
    },
    iso: {
      title: "CONSULTORIA E AUDITORIA EM SISTEMAS DE GESTÃO & PROJECTOS",
      subtitle: "Actuamos na implementação a medida e cirúrgica de sistemas de gestão baseada na normas ISSO, acompanhamos nossos parceiros até a auditoria de certificação, bem como realizamos auditorias de internas e de fornecedores.",
      stats: {
        certified: "Várias Empresas Certificadas",
        rate: "Taxa de Aprovação",
      },
      methodology: "Nossa Metodologia de Implementação",
      steps: {
        gap: "Diagnóstico GAP",
        gapDesc: "Análise profunda do estado atual vs requisitos da norma.",
        planning: "Planeamento & Auditoria",
        planningDesc: "Estratégia personalizada e verificação interna rigorosa.",
        certification: "Certificação Final",
        certificationDesc: "Acompanhamento total durante a auditoria externa.",
      },
      cta: "Falar com Consultor Senior",
      testimonial: "A ILUNGI foi fundamental para nossa expansão internacional através da ISO 9001.",
      testimonialAuthor: "",
    },
    references: {
      title: "Our References",
      subtitle: "Companies that trusted our services",
      viewDetails: "View Details",
      clients: [
        // ISO References
        {
          id: "aguiasSul",
          name: "Aguias do Sul",
          logo: "/Nossas Refeências/Aguias do Sul.png",
          role: "ISO 9001 Implementation",
          comment: "ILUNGI was fundamental in transforming our management processes. ISO 9001 certification brought greater efficiency and credibility.",
          person: "General Director",
          service: "iso",
          description: "Consulting and implementation of ISO 9001 quality management system",
          attachments: []
        },
        {
          id: "imobias",
          name: "IMOVIAS",
          logo: "/Nossas Refeências/Imobias.png",
          role: "ISO 14001 Implementation",
          comment: "Excellent work by ILUNGI in implementing ISO 14001. The team demonstrated professionalism and technical knowledge.",
          person: "Operations Director",
          service: "iso",
          description: "Consulting and implementation of ISO 14001 environmental management system",
          attachments: []
        },
        {
          id: "interSeguros",
          name: "Inter Seguros",
          logo: "/Nossas Refeências/Inter Seguros.png",
          role: "ISO 27001 Implementation",
          comment: "ILUNGI did an exceptional job implementing ISO 27001. Our information security is now guaranteed.",
          person: "Technology Director",
          service: "iso",
          description: "Consulting and implementation of ISO 27001 information security management system",
          attachments: []
        },
        {
          id: "aClean",
          name: "A Clean",
          logo: "/Nossas Refeências/A Clean.jpg",
          role: "ISO 22000 Implementation",
          comment: "Thanks to ILUNGI, we obtained ISO 22000 certification successfully. The process was rigorous and well structured.",
          person: "General Director",
          service: "iso",
          description: "Consulting and implementation of ISO 22000 / HACCP food safety management system",
          attachments: []
        },
        {
          id: "velonet",
          name: "Velonet",
          logo: "/Nossas Refeências/Velonet.png",
          role: "ISO 45001 Implementation",
          comment: "ILUNGI helped us implement ISO 45001 efficiently. The workplace has become much safer.",
          person: "Human Resources Director",
          service: "iso",
          description: "Consulting and implementation of ISO 45001 occupational health and safety management system",
          attachments: []
        },
        // Risk References
        // Risk References
        {
          id: "cmc",
          name: "CMC",
          logo: "/Nossas Refeências/CMC.png",
          role: "Risk Rating Service",
          comment: "ILUNGI offers a risk rating service with high standards of rigor and impartiality.",
          person: "General Director",
          service: "risk",
          description: "Risk rating service under regularization process by CMC",
          attachments: []
        },
        // Procurement References
        {
          id: "anpg",
          name: "ANPG",
          logo: "/Nossas Refeências/ANPG.png",
          role: "Procurement Service",
          comment: "ILUNGI provided us with the best equipment and services efficiently and professionally.",
          person: "Procurement Director",
          service: "procurement",
          description: "Procurement services for equipment and tools",
          attachments: ["/Nossas Refeências/cerANPG.png"]
        },
        {
          id: "brill",
          name: "BRILL",
          logo: "/Nossas Refeências/BRILL.png",
          role: "Procurement Service",
          comment: "Excellent procurement service. ILUNGI always delivered on time and with quality.",
          person: "Operations Director",
          service: "procurement",
          description: "Procurement services for materials and equipment",
          attachments: ["/Nossas Refeências/cerBRILL.png"]
        },
        // TI/PMO References
        {
          id: "petromar",
          name: "PetroMar",
          logo: "/Nossas Refeências/PetroMar.jpg",
          role: "IT Assistance and Support Service",
          comment: "ILUNGI provided us with excellent technical support. The IT service significantly improved our operations.",
          person: "Systems Director",
          service: "pmo",
          description: "IT assistance and support services for oil and gas operations",
          attachments: []
        },
        {
          id: "pmo",
          name: "PMO",
          logo: "/Nossas Refeências/PMO.jpg",
          role: "IT Assistance and Support Service",
          comment: "Excellent technical support. ILUNGI quickly responded to our IT needs.",
          person: "Operations Director",
          service: "pmo",
          description: "Project management and IT support services",
          attachments: []
        },
        {
          id: "porto-do-lubito",
          name: "Porto do Lubito",
          logo: "/Nossas Refeências/Porto do Lubito.png",
          role: "IT Assistance and Support Service",
          comment: "ILUNGI's IT support was fundamental for modernizing our systems.",
          person: "Technology Director",
          service: "pmo",
          description: "IT assistance and support services for port infrastructure",
          attachments: []
        },
        {
          id: "rnt",
          name: "RNT",
          logo: "/Nossas Refeências/RNT.png",
          role: "IT Assistance and Support Service",
          comment: "Professional and efficient service. ILUNGI always kept our systems running.",
          person: "Infrastructure Director",
          service: "pmo",
          description: "Technical support and IT infrastructure services",
          attachments: []
        },
        {
          id: "tsco",
          name: "TSCO",
          logo: "/Nossas Refeências/TSCO.png",
          role: "IT Assistance and Support Service",
          comment: "ILUNGI offers high-quality technical support. We recommend their services.",
          person: "General Director",
          service: "pmo",
          description: "IT outsourcing and technical support services",
          attachments: []
        }
      ]
    }
  }
};
