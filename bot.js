const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// Configuração inteligente e otimizada para nuvem e Windows local
const client = new Client({
    authStrategy: new LocalAuth(),
    
    // 🔥 CORREÇÃO DE CONTEXTO: Fixa o bot em uma versão estável e testada do WhatsApp Web
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    },
    
    puppeteer: {
        headless: process.platform === 'win32' ? false : true, // Abre janela no Windows; roda oculto no Linux
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            // 🔥 REMOÇÃO EXTREMA DE RECURSOS PARA CONTER CONSUMO DE RAM (ANTI-ERRO 137 / OUT OF MEMORY)
            '--disable-extensions',
            '--no-default-browser-check',
            '--disable-default-apps',
            '--metrics-recording-only',
            '--password-store=basic',
            '--use-gl=swiftshader',
            '--js-flags="--max-old-space-size=150"', // Limita o lixo de memória do JavaScript de forma ativa
            '--disable-blink-features=AutomationControlled',
            '--disable-audio-output',             // Corta decodificadores de áudio em background
            '--disable-canvas-aa',                 // Desativa anti-aliasing gráfico
            '--disable-2d-canvas-clip-optimization',
            '--disable-gl-drawing-for-tests',
            '--disable-local-storage'
        ],
        executablePath: process.platform === 'win32' ? undefined : '/usr/bin/chromium'
    }
});

// Controle dinâmico de expiração do QR Code para sincronia com a rota /qr do FastAPI
let qrTimeout;

client.on('qr', qr => {
    // Desenha o QR Code em blocos de texto no terminal do Render para controle interno
    qrcode.generate(qr, { small: true });
    
    // Escreve o token puro no arquivo txt para a API ler e renderizar na página web
    fs.writeFileSync('qrcode_atual.txt', qr);
    console.log(`[${new Date().toLocaleTimeString()}] -> QR Code atualizado no servidor. Aguardando scan...`);

    // Ciclo de renovação: se expirar em 30 segundos sem scan, limpa o token para forçar um novo
    clearTimeout(qrTimeout);
    qrTimeout = setTimeout(() => {
        if (fs.existsSync('qrcode_atual.txt')) {
            fs.unlinkSync('qrcode_atual.txt');
            console.log('-> Código antigo expirado no servidor. Preparando renovação estável...');
        }
    }, 30000); 
});

client.on('ready', () => {
    clearTimeout(qrTimeout);
    console.log('\n====================================');
    console.log('       BOT M GRUPO ONLINE           ');
    console.log('====================================\n');
    if (fs.existsSync('qrcode_atual.txt')) {
        fs.unlinkSync('qrcode_atual.txt');
    }
});

// Rodapé unificado com a identidade das marcas e canais oficiais do conglomerado
const rodapeGrupo = `

M GRUPO

http://mgrupo.online

http://mgrupo.online/KM-Projetos/index.html

http://mgrupo.online/MAZZ-Cursos/index.html

http://mgrupo.online/MR-Treinamentos/index.html

http://mgrupo.online/RAZGO-Tecnologia/index.html

---
O M GRUPO atua com excelência e rigor técnico entregando soluções completas nas áreas de:\n\n• Engenharias\n• Desenvolvimento de tecnologias inovadoras\n• Cursos profissionalizantes de alta performance\n• Suporte especializado na área acadêmica (orientação de estágios e TCC).`;

