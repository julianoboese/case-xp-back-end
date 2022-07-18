import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAssets() {
  await prisma.userAsset.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.asset.deleteMany({});

  await prisma.asset.createMany({
    data: [
      { ticker: 'RRRP3', name: '3 R Petroleum' },
      { ticker: 'TTEN3', name: '3tentos' },
      { ticker: 'EALT3', name: 'Aco Altona' },
      { ticker: 'EALT4', name: 'Aco Altona' },
      { ticker: 'ADHM3', name: 'Advanced Dh' },
      { ticker: 'AERI3', name: 'Aeris' },
      { ticker: 'AESB3', name: 'Aes Brasil' },
      { ticker: 'TIET11', name: 'Aes Tiete E' },
      { ticker: 'TIET3', name: 'Aes Tiete E' },
      { ticker: 'TIET4', name: 'Aes Tiete E' },
      { ticker: 'AFLT3', name: 'Afluente T' },
      { ticker: 'GRAO3', name: 'Agribrasil' },
      { ticker: 'AGXY3', name: 'Agrogalaxy' },
      { ticker: 'BRGE11', name: 'Alfa Consorc' },
      { ticker: 'BRGE12', name: 'Alfa Consorc' },
      { ticker: 'BRGE3', name: 'Alfa Consorc' },
      { ticker: 'BRGE5', name: 'Alfa Consorc' },
      { ticker: 'BRGE6', name: 'Alfa Consorc' },
      { ticker: 'BRGE7', name: 'Alfa Consorc' },
      { ticker: 'BRGE8', name: 'Alfa Consorc' },
      { ticker: 'CRIV3', name: 'Alfa Financ' },
      { ticker: 'CRIV4', name: 'Alfa Financ' },
      { ticker: 'RPAD3', name: 'Alfa Holding' },
      { ticker: 'RPAD5', name: 'Alfa Holding' },
      { ticker: 'RPAD6', name: 'Alfa Holding' },
      { ticker: 'BRIV3', name: 'Alfa Invest' },
      { ticker: 'BRIV4', name: 'Alfa Invest' },
      { ticker: 'ALSO3', name: 'Alianscsonae' },
      { ticker: 'ALZR11', name: 'Alianza Trust Renda Imobiliaria Fundo Investimento Imobiliario' },
      { ticker: 'AALR3', name: 'Alliar' },
      { ticker: 'ALLD3', name: 'Allied' },
      { ticker: 'ALPA3', name: 'Alpargatas' },
      { ticker: 'ALPA4', name: 'Alpargatas' },
      { ticker: 'APER3', name: 'Alper S.A.' },
      { ticker: 'GOGL34', name: 'Alphabet DRN A' },
      { ticker: 'AVLL3', name: 'Alphaville' },
      { ticker: 'ALUP11', name: 'Alupar' },
      { ticker: 'ALUP3', name: 'Alupar' },
      { ticker: 'ALUP4', name: 'Alupar' },
      { ticker: 'BAZA3', name: 'Amazonia' },
      { ticker: 'ABEV3', name: 'Ambev S.A.' },
      { ticker: 'AMBP3', name: 'Ambipar' },
      { ticker: 'CBEE3', name: 'Ampla Energ' },
      { ticker: 'ANIM3', name: 'Anima' },
      { ticker: 'ARZZ3', name: 'Arezzo Indústria e Comércio S.A.' },
      { ticker: 'ARML3', name: 'Armac' },
      { ticker: 'ASAI3', name: 'Assai' },
      { ticker: 'ATMP3', name: 'AtmaSA' },
      { ticker: 'ATOM3', name: 'Atompar' },
      { ticker: 'AURA33', name: 'Aura 360' },
      { ticker: 'AZEV3', name: 'Azevedo' },
      { ticker: 'AZEV4', name: 'Azevedo' },
      { ticker: 'AZUL4', name: 'Azul S.A.' },
      { ticker: 'BTOW3', name: 'B2W - Companhia Digital' },
      { ticker: 'B3SA3', name: 'B3 S.A. - Brasil, Bolsa, Balcão' },
      { ticker: 'BAHI3', name: 'Bahema' },
      { ticker: 'BMGB4', name: 'Banco Bmg' },
      { ticker: 'BBDC3', name: 'Banco Bradesco S.A.' },
      { ticker: 'BBDC4', name: 'Banco Bradesco S.A.' },
      { ticker: 'BBAS3', name: 'Banco do Brasil S.A.' },
      { ticker: 'BRSR6', name: 'Banco do Estado do Rio Grande do Sul S.A.' },
      { ticker: 'BIDI11', name: 'Banco Inter' },
      { ticker: 'BIDI4', name: 'Banco Inter S.A.' },
      { ticker: 'BIDI3', name: 'Banco Inter S.A.' },
      { ticker: 'MODL4', name: 'Banco Modal' },
      { ticker: 'MODL11', name: 'Banco Modal' },
      { ticker: 'MODL3', name: 'Banco Modal' },
      { ticker: 'BPAN4', name: 'Banco Pan' },
      { ticker: 'SANB3', name: 'Banco Santander (Brasil) S.A.' },
      { ticker: 'SANB11', name: 'Banco Santander (Brasil) S.A.' },
      { ticker: 'BGIP3', name: 'Banese' },
      { ticker: 'BGIP4', name: 'Banese' },
      { ticker: 'BEES3', name: 'Banestes' },
      { ticker: 'BEES4', name: 'Banestes' },
      { ticker: 'BPAR3', name: 'Banpara' },
      { ticker: 'BRSR3', name: 'Banrisul' },
      { ticker: 'BRSR5', name: 'Banrisul' },
      { ticker: 'BDLL3', name: 'Bardella' },
      { ticker: 'BDLL4', name: 'Bardella' },
      { ticker: 'BTTL3', name: 'Battistella' },
      { ticker: 'BALM3', name: 'Baumer' },
      { ticker: 'BALM4', name: 'Baumer' },
      { ticker: 'BBPO11', name: 'BB Progressivo II Fundo de Investimento Imobiliario - FII' },
      { ticker: 'BBSE3', name: 'BB Seguridade Participações S.A.' },
      { ticker: 'BMOB3', name: 'Bemobi Tech' },
      { ticker: 'BMKS3', name: 'Bic Monark' },
      { ticker: 'BIOM3', name: 'Biomm' },
      { ticker: 'BSEV3', name: 'Biosev' },
      { ticker: 'BKBR3', name: 'Bk Brasil' },
      { ticker: 'BLAU3', name: 'Blau' },
      { ticker: 'SOJA3', name: 'Boa Safra' },
      { ticker: 'BOAS3', name: 'Boa Vista' },
      { ticker: 'BOBR3', name: 'Bombril' },
      { ticker: 'BOBR4', name: 'Bombril' },
      { ticker: 'BBRK3', name: 'Br Brokers' },
      { ticker: 'BRML3', name: 'BR Malls Participações S.A.' },
      { ticker: 'BRBI11', name: 'BR Partners' },
      { ticker: 'BRPR3', name: 'Br Propert' },
      { ticker: 'BRAP4', name: 'Bradespar S.A.' },
      { ticker: 'BRAP3', name: 'Bradespar S.A.' },
      { ticker: 'AGRO3', name: 'Brasilagro' },
      { ticker: 'BRKM6', name: 'Braskem' },
      { ticker: 'BRKM5', name: 'Braskem S.A.' },
      { ticker: 'BRKM3', name: 'Braskem S.A.' },
      { ticker: 'BSLI3', name: 'Brb Banco' },
      { ticker: 'BSLI4', name: 'Brb Banco' },
      { ticker: 'BRFS3', name: 'BRF S.A.' },
      { ticker: 'BRIT3', name: 'BriSAnet' },
      { ticker: 'BTLG11', name: 'BTG Pactual Logística' },
      { ticker: 'BPAC11', name: 'Btgp Banco' },
      { ticker: 'BPAC3', name: 'Btgp Banco' },
      { ticker: 'BPAC5', name: 'Btgp Banco' },
      { ticker: 'CXSE3', name: 'Caixa Seguri' },
      { ticker: 'CAMB3', name: 'Cambuci' },
      { ticker: 'CAML3', name: 'Camil Alimentos S.A.' },
      { ticker: 'CRFB3', name: 'Carrefour Br' },
      { ticker: 'CASN', name: 'CaSAn' },
      { ticker: 'CASN3', name: 'CaSAn' },
      { ticker: 'CASN4', name: 'CaSAn' },
      { ticker: 'CBAV3', name: 'CBA' },
      { ticker: 'CCRO3', name: 'CCR S.A.' },
      { ticker: 'CEAB3', name: 'Cea Modas' },
      { ticker: 'CEBR3', name: 'Ceb' },
      { ticker: 'CEBR5', name: 'Ceb' },
      { ticker: 'CEBR6', name: 'Ceb' },
      { ticker: 'CEDO3', name: 'Cedro' },
      { ticker: 'CEDO4', name: 'Cedro' },
      { ticker: 'CEED3', name: 'Ceee D' },
      { ticker: 'CEED4', name: 'Ceee D' },
      { ticker: 'EEEL3', name: 'Ceee Gt' },
      { ticker: 'EEEL4', name: 'Ceee Gt' },
      { ticker: 'CEGR3', name: 'Ceg' },
      { ticker: 'CLSC3', name: 'Celesc' },
      { ticker: 'CLSC4', name: 'Celesc' },
      { ticker: 'GPAR3', name: 'Celgpar' },
      { ticker: 'CEPE3', name: 'Celpe' },
      { ticker: 'CEPE5', name: 'Celpe' },
      { ticker: 'CEPE6', name: 'Celpe' },
      { ticker: 'MAPT3', name: 'Cemepe' },
      { ticker: 'MAPT4', name: 'Cemepe' },
      { ticker: 'ELET3', name: 'Centrais Elétricas Brasileiras S.A. - Eletrobras' },
      { ticker: 'ELET6', name: 'Centrais Elétricas Brasileiras S.A. - Eletrobras' },
      { ticker: 'CESP3', name: 'Cesp' },
      { ticker: 'CESP5', name: 'Cesp' },
      { ticker: 'CESP6', name: 'Cesp' },
      { ticker: 'HGTX3', name: 'Cia. Hering' },
      { ticker: 'CIEL3', name: 'Cielo S.A.' },
      { ticker: 'CLSA3', name: 'ClearSAle' },
      { ticker: 'CEEB3', name: 'Coelba' },
      { ticker: 'CEEB5', name: 'Coelba' },
      { ticker: 'COCE3', name: 'Coelce' },
      { ticker: 'COCE5', name: 'Coelce' },
      { ticker: 'COGN3', name: 'Cogna Educação S.A.' },
      { ticker: 'CGAS3', name: 'Comgas' },
      { ticker: 'CGAS5', name: 'Comgas' },
      { ticker: 'LCAM3', name: 'Companhia de Locação das Américas' },
      { ticker: 'SBSP3', name: 'Companhia de Saneamento Básico do Estado de São Paulo - SABESP' },
      { ticker: 'CMIG3', name: 'Companhia Energética de Minas Gerais' },
      { ticker: 'CMIG4', name: 'Companhia Energética de Minas Gerais' },
      { ticker: 'CPLE6', name: 'Companhia Paranaense de Energia - COPEL' },
      { ticker: 'CPLE3', name: 'Companhia Paranaense de Energia - COPEL' },
      { ticker: 'CSNA3', name: 'Companhia Siderúrgica Nacional' },
      { ticker: 'CALI3', name: 'Const A Lind' },
      { ticker: 'CALI4', name: 'Const A Lind' },
      { ticker: 'CSMG3', name: 'CopaSA' },
      { ticker: 'CPLE5', name: 'Copel' },
      { ticker: 'CORR4', name: 'Cor Ribeiro' },
      { ticker: 'RLOG3', name: 'CoSAn Log' },
      { ticker: 'CSAN3', name: 'Cosan S.A.' },
      { ticker: 'CSRN3', name: 'Cosern' },
      { ticker: 'CSRN5', name: 'Cosern' },
      { ticker: 'CSRN6', name: 'Cosern' },
      { ticker: 'CTNM3', name: 'Coteminas' },
      { ticker: 'CTNM4', name: 'Coteminas' },
      { ticker: 'CPFE3', name: 'CPFL Energia S.A.' },
      { ticker: 'CRDE3', name: 'Cr2' },
      { ticker: 'CRPG3', name: 'Cristal' },
      { ticker: 'CRPG5', name: 'Cristal' },
      { ticker: 'CRPG6', name: 'Cristal' },
      { ticker: 'CSED3', name: 'Cruzeiro Edu' },
      { ticker: 'HGLG11', name: 'CSHG Logistica - Fundo De Investimento Imobiliario' },
      { ticker: 'CMIN3', name: 'Csnmineracao' },
      { ticker: 'CARD3', name: 'Csu Cardsyst' },
      { ticker: 'CURY3', name: 'Cury S/A' },
      { ticker: 'CVCB3', name: 'CVC Brasil Operadora e Agência de Viagens S.A.' },
      { ticker: 'CCPR3', name: 'Cyre Com Ccp' },
      { ticker: 'CYRE3', name: 'Cyrela Brazil Realty S.A. Empreendimentos e Participações' },
      { ticker: 'DMVF3', name: 'D1000 Vfarma' },
      { ticker: 'DASA3', name: 'DaSA' },
      { ticker: 'DESK3', name: 'Desktop' },
      { ticker: 'PNVL3', name: 'Dimed' },
      { ticker: 'PNVL4', name: 'Dimed' },
      { ticker: 'DIRR3', name: 'Direcional' },
      { ticker: 'DOHL3', name: 'Dohler' },
      { ticker: 'DOHL4', name: 'Dohler' },
      { ticker: 'DMMO3', name: 'Dommo' },
      { ticker: 'DOTZ3', name: 'Dotz S.A.' },
      { ticker: 'DTCY3', name: 'Dtcom Direct' },
      { ticker: 'DTEX3', name: 'Duratex' },
      { ticker: 'ECOR3', name: 'EcoRodovias Infraestrutura e Logística S.A.' },
      { ticker: 'ENBR3', name: 'EDP - Energias do Brasil S.A.' },
      { ticker: 'EKTR3', name: 'Elektro' },
      { ticker: 'EKTR4', name: 'Elektro' },
      { ticker: 'ELET5', name: 'Eletrobras' },
      { ticker: 'ELMD3', name: 'Eletromidia' },
      { ticker: 'LIPR3', name: 'Eletropar' },
      { ticker: 'EMAE3', name: 'Emae' },
      { ticker: 'EMAE4', name: 'Emae' },
      { ticker: 'EMBR3', name: 'Embraer S.A.' },
      { ticker: 'ENAT3', name: 'Enauta Part' },
      { ticker: 'ECPR3', name: 'Encorpar' },
      { ticker: 'ECPR4', name: 'Encorpar' },
      { ticker: 'ENGI', name: 'EnergiSA' },
      { ticker: 'ENGI11', name: 'EnergiSA' },
      { ticker: 'ENGI3', name: 'EnergiSA' },
      { ticker: 'ENGI4', name: 'EnergiSA' },
      { ticker: 'ENMT3', name: 'EnergiSA Mt' },
      { ticker: 'ENMT4', name: 'EnergiSA Mt' },
      { ticker: 'ENEV3', name: 'Eneva' },
      { ticker: 'EGIE3', name: 'Engie Brasil Energia S.A.' },
      { ticker: 'ENJU3', name: 'Enjoei' },
      { ticker: 'EQPA3', name: 'Eqtl Para' },
      { ticker: 'EQPA5', name: 'Eqtl Para' },
      { ticker: 'EQPA6', name: 'Eqtl Para' },
      { ticker: 'EQPA7', name: 'Eqtl Para' },
      { ticker: 'EQTL3', name: 'Equatorial Energia S.A.' },
      { ticker: 'ESPA3', name: 'Espacolaser' },
      { ticker: 'YDUQ3', name: 'Estácio Participações S.A.' },
      { ticker: 'ALPK3', name: 'Estapar' },
      { ticker: 'ESTR3', name: 'Estrela' },
      { ticker: 'ESTR4', name: 'Estrela' },
      { ticker: 'ETER3', name: 'Eternit' },
      { ticker: 'EUCA3', name: 'Eucatex' },
      { ticker: 'EUCA4', name: 'Eucatex' },
      { ticker: 'EVEN3', name: 'Even' },
      { ticker: 'BAUH4', name: 'Excelsior' },
      { ticker: 'EZTC3', name: 'Eztec' },
      { ticker: 'VRTA11', name: 'Fator Verita' },
      { ticker: 'HTMX11', name: 'FD Invest Imob Hotel Maxinvest' },
      { ticker: 'FHER3', name: 'Fer Heringer' },
      { ticker: 'FESA3', name: 'FerbaSA' },
      { ticker: 'FESA4', name: 'FerbaSA' },
      { ticker: 'FLRY3', name: 'Fleury S.A.' },
      { ticker: 'POWE3', name: 'Focus On' },
      { ticker: 'FRAS3', name: 'Fras Le' },
      { ticker: 'BPFF11', name: 'Fundo de Investimento Imobiliario - FII Brasil Plural Absoluto Fundo de Fundos' },
      { ticker: 'RBRP11', name: 'Fundo Investimento Imobiliario Rbr Properties Fii' },
      { ticker: 'GFSA3', name: 'GafiSA' },
      { ticker: 'GSHP3', name: 'Generalshopp' },
      { ticker: 'GEPA3', name: 'Ger Paranap' },
      { ticker: 'GEPA4', name: 'Ger Paranap' },
      { ticker: 'GOAU3', name: 'Gerdau Met' },
      { ticker: 'GGBR3', name: 'Gerdau S.A.' },
      { ticker: 'GGBR4', name: 'Gerdau S.A.' },
      { ticker: 'NINJ3', name: 'Getninjas' },
      { ticker: 'GOLL4', name: 'Gol Linhas Aéreas Inteligentes S.A.' },
      { ticker: 'GPIV33', name: 'Gp Invest' },
      { ticker: 'PCAR3', name: 'GPA Companhia Brasileira de Distribuição' },
      { ticker: 'GPCP3', name: 'Gpc Part' },
      { ticker: 'GGPS3', name: 'GPS' },
      { ticker: 'CGRA3', name: 'Grazziotin' },
      { ticker: 'CGRA4', name: 'Grazziotin' },
      { ticker: 'GRND3', name: 'Grendene S.A.' },
      { ticker: 'GMAT3', name: 'Grupo Mateus S.A.' },
      { ticker: 'SBFG3', name: 'Grupo Sbf' },
      { ticker: 'SOMA3', name: 'Grupo Soma' },
      { ticker: 'GUAR3', name: 'Guararapes' },
      { ticker: 'HBTS5', name: 'Habitasul' },
      { ticker: 'HAGA3', name: 'Haga S/A' },
      { ticker: 'HAGA4', name: 'Haga S/A' },
      { ticker: 'HAPV3', name: 'Hapvida' },
      { ticker: 'HBRE3', name: 'Hbr Realty' },
      { ticker: 'HCTR11', name: 'Hectare CE Fundo de Investimento Imobiliário' },
      { ticker: 'HGBS11', name: 'HEDGE Brasil Shopping Fundo de Investimento Imobiliario' },
      { ticker: 'HFOF11', name: 'Hedge Top FOFII 3' },
      { ticker: 'HBOR3', name: 'Helbor Empreendimentos S.A.' },
      { ticker: 'HETA3', name: 'Hercules' },
      { ticker: 'HETA4', name: 'Hercules' },
      { ticker: 'HBSA3', name: 'Hidrovias' },
      { ticker: 'HOOT4', name: 'Hoteis Othon' },
      { ticker: 'HYPE3', name: 'Hypera S.A.' },
      { ticker: 'IGBR3', name: 'Igb S/A' },
      { ticker: 'IGTA3', name: 'Iguatemi Empresa de Shopping Centers S.A.' },
      { ticker: 'PARD3', name: 'Ihpardini' },
      { ticker: 'ROMI3', name: 'Inds Romi' },
      { ticker: 'IDVL3', name: 'Indusval' },
      { ticker: 'IDVL4', name: 'Indusval' },
      { ticker: 'INEP3', name: 'Inepar' },
      { ticker: 'INEP4', name: 'Inepar' },
      { ticker: 'IFCM3', name: 'Infracomm' },
      { ticker: 'INTB3', name: 'Intelbras' },
      { ticker: 'GNDI3', name: 'Intermedica' },
      { ticker: 'MEAL3', name: 'International Meal Company Alimentacao S.A.' },
      { ticker: 'MYPK3', name: 'Iochpe-Maxion S.A.' },
      { ticker: 'RANI3', name: 'Irani' },
      { ticker: 'RANI4', name: 'Irani' },
      { ticker: 'IRBR3', name: 'IRB-Brasil Resseguros S.A.' },
      { ticker: 'BOVA11', name: 'iShares Ibovespa Fundo de Índice ETF' },
      { ticker: 'IVVB11', name: 'iShares S&P 500 Fundo de Investimento - Investimento No Exterior' },
      { ticker: 'ITUB4', name: 'Itaú Unibanco Holding S.A.' },
      { ticker: 'ITUB3', name: 'Itaú Unibanco Holding S.A.' },
      { ticker: 'ITSA4', name: 'Itaúsa - Investimentos Itaú S.A.' },
      { ticker: 'ITSA3', name: 'Itaúsa - Investimentos Itaú S.A.' },
      { ticker: 'JBDU3', name: 'J B Duarte' },
      { ticker: 'JBDU4', name: 'J B Duarte' },
      { ticker: 'JALL3', name: 'Jallesmachad' },
      { ticker: 'JBSS3', name: 'JBS S.A.' },
      { ticker: 'JDCO34', name: 'JD COM DRN' },
      { ticker: 'JPSA3', name: 'JereisSAti' },
      { ticker: 'JHSF3', name: 'JHSF Participacoes S.A.' },
      { ticker: 'JFEN3', name: 'Joao Fortes' },
      { ticker: 'JOPA3', name: 'JoSApar' },
      { ticker: 'JOPA4', name: 'JoSApar' },
      { ticker: 'KLAS3', name: 'Kallas' },
      { ticker: 'CTKA3', name: 'Karsten' },
      { ticker: 'CTKA4', name: 'Karsten' },
      { ticker: 'KEPL3', name: 'Kepler Weber' },
      { ticker: 'KNRI11', name: 'KINEA Renda Imobiliária - Fundo de Investimento Imobiliário' },
      { ticker: 'KLBN3', name: 'Klabin S/A' },
      { ticker: 'KLBN4', name: 'Klabin S/A' },
      { ticker: 'KLBN11', name: 'KLABIN S/A UNT N2' },
      { ticker: 'LAVV3', name: 'Lavvi' },
      { ticker: 'LLBI3', name: 'Le Biscuit' },
      { ticker: 'LLBI4', name: 'Le Biscuit' },
      { ticker: 'LLIS3', name: 'Le Lis Blanc' },
      { ticker: 'LIGT3', name: 'Light S/A' },
      { ticker: 'LINX3', name: 'Linx' },
      { ticker: 'RENT3', name: 'Localiza Rent a Car S.A.' },
      { ticker: 'LWSA3', name: 'Locaweb' },
      { ticker: 'LOGG3', name: 'Log Com Prop' },
      { ticker: 'LOGN3', name: 'Log In' },
      { ticker: 'LAME3', name: 'Lojas Americ' },
      { ticker: 'LAME4', name: 'Lojas Americanas S.A.' },
      { ticker: 'AMAR3', name: 'Lojas MariSA' },
      { ticker: 'LREN3', name: 'Lojas Renner S.A.' },
      { ticker: 'LPSB3', name: 'Lopes Brasil' },
      { ticker: 'LUPA3', name: 'Lupatech' },
      { ticker: 'MDIA3', name: 'M. Dias Branco S.A. Indústria e Comércio de Alimentos' },
      { ticker: 'MGLU3', name: 'Magazine Luiza S.A.' },
      { ticker: 'MGEL4', name: 'Mangels Indl' },
      { ticker: 'POMO3', name: 'Marcopolo' },
      { ticker: 'POMO4', name: 'Marcopolo' },
      { ticker: 'MRFG3', name: 'Marfrig Global Foods S.A.' },
      { ticker: 'MATD3', name: 'Mater Dei' },
      { ticker: 'FII', name: 'Maxi Renda Fundo De Investimento Imobiliaro - FII' },
      { ticker: 'MSPA3', name: 'Melhor Sp' },
      { ticker: 'MSPA4', name: 'Melhor Sp' },
      { ticker: 'CASH3', name: 'Meliuz' },
      { ticker: 'MELK3', name: 'Melnick' },
      { ticker: 'BMEB3', name: 'Merc Brasil' },
      { ticker: 'BMEB4', name: 'Merc Brasil' },
      { ticker: 'MERC3', name: 'Merc Financ' },
      { ticker: 'MERC4', name: 'Merc Financ' },
      { ticker: 'BMIN3', name: 'Merc Invest' },
      { ticker: 'BMIN4', name: 'Merc Invest' },
      { ticker: 'MFII11', name: 'Merito Desenvolvimento Imobiliario I FII - Fundo de Investimento Imobiliario' },
      { ticker: 'MTIG4', name: 'Metal Iguacu' },
      { ticker: 'LEVE3', name: 'Metal Leve' },
      { ticker: 'FRIO3', name: 'Metalfrio' },
      { ticker: 'GOAU4', name: 'Metalurgica Gerdau S.A.' },
      { ticker: 'MTSA3', name: 'MetiSA' },
      { ticker: 'MTSA4', name: 'MetiSA' },
      { ticker: 'MILS3', name: 'Mills Estruturas e Servicos de Engenharia S.A.' },
      { ticker: 'BEEF', name: 'Minerva' },
      { ticker: 'BEEF3', name: 'Minerva' },
      { ticker: 'MNPR3', name: 'Minupar' },
      { ticker: 'MTRE3', name: 'Mitre Realty' },
      { ticker: 'MMXM11', name: 'Mmx Miner' },
      { ticker: 'MMXM3', name: 'Mmx Miner' },
      { ticker: 'MBLY3', name: 'Mobly' },
      { ticker: 'MOAR3', name: 'Mont Aranha' },
      { ticker: 'MOSI3', name: 'Mosaico' },
      { ticker: 'MDNE3', name: 'Moura Dubeux' },
      { ticker: 'MOVI3', name: 'Movida Participacoes S.A.' },
      { ticker: 'MRVE3', name: 'MRV Engenharia e Participações S.A.' },
      { ticker: 'MLAS3', name: 'Multilaser' },
      { ticker: 'MULT3', name: 'Multiplan Empreendimentos Imobiliários S.A.' },
      { ticker: 'MNDL3', name: 'Mundial' },
      { ticker: 'NTCO3', name: 'Natura &Co Holding S.A.' },
      { ticker: 'NATU3', name: 'Natura Cosméticos S.A.' },
      { ticker: 'NEOE3', name: 'Neoenergia' },
      { ticker: 'NGRD3', name: 'Neogrid' },
      { ticker: 'BNBR3', name: 'Nord Brasil' },
      { ticker: 'NORD3', name: 'Nordon Met' },
      { ticker: 'NUTR3', name: 'Nutriplant' },
      { ticker: 'OPCT3', name: 'Oceanpact' },
      { ticker: 'ODPV3', name: 'Odontoprev' },
      { ticker: 'OIBR4', name: 'Oi' },
      { ticker: 'OIBR3', name: 'Oi S.A.' },
      { ticker: 'OMGE3', name: 'Omega Ger' },
      { ticker: 'ORVR3', name: 'Orizon' },
      { ticker: 'OSXB3', name: 'Osx Brasil' },
      { ticker: 'OFSA3', name: 'Ourofino S/A' },
      { ticker: 'PDTC3', name: 'Padtec' },
      { ticker: 'PGMN3', name: 'Pague Menos' },
      { ticker: 'PATI3', name: 'Panatlantica' },
      { ticker: 'PATI4', name: 'Panatlantica' },
      { ticker: 'PEAB3', name: 'Par Al Bahia' },
      { ticker: 'PEAB4', name: 'Par Al Bahia' },
      { ticker: 'PMAM3', name: 'Paranapanema' },
      { ticker: 'PDGR3', name: 'Pdg Realt' },
      { ticker: 'PETZ3', name: 'Pet Center Comércio e Participações S.A.' },
      { ticker: 'RPMG3', name: 'Pet Manguinh' },
      { ticker: 'PETR4', name: 'Petróleo Brasileiro S.A. - Petrobras' },
      { ticker: 'PETR3', name: 'Petróleo Brasileiro S.A. - Petrobras' },
      { ticker: 'RECV3', name: 'Petrorecôncavo S.A.' },
      { ticker: 'PRIO3', name: 'Petrorio' },
      { ticker: 'PTNT3', name: 'Pettenati' },
      { ticker: 'PTNT4', name: 'Pettenati' },
      { ticker: 'PINE4', name: 'Pine' },
      { ticker: 'PLPL3', name: 'Planoeplano' },
      { ticker: 'PLAS3', name: 'Plascar Part' },
      { ticker: 'FRTA3', name: 'Pomifrutas' },
      { ticker: 'PSSA3', name: 'Porto Seguro S.A.' },
      { ticker: 'PSVM11', name: 'Porto Vm' },
      { ticker: 'PTBL3', name: 'Portobello' },
      { ticker: 'POSI3', name: 'Positivo Tec' },
      { ticker: 'PPLA11', name: 'Ppla' },
      { ticker: 'PRNR3', name: 'Priner' },
      { ticker: 'PFRM3', name: 'Profarma' },
      { ticker: 'QUAL3', name: 'Qualicorp Consultoria e Corretora de Seguros S.A.' },
      { ticker: 'LJQQ3', name: 'Quero Quero' },
      { ticker: 'RADL3', name: 'Raia Drogasil S.A.' },
      { ticker: 'RAIZ4', name: 'Raizen' },
      { ticker: 'RAPT3', name: 'Randon Part' },
      { ticker: 'RAPT4', name: 'Randon Part' },
      { ticker: 'RBRR11', name: 'RBR Rendimento High Grade' },
      { ticker: 'RCSL3', name: 'Recrusul' },
      { ticker: 'RCSL4', name: 'Recrusul' },
      { ticker: 'RDOR3', name: 'Rede D Or' },
      { ticker: 'REDE3', name: 'Rede Energia' },
      { ticker: 'RNEW11', name: 'Renova' },
      { ticker: 'RNEW3', name: 'Renova' },
      { ticker: 'RNEW4', name: 'Renova' },
      { ticker: 'RSUL4', name: 'Riosulense' },
      { ticker: 'RDNI3', name: 'Rni' },
      { ticker: 'RBNS11', name: 'Rodobens' },
      { ticker: 'RSID3', name: 'Rossi Resid' },
      { ticker: 'RAIL3', name: 'Rumo S.A.' },
      { ticker: 'SAPR11', name: 'Sanepar' },
      { ticker: 'SAPR3', name: 'Sanepar' },
      { ticker: 'SAPR4', name: 'Sanepar' },
      { ticker: 'SNSY3', name: 'Sansuy' },
      { ticker: 'SNSY5', name: 'Sansuy' },
      { ticker: 'SNSY6', name: 'Sansuy' },
      { ticker: 'SANB4', name: 'Santander Br' },
      { ticker: 'CTSA3', name: 'Santanense' },
      { ticker: 'CTSA4', name: 'Santanense' },
      { ticker: 'STBP3', name: 'Santos Brp' },
      { ticker: 'SCAR3', name: 'Sao Carlos' },
      { ticker: 'SMTO3', name: 'Sao Martinho' },
      { ticker: 'SLED3', name: 'Saraiva Livr' },
      { ticker: 'SLED4', name: 'Saraiva Livr' },
      { ticker: 'SHUL4', name: 'Schulz' },
      { ticker: 'CSAB3', name: 'Seg Al Bahia' },
      { ticker: 'CSAB4', name: 'Seg Al Bahia' },
      { ticker: 'SEQL3', name: 'Sequoia Log' },
      { ticker: 'SEER3', name: 'Ser Educa' },
      { ticker: 'SIMH3', name: 'Simpar' },
      { ticker: 'SQIA3', name: 'Sinqia S.A.' },
      { ticker: 'SLCE3', name: 'Slc Agricola' },
      { ticker: 'SMFT3', name: 'Smart Fit' },
      { ticker: 'SMLS3', name: 'Smiles Fidelidade S.A.' },
      { ticker: 'SOND3', name: 'Sondotecnica' },
      { ticker: 'SOND5', name: 'Sondotecnica' },
      { ticker: 'SOND6', name: 'Sondotecnica' },
      { ticker: 'SGPS3', name: 'Springs' },
      { ticker: 'AHEB3', name: 'Spturis' },
      { ticker: 'AHEB5', name: 'Spturis' },
      { ticker: 'AHEB6', name: 'Spturis' },
      { ticker: 'SULA11', name: 'Sul America' },
      { ticker: 'SULA3', name: 'Sul America' },
      { ticker: 'SULA4', name: 'Sul America' },
      { ticker: 'SUZB3', name: 'Suzano S.A.' },
      { ticker: 'TAEE3', name: 'TaeSA' },
      { ticker: 'TAEE4', name: 'TaeSA' },
      { ticker: 'TASA3', name: 'Taurus Armas' },
      { ticker: 'TASA4', name: 'Taurus Armas S.A.' },
      { ticker: 'TRAD3', name: 'Tc' },
      { ticker: 'TECN3', name: 'Technos' },
      { ticker: 'TCSA3', name: 'Tecnisa S.A.' },
      { ticker: 'TCNO3', name: 'Tecnosolo' },
      { ticker: 'TCNO4', name: 'Tecnosolo' },
      { ticker: 'TGMA3', name: 'Tegma' },
      { ticker: 'TEGA3', name: 'Tegra Incorporadora' },
      { ticker: 'TEKA3', name: 'Teka' },
      { ticker: 'TEKA4', name: 'Teka' },
      { ticker: 'TKNO4', name: 'Tekno' },
      { ticker: 'TELB3', name: 'Telebras' },
      { ticker: 'TELB4', name: 'Telebras' },
      { ticker: 'VIVT3', name: 'Telef Brasil' },
      { ticker: 'VIVT4', name: 'Telefônica Brasil S.A.' },
      { ticker: 'TEND3', name: 'Tenda' },
      { ticker: 'TXSA34', name: 'Terniumsa DRN' },
      { ticker: 'TESA3', name: 'Terra Santa' },
      { ticker: 'LAND3', name: 'TerraSAntapa' },
      { ticker: 'TXRX3', name: 'Tex Renaux' },
      { ticker: 'TIMS3', name: 'TIM S.A.' },
      { ticker: 'SHOW3', name: 'Time For Fun' },
      { ticker: 'TOTS3', name: 'TOTVS S.A.' },
      { ticker: 'TFCO4', name: 'Track Field' },
      { ticker: 'TRPL3', name: 'Tran Paulist' },
      { ticker: 'TRPL4', name: 'Tran Paulist' },
      { ticker: 'TAEE11', name: 'Transmissora Aliança de Energia Elétrica S.A.' },
      { ticker: 'LUXM4', name: 'TreviSA' },
      { ticker: 'TRIS3', name: 'Trisul' },
      { ticker: 'TPIS3', name: 'Triunfo Part' },
      { ticker: 'TRXF11', name: 'TRX Real State' },
      { ticker: 'TUPY3', name: 'Tupy' },
      { ticker: 'RECT11', name: 'UBS BR Office' },
      { ticker: 'UGPA3', name: 'Ultrapar Participações S.A.' },
      { ticker: 'UCAS3', name: 'UnicaSA' },
      { ticker: 'UNIP3', name: 'Unipar' },
      { ticker: 'UNIP5', name: 'Unipar' },
      { ticker: 'UNIP6', name: 'Unipar' },
      { ticker: 'USIM3', name: 'Usiminas' },
      { ticker: 'USIM6', name: 'Usiminas' },
      { ticker: 'USIM5', name: 'Usinas Siderúrgicas de Minas Gerais S.A.' },
      { ticker: 'VALE3', name: 'Vale S.A.' },
      { ticker: 'VLID3', name: 'Valid Solucoes S.A.' },
      { ticker: 'VAMO3', name: 'Vamos' },
      { ticker: 'LVBI11', name: 'VBI Losístico' },
      { ticker: 'PVBI11', name: 'VBI Prime Properties' },
      { ticker: 'VIIA3', name: 'Via Varejo S.A.' },
      { ticker: 'VBBR3', name: 'Vibra Energia S.A.' },
      { ticker: 'VILG11', name: 'Vinci Logistica Fundo Investimento Imobiliario FII' },
      { ticker: 'VITT3', name: 'Vittia Fertilizantes S.A.' },
      { ticker: 'VIVA3', name: 'Vivara Participacoes S.A.' },
      { ticker: 'VVEO3', name: 'Viveo' },
      { ticker: 'VIVR3', name: 'Viver' },
      { ticker: 'VULC3', name: 'Vulcabras' },
      { ticker: 'LVTC3', name: 'Wdc Networks' },
      { ticker: 'WEGE3', name: 'WEG S.A.' },
      { ticker: 'WEST3', name: 'Westwing' },
      { ticker: 'MWET3', name: 'Wetzel S/A' },
      { ticker: 'MWET4', name: 'Wetzel S/A' },
      { ticker: 'WHRL3', name: 'Whirlpool' },
      { ticker: 'WHRL4', name: 'Whirlpool' },
      { ticker: 'WSON33', name: 'Wilson Sons' },
      { ticker: 'WIZS3', name: 'Wiz Solucoes e Corretagem de Seguros S.A.' },
      { ticker: 'WLMM3', name: 'Wlm Ind Com' },
      { ticker: 'WLMM4', name: 'Wlm Ind Com' },
    ],
  });
}

export default seedAssets;