# Lumières et Technologie - Frontend Application

![React](https://img.shields.io/badge/React-17.0.2-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.10.1-blue)
![Redux](https://img.shields.io/badge/Redux-4.1.1-purple)
![Node.js](https://img.shields.io/badge/Node.js->=20.0.0-green)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

A comprehensive industrial control and monitoring system frontend built with React. This application provides a web-based interface for managing lighting systems, electrical equipment, communication states, alarms, and automation controls.

## 🎯 Overview

This React application serves as the frontend for an industrial automation system called "Lumières et Technologie" (Lights and Technology). It provides real-time monitoring and control capabilities for:

- **Balisage (Lighting Control)** - Main navigation and lighting management
- **Éclairage (Illumination)** - Advanced lighting controls
- **Électricité (Electrical Systems)** - Power and electrical equipment monitoring
- **Alarmes (Alarms)** - Real-time alarm management and notifications
- **Historique (History)** - Historical data and reporting
- **Régulateurs (Regulators)** - Equipment regulation and control
- **Communication Status** - Network and device communication monitoring
- **Macros** - Automated command sequences

## 🏗️ Architecture

### Technology Stacks

- **Framework**: React 17.0.2 with Hooks and functional components
- **State Management**: Redux 4.1.1 + Redux Saga 1.1.3
- **UI Library**: Material-UI (MUI) 5.10.1 with custom theming
- **Real-time Communication**: Socket.IO 4.5.3 for WebSocket connections
- **Authentication**: JWT-based with role-based access control
- **Routing**: React Router 5.2.0 with protected routes
- **HTTP Client**: Axios 0.27.2
- **Charts**: Chart.js 3.9.1 with React integration
- **Build Tools**: Create React App with custom Webpack configurations

### Project Structure

```
src/
├── common/                      # Shared components and utilities
│   ├── components/             # Reusable UI components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── Telecommande/      # Remote control components
│   │   ├── Unit/              # Unit control components
│   │   └── Layout.js          # Main layout wrapper
│   ├── state/                 # Redux store configuration
│   ├── saga/                  # Redux Saga root configuration
│   ├── utils/                 # Utility functions
│   │   └── webSockets/        # WebSocket connection management
│   └── Config.js              # Application configuration
├── modules/                    # Feature modules
│   ├── Authentification/      # Authentication module
│   ├── alarme/                # Alarm management
│   ├── balisage/              # Main lighting control
│   ├── eclairage/             # Advanced lighting
│   ├── electricite/           # Electrical systems
│   ├── etatCommunication/     # Communication status
│   ├── historique/            # Historical data
│   ├── macros/                # Macro commands
│   └── regulateurs/           # Equipment regulators
├── routing/                    # Route protection and navigation
└── assets/                     # Static assets (images, audio)
```

### Module Architecture

Each feature module follows a consistent structure:

```
module/
├── ui/                        # React components
├── state/                     # Redux actions and reducers
├── saga/                      # Redux Saga effects (where applicable)
├── Style/                     # Material-UI styled components
├── components/                # Module-specific components
└── i18n/                      # Internationalization (where applicable)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 20.0.0
- **npm**: >= 10.2.4
- **Yarn**: Latest stable version (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd front_hoceima
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Configure environment**

   The application uses a dual configuration system:

   - **Development**: Edit `src/common/Config.js`
   - **Runtime**: Edit `public/env-config.js` for dynamic configuration

   ```javascript
   // public/env-config.js
   window._env_ = {
     url: "http://localhost:3001", // Backend API URL
     WebSocketUrl: "ws://localhost:4001", // WebSocket server URL
     appVersion: "1.0.0",
     primaryColor: "#232A56",
     secondaryColor: "#575756",
   };
   ```

4. **Start development server**

   ```bash
   yarn start
   # or
   npm start
   ```

   The application will open at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command              | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `yarn start`         | Start development server with OpenSSL legacy provider |
| `yarn start-webpack` | Start development server using Webpack directly       |
| `yarn build`         | Create production build                               |
| `yarn build-webpack` | Create production build using Webpack                 |
| `yarn winBuild`      | Windows-specific build without source maps            |
| `yarn test`          | Run test suite                                        |

## 🔐 Authentication & Authorization

### Role-Based Access Control

The application implements a three-tier role system:

- **`ROLE_ADMIN`** - Full system access including macro management
- **`ROLE_MAINTENANCE`** - Access to monitoring, alarms, and maintenance functions
- **`ROLE_SUPERVISION`** - Basic supervision access

### Protected Routes

Routes are protected based on user roles:

```javascript
const protectedRoutes = {
  "/Etat-de-communication": [ROLE_MAINTENANCE, ROLE_ADMIN],
  "/Régulateur": [ROLE_MAINTENANCE, ROLE_ADMIN],
  "/Historique": [ROLE_MAINTENANCE, ROLE_ADMIN],
  "/Alarmes": [ROLE_MAINTENANCE, ROLE_ADMIN],
  "/Electricite": [ROLE_MAINTENANCE, ROLE_ADMIN],
  "/Macros": [ROLE_ADMIN], // Admin only
};
```

### JWT Token Management

- Tokens stored in `sessionStorage`
- Automatic token validation on route access
- WebSocket authentication using JWT sub claim

## 🌐 Real-time Communication

### WebSocket Integration

The application uses Socket.IO for real-time updates:

```javascript
// Key socket events
- 'ElectricityStatus' - Electrical system updates
- 'ipStatus' - Communication status changes
- 'H_alarme' - Alarm notifications
- 'recMessage' - Zone status updates
- 'automateStatus' - Automation system status
```

### Connection Management

- Automatic reconnection with 5-second delay
- Connection status notifications via snackbar alerts
- Authentication included in socket connection

## 🎨 UI/UX Features

### Material-UI Theming

- Custom color scheme with configurable primary/secondary colors
- French locale support (`frFR`)
- Consistent design system across all modules

### Responsive Design

- Mobile-friendly interface
- Adaptive layouts for different screen sizes
- Touch-friendly controls for industrial environments

### User Experience

- Loading states with custom spinner
- Toast notifications for system events
- Real-time status indicators
- Intuitive navigation with role-based menu items

## 📊 State Management

### Redux Store Structure

```javascript
rootReducer = {
  Auth: AuthReducer, // Authentication state
  Zone: ZoneReducer, // Zone control state
  History: HistoryReducer, // Historical data
  Alarmes: AlarmeReducer, // Alarm management
  Authorization: AuthorizationReducer, // User permissions
  Matrix: MatrixReducer, // Control matrix
  Communicator: CommunicationReducer, // Communication status
  Electricity: ElectricityReducer, // Electrical systems
};
```

### Redux Saga Integration

- Asynchronous API calls
- WebSocket event handling
- Complex business logic flows
- Error handling and retry mechanisms

## 🔧 Configuration

### Environment Configuration

The application supports runtime configuration through `window._env_`:

```javascript
// Runtime configuration takes precedence
if (window._env_) {
  config = window._env_;
}
```

### Build Configuration

- **Babel**: ES6+ transpilation with React preset
- **Webpack**: Custom configuration for development and production
- **Source Maps**: Disabled in production, enabled in development

## 📱 Browser Support

- **Production**: >0.2%, not dead, not Opera Mini
- **Development**: Latest Chrome, Firefox, Safari

## 🚀 Deployment

### Production Build

```bash
yarn build
```

Creates optimized production build in `build/` directory:

- Minified JavaScript and CSS
- Optimized images and assets
- Service worker for caching (if enabled)

### CI/CD Integration

The project includes GitHub Actions workflows for:

- **Quality Gates**: Build validation, testing, linting
- **Staging Deployment**: Automated staging environment deployment
- **Production Release**: Production deployment with semantic versioning
- **Artifact Management**: Build artifact creation and storage

### Deployment Options

1. **Static Hosting**: Deploy `build/` folder to any static host
2. **Docker**: Containerize with nginx for production serving
3. **CDN**: Upload to CDN with proper cache headers

## 🛠️ Development

### Code Standards

- **ES6+** features with Babel transpilation
- **React Hooks** pattern for state management
- **Material-UI** components for consistent styling
- **Redux** best practices with actions, reducers, and sagas

### Performance Optimizations

- **Code Splitting**: Lazy loading of non-critical modules
- **Memoization**: React.memo for expensive components
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: Optimized asset loading

### Debugging

- Redux DevTools integration
- React DevTools compatibility
- Source map support in development
- Console logging for WebSocket events

## 🔍 Troubleshooting

### Common Issues

1. **OpenSSL Legacy Provider**: Use `--openssl-legacy-provider` flag for compatibility
2. **WebSocket Connection**: Verify backend server and WebSocket URL configuration
3. **Authentication**: Check JWT token validity and role assignments
4. **Build Failures**: Ensure Node.js version >= 20.0.0

### Environment Issues

```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install

# Reset Create React App cache
yarn start --reset-cache
```

## 📄 License

This project is proprietary software for Lumières et Technologie.

## 🤝 Contributing

Internal development team only. Follow the established code review process and deployment procedures.

---

For technical support or questions, contact the development team.
