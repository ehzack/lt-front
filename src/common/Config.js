var config = {
  url: "http://localhost:3001",
  WebSocketUrl: "ws://localhost:4001",
  appVersion: "1.0.0",
  primaryColor: "#232A56",
  secondaryColor: "#575756",
};

// Use environment config if available (for both development and production)
if (window._env_) {
  config = window._env_;
}
export default config;