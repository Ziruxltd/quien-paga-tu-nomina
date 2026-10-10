// Portugal. Cifras en millones de personas. Para actualizar los datos, edita este archivo.
import type { Pais } from './types';

// INE, Inquérito ao Emprego 2.º T 2026 (milhares): TCO 4 571,9; conta própria 804,5 (isolados 538,9 + empregadores 265,6).
// DGAEP, SIEP 2.º T 2026: 768 378 postos de trabalho nas administrações públicas a 30-06-2026.
const TCO = 4.5719;
const APUB = 0.768378;

export const portugal: Pais = {
  slug: 'portugal',
  nombre: { es: 'Portugal', en: 'Portugal', pt: 'Portugal' },
  grupos: [
    {
      id: 'apub', side: 'pub', categoria: 'empleoPub', toggle: false, v: APUB,
      name: { es: 'Trabajadores de las administraciones públicas', en: 'Public administration employees', pt: 'Trabalhadores das administrações públicas' },
      src: { es: 'DGAEP, SIEP 2T 2026 (puestos)', en: 'DGAEP, SIEP Q2 2026 (jobs)', pt: 'DGAEP, SIEP 2.º T 2026 (postos)' },
    },
    {
      id: 'pens', side: 'pub', categoria: 'pensiones', toggle: true, v: 2.880677,
      name: { es: 'Pensiones de la Segurança Social', en: 'Segurança Social pensions', pt: 'Pensões da Segurança Social' },
      src: { es: 'GEP/MTSSS, julio 2026 (pensiones)', en: 'GEP/MTSSS, July 2026 (pensions)', pt: 'GEP/MTSSS, julho 2026 (pensões)' },
    },
    {
      id: 'cga', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.669351,
      name: { es: 'Pensiones de la Caixa Geral de Aposentações', en: 'Caixa Geral de Aposentações pensions', pt: 'Pensões da Caixa Geral de Aposentações' },
      src: { es: 'PORDATA, 2025 (pensiones)', en: 'PORDATA, 2025 (pensions)', pt: 'PORDATA, 2025 (pensões)' },
    },
    {
      id: 'paro', side: 'pub', categoria: 'desempleo', toggle: true, v: 0.169543,
      name: { es: 'Prestaciones por desempleo', en: 'Unemployment benefits', pt: 'Prestações de desemprego' },
      src: { es: 'GEP/MTSSS, julio 2026', en: 'GEP/MTSSS, July 2026', pt: 'GEP/MTSSS, julho 2026' },
    },
    {
      id: 'rsi', side: 'pub', categoria: 'rentaMinima', toggle: true, v: 0.074679,
      alt: {
        v: 0.153588,
        label: { es: 'Personas', en: 'People', pt: 'Pessoas' },
        baseLabel: { es: 'Familias', en: 'Families', pt: 'Famílias' },
      },
      name: { es: 'Rendimento Social de Inserção', en: 'Social Integration Income (RSI)', pt: 'Rendimento Social de Inserção' },
      src: { es: 'GEP/MTSSS, julio 2026', en: 'GEP/MTSSS, July 2026', pt: 'GEP/MTSSS, julho 2026' },
    },
    {
      id: 'apriv', side: 'priv', categoria: 'asalPriv', toggle: false, v: +(TCO - APUB).toFixed(6),
      name: { es: 'Asalariados del sector privado', en: 'Private sector employees', pt: 'Trabalhadores por conta de outrem do setor privado' },
      src: { es: 'INE 2T 2026: 4,57 M − 0,77 M', en: 'INE Q2 2026: 4.57 M − 0.77 M', pt: 'INE 2.º T 2026: 4,57 M − 0,77 M' },
    },
    {
      id: 'aut', side: 'priv', categoria: 'autonomos', toggle: true, v: 0.8045,
      name: { es: 'Autónomos y empresarios', en: 'Self-employed and employers', pt: 'Trabalhadores por conta própria' },
      src: { es: 'INE, Inquérito ao Emprego 2T 2026', en: 'INE, Labour Force Survey Q2 2026', pt: 'INE, Inquérito ao Emprego 2.º T 2026' },
    },
  ],
  toggles: [
    {
      grupo: 'aut',
      titulo: { es: 'Contar autónomos y empresarios', en: 'Count self-employed and employers', pt: 'Contar trabalhadores por conta própria' },
      detalle: { es: '0,80 M. Son ingreso privado, aunque no sean asalariados.', en: '0.80 M. Their income is private, even though they are not employees.', pt: '0,80 M. São rendimento privado, embora não sejam trabalhadores por conta de outrem.' },
    },
    {
      grupo: 'pens',
      titulo: { es: 'Contar pensiones de la Segurança Social', en: 'Count Segurança Social pensions', pt: 'Contar pensões da Segurança Social' },
      detalle: {
        es: '2,88 M de pensiones de vejez, invalidez y supervivencia. Son pensiones, no personas: hay quien cobra dos.',
        en: '2.88 M old-age, disability and survivors\' pensions. These are pensions, not people: some people receive two.',
        pt: '2,88 M de pensões de velhice, invalidez e sobrevivência. São pensões, não pessoas: há quem receba duas.',
      },
    },
    {
      grupo: 'cga',
      titulo: { es: 'Contar pensiones de la CGA', en: 'Count CGA pensions', pt: 'Contar pensões da CGA' },
      detalle: { es: '0,67 M. Pensiones de los funcionarios del régimen antiguo del Estado.', en: '0.67 M. Pensions of civil servants under the old State scheme.', pt: '0,67 M. Pensões dos funcionários públicos do regime convergente.' },
    },
    {
      grupo: 'paro',
      titulo: { es: 'Contar prestaciones por desempleo', en: 'Count unemployment benefits', pt: 'Contar prestações de desemprego' },
      detalle: { es: '0,17 M beneficiarios de subsidio de desempleo o subsidio social.', en: '0.17 M recipients of unemployment benefit or social unemployment allowance.', pt: '0,17 M beneficiários de subsídio de desemprego ou subsídio social de desemprego.' },
    },
    {
      grupo: 'rsi',
      titulo: { es: 'Contar Rendimento Social de Inserção', en: 'Count the Social Integration Income (RSI)', pt: 'Contar o Rendimento Social de Inserção' },
      detalle: { es: '¿Cuento una familia como un perceptor o a todas las personas de la familia?', en: 'Count one recipient per family, or everyone in the family?', pt: 'Conto um beneficiário por família ou todas as pessoas da família?' },
    },
  ],
  presets: {
    empleo: { apagados: ['aut', 'pens', 'cga', 'paro', 'rsi'], over: 0 },
    pens: { apagados: ['paro', 'rsi'], over: 0 },
    base: { apagados: [], over: 0 },
    ajust: { apagados: [], over: 0.5 },
  },
  overMax: 1,
  escalaMax: 4,
  cabecera: {
    eyebrow: { es: 'Portugal · datos 2026 · estimación propia', en: 'Portugal · 2026 data · own estimate', pt: 'Portugal · dados 2026 · estimativa própria' },
    titulo: {
      es: '¿Cuánta gente vive de un ingreso público y cuánta de uno privado?',
      en: 'How many people live on a public income, and how many on a private one?',
      pt: 'Quantas pessoas vivem de um rendimento público e quantas de um privado?',
    },
    lede: {
      es: 'Un cálculo aproximado con los últimos datos oficiales de empleo, pensiones, desempleo y Rendimento Social de Inserção. Cambia los supuestos y mira cómo se mueve el reparto.',
      en: 'A rough calculation with the latest official data on employment, pensions, unemployment and the Social Integration Income. Change the assumptions and watch the split move.',
      pt: 'Um cálculo aproximado com os últimos dados oficiais de emprego, pensões, desemprego e Rendimento Social de Inserção. Muda os pressupostos e vê como se altera a repartição.',
    },
  },
  metodo: {
    es: 'Los asalariados privados salen de restar los puestos de trabajo de las administraciones públicas (DGAEP) al total de asalariados de la encuesta de empleo del INE.',
    en: 'Private employees are the INE Labour Force Survey total of employees minus public administration jobs (DGAEP).',
    pt: 'Os trabalhadores por conta de outrem privados resultam de subtrair os postos de trabalho das administrações públicas (DGAEP) ao total de trabalhadores por conta de outrem do Inquérito ao Emprego do INE.',
  },
  fechaDatos: { es: 'INE 2T 2026; julio 2026; CGA 2025', en: 'INE Q2 2026; July 2026; CGA 2025', pt: 'INE 2.º T 2026; julho 2026; CGA 2025' },
  advertencias: [
    {
      dir: { es: 'Infla lo público', en: 'Inflates public', pt: 'Inflaciona o público' },
      titulo: { es: 'Pensiones frente a personas', en: 'Pensions versus people', pt: 'Pensões versus pessoas' },
      texto: {
        es: 'Las cifras de la Segurança Social y de la CGA cuentan pensiones, no personas. Muchas viudas y viudos cobran una pensión propia y otra de supervivencia, y hay quien cobra de la CGA y de la Segurança Social a la vez.',
        en: 'The Segurança Social and CGA figures count pensions, not people. Many widows and widowers receive their own pension plus a survivor\'s pension, and some people draw from both the CGA and Segurança Social.',
        pt: 'Os números da Segurança Social e da CGA contam pensões, não pessoas. Muitos viúvos e viúvas recebem uma pensão própria e outra de sobrevivência, e há quem receba da CGA e da Segurança Social ao mesmo tempo.',
      },
    },
    {
      dir: { es: 'Infla lo público', en: 'Inflates public', pt: 'Inflaciona o público' },
      titulo: { es: 'Doble conteo', en: 'Double counting', pt: 'Dupla contagem' },
      texto: {
        es: 'Un pensionista que sigue trabajando, o una familia con RSI donde alguien tiene empleo, cuenta en los dos lados. El ajuste del deslizador es un supuesto, no un dato.',
        en: 'A pensioner who keeps working, or an RSI family where someone has a job, counts on both sides. The slider adjustment is an assumption, not data.',
        pt: 'Um pensionista que continua a trabalhar, ou uma família com RSI onde alguém tem emprego, conta nos dois lados. O ajuste do cursor é um pressuposto, não um dado.',
      },
    },
    {
      dir: { es: 'Infravalora lo público', en: 'Understates public', pt: 'Subavalia o público' },
      titulo: { es: 'Empresas públicas en el lado privado', en: 'State-owned companies on the private side', pt: 'Empresas públicas no lado privado' },
      texto: {
        es: 'La DGAEP cuenta solo las administraciones públicas. Los trabajadores de empresas públicas y de servicios concesionados o convencionados quedan en el lado privado.',
        en: 'DGAEP only counts public administrations. Employees of state-owned companies and of contracted-out public services end up on the private side.',
        pt: 'A DGAEP conta só as administrações públicas. Os trabalhadores do setor empresarial do Estado e de serviços concessionados ou convencionados ficam no lado privado.',
      },
    },
    {
      dir: { es: 'Mezcla fechas', en: 'Mixes dates', pt: 'Mistura datas' },
      titulo: { es: 'Encuestas, registros y años distintos', en: 'Different surveys, registers and years', pt: 'Inquéritos, registos e anos diferentes' },
      texto: {
        es: 'Asalariados de la encuesta del INE (2.º trimestre 2026), puestos públicos de un registro (junio 2026), prestaciones de julio 2026 y pensiones de la CGA de 2025. Restar un registro a una encuesta da solo una aproximación.',
        en: 'Employees from the INE survey (Q2 2026), public jobs from a register (June 2026), benefits for July 2026 and CGA pensions for 2025. Subtracting a register from a survey only gives an approximation.',
        pt: 'Trabalhadores do inquérito do INE (2.º trimestre 2026), postos públicos de um registo (junho 2026), prestações de julho 2026 e pensões da CGA de 2025. Subtrair um registo a um inquérito dá apenas uma aproximação.',
      },
    },
    {
      dir: { es: 'Infravalora lo privado', en: 'Understates private', pt: 'Subavalia o privado' },
      titulo: { es: 'Quién financia las pensiones', en: 'Who funds the pensions', pt: 'Quem financia as pensões' },
      texto: {
        es: 'Las pensiones de la Segurança Social se pagan sobre todo con cotizaciones del empleo privado, así que "público" aquí indica quién paga el ingreso, no de dónde sale el dinero.',
        en: 'Segurança Social pensions are paid mostly with contributions from private employment, so "public" here means who pays the income, not where the money comes from.',
        pt: 'As pensões da Segurança Social são pagas sobretudo com contribuições do emprego privado, por isso "público" aqui indica quem paga o rendimento, não de onde vem o dinheiro.',
      },
    },
    {
      dir: { es: 'Fuera del cálculo', en: 'Left out', pt: 'Fora do cálculo' },
      titulo: { es: 'Complementos y otras ayudas', en: 'Supplements and other benefits', pt: 'Complementos e outros apoios' },
      texto: {
        es: 'El Complemento Solidário para Idosos (0,25 M) no se suma porque lo cobran pensionistas ya contados. Tampoco se cuentan la Prestação Social para a Inclusão, el abono de família ni los dependientes sin ingresos.',
        en: 'The Solidarity Supplement for the Elderly (0.25 M) is not added because its recipients are pensioners already counted. The Social Inclusion Benefit, child benefit and dependants with no income are not counted either.',
        pt: 'O Complemento Solidário para Idosos (0,25 M) não é somado porque é recebido por pensionistas já contados. Também não se contam a Prestação Social para a Inclusão, o abono de família nem os dependentes sem rendimentos.',
      },
    },
  ],
  fuentes: [
    { texto: 'INE · Estatísticas do Emprego, 2.º trimestre de 2026', url: 'https://www.ine.pt/xportal/xmain?xpid=INE&xpgid=ine_destaques&DESTAQUESdest_boui=770287980&DESTAQUESmodo=2&xlang=pt' },
    { texto: 'DGAEP · Síntese Estatística do Emprego Público, 2.º trimestre de 2026', url: 'https://www.dgaep.gov.pt/index.cfm?OBJID=ECA5D4CB-42B8-4692-A96C-8AAD63010A54' },
    { texto: 'GEP/MTSSS · Síntese de informação estatística da Segurança Social, julho de 2026', url: 'https://www.dgcp.mtsss.gov.pt/documents/10182/37639/siess202607.pdf/dbcb2bc5-2d4c-4912-b424-1d4627dde4a5' },
    { texto: 'PORDATA · Pensões: total, da Segurança Social e da Caixa Geral de Aposentações', url: 'https://www.pordata.pt/Portugal/Pens%C3%B5es+total++da+Seguran%C3%A7a+Social+e+da+Caixa+Geral+de+Aposenta%C3%A7%C3%B5es-851' },
  ],
  pie: {
    es: 'Elaborado el 10 de octubre de 2026 con los últimos datos publicados. Cifras redondeadas; las sumas pueden no cuadrar exactamente.',
    en: 'Prepared on 10 October 2026 with the latest published data. Figures are rounded; totals may not add up exactly.',
    pt: 'Elaborado a 10 de outubro de 2026 com os últimos dados publicados. Valores arredondados; as somas podem não bater certo exatamente.',
  },
};
