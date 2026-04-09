const { spawn } = require("node:child_process");

const [, , command, ...args] = process.argv;

if (!command) {
  console.error("Usage: node scripts/next-wrapper.cjs <dev|build|start> [...args]");
  process.exit(1);
}

// Work around unstable native SWC binary loading on this Windows setup.
if (!process.env.NEXT_DISABLE_SWC_NATIVE) {
  process.env.NEXT_DISABLE_SWC_NATIVE = "1";
}

const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, command, ...args], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
