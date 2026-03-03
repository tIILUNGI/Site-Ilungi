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
      pt: 'Especialistas em Governan\u00e7a de Projectos e Gest\u00e3o Estrat\u00e9gica.',
      en: 'Specialists in Project Governance and Strategic Management.'
    },
    logo: '/imagens/GPMoi.png',
    color: '#6a00a3'
  },
  {
    id: 'p2',
    name: 'CFC Institute',
    url: 'https://cfc-institute.org/',
    desc: {
      pt: 'Institui\u00e7\u00e3o l\u00edder em certifica\u00e7\u00e3o financeira e compliance.',
      en: 'Leading institution in financial certification and compliance.'
    },
    logo: '/imagens/CFC-institute.png',
    color: '#0A4D8C'
  },
  {
    id: 'p3',
    name: 'Universal Certification and Services',
    url: 'https://unicertservices.com/',
    desc: {
      pt: 'L\u00edder em certifica\u00e7\u00e3o e servi\u00e7os de conformidade internacional.',
      en: 'Leader in certification and international compliance services.'
    },
    logo: '/imagens/UCS.png',
    color: '#6c0606'
  },
  {
    id: 'p4',
    name: 'Nova Select',
    url: 'https://novaselect.co/index.html',
    desc: {
      pt: 'Desde a primeira conversa at\u00e9 a entrega final, entregamos crescimento mensur\u00e1vel. Especialistas em enfrentar desafios digitais complexos com design bem elaborado, criatividade e engenharia de precis\u00e3o.',
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
      pt: 'Parceiro estrat\u00e9gico para solu\u00e7\u00f5es de sustentabilidade em Angola.',
      en: 'Strategic partner for sustainability solutions in Angola.'
    },
    logo: '/imagens/Ixi Ambiental.png',
    color: '#2E7D5E'
  }
];
