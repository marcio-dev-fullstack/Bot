![Status do Deploy](https://img.shields.io/badge/Render-Live-brightgreen?style=for-the-badge&logo=render)
![Tecnologia](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Ambiente](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Plataforma](https://img.shields.io/badge/WhatsApp_Web.js-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

# ROBÔ ZAP — Inteligência Comercial & Automação 

Conjunto de microsserviços corporativos que integra uma API de monitoramento em Python (FastAPI) a um assistente inteligente em Node.js (WhatsApp-Web.js) focado em conversão de leads, vendas e direcionamento estratégico de clientes.

---

## Stack Tecnológica

| Camada | Tecnologia | Função Principal |
| :--- | :--- | :--- |
| **Backend** | Python 3.11 / FastAPI / Uvicorn | API assíncrona para monitoramento e rotas de controle. |
| **Automação** | Node.js v18 / WhatsApp-Web.js | Core do bot e manipulação do Puppeteer em modo Headless. |
| **Infraestrutura** | Docker / Debian Slim Environment | Containerização estável e isolamento de dependências. |
| **Cloud** | Render Web Services | Hospedagem em nuvem com esteira de deploy automático. |

---

## Lógica de Atendimento (Anti-Spam)

O assistente virtual monitora as mensagens recebidas e, ao detectar um gatilho válido, realiza um sorteio algorítmico 
entre **10 variações de textos comerciais em primeira pessoa ("Eu")**. Essa abordagem humaniza o fluxo e previne bloqueios na plataforma.

### Palavras-Chave Rastreadas
Escolha as suas

### Formato de Saída (WhatsApp)
```text
[Mensagem Comercial Humanizada Sorteada]

M GRUPO

## Arquitetura Híbrida do Projeto

O sistema opera através de uma arquitetura paralela e otimizada (Lado a Lado) embarcada em um container Docker,
garantindo o máximo aproveitamento dos recursos em nuvem:


```

```
              ┌────────────────────────────────────────┐
              │          DOCKER CONTAINER (Render)     │
              └────────────────────┬───────────────────┘
                                   │
            ┌──────────────────────┴──────────────────────┐
            ▼                                             ▼
 [ API Backend - Python ]                       [ Assistente Virtual ]
        FastAPI                                    WhatsApp-Web.js

```

📌 Rotas de Monitoramento 

📌 Gatilhos Comerciais Ativos

📌 Painel Web de Controle      

📌 Rotação de Mensagens Únicas

📌 Endpoint de Sincronização    

📌 Persistência de Sessão Segura

```

O M GRUPO atua com excelência e rigor técnico entregando soluções completas nas áreas de:
• Engenharias
• Desenvolvimento de tecnologias inovadoras

---

## Instalação e Execução Local

### 1. Clonar o Repositório

```bash
git clone [https://github.com/marcio-dev-fullstack/Bot.git](https://github.com/marcio-dev-fullstack/Bot.git)
cd Bot

```

### 2. Configurar Dependências do Node.js

```bash
npm install

```

### 3. Configurar Dependências do Python

```bash
pip install -r requirements.txt

```

### 4. Executar o Assistente Localmente (Gerando Sessão)

```bash
node bot.js

```

> *Escaneie o QR Code gerado diretamente no terminal do seu VS Code para validar o acesso do aparelho corporativo.*

### 5. Executar a API Localmente

```bash
uvicorn main:app --reload

```

## Produção e Deploy no Render

O deploy é gerenciado de forma automatizada via Dockerfile. Graças ao filtro configurado no `.gitignore`, os dados pesados de cache do navegador local são descartados, enviando para o servidor apenas o token criptografado essencial de autenticação (`.wwebjs_auth`).

### Automação do Dockerfile

O blueprint de build executa as seguintes etapas sequenciais na nuvem:

1. Provisiona ambiente oficial `Python 3.11 Slim`.
2. Injeta dependências estáveis do Chromium moderno (`Debian Trixie`).
3. Instala a runtime do `Node.js v18` de forma isolada.
4. Instala os pacotes de dependências via `NPM` e Python `PIP`.
5. Sincroniza o token de sessão local estável.
6. Inicializa os serviços concorrentes rodando o FastAPI e o Bot lado a lado.

> *Para monitorar a saúde do sistema na nuvem ou checar o status da aplicação, acesse o painel principal na URL de produção configurada no Render.*

---

## Créditos e Desenvolvimento

**Desenvolvido e Gerenciado por Márcio Rodrigues de Oliveira** 

*Engenheiro de Software | Engenheiro Civil | Engenheiro de Segurança do Trabalho*

```
