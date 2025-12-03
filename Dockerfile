FROM node:16-bullseye

# Install libpostal and other dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    autoconf \
    automake \
    libtool \
    libcurl4-openssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Build and install libpostal
RUN git clone https://github.com/openvenues/libpostal.git /tmp/libpostal
WORKDIR /tmp/libpostal
RUN ./bootstrap.sh && \
    ./configure --datadir=/usr/share/libpostal/data && \
    make && \
    make install && \
    ldconfig

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy the source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (adjust if needed)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
