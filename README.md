# WalletPro

A full-stack digital wallet application built with .NET 6 API and React TypeScript, allowing users to manage digital transactions.

## 🚀 Features

- User authentication and authorization
- Wallet management
- Money transfers between users
- Transaction history
- Real-time balance updates
- Secure JWT authentication

## 🛠️ Tech Stack

### Backend
- .NET 6 Web API
- Entity Framework Core
- PostgreSQL
- JWT Authentication

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Axios

## 📋 Prerequisites

- Node.js (v16 or higher)
- .NET 6 SDK
- PostgreSQL (v14 or higher)
- Git

## ⚙️ Installation & Setup

### Database Setup

1. Create database and user:
```sql
CREATE DATABASE digital_wallet;
CREATE USER wallet WITH PASSWORD 'wallet';
```

2. Grant permissions:
```sql
GRANT ALL PRIVILEGES ON DATABASE digital_wallet TO wallet;
GRANT USAGE, CREATE ON SCHEMA public TO wallet;
ALTER SCHEMA public OWNER TO wallet;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO wallet;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO wallet;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO wallet;
```

### Backend Setup

1. Navigate to the API directory:
```bash
cd DigitalWallet.API
```

2. Create `appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=digital_wallet;Username=wallet;Password=wallet"
  },
  "JwtSettings": {
    "SecretKey": "ThisIsMySuperSecretKey",
    "ExpiryInMinutes": 60
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

3. Run the API:
```bash
dotnet restore
dotnet build
dotnet run
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create `.env` file:
```plaintext
VITE_API_URL=http://localhost:5000/api
```

3. Install dependencies and start:
```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`


## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Register a new account
4. Test available features:
   - Check wallet balance
   - Make transfers
   - View transaction history
P.S you can only transact with other registered users.


