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
    id: 's1',
    name: 'Salya',
    tagline: isPt ? 'Gestão de Salários' : 'Payroll Management',
    desc: isPt
      ? 'Plataforma para gestão e emissão de recibos de salário. Automatização de folhas de pagamento e gestão de pagamentos.'
      : 'Platform for payroll management and salary receipt issuance. Automation of payroll and payment management.',
    image: '/imagens/Salya.png',
    url: 'https://salya.ao/',
    color: 'from-[#1B3C2B] to-[#2E7D5E]',
    bgColor: 'bg-[#1B3C2B]'
  },
  {
    id: 's2',
    name: 'SICLIC',
    tagline: isPt ? 'Inteligência de Compliance' : 'Compliance Intelligence',
    desc: isPt
      ? 'Sistema inteligente para gestão de compliance legal, contratual e normativo em tempo real. Monitoramento contínuo de obrigações legais e normativas.'
      : 'Smart system for real-time legal, contractual, and regulatory compliance management. Continuous monitoring of legal and regulatory obligations.',
    image: '/imagens/SICLIC.png',
    url: 'https://siclic.ao/',
    color: 'from-[#6a00a3] to-[#8000c4]',
    bgColor: 'bg-[#6a00a3]'
  },
  {
    id: 's3',
    name: 'Tocomply360',
    tagline: isPt ? 'Gestão de Sistemas ISO' : 'Gestão de Sistemas ISO',
    desc: isPt
      ? 'Gestão de Sistemas ISO'
      : 'Gestão de Sistemas ISO',
    image: '/imagens/Tocomply360.png',
    url: 'https://tocomply360.io/',
    color: 'from-slate-700 to-slate-900',
    bgColor: 'bg-slate-800'
  },
  {
    id: 's4',
    name: 'ToKnow',
    tagline: isPt ? 'Gestão do Conhecimento' : 'Knowledge Management',
    desc: isPt
      ? 'Plataforma inteligente de gestão do conhecimento organizacional. Centralize, organize e partilhe o saber da sua equipa de forma eficiente e segura.'
      : "Intelligent organizational knowledge management platform. Centralize, organize and share your team's knowledge efficiently and securely.",
    image: '/imagens/TOKNOW Logo.png',
    url: 'https://toknow.tocomply360.io/',
    color: 'from-[#0d47a1] to-[#1976d2]',
    bgColor: 'bg-[#0d47a1]'
  },
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
  }
];
