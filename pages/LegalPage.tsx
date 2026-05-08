import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, FileText, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../App';
import { loadConfig } from '../lib/dataSync';

type LegalPageType = 'privacy' | 'terms' | 'cookies';

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
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
};

const defaultConfigByLang = (isPt: boolean) => ({
  companyName: 'ILUNGI Lda',
  address: isPt
    ? 'Urbanizacao Nova Vida, Rua 46, Edificio E209, Apartamento 24, Luanda, Angola'
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
          eyebrow: 'Politica de Privacidade',
          title: 'Privacidade e Tratamento de Dados',
          intro: `Esta politica descreve como a ${companyName} recolhe, utiliza, armazena e protege os dados pessoais tratados no site, incluindo contacto, candidatura espontanea, academia, portal AILUNGI e restantes interacoes digitais.`,
          lastUpdated: 'Ultima atualizacao: 8 de maio de 2026',
          sections: [
            {
              title: '1. Ambito',
              paragraphs: [
                'Ao utilizar este site, o utilizador reconhece esta politica e aceita o tratamento estritamente necessario para resposta a pedidos, acompanhamento comercial, operacao da plataforma e melhoria da experiencia digital.',
                'Esta politica aplica-se ao site institucional, formularios de contacto, paginas de candidatura, registo e acesso a areas autenticadas e outros pontos de recolha de dados associados a servicos da ILUNGI.',
              ],
            },
            {
              title: '2. Dados Que Recolhemos',
              paragraphs: [
                'Os dados tratados dependem do tipo de interacao realizada no site.',
              ],
              items: [
                'Dados fornecidos voluntariamente: nome, email, telefone, assunto, mensagem, area de interesse, CV, anexos e outras informacoes submetidas em formularios.',
                'Dados de conta e autenticacao: nome completo, email e credenciais usadas no portal AILUNGI ou noutras areas restritas.',
                'Dados tecnicos e de navegacao: pagina visitada, URL, origem do acesso, resolucao de ecran, identificadores de visitante e sessao e parametros UTM para analitica.',
                'Preferencias funcionais: idioma, tema visual e estados de sessao guardados no navegador para manter funcionalidades ativas.',
              ],
            },
            {
              title: '3. Finalidades do Tratamento',
              paragraphs: [
                'Tratamos dados pessoais apenas para fins ligados ao funcionamento do negocio e do proprio site.',
              ],
              items: [
                'Responder a pedidos de contacto, proposta comercial, agendamento e esclarecimento.',
                'Receber, analisar e encaminhar candidaturas espontaneas e submissao de documentos.',
                'Gerir registos, autenticacao e acesso a funcionalidades da academia e do portal AILUNGI.',
                'Melhorar desempenho, seguranca, conteudo, navegacao e medicao estatistica do site.',
                'Cumprir obrigacoes legais, administrativas e de suporte ao cliente quando aplicavel.',
              ],
            },
            {
              title: '4. Partilha de Dados',
              paragraphs: [
                'A ILUNGI nao comercializa dados pessoais. A partilha pode ocorrer apenas quando necessaria para operacao tecnica, atendimento ou cumprimento legal.',
              ],
              items: [
                'Prestadores de alojamento, API, suporte tecnico e infraestrutura digital.',
                'Ferramentas de contacto, email, formularios, mapas incorporados e servicos de analitica.',
                'Autoridades competentes, quando houver obrigacao legal ou regulatoria.',
              ],
            },
            {
              title: '5. Conservacao e Seguranca',
              paragraphs: [
                'Os dados sao conservados pelo periodo necessario para cumprir a finalidade da recolha, manter historico operacional razoavel e satisfazer exigencias legais ou contratuais.',
                'Adotamos medidas tecnicas e organizativas razoaveis para reduzir risco de acesso indevido, alteracao, divulgacao ou perda. Ainda assim, nenhum sistema online garante seguranca absoluta.',
              ],
            },
            {
              title: '6. Cookies e Tecnologias Equivalentes',
              paragraphs: [
                'O site utiliza cookies e mecanismos equivalentes de navegador, incluindo localStorage e sessionStorage, para manter sessoes, preferencias funcionais e indicadores de analitica.',
                'Para detalhes adicionais sobre estas tecnologias, consulte a nossa Politica de Cookies.',
              ],
            },
            {
              title: '7. Direitos do Titular',
              paragraphs: [
                'Sempre que aplicavel, o titular pode solicitar informacao sobre os seus dados e pedir correcao ou atualizacao.',
              ],
              items: [
                'Solicitar acesso aos dados tratados.',
                'Pedir correcao, atualizacao ou eliminacao de dados inexatos ou desnecessarios.',
                'Retirar consentimento para comunicacoes nao essenciais, quando esse consentimento for a base do tratamento.',
                'Apresentar pedido ou reclamacao atraves dos canais de contacto da ILUNGI.',
              ],
            },
            {
              title: '8. Alteracoes a Esta Politica',
              paragraphs: [
                'Esta politica pode ser atualizada para refletir alteracoes do site, dos servicos ou de exigencias legais. A versao publicada nesta pagina e a versao em vigor.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/termos-de-uso', label: 'Ver Termos de Uso' },
            { to: '/cookies', label: 'Ver Politica de Cookies' },
            { to: '/contacto', label: 'Entrar em Contacto' },
          ],
          contactTitle: 'Falar com a ILUNGI',
          contactDescription:
            'Para exercicio de direitos, duvidas sobre tratamento de dados ou questoes institucionais, utilize os contactos abaixo.',
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
            { to: '/contacto', label: 'Contact ILUNGI' },
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
          title: 'Condicoes de Utilizacao do Site',
          intro: `Estes Termos de Uso regulam o acesso e a utilizacao do site da ${companyName}, incluindo paginas institucionais, formularios, areas autenticadas e conteudo publicado para clientes, parceiros, candidatos e utilizadores em geral.`,
          lastUpdated: 'Ultima atualizacao: 8 de maio de 2026',
          sections: [
            {
              title: '1. Aceitacao e Objeto',
              paragraphs: [
                'Ao aceder ou utilizar este site, o utilizador concorda com estes Termos de Uso e com a Politica de Privacidade aplicavel.',
                'O site tem natureza institucional e informativa, podendo incluir pedidos de contacto, candidaturas, acesso a conteudo restrito e ligacoes para servicos e canais externos da ILUNGI.',
              ],
            },
            {
              title: '2. Uso Permitido',
              paragraphs: [
                'O utilizador compromete-se a utilizar o site de forma licita, diligente e compativel com a sua finalidade.',
              ],
              items: [
                'Nao utilizar o site para fraude, spam, engenharia social, difusao de malware ou tentativa de acesso indevido.',
                'Nao interferir com o funcionamento, seguranca, disponibilidade ou integridade tecnica da plataforma.',
                'Nao submeter informacoes falsas, enganosas, ofensivas ou que violem direitos de terceiros.',
                'Nao reproduzir ou explorar conteudo do site sem autorizacao previa, salvo nos limites legais aplicaveis.',
              ],
            },
            {
              title: '3. Conteudo e Propriedade Intelectual',
              paragraphs: [
                'Marcas, textos, imagens, identidade visual, estruturacao de servicos, materiais institucionais e demais elementos disponibilizados no site pertencem a ILUNGI ou aos respetivos titulares de direitos.',
                'A consulta do site nao transfere qualquer licenca ampla de utilizacao comercial sobre esse conteudo.',
              ],
            },
            {
              title: '4. Formularios, Pedidos e Informacoes',
              paragraphs: [
                'O utilizador e responsavel pela veracidade, atualidade e legitimidade dos dados submetidos por meio dos formularios do site.',
                'O envio de pedido de contacto, candidatura, interesse em cursos ou solicitacao comercial nao cria, por si so, obrigacao contratual imediata entre as partes. Propostas, contratos e servicos dependem de validacao posterior da ILUNGI.',
              ],
            },
            {
              title: '5. Areas Restritas e Credenciais',
              paragraphs: [
                'Sempre que existir conta, portal ou area autenticada, o utilizador deve proteger as suas credenciais e responder pelo uso realizado com elas.',
              ],
              items: [
                'Manter password e dados de acesso sob controlo pessoal.',
                'Nao partilhar acesso com terceiros sem autorizacao expressa.',
                'Comunicar rapidamente qualquer suspeita de uso indevido, perda de acesso ou incidente de seguranca.',
              ],
            },
            {
              title: '6. Ligacoes Externas e Servicos de Terceiros',
              paragraphs: [
                'O site pode conter links para redes sociais, mapas, plataformas parceiras e outros servicos externos. A utilizacao desses ambientes passa a ser regida pelos termos e politicas proprios de cada terceiro.',
              ],
            },
            {
              title: '7. Disponibilidade e Limitacao de Responsabilidade',
              paragraphs: [
                'A ILUNGI procura manter o site atualizado e funcional, mas nao garante disponibilidade ininterrupta, ausencia absoluta de falhas, nem que todo o conteudo esteja permanentemente livre de imprecisoes ou omissoes.',
                'Dentro dos limites legais aplicaveis, a ILUNGI nao responde por danos decorrentes de indisponibilidade temporaria, uso inadequado do site pelo utilizador ou dependencia exclusiva de conteudo institucional sem validacao adicional.',
              ],
            },
            {
              title: '8. Alteracoes, Suspensao e Legislacao Aplicavel',
              paragraphs: [
                'A ILUNGI pode atualizar estes termos, ajustar funcionalidades, restringir acessos ou descontinuar partes do site quando necessario por razoes tecnicas, operacionais, legais ou estrategicas.',
                'Estes termos devem ser interpretados segundo as leis aplicaveis em Angola, sem prejuizo de outras obrigacoes legais que possam incidir sobre a relacao.',
              ],
            },
          ],
          relatedLinks: [
            { to: '/privacidade', label: 'Ver Politica de Privacidade' },
            { to: '/cookies', label: 'Ver Politica de Cookies' },
            { to: '/contacto', label: 'Solicitar Esclarecimento' },
          ],
          contactTitle: 'Esclarecimentos e Suporte',
          contactDescription:
            'Se precisar de esclarecer algum ponto destes termos ou tratar de um pedido especifico, utilize os contactos institucionais abaixo.',
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
            { to: '/contacto', label: 'Request Clarification' },
          ],
          contactTitle: 'Clarifications and Support',
          contactDescription:
            'If you need clarification about these terms or assistance with a specific request, use the institutional contacts below.',
        };
  }

  return isPt
    ? {
        eyebrow: 'Politica de Cookies',
        title: 'Cookies e Tecnologias de Navegador',
        intro: `Esta politica explica como a ${companyName} utiliza cookies e tecnologias equivalentes no site para garantir funcionamento, seguranca, preferencias do utilizador e medicao estatistica de utilizacao.`,
        lastUpdated: 'Ultima atualizacao: 8 de maio de 2026',
        sections: [
          {
            title: '1. O Que Sao Cookies',
            paragraphs: [
              'Cookies sao pequenos ficheiros ou identificadores armazenados no navegador. Em complemento, o site tambem pode usar tecnologias equivalentes, como localStorage e sessionStorage, para guardar preferencias, sessoes e informacoes operacionais.',
            ],
          },
          {
            title: '2. O Que Utilizamos Neste Site',
            paragraphs: [
              'O site utiliza mecanismos tecnicos necessarios para a experiencia do utilizador e para analise basica de utilizacao.',
            ],
            items: [
              'Funcionais e essenciais: manter idioma, tema visual, estado de sessao e acessos autenticados.',
              'Analitica e desempenho: identificar visitante e sessao, medir page views, origem de trafego, parametros UTM e resolucao de ecran.',
              'Conteudo de terceiros: mapas incorporados, links externos e servicos sociais podem aplicar as suas proprias tecnologias e politicas.',
              'Publicidade: neste momento, o site nao utiliza cookies proprios de publicidade comportamental.',
            ],
          },
          {
            title: '3. Base de Utilizacao',
            paragraphs: [
              'Alguns identificadores sao necessarios para o funcionamento minimo do site. Outros sao usados para compreender desempenho, melhorar navegacao e manter seguranca operacional.',
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
              'Apagar sessoes ativas ou navegar em modo privado.',
              'Rever permissoes do navegador e do dispositivo para servicos externos.',
            ],
          },
          {
            title: '5. Impacto da Desativacao',
            paragraphs: [
              'A desativacao de cookies ou armazenamento local pode afetar login, manutencao de sessao, preferencia de idioma, tema visual e algumas funcoes de medicao ou integracao do site.',
            ],
          },
          {
            title: '6. Atualizacoes',
            paragraphs: [
              'Esta politica pode ser revista sempre que o site passar a utilizar novos mecanismos tecnicos, integracoes ou requisitos legais.',
            ],
          },
        ],
        relatedLinks: [
          { to: '/privacidade', label: 'Ver Politica de Privacidade' },
          { to: '/termos-de-uso', label: 'Ver Termos de Uso' },
          { to: '/contacto', label: 'Falar com a ILUNGI' },
        ],
        contactTitle: 'Duvidas Sobre Cookies',
        contactDescription:
          'Se precisar de mais informacoes sobre cookies, armazenamento local ou funcionamento tecnico do site, utilize os contactos institucionais.',
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
          { to: '/contacto', label: 'Contact ILUNGI' },
        ],
        contactTitle: 'Questions About Cookies',
        contactDescription:
          'If you need more information about cookies, local storage, or the technical operation of the website, use the institutional contacts below.',
      };
};

const iconByType = {
  privacy: ShieldCheck,
  terms: FileText,
  cookies: Cookie,
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

  const Icon = iconByType[type];
  const content = getLegalContent(type, isPt, config.companyName || 'ILUNGI');

  return (
    <div className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 rounded-[2rem] bg-gradient-to-br from-[#1B3C2B] via-[#234b35] to-[#6a00a3] p-8 text-white shadow-2xl sm:p-10 lg:p-12">
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
