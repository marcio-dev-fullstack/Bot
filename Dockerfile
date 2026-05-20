# Use uma imagem estável com Python e Linux atualizados
FROM python:3.11-slim-bookworm

# Evita que o Python grave arquivos .pyc e força saída em tempo real nos logs
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências do sistema, Chromium e configura o repositório moderno do Node.js (v18)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    libgconf-2-4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    --no-install-recommends \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Cria o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração de pacotes primeiro (otimiza o cache do Render)
COPY package*.json ./
COPY requirements.txt ./

# Instala as dependências do Node e do Python
RUN npm install
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante dos arquivos do projeto (incluindo a pasta .wwebjs_auth)
COPY . .

# Expõe a porta que o FastAPI usa
EXPOSE 10000

# Comando para rodar a API em Python e o Bot em Node.js juntos em segundo plano
CMD node bot.js & uvicorn main:app --host 0.0.0.0 --port 10000
