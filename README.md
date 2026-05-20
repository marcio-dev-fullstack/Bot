# M GRUPO - Inteligência Comercial & Atendimento Automatizado

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

---

## Stack Tecnológica

* **Backend & API:** Python 3.11 / FastAPI / Uvicorn
* **Automação e Bot:** Node.js v18 / WhatsApp-Web.js / Puppeteer (Headless Chromium)
* **Contenerização:** Docker (Debian Slim Environment)
* **Deploy Cloud:** Render Web Services

---

## Sistema de Gatilhos Inteligentes

O assistente virtual monitora as mensagens recebidas em tempo real. Sempre que palavras-chave ligadas à conversão e negócios são detectadas, o robô realiza um sorteio algorítmico entre **10 variações de mensagens comerciais únicas em primeira pessoa ("Eu")**. 

Isso humaniza o atendimento e blinda o número contra políticas de spam do WhatsApp.

### Gatilhos Rastreados:
`vendas` | `venda` | `comprar` | `preço` | `preco` | `orçamento` | `orcamento` | `projeto` | `curso` | `treinamento` | `estágio` | `estagio` | `tcc` | `contratar` | `empresa` | `grupo`

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

Instalação e Execução Local
1. Clonar o Repositório:
git clone [https://github.com/marcio-dev-fullstack/Bot.git](https://github.com/marcio-dev-fullstack/Bot.git)
cd Bot

2. Configurar Dependências do Node.js:
npm install

3. Configurar Dependências do Python:
pip install -r requirements.txt

4. Executar o Assistente Localmente (Gerando Sessão):
node bot.js
Escaneie o QR Code gerado diretamente no terminal do seu VS Code para validar o acesso do aparelho corporativo.

5. Executar a API Localmente:
uvicorn main:app --reload

Produção e Deploy no Render
O deploy é gerenciado de forma automatizada via Dockerfile. Graças ao filtro configurado no .gitignore, 
os dados pesados de cache do navegador local são descartados, enviando para o servidor apenas o token 
criptografado essencial de autenticação (.wwebjs_auth).

Dockerfile
# O Dockerfile automatiza as seguintes etapas na nuvem:
1. Provisiona ambiente Python 3.11 Slim
2. Instala dependências de sistema do Chromium moderno (Debian Trixie)
3. Injeta a runtime do Node.js v18 de forma isolada
4. Instala os pacotes de NPM e Python PIP
5. Sincroniza a sessão autenticada localmente
6. Inicializa os serviços concorrentes via Uvicorn & Node

Para monitorar a saúde do sistema na nuvem ou checar o status da aplicação, acesse o painel principal na URL de produção configurada no Render.

Desenvolvido e Gerenciado por Márcio Rodrigues de Oliveira Engenheiro Civil | Engenheiro de Software | Engenheiro de Segurança do Trabalho
