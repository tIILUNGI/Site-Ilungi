export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  status: 'published' | 'draft';
}

export const blogImages: { [key: string]: string } = {
  ilungi: '/blog-assets/dia-mulher-angolana.jpeg',
  rfid: '/blog-assets/modernizacao-rfid.jpeg',
  stock: '/blog-assets/gestao-stock.jpeg',
  inventario: '/blog-assets/inventario.jpeg'
};

export const internetImages: { [key: string]: string } = {
  iso: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  projectos: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80',
  compliance: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
  formacao: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
  tecnologia: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80'
};

export const getDefaultBlogPosts = (isPt: boolean): BlogPost[] => [
  {
    id: 'blog-1',
    title: isPt ? 'ILUNGI: Tradição e Inovação em Angola' : 'ILUNGI: Tradition and Innovation in Angola',
    excerpt: isPt ? 'Conhecida por sua força e visão, transforma desafios em conquistas e constrói futuros entre tradição e inovação.' : 'Known for its strength and vision, it transforms challenges into achievements and builds futures between tradition and innovation.',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date().toISOString().split('T')[0],
    category: 'ILUNGI',
    image: blogImages.ilungi,
    status: 'published'
  },
  {
    id: 'blog-2',
    title: isPt ? 'A sua empresa ainda depende exclusivamente de contagens manuais?' : 'Does your company still rely exclusively on manual counts?',
    excerpt: isPt ? 'RFID (Identificação por Radiofrequência) é uma tecnologia que permite identificar e rastrear ativos automaticamente, sem contacto físico e em tempo real.' : 'RFID (Radio Frequency Identification) is a technology that allows you to identify and track assets automatically, without physical contact and in real time.',
    content: isPt ? 'RFID (Identificação por Radiofrequência) é uma tecnologia que permite identificar e rastrear ativos automaticamente, sem contacto físico e em tempo real.\n\nNa prática, significa:\n\n1. Inventários mais rápidos\n2. Menos erros humanos\n3. Maior controlo operacional\n4. Dados estratégicos automáticos\n\nGrandes indústrias nacionais e internacionais já utilizam esta solução há anos.\nA questão é: quando a sua empresa vai dar esse passo?\n\n#IndústriaAngolana #RFID #TransformaçãoIndustrial' : 'RFID (Radio Frequency Identification) is a technology that allows you to identify and track assets automatically, without physical contact and in real time.\n\nIn practice, it means:\n\n1. Faster inventories\n2. Less human errors\n3. Greater operational control\n4. Automatic strategic data\n\nMajor national and international industries have been using this solution for years.\nThe question is: when will your company take this step?',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'RFID',
    image: blogImages.rfid,
    status: 'published'
  },
  {
    id: 'blog-3',
    title: isPt ? 'O custo silencioso do inventário manual' : 'The silent cost of manual inventory',
    excerpt: isPt ? 'Perdas pequenas diárias geram impactos grandes anuais. Em indústrias como: Petrolíferas, Cimenteiras, Plásticos, Logística pesada.' : 'Small daily losses generate large annual impacts. In industries like: Oil, Cement, Plastics, Heavy logistics.',
    content: isPt ? 'Perdas pequenas diárias geram impactos grandes anuais.\n\nEm indústrias como:\n1. Petrolíferas\n2. Cimenteiras\n3. Plásticos\n4. Logística pesada\n\nErros de contagem, extravios e divergências de stock são comuns.\n\nSem um sistema automatizado, a empresa:\n1. Perde tempo\n2. Perde dinheiro\n3. Perde controlo\n\nRFID reduz drasticamente essas vulnerabilidades.\nControlo não é custo. É proteção financeira.\n\n#IndústriaAngolana #RFID #TransformaçãoIndustrial' : 'Small daily losses generate large annual impacts.\n\nIn industries like:\n1. Oil\n2. Cement\n3. Plastics\n4. Heavy logistics\n\nCounting errors, losses and stock discrepancies are common.\n\nWithout an automated system, the company:\n1. Loses time\n2. Loses money\n3. Loses control\n\nRFID drastically reduces these vulnerabilities.\nControl is not cost. It is financial protection.',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'RFID',
    image: blogImages.inventario,
    status: 'published'
  },
  {
    id: 'blog-4',
    title: isPt ? 'Inventário em segundos' : 'Inventory in seconds',
    excerpt: isPt ? 'Imagine realizar inventário completo de um armazém em minutos. Sem interromper operações. Sem mobilizar equipas extensas. RFID torna isso possível.' : 'Imagine performing a complete inventory of a warehouse in minutes. Without interrupting operations. Without mobilizing extensive teams. RFID makes this possible.',
    content: isPt ? 'Inventário em segundos.\nImagine realizar inventário completo de um armazém em minutos.\n\n- Sem interromper operações.\n- Sem mobilizar equipas extensas.\n\nRFID torna isso possível.\n\n#IndústriaAngolana #RFID #TransformaçãoIndustrial #inventário #tecnologiaRFID' : 'Inventory in seconds.\nImagine performing a complete inventory of a warehouse in minutes.\n\n- Without interrupting operations.\n- Without mobilizing extensive teams.\n\nRFID makes this possible.',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'RFID',
    image: blogImages.stock,
    status: 'published'
  },
  {
    id: 'blog-5',
    title: isPt ? 'Gestão Eficiente de Stocks para Empresas Angolanas' : 'Efficient Stock Management for Angolan Companies',
    excerpt: isPt ? 'Uma gestão de stock eficiente é crucial para o sucesso de qualquer empresa. Descubra as melhores práticas para otimizar os seus inventários.' : 'Efficient stock management is crucial for the success of any company. Discover the best practices to optimize your inventories.',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Gestão de Stocks',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
    status: 'published'
  },
  {
    id: 'blog-6',
    title: isPt ? 'Consultoria ISO: Implementação e Certificação' : 'ISO Consulting: Implementation and Certification',
    excerpt: isPt ? 'A ILUNGI oferece serviços especializados de consultoria ISO para empresas que buscam certificação em normas internacionais de gestão.' : 'ILUNGI offers specialized ISO consulting services for companies seeking certification in international management standards.',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Consultoria ISO',
    image: internetImages.iso,
    status: 'published'
  },
  {
    id: 'blog-7',
    title: isPt ? 'Gestão de Projetos e PMO' : 'Project Management and PMO',
    excerpt: isPt ? 'Serviços de Gestão de Projetos e PMO para garantir o sucesso das suas iniciativas empresariais em Angola.' : 'Project Management and PMO services to ensure the success of your business initiatives in Angola.',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Gestão de Projectos',
    image: internetImages.projectos,
    status: 'published'
  },
  {
    id: 'blog-8',
    title: isPt ? 'Compliance e Regulamentações em Angola' : 'Compliance and Regulations in Angola',
    excerpt: isPt ? 'Mantenha a sua empresa em conformidade com as regulamentações angolanas através dos nossos serviços de compliance.' : 'Keep your company in compliance with Angolan regulations through our compliance services.',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Compliance',
    image: internetImages.compliance,
    status: 'published'
  },
  {
    id: 'blog-9',
    title: isPt ? 'Formação Profissional e Certificação' : 'Professional Training and Certification',
    excerpt: isPt ? 'Descubra os nossos cursos de formação profissional e certificação internacional em diversas áreas.' : 'Discover our professional training and international certification courses in various areas.',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Formação',
    image: internetImages.formacao,
    status: 'published'
  },
  {
    id: 'blog-10',
    title: isPt ? 'Transformação Digital na Indústria Angolana' : 'Digital Transformation in the Angolan Industry',
    excerpt: isPt ? 'A transformação digital está a revolucionar a forma como as empresas angolanas operam e competitam no mercado global.' : 'Digital transformation is revolutionizing how Angolan companies operate and compete in the global market.',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Tecnologia',
    image: internetImages.tecnologia,
    status: 'published'
  },
  {
    id: 'blog-11',
    title: isPt ? 'GRI - Sustentabilidade' : 'GRI - Sustentabilidade',
    excerpt: isPt ? 'GRI - Sustentabilidade' : 'GRI - Sustentabilidade',
    content: '',
    author: 'Equipa ILUNGI',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Gestão de Riscos',
    image: internetImages.default,
    status: 'published'
  }
];
