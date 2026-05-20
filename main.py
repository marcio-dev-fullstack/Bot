from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import os

# Inicialização do app FastAPI
app = FastAPI(
    title="M GRUPO - API Central de Monitoramento",
    description="Backend de controle concorrente para monitoramento de rotas e integração com assistente virtual.",
    version="1.0.0"
)

# Configuração de CORS para permitir requisições de qualquer origem, se necessário
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota Raiz (Health Check) para o Render saber que a API está online
@app.get("/")
async def root():
    return {
        "status": "online",
        "empresa": "M GRUPO",
        "servicos": ["KM Projetos", "RAZGO Tecnologia", "MAZZ Cursos", "MR Treinamentos"]
    }

# 🔥 ROTA EXCLUSIVA /QR PARA ACESSAR E ESCANEAR O WHATSAPP
@app.get("/qr", response_class=HTMLResponse)
async def get_qr_code():
    caminho_arquivo = "qrcode_atual.txt"
    
    # Caso o arquivo de texto com o token do QR Code ainda não exista
    if not os.path.exists(caminho_arquivo):
        return """
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>M GRUPO - Conectar WhatsApp</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; margin-top: 100px; background-color: #f4f6f9; color: #333; }
                    .container { background: white; padding: 40px; display: inline-block; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); max-width: 450px; }
                    .spinner { border: 4px solid rgba(0, 150, 136, 0.1); width: 40px; height: 40px; border-radius: 50%; border-left-color: #009688; animation: spin 1s linear infinite; margin: 20px auto; }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    h2 { color: #222; margin-bottom: 5px; }
                </style>
                <script>
                    // Tenta recarregar a página a cada 5 segundos até encontrar o QR Code
                    setTimeout(function() { location.reload(); }, 5000);
                </script>
            </head>
            <body>
                <div class="container">
                    <h2>M GRUPO</h2>
                    <p style="color: #009688; font-weight: 600;">Inicializando o assistente virtual...</p>
                    <div class="spinner"></div>
                    <p style="color: #666; font-size: 14px;">A gerar o código de emparelhamento no servidor. Esta página vai atualizar automaticamente em instantes.</p>
                </div>
            </body>
        </html>
        """
        
    # Lê o token do QR Code gerado pelo bot.js
    with open(caminho_arquivo, "r") as f:
        qr_data = f.read().strip()
        
    # Se o arquivo existir mas estiver vazio, aguarda a escrita do token
    if not qr_data:
        return """
        <script>setTimeout(function() { location.reload(); }, 2000);</script>
        <p>A carregar dados do QR Code...</p>
        """
        
    # Renderiza a página oficial com o gerador dinâmico do qrcode.show
    return f"""
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>M GRUPO - Conectar WhatsApp</title>
            <style>
                body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; margin-top: 50px; background-color: #f4f6f9; color: #333; }}
                .container {{ background: white; padding: 40px; display: inline-block; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); max-width: 500px; }}
                h2 {{ color: #111; margin-bottom: 2px; letter-spacing: 0.5px; }}
                h3 {{ color: #009688; margin-top: 0; margin-bottom: 25px; font-weight: 500; font-size: 16px; }}
                img {{ border: 1px solid #e1e4e8; padding: 12px; border-radius: 12px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }}
                p {{ color: #444; font-size: 15px; line-height: 1.5; }}
                .alert {{ background: #e0f2f1; color: #00796b; padding: 10px; border-radius: 8px; font-size: 13px; font-weight: bold; margin-bottom: 20px; }}
            </style>
            <script>
                // O código do WhatsApp Web expira a cada 20 segundos. Atualiza para garantir sincronia.
                setTimeout(function() {{ location.reload(); }}, 20000);
            </script>
        </head>
        <body>
            <div class="container">
                <h2>M GRUPO</h2>
                <h3>Inteligência Comercial & Automação</h3>
                
                <div class="alert">Aparelho pronto para emparelhamento</div>
                
                <p>Abra o WhatsApp no seu telemóvel, aceda a <b>Aparelhos Conectados</b>, clique em <b>Conectar um aparelho</b> e aponte a câmara para o código abaixo:</p>
                <br>
                <img src="https://qrcode.show/{qr_data}" alt="WhatsApp QR Code" width="280" height="280">
                <br>
                <p style="color: #777; font-size: 12px; margin-top: 25px;">Esta página renova o ecrã automaticamente para evitar códigos expirados.</p>
            </div>
        </body>
    </html>
    """
