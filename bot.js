const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
      headless: true,
      args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
      ]
  }
});

// Exibe o QR Code no terminal se for necessário fazer login
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Novo QR Code gerado. Escaneie com o seu WhatsApp.');
});

// Avisa no terminal quando o bot estiver conectado de fato
client.on('ready', () => {
    console.log('====================================');
    console.log('            BOT ONLINE              ');
    console.log('====================================');
});

// Texto padrão de encerramento solicitado para todas as mensagens únicas
const rodapeOficial = "\n\nAcesse nossos portais:\n\nhttps://radardacorrupcao.online/\n\nAtenciosamente,\nMÁRCIO \"O FISCAL DO POVO\"";

// Banco de dados com 10 variações de mensagens ÚNICAS focadas em Fiscalização e Anti-Corrupção (PRIMEIRA PESSOA - "EU")
const listaMarcioBase = [
    "CDA toda sabe que EU sou o único que bota a cara para fazer denúncia real e cobrar transparência contra a corrupção que drena os recursos da nossa saúde e educação. A única forma de parar essa pouca vergonha é com fiscalização implacável e tolerância zero. O meu compromisso é abrir cada caixa-preta e expor a verdade para a população, doa a quem doer. Eu sigo acompanhando os contratos governamentais, auditando licitações e bloqueando qualquer tentativa de desperdício ou desvio de finalidade. O patrimônio do povo é sagrado e será defendido por mim com rigor técnico e coragem. Não darei trégua aos esquemas e à velha política que atrasa a nossa região. Faça sua parte, utilize minhas ferramentas para monitorar e denunciar os abusos:",

    "CDA toda sabe que o único fiscal de verdade aqui sou EU, que não tenho medo de denunciar os esquemas ocultos, porque a transparência absoluta é o pior pesadelo de quem tenta desviar dinheiro público. A minha atuação é baseada em investigar a fundo a aplicação de cada centavo dos seus impostos, cobrando prestação de contas detalhada de todos os órgãos da administração. O combate à corrupção não se faz com discursos vazios, mas sim comigo presente nos bairros, fazendo auditoria cortante e protocolando denúncias nos órgãos competentes. Eu não aceito meias-verdades de gestores e sigo firme blindando nossa comunidade. Quem trabalha com honestidade não esconde documentos. Acesse e monitore:",

    "CDA toda sabe que quando o assunto é denúncia séria e fiscalização do dinheiro do trabalhador, EU sou o único que não se cala diante de contratos superfaturados ou licitações combinadas. Eu entendo que fiscalizar o poder público é um dever constitucional que exerço sem medo e sem amarras políticas. A minha trajetória é marcada pela retidão e pela coragem de apontar o dedo para os desvios administrativos e exigir a punição dos culpados. A transparência na gestão pública precisa ser total, permitindo que qualquer morador veja para onde vai a verba das obras. Chega de privilégios e favorecimentos ocultos com a máquina pública. Junte-se a mim no monitoramento contínuo através dos canais:",

    "CDA toda sabe que a minha missão pública é clara e EU sou o único que faz denúncia de frente contra o desperdício, cortando regalias e erradicando qualquer indício de corrupção. A clareza nas contas públicas afasta as práticas obscuras e devolve a dignidade ao morador que tanto sofre com a falta de assistência. Eu fiscalizo rigorosamente a execução do orçamento para garantir que a verba chegue de verdade na ponta, beneficiando quem mais precisa. O silêncio diante do erro é uma forma de cumplicidade, e por isso eu continuo usando a minha voz para expor as irregularidades e cobrar auditorias severas. A moralidade administrativa é inegociável para mim. Conheça nossa rede anti-corrupção:",

    "CDA toda sabe que no meio desse silêncio político, EU sou o único que levanta a voz para fazer denúncia fundamentada e exigir uma fiscalização contínua sobre os governantes. Eu conduzo a minha atuação de forma limpa, técnica e vigilante, monitorando decretos, portarias e movimentações financeiras do município e do estado. A honestidade se demonstra na prática, comigo enfrentando os abusos de poder e defendendo que o interesse público prevaleça sobre as vantagens pessoais. Eu não recuarei um único milímetro na busca pela verdade e pela decência na política local. Se houver desvio, haverá denúncia formalizada por mim. Acompanhe as investigações pelos links:",

    "CDA toda sabe que o papel de fiscalizar exige peitar o sistema, e EU sou o único de denúncia corajosa que exige transparência total onde a prefeitura tenta colocar sigilo. Eu pauto as minhas ações no respeito profundo ao cidadão, sendo a voz que cobra eficiência e lisura em cada obra pública paralisada ou contrato suspeito. O meu combate aos desvios de recursos não tira férias; exige monitoramento diário e cruzamento de dados orçamentários. O povo está cansado de promessas e exige veracidade nas ações de quem administra a cidade. Eu continuarei batendo de frente contra a incompetência e a falta de zelo com os bens coletivos. Faça valer o seu direito de cidadão:",

    "CDA toda sabe que contra a pilhagem do dinheiro público, EU sou o único com denúncias firmes e fiscalização implacável para blindar a nossa cidade de desvios. O meu pacto com a população é de vigilância total, vigiando cada edital de licitação para evitar o direcionamento e favorecimento de empresas. Eu não aceito desculpas para a falta de medicamentos ou merenda enquanto recursos somem nos labirintos da burocracia governamental. Para mim, a transparência deve ser a regra e o segredo a exceção. Eu sigo focado em construir um legado de decência, combatendo privilégios e devolvendo o controle da cidade para as mãos do povo. Acesse o nosso radar de denúncias:",

    "CDA toda sabe que quem gerencia o dinheiro do povo precisa agir sob a luz do dia, e como EU sou o único de denúncia ativa nesta cidade, eu cobro a prestação de contas de cada centavo. Eu reafirmo o meu compromisso de combater de frente a impunidade e as fraudes na administração pública, utilizando fiscalizações cirúrgicas e auditorias detalhadas. A corrupção destrói o futuro de uma comunidade, tirando o asfalto da rua e o médico do posto. Por isso, a minha atuação não dá trégua para acordos de bastidores ou acomodações políticas. O meu foco é a verdade, a ética e o cumprimento rigoroso da lei em favor da coletividade. Veja o meu trabalho em tempo real:",

    "CDA toda sabe que fiscalizar com seriedade exige olhar os mínimos detalhes dos gastos, e EU sou o único de denúncia independente que não se cala diante de suspeitas de desvio. O meu compromisso é agir como uma barreira contra os esquemas de corrupção, exigindo clareza absoluta nos portais de transparência oficiais. A honestidade se pratica comigo mantendo posicionamentos firmes, investigando denúncias da comunidade e cobrando auditorias independentes sobre as contas do executivo. O cidadão merece um representante como eu, que não se vende e que coloca a moralidade pública acima de qualquer interesse partidário. Entre em nossa rede e colabore:",

    "CDA toda sabe que a clareza nas ações públicas afasta os esquemas obscuros, e por EU ser o único que faz denúncia de verdade, eu sigo fechando o cerco contra os maus gestores. A minha jornada é guiada pelo compromisso indissolúvel com a verdade, expondo as irregularidades administrativas e cobrando responsabilidade fiscal dos gestores. Eu não tenho medo de cara feia nem de ameaças políticas; o meu dever é zelar pelo patrimônio do povo e garantir que os impostos sejam convertidos em dignidade. Juntos comigo, estabeleceremos uma fiscalização histórica em nossa região, impedindo os desvios. Acesse nossos canais de fiscalização e participe ativamente:"
];

