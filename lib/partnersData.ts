export interface PartnerData {
  id: string;
  name: string;
  url: string;
  desc: { pt: string; en: string };
  logo: string;
  color: string;
}

export const defaultPartners: PartnerData[] = [
  {
    id: 'p1',
    name: 'GPMOi',
    url: 'https://gpmoi.org/',
    desc: {
      pt: 'Um instituto global projetado para PMOs culturalmente adaptáveis e liderados pela inovação',
      en: 'A global institute designed for culturally adaptable and innovation-led PMOs'
    },
    logo: '/imagens/GPMoi.png',
    color: '#6a00a3'
  },
  {
    id: 'p2',
    name: 'CFC Institute',
    url: 'https://cfc-institute.org/',
    desc: {
      pt: 'Capacitando profissionais através de programas de certificação e treinamento de classe mundial que impulsionam o avanço da carreira e a excelência organizacional.',
      en: 'Empowering professionals through world-class certification and training programs that drive career advancement and organizational excellence.'
    },
    logo: '/imagens/CFC-institute.png',
    color: '#0A4D8C'
  },
  {
    id: 'p3',
    name: 'Universal Certification and Services',
    url: 'https://ucsiso.com/',
    desc: {
      pt: 'A Universal Certification and Services (UCS) é um órgão certificador que oferece certificação ISO, auditoria e serviços de treinamento. Credenciada pela ASIB e GAC, a UCS ajuda empresas a alcançar conformidade com normas internacionais, incluindo ISO 9001, 14001, 45001 e outras.',
      en: 'Universal Certification and Services (UCS) is a certification body providing ISO certification, auditing, and training services. Accredited by ASIB and GAC, UCS helps businesses achieve compliance with international standards, including ISO 9001, 14001, 45001, and more.'
    },
    logo: '/imagens/UCS.png',
    color: '#6c0606'
  },
  {
    id: 'p4',
    name: 'Nova Select',
    url: 'https://novaselect.co/',
    desc: {
      pt: 'Desde a primeira conversa até a entrega final, entregamos crescimento mensurável. Especialistas em enfrentar desafios digitais complexos com design bem elaborado, criatividade e engenharia de precisão.',
      en: 'From the first conversation to final delivery, we deliver measurable growth. Specialists in tackling complex digital challenges with thoughtful design, creativity, and precision engineering.'
    },
    logo: '/imagens/Nova Select.png',
    color: '#f06d16'
  },
  {
    id: 'p5',
    name: 'Ixi Ambiental',
    url: 'https://www.ixiambiental.co.ao/',
    desc: {
      pt: 'Especialistas em consultoria ambiental, monitoramento e preservação ambiental, gestão de resíduos, formação e treinamento.',
      en: 'specialists in environmental consulting, environmental monitoring and preservation, waste management, education, and training.'
    },
    logo: '/imagens/Ixi Ambiental.png',
    color: '#2E7D5E'
  }
];

