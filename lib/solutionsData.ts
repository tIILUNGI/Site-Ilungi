export interface SolutionData {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  path?: string;
  url?: string;
  color: string;
  bgColor: string;
}

export const getDefaultSolutions = (isPt: boolean): SolutionData[] => [
  {
    id: 's0',
    name: 'Primavera',
    tagline: isPt ? 'Configuração e Implementação' : 'Configuration and Implementation',
    desc: isPt
      ? 'Serviços especializados de configuração e implementação do software Primavera para gestão de projetos, recursos e portfólios. Suporte completo desde a instalação até a customização conforme as necessidades da sua empresa.'
      : 'Specialized configuration and implementation services for Primavera software for project, resource, and portfolio management. Full support from installation to customization according to your company needs.',
    image: '/imagens/primavera.png',
    color: 'from-[#e65100] to-[#ff9800]',
    bgColor: 'bg-[#e65100]'
  },
  {
    id: 's1',
    name: 'Salya',
    tagline: isPt ? 'Gest\u00e3o de Sal\u00e1rios & RH' : 'Payroll & HR Management',
    desc: isPt
      ? 'Plataforma para gest\u00e3o e emiss\u00e3o de recibos de sal\u00e1rio e controle completo de recursos humanos. Automatiza\u00e7\u00e3o de folhas de pagamento, benef\u00edcios e compliance trabalhista.'
      : 'Platform for payroll management, payslip issuance, and complete HR control. Automation of payroll, benefits, and labor compliance.',
    image: '/imagens/Salya.png',
    path: '/solucoes/salya',
    color: 'from-[#1B3C2B] to-[#2E7D5E]',
    bgColor: 'bg-[#1B3C2B]'
  },
  {
    id: 's2',
    name: 'SICLIC',
    tagline: isPt ? 'Intelig\u00eancia de Compliance' : 'Compliance Intelligence',
    desc: isPt
      ? 'Sistema inteligente para gest\u00e3o de compliance legal, contratual e normativo em tempo real. Monitoramento cont\u00ednuo de obriga\u00e7\u00f5es legais e normativas.'
      : 'Smart system for real-time legal, contractual, and regulatory compliance management. Continuous monitoring of legal and regulatory obligations.',
    image: '/imagens/SICLIC.png',
    url: 'https://siclic.ao/',
    color: 'from-[#6a00a3] to-[#8000c4]',
    bgColor: 'bg-[#6a00a3]'
  },
  {
    id: 's3',
    name: 'Tocomply360',
    tagline: isPt ? 'Gest\u00e3o de Sistemas ISO' : 'Gest\u00e3o de Sistemas ISO',
    desc: isPt
      ? 'Gest\u00e3o de Sistemas ISO'
      : 'Gest\u00e3o de Sistemas ISO',
    image: '/imagens/Tocomply360.png',
    path: '/solucoes/tocomply',
    color: 'from-slate-700 to-slate-900',
    bgColor: 'bg-slate-800'
  }
];
