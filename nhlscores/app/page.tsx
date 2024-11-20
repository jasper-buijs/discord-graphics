"use client";

import {Inter} from "next/font/google";
import scoreEmblems from "@/app/components/scoreEmblem";
import scheduleEmblems from "@/app/components/scheduleEmblem";
import { useEffect, useRef, useState } from "react";
import {FinalType, ScheduleListItem, ScoreListItem, Team} from "@/app/types";
import {teamAb} from "@/app/components/teams";
import {fetchSchedule, fetchScores} from "@/app/components/fetchAPI";
// @ts-ignore
//import { useScreenshot } from "use-react-screenshot";
import { useScreenshot } from "use-screenshot-hook";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const ref = useRef<any>(null);
  const {image, takeScreenshot} = useScreenshot();
  useEffect(() => {
    if (!image) return;
    const date = new Date();
    let name = `${String(date.getFullYear()).substring(2, 4)}${String(date.getMonth() + 1)}${String(date.getDate())}.png`;
    let link = document.createElement("a");
    link.href = image || "";
    link.download = name;
    link.click();
    link.remove();
  }, [image]);
  const onTakeScreenshot = () => {
    takeScreenshot(ref.current);
  }
  /*function onTakeScreenshot () {
    const graphic = document.getElementById("graphic");

  }*/

  const [title, setTitle] = useState<string>("NHL Regular Season")

  const [scoreList, updateScoreList] = useState<ScoreListItem[]>([/*{
    final: "F",
    visitingTeam: "CHI",
    visitingTeamScore: 2,
    homeTeam: "SJS",
    homeTeamScore: 3
  }, {
    final: "SO",
    visitingTeam: "ANA",
    visitingTeamScore: 0,
    visitingTeamShootoutScore: 0,
    homeTeam: "BOS",
    homeTeamScore: 1,
    homeTeamShootoutScore: 2
  }, {
    final: "2OT",
    visitingTeam: "MTL",
    visitingTeamScore: 3,
    homeTeam: "STL",
    homeTeamScore: 2,
  }*/]); // defined value

  const [scheduleList, updateScheduleList] = useState<ScheduleListItem[]>([/*{
    visitingTeam: "NSH",
    homeTeam: "LAK",
    time: new Date("September 21, 2024 19:00:00"),
    neutralIce: true
  }, {
    visitingTeam: "NJD",
    homeTeam: "OTT",
    time: new Date("September 22, 2024 01:00:00")
  }*/]); // defined value



  function onFetchSchedule() {
    fetchSchedule(updateScheduleList);
  }

  function onFetchScore() {
    fetchScores(updateScoreList);
  }



  const [finalTypeSelectorScoreValue, setFinalTypeSelectorScoreValue] = useState<FinalType>("F");
  function onFinalTypeSelectorScoreChange (event: any) {
    setFinalTypeSelectorScoreValue(event.target.value);
  }

  const [visitingTeamSelectorScoreValue, setVisitingTeamSelectorScoreValue] = useState<Team>("ANA");
  function onVisitingTeamSelectorScoreChange (event: any) {
    setVisitingTeamSelectorScoreValue(event.target.value);
  }

  const [visitingTeamRegulationScoreSelectorValue, setVisitingTeamRegulationScoreSelectorValue] = useState<number>(0);
  function onVisitingTeamRegulationScoreSelectorChange (event: any) {
    setVisitingTeamRegulationScoreSelectorValue(event.target.value);
  }

  const [visitingTeamShootoutScoreSelectorValue, setVisitingTeamShootoutScoreSelectorValue] = useState<number>(0);
  function onVisitingTeamShootoutScoreSelectorChange (event: any) {
    setVisitingTeamShootoutScoreSelectorValue(event.target.value);
  }

  const [homeTeamSelectorScoreValue, setHomeTeamSelectorScoreValue] = useState<Team>("ANA");
  function onHomeTeamSelectorScoreChange (event: any) {
    setHomeTeamSelectorScoreValue(event.target.value);
  }

  const [homeTeamRegulationScoreSelectorValue, setHomeTeamRegulationScoreSelectorValue] = useState<number>(0);
  function onHomeTeamRegulationScoreSelectorChange (event: any) {
    setHomeTeamRegulationScoreSelectorValue(event.target.value);
  }

  const [homeTeamShootoutScoreSelectorValue, setHomeTeamShootoutScoreSelectorValue] = useState<number>(0);
  function onHomeTeamShootoutScoreSelectorChange (event: any) {
    setHomeTeamShootoutScoreSelectorValue(event.target.value);
  }

  function onAddGameToScore() {
    const game: ScoreListItem = {
      final: finalTypeSelectorScoreValue,
      homeTeam: homeTeamSelectorScoreValue,
      homeTeamScore: homeTeamRegulationScoreSelectorValue,
      homeTeamShootoutScore: (finalTypeSelectorScoreValue == "SO") ? homeTeamShootoutScoreSelectorValue : undefined,
      visitingTeam: visitingTeamSelectorScoreValue,
      visitingTeamScore: visitingTeamRegulationScoreSelectorValue,
      visitingTeamShootoutScore: (finalTypeSelectorScoreValue == "SO") ? visitingTeamShootoutScoreSelectorValue : undefined
    }
    updateScoreList(Array.prototype.concat(scoreList, [game]));
  }

  function onDeleteGameFromScore(i: number) {
    let newScoreList: ScoreListItem[] = scoreList.toSpliced(i, 1);
    updateScoreList(newScoreList);
  }

  function onEditShootoutScore(i: number) {
    let oldScores = [...scoreList];
    oldScores[i].homeTeamShootoutScore = Number(prompt(`Shootout goals scored by ${scoreList[i].homeTeam}:`, "0"));
    oldScores[i].visitingTeamShootoutScore = Number(prompt(`Shootout goals scores by ${scoreList[i].visitingTeam}:`, "0"));
    updateScoreList(oldScores);
  }

  function showRegisteredScores () {
    let returnValue = [];
    for (let i = 0; i < scoreList.length; i++) {
      let shootoutGame = (scoreList[i].final == "SO");
      let shootoutScoreEditClass = shootoutGame ? "" : " hidden";
      returnValue.push(<>
        <div className={"inline-block mt-2"}>{`Game ${i+1}: ${scoreList[i].visitingTeam} vs ${scoreList[i].homeTeam}`}</div>
        <button
          className={"inline-block ml-4 px-2 border-[1px] border-red-600 text-red-600 rounded-md hover:text-white hover:bg-red-600"}
          onClick={() => onDeleteGameFromScore(i)}>
          DELETE
        </button>
        <button
          className={"inline-block ml-4 px-2 border-[1px] border-orange-600 text-orange-600 rounded-md hover:text-black hover:bg-orange-600" + shootoutScoreEditClass}
          onClick={() => onEditShootoutScore(i)}>
          EDIT SHOOTOUT SCORE
        </button>
        <br />
      </>);
    }
    return (returnValue);
  }



  const [visitingTeamSelectorScheduleValue, setVisitingTeamSelectorScheduleValue] = useState<Team>("ANA");
  function onVisitingTeamSelectorScheduleChange (event: any) {
    setVisitingTeamSelectorScheduleValue(event.target.value);
  }

  const [homeTeamSelectorScheduleValue, setHomeTeamSelectorScheduleValue] = useState<Team>("ANA");
  function onHomeTeamSelectorScheduleChange (event: any) {
    setHomeTeamSelectorScheduleValue(event.target.value);
  }

  const [scheduleTimeSelectorValue, setScheduleTimeSelectorValue] = useState<any>();
  function onScheduleTimeSelectorChange (event: any) {
    setScheduleTimeSelectorValue(event.target.value);
  }

  const [neutralIceSelectorScheduleValue, setNeutralIceSelectorScheduleValue] = useState<boolean>(false);
  function onNeutralIceSelectorChange (_event: any) {
    setNeutralIceSelectorScheduleValue(!neutralIceSelectorScheduleValue);
  }

  function onAddGameToSchedule() {
    const timeArray = scheduleTimeSelectorValue.split(":");
    let time = new Date()
    time.setHours(timeArray[0], timeArray[1]);
    const game: ScheduleListItem = {
      homeTeam: homeTeamSelectorScheduleValue,
      visitingTeam: visitingTeamSelectorScheduleValue,
      time: time,
      neutralIce: neutralIceSelectorScheduleValue
    }
    updateScheduleList(Array.prototype.concat(scheduleList, [game]));
  }

  function onDeleteGameFromSchedule(i: number) {
    let newScheduleList: ScheduleListItem[] = scheduleList.toSpliced(i, 1);
    updateScheduleList(newScheduleList);
  }

  function showRegisteredScheduledGames () {
    let returnValue = [];
    for (let i = 0; i < scheduleList.length; i++) {
      returnValue.push(<>
        <div className={"inline-block mt-2"}>{`Game ${i+1}: ${scheduleList[i].visitingTeam} @ ${scheduleList[i].homeTeam}`}</div>
        <button
          className={"inline-block ml-4 px-2 border-[1px] border-red-600 text-red-600 rounded-md hover:text-white hover:bg-red-600"}
          onClick={() => onDeleteGameFromSchedule(i)}>
          DELETE
        </button>
        <br />
      </>);
    }
    return (returnValue);
  }

  return (
    <>
      {/* GRAPHIC PREVIEW */}
      <div className="bg-black w-[1800px] overflow-y-scroll" id={"root"} ref={ref}>
        {/* Header */}
        <div className="sticky top-0 w-full h-32 bg-[#252525] text-center">
          <img src="/assets/NHL.png" className="h-full py-4 pr-8 inline-block" alt="NHL" />
          <div className={"inline-block text-white font-semibold text-5xl align-middle " + inter.className}>
            {title}
          </div>
        </div>

        {/* Left Column */}
        <div className="w-1/2 float-left">
          <div
            className={"h-16 text-center bg-[#1f1f1f] text-white leading-[4rem] text-2xl border-r-[1px] border-black " + inter.className}
          >
            Yesterday&apos;s Scores
          </div>
          <div className="relative">
            {scoreEmblems(scoreList)}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2 float-right">
          <div
            className={"h-16 text-center bg-[#1f1f1f] text-white leading-[4rem] text-2xl " + inter.className}
          >
            Tonight&apos;s Game Schedule
          </div>
          <div className="relative pt-4">
            {scheduleEmblems(scheduleList)}
          </div>
        </div>
      </div>


      {/* TITLE CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Screenshot</div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Save Screenshot:</div>
          <button className={"border-black border-[1px] px-2 rounded-md"} onClick={onTakeScreenshot}>SCREENSHOT</button>
        </div>
      </div>
      <div className={"m-4"}>
        <div className={"text-2xl"}>Set Graphic Title</div>
        <div className={"m-4"}>
          <select name={"titleSelector"} defaultValue="NHL Regular Season" onChange={(t) => setTitle(t.target.value)}>
            {["NHL Pre-Season", "NHL Regular Season", "NHL Stanley Cup Playoffs"].map(t => <option key={t}
            >{t}</option>)}
          </select>
        </div>
      </div>


      {/* API FETCH CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Fetch Games from NHL API</div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Fetch Today&apos;s Schedule:</div>
          <button className={"border-black border-[1px] px-2 rounded-md"} onClick={onFetchSchedule}>FETCH & OVERWRITE
          </button>
          <div className={"inline-block ml-4 italic"}>(This can take up to a minute)</div>
        </div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Fetch Yesterday&apos;s Scores:</div>
          <button className={"border-black border-[1px] px-2 rounded-md"} onClick={onFetchScore}>FETCH & OVERWRITE
          </button>
          <div className={"inline-block ml-4 italic"}>(This can take up to a minute) - SHOOTOUT SCORE WILL NOT BE SET
            AUTOMATICALLY
          </div>
        </div>
      </div>


      {/* SCORE CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Yesterday&apos;s Scores</div>
        <div className={"inline-block mr-2"}>Add game:</div>
        <select name={"finalTypeSelectorScore"} onChange={onFinalTypeSelectorScoreChange}>
          {["F", "OT", "SO", "2OT", "3OT", "4OT", "5OT", "6OT"].map(f => <option key={f}>{f}</option>)}
        </select>
        <select name={"visitingTeamSelectorScore"} onChange={onVisitingTeamSelectorScoreChange}>
          {teamAb.map(ab => <option key={ab}>{ab}</option>)}
        </select>
        <input type={"number"} name={"visitingTeamRegulationScoreSelector"} defaultValue={0} required={true}
          className={"ml-2 w-8"} onChange={onVisitingTeamRegulationScoreSelectorChange}
        />
        <input type={"number"} name={"visitingTeamShootoutScoreSelector"} defaultValue={0} required={false}
          className={"ml-2 w-8"} onChange={onVisitingTeamShootoutScoreSelectorChange}
        />
        <div className={"inline-block mx-1"}>vs</div>
        <select name={"homeTeamSelectorScore"} onChange={onHomeTeamSelectorScoreChange}>
          {teamAb.map(ab => <option key={ab}>{ab}</option>)}
        </select>
        <input type={"number"} name={"homeTeamRegulationScoreSelector"} defaultValue={0} required={true}
          className={"ml-2 w-8"} onChange={onHomeTeamRegulationScoreSelectorChange}
        />
        <input type={"number"} name={"homeTeamShootoutScoreSelector"} defaultValue={0} required={false}
          className={"ml-2 w-8"} onChange={onHomeTeamShootoutScoreSelectorChange}
        />
        <button className={"border-black border-[1px] ml-4 px-2 rounded-md"} onClick={onAddGameToScore}>ADD</button>
        <div className={"m-4"}>
          {showRegisteredScores()}
        </div>
      </div>


      {/* SCHEDULE CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Tonight&apos;s Game Schedule</div>
        <div className={"inline-block mr-2"}>Add game:</div>
        <select name={"visitingTeamSelectorSchedule"} onChange={onVisitingTeamSelectorScheduleChange}>
          {teamAb.map(ab => <option key={ab}>{ab}</option>)}
        </select>
        <div className={"inline-block mx-1"}>@</div>
        <select name={"homeTeamSelectorSchedule"} onChange={onHomeTeamSelectorScheduleChange}>
          {teamAb.map(ab => <option key={ab}>{ab}</option>)}
        </select>
        <div className={"inline-block mx-2"}>at time (Brussels timezone)</div>
        <input type={"time"} name={"scheduleTimeSelector"} required={true} onChange={onScheduleTimeSelectorChange} />
        <div className={"inline-block ml-2 mr-1"}>Neutral Ice:</div>
        <input type={"checkbox"} name={"neutralIceSelectorSchedule"} required={false}
          onChange={onNeutralIceSelectorChange}
        />
        <button className={"border-black border-[1px] ml-4 px-2 rounded-md"} onClick={onAddGameToSchedule}>ADD</button>
        <div className={"m-4"}>
          {showRegisteredScheduledGames()}
        </div>
      </div>
    </>
  );
}
