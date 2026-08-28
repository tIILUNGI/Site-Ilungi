export interface Certificate {
  id: string;
  code: string;
  student: string;
  course: string;
  issuedDate: string;
  hours?: string;
  status: 'valid' | 'revoked';
  pdfUrl?: string;
  pdfFileName?: string;
  createdAt?: string;
}

export const defaultCertificates: Certificate[] = [
  {
    id: "ILUNGI-FDN-CS-0022026",
    code: "ILUNGI-FDN-CS-0022026",
    student: "Carlos Silva",
    course: "IV Fórum de Desenvolvimento de Negócios",
    issuedDate: "15/01/2024",
    hours: "24h",
    status: "valid"
  },
  {
    id: "AILUNGI-2024-001",
    code: "AILUNGI-2024-001",
    student: "João Silva",
    course: "Gestão de Projetos e Liderança",
    issuedDate: "20/02/2024",
    hours: "40h",
    status: "valid"
  }
];

export const getStoredCertificates = (): Certificate[] => {
  try {
    const saved = localStorage.getItem('ilungi_certificates_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading certificates from localStorage:', e);
  }
  return defaultCertificates;
};

export const saveStoredCertificates = (certs: Certificate[]) => {
  try {
    localStorage.setItem('ilungi_certificates_data', JSON.stringify(certs));
    window.dispatchEvent(new Event('ilungi-certificates-updated'));
  } catch (e) {
    console.error('Error saving certificates to localStorage:', e);
  }
};
