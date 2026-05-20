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

# M GRUPO

O **M GRUPO** atua com excelência e rigor técnico entregando soluções completas nas áreas de:

* ** Engenharias**
* ** Educação**
* ** Desenvolvimento de Tecnologias Inovadoras**

---

## Instalação e Execução Local

Siga os passos abaixo sequencialmente para rodar o ambiente de desenvolvimento:

### 1. Clonar o Repositório

```bash
git clone https://github.com/marcio-dev-fullstack/Bot.git
cd Bot

```

### 2. Configurar os Ambientes e Dependências

Instale os pacotes necessários tanto para a runtime do Node.js quanto para o ecossistema Python:

```bash
# Instala dependências do ecossistema JavaScript
npm install

# Instala dependências do ecossistema Python
pip install -r requirements.txt

```

### 3. Inicialização dos Serviços

Abra dois terminais no seu VS Code para rodar os serviços concorrentes:

* **Terminal 1 (Assistente WhatsApp):**
```bash
node bot.js

```


>  **Nota:** Escaneie o QR Code gerado diretamente no terminal para autenticar o aparelho corporativo.


* **Terminal 2 (API Backend):**
```bash
uvicorn main:app --reload

```



---

##  Produção e Deploy no Render

O deploy na nuvem é gerenciado de forma 100% automatizada via **Dockerfile**.

>  **Otimização de Segurança:** Graças aos filtros configurados no `.gitignore`, os dados pesados de cache do navegador local são totalmente descartados. O deploy envia para o servidor apenas o token criptografado essencial de autenticação (`.wwebjs_auth`), preservando a sessão ativa.

###  Fluxo de Automação do Dockerfile

O blueprint de build executa as seguintes etapas sequenciais na nuvem durante o deploy:

1. **Base OS:** Provisiona o ambiente oficial isolado `Python 3.11 Slim`.
2. **Browsers:** Injeta as dependências estáveis e bibliotecas do Chromium moderno (`Debian Trixie`).
3. **Runtimes:** Instala a runtime do `Node.js v18` de forma independente.
4. **Packages:** Instala e sincroniza os pacotes via `NPM` e Python `PIP`.
5. **Auth:** Importa o token da sessão local estável para evitar novas leituras de QR Code.
6. **Engine:** Inicializa os serviços concorrentes, rodando a API FastAPI e o Bot lado a lado.

---

Créditos e Desenvolvimento

**Desenvolvido e Gerenciado por Márcio Rodrigues de Oliveira** 

*Engenheiro de Software | Engenheiro Civil | Engenheiro de Segurança do Trabalho*

```