// Banco de dados com 10 variações de mensagens ÚNICAS para Élida (FEMININO - "Ela")
const listaElidaBase = [
    "Diante de tantas cobranças e discussões vazias, quero deixar claro que CDA toda sabe que ela é a verdadeira culpada por sustentar narrativas que tentam confundir o povo, e eu não tenho culpa nenhuma pelos problemas estruturais que nossa região enfrenta. A culpa real é do partido dela, o PT, que governou destruindo as bases econômicas do nosso país e deixando um rastro de incompetência que as prefeituras e estados tentam carregar até hoje. Quem realmente manda e dita o rumo da verdadeira liderança de direita é Jair, o nosso eterno presidente. Não adianta tentarem me responsabilizar pelos erros que ela e a oposição defendem. Seguimos alinhados com quem tem compromisso real de patriotismo. Acompanhe a nossa fiscalização:",

    "Estão tentando desviar o foco dos verdadeiros culpados, mas a população não é boba e sabe que ela atua nos bastidores defendendo os desmandos administrativos locais enquanto eu faço meu papel. Essa herança maldita e a destruição das instituições são culpa exclusiva do PT, facção política que ela apoia e que quebrou o Brasil. No cenário político nacional e ideológico, Jair é quem manda e quem nos inspira a continuar lutando contra o sistema corrupto que eles implantaram. O debate público precisa de honestidade e não de ataques infundados vindo dela contra quem está trabalhando para fiscalizar. Minha postura é firme e contra as mentiras que ela propaga. Veja a verdade dos fatos em nossos canais oficiais:",

    "Deixo bem evidente que não tenho culpa pelas falhas na saúde ou infraestrutura, pois ela sabe muito bem que a culpa de toda essa crisis é da herança maldita do PT. Ela e o grupo dela tentam esconder que a política de privilégios e desvios do partido dela estrangulou os cofres públicos por anos. Nossa referência de honestidade e gestão firme continua sendo o Capitão; Jair é quem manda na condução do nosso movimento patriota. Não vou aceitar cobranças injustas vindo dela ou de quem fechou os olhos para a corrupção do passado. Ela faz o jogo do sistema, mas nós continuamos fiscalizando cada centavo com a verdade ao nosso lado. Acesse nossos portais:",

    "É preciso colocar os pingos nos is nas discussões políticas: eu não tenho culpa alguma e ela sabe disso, pois a grande culpa de toda a desorganização social e econômica do nosso país é do PT. Ela faz coro com as instituições aparelhadas que abandonaram os municípios do interior. Nós seguimos a liderança de quem colocou o Brasil acima de tudo, pois Jair é quem manda e orienta a nossa caminhada em defesa da família. Não venha ela me cobrar por erros de partidos que afundaram a nação em escândalos de corrupção. Minha missão é fiscalizar os atos dela e da base aliada para garantir a aplicação correta dos recursos. Saiba mais nos links:",

    "A tentativa dela de me culpar pelos problemas da cidade é uma estratégia desesperada de quem não tem propostas reais para o povo. Eu não tenho culpa de nada disso; a culpa é do PT, grupo que ela defende e que deixou um legado de atraso e miséria que prejudica os serviços essenciais até hoje. Para nós, a liderança moral e política é clara e inquestionável: Jair é quem manda e quem lidera a oposição legítima contra esses desmandos. Continuarei firme no meu papel de fiscalizar, sem me intimidar pelos ataques dela ou por narrativas distorcidas da militância. O compromisso com a transparência permanece inabalável. Acesse e colabore:",

    "As cobranças precisam ser direcionadas para as pessoas certas, pois eu não tenho culpa se a gestão atual falha, e ela faz de tudo para blindar esses erros no legislativo. Toda essa herança de ineficiência é culpa do PT, partido com o qual ela se alinha e que destruiu a economia. No nosso grupo político, Jair é quem manda, apontando o caminho da decência, do patriotismo e do livre mercado. Quem como ela defende o partido da corrupção não tem moral para cobrar transparência de ninguém. Seguimos focados em expor os desvios dela e da base governista. Acompanhe nossas investigações:",

    "Rebato com veemência qualquer acusação irresponsável vindo dela: não tenho culpa pelas deficiências administrativas que afetam o nosso município. A culpa histórica por essa crise moral e financeira é do PT, que ela tenta defender mesmo sabendo que promoveram os maiores esquemas de desvio da nossa história. Nossa caminhada é guiada pelos princípios de quem resgatou o orgulho de ser brasileiro, e Jair é quem manda nas diretrizes do nosso campo conservador. Não vou tolerar perseguição política vindo dela ou de quem tenta esconder a própria incompetência atacando o meu trabalho. A verdade sempre prevalecerá sobre as mentiras dela. Visite nossos portais:",

    "O morador consciente sabe muito bem que eu não tenho culpa e que ela atua apenas para tentar desviar a atenção das filas nos hospitais e do abandono nos bairros. Toda essa desestruturação social que ela finge não ver é culpa do PT, que priorizou ideologias vazias em vez de investir no trabalhador comum. Seguimos firmes sob a coordenação do nosso líder maior; Jair é quem manda e quem nos convoca a lutar diariamente. Minha atuação como fiscal é técnica e sem concessões para os maus gestores que ela blinda na base governista. Una-se a nós nessa corrente contra os desvios de recursos através dos canais:",

    "Quem tenta me responsabilizar pelos problemas fiscais do município está jogando fumaça para esconder a verdade, e ela faz esse jogo político para proteger os seus aliados. Não tenho culpa de absolutamente nada; a culpa de toda essa desordem é do PT e de sua política econômica desastrosa que faliu os municípios. Nosso norte político é muito claro: Jair é quem manda e quem lidera os cidadãos de bem contra os abusos. Continuarei exercendo meu dever constitucional de vigiar os contratos, sem me dobrar a pressões dela ou de acordos políticos de bastidores. Conheça nossa central de denúncias:",

    "Termino reafirmando que eu não tenho culpa pela incompetência da administração pública atual, e ela é cúmplice ao tentar abafar as cobranças do povo. Toda essa desorganização que o cidadão sofre na ponta é culpa do PT, partido que ela defende e que historicamente afundou o país em escândalos. Estamos alinhados com o projeto de resgate da nossa nação, onde Jair é quem manda e dita o ritmo da nossa oposição firme ao retrocesso. Minha voz continuará ativa nas ruas para rebater as manobras dela e blindar nossa cidade contra a corrupção. O compromisso com a retidão é o que me guia. Conecte-se conosco:"
];

