"use client";

import { Series } from "@/app/types";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { useState } from "react";
import { events, eventData } from "@/app/components/registerCalendar";

const inter = Inter({subsets: ["latin"]});
const f1Text = localFont({
  src: [{
    path: "./fonts/F1NewRegular-Regular.otf",
    weight: "400",
    style: "normal"
  }, {
    path: "./fonts/F1NewRegular-Bold.otf",
    weight: "700",
    style: "normal"
  }, {
    path: "./fonts/F1NewRegular-Black.otf",
    weight: "900",
    style: "normal"
  }, {
    path: "./fonts/F1NewRegular-Italic.otf",
    weight: "400",
    style: "italic"
  }]
});
const f1Year = localFont({
  src: [{
    path: "./fonts/F1YEARRegular.ttf",
    weight: "400",
    style: "normal"
  }]
});

export default function Home() {
  const [series, setSeries] = useState<Series>("F1");
  const [eventCode, setEventCode] = useState<string>("GEN");
  const [countryCode, setCountryCode] = useState<string>("---");
  const [sessionName, setSessionName] = useState<string>(eventData[series == "F1S" ? "F1" : series].find(r => r.eventKey == eventCode && r.countryCode == countryCode)?.fullEventName || "Error");

  const [statsData, setStatsData] = useState<string[]>([
    "-- laps",
    "1:--.---",
    "--%",
    "--%",
    "*in the last - races",
    "---m",
    "--.--s"
  ]);

  function getHeaderSeriesTint(series: Series) {
    switch (series) {
      case "F1":
        return "opacity-30 bg-[#ff1801]";
      case "F1S":
        return "opacity-30 bg-[#ff1801]";
      case "F2":
        return "opacity-40 bg-[#0090d0]";
      case "F3":
        return "opacity-30";
      case "FA":
        return "opacity-50 bg-faGradient";
    }
  }

  function getHeaderSeriesLogo(series: Series) {
    switch (series) {
      case "F1": return "/assets/serieslogos/f1cropped.webp";
      case "F1S": return "/assets/serieslogos/f1-sprint-text-white.webp";
      case "F2": return "/assets/serieslogos/f2.webp";
      case "F3": return "/assets/serieslogos/f3.webp";
      case "FA": return "/assets/serieslogos/f1a-inline.webp";
    }
  }

  function sessionNameWithWrap(sessionName: String) {
    const words = sessionName.split(" ");
    const middleIndex = Math.floor(words.length / 2);
    words[middleIndex] = `${words[middleIndex]}<wbr>`;
    return words.join(`\u00A0`).toUpperCase().replace("-", "\u2011");
  }

  function onSetStats() {
    if (series == "F1") {
      let newStats: string[] = [];
      newStats.push(`${prompt("Amount of laps:", "0")} laps`);
      newStats.push(`${prompt("Fastest race lap:", "1:00.000")}`);
      newStats.push(`${prompt("SC Prevalence:", "00")}%`);
      newStats.push(`${prompt("VSC Prevalence:", "00")}%`);
      newStats.push(`*in the last ${prompt("SC/VSC prevalence is from last x race:", "1")} races`);
      newStats.push(`${prompt("Pole to T1:", "000")}m`);
      newStats.push(`${prompt("Pit stop time loss", "00.00")}s`);
      setStatsData(newStats);
    } else if (series == "F1S") {
      let newStats: string[] = [];
      newStats.push(`${prompt("Amount of Sprint laps:", "00")} laps`);
      newStats.push(`${prompt("Amount of Race laps", "00")} laps`);
      newStats.push(`${prompt("Fastest race lap:", "1:00.000")}`);
      newStats.push(`${prompt("SC Prevalence:", "00")}%`);
      newStats.push(`*in the last ${prompt("SC prevalence is from last x race:", "1")} races`);
      newStats.push(`${prompt("Pit stop time loss", "00.00")}s`);
      newStats.push("-");
      setStatsData(newStats);
    } else if (series == "F2" || series == "F3") {
      let newStats: string[] = [];
      newStats.push(`${prompt("Amount of Sprint laps:", "00")} laps`);
      newStats.push(`${prompt("Amount of Feature laps", "00")} laps`);
      newStats.push(`${prompt("Fastest race lap:", "1:00.000")}`);
      newStats.push(`${prompt("First Tyre Allocation:", "🟣🔴🟡⚪️️ Tyre")}`);
      newStats.push(`${prompt("Second Tyre Allocation:", "🟣🔴🟡⚪️️ Tyre")}`);
      newStats.push(`${prompt("Max Speed", "000.0")}km/h`);
      newStats.push("-");
      setStatsData(newStats);
    }
  }

  function getHideClass(showSeries: string) {
    if (showSeries == series) {
      return "";
    } else return "hidden";
  }


  return (
    <>
      {/* GRAPHIC PREVIEW */}
      <div className="bg-[#1f1f1f] w-[1800px] overflow-y-scroll" id={"graphic"}>
        {/* Header */}
        <div className="sticky top-0 w-full h-64 bg-[#252525] text-center relative">
          <div
            style={{backgroundImage: `url(assets/header/${series == "F1S" ? "f1" : series.toLowerCase()}/${eventCode}.webp)`}}
            className="absolute z-1 bg-cover bg-center h-full w-full grayscale"
          />
          <div className={"absolute z-2 h-full w-full mix-blend-color " + getHeaderSeriesTint(series)} />
          <div className={"absolute z-3 h-full w-full flex flex-col items-center justify-center"}>
            <img src={getHeaderSeriesLogo(series)} className="block h-12 mb-4" />
            <div className="w-fit h-fit">
              <span
                className={"font-bold text-white text-4xl whitespace-pre-wrap break-words hyphens-none " + f1Text.className}
                dangerouslySetInnerHTML={{ __html: sessionNameWithWrap(sessionName) }}
              ></span>
              <span className={"text-white text-[38px] leading-10 ml-3 whitespace-pre-wrap " + f1Year.className}
              >2025</span>
            </div>
          </div>
        </div>
        {/* F1 Circuit Map (Left) */}
        <div className={`w-3/5 float-left ${getHideClass("F1")}`}>
          <div className={"h-16 text-center text-white leading-[4rem] text-2xl " + f1Text.className}>
            {eventData["F1"].find(r => r.eventKey == eventCode && r.countryCode == countryCode)?.circuitName}
          </div>
          <div className="relative">
            <img className={"my-4"}
              src={`/assets/circuitmaps/${series == "F1S" ? "f1" : series.toLowerCase()}/${eventCode}.webp`}
            />
          </div>
        </div>
        {/* F2 Circuit Map (Left)*/}
        <div className={`w-3/5 float-left ${getHideClass("F2")}`}>
          <div className={"h-16 text-center text-white leading-[4rem] text-2xl " + f1Text.className}>
            {eventData["F1"].find(r => r.eventKey == eventCode && r.countryCode == countryCode)?.circuitName}
          </div>
          <div className="relative">
            <img className={"my-4"}
              src={`/assets/circuitmaps/${series == "F1S" ? "f1" : series.toLowerCase()}/${eventCode}.webp`}
            />
          </div>
        </div>
        {/* F3 Circuit Map (Left)*/}
        <div className={`w-3/5 float-left ${getHideClass("F3")}`}>
          <div className={"h-16 text-center text-white leading-[4rem] text-2xl " + f1Text.className}>
            {eventData["F1"].find(r => r.eventKey == eventCode && r.countryCode == countryCode)?.circuitName}
          </div>
          <div className="relative">
            <img className={"my-4"}
              src={`/assets/circuitmaps/${series == "F1S" ? "f1" : series.toLowerCase()}/${eventCode}.webp`}
            />
          </div>
        </div>
        {/* F1 Circuit Stats (Right) */}
        <div className={`w-2/5 float-right ${getHideClass("F1")}`}>
          <div className="flex flex-col gap-12 mt-5">
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Number of Laps</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🔁</div>
                <div className={"inline-block"}>{statsData[0]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Fastest Race Lap</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>⏱️</div>
                <div className={"inline-block"}>{statsData[1]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>SC/VSC Prevalence</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🚓</div>
                <div className={"inline-block pr-4"}>{statsData[2]}</div>
                <br />
                <div className={"inline-block pr-4"}>🚨</div>
                <div className={"inline-block pr-4"}>{statsData[3]}</div>
                <div className={"block text-xs italic pt-1"}>{statsData[4]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Pole to T1</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>⬆️</div>
                <div className={"inline-block pr-4"}>{statsData[5]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Pit stop time loss</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🛑</div>
                <div className={"inline-block pr-4"}>{statsData[6]}</div>
              </div>
            </div>
          </div>
        </div>
        {/* F1S Circuit Stats (Right) */}
        <div className={`w-2/5 float-right ${getHideClass("F1S")}`}>
          <div className="flex flex-col gap-12 mt-10">
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Sprint Laps</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🔄</div>
                <div className={"inline-block"}>{statsData[0]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Race Laps</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🔁</div>
                <div className={"inline-block"}>{statsData[1]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Fastest Race Lap</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>⏱️</div>
                <div className={"inline-block"}>{statsData[2]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>SC/VSC Prevalence</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🚓</div>
                <div className={"inline-block pr-4"}>{statsData[3]}</div>
                <div className={"block text-xs italic pt-1"}>{statsData[4]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Pit stop time loss</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🛑</div>
                <div className={"inline-block pr-4"}>{statsData[5]}</div>
              </div>
            </div>
          </div>
        </div>
        {/* F2 Circuit Stats (Right) */}
        <div className={`w-2/5 float-right ${getHideClass("F2")}`}>
          <div className="flex flex-col gap-12 mt-5">
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Sprint Laps</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🔄</div>
                <div className={"inline-block"}>{statsData[0]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Feature Laps</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🔁</div>
                <div className={"inline-block"}>{statsData[1]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Fastest Race Lap</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>⏱️</div>
                <div className={"inline-block"}>{statsData[2]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Tyre Allocation</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>{statsData[3]}</div>
                <br />
                <div className={"inline-block pr-4"}>{statsData[4]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Max Speed</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🏎️</div>
                <div className={"inline-block pr-4"}>{statsData[5]}</div>
              </div>
            </div>
          </div>
        </div>
        {/* F3 Circuit Stats (Right) */}
        <div className={`w-2/5 float-right ${getHideClass("F3")}`}>
          <div className="flex flex-col gap-12 mt-5">
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Sprint Laps</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🔄</div>
                <div className={"inline-block"}>{statsData[0]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Feature Laps</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🔁</div>
                <div className={"inline-block"}>{statsData[1]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Fastest Race Lap</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>⏱️</div>
                <div className={"inline-block"}>{statsData[2]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Tyre Allocation</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>{statsData[3]}</div>
                <br />
                <div className={"inline-block pr-4"}>{statsData[4]}</div>
              </div>
            </div>
            <div className={"text-white " + f1Text.className}>
              <div className={"text-center italic"}>Max Speed</div>
              <div className={"text-center text-5xl pt-2"}>
                <div className={"inline-block pr-4"}>🏎️</div>
                <div className={"inline-block pr-4"}>{statsData[5]}</div>
              </div>
            </div>
          </div>
        </div>
        {/* FA Circuit Map (All-Width)*/}
        <div className={`w-full ${getHideClass("FA")}`}>
          <div className={"h-16 text-center text-white leading-[4rem] text-2xl " + f1Text.className}>
            {eventData["F1"].find(r => r.eventKey == eventCode && r.countryCode == countryCode)?.circuitName}
          </div>
          <div className="relative">
            <img className={"mx-auto"}
              src={`/assets/circuitmaps/${series == "F1S" ? "f1" : series.toLowerCase()}/${eventCode}.webp`}
            />
          </div>
        </div>
      </div>

      {/* SESSION CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Set Session Info</div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Series:</div>
          <select name={"seriesSelector"} defaultValue="F1" onChange={(e: any) => setSeries(e.target.value)}>
            {["F1", "F1S", "F2", "F3", "FA"].map(s => <option key={s}
            >{s}</option>)}
          </select>
          <br />
          <div className={"inline-block mr-4"}>Event:</div>
          <select name={"seriesSelector"} defaultValue="GEN - ---"
            onChange={(e: any) => {
              let [eventCode, countryCode] = e.target.value.split(" - ")
              setEventCode(e.target.value.split(" - ")[0]);
              setCountryCode(e.target.value.split(" - ")[1]);
              setSessionName(eventData[series == "F1S" ? "F1" : series].find(r => r.eventKey == eventCode && r.countryCode == countryCode)?.fullEventName || "Error")
            }}
          >
            {events[series == "F1S" ? "F1" : series].map(s => <option key={s}
            >{s}</option>)}
          </select>
          <br />
          <div className="inline-block mr-4">Session name (edit if need be, without year):</div>
          <input className={"inline-block w-96 border border-blue-400 rounded-md"} name={"sessionNameInput"}
            defaultValue={sessionName} type="text" onChange={(e) => setSessionName(e.target.value)}
          />
        </div>

        <div className={"text-2xl"}>Set Stats</div>
        <div className={"m-4"}>
          <button className={"border-black border-[1px] px-2 rounded-md"} onClick={onSetStats}>UPDATE CIRCUIT STATISTICS</button>
        </div>
      </div>
    </>
  );
}