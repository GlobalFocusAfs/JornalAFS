# Jornal Escolar - EEEP Adolfo Ferreira de Sousa

Este é o site do jornal escolar da EEEP Adolfo Ferreira de Sousa, Redenção-CE.

## Estrutura do Projeto

- \ackend/\: API Java Spring Boot
- \rontend/\: Aplicação React

## Pré-requisitos

- Java 17
- Maven
- Node.js
- Docker (opcional, para MongoDB local)

## Configuração

### Backend

1. Navegue até a pasta `backend/`
2. Copie o arquivo `.env.example` para `.env`:
   ```
   cp .env.example .env
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   - `MONGODB_URI`: URI de conexão com o MongoDB
   - `CLOUDINARY_CLOUD_NAME`: Nome da cloud no Cloudinary
   - `CLOUDINARY_API_KEY`: Chave API do Cloudinary
   - `CLOUDINARY_API_SECRET`: Segredo API do Cloudinary

   **Nota**: Nunca commite o arquivo `.env` no repositório, pois contém informações sensíveis.

4. Execute o projeto:
   ```bash
   mvn spring-boot:run
   ```

### Frontend

1. Navegue até a pasta `frontend/`
2. Copie o arquivo `.env.example` para `.env` (se existir) ou crie um arquivo `.env`:
   ```
   cp .env.example .env
   ```
3. Configure a URL da API no arquivo `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Execute o projeto:
   ```bash
   npm start
   ```

## Deploy

### Backend no Render

1. Conecte o repositório no Render
2. Use o Dockerfile para build
3. Configure as variáveis de ambiente no Render

### Frontend no Vercel

1. Conecte o repositório no Vercel
2. Configure a variável de ambiente \REACT_APP_API_URL\ com a URL do backend
3. Deploy automático

## Banco de Dados

O projeto usa MongoDB Atlas. Para desenvolvimento local, pode-se usar o Docker com:

\\\ash
docker-compose up -d
\\\

## Licença

Este projeto é para uso educacional da EEEP Adolfo Ferreira de Sousa.
