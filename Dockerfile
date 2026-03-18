FROM node:20-alpine AS build

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build para produção
RUN npm run build

# Debug: mostrar estrutura para garantir que dist existe
RUN ls -la /app/dist

FROM nginx:1.25-alpine

RUN apk add --no-cache curl

# Copiar build da etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html/

# Debug: verificar o que foi copiado
RUN echo "=== ARQUIVOS COPIADOS ===" && ls -la /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
