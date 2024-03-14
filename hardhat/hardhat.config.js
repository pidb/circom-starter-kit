const fs = require("fs");
const toml = require("toml");

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-circom");

function circuits() {

  try {
    const circuitNames = fs.readdirSync("./circuits/", { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    let circuits = [];

    const config = toml.parse(fs.readFileSync("./circuits/circuit.config.toml", "utf-8"));

    circuitNames.forEach((name, index) => {
      let protocol = config.protocol[name] || config.protocol.default;
      let compiler = config.compiler[name] || config.compiler.default;
      circuits[index] = {
        name: name,
        version: compiler,
        protocol: protocol,
        circuit: `${name}/circuit.circom`,
        input: `${name}/input.json`,
        wasm: `${name}.wasm`,
        r1cs: `${name}.r1cs`,
        zkey: `${name}.zkey`,
      }
    })

    return circuits;

  } catch (error) {
    console.log(error);
  }
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  circom: {
    inputBasePath: "./circuits/",
    outputBasePath: "./client/",
    ptau: "powersOfTau28_hez_final_15.ptau",
    circuits: circuits(),
  }
};
