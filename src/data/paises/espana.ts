// España. Cifras en millones de personas. Para actualizar los datos, edita este archivo.
import type { Pais } from './types';

export const espana: Pais = {
  slug: 'spain',
  nombre: { es: 'España', en: 'Spain', pt: 'Espanha' },
  grupos: [
    {
      id: 'apub', side: 'pub', categoria: 'empleoPub', toggle: false, v: 3.6469,
      name: { es: 'Asalariados del sector público', en: 'Public sector employees', pt: 'Trabalhadores do setor público' },
      src: { es: 'EPA 2T 2026 (INE)', en: 'EPA Q2 2026 (INE)', pt: 'EPA 2.º T 2026 (INE)' },
    },
    {
      id: 'pens', side: 'pub', categoria: 'pensiones', toggle: true, v: 9.5,
      name: { es: 'Pensionistas de la Seguridad Social', en: 'Social Security pensioners', pt: 'Pensionistas da Segurança Social' },
      src: { es: 'Seguridad Social, junio 2026', en: 'Social Security, June 2026', pt: 'Segurança Social, junho 2026' },
    },
    {
      id: 'clas', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.737,
      name: { es: 'Clases pasivas', en: 'Civil servants\' pensions (clases pasivas)', pt: 'Pensões dos funcionários (clases pasivas)' },
      src: { es: 'Prensa, 2026 (dato de pensiones)', en: 'Press, 2026 (number of pensions)', pt: 'Imprensa, 2026 (número de pensões)' },
    },
    {
      id: 'noc', side: 'pub', categoria: 'pensiones', toggle: true, v: 0.5,
      name: { es: 'Pensiones no contributivas', en: 'Non-contributory pensions', pt: 'Pensões não contributivas' },
      src: { es: 'Prensa, 2026 (aprox.)', en: 'Press, 2026 (approx.)', pt: 'Imprensa, 2026 (aprox.)' },
    },
    {
      id: 'paro', side: 'pub', categoria: 'desempleo', toggle: true, v: 1.686936,
      name: { es: 'Prestación o subsidio por desempleo', en: 'Unemployment benefit or allowance', pt: 'Prestação ou subsídio de desemprego' },
      src: { es: 'SEPE, mayo 2026', en: 'SEPE, May 2026', pt: 'SEPE, maio 2026' },
    },
    {
      id: 'imv', side: 'pub', categoria: 'rentaMinima', toggle: true, v: 0.860458,
      alt: {
        v: 2.627344,
        label: { es: 'Personas', en: 'People', pt: 'Pessoas' },
        baseLabel: { es: 'Hogares', en: 'Households', pt: 'Agregados' },
      },
      name: { es: 'Ingreso Mínimo Vital', en: 'Minimum Living Income (IMV)', pt: 'Rendimento Mínimo Vital (IMV)' },
      src: { es: 'INSS, junio 2026', en: 'INSS, June 2026', pt: 'INSS, junho 2026' },
    },
    {
      id: 'apriv', side: 'priv', categoria: 'asalPriv', toggle: false, v: 15.9385,
      name: { es: 'Asalariados del sector privado', en: 'Private sector employees', pt: 'Trabalhadores do setor privado' },
      src: { es: 'EPA 2T 2026: 19,59 M − 3,65 M', en: 'EPA Q2 2026: 19.59 M − 3.65 M', pt: 'EPA 2.º T 2026: 19,59 M − 3,65 M' },
    },
    {
      id: 'aut', side: 'priv', categoria: 'autonomos', toggle: true, v: 3.1936,
      name: { es: 'Autónomos y empresarios', en: 'Self-employed and employers', pt: 'Trabalhadores independentes e empresários' },
      src: { es: 'EPA 2T 2026 (no asalariados)', en: 'EPA Q2 2026 (non-employees)', pt: 'EPA 2.º T 2026 (não assalariados)' },
    },
  ],
  toggles: [
    {
      grupo: 'aut',
      titulo: { es: 'Contar autónomos y empresarios', en: 'Count self-employed and employers', pt: 'Contar trabalhadores independentes e empresários' },
      detalle: { es: '3,19 M. Son ingreso privado, aunque no sean asalariados.', en: '3.19 M. Their income is private, even though they are not employees.', pt: '3,19 M. São rendimento privado, embora não sejam assalariados.' },
    },
    {
      grupo: 'pens',
      titulo: { es: 'Contar pensionistas de la Seguridad Social', en: 'Count Social Security pensioners', pt: 'Contar pensionistas da Segurança Social' },
      detalle: { es: '~9,5 M de personas que cobran 10,5 M de pensiones.', en: '~9.5 M people who receive 10.5 M pensions.', pt: '~9,5 M de pessoas que recebem 10,5 M de pensões.' },
    },
    {
      grupo: 'clas',
      titulo: { es: 'Contar clases pasivas', en: 'Count civil servants\' pensions (clases pasivas)', pt: 'Contar pensões dos funcionários (clases pasivas)' },
      detalle: { es: '~0,74 M. Pensiones de funcionarios del régimen antiguo del Estado.', en: '~0.74 M. Pensions of civil servants under the old State scheme.', pt: '~0,74 M. Pensões de funcionários do antigo regime do Estado.' },
    },
    {
      grupo: 'noc',
      titulo: { es: 'Contar pensiones no contributivas', en: 'Count non-contributory pensions', pt: 'Contar pensões não contributivas' },
      detalle: { es: '~0,5 M. Para quien no cotizó lo suficiente.', en: '~0.5 M. For people who did not contribute enough.', pt: '~0,5 M. Para quem não descontou o suficiente.' },
    },
    {
      grupo: 'paro',
      titulo: { es: 'Contar prestaciones por desempleo', en: 'Count unemployment benefits', pt: 'Contar prestações de desemprego' },
      detalle: { es: '1,69 M beneficiarios de paro o subsidio.', en: '1.69 M recipients of unemployment benefit or allowance.', pt: '1,69 M beneficiários de subsídio de desemprego.' },
    },
    {
      grupo: 'imv',
      titulo: { es: 'Contar Ingreso Mínimo Vital', en: 'Count the Minimum Living Income (IMV)', pt: 'Contar o Rendimento Mínimo Vital (IMV)' },
      detalle: { es: '¿Cuento un perceptor por hogar o a todas las personas del hogar?', en: 'Count one recipient per household, or everyone in the household?', pt: 'Conto um beneficiário por agregado ou todas as pessoas do agregado?' },
    },
  ],
  presets: {
    empleo: { apagados: ['aut', 'pens', 'clas', 'noc', 'paro', 'imv'], over: 0 },
    pens: { apagados: ['paro', 'imv'], over: 0 },
    base: { apagados: [], over: 0 },
    ajust: { apagados: [], over: 0.9 },
  },
  overMax: 1.5,
  escalaMax: 16,
  cabecera: {
    eyebrow: { es: 'España · datos 2026 · estimación propia', en: 'Spain · 2026 data · own estimate', pt: 'Espanha · dados 2026 · estimativa própria' },
    titulo: {
      es: '¿Cuánta gente vive de un ingreso público y cuánta de uno privado?',
      en: 'How many people live on a public income, and how many on a private one?',
      pt: 'Quantas pessoas vivem de um rendimento público e quantas de um privado?',
    },
    lede: {
      es: 'Un cálculo aproximado con los últimos datos oficiales de empleo, pensiones, paro e Ingreso Mínimo Vital. Cambia los supuestos y mira cómo se mueve el reparto.',
      en: 'A rough calculation with the latest official data on employment, pensions, unemployment and the Minimum Living Income. Change the assumptions and watch the split move.',
      pt: 'Um cálculo aproximado com os últimos dados oficiais de emprego, pensões, desemprego e Rendimento Mínimo Vital. Muda os pressupostos e vê como se altera a repartição.',
    },
  },
  metodo: {
    es: 'Los asalariados privados no se publican directamente: salen de restar los públicos al total de asalariados de la EPA.',
    en: 'Private employees are not published directly: they are the EPA total of employees minus public employees.',
    pt: 'Os trabalhadores privados não são publicados diretamente: resultam de subtrair os públicos ao total de assalariados da EPA.',
  },
  fechaDatos: { es: 'EPA 2T 2026; mayo–junio 2026', en: 'EPA Q2 2026; May–June 2026', pt: 'EPA 2.º T 2026; maio–junho 2026' },
  advertencias: [
    {
      dir: { es: 'Infla lo público', en: 'Inflates public', pt: 'Inflaciona o público' },
      titulo: { es: 'Doble conteo', en: 'Double counting', pt: 'Dupla contagem' },
      texto: {
        es: 'Un pensionista que sigue trabajando, o un hogar con IMV donde alguien tiene empleo, cuenta en los dos lados. El ajuste del deslizador es un supuesto, no un dato.',
        en: 'A pensioner who keeps working, or an IMV household where someone has a job, counts on both sides. The slider adjustment is an assumption, not data.',
        pt: 'Um pensionista que continua a trabalhar, ou um agregado com IMV onde alguém tem emprego, conta nos dois lados. O ajuste do cursor é um pressuposto, não um dado.',
      },
    },
    {
      dir: { es: 'Infla lo público', en: 'Inflates public', pt: 'Inflaciona o público' },
      titulo: { es: 'Pensiones frente a personas', en: 'Pensions versus people', pt: 'Pensões versus pessoas' },
      texto: {
        es: 'La cifra de clases pasivas es de pensiones, no de personas, y alguien puede cobrar de clases pasivas y de la Seguridad Social a la vez.',
        en: 'The clases pasivas figure counts pensions, not people, and someone can draw from both clases pasivas and Social Security at once.',
        pt: 'O número das clases pasivas é de pensões, não de pessoas, e alguém pode receber das clases pasivas e da Segurança Social ao mesmo tempo.',
      },
    },
    {
      dir: { es: 'Mezcla fechas', en: 'Mixes dates', pt: 'Mistura datas' },
      titulo: { es: 'Datos de meses distintos', en: 'Data from different months', pt: 'Dados de meses diferentes' },
      texto: {
        es: 'EPA del 2.º trimestre, pensiones de junio, paro de mayo e IMV de junio. Son fotos cercanas, pero no simultáneas, y vienen de encuestas y registros diferentes.',
        en: 'EPA for Q2, pensions for June, unemployment for May and IMV for June. They are close snapshots, but not simultaneous, and come from different surveys and registers.',
        pt: 'EPA do 2.º trimestre, pensões de junho, desemprego de maio e IMV de junho. São fotografias próximas, mas não simultâneas, e vêm de inquéritos e registos diferentes.',
      },
    },
    {
      dir: { es: 'Infravalora lo público', en: 'Understates public', pt: 'Subavalia o público' },
      titulo: { es: 'Empleo privado pagado con dinero público', en: 'Private jobs paid with public money', pt: 'Emprego privado pago com dinheiro público' },
      texto: {
        es: 'Sanidad y educación concertadas, obra pública o consultoría para la Administración son empleo privado que depende de contratos públicos.',
        en: 'Publicly funded private healthcare and schools, public works or consulting for the government are private jobs that depend on public contracts.',
        pt: 'Saúde e educação convencionadas, obras públicas ou consultoria para a Administração são emprego privado que depende de contratos públicos.',
      },
    },
    {
      dir: { es: 'Infravalora lo privado', en: 'Understates private', pt: 'Subavalia o privado' },
      titulo: { es: 'Quién financia las pensiones', en: 'Who funds the pensions', pt: 'Quem financia as pensões' },
      texto: {
        es: 'Las pensiones se pagan sobre todo con cotizaciones del empleo privado, así que "público" aquí indica quién paga el ingreso, no de dónde sale el dinero.',
        en: 'Pensions are paid mostly with contributions from private employment, so "public" here means who pays the income, not where the money comes from.',
        pt: 'As pensões são pagas sobretudo com contribuições do emprego privado, por isso "público" aqui indica quem paga o rendimento, não de onde vem o dinheiro.',
      },
    },
    {
      dir: { es: 'Fuera del cálculo', en: 'Left out', pt: 'Fora do cálculo' },
      titulo: { es: 'Familiares y otras ayudas', en: 'Dependants and other benefits', pt: 'Familiares e outros apoios' },
      texto: {
        es: 'No se cuentan los dependientes sin ingresos de ningún grupo, ni rentas mínimas autonómicas, becas o ayudas a la dependencia.',
        en: 'Dependants with no income of their own are not counted in any group, nor are regional minimum incomes, grants or long-term care benefits.',
        pt: 'Não se contam os dependentes sem rendimentos de nenhum grupo, nem rendimentos mínimos regionais, bolsas ou apoios à dependência.',
      },
    },
  ],
  fuentes: [
    { texto: 'INE · Encuesta de Población Activa, 2.º trimestre 2026', url: 'https://www.ine.es/dyngs/Prensa/EPA2T26.pdf' },
    { texto: 'esdiario · Asalariados y no asalariados, EPA 2T 2026', url: 'https://www.esdiario.com/economia/260728/194255/mercado-laboral-bate-record-ocupacion-subempleo-sigue-alza-indefinidos.html' },
    { texto: 'Europa Press · Nómina de pensiones de junio 2026', url: 'https://www.bolsamania.com/noticias_print/economia/economia--amp-la-seguridad-social-destina-en-junio-28432-millones-a-la-paga-ordinaria-y-la-extra-de-las-pensiones--22844972.html' },
    { texto: 'Vozpópuli · Clases pasivas y no contributivas', url: 'https://www.vozpopuli.com/economia/macroeconomia/la-factura-de-las-pensiones-supera-la-barrera-de-los-16000-millones-al-mes-con-la-ultima-subida.html' },
    { texto: 'Roams · Beneficiarios de prestación por desempleo (SEPE, mayo 2026)', url: 'https://roams.es/actualidad/finanzas/cuando-se-cobra-paro-agosto-2026-caixabank-santander-bbva-bancos/' },
    { texto: 'La Moncloa · Ingreso Mínimo Vital, junio 2026', url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2026/070726-ingreso-minimo-vital-junio.aspx' },
  ],
  pie: {
    es: 'Elaborado el 10 de octubre de 2026 con los últimos datos publicados. Cifras redondeadas; las sumas pueden no cuadrar exactamente.',
    en: 'Prepared on 10 October 2026 with the latest published data. Figures are rounded; totals may not add up exactly.',
    pt: 'Elaborado a 10 de outubro de 2026 com os últimos dados publicados. Valores arredondados; as somas podem não bater certo exatamente.',
  },
};
