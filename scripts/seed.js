import axios from "axios";

const API_URL = "http://localhost:4001/events";

// ----------------------
// CLI ARGUMENTS
// ----------------------

const args = process.argv.slice(2);

const TOTAL_EVENTS = Number(args[0]) || 200;
const CONCURRENCY = Number(args[1]) || 10;
const MODE = args[2] || "normal";
// modes: normal | stress | duplicate | time

// ----------------------
// DATA GENERATORS
// ----------------------

const eventTypes = ["click", "view", "purchase", "scroll"];
const userIds = Array.from({ length: 20 }).map((_, i) => `user-${i + 1}`);

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ----------------------
// EVENT GENERATION MODES
// ----------------------

function generateEvent(i) {
  const base = {
    eventId: `seed-${Date.now()}-${i}`,
    type: randomItem(eventTypes),
    userId: randomItem(userIds),
    data: {
      value: Math.floor(Math.random() * 100),
    },
  };

  // 🧪 Duplicate mode
  if (MODE === "duplicate") {
    return {
      ...base,
      eventId: `dup-fixed-id`, // same ID always
    };
  }

  // ⏳ Time-based mode
  if (MODE === "time") {
    const daysAgo = Math.floor(Math.random() * 7); // last 7 days
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return {
      ...base,
      createdAt: date.toISOString(),
    };
  }

  return base;
}

// ----------------------
// REQUEST HANDLING
// ----------------------

async function sendEvent(event) {
  try {
    await axios.post(API_URL, event);
  } catch (err) {
    console.error("❌ Failed:", event.eventId);
  }
}

async function runBatch(start, size) {
  const batch = Array.from({ length: size }).map((_, i) =>
    generateEvent(start + i)
  );

  await Promise.all(batch.map(sendEvent));
}

// ----------------------
// MAIN EXECUTION
// ----------------------

async function main() {
  console.log(`\n🚀 Seeding ${TOTAL_EVENTS} events`);
  console.log(`⚙️ Mode: ${MODE}`);
  console.log(`⚡ Concurrency: ${CONCURRENCY}\n`);

  const batches = Math.ceil(TOTAL_EVENTS / CONCURRENCY);

  for (let i = 0; i < batches; i++) {
    const start = i * CONCURRENCY;

    await runBatch(start, CONCURRENCY);

    process.stdout.write(
      `\r📦 Progress: ${Math.min(start + CONCURRENCY, TOTAL_EVENTS)}/${TOTAL_EVENTS}`
    );
  }

  console.log("\n\n✅ Done!\n");
}

main();