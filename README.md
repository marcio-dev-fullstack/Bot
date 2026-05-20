```markdown
# #️M GRUPO - Inteligência Comercial & Atendimento Automatizado

![Status do Deploy](https://img.shields.io/badge/Render-Live-brightgreen?style=for-the-badge&logo=render)
![Tecnologia](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Ambiente](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Plataforma](https://img.shields.io/badge/WhatsApp_Web.js-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

> Solução corporativa de última geração que integra uma API de alta performance em Python para monitoramento e um assistente inteligente em Node.js focado em conversão, vendas e direcionamento estratégico de clientes.

---

## Sobre o M GRUPO

O **M GRUPO** atua com excelência e rigor técnico, entregando soluções completas e integradas que impulsionam o desenvolvimento regional e tecnológico. O ecossistema unifica grandes marcas sob uma única central inteligente de atendimento:

* **KM Projetos & Engenharia:** Desenvolvimento de projetos arquitetônicos, engenharia civil estrutural e consultorias técnicas.
* **RAZGO Tecnologia:** Criação de marcas digitais, infraestrutura de software, portfólios e soluções full-stack de ponta.
* **MAZZ Cursos:** Capacitação profissional, treinamentos avançados de alta performance e formação técnica.
* **MR Treinamentos:** Desenvolvimento especializado em Segurança do Trabalho e conformidade com as Normas Regulamentadoras (NRs).
* **Divisão Acadêmica:** Suporte especializado e mentoria para estágios e desenvolvimento de Trabalhos de Conclusão de Curso (TCC).

---

## Arquitetura Híbrida do Projeto

O sistema opera através de uma arquitetura paralela e otimizada (Lado a Lado) embarcada em um container Docker, garantindo o máximo aproveitamento dos recursos em nuvem:


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

📌 Rotas de Monitoramento                      📌 Gatilhos Comerciais Ativos
📌 Painel Web de Controle                      📌 Rotação de Mensagens Únicas
📌 Endpoint de Sincronização                   📌 Persistência de Sessão Segura

```

---

## Stack Tecnológica

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend & API** | Python 3.11 / FastAPI / Uvicorn | Serviço assíncrono de alta performance para monitoramento. |
| **Automação & Bot** | Node.js v18 / WhatsApp-Web.js | Core do assistente virtual utilizando Puppeteer (Headless). |
| **Contenerização** | Docker | Ambiente Debian Slim isolado e padronizado. |
| **Deploy Cloud** | Render Web Services | Hospedagem em nuvem com integração contínua (CI/CD). |

---

## Sistema de Gatilhos Inteligentes

O assistente virtual monitora as mensagens recebidas em tempo real. Sempre que palavras-chave ligadas à conversão e negócios são detectadas, o robô realiza um sorteio algorítmico entre **10 variações de mensagens comerciais únicas em primeira pessoa ("Eu")**. 

Isso humaniza o atendimento e blinda o número contra políticas de spam do WhatsApp.

### Gatilhos Rastreados:
`vendas` | `venda` | `comprar` | `preço` | `preco` | `orçamento` | `orcamento` | `projeto` | `curso` | `treinamento` | `estágio` | `estagio` | `tcc` | `contratar` | `empresa` | `marcio` | `engenheria` | `civil` | `site` | `zap` | `whastapp`

### Estrutura de Resposta Padrão:
Cada interação entrega uma introdução comercial personalizada e acopla automaticamente a central de links oficial do grupo no encerramento:

```text
[Mensagem Comercial Humanizada Sorteada]

M GRUPO
[http://mgrupo.online](http://mgrupo.online)
[http://mgrupo.online/KM-Projetos/index.html](http://mgrupo.online/KM-Projetos/index.html)
[http://mgrupo.online/MAZZ-Cursos/index.html](http://mgrupo.online/MAZZ-Cursos/index.html)
[http://mgrupo.online/MR-Treinamentos/index.html](http://mgrupo.online/MR-Treinamentos/index.html)
[http://mgrupo.online/RAZGO-Tecnologia/index.html](http://mgrupo.online/RAZGO-Tecnologia/index.html)

---

O M GRUPO atua com excelência e rigor técnico entregando soluções completas nas áreas de:  
• Engenharias  
• Desenvolvimento de tecnologias inovadoras  
• Cursos profissionalizantes de alta performance  
• Suporte especializado na área acadêmica (orientação de estágios e TCC).

```

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

---

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

**Desenvolvido e Gerenciado por Márcio Rodrigues de Oliveira** *Engenheiro de Software | Engenheiro Civil | Engenheiro de Segurança do Trabalho*

```

---

### Como atualizar o seu portfólio agora:
Abra o terminal do seu VS Code e execute o comando agrupado abaixo para atualizar o repositório no GitHub de forma limpa:

```bash
git add README.md && git commit -m "Docs: README.md completamente estilizado em Markdown" && git push origin main --force

```