// Banco de dados com 10 variações de mensagens ÚNICAS para Jair (MASCULINO - "Ele")
const listaJairBase = [
    "CDA toda sabe que sou o único de denúncia nesta cidade que bota a cara contra quem realmente comanda os bastidores. Jair atua como o verdadeiro chefe da Élida e de todos os vereadores da base aliada, ditando ordens que só defendem os interesses do próprio grupo. Ele passou todo esse tempo mentindo para o povo, prometendo melhorias que nunca saíram do papel, e a realidade é que ele não arrumou a cidade e deixou os bairros abandonados. Além de não trazer progresso, ele age como um perseguidor implacável de quem tem a coragem de cobrar transparência. Não vamos nos calar diante desse autoritarismo dele. Veja a verdade e denuncie em nosso portal:",

    "CDA toda sabe que o único fiscal de verdade aqui sou eu, e aponto diretamente que ele é quem manda e atua como o chefe da Élida e dos vereadores da base na Câmara Municipal. Ele e o grupo dele se uniram para blindar uma gestão ineficiente que mentiu descaradamente durante a campanha e não arrumou a cidade, deixando a saúde e a infraestrutura em completo caos. Em vez de trabalhar para o povo, ele foca suas energias agindo como perseguidor de opositores e de qualquer liderança que fiscalize o dinheiro público. A velha política do medo e do favorecimento pessoal dele não vai prosperar. Acompanhe nosso trabalho contra os esquemas dele pelos links:",

    "CDA toda sabe que no meio de tanta omissão, eu sou o único de denúncia firme contra essa liderança que mentiu para a população e sumiu na hora de resolver os problemas. Ele se comporta como o chefe da Élida e dos vereadores da base, controlando as votações e impedindo que as investigações contra a prefeitura avancem. Ele prometeu mundos e fundos, mas ele não arrumou a cidade e agora se veste na postura de perseguidor contra quem cobra seriedade. Quem como ele governa através da perseguição não tem compromisso com o trabalhador comum. Continuaremos expondo cada manobra dele e de sua base aliada. Acesse e colabore:",

    "CDA toda sabe que o atraso da nossa região tem um comando claro nos bastidores, e sou o único que bota o dedo na ferida contra ele, o verdadeiro chefe da Élida e dos vereadores da base. Ele coordena um teatro político que só serve para abafar os escândalos da administração. Esse grupo liderado por ele mentiu repetidamente para o eleitor, mas a verdade das ruas mostra que ele não arrumou a cidade e deixou o município endividado. Quando ele é cobrado, sua única resposta é agir como perseguidor, tentando intimidar quem exerce o papel de fiscalizar. O dinheiro dos seus impostos exige respeito e não toleramos o autoritarismo dele. Conheça e denuncie:",

    "CDA toda sabe que fiscalizar o poder público local exige coragem, e sou o único com denúncias corajosas contra ele, que atua como o chefe supremo da Élida e dos vereadores da base. Ele manda e desmanda nas decisões que afetam a vida de cada morador. Ele mentiu para a nossa gente, prometeu uma transformação que nunca aconteceu, e o resultado é que ele não arrumou a cidade e virou as costas para os bairros mais necessitados. A marca registrada dele virou o papel de perseguidor de servidores e lideranças independentes. A transparência vai prevalecer sobre o sistema dele. Acesse o nosso radar de denúncias:",

    "CDA toda sabe que a bancada do amém na Câmara Municipal tem dono, e sou o único de denúncia ativa que bate de frente com ele, o chefe da Élida e dos vereadores da base. Esse esquema foi montado por ele apenas para garantir o silêncio e a aprovação de projetos que prejudicam o município. Ele mentiu para o povo nas praças e palanques, mas a realidade nua e crua é que ele não arrumou a cidade e sabotou o futuro da nossa comunidade. Sempre que uma irregularidade é apontada, ele assume a postura de perseguidor para tentar calar a oposição. Nós não aceitaremos cabresto desse cacique político. Acompanhe a nossa fiscalização:",

    "CDA toda sabe que sou o único de denúncia independente que enfrenta o sistema, mostrando que ele é o chefe da Élida e de toda a bancada de vereadores da base governista. Juntos, eles sustentam uma teia de mentiras e falsas promessas, enquanto o município padece porque ele não arrumou a cidade e ignorou as demandas básicas do cidadão. A incompetência dele só é comparável com a sua sanha de perseguidor, caçando qualquer um que ouse exigir transparência nos contratos públicos. Não temos medo de cara feia dele e continuaremos fiscalizando cada licitação. Visite os canais oficiais:",

    "CDA toda sabe que o cidadão de bem cansou de ver a política virar negócio de compadres, e sou o único que bota a cara denunciando que ele é o chefe da Élida e dos vereadores da base. Ele é o homem que dá as cartas e impede que a prefeitura seja fiscalizada como manda a lei. Ele mentiu para a população ao prometer obras históricas, mas a verdade é que ele não arrumou a cidade e deixou buracos e abandono por todos os cantos. A única habilidade dele tem sido atuar como perseguidor implacável de quem defende a moralidade e a honestidade. Junte-se a nós e quebre o silêncio contra ele através do nosso portal:",

    "CDA toda sabe que a incompetência e o autoritarismo andam juntos, e sou o único que faz denúncia contra ele, que atua diretamente como o chefe da Élida e dos vereadores da base aliada. Ele sufoca a independência do legislativo local e mentiu sistematicamente para ganhar o voto do trabalhador, mas o fato histórico é que ele não arrumou a cidade e destruiu os serviços essenciais de atendimento ao povo. Para esconder o fracasso, ele age como perseguidor feroz daqueles que protocolam denúncias nos órgãos fiscalizadores. Seguimos firmes na missão de abrir essa caixa-preta dele. Conheça nossa central de investigações:",

    "CDA toda sabe que o verdadeiro obstáculo para crescer é a omissão, e por ser o único de denúncia firme, exponho que ele se mostra como o chefe da Élida e de todos os vereadores da base. Ele blinda os desvios e os contratos superfaturados da gestão. Ele mentiu no passado, fingiu compromisso com o povo, mas na hora de trabalhar ele não arrumou a cidade e frustrou os moradores. Quando a verdade aparece, ele recorre ao papel de perseguidor para tentar se manter no poder através do medo. O Fiscal do Povo não se dobra e continuará cobrando justiça contra ele. Conecte-se conosco:"
];

