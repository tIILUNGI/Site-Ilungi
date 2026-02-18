
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
      title: "Academia ILUNGI",
      subtitle: "Formando os líderes de amanhã com metodologias internacionais e instrutores com vasta experiência de mercado.",
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
      salya: {
        title: "Salya - GRC Platform",
        desc: "Plataforma completa de Governance, Risk & Compliance para empresas modernas.",
      },
      tocomply: {
        title: "Tocomply360",
        desc: "Solução integrada de compliance e gestão documental.",
      },
    },
    services: {
      iso: {
        title: "Especialistas em Certificação ISO",
        desc: "Guiamos sua empresa rumbo à excelência operacional através das normas internacionais mais respeitadas do mundo.",
        items: {
          "9001": { title: "ISO 9001 - Gestão da Qualidade", benefit: "Melhoria contínua e satisfação total do cliente." },
          "14001": { title: "ISO 14001 - Gestão Ambiental", benefit: "Sustentabilidade e conformidade legal verde." },
          "45001": { title: "ISO 45001 - Saúde e Segurança", benefit: "Ambiente de trabalho seguro e redução de acidentes." },
          "27001": { title: "ISO 27001 - Segurança da Informação", benefit: "Proteção de ativos digitais e confiança de dados." },
          "22301": { title: "ISO 22301 - Continuidade de Negócio", benefit: "Resiliência perante crises e interrupções." },
          "37001": { title: "ISO 37001 - Antissuborno", benefit: "Cultura ética e transparência corporativa." }
        }
      },
      risk: {
        title: "Serviço de notação de risco",
        desc: "Avaliação estruturada de riscos corporativos para apoiar decisões e conformidade.",
        content: "Combinamos métricas, dados e análise especializada para classificar riscos e orientar ações de mitigação."
      },
      procurement: {
        title: "Consultoria em Procurement",
        desc: "Maximize a eficiência da sua cadeia de suprimentos e reduza custos operacionais significativos.",
        content: "Implementamos processos de compras estratégicas, qualificação de fornecedores e compliance em procurement para garantir agilidade e transparência."
      },
      pmo: {
        title: "Assistência e suporte de TI",
        desc: "Suporte técnico contínuo para manter sistemas, redes e utilizadores a funcionar sem interrupções.",
        content: "Atuamos com helpdesk, manutenção preventiva, monitorização e resposta rápida a incidentes."
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
      title: "Consultoria de Sistemas de Gestão e Projectos",
      subtitle: "Apoiamos a implementação de sistemas de gestão baseados em normas internacionais e a condução de projectos de certificação.",
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
        title: "Management Systems and Projects Consulting",
        desc: "Consulting for management systems implementation and project delivery focused on standards and operational efficiency."
      },
      risk: {
        title: "Risk Rating Service",
        desc: "Risk classification and analysis to support strategic decision-making."
      },
      procurement: {
        title: "Procurement",
        desc: "Supply chain optimization, cost reduction, and procurement compliance."
      },
      pmo: {
        title: "IT Assistance and Support",
        desc: "Ongoing technical support for operations, infrastructure, and IT service continuity."
      }
    },
    academy: {
      title: "ILUNGI Academy",
      subtitle: "Training tomorrow's leaders with international methodologies and instructors with extensive market experience.",
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
      salya: {
        title: "Salya - GRC Platform",
        desc: "Complete platform for Governance, Risk & Compliance for modern companies.",
      },
      tocomply: {
        title: "Tocomply360",
        desc: "Integrated compliance and document management solution.",
      },
    },
    services: {
      iso: {
        title: "ISO Certification Experts",
        desc: "We guide your company towards operational excellence through the world's most respected international standards.",
        items: {
          "9001": { title: "ISO 9001 - Quality Management", benefit: "Continuous improvement and total customer satisfaction." },
          "14001": { title: "ISO 14001 - Environmental Management", benefit: "Sustainability and green legal compliance." },
          "45001": { title: "ISO 45001 - Health & Safety", benefit: "Safe working environment and accident reduction." },
          "27001": { title: "ISO 27001 - Information Security", benefit: "Protection of digital assets and data trust." },
          "22301": { title: "ISO 22301 - Business Continuity", benefit: "Resilience in face of crises and interruptions." },
          "37001": { title: "ISO 37001 - Anti-bribery", benefit: "Ethical culture and corporate transparency." }
        }
      },
      risk: {
        title: "Risk Rating Service",
        desc: "Structured risk assessment to support decisions and compliance.",
        content: "We combine metrics, data, and expert analysis to classify risks and guide mitigation actions."
      },
      procurement: {
        title: "Procurement Consulting",
        desc: "Maximize your supply chain efficiency and significantly reduce operational costs.",
        content: "We implement strategic sourcing processes, vendor qualification, and procurement compliance to ensure agility and transparency."
      },
      pmo: {
        title: "IT Assistance and Support",
        desc: "Continuous technical support to keep systems, networks, and users running without interruption.",
        content: "We provide helpdesk, preventive maintenance, monitoring, and fast incident response."
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
      title: "Management Systems and Projects Consulting",
      subtitle: "We support the implementation of management systems based on international standards and the delivery of certification projects.",
      stats: {
        certified: "Several Certified Companies",
        rate: "Approval Rate",
      },
      methodology: "Our Implementation Methodology",
      steps: {
        gap: "GAP Assessment",
        gapDesc: "In-depth analysis of current state vs. standard requirements.",
        planning: "Planning & Audit",
        planningDesc: "Personalized strategy and rigorous internal verification.",
        certification: "Final Certification",
        certificationDesc: "Full support during external audit.",
      },
      cta: "Talk to Senior Consultant",
      testimonial: "ILUNGI was fundamental for our international expansion through ISO 9001.",
      testimonialAuthor: "",
    }
  }
};
