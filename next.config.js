// Librairie
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === "PHASE_DEVELOPMENT_SERVER") {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "Dagnir",
        mongodb_password: "D3vD39ia87VmsF",
        mongodb_dbname: "portfolio",
      },
    };
  }

  return {
    env: {
      mongodb_username: "Dagnir",
      mongodb_password: "D3vD39ia87VmsF",
      mongodb_dbname: "portfolio",
    },
  };
};

module.exports = nextConfig;