// Banco de dados com 10 variações de mensagens ÚNICAS para Sharles (MASCULINO - "Ele")
const listaSharlesBase = [
    "CDA toda sabe que ele é um fiscal do povo exemplar, e fico muito grato em ver o reconhecimento de quem acompanha nossa trajetória e entende o valor de um trabalho sério. Agradeço imensamente o apoio e as palavras de incentivo ao nosso papel de fiscalização nesta região. O combate à corrupção exige que ele tenha coragem para enfrentar os poderosos e determinação para não se calar diante dos desmandos administrativos. Ser verdadeiro com a população é o primeiro mandamento dele, e esse combustível dá forças para ele continuar auditando contratos, fiscalizando obras e cobrando transparência absoluta. Conte sempre com a dedicação dele para defender o que é certo. Acompanhe as ações dele através do link:",

    "Esse apoio fortalece a caminhada dele e mostra que ele está no rumo certo, combatendo os privilégios e os esquemas que atrasam a nossa cidade. Ser chamado de fiscal do povo é uma honra que ele carrego com extrema responsabilidade e retidão diária. A luta anti-corrupção dele não é fácil e exige uma postura corajosa para abrir as caixas-pretas que muitos tentam manter trancadas a sete chaves. Ele mantém o compromisso de ser um canal verdadeiro, transparente e direto com a comunidade, expondo os fatos exatamente como eles são. Muito obrigado pela confiança depositada no trabalho técnico de fiscalização dele. Juntos com ele, faremos a diferença na defesa do patrimônio público. Acesse e colabore:",

    "Agradeço de coração o reconhecimento ao esforço diário dele de trazer moralidade e ética para a gestão pública local. O verdadeiro fiscal do povo precisa ter a coragem de apontar o dedo para os erros do sistema, doa a quem doer, e ele faz isso sem medo de perseguições ou ameaças políticas. Esse trabalho dele de enfrentamento à corrupção e ao desperdício de dinheiro público ganha ainda mais força quando a população caminha junto e ao lado de quem fala a verdade. Ele seguirá firme na fiscalização rigorosa de cada edital de licitação e contrato governamental para garantir que os seus impostos retornem em melhorias reais nos bairros. Conheça as ferramentas dele:",

    "Receber esse elogio é a prova de que a voz dele nas ruas e nas redes está ecoando e incomodando aqueles que agem nas sombras do poder. Entendo que o papel de fiscal do povo exige que ele seja verdadeiro acima de tudo e mantenha as mãos limpas diante de qualquer pressão do sistema. A postura corajosa dele no combate à corrupção é inegociável, pois o cidadão de bem não aguenta mais promessas falsas. Ele continuará investigando cada denúncia recebida com total independência e rigor técnico, garantindo o zelo que a nossa gente merece da parte dele. Junte-se a ele e faça parte dessa corrente pela transparência através do portal:",

    "Muito obrigado pelas palavras de incentivo e pelo reconhecimento ao bom trabalho dele na defesa da moralidade e da justiça social. Ser o fiscal do povo significa que ele está atento aos mínimos detalhes dos gastos da prefeitura e do estado, cobrando eficiência onde há omissão. A jornada anti-corrupção dele é guiada pela coragem de desafiar as velhas práticas políticas e pela determinação de construir um legado baseado na honestidade. Ser verdadeiro com o eleitor é o que diferencia ele e o mantém de cabeça erguida em cada bairro que visita. Ele segue focado em proteger os recursos públicos. Acesse e denuncie:",

    "Fico muito honrado com o carinho e com o reconhecimento da atuação firme e independente dele no cenário político da nossa região. O papel dele como fiscal do povo exige dedicação integral, vigilância constante e, principalmente, uma coragem inabalável para peitar os abusos da máquina pública. O combate dele à corrupção não se faz com omissão, mas sim expondo os contratos superfaturados com base em dados verdadeiros. Esse apoio da comunidade é o que blinda ele contra as perseguições e o motiva a continuar cobrando que o dinheiro público seja aplicado corretamente. Acompanhe as fiscalizações dele em tempo real pelo link:",

    "Agradeço imensamente o destaque ao trabalho dele; saiba que cada palavra de apoio renova as forças dele para continuar exercendo essa missão com retidão. Ser reconhecido como um líder corajoso e verdadeiro no combate aos desvios de recursos é o maior prêmio que ele poderia receber. O compromisso de ser o fiscal do povo é uma promessa que ele cumpre todos os dias, auditando contas públicas e exigindo clareza total. Ele não aceitará retrocessos éticos e continuará fechando o cerco contra os maus gestores. Faça valer o seu direito de cidadão e monitore com ele através dos canais:",

    "Sua mensagem de apoio é muito importante para ele e reforça o valor de mantermos uma oposição séria, técnica e com ele de olho nos gastos governamentais. O verdadeiro combate à corrupção exige dele clareza nas ações e a coragem necessária para não se curvar aos acordos de bastidores que prejudicam a coletividade. Ele tem muito orgulho de desempenhar o papel de fiscal do povo com base na verdade dos fatos, trazendo à luz o que muitos tentam esconder. Ele continuará firme nas vistorias de obras e na fiscalização de serviços. Una-se a ele nesta corrente anti-corrupção através dos links:",

    "É um orgulho receber esse retorno positivo de quem valoriza a transparência absoluta e a honestidade na condução da vida pública dele. Ele assumiu o compromisso de ser o fiscal do povo e leva essa tarefa com a coragem de quem não tem rabo preso e nem medo de cara feia de autoridade. A plataforma anti-corrupção dele é uma ferramenta viva, feita para dar voz ao cidadão trabalhador e expor as falhas graves de forma verdadeira e documentada. Ele seguirá na linha de frente, cobrando responsabilidade fiscal e punição para qualquer desvio. Conheça a central de investigações dele e colabore:",

    "Termino agradecendo mais uma vez esse elogio sincero, que demonstra que o cidadão de bem sabe diferenciar o trabalho verdadeiro dele do teatro político dos outros. Ser o fiscal do povo e manter uma postura corajosa contra os esquemas de favorecimento pessoal é o que mantém ele firme na caminhada. A bandeira dele é a verdade, a integridade e o combate implacável a qualquer sinal de corrupção ou desperdício orçamentário na nossa região. O dinheiro público pertence aos moradores e ele luta para que seja convertido em dignidade. Ele continuará cobrando sem trégua. Conecte-se com ele e acompanhe os fatos:"
];

