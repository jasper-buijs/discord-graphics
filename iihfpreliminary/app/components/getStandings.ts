import { ScheduleGame } from "@/app/types";
import puppeteer from "puppeteer";

const output = Bun.file("./app/components/schedule.json");

export default async function getGameSchedule(url: string) {
  if (!await output.exists()) console.error("Output file does not exist.");

  const browser = await puppeteer.launch({ browser: "firefox" });
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  await page.goto(url);
  const scheduleElement = await page.$(".s-schedule");

  const gameData = await scheduleElement?.$$eval("div", divs => {
    const gameDataCreator: ScheduleGame[] = [];
    divs.forEach(game => {
      if (game.getAttribute("data-phase") == "PreliminaryRound") {
        const date = new Date(Date.parse(`${game.getAttribute("data-date-utc")} ${game.getAttribute("data-time-utc")} UTC`));
        const gameRow: ScheduleGame = {
          upcoming: game.getAttribute("data-gameislive") == "True",
          final: game.getAttribute("data-gameisfinal") == "True",
          overtime: game.getAttribute("data-gameisfinalovertime") == "True",
          shootout: game.getAttribute("data-gameisfinalshootout") == "True",
          group: game.getAttribute("data-group") == "A" ? "A" : "B",
          utcDate: game.getAttribute("data-date-utc") || "N/A",
          utcTime: game.getAttribute("data-time-utc") || "N/A",
          date: date,
          localZOffset: game.getAttribute("data-timeoffset") || "N/A",
          localDate: game.getAttribute("data-date") || "N/A",
          home: game.getAttribute("data-hometeam") || "N/A",
          visiting: game.getAttribute("data-guestteam") || "N/A"
        };
        gameDataCreator.push(gameRow);
      }
    });
    return gameDataCreator;
  });

  const saveObject = { games: gameData }
  if (gameData) await Bun.write(output, JSON.stringify(saveObject));

  await browser.close();
  return;
}

await getGameSchedule("https://www.iihf.com/en/events/2025/wm20/schedule");