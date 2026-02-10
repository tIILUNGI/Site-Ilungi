
export type Language = 'pt' | 'en';

export interface Translation {
  nav: {
    consulting: string;
    academy: string;
    solutions: string;
    partners: string;
    contact: string;
    iso: string;
    risk: string;
    procurement: string;
    pmo: string;
    alumni: string;
    courses: string;
    verify: string;
    scr: string;
    demo: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      projects: string;
      clients: string;
      students: string;
      experience: string;
    }
  };
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  }
}
