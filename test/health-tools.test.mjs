import test from "node:test";
import assert from "node:assert/strict";
import { classifyMealEvent, findMealEvents, validateWorkout } from "../src/health-tools.mjs";

test("validates workout structure", () => {
  assert.deepEqual(validateWorkout({ date: "2026-08-28", session: "Upper", exercises: [{ name: "Row", sets: [] }] }), []);
  assert.ok(validateWorkout({ date: "Friday", exercises: [] }).length >= 2);
});

test("finds explicit and contextual meal events", () => {
  assert.equal(classifyMealEvent({ summary: "Dinner with a friend" }), "meal");
  assert.equal(classifyMealEvent({ summary: "Team meeting", location: "Office", start: "2026-08-28T13:00:00Z" }), null);
  const result = findMealEvents([{ summary: "Lunch", start: "2026-08-28T13:00:00Z" }], new Date("2026-08-28T11:00:00Z"));
  assert.equal(result[0].hours_until, 2);
});
