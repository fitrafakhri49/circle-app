# Gunakan Node versi LTS
FROM node:20-alpine

# Buat folder kerja di container
WORKDIR /app

# Copy package.json dan package-lock.json dulu
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy semua source code
COPY . .

RUN npx prisma generate

# Expose port backend
EXPOSE 3000

# Command untuk jalanin app
CMD ["npm", "run", "dev"]