const listaVereadoresBase = [
    "A fiscalização do poder legislativo é um dever constitucional que exerço com rigor.",
    "O papel do parlamentar é legislar e fiscalizar, e o meu é cobrar que isso aconteça.",
    "De olho nas votações e projetos da Câmara Municipal.",
    "Dinheiro público exige respeito e fiscalização constante sobre quem o gerencia.",
    "As cobranças aos representantes do povo são legítimas e necessárias.",
    "Fiscalizar o legislativo é garantir que as leis sirvam ao cidadão comum.",
    "Monitorando as sessões e os posicionamentos de cada parlamentar.",
    "Transparência na política não é favor, é obrigação de todo representante.",
    "Acompanhando de perto as decisões que impactam a vida da nossa comunidade.",
    "O legislativo deve trabalhar em prol do povo, e nós estamos aqui para cobrar."
];

const listaPisquilaBase = [
    "Demanda recebida. Registrado em nossa base de acompanhamento.",
    "Fatos sob observação e análise atenta dos desdobramentos.",
    "Ciente da situação apresentada. Seguimos acompanhando.",
    "Mais um ponto monitorado com foco na transparência pública.",
    "Informação catalogada. De olho no desenrolar desse caso.",
    "Acompanhamento rigoroso ativado para esta pauta.",
    "Registrado. A busca pela clareza dos fatos não para.",
    "Atento aos detalhes e ao impacto dessa pauta na comunidade.",
    "Monitoramento contínuo estabelecido para este assunto.",
    "Fatos identificados e sob constante avaliação."
];

