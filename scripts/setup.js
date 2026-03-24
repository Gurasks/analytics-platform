import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const projectDir = path.join(rootDir, "infrastructure", "docker");
const normalizedProjectDir = projectDir.replace(/\\/g, "/");

function run(command) {
  console.log(`\n▶ ${command}`);
  execSync(command, { stdio: "inherit" });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForMongo(container) {
  console.log("\n⏳ Waiting for MongoDB to be ready...");

  for (let i = 0; i < 10; i++) {
    try {
      execSync(
        `docker exec ${container} mongosh --eval "db.runCommand({ ping: 1 })"`,
        { stdio: "ignore" },
      );
      console.log("✅ MongoDB is ready");
      return;
    } catch {
      await sleep(2000);
    }
  }

  throw new Error("❌ MongoDB did not become ready in time");
}

function ensureReplicaConfig(container) {
  console.log("\n⚙️ Ensuring replica set config...");

  try {
    const host = execSync(
      `docker exec ${container} mongosh --quiet --eval "rs.conf().members[0].host"`
    )
      .toString()
      .trim()
      .replace(/"/g, "");

    if (host === "localhost:27017") {
      console.log("✅ Replica set already correctly configured");
      return;
    }

    console.log("➡️ Reconfiguring replica set...");

    execSync(
      `docker exec ${container} mongosh --eval "rs.reconfig({_id:'rs0',members:[{_id:0,host:'localhost:27017'}]}, { force: true })"`,
      { stdio: "inherit" }
    );

    console.log("✅ Replica set reconfigured");

  } catch (err) {
    console.log("➡️ Initializing replica set...");

    execSync(
      `docker exec ${container} mongosh --eval "rs.initiate({_id:'rs0',members:[{_id:0,host:'localhost:27017'}]})"`,
      { stdio: "inherit" }
    );
  }
}

async function waitForPrimary(container) {
  console.log("\n⏳ Waiting for MongoDB PRIMARY...");

  for (let i = 0; i < 15; i++) {
    try {
      const result = execSync(
        `docker exec ${container} mongosh --quiet --eval "rs.status().members.find(m => m.self).stateStr"`
      )
        .toString()
        .trim();

      if (result.includes("PRIMARY")) {
        console.log("✅ MongoDB is PRIMARY");
        return;
      }
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  throw new Error("❌ MongoDB did not become PRIMARY in time");
}

async function main() {
  try {
    // 1. Start infra
    run(`docker compose --project-directory "${normalizedProjectDir}" up -d`);


    // 2. Get Mongo container
    const mongoContainer = execSync(
      `docker compose --project-directory "${normalizedProjectDir}" ps -q mongodb`
    )
      .toString()
      .trim();

    if (!mongoContainer) {
      throw new Error("❌ Mongo container not found");
    }

    // 3. Wait for Mongo
    await waitForMongo(mongoContainer);

    // 4. Init replica set
    ensureReplicaConfig(mongoContainer);

    await waitForPrimary(mongoContainer);

    // 5. Start app
    run("npm run dev");

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();