// Banco de dados estratégico contendo as 10 variações textuais únicas (Foco comercial e Anti-Spam)
const listaVendasBase = [
    "Olá! Seja muito bem-vindo ao nosso canal de atendimento. Eu lidero o desenvolvimento de soluções robustas para o mercado, integrando serviços de alto nível e conectando você direto com as nossas plataformas especializadas. Se você busca fechar negócios ou contratar projetos de qualidade, está no lugar certo. Conheça o ecossistema que criei para transformar suas ideias em resultados:",
    "Se você está procurando serviços comerciais, suporte especializado ou quer fechar uma parceria de negócios, eu garanto as melhores soluções do mercado. Nós unimos técnica, inovação e compromisso para entregar o que há de mais moderno em infraestrutura e inovação digital. Acesse os canais oficiais do nosso conglomerado abaixo para conhecer nosso portfólio completo:",
    "Seja bem-vindo! Eu atuo no mercado trazendo as respostas ideais para as demandas da nossa região, sempre com alta capacidade técnica e portfólios diversificados para empresas e profissionais. Se o seu foco é contratar serviços de alto padrão ou alavancar seu conhecimento, confira as plataformas que gerencio diretamente nos links a seguir:",
    "Olá! Quero te apresentar os caminhos para transformar as necessidades da sua empresa ou carreira em projetos reais e eficientes. Eu conduzo nossas divisões comerciais para entregar soluções rápidas, seguras e com o melhor custo-benefício. Descubra os portais que conectam você diretamente ao futuro do mercado regional:",
    "Se você busca excelência, atendimento personalizado e serviços sob medida, eu coloco à sua disposição a estrutura comercial mais completa do mercado. Através das nossas marcas, oferecemos serviços estratégicos e suporte técnico especializado para todas as frentes de negócios. Acesse o nosso hub oficial nos endereços:",
    "Seja muito bem-vindo! Eu entendo que o mercado exige soluções dinâmicas e integradas, e por isso consolidei nossa atuação com foco em resultados práticos e eficientes para você e sua empresa. Seja para contratar projetos complexos ou expandir horizons, use nossos portais oficiais para dar o próximo passo de sucesso:",
    "Olá! Eu trabalho com foco total na entrega de soluções inovadoras, garantindo a solidez que o seu negócio ou projeto precisa para crescer com segurança. Nossa presença no mercado é sustentada pela versatilidade e capacitação constante do nosso time técnico. Conheça e explore as frentes de atuação de nossa estrutura empresarial:",
    "Se você procura fechar contratos com quem entende do assunto, eu coloco nossa experiência à sua disposição para solucionar as demandas mais exigentes do setor. Nossa carteira de serviços cobre as principais necessidades técnicas e de capacitação corporativa atuais. Conecte-se com as plataformas oficiais que desenvolvemos:",
    "Seja bem-vindo! Eu tenho o compromisso de trazer soluções comerciais de ponta e projetos estratégicos que fazem a diferença na prática. Seja para suporte corporativo, consultoria especializada ou desenvolvimento de produtos, nossa estrutura centraliza o atendimento nos links abaixo para facilitar o seu acesso:",
    "Olá! Se o assunto é fechar negócios de sucesso, eu garanto o suporte comercial e a entrega técnica que você procura. Nossas divisões cobrem os principais pilares de desenvolvimento mercadológico e capacitação profissional da nossa região. Participe, conheça e faça orçamentos diretamente através do nosso radar de links:"
];

const listaVendasUnica = listaVendasBase.map(f => `${f}${rodapeGrupo}`);

// Mapeamento completo de gatilhos corporativos do M GRUPO
const mapeamentoGatilhos = [
    { 
        gatilhos: ["vendas", "venda", "comprar", "preço", "preco", "orçamento", "orcamento", "projeto", "curso", "treinamento", "estágio", "estagio", "tcc", "contratar", "empresa", "grupo"], 
        respostas: listaVendasUnica 
    }
];

// Monitoramento e processamento de mensagens em tempo real
client.on('message', async msg => {
    console.log(`[Nova Mensagem] De: ${msg.from} -> Texto: "${msg.body}"`);
    
    if (msg.fromMe) return;

    const texto = msg.body.toLowerCase();

    for (const item of mapeamentoGatilhos) {
        const encontrouGatilho = item.gatilhos.some(gatilho => texto.includes(gatilho));

        if (encontrouGatilho) {
            const indiceAleatorio = Math.floor(Math.random() * item.respostas.length);
            const respostaFinal = item.respostas[indiceAleatorio];
            
            await msg.reply(respostaFinal);
            console.log(`-> SUCESSO: Resposta do M GRUPO enviada para o gatilho comercial.`);
            break;
        }
    }
});

client.initialize();
