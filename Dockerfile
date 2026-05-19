# 1. Usa uma imagem oficial do Python estável
FROM python:3.11-slim

# 2. Instala o Node.js, NPM e as dependências que o Chromium do WhatsApp exige no Linux
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    libgbm-dev \
    wget \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 3. Define a pasta de trabalho dentro do servidor
WORKDIR /app

# 4. Copia os arquivos de dependências primeiro (para cache do Docker)
COPY package*.json ./
COPY requirements.txt ./

# 5. Instala as dependências do Node e do Python
RUN npm install
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copia o restante dos códigos (bot.js, main.py, etc)
COPY . .

# 7. Define variáveis de ambiente para o Puppeteer encontrar o Chromium do Linux
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# 8. Comando que inicia o FastAPI e o Bot do WhatsApp LADO A LADO no servidor
CMD uvicorn main:app --host 0.0.0.0 --port $PORT & node bot.js