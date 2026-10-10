// Chile. Cifras en millones de personas. Para actualizar los datos, edita este archivo.
// Las pensiones de las AFP se pagan con el ahorro individual de cada persona: van al lado privado.
// Las pensiones que paga el Estado (PGU, PBS de invalidez, sistema antiguo IPS, Capredena y Dipreca) van al lado público.
import type { Pais } from './types';

// INE, ENE junio–agosto 2026 (CISO-18): 9.273.745 ocupados.
const ASAL_PRIV = 5.253481;
const CONTRATISTAS = 0.755419;
const DOMESTICO_Y_FAMILIARES = 0.249768; // resto hasta el total
const CUENTA_PROPIA = 1.653696;
const EMPLEADORES = 0.297743;

export const chile: Pais = {
  slug: 'chile',
  nombre: { es: 'Chile', en: 'Chile', pt: 'Chile' },
  grupos: [
    {
      id: 'apub', side: 'pub', categoria: 'empleoPub', toggle: false, v: 1.063638,
      name: { es: 'Asalariados del sector público', en: 'Public sector employees', pt: 'Trabalhadores do setor público' },
      src: { es: 'INE, ENE jun–ago 2026', en: 'INE, ENE Jun–Aug 2026', pt: 'INE, ENE jun–ago 2026' },
    },
    {
      id: 'pgu', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.61559,
      alt: {
        v: 2.295132,
        label: { es: 'Todas', en: 'All', pt: 'Todas' },
        baseLabel: { es: 'Sin pensión propia', en: 'No own pension', pt: 'Sem pensão própria' },
      },
      name: { es: 'Pensión Garantizada Universal (PGU)', en: 'Universal Guaranteed Pension (PGU)', pt: 'Pensão Garantida Universal (PGU)' },
      src: { es: 'Superintendencia de Pensiones, jul. 2026', en: 'Superintendencia de Pensiones, Jul 2026', pt: 'Superintendencia de Pensiones, jul. 2026' },
    },
    {
      id: 'pbsi', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.20518,
      name: { es: 'Pensión Básica Solidaria de Invalidez', en: 'Basic Solidarity Disability Pension', pt: 'Pensão Básica Solidária de Invalidez' },
      src: { es: 'Superintendencia de Pensiones, jul. 2026', en: 'Superintendencia de Pensiones, Jul 2026', pt: 'Superintendencia de Pensiones, jul. 2026' },
    },
    {
      id: 'saldo0', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.332588,
      name: { es: 'Pensiones AFP con el ahorro agotado (pagadas 100 % por el Estado)', en: 'AFP pensions with savings used up (paid 100% by the State)', pt: 'Pensões AFP com a poupança esgotada (pagas 100 % pelo Estado)' },
      src: { es: 'Superintendencia de Pensiones, jul. 2026', en: 'Superintendencia de Pensiones, Jul 2026', pt: 'Superintendencia de Pensiones, jul. 2026' },
    },
    {
      id: 'ips', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.466781,
      name: { es: 'Pensiones del sistema antiguo (IPS)', en: 'Old pension system (IPS)', pt: 'Pensões do sistema antigo (IPS)' },
      src: { es: 'Superintendencia de Pensiones, jul. 2026', en: 'Superintendencia de Pensiones, Jul 2026', pt: 'Superintendencia de Pensiones, jul. 2026' },
    },
    {
      id: 'ffaa', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.178062,
      name: { es: 'Pensiones de Fuerzas Armadas y de Orden (Capredena y Dipreca)', en: 'Armed forces and police pensions (Capredena and Dipreca)', pt: 'Pensões das Forças Armadas e de Segurança (Capredena e Dipreca)' },
      src: { es: 'Dipres, Presupuesto 2025 (cobertura esperada)', en: 'Dipres, 2025 Budget (expected coverage)', pt: 'Dipres, Orçamento 2025 (cobertura prevista)' },
    },
    {
      id: 'apriv', side: 'priv', categoria: 'asalPriv', toggle: false, v: +(ASAL_PRIV + CONTRATISTAS + DOMESTICO_Y_FAMILIARES).toFixed(6),
      name: { es: 'Asalariados privados, contratistas dependientes y servicio doméstico', en: 'Private employees, dependent contractors and domestic workers', pt: 'Trabalhadores privados, contratados dependentes e serviço doméstico' },
      src: { es: 'INE, ENE jun–ago 2026', en: 'INE, ENE Jun–Aug 2026', pt: 'INE, ENE jun–ago 2026' },
    },
    {
      id: 'aut', side: 'priv', categoria: 'autonomos', toggle: true, v: +(CUENTA_PROPIA + EMPLEADORES).toFixed(6),
      name: { es: 'Trabajadores por cuenta propia y empleadores', en: 'Self-employed and employers', pt: 'Trabalhadores por conta própria e empregadores' },
      src: { es: 'INE, ENE jun–ago 2026', en: 'INE, ENE Jun–Aug 2026', pt: 'INE, ENE jun–ago 2026' },
    },
    {
      id: 'afp', side: 'priv', categoria: 'pensionesPriv', toggle: true, v: 2.04219,
      name: { es: 'Pensiones de las AFP (ahorro individual)', en: 'AFP pensions (individual savings)', pt: 'Pensões das AFP (poupança individual)' },
      src: { es: 'Superintendencia de Pensiones, jul. 2026', en: 'Superintendencia de Pensiones, Jul 2026', pt: 'Superintendencia de Pensiones, jul. 2026' },
    },
  ],
  toggles: [
    {
      grupo: 'aut',
      titulo: { es: 'Contar trabajadores por cuenta propia y empleadores', en: 'Count self-employed and employers', pt: 'Contar trabalhadores por conta própria e empregadores' },
      detalle: { es: '1,95 M. Son ingreso privado, aunque no sean asalariados.', en: '1.95 M. Their income is private, even though they are not employees.', pt: '1,95 M. São rendimento privado, embora não sejam assalariados.' },
    },
    {
      grupo: 'afp',
      titulo: { es: 'Contar pensionados de las AFP', en: 'Count AFP pensioners', pt: 'Contar pensionistas das AFP' },
      detalle: {
        es: '2,04 M de pensiones. Se pagan con el ahorro de cada persona, así que cuentan como ingreso privado.',
        en: '2.04 M pensions. They are paid from each person\'s own savings, so they count as private income.',
        pt: '2,04 M de pensões. São pagas com a poupança de cada pessoa, por isso contam como rendimento privado.',
      },
    },
    {
      grupo: 'pgu',
      titulo: { es: 'Contar la Pensión Garantizada Universal', en: 'Count the Universal Guaranteed Pension', pt: 'Contar a Pensão Garantida Universal' },
      detalle: {
        es: '¿Cuento solo a quien vive de la PGU sin pensión propia (0,62 M) o a todos los que la cobran (2,30 M), aunque también tengan pensión AFP?',
        en: 'Count only people living on the PGU with no pension of their own (0.62 M), or everyone who receives it (2.30 M), even if they also have an AFP pension?',
        pt: 'Conto só quem vive da PGU sem pensão própria (0,62 M) ou todos os que a recebem (2,30 M), mesmo que também tenham pensão AFP?',
      },
    },
    {
      grupo: 'pbsi',
      titulo: { es: 'Contar la Pensión Básica Solidaria de Invalidez', en: 'Count the Basic Solidarity Disability Pension', pt: 'Contar a Pensão Básica Solidária de Invalidez' },
      detalle: { es: '0,21 M. Para personas con invalidez sin pensión propia.', en: '0.21 M. For disabled people with no pension of their own.', pt: '0,21 M. Para pessoas com invalidez sem pensão própria.' },
    },
    {
      grupo: 'saldo0',
      titulo: { es: 'Contar pensiones AFP con el ahorro agotado', en: 'Count AFP pensions with savings used up', pt: 'Contar pensões AFP com a poupança esgotada' },
      detalle: { es: '0,33 M. Su cuenta AFP se acabó y ahora el Estado paga toda la pensión.', en: '0.33 M. Their AFP account ran out and the State now pays the whole pension.', pt: '0,33 M. A conta AFP acabou e agora o Estado paga a pensão toda.' },
    },
    {
      grupo: 'ips',
      titulo: { es: 'Contar pensiones del sistema antiguo (IPS)', en: 'Count old pension system (IPS) pensions', pt: 'Contar pensões do sistema antigo (IPS)' },
      detalle: { es: '0,47 M. Régimen de reparto anterior a las AFP, hoy pagado por el Estado.', en: '0.47 M. The pay-as-you-go scheme that predates the AFPs, now paid by the State.', pt: '0,47 M. Regime de repartição anterior às AFP, hoje pago pelo Estado.' },
    },
    {
      grupo: 'ffaa',
      titulo: { es: 'Contar pensiones de Capredena y Dipreca', en: 'Count Capredena and Dipreca pensions', pt: 'Contar pensões da Capredena e da Dipreca' },
      detalle: { es: '~0,18 M. Retiros y montepíos de Fuerzas Armadas, Carabineros y PDI.', en: '~0.18 M. Retirement and survivors\' pensions of the armed forces, Carabineros and PDI.', pt: '~0,18 M. Reformas e pensões de sobrevivência das Forças Armadas, Carabineros e PDI.' },
    },
  ],
  presets: {
    empleo: { apagados: ['aut', 'afp', 'pgu', 'pbsi', 'saldo0', 'ips', 'ffaa'], over: 0 },
    pens: { apagados: [], over: 0 },
    base: { apagados: [], over: 0 },
    ajust: { apagados: [], over: 0.2 },
  },
  overMax: 1,
  escalaMax: 7,
  cabecera: {
    eyebrow: { es: 'Chile · datos 2026 · estimación propia', en: 'Chile · 2026 data · own estimate', pt: 'Chile · dados 2026 · estimativa própria' },
    titulo: {
      es: '¿Cuánta gente vive de un ingreso público y cuánta de uno privado?',
      en: 'How many people live on a public income, and how many on a private one?',
      pt: 'Quantas pessoas vivem de um rendimento público e quantas de um privado?',
    },
    lede: {
      es: 'Un cálculo aproximado con los últimos datos oficiales de empleo y pensiones. Las pensiones de las AFP salen del ahorro de cada persona y cuentan como ingreso privado; las que paga el Estado, como públicas.',
      en: 'A rough calculation with the latest official employment and pension data. AFP pensions come from each person\'s own savings and count as private income; those paid by the State count as public.',
      pt: 'Um cálculo aproximado com os últimos dados oficiais de emprego e pensões. As pensões das AFP saem da poupança de cada pessoa e contam como rendimento privado; as pagas pelo Estado, como públicas.',
    },
  },
  metodo: {
    es: 'En Chile, a diferencia de los otros países, las pensiones de las AFP se pagan con cuentas de ahorro individual gestionadas por empresas privadas, así que se suman al lado privado. Solo las pensiones que paga el Estado cuentan como públicas.',
    en: 'In Chile, unlike the other countries, AFP pensions are paid from individual savings accounts run by private companies, so they are added to the private side. Only pensions paid by the State count as public.',
    pt: 'No Chile, ao contrário dos outros países, as pensões das AFP são pagas com contas de poupança individual geridas por empresas privadas, por isso somam-se ao lado privado. Só as pensões pagas pelo Estado contam como públicas.',
  },
  fechaDatos: { es: 'ENE jun–ago 2026; pensiones jul. 2026', en: 'ENE Jun–Aug 2026; pensions Jul 2026', pt: 'ENE jun–ago 2026; pensões jul. 2026' },
  advertencias: [
    {
      dir: { es: 'Infravalora lo público', en: 'Understates public', pt: 'Subavalia o público' },
      titulo: { es: 'La PGU que complementa pensiones AFP', en: 'PGU topping up AFP pensions', pt: 'A PGU que complementa pensões AFP' },
      texto: {
        es: '1,68 M de pensionados AFP o IPS también cobran la PGU, que en promedio es la mitad de lo que reciben. Por defecto cuentan solo por su pensión principal; el selector de la PGU permite sumarlos también al lado público.',
        en: '1.68 M AFP or IPS pensioners also receive the PGU, which on average is half of what they get. By default they only count through their main pension; the PGU selector lets you add them to the public side too.',
        pt: '1,68 M de pensionistas AFP ou IPS também recebem a PGU, que em média é metade do que recebem. Por defeito contam só pela pensão principal; o seletor da PGU permite somá-los também ao lado público.',
      },
    },
    {
      dir: { es: 'Infla lo público', en: 'Inflates public', pt: 'Inflaciona o público' },
      titulo: { es: 'Doble conteo', en: 'Double counting', pt: 'Dupla contagem' },
      texto: {
        es: 'Un pensionado que sigue trabajando o quien cobra una pensión de sobrevivencia y la PGU puede contar dos veces. Las cifras de pensiones son de pensiones, no de personas. El ajuste del deslizador es un supuesto, no un dato.',
        en: 'A pensioner who keeps working, or someone receiving a survivor\'s pension plus the PGU, may count twice. Pension figures count pensions, not people. The slider adjustment is an assumption, not data.',
        pt: 'Um pensionista que continua a trabalhar, ou quem recebe uma pensão de sobrevivência e a PGU, pode contar duas vezes. Os números de pensões contam pensões, não pessoas. O ajuste do cursor é um pressuposto, não um dado.',
      },
    },
    {
      dir: { es: 'Fuera del cálculo', en: 'Left out', pt: 'Fora do cálculo' },
      titulo: { es: 'Seguro de cesantía', en: 'Unemployment insurance', pt: 'Seguro de desemprego' },
      texto: {
        es: 'El seguro de cesantía funciona con cuentas individuales y aportes de empleadores, administrados por la AFC. Con el mismo criterio que las AFP no se cuenta como ingreso público, y como no hay una cifra mensual de perceptores tampoco se suma al privado.',
        en: 'Unemployment insurance runs on individual accounts and employer contributions managed by the AFC. By the same logic as the AFPs it is not counted as public income, and since there is no monthly count of recipients it is not added to the private side either.',
        pt: 'O seguro de desemprego funciona com contas individuais e contribuições dos empregadores, geridas pela AFC. Com o mesmo critério das AFP não conta como rendimento público, e como não há um número mensal de beneficiários também não se soma ao privado.',
      },
    },
    {
      dir: { es: 'Fuera del cálculo', en: 'Left out', pt: 'Fora do cálculo' },
      titulo: { es: 'Sin renta mínima general', en: 'No general minimum income', pt: 'Sem rendimento mínimo geral' },
      texto: {
        es: 'Chile no tiene una renta mínima como el IMV o el RSI. Subsidios como el Subsidio Familiar o el Aporte Familiar Permanente complementan otros ingresos y no se cuentan.',
        en: 'Chile has no minimum income like the IMV or the RSI. Benefits such as the Family Allowance or the Permanent Family Contribution supplement other income and are not counted.',
        pt: 'O Chile não tem um rendimento mínimo como o IMV ou o RSI. Apoios como o Subsidio Familiar ou o Aporte Familiar Permanente complementam outros rendimentos e não se contam.',
      },
    },
    {
      dir: { es: 'Mezcla fechas', en: 'Mixes dates', pt: 'Mistura datas' },
      titulo: { es: 'Encuesta, registros y presupuesto', en: 'Survey, registers and budget', pt: 'Inquérito, registos e orçamento' },
      texto: {
        es: 'Empleo de la encuesta del INE (junio–agosto 2026), pensiones de registros de julio 2026 y Capredena y Dipreca según la cobertura prevista en el Presupuesto 2025, no un conteo real.',
        en: 'Employment from the INE survey (June–August 2026), pensions from July 2026 registers, and Capredena and Dipreca from the coverage forecast in the 2025 Budget, not an actual count.',
        pt: 'Emprego do inquérito do INE (junho–agosto 2026), pensões de registos de julho 2026 e Capredena e Dipreca segundo a cobertura prevista no Orçamento 2025, não uma contagem real.',
      },
    },
    {
      dir: { es: 'Infravalora lo público', en: 'Understates public', pt: 'Subavalia o público' },
      titulo: { es: 'Empleo privado pagado con dinero público', en: 'Private jobs paid with public money', pt: 'Emprego privado pago com dinheiro público' },
      texto: {
        es: 'Colegios particulares subvencionados, prestadores de salud en convenio, concesiones y honorarios para el Estado son empleo privado que depende de recursos públicos.',
        en: 'State-subsidised private schools, contracted healthcare providers, concessions and fee-based work for the State are private jobs that depend on public money.',
        pt: 'Escolas privadas subsidiadas, prestadores de saúde convencionados, concessões e trabalho por honorários para o Estado são emprego privado que depende de dinheiro público.',
      },
    },
  ],
  fuentes: [
    { texto: 'INE · Boletín Encuesta Nacional de Empleo N° 335, junio–agosto 2026', url: 'https://www.ine.gob.cl/docs/default-source/ocupacion-y-desocupacion/boletines/2026/nacional/ene-nacional-335.pdf' },
    { texto: 'Superintendencia de Pensiones · Ficha Estadística Previsional N° 166, septiembre 2026', url: 'https://www.spensiones.cl/portal/institucional/594/articles-17155_recurso_1.pdf' },
    { texto: 'Dipres · Proyecto de Ley de Presupuestos 2025 (Capredena y Dipreca)', url: 'https://www.dipres.gob.cl/597/articles-347131_doc_pdf.pdf' },
  ],
  pie: {
    es: 'Elaborado el 11 de octubre de 2026 con los últimos datos publicados. Cifras redondeadas; las sumas pueden no cuadrar exactamente.',
    en: 'Prepared on 11 October 2026 with the latest published data. Figures are rounded; totals may not add up exactly.',
    pt: 'Elaborado a 11 de outubro de 2026 com os últimos dados publicados. Valores arredondados; as somas podem não bater certo exatamente.',
  },
};
