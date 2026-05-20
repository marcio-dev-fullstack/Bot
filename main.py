from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Painel Fiscal do Povo")

# Libera o CORS para futuros painéis em React/Flutter
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def home():
    return {
        'status': 'online',
        'sistema': 'MÁRCIO "O FISCAL DO POVO"',
        'modulo_web': 'FastAPI operando com sucesso',
        'modulo_bot': 'WhatsApp monitorando em segundo plano'
    }

@app.get('/api/status')
def status():
    return {
        'ok': True,
        'autor': 'Marcio',
        'plataforma': 'Render Cloud'
    }