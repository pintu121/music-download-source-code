# Backend
FROM node:14 as backend

WORKDIR /app/backend

COPY backend/package.json ./
RUN npm install
COPY backend ./

# Frontend
FROM node:14 as frontend

WORKDIR /app/frontend

COPY frontend/package.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Combine
FROM node:14

WORKDIR /app

COPY --from=backend /app/backend ./
COPY --from=frontend /app/frontend/build ./frontend/build

EXPOSE 5000

CMD ["node", "app.js"]
