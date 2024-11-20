/* eslint-disable @typescript-eslint/no-explicit-any,prefer-const */
"use client";

import { eventData, events } from "@/app/components/registerCalendar";
import startingGridEmblem from "@/app/components/startingGridEmblem";
import { f1Teams, f2Teams, f3Teams, faTeams } from "@/app/components/teams";
import { GridDriverData, Series, Team } from "@/app/types";
import { useState } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

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
  const [leftPole, setLeftPole] = useState<boolean>(true)
  const [startingGrid, setStartingGrid] = useState<GridDriverData[]>(
    [
      {
        position: 1,
        firstName: "Nico",
        lastName: "Hulkenberg",
        team: "Haas",
        investigation: true
      },
      {
        position: 2,
        firstName: "Lando",
        lastName: "Norris",
        team: "McLaren"
      },
      {
        position: 3,
        firstName: "Max",
        lastName: "Verstappen",
        team: "Red Bull Racing"
      },
      {
        position: 4,
        firstName: "Oscar",
        lastName: "Piastri",
        team: "McLaren"
      },
      {
        position: 5,
        firstName: "Lance",
        lastName: "Stroll",
        team: "Aston Martin",
        pitLaneStart: true
      },
      {
        position: 6,
        firstName: "Oscar",
        lastName: "Piastri",
        team: "McLaren",
        pitLaneStart: true
      }
    ]
  );

  const [firstNameSelectorValue, setFirstNameSelectorValue] = useState("");
  const [lastNameSelectorValue, setLastNameSelectorValue] = useState("");
  const [teamSelectorValue, setTeamSelectorValue] = useState<Team | undefined>();
  const [pitStartSelectorValue, setPitStartSelectorValue] = useState<boolean>(false);
  const [investigationSelectorValue, setInvestigationSelectorValue] = useState<boolean>(false);
  const [penaltySelectorValue, setPenaltySelectorValue] = useState<boolean>(false);
  const [chineseNameSelectorValue, setChineseNameSelectorValue] = useState<boolean>(false);

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

  function sessionNameWithWrap(sessionName: string) {
    const words = sessionName.split(" ");
    const middleIndex = Math.floor(words.length / 2);
    words[middleIndex] = `${words[middleIndex]}<wbr>`;
    return words.join(`\u00A0`).toUpperCase().replace("-", "\u2011");
  }

  function getStartingGridEmblems(position: "left" | "right" | "pit") {
    let emblems: any[] = [];
    let gridRows: GridDriverData[] = [];
    switch (position) {
      case "left":
        if (leftPole) gridRows = startingGrid.filter(d => d.position % 2 == 1 && !d.pitLaneStart);
        else gridRows = startingGrid.filter(d => d.position % 2 == 0 && !d.pitLaneStart);
        break;
      case "right":
        if (leftPole) gridRows = startingGrid.filter(d => d.position % 2 == 0 && !d.pitLaneStart);
        else gridRows = startingGrid.filter(d => d.position % 2 == 1 && !d.pitLaneStart);
        break;
      case "pit":
        gridRows = startingGrid.filter(d => d.pitLaneStart);
        break;
    }
    gridRows.forEach(d => {
      emblems.push(startingGridEmblem(d, series));
    });
    console.log(position);
    return emblems;
  }

  function getTeamSelectorOptions() {
    switch (series) {
      case "F1": return f1Teams.map(t => <option key={t}>{t}</option>);
      case "F1S": return f1Teams.map(t => <option key={t}>{t}</option>);
      case "F2": return f2Teams.map(t => <option key={t}>{t}</option>);
      case "F3": return f3Teams.map(t => <option key={t}>{t}</option>);
      case "FA": return faTeams.map(t => <option key={t}>{t}</option>);
    }
  }

  function onAddGridRow() {
    //let oldStartingGrid = startingGrid;
    const pos = startingGrid.length + 1;
    const driver: GridDriverData = {
      position: pos,
      firstName: firstNameSelectorValue,
      lastName: lastNameSelectorValue,
      team: teamSelectorValue || "Red Bull Racing",
      pitLaneStart: pitStartSelectorValue,
      investigation: investigationSelectorValue,
      penalty: penaltySelectorValue,
      chineseName: chineseNameSelectorValue
    };
    setStartingGrid(Array.prototype.concat(startingGrid, [driver]));
  }

  return (
    <>
      {/* GRAPHIC PREVIEW */}
      <div className="bg-[#1f1f1f] w-[1920px] overflow-y-scroll" id={"graphic"}>
        {/* Header */}
        <div className="sticky top-0 w-full h-64 bg-[#252525] text-center relative">
          <div
            style={{backgroundImage: `url(assets/header/${series == "F1S" ? "f1" : series.toLowerCase()}/${eventCode}.webp)`}}
            className={`absolute z-1 bg-cover bg-center h-full w-full grayscale`}
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
        {/* Columns */}
        <div className="flex flex-row w-full h-fit">
          {/* Left Row */}
          <div className={`w-1/3 flex flex-col h-fit scale-90 gap-8 ${!leftPole ? "mt-12" : "mt-6"}`}>
            {getStartingGridEmblems("left")}
          </div>
          {/* Right Row */}
          <div className={`w-1/3 flex flex-col h-fit scale-90 gap-8 ${leftPole ? "mt-12" : "mt-6"}`}>
            {getStartingGridEmblems("right")}
          </div>
          {/* Pit and Stats */}
          <div className={`w-1/3 flex flex-col h-fit scale-90 gap-8`}>
            <img className={`w-2/3 h-auto mx-auto`} src={`/assets/maps/${eventCode}.webp`} />
            <div className={`w-full text-center ${f1Text.className} text-4xl italic text-white mt-4 -mb-6`}>Pit Lane
            </div>
            <div className={`border-x-2 border-x-white border-t-2 border-t-white w-full h-6`} />
            {getStartingGridEmblems("pit")}
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
              const [eventCode, countryCode] = e.target.value.split(" - ")
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
          <br />
          <div className="inline-block mr-4">LHS Pole Position:</div>
          <input className={"inline-block"} name={"LHSPoleInput"} defaultChecked={true} type={"checkbox"}
            onChange={(e) => setLeftPole(e.target.checked)}
          />
        </div>
      </div>



      {/* GRID CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Set Grid Info</div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Clear grid:</div>
          <button
            className={"inline-block ml-4 px-2 border-[1px] border-red-600 text-red-600 rounded-md hover:text-white hover:bg-red-600"}
            onClick={ () => setStartingGrid([]) }
          >
            CLEAR ALL ENTRIES
          </button>
        </div>
        <div className={"m-4"}>
          <div className={"block"}>Add grid rows</div>
          <div className={"inline-block mr-2"}>First Name:</div>
          <input type={"text"} name={"firstNameSelector"} className={"border border-blue-400 rounded-md"}
            onChange={(e) => setFirstNameSelectorValue(e.target.value)}
          />
          <br />
          <div className={"inline-block mr-2"}>Last Name:</div>
          <input type={"text"} name={"lastNameSelector"} className={"border border-blue-400 rounded-md"}
            onChange={(e) => setLastNameSelectorValue(e.target.value)}
          />
          <br />
          <div className={"inline-block mr-2"}>Team:</div>
          <select name={"teamSelector"}
            onChange={(e: any) => setTeamSelectorValue(e.target.value || "Red Bull Racing")}
          >
            {getTeamSelectorOptions()}
          </select>
          <br />
          <div className={"inline-block mr-2"}>Pit Lane Start:</div>
          <input type={"checkbox"} className={"mr-4"} onChange={(e) => setPitStartSelectorValue(e.target.checked)} />
          <div className={"inline-block mr-2"}>Investigation:</div>
          <input type={"checkbox"} className={"mr-4"}
            onChange={(e) => setInvestigationSelectorValue(e.target.checked)}
          />
          <div className={"inline-block mr-2"}>Penalty:</div>
          <input type={"checkbox"} className={"mr-4"} onChange={(e) => setPenaltySelectorValue(e.target.checked)} />
          <div className={"inline-block mr-2"}>Chinese Name:</div>
          <input type={"checkbox"} className={"mr-4"} onChange={(e) => setChineseNameSelectorValue(e.target.checked)} />
          <br />
          <button className={"border-black border-[1px] ml-4 px-2 rounded-md"} onClick={onAddGridRow}>ADD GRID ROW
          </button>
        </div>
      </div>
    </>
  );
}