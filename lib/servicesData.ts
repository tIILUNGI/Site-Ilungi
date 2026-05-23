export interface ServiceData {
  id: string;
  title: string | { pt: string; en: string };
  desc: string | { pt: string; en: string };
  image: string;
  path: string;
  color: string;
}

export const getDefaultServices = (t: any): ServiceData[] => [
  { 
    id: "iso", 
    title: t.consultingAreas.iso.title, 
    desc: t.consultingAreas.iso.desc, 
    image: "/imagens/consultoria-iso.jpg", 
    path: "/consultoria/consultoria-e-auditoria-em-sistemas-de-gestao", 
    color: "#1B3C2B" 
  },
  { 
    id: "risk", 
    title: t.consultingAreas.risk.title, 
    desc: t.consultingAreas.risk.desc, 
    image: "/imagens/gri-sustentabilidade.jpg", 
    path: "/consultoria/gri-sustentabilidade", 
    color: "#6a00a3" 
  },
  { 
    id: "procurement", 
    title: t.consultingAreas.procurement.title, 
    desc: t.consultingAreas.procurement.desc, 
    image: "/imagens/procurement.jpg", 
    path: "/consultoria/procurement", 
    color: "#0A4D8C" 
  },
  { 
    id: "pmo", 
    title: t.consultingAreas.pmo.title, 
    desc: t.consultingAreas.pmo.desc, 
    image: "/imagens/suporte-ti.jpg", 
    path: "/consultoria/assistencia-e-suporte-de-ti", 
    color: "#B31B1B" 
  }
];
