const { getWeth } = require('../scripts/getWeth')

async function main() {
  await getWeth()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
