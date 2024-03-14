const fs = require("fs");
const { exec } = require("child_process");
const which = require("which");

const COMMAND = "circom"
const CIRCOM_FILE = "circuit.circom"

const main = async () => {
    console.log(" Compiling circuits")
    const circuitNames = fs.readdirSync("./circuits/", { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    try {
        const _ = await which("circom")
    } catch (error) {
        console.log(error)
    }

    circuitNames.forEach((name, index) => {
        const command = `${COMMAND} ./circuits/${name}/${CIRCOM_FILE} --r1cs --wasm --sym`
        console.log(command)
        // circom ./circuits/init/circuit.circom --r1cs --wasm --sym -o ./client/init
    })
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
