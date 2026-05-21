const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// Configuração robusta e inteligente: abre o navegador no seu PC e roda oculto e leve no Render
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: process.platform === 'win32' ? false : true, // Abre a janela no Windows; roda em background no Linux
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            // 🔥 ARGUMENTOS CRÍTICOS PARA REDUZIR CONSUMO DE MEMÓRIA NO RENDER (ANTI-ERRO 137)
            '--disable-extensions',
            '--no-default-browser-check',
            '--disable-default-apps',
            '--metrics-recording-only',
            '--force-device-scale-factor=1',
            '--disable-background-networking',
            '--password-store=basic',
            '--use-gl=swiftshader'
        ],
        executablePath: process.platform === 'win32' ? undefined : '/usr/bin/chromium'
    }
});

// Controle de expiração do QR Code para evitar travamento na nuvem
let qrTimeout;

client.on('qr', qr => {
    // Desenha o QR Code no terminal do Render caso queira acompanhar por lá
    qrcode.generate(qr, { small: true });
    
    // Salva o token atual para o FastAPI ler e exibir na página /qr
    fs.writeFileSync('qrcode_atual.txt', qr);
    console.log(`[${new Date().toLocaleTimeString()}] -> QR Code atualizado no servidor. Aguardando scan...`);

    // 🔥 Monitoramento ativo: se o código expirar em 30 segundos, limpa o token antigo para forçar renovação
    clearTimeout(qrTimeout);
    qrTimeout = setTimeout(() => {
        if (fs.existsSync('qrcode_atual.txt')) {
            fs.unlinkSync('qrcode_atual.txt');
            console.log('-> Código antigo expirado no servidor. Preparando nova requisição...');
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

// Rodapé oficial unificado com todos os links das suas marcas e empresas
const rodapeGrupo = `

M GRUPO

http://mgrupo.online

http://mgrupo.online/KM-Projetos/index.html

http://mgrupo.online/MAZZ-Cursos/index.html

http://mgrupo.online/MR-Treinamentos/index.html

http://mgrupo.online/RAZGO-Tecnologia/index.html

---
O M GRUPO atua com excelência e rigor técnico entregando soluções completas nas áreas de:\n\n• Engenharias\n• Desenvolvimento de tecnologias inovadoras\n• Cursos profissionalizantes de alta performance\n• Suporte especializado na área acadêmica (orientação de estágios e TCC).`;

// Banco de dados com as 10 variações de mensagens comerciais únicas (Anti-Spam)
const listaVendasBase = [
    "Olá! Seja muito bem-vindo ao nosso canal de atendimento. Eu lidero o desenvolvimento de soluções robustas para o mercado, integrando serviços de alto nível e conectando você direto com as nossas plataformas especializadas. Se você busca fechar negócios ou contratar projetos de qualidade, está no lugar certo. Conheça o ecossistema que criei para transformar suas ideias em resultados:",
    "Se você está procurando serviços comerciais, suporte especializado ou quer fechar uma parceria de negócios, eu garanto as melhores soluções do mercado. Nós unimos técnica, inovação e compromisso para entregar o que há de mais moderno em infraestrutura e inovação digital. Acesse os canais oficiais do nosso conglomerado abaixo para conhecer nosso portfólio completo:",
    "Seja bem-vindo! Eu atuo no mercado trazendo as respostas ideais para as demandas da nossa região, sempre com alta capacidade técnica e portfólios diversificados para empresas e profissionais. Se o seu foco é contratar serviços de alto padrão ou alavancar seu conhecimento, confira as plataformas que gerencio diretamente nos links a seguir:",
    "Olá! Quero te apresentar os caminhos para transformar as necessidades da sua empresa ou carreira em projetos reais e eficientes. Eu conduzo nossas divisões comerciais para entregar soluções rápidas, seguras e com o melhor custo-benefício. Descubra os portais que conectam você diretamente ao futuro do mercado regional:",
    "Se você busca excelência, atendimento personalizado e serviços sob medida, eu coloco à sua disposição a estrutura comercial mais completa do mercado. Através das nossas marcas, oferecemos serviços estratégicos e suporte técnico especializado para todas as frentes de negócios. Acesse o nosso hub oficial nos endereços:",
    "Seja muito bem-vindo! Eu entendo que o mercado exige soluções dinâmicas e integradas, e por isso consolidei nossa atuação com foco em resultados práticos e eficientes para você e sua empresa. Seja para contratar projetos complexos ou expandir horizontes, use nossos portais oficiais para dar o próximo passo de sucesso:",
    "Olá! Eu trabalho com foco total na entrega de soluções inovadoras, garantindo a solidez que o seu negócio ou projeto precisa para crescer com segurança. Nossa presença no mercado é sustentada pela versatilidade e capacitação constante do nosso time técnico. Conheça e explore as frentes de atuação de nossa estrutura empresarial:",
    "Se você procura fechar contratos com quem entende do assunto, eu coloco nossa experiência à sua disposição para solucionar as demandas mais exigentes do setor. Nossa carteira de serviços cobre as principais necessidades técnicas e de capacitação corporativa atuais. Conecte-se com as plataformas oficiais que desenvolvemos:",
    "Seja bem-vindo! Eu tenho o compromisso de trazer soluções comerciais de ponta e projetos estratégicos que fazem a diferença na prática. Seja para suporte corporativo, consultoria especializada ou desenvolvimento de produtos, nossa estrutura centraliza o atendimento nos links abaixo para facilitar o seu acesso:",
    "Olá! Se o assunto é fechar negócios de sucesso, eu garanto o suporte comercial e a entrega técnica que você procura. Nossas divisões cobrem os principais pilares de desenvolvimento mercadológico e capacitação profissional da nossa região. Participe, conheça e faça orçamentos diretamente através do nosso radar de links:"
];

const listaVendasUnica = listaVendasBase.map(f => `${f}${rodapeGrupo}`);

// Mapeamento de gatilhos de palavras-chave comerciais do M GRUPO
const mapeamentoGatilhos = [
    { 
        gatilhos: ["vendas", "venda", "comprar", "preço", "preco", "orçamento", "orcamento", "projeto", "curso", "treinamento", "estágio", "estagio", "tcc", "contratar", "empresa", "grupo"], 
        respostas: listaVendasUnica 
    }
];

// Monitoramento e resposta de mensagens recebidas em tempo real
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
