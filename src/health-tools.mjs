import fs from "node:fs";
import path from "node:path";

export function validateWorkout(session) {
  const errors = [];
  if (!session || typeof session !== "object") return ["session must be an object"];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(session.date || "")) errors.push("date must be YYYY-MM-DD");
  if (!session.session) errors.push("session is required");
  if (!Array.isArray(session.exercises)) errors.push("exercises must be an array");
  else session.exercises.forEach((exercise, index) => {
    if (!exercise.name) errors.push(`exercises[${index}].name is required`);
    if (exercise.sets && !Array.isArray(exercise.sets)) errors.push(`exercises[${index}].sets must be an array`);
  });
  return errors;
}

export function appendWorkout(file, session) {
  const errors = validateWorkout(session);
  if (errors.length) throw new Error(errors.join("; "));
  let log = [];
  try { log = JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  if (!Array.isArray(log)) throw new Error("workout log must be an array");
  log.push(session);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(log, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(temporary, file);
  return log;
}

const SOCIAL = /\b(party|birthday|wedding|celebration|reception|drinks|date night)\b/i;
const MEAL = /\b(breakfast|brunch|lunch|dinner|coffee|pub|restaurant|café|cafe|bar|bistro|sushi|pizza|ramen|supper)\b/i;
const EXCLUDED = /\b(sleep|workout|gym|training|meeting|call|doctor|dentist|physio|commute|travel)\b/i;
const WINDOWS = [[7, 11], [12, 15], [18, 22]];

export function classifyMealEvent(event) {
  const title = event.summary || "";
  if (SOCIAL.test(title)) return "social";
  if (MEAL.test(title)) return "meal";
  if (!event.location || event.all_day || !event.start || EXCLUDED.test(title)) return null;
  const hour = new Date(event.start).getHours();
  return WINDOWS.some(([start, end]) => hour >= start && hour <= end) ? "located_at_mealtime" : null;
}

export function findMealEvents(events, now = new Date()) {
  return events.flatMap((event) => {
    const type = classifyMealEvent(event);
    if (!type) return [];
    const start = new Date(event.start);
    if (Number.isNaN(start.getTime())) return [];
    return [{ ...event, type, hours_until: Math.round(((start - now) / 3600000) * 10) / 10 }];
  });
}
