// Suiza. Cifras en millones de personas. Para actualizar los datos, edita este archivo.
// Se cuentan las personas que viven en Suiza; las pensiones pagadas al extranjero son una opción (alt).
import type { Txt } from '../../i18n/ui';
import type { Pais } from './types';

// BFS, SAKE 2024 (población residente): 4,876 M ocupados, 14,1 % por cuenta propia.
const OCUPADOS = 4.876;
const AUT = +(OCUPADOS * 0.141).toFixed(4);
// BFS, STATENT diciembre 2024: empleos del sector público no de mercado (administraciones, escuelas, hospitales públicos).
const APUB = 0.628174;

const RESIDENTES: Txt = { es: 'Residentes', en: 'Residents', pt: 'Residentes' };
const CON_EXTRANJERO: Txt = { es: 'Con extranjero', en: 'Incl. abroad', pt: 'Com estrangeiro' };

export const suiza: Pais = {
  slug: 'switzerland',
  nombre: { es: 'Suiza', en: 'Switzerland', pt: 'Suíça' },
  grupos: [
    {
      id: 'apub', side: 'pub', categoria: 'empleoPub', toggle: false, v: APUB,
      name: { es: 'Empleo del sector público', en: 'Public sector employment', pt: 'Emprego do setor público' },
      src: { es: 'BFS, STATENT dic. 2024 (empleos)', en: 'BFS, STATENT Dec 2024 (jobs)', pt: 'BFS, STATENT dez. 2024 (postos)' },
    },
    {
      id: 'ahv', side: 'pub', categoria: 'pensiones', toggle: true, v: 1.8877,
      alt: { v: 2.8647, label: CON_EXTRANJERO, baseLabel: RESIDENTES },
      name: { es: 'Pensiones AHV/AVS de jubilación y supervivencia', en: 'AHV/AVS old-age and survivors\' pensions', pt: 'Pensões AHV/AVS de velhice e sobrevivência' },
      src: { es: 'BSV, diciembre 2025', en: 'BSV, December 2025', pt: 'BSV, dezembro 2025' },
    },
    {
      id: 'iv', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.2338,
      alt: { v: 0.2606, label: CON_EXTRANJERO, baseLabel: RESIDENTES },
      name: { es: 'Pensiones de invalidez IV/AI', en: 'IV/AI disability pensions', pt: 'Pensões de invalidez IV/AI' },
      src: { es: 'BSV, IV 2025', en: 'BSV, IV 2025', pt: 'BSV, IV 2025' },
    },
    {
      id: 'alv', side: 'pub', categoria: 'desempleo', toggle: true, v: 0.14048,
      name: { es: 'Parados inscritos (seguro de desempleo)', en: 'Registered unemployed (unemployment insurance)', pt: 'Desempregados inscritos (seguro de desemprego)' },
      src: { es: 'SECO, septiembre 2026', en: 'SECO, September 2026', pt: 'SECO, setembro 2026' },
    },
    {
      id: 'sozh', side: 'pub', categoria: 'rentaMinima', toggle: true, v: 0.255804,
      name: { es: 'Ayuda social (Sozialhilfe)', en: 'Social assistance (Sozialhilfe)', pt: 'Assistência social (Sozialhilfe)' },
      src: { es: 'BFS, 2024 (personas)', en: 'BFS, 2024 (people)', pt: 'BFS, 2024 (pessoas)' },
    },
    {
      id: 'apriv', side: 'priv', categoria: 'asalPriv', toggle: false, v: +(OCUPADOS - AUT - APUB).toFixed(6),
      name: { es: 'Asalariados del sector privado', en: 'Private sector employees', pt: 'Trabalhadores por conta de outrem do setor privado' },
      src: { es: 'SAKE 2024: 4,19 M − 0,63 M', en: 'SAKE 2024: 4.19 M − 0.63 M', pt: 'SAKE 2024: 4,19 M − 0,63 M' },
    },
    {
      id: 'aut', side: 'priv', categoria: 'autonomos', toggle: true, v: AUT,
      name: { es: 'Autónomos y empresarios', en: 'Self-employed and employers', pt: 'Trabalhadores por conta própria' },
      src: { es: 'BFS, SAKE 2024 (14,1 %)', en: 'BFS, SAKE 2024 (14.1%)', pt: 'BFS, SAKE 2024 (14,1 %)' },
    },
  ],
  toggles: [
    {
      grupo: 'aut',
      titulo: { es: 'Contar autónomos y empresarios', en: 'Count self-employed and employers', pt: 'Contar trabalhadores por conta própria' },
      detalle: { es: '0,69 M. Son ingreso privado, aunque no sean asalariados.', en: '0.69 M. Their income is private, even though they are not employees.', pt: '0,69 M. São rendimento privado, embora não sejam trabalhadores por conta de outrem.' },
    },
    {
      grupo: 'ahv',
      titulo: { es: 'Contar pensiones AHV/AVS', en: 'Count AHV/AVS pensions', pt: 'Contar pensões AHV/AVS' },
      detalle: {
        es: 'La pensión pública básica. Un tercio se paga a personas que viven fuera de Suiza: ¿las cuento?',
        en: 'The basic state pension. A third is paid to people living outside Switzerland: count them?',
        pt: 'A pensão pública básica. Um terço é pago a pessoas que vivem fora da Suíça: conto-as?',
      },
    },
    {
      grupo: 'iv',
      titulo: { es: 'Contar pensiones de invalidez IV/AI', en: 'Count IV/AI disability pensions', pt: 'Contar pensões de invalidez IV/AI' },
      detalle: { es: '0,23 M en Suiza y 0,03 M en el extranjero.', en: '0.23 M in Switzerland and 0.03 M abroad.', pt: '0,23 M na Suíça e 0,03 M no estrangeiro.' },
    },
    {
      grupo: 'alv',
      titulo: { es: 'Contar parados inscritos', en: 'Count registered unemployed', pt: 'Contar desempregados inscritos' },
      detalle: {
        es: '0,14 M. Se usa como aproximación a quienes cobran el seguro de desempleo.',
        en: '0.14 M. Used as a proxy for people drawing unemployment insurance.',
        pt: '0,14 M. Usado como aproximação a quem recebe o seguro de desemprego.',
      },
    },
    {
      grupo: 'sozh',
      titulo: { es: 'Contar ayuda social', en: 'Count social assistance', pt: 'Contar assistência social' },
      detalle: { es: '0,26 M de personas, niños incluidos.', en: '0.26 M people, children included.', pt: '0,26 M de pessoas, crianças incluídas.' },
    },
  ],
  presets: {
    empleo: { apagados: ['aut', 'ahv', 'iv', 'alv', 'sozh'], over: 0 },
    pens: { apagados: ['alv', 'sozh'], over: 0 },
    base: { apagados: [], over: 0 },
    ajust: { apagados: [], over: 0.3 },
  },
  overMax: 1,
  escalaMax: 4,
  cabecera: {
    eyebrow: { es: 'Suiza · datos 2024–2026 · estimación propia', en: 'Switzerland · 2024–2026 data · own estimate', pt: 'Suíça · dados 2024–2026 · estimativa própria' },
    titulo: {
      es: '¿Cuánta gente vive de un ingreso público y cuánta de uno privado?',
      en: 'How many people live on a public income, and how many on a private one?',
      pt: 'Quantas pessoas vivem de um rendimento público e quantas de um privado?',
    },
    lede: {
      es: 'Un cálculo aproximado con los últimos datos oficiales de empleo, pensiones AHV e IV, desempleo y ayuda social de las personas que viven en Suiza. Cambia los supuestos y mira cómo se mueve el reparto.',
      en: 'A rough calculation with the latest official data on employment, AHV and IV pensions, unemployment and social assistance for people living in Switzerland. Change the assumptions and watch the split move.',
      pt: 'Um cálculo aproximado com os últimos dados oficiais de emprego, pensões AHV e IV, desemprego e assistência social das pessoas que vivem na Suíça. Muda os pressupostos e vê como se altera a repartição.',
    },
  },
  metodo: {
    es: 'Los asalariados privados salen de restar el empleo público (STATENT) a los asalariados residentes de la encuesta de población activa (SAKE). Las pensiones pagadas al extranjero se pueden añadir con el selector.',
    en: 'Private employees are the resident employees of the labour force survey (SAKE) minus public employment (STATENT). Pensions paid abroad can be added with the selector.',
    pt: 'Os trabalhadores privados resultam de subtrair o emprego público (STATENT) aos trabalhadores residentes do inquérito ao emprego (SAKE). As pensões pagas no estrangeiro podem ser acrescentadas com o seletor.',
  },
  fechaDatos: { es: 'SAKE y STATENT 2024; BSV dic. 2025; SECO sept. 2026', en: 'SAKE and STATENT 2024; BSV Dec 2025; SECO Sep 2026', pt: 'SAKE e STATENT 2024; BSV dez. 2025; SECO set. 2026' },
  advertencias: [
    {
      dir: { es: 'Infravalora lo privado', en: 'Understates private', pt: 'Subavalia o privado' },
      titulo: { es: 'El segundo pilar', en: 'The second pillar', pt: 'O segundo pilar' },
      texto: {
        es: 'Casi todos los jubilados cobran también una pensión de empleo (BVG/LPP) de cajas de pensiones, muchas privadas. Aquí cada jubilado cuenta una sola vez, en el lado público, por su pensión AHV.',
        en: 'Almost all retirees also receive an occupational pension (BVG/LPP) from pension funds, many of them private. Here each retiree counts once, on the public side, through their AHV pension.',
        pt: 'Quase todos os reformados recebem também uma pensão profissional (BVG/LPP) de fundos de pensões, muitos privados. Aqui cada reformado conta uma só vez, no lado público, pela pensão AHV.',
      },
    },
    {
      dir: { es: 'Infla lo público', en: 'Inflates public', pt: 'Inflaciona o público' },
      titulo: { es: 'Doble conteo', en: 'Double counting', pt: 'Dupla contagem' },
      texto: {
        es: 'Un jubilado que sigue trabajando, una pensión de invalidez parcial con empleo o un hogar con ayuda social donde alguien trabaja cuentan en los dos lados. El ajuste del deslizador es un supuesto, no un dato.',
        en: 'A retiree who keeps working, a partial disability pension combined with a job, or a social assistance household where someone works counts on both sides. The slider adjustment is an assumption, not data.',
        pt: 'Um reformado que continua a trabalhar, uma pensão de invalidez parcial com emprego ou um agregado com assistência social onde alguém trabalha contam nos dois lados. O ajuste do cursor é um pressuposto, não um dado.',
      },
    },
    {
      dir: { es: 'Infravalora lo público', en: 'Understates public', pt: 'Subavalia o público' },
      titulo: { es: 'Empresas públicas en el lado privado', en: 'State-owned companies on the private side', pt: 'Empresas públicas no lado privado' },
      texto: {
        es: 'Solo se cuenta el sector público no de mercado (0,63 M empleos). Las empresas públicas como SBB/CFF, La Poste o los bancos cantonales (0,26 M empleos más) quedan en el lado privado.',
        en: 'Only the non-market public sector is counted (0.63 M jobs). State-owned companies such as SBB/CFF, Swiss Post or the cantonal banks (another 0.26 M jobs) stay on the private side.',
        pt: 'Conta-se só o setor público não mercantil (0,63 M postos). Empresas públicas como a SBB/CFF, os Correios ou os bancos cantonais (mais 0,26 M postos) ficam no lado privado.',
      },
    },
    {
      dir: { es: 'Mezcla fechas', en: 'Mixes dates', pt: 'Mistura datas' },
      titulo: { es: 'Empleos, personas y años distintos', en: 'Jobs, people and different years', pt: 'Postos, pessoas e anos diferentes' },
      texto: {
        es: 'STATENT cuenta empleos, incluidos los de trabajadores fronterizos y los de quien tiene dos trabajos; SAKE cuenta residentes. Empleo de 2024, pensiones de diciembre 2025, paro de septiembre 2026.',
        en: 'STATENT counts jobs, including those held by cross-border commuters and people with two jobs; SAKE counts residents. Employment for 2024, pensions for December 2025, unemployment for September 2026.',
        pt: 'A STATENT conta postos de trabalho, incluindo os de trabalhadores transfronteiriços e de quem tem dois empregos; a SAKE conta residentes. Emprego de 2024, pensões de dezembro 2025, desemprego de setembro 2026.',
      },
    },
    {
      dir: { es: 'Infla lo público', en: 'Inflates public', pt: 'Inflaciona o público' },
      titulo: { es: 'Parados inscritos frente a perceptores', en: 'Registered unemployed versus recipients', pt: 'Desempregados inscritos versus beneficiários' },
      texto: {
        es: 'SECO no publica cada mes cuántas personas cobran el seguro de desempleo. Se usan los parados inscritos, y no todos cobran prestación.',
        en: 'SECO does not publish a monthly count of people drawing unemployment insurance. Registered unemployed are used instead, and not all of them receive benefits.',
        pt: 'A SECO não publica todos os meses quantas pessoas recebem o seguro de desemprego. Usam-se os desempregados inscritos, e nem todos recebem prestação.',
      },
    },
    {
      dir: { es: 'Fuera del cálculo', en: 'Left out', pt: 'Fora do cálculo' },
      titulo: { es: 'Prestaciones complementarias', en: 'Supplementary benefits', pt: 'Prestações complementares' },
      texto: {
        es: 'Las prestaciones complementarias (EL/PC) no se suman porque las cobran pensionistas AHV o IV ya contados. Tampoco se cuentan subsidios familiares, becas ni dependientes sin ingresos.',
        en: 'Supplementary benefits (EL/PC) are not added because their recipients are AHV or IV pensioners already counted. Family allowances, grants and dependants with no income are not counted either.',
        pt: 'As prestações complementares (EL/PC) não são somadas porque são recebidas por pensionistas AHV ou IV já contados. Também não se contam abonos de família, bolsas nem dependentes sem rendimentos.',
      },
    },
  ],
  fuentes: [
    { texto: 'BFS · SAKE in Kürze 2024 (Erwerbstätige und Selbstständigerwerbende)', url: 'https://dam-api.bfs.admin.ch/hub/api/dam/assets/36035149/master' },
    { texto: 'BFS · STATENT: Beschäftigte nach öffentlichem und privatem Sektor, 2024', url: 'https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-0602010000_108/px-x-0602010000_108/px-x-0602010000_108.px' },
    { texto: 'BSV · AHV-Statistik 2025', url: 'https://www.bsv.admin.ch/de/newnsb/We4R-YC-EDpB_oncT4S_y' },
    { texto: 'BSV · IV-Statistik 2025', url: 'https://www.bsv.admin.ch/de/newnsb/YUmE3WP0dIpGH934W2-SD' },
    { texto: 'SECO · Die Lage auf dem Arbeitsmarkt, September 2026', url: 'https://www.seco.admin.ch/de/newnsb/Cdju9-o8WGML' },
    { texto: 'BFS · Sozialhilfebeziehende 2024', url: 'https://www.bfs.admin.ch/bfs/de/home/statistiken/soziale-sicherheit/sozialhilfe.html' },
  ],
  pie: {
    es: 'Elaborado el 11 de octubre de 2026 con los últimos datos publicados. Cifras redondeadas; las sumas pueden no cuadrar exactamente.',
    en: 'Prepared on 11 October 2026 with the latest published data. Figures are rounded; totals may not add up exactly.',
    pt: 'Elaborado a 11 de outubro de 2026 com os últimos dados publicados. Valores arredondados; as somas podem não bater certo exatamente.',
  },
};
