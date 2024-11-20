// F1 2025

import { SeriesData } from "@/app/types";

const f1Data: SeriesData = require("./f12025.json");
const f2Data: SeriesData = require("./f22025.json");
const f3Data: SeriesData = require("./f32025.json");
const faData: SeriesData = require("./fa2025.json");

export const events = {
  [String(f1Data.series)]: f1Data.calendar.map(r => [r.eventKey, r.countryCode].join(" - ")),
  [String(f2Data.series)]: f2Data.calendar.map(r => [r.eventKey, r.countryCode].join(" - ")),
  [String(f3Data.series)]: f3Data.calendar.map(r => [r.eventKey, r.countryCode].join(" - ")),
  [String(faData.series)]: faData.calendar.map(r => [r.eventKey, r.countryCode].join(" - "))
};

export const eventData = {
  [String(f1Data.series)]: f1Data.calendar,
  [String(f2Data.series)]: f2Data.calendar,
  [String(f3Data.series)]: f3Data.calendar,
  [String(faData.series)]: faData.calendar
}