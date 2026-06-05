# 1. Imagem base
FROM node:24.14.0    

WORKDIR /app

# 2. Copia a pasta shared para a raiz do container
# Isso permite que o frontend a encontre em ../shared como definido no tsconfig.json
COPY shared ./shared

# 3. Define o diretório de trabalho para o frontend
WORKDIR /app/frontend

# 4. Copia apenas os arquivos de dependência primeiro (otimização de cache)
COPY frontend/package.json frontend/package-lock.json* ./

# 5. Instala todas as dependências (necessárias para o build)
RUN npm install

# 6. Copia o restante do código do frontend
COPY frontend/ .

# 7. Executa o build do Next.js
RUN npm run build

EXPOSE 3000

# 8. Inicia a aplicação
CMD [ "npm", "run",  "start" ]