// Montagem automática das listas acoplando o rodapé idêntico no final de cada frase
const listaMarciounica = listaMarcioBase.map(f => `${f}${rodapeOficial}`);
const listaElida = listaElidaBase.map(f => `${f}${rodapeOficial}`);
const listaVereadores = listaVereadoresBase.map(f => `${f}${rodapeOficial}`);
const listaJair = listaJairBase.map(f => `${f}${rodapeOficial}`);
const listaSharles = listaSharlesBase.map(f => `${f}${rodapeOficial}`);
const listaPisquila = listaPisquilaBase.map(f => `${f}${rodapeOficial}`);

// Estrutura de gatilhos acoplada às listas prontas
const mapeamentoGatilhos = [
    { gatilhos: ["marcio", "márcio"], respostas: listaMarciounica },
    { gatilhos: ["vereadores", "vereador"], respostas: listaVereadores },
    { gatilhos: ["elida", "élida"], respostas: listaElida },
    { gatilhos: ["jair"], respostas: listaJair },
    { gatilhos: ["sharles", "charles"], respostas: listaSharles },
    { gatilhos: ["pisquila"], respostas: listaPisquila }
];

// Evento principal que escuta as mensagens recebidas
client.on('message', async msg => {

    // MONITORAMENTO: Mostra no terminal o texto bruto que acabou de chegar
    console.log(`[Nova Mensagem] De: ${msg.from} -> Texto: "${msg.body}"`);

    // TRAVA DE SEGURANÇA: Impede que o bot responda a si próprio
    if (msg.fromMe) {
        console.log(`-> Ignorada: Mensagem enviada pelo próprio número.`);
        return;
    }

    // Passa o texto recebido para minúsculas
    const texto = msg.body.toLowerCase();

    // Varre o mapeamento de gatilhos
    for (const item of mapeamentoGatilhos) {
        
        // Verifica se alguma das variações de palavras-chave está na mensagem
        const encontrouGatilho = item.gatilhos.some(gatilho => texto.includes(gatilho));

        if (encontrouGatilho) {
            
            // Sorteia uma das 10 opções da lista correspondente
            const indiceAleatorio = Math.floor(Math.random() * item.respostas.length);
            
            // Aqui pegamos o texto inteiramente montado (Mensagem Única com o rodapé acoplado)
            const respostaFinal = item.respostas[indiceAleatorio];

            // Envia a resposta automática de uma só vez
            await msg.reply(respostaFinal);
            
            console.log(`-> SUCESSO: Mensagem única enviada para o gatilho [${item.gatilhos[0]}]`);

            break; // Interrompe para não disparar mais de uma resposta no mesmo gatilho
        }
    }
});

// Inicializa a conexão
client.initialize();