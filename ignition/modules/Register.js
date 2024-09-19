const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const RegisterDisasterModule = buildModule("RegisterDisasterModule", (m) => {
  const registerDisaster = m.contract("RegisterDisaster");

  return { registerDisaster };
});

module.exports = RegisterDisasterModule;
