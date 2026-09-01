import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, FileText, Mail, MapPin, Phone, ShieldCheck, Award, CheckCircle2, Download, ExternalLink } from 'lucide-react';
import { useAppContext } from '../App';
import { loadConfig } from '../lib/dataSync';

export type LegalPageType = 'privacy' | 'terms' | 'cookies' | 'qualidade' | 'compliance';

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalMetaInfo = {
  code: string;
  approvalDate: string;
  revision: string;
  signoff: string;
  pdfUrl: string;
  history?: Array<{ rev: string; date: string; description: string }>;
};

type LegalPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  relatedLinks: Array<{ to: string; label: string }>;
  contactTitle: string;
  contactDescription: string;
  metaInfo?: LegalMetaInfo;
};

const defaultConfigByLang = (isPt: boolean) => ({
  companyName: 'ILUNGI Lda',
  address: isPt
    ? 'Urbanização Nova Vida, Rua 46, Edifício E209, Apartamento 24, Luanda, Angola'
    : 'Nova Vida Urbanization, Street 46, Building E209, Apartment 24, Luanda, Angola',
  phone: '+244 935 793 270',
  email: 'geral@ilungi.ao',
});

const getLegalContent = (
  type: LegalPageType,
  isPt: boolean,
  companyName: string
): LegalPageContent => {
  if (type === 'privacy') {
    return isPt
      ? {
          eyebrow: 'Política de Privacidade',
          title: 'Privacidade e Tratamento de Dados',
          intro: `Esta política descreve como a ${companyName} recolhe, utiliza, armazena e protege os dados pessoais tratados no site, incluindo contacto, candidatura espontânea, academia, portal AILUNGI e restantes interações digitais.`,
          lastUpdated: 'Última atualização: 8 de maio de 2026',
          sections: [
            {
              title: '1. Âmbito',
              paragraphs: [
                'Ao utilizar este site, o utilizador reconhece esta política e aceita o tratamento estritamente necessário para resposta a pedidos, acompanhamento comercial, operação da plataforma e melhoria da experiência digital.',
                'Esta política aplica-se ao site institucional, formulários de contacto, páginas de candidatura, registo e acesso a áreas autenticadas e outros pontos de recolha de dados associados a serviços da ILUNGI.',
              ],
            },
            {
              title: '2. Dados Que Recolhemos',
              paragraphs: [
                'Os dados tratados dependem do tipo de interação realizada no site.',
              ],
              items: [
                'Dados fornecidos voluntariamente: nome, email, telefone, assunto, mensagem, área de interesse, CV, anexos e outras informações submetidas em formulários.',
                'Dados de conta e autenticação: nome completo, email e credenciais usadas no portal AILUNGI ou noutras áreas restritas.',
                'Dados técnicos e de navegação: página visitada, URL, origem do acesso, resolução de ecrã, identificadores de visitante e sessão e parâmetros UTM para analítica.',
                'Preferências funcionais: idioma, tema visual e estados de sessão guardados no navegador para manter funcionalidades ativas.',
              ],
            },
            {
              title: '3. Finalidades do Tratamento',
              paragraphs: [
                'Tratamos dados pessoais apenas para fins ligados ao funcionamento do negócio e do próprio site.',
              ],
              items: [
                'Responder a pedidos de contacto, proposta comercial, agendamento e esclarecimento.',
                'Receber, analisar e encaminhar candidaturas espontâneas e submissão de documentos.',
                'Gerir registos, autenticação e acesso a funcionalidades da academia e do portal AILUNGI.',
                'Melhorar desempenho, segurança, conteúdo, navegação e medição estatística do site.',
                'Cumprir obrigações legais, administrativas e de suporte ao cliente quando aplicável.',
              ],
            },
            {
              title: '4. Partilha de Dados',
              paragraphs: [
                'A ILUNGI não comercializa dados pessoais. A partilha pode ocorrer apenas quando necessária para operação técnica, atendimento ou cumprimento legal.',
              ],
              items: [
                'Prestadores de alojamento, API, suporte técnico e infraestrutura digital.',
                'Ferramentas de contacto, email, formulários, mapas incorporados e serviços de analítica.',
                'Autoridades competentes, quando houver obrigação legal ou regulatória.',
              ],
            },
            {
              title: '5. Conservação e Segurança',
              paragraphs: [
                'Os dados são conservados pelo período necessário para cumprir a finalidade da recolha, manter histórico operacional razoável e satisfazer exigências legais ou contratuais.',
                'Adotamos medidas técnicas e organizativas razoáveis para reduzir risco de acesso indevido, alteração, divulgação ou perda. Ainda assim, nenhum sistema online garante segurança absoluta.',
              ],
            },
            {
              title: '6. Cookies e Tecnologias Equivalentes',
              paragraphs: [
                'O site utiliza cookies e mecanismos equivalentes de navegador, incluindo localStorage e sessionStorage, para manter sessões, preferências funcionais e indicadores de analítica.',
                'Para detalhes adicionais sobre estas tecnologias, consulte a nossa Política de Cookies.',
              ],
            },
            {
              title: '7. Direitos do Titular',
              paragraphs: [
                'Sempre que aplicável, o titular pode solicitar informação sobre os seus dados e pedir correção ou atualização.',
              ],
              items: [
                'Solicitar acesso aos dados tratados.',
                'Pedir correção, atualização ou eliminação de dados inexatos ou desnecessários.',
                'Retirar consentimento para comunicações não essenciais, quando esse consentimento for a base do tratamento.',
                'Apresentar pedido ou reclamação através dos canais de contacto da ILUNGI.',
              ],
            },
            {
              title: '8. Alterações a Esta Política',
              paragraphs: [
                'Esta política pode ser atualizada para refletir alterações do site, dos serviços ou de exigências legais. A versão publicada nesta página é a versão em vigor.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/termos-de-uso', label: 'Ver Termos de Uso' },
            { to: '/cookies', label: 'Ver Política de Cookies' },
            { to: '/politica-de-qualidade', label: 'Ver Política da Qualidade' },
            { to: '/politica-de-compliance', label: 'Ver Política de Compliance' },
          ],
          contactTitle: 'Falar com a ILUNGI',
          contactDescription:
            'Para exercício de direitos, dúvidas sobre tratamento de dados ou questões institucionais, utilize os contactos abaixo.',
        }
      : {
          eyebrow: 'Privacy Policy',
          title: 'Privacy and Data Processing',
          intro: `This policy explains how ${companyName} collects, uses, stores, and protects personal data processed through the website, including contact, spontaneous applications, academy, AILUNGI portal, and related digital interactions.`,
          lastUpdated: 'Last updated: May 8, 2026',
          sections: [
            {
              title: '1. Scope',
              paragraphs: [
                'By using this website, the user acknowledges this policy and accepts the processing strictly necessary for request handling, commercial follow-up, platform operation, and digital experience improvement.',
                'This policy applies to the institutional website, contact forms, application pages, registration and login areas, and other collection points connected to ILUNGI services.',
              ],
            },
            {
              title: '2. Data We Collect',
              paragraphs: ['The data processed depends on the type of interaction carried out on the site.'],
              items: [
                'Data voluntarily provided by the user: name, email, phone, subject, message, area of interest, CV, attachments, and other submitted information.',
                'Account and authentication data: full name, email, and credentials used in the AILUNGI portal or other restricted areas.',
                'Technical and browsing data: visited page, URL, traffic source, screen resolution, visitor and session identifiers, and UTM parameters for analytics.',
                'Functional preferences: language, visual theme, and session states stored in the browser to keep site features working properly.',
              ],
            },
            {
              title: '3. Processing Purposes',
              paragraphs: ['We process personal data only for purposes connected to business operations and website functionality.'],
              items: [
                'Responding to contact requests, proposal requests, scheduling, and clarifications.',
                'Receiving, reviewing, and routing spontaneous applications and submitted documents.',
                'Managing registrations, authentication, and access to academy and AILUNGI portal features.',
                'Improving performance, security, content, navigation, and statistical measurement of the website.',
                'Complying with legal, administrative, and customer support obligations where applicable.',
              ],
            },
            {
              title: '4. Data Sharing',
              paragraphs: [
                'ILUNGI does not sell personal data. Sharing may occur only when required for technical operations, customer support, or legal compliance.',
              ],
              items: [
                'Hosting, API, technical support, and digital infrastructure providers.',
                'Contact, email, form, embedded map, and analytics tools.',
                'Competent authorities, whenever required by law or regulation.',
              ],
            },
            {
              title: '5. Retention and Security',
              paragraphs: [
                'Data is retained for the period necessary to fulfill the collection purpose, maintain a reasonable operational history, and satisfy legal or contractual requirements.',
                'We adopt reasonable technical and organizational measures to reduce the risk of unauthorized access, alteration, disclosure, or loss. No online system can guarantee absolute security.',
              ],
            },
            {
              title: '6. Cookies and Similar Technologies',
              paragraphs: [
                'The website uses cookies and equivalent browser technologies, including localStorage and sessionStorage, to maintain sessions, functional preferences, and analytics indicators.',
                'For more detail about these technologies, please read our Cookie Policy.',
              ],
            },
            {
              title: '7. Data Subject Rights',
              paragraphs: ['Whenever applicable, the data subject may request information about their data and ask for correction or update.'],
              items: [
                'Request access to processed data.',
                'Request correction, update, or deletion of inaccurate or unnecessary data.',
                'Withdraw consent for non-essential communications when consent is the basis for processing.',
                'Submit a request or complaint through ILUNGI contact channels.',
              ],
            },
            {
              title: '8. Changes to This Policy',
              paragraphs: [
                'This policy may be updated to reflect website, service, or legal changes. The version published on this page is the current one.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/termos-de-uso', label: 'View Terms of Use' },
            { to: '/cookies', label: 'View Cookie Policy' },
            { to: '/politica-de-qualidade', label: 'View Quality Policy' },
            { to: '/politica-de-compliance', label: 'View Compliance Policy' },
          ],
          contactTitle: 'Contact ILUNGI',
          contactDescription:
            'For rights requests, questions about data processing, or institutional matters, use the contact details below.',
        };
  }

  if (type === 'terms') {
    return isPt
      ? {
          eyebrow: 'Termos de Uso',
          title: 'Condições de Utilização do Site',
          intro: `Estes Termos de Uso regulam o acesso e a utilização do site da ${companyName}, incluindo páginas institucionais, formulários, áreas autenticadas e conteúdo publicado para clientes, parceiros, candidatos e utilizadores em geral.`,
          lastUpdated: 'Última atualização: 8 de maio de 2026',
          sections: [
            {
              title: '1. Aceitação e Objeto',
              paragraphs: [
                'Ao aceder ou utilizar este site, o utilizador concorda com estes Termos de Uso e com a Política de Privacidade aplicável.',
                'O site tem natureza institucional e informativa, podendo incluir pedidos de contacto, candidaturas, acesso a conteúdo restrito e ligações para serviços e canais externos da ILUNGI.',
              ],
            },
            {
              title: '2. Uso Permitido',
              paragraphs: [
                'O utilizador compromete-se a utilizar o site de forma lícita, diligente e compatível com a sua finalidade.',
              ],
              items: [
                'Não utilizar o site para fraude, spam, engenharia social, difusão de malware ou tentativa de acesso indevido.',
                'Não interferir com o funcionamento, segurança, disponibilidade ou integridade técnica da plataforma.',
                'Não submeter informações falsas, enganosas, ofensivas ou que violem direitos de terceiros.',
                'Não reproduzir ou explorar conteúdo do site sem autorização prévia, salvo nos limites legais aplicáveis.',
              ],
            },
            {
              title: '3. Conteúdo e Propriedade Intelectual',
              paragraphs: [
                'Marcas, textos, imagens, identidade visual, estruturação de serviços, materiais institucionais e demais elementos disponibilizados no site pertencem à ILUNGI ou aos respetivos titulares de direitos.',
                'A consulta do site não transfere qualquer licença ampla de utilização comercial sobre esse conteúdo.',
              ],
            },
            {
              title: '4. Formulários, Pedidos e Informações',
              paragraphs: [
                'O utilizador é responsável pela veracidade, atualidade e legitimidade dos dados submetidos por meio dos formulários do site.',
                'O envio de pedido de contacto, candidatura, interesse em cursos ou solicitação comercial não cria, por si só, obrigação contratual imediata entre as partes. Propostas, contratos e serviços dependem de validação posterior da ILUNGI.',
              ],
            },
            {
              title: '5. Áreas Restritas e Credenciais',
              paragraphs: [
                'Sempre que existir conta, portal ou área autenticada, o utilizador deve proteger as suas credenciais e responder pelo uso realizado com elas.',
              ],
              items: [
                'Manter password e dados de acesso sob controlo pessoal.',
                'Não partilhar acesso com terceiros sem autorização expressa.',
                'Comunicar rapidamente qualquer suspeita de uso indevido, perda de acesso ou incidente de segurança.',
              ],
            },
            {
              title: '6. Ligações Externas e Serviços de Terceiros',
              paragraphs: [
                'O site pode conter links para redes sociais, mapas, plataformas parceiras e outros serviços externos. A utilização desses ambientes passa a ser regida pelos termos e políticas próprios de cada terceiro.',
              ],
            },
            {
              title: '7. Disponibilidade e Limitação de Responsabilidade',
              paragraphs: [
                'A ILUNGI procura manter o site atualizado e funcional, mas não garante disponibilidade ininterrupta, ausência absoluta de falhas, nem que todo o conteúdo esteja permanentemente livre de imprecisões ou omissões.',
                'Dentro dos limites legais aplicáveis, a ILUNGI não responde por danos decorrentes de indisponibilidade temporária, uso inadequado do site pelo utilizador ou dependência exclusiva de conteúdo institucional sem validação adicional.',
              ],
            },
            {
              title: '8. Alterações, Suspensão e Legislação Aplicável',
              paragraphs: [
                'A ILUNGI pode atualizar estes termos, ajustar funcionalidades, restringir acessos ou descontinuar partes do site quando necessário por razões técnicas, operacionais, legais ou estratégicas.',
                'Estes termos devem ser interpretados segundo as leis aplicáveis em Angola, sem prejuízo de outras obrigações legais que possam incidir sobre a relação.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/privacidade', label: 'Ver Política de Privacidade' },
            { to: '/cookies', label: 'Ver Política de Cookies' },
            { to: '/politica-de-qualidade', label: 'Ver Política da Qualidade' },
            { to: '/contacto', label: 'Solicitar Esclarecimento' },
          ],
          contactTitle: 'Esclarecimentos e Suporte',
          contactDescription:
            'Se precisar de esclarecer algum ponto destes termos ou tratar de um pedido específico, utilize os contactos institucionais abaixo.',
        }
      : {
          eyebrow: 'Terms of Use',
          title: 'Website Terms of Use',
          intro: `These Terms of Use govern access to and use of the ${companyName} website, including institutional pages, forms, authenticated areas, and content published for clients, partners, applicants, and general users.`,
          lastUpdated: 'Last updated: May 8, 2026',
          sections: [
            {
              title: '1. Acceptance and Purpose',
              paragraphs: [
                'By accessing or using this website, the user agrees to these Terms of Use and to the applicable Privacy Policy.',
                'The website is institutional and informational in nature and may include contact requests, applications, access to restricted content, and links to ILUNGI services and external channels.',
              ],
            },
            {
              title: '2. Permitted Use',
              paragraphs: ['The user agrees to use the website lawfully, diligently, and consistently with its intended purpose.'],
              items: [
                'Do not use the website for fraud, spam, social engineering, malware distribution, or unauthorized access attempts.',
                'Do not interfere with the operation, security, availability, or technical integrity of the platform.',
                'Do not submit false, misleading, offensive information, or content that violates third-party rights.',
                'Do not reproduce or exploit website content without prior authorization, except where legally allowed.',
              ],
            },
            {
              title: '3. Content and Intellectual Property',
              paragraphs: [
                'Trademarks, texts, images, visual identity, service structure, institutional materials, and other website elements belong to ILUNGI or their respective rights holders.',
                'Browsing the website does not grant any broad commercial license over that content.',
              ],
            },
            {
              title: '4. Forms, Requests, and Information',
              paragraphs: [
                'The user is responsible for the accuracy, currency, and legitimacy of the data submitted through website forms.',
                'Submitting a contact request, application, course interest form, or commercial request does not, by itself, create an immediate contractual obligation between the parties. Proposals, contracts, and services remain subject to ILUNGI review.',
              ],
            },
            {
              title: '5. Restricted Areas and Credentials',
              paragraphs: [
                'Whenever an account, portal, or authenticated area exists, the user must protect their credentials and is responsible for the use made with them.',
              ],
              items: [
                'Keep passwords and access data under personal control.',
                'Do not share access with third parties without express authorization.',
                'Promptly report any suspected misuse, loss of access, or security incident.',
              ],
            },
            {
              title: '6. External Links and Third-Party Services',
              paragraphs: [
                'The website may contain links to social networks, maps, partner platforms, and other external services. Use of those environments is governed by each third party own terms and policies.',
              ],
            },
            {
              title: '7. Availability and Limitation of Liability',
              paragraphs: [
                'ILUNGI seeks to keep the website updated and functional, but does not guarantee uninterrupted availability, absolute absence of faults, or that all content will always be free from inaccuracies or omissions.',
                'Within applicable legal limits, ILUNGI is not liable for damages arising from temporary unavailability, improper website use by the user, or exclusive reliance on institutional content without additional validation.',
              ],
            },
            {
              title: '8. Changes, Suspension, and Applicable Law',
              paragraphs: [
                'ILUNGI may update these terms, adjust features, restrict access, or discontinue parts of the website when necessary for technical, operational, legal, or strategic reasons.',
                'These terms shall be interpreted in accordance with the laws applicable in Angola, without prejudice to any other legal obligations that may apply to the relationship.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/privacidade', label: 'View Privacy Policy' },
            { to: '/cookies', label: 'View Cookie Policy' },
            { to: '/politica-de-qualidade', label: 'View Quality Policy' },
            { to: '/contacto', label: 'Request Clarification' },
          ],
          contactTitle: 'Clarifications and Support',
          contactDescription:
            'If you need clarification about these terms or assistance with a specific request, use the institutional contacts below.',
        };
  }

  if (type === 'qualidade') {
    return isPt
      ? {
          eyebrow: 'Política da Qualidade',
          title: 'Política da Qualidade ILUNGI',
          intro: `A ${companyName}, no âmbito das suas atividades, orienta-se pela prestação consistente de serviços e soluções de qualidade, comprometendo-se a apoiar organizações e profissionais no seu desenvolvimento e crescimento sustentável, tanto de forma vertical, por meio da especialização das suas atividades, como de forma horizontal, através do alargamento das suas bases de oferta.`,
          lastUpdated: 'Aprovado pela Direção: 20 de janeiro de 2026 (Rev. 02)',
          metaInfo: {
            code: 'ILUNGI-POL-SGQ-002',
            approvalDate: '16/01/2026',
            revision: '02',
            signoff: 'Manuel do Rosário Isaac Cafelo (Pela Direcção)',
            pdfUrl: '/Politica%20de%20Qualidade.pdf',
            history: [
              { rev: '01', date: '26.11.2023', description: 'Versão original' },
              { rev: '02', date: '16.01.2026', description: 'Versão Revista' },
            ],
          },
          sections: [
            {
              title: '1. Compromissos Fundamentais da Qualidade',
              paragraphs: [
                'Para concretizar o seu compromisso com a excelência e o valor acrescentado aos seus clientes e parceiros, a ILUNGI compromete-se expressamente a:',
              ],
              items: [
                'Compreender e atender às necessidades e expectativas das partes interessadas relevantes, com especial enfoque na satisfação dos seus clientes.',
                'Cumprir os requisitos aplicáveis, incluindo os requisitos legais, regulamentares, contratuais e outros requisitos assumidos pela organização.',
                'Assegurar a eficácia e a melhoria contínua do Sistema de Gestão da Qualidade, implementado e certificado, promovendo a abordagem por processos, a gestão de riscos e oportunidades e o desempenho consistente das suas atividades.',
                'Valorizar o envolvimento, a competência e a consciencialização das pessoas, como fator essencial para a qualidade dos serviços prestados e para a criação de valor.',
              ],
            },
            {
              title: '2. Comunicação, Aplicação e Revisão Periódica',
              paragraphs: [
                'Esta Política da Qualidade é comunicada, compreendida e aplicada em toda a organização, encontrando-se disponível às partes interessadas relevantes.',
                'É revista periodicamente para assegurar a sua contínua adequação, alinhamento estratégico e conformidade com os mais elevados padrões internacionais.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/politica-de-compliance', label: 'Ver Política de Compliance' },
            { to: '/certificacoes', label: 'Ver Nossas Certificações' },
            { to: '/privacidade', label: 'Ver Política de Privacidade' },
          ],
          contactTitle: 'Gestão da Qualidade',
          contactDescription:
            'Para mais esclarecimentos sobre o nosso Sistema de Gestão da Qualidade (SGQ) ou sugestões de melhoria contínua, utilize os contactos abaixo.',
        }
      : {
          eyebrow: 'Quality Policy',
          title: 'ILUNGI Quality Policy',
          intro: `${companyName} is guided by the consistent delivery of quality services and solutions, committing to supporting organizations and professionals in their sustainable development and growth both vertically and horizontally.`,
          lastUpdated: 'Approved by Management: January 20, 2026 (Rev. 02)',
          metaInfo: {
            code: 'ILUNGI-POL-SGQ-002',
            approvalDate: '16/01/2026',
            revision: '02',
            signoff: 'Manuel do Rosário Isaac Cafelo (For the Management)',
            pdfUrl: '/Politica%20de%20Qualidade.pdf',
            history: [
              { rev: '01', date: '26.11.2023', description: 'Original Version' },
              { rev: '02', date: '16.01.2026', description: 'Revised Version' },
            ],
          },
          sections: [
            {
              title: '1. Key Quality Commitments',
              paragraphs: [
                'To realize our commitment to excellence and value creation for clients and partners, ILUNGI explicitly commits to:',
              ],
              items: [
                'Understand and fulfill the needs and expectations of relevant stakeholders, with a special focus on client satisfaction.',
                'Comply with applicable requirements, including legal, regulatory, contractual, and other organizational obligations.',
                'Ensure the effectiveness and continual improvement of the implemented and certified Quality Management System, promoting a process approach, risk and opportunity management, and consistent performance.',
                'Value employee involvement, competence, and awareness as essential factors for service quality and value creation.',
              ],
            },
            {
              title: '2. Communication, Application, and Periodic Review',
              paragraphs: [
                'This Quality Policy is communicated, understood, and applied throughout the organization and is available to all relevant stakeholders.',
                'It is reviewed periodically to ensure ongoing suitability, strategic alignment, and full compliance with international standards.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/politica-de-compliance', label: 'View Compliance Policy' },
            { to: '/certificacoes', label: 'View Our Certifications' },
            { to: '/privacidade', label: 'View Privacy Policy' },
          ],
          contactTitle: 'Quality Management Inquiries',
          contactDescription:
            'For further details regarding our Quality Management System or continuous improvement, contact ILUNGI Management.',
        };
  }

  if (type === 'compliance') {
    return isPt
      ? {
          eyebrow: 'Política de Compliance',
          title: 'Política de Compliance e Ética ILUNGI',
          intro: `A ${companyName}, no âmbito da sua governação, gestão e prestação de serviços especializados, compromete-se a actuar com integridade, ética, transparência e conformidade, assegurando o cumprimento das obrigações legais, regulamentares, contratuais e demais requisitos aplicáveis.`,
          lastUpdated: 'Aprovado pela Direção: 20 de janeiro de 2026 (Rev. 01)',
          metaInfo: {
            code: 'ILUNGI-POL-SGC-001',
            approvalDate: '16/01/2026',
            revision: '01',
            signoff: 'Manuel do Rosário Isaac Cafelo (Pela Direcção)',
            pdfUrl: '/Politica%20de%20Compliance.pdf',
            history: [{ rev: '01', date: '16.01.2026', description: 'Versão original' }],
          },
          sections: [
            {
              title: '1. Compromissos de Compliance e Integridade (ISO 37301)',
              paragraphs: [
                'Para concretizar este compromisso com a conformidade e integridade institucional, a ILUNGI compromete-se a:',
              ],
              items: [
                'Implementar, manter e melhorar continuamente um Sistema de Gestão de Compliance, em conformidade com a Norma ISO 37301.',
                'Promover uma cultura de integridade e responsabilidade, assegurando que as decisões e actividades são conduzidas de forma ética e conforme.',
                'Identificar, avaliar e tratar riscos de compliance, com base numa abordagem sistemática e proporcional.',
                'Garantir a independência, autoridade e recursos adequados à Função de Compliance.',
                'Disponibilizar mecanismos adequados para a comunicação de preocupações e denúncias, assegurando confidencialidade e protecção contra retaliação.',
                'Assegurar a comunicação, formação e consciencialização das pessoas relativamente às suas responsabilidades em matéria de compliance.',
              ],
            },
            {
              title: '2. Comunicação, Aplicação e Revisão',
              paragraphs: [
                'Esta Política de Compliance é comunicada, compreendida e aplicada em toda a organização, encontrando-se disponível às partes interessadas relevantes.',
                'É revista periodicamente para assegurar a sua contínua adequação, alinhamento estratégico e conformidade.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/politica-de-qualidade', label: 'Ver Política da Qualidade' },
            { to: '/certificacoes', label: 'Ver Nossas Certificações' },
            { to: '/termos-de-uso', label: 'Ver Termos de Uso' },
          ],
          contactTitle: 'Canal de Compliance e Ética',
          contactDescription:
            'Para reportar preocupações, esclarecer dúvidas de ética ou interagir com a Função de Compliance, utilize os nossos canais oficiais.',
        }
      : {
          eyebrow: 'Compliance Policy',
          title: 'ILUNGI Compliance & Ethics Policy',
          intro: `${companyName}, within its governance, management, and specialized service delivery, commits to operating with integrity, ethics, transparency, and compliance, ensuring full compliance with legal, regulatory, contractual, and applicable requirements.`,
          lastUpdated: 'Approved by Management: January 20, 2026 (Rev. 01)',
          metaInfo: {
            code: 'ILUNGI-POL-SGC-001',
            approvalDate: '16/01/2026',
            revision: '01',
            signoff: 'Manuel do Rosário Isaac Cafelo (For the Management)',
            pdfUrl: '/Politica%20de%20Compliance.pdf',
            history: [{ rev: '01', date: '16.01.2026', description: 'Original Version' }],
          },
          sections: [
            {
              title: '1. Compliance & Integrity Commitments (ISO 37301)',
              paragraphs: [
                'To achieve this commitment to compliance and institutional integrity, ILUNGI commits to:',
              ],
              items: [
                'Implement, maintain, and continually improve a Compliance Management System in accordance with ISO 37301 standard.',
                'Promote a culture of integrity and responsibility, ensuring decisions and activities are conducted ethically and conformably.',
                'Identify, evaluate, and mitigate compliance risks using a systematic and proportional approach.',
                'Guarantee independence, authority, and adequate resources for the Compliance Function.',
                'Provide adequate mechanisms for communicating concerns and whistleblower reports, ensuring confidentiality and protection against retaliation.',
                'Ensure communication, training, and awareness for all personnel regarding compliance responsibilities.',
              ],
            },
            {
              title: '2. Communication, Application, and Review',
              paragraphs: [
                'This Compliance Policy is communicated, understood, and applied throughout the organization and is available to relevant stakeholders.',
                'It is reviewed periodically to ensure continued suitability, strategic alignment, and regulatory compliance.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/politica-de-qualidade', label: 'View Quality Policy' },
            { to: '/certificacoes', label: 'View Our Certifications' },
            { to: '/termos-de-uso', label: 'View Terms of Use' },
          ],
          contactTitle: 'Compliance & Ethics Channel',
          contactDescription:
            'To report concerns, request compliance guidance, or interact with the Compliance Function, use our official channels.',
        };
  }

  // Default: cookies
  return isPt
    ? {
        eyebrow: 'Política de Cookies',
        title: 'Cookies e Tecnologias de Navegador',
        intro: `Esta política explica como a ${companyName} utiliza cookies e tecnologias equivalentes no site para garantir funcionamento, segurança, preferências do utilizador e medição estatística de utilização.`,
        lastUpdated: 'Última atualização: 8 de maio de 2026',
        sections: [
          {
            title: '1. O Que São Cookies',
            paragraphs: [
              'Cookies são pequenos ficheiros ou identificadores armazenados no navegador. Em complemento, o site também pode usar tecnologias equivalentes, como localStorage e sessionStorage, para guardar preferências, sessões e informações operacionais.',
            ],
          },
          {
            title: '2. O Que Utilizamos Neste Site',
            paragraphs: [
              'O site utiliza mecanismos técnicos necessários para a experiência do utilizador e para análise básica de utilização.',
            ],
            items: [
              'Funcionais e essenciais: manter idioma, tema visual, estado de sessão e acessos autenticados.',
              'Analítica e desempenho: identificar visitante e sessão, medir page views, origem de tráfego, parâmetros UTM e resolução de ecrã.',
              'Conteúdo de terceiros: mapas incorporados, links externos e serviços sociais podem aplicar as suas próprias tecnologias e políticas.',
              'Publicidade: neste momento, o site não utiliza cookies próprios de publicidade comportamental.',
            ],
          },
          {
            title: '3. Base de Utilização',
            paragraphs: [
              'Alguns identificadores são necessários para o funcionamento mínimo do site. Outros são usados para compreender desempenho, melhorar navegação e manter segurança operacional.',
            ],
          },
          {
            title: '4. Como Gerir',
            paragraphs: [
              'O utilizador pode configurar o navegador para bloquear, limitar ou apagar cookies e dados locais.',
            ],
            items: [
              'Remover dados armazenados pelo navegador.',
              'Bloquear cookies de terceiros.',
              'Apagar sessões ativas ou navegar em modo privado.',
              'Rever permissões do navegador e do dispositivo para serviços externos.',
            ],
          },
          {
            title: '5. Impacto da Desativação',
            paragraphs: [
              'A desativação de cookies ou armazenamento local pode afetar login, manutenção de sessão, preferência de idioma, tema visual e algumas funções de medição ou integração do site.',
            ],
          },
          {
            title: '6. Atualizações',
            paragraphs: [
              'Esta política pode ser revista sempre que o site passar a utilizar novos mecanismos técnicos, integrações ou requisitos legais.',
            ],
          },
        ],
        relatedLinks: [
          { to: '/privacidade', label: 'Ver Política de Privacidade' },
          { to: '/termos-de-uso', label: 'Ver Termos de Uso' },
          { to: '/politica-de-qualidade', label: 'Ver Política da Qualidade' },
          { to: '/contacto', label: 'Falar com a ILUNGI' },
        ],
        contactTitle: 'Dúvidas Sobre Cookies',
        contactDescription:
          'Se precisar de mais informações sobre cookies, armazenamento local ou funcionamento técnico do site, utilize os contactos institucionais.',
      }
    : {
        eyebrow: 'Cookie Policy',
        title: 'Cookies and Browser Technologies',
        intro: `This policy explains how ${companyName} uses cookies and equivalent technologies on the website to ensure functionality, security, user preferences, and statistical usage measurement.`,
        lastUpdated: 'Last updated: May 8, 2026',
        sections: [
          {
            title: '1. What Cookies Are',
            paragraphs: [
              'Cookies are small browser files or identifiers. In addition, the website may use equivalent technologies such as localStorage and sessionStorage to keep preferences, sessions, and operational information.',
            ],
          },
          {
            title: '2. What We Use on This Website',
            paragraphs: [
              'The website uses technical mechanisms necessary for user experience and for basic usage analysis.',
            ],
            items: [
              'Functional and essential: keep language, visual theme, session state, and authenticated access.',
              'Analytics and performance: identify visitor and session, measure page views, traffic source, UTM parameters, and screen resolution.',
              'Third-party content: embedded maps, external links, and social services may apply their own technologies and policies.',
              'Advertising: at this time, the website does not use first-party behavioral advertising cookies.',
            ],
          },
          {
            title: '3. Basis for Use',
            paragraphs: [
              'Some identifiers are necessary for minimum website operation. Others are used to understand performance, improve navigation, and maintain operational security.',
            ],
          },
          {
            title: '4. How to Manage Them',
            paragraphs: [
              'The user may configure the browser to block, limit, or delete cookies and local data.',
            ],
            items: [
              'Remove data stored by the browser.',
              'Block third-party cookies.',
              'Delete active sessions or browse in private mode.',
              'Review browser and device permissions for external services.',
            ],
          },
          {
            title: '5. Impact of Disabling Them',
            paragraphs: [
              'Disabling cookies or local storage may affect login, session persistence, language preference, visual theme, and some measurement or integration features of the website.',
            ],
          },
          {
            title: '6. Updates',
            paragraphs: [
              'This policy may be revised whenever the website starts using new technical mechanisms, integrations, or legal requirements.',
            ],
          },
        ],
        relatedLinks: [
          { to: '/privacidade', label: 'View Privacy Policy' },
          { to: '/termos-de-uso', label: 'View Terms of Use' },
          { to: '/politica-de-qualidade', label: 'View Quality Policy' },
          { to: '/contacto', label: 'Contact ILUNGI' },
        ],
        contactTitle: 'Questions About Cookies',
        contactDescription:
          'If you need more information about cookies, local storage, or the technical operation of the website, use the institutional contacts below.',
      };
};

const iconByType: Record<LegalPageType, React.ElementType> = {
  privacy: ShieldCheck,
  terms: FileText,
  cookies: Cookie,
  qualidade: Award,
  compliance: CheckCircle2,
};

const LegalPage: React.FC<{ type: LegalPageType }> = ({ type }) => {
  const { lang } = useAppContext();
  const isPt = lang === 'pt';
  const defaultConfig = useMemo(() => defaultConfigByLang(isPt), [isPt]);
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    setConfig(defaultConfig);
    loadConfig('ilungi_global_config', defaultConfig).then((data) => {
      setConfig(data);
    });
  }, [defaultConfig, isPt]);

  const Icon = iconByType[type] || FileText;
  const content = getLegalContent(type, isPt, config.companyName || 'ILUNGI');

  return (
    <div className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-4">
        {/* Banner Header */}
        <div className="mb-10 rounded-[2rem] bg-gradient-to-br from-[#1B3C2B] via-[#234b35] to-[#6a00a3] p-8 text-white shadow-2xl sm:p-10 lg:p-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 backdrop-blur-sm">
                <Icon className="h-7 w-7" />
              </div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-white/80">
                {content.eyebrow}
              </p>
              <h1 className="mb-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                {content.title}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
                {content.intro}
              </p>
              <p className="mt-6 text-sm font-semibold text-white/70">{content.lastUpdated}</p>
            </div>

            {/* Official PDF Download Button if available */}
            {content.metaInfo?.pdfUrl && (
              <div className="shrink-0">
                <a
                  href={content.metaInfo.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white/15 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#1B3C2B] border border-white/20 shadow-lg"
                >
                  <Download className="h-5 w-5" />
                  <span>{isPt ? 'Descarregar PDF Assinado' : 'Download Signed PDF'}</span>
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Document Metadata Table for Official Policies */}
        {content.metaInfo && (
          <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-[#1B3C2B] uppercase tracking-wider">
              {isPt ? 'Ficha Técnica do Documento' : 'Document Metadata'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="block text-xs font-semibold text-slate-400 uppercase">
                  {isPt ? 'Código' : 'Code'}
                </span>
                <span className="font-bold text-slate-800">{content.metaInfo.code}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="block text-xs font-semibold text-slate-400 uppercase">
                  {isPt ? 'Revisão' : 'Revision'}
                </span>
                <span className="font-bold text-slate-800">{content.metaInfo.revision}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="block text-xs font-semibold text-slate-400 uppercase">
                  {isPt ? 'Aprovação' : 'Approval'}
                </span>
                <span className="font-bold text-slate-800">{content.metaInfo.approvalDate}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="block text-xs font-semibold text-slate-400 uppercase">
                  {isPt ? 'Aprovado Por' : 'Signed By'}
                </span>
                <span className="font-bold text-slate-800 text-xs">{content.metaInfo.signoff}</span>
              </div>
            </div>

            {/* Revision History if present */}
            {content.metaInfo.history && (
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="mb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isPt ? 'Histórico de Revisões' : 'Revision History'}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead>
                      <tr className="border-b border-slate-200 font-bold text-slate-700">
                        <th className="py-2 px-3">{isPt ? 'Revisão' : 'Rev'}</th>
                        <th className="py-2 px-3">{isPt ? 'Data' : 'Date'}</th>
                        <th className="py-2 px-3">{isPt ? 'Alterações' : 'Changes'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.metaInfo.history.map((h) => (
                        <tr key={h.rev} className="border-b border-slate-100">
                          <td className="py-2 px-3 font-semibold text-[#6a00a3]">{h.rev}</td>
                          <td className="py-2 px-3">{h.date}</td>
                          <td className="py-2 px-3">{h.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Policy Content Sections */}
        <div className="space-y-6">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="mb-4 text-2xl font-black text-[#1B3C2B]">{section.title}</h2>
              <div className="space-y-4 text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="space-y-3 text-slate-600">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6a00a3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Sign-off footer card for Quality & Compliance policies */}
        {content.metaInfo && (
          <div className="mt-6 rounded-[2rem] border border-emerald-100 bg-emerald-50/50 p-6 sm:p-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                {isPt ? 'Aprovação da Direção' : 'Executive Approval'}
              </p>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                {content.metaInfo.signoff}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Luanda, Angola</p>
            </div>
            <a
              href={content.metaInfo.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B3C2B] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#6a00a3]"
            >
              <Download className="h-4 w-4" />
              <span>{isPt ? 'Ver PDF Assinado' : 'View Signed PDF'}</span>
            </a>
          </div>
        )}

        {/* Contact and Related Links */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-3 text-2xl font-black text-[#1B3C2B]">{content.contactTitle}</h2>
            <p className="mb-6 text-slate-600">{content.contactDescription}</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-700">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#6a00a3]" />
                <span>{config.email}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-700">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#6a00a3]" />
                <span>{config.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#6a00a3]" />
                <span>{config.address}</span>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-5 text-2xl font-black text-[#1B3C2B]">
              {isPt ? 'Links Relacionados' : 'Related Links'}
            </h2>
            <div className="space-y-3">
              {content.relatedLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 font-semibold text-slate-700 transition-all hover:border-[#6a00a3] hover:text-[#6a00a3]"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">+</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
