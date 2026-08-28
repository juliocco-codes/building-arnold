#!/usr/bin/env node
import fs from "node:fs";
import { appendWorkout, findMealEvents } from "./health-tools.mjs";

const [command, input, output] = process.argv.slice(2);
if (!command || !input) {
  console.error("Usage: node src/cli.mjs workout SESSION.json [LOG.json] | meals EVENTS.json");
  process.exit(2);
}
const data = JSON.parse(fs.readFileSync(input, "utf8"));
if (command === "workout") console.log(JSON.stringify(appendWorkout(output || "data/workouts.json", data).at(-1), null, 2));
else if (command === "meals") console.log(JSON.stringify(findMealEvents(data), null, 2));
else { console.error(`Unknown command: ${command}`); process.exit(2); }
