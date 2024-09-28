"use client";

import {Inter} from "next/font/google";
import {ScoreListItem} from "@/app/types";
import React, {useState} from "react";
import {teamBgColors, teamFgColors, teamShortNames} from "@/app/components/teams";

const inter = Inter({subsets: ["latin"]});

const scoreEmblems = (scoreList: ScoreListItem[]) => {

  let returnValue: JSX.Element[] = [];

  scoreList.forEach(scoreRow => {
    const homeTeamFgColorStyle = { "color": teamFgColors[scoreRow.homeTeam] } as React.CSSProperties;
    const homeTeamBgColorStyle = { "background-color": teamBgColors[scoreRow.homeTeam] } as React.CSSProperties;
    const visitingTeamFgColorStyle = { "color": teamFgColors[scoreRow.visitingTeam] } as React.CSSProperties;
    const visitingTeamBgColorStyle = { "background-color": teamBgColors[scoreRow.visitingTeam] } as React.CSSProperties;

    let shootoutClass = "";
    let noShootoutClass = "";
    if (scoreRow.final == "SO") {
      noShootoutClass = " hidden";
    } else {
      shootoutClass = " hidden";
    }

    returnValue.push(
      <div className="relative w-full h-20 bg-white border-b-[1px] border-gray-500">
        <div className="absolute left-0 right-1/2 z-0 top-0 bottom-0" style={visitingTeamBgColorStyle}>
          <div className={"absolute flex left-0 w-20 h-16 mt-2 ml-2 align-middle justify-center items-center"}>
            <img src={`/assets/logos/${scoreRow.visitingTeam}.png`}
                 className="absolute max-h-16 max-w-20 inline-block"/>
          </div>
          <div
            className={"absolute inline-block align-middle font-bold text-4xl leading-[4rem] mt-2 left-24 " + inter.className}
            style={visitingTeamFgColorStyle}>{teamShortNames[scoreRow.visitingTeam]?.toUpperCase()}</div>
        </div>
        {/* Scores if no SO */}
        <div
          className={"absolute inline-block align-middle bg-gray-300 right-1/2 top-0 bottom-0 w-20 z-1 font-semibold text-4xl leading-[5rem] text-center " + inter.className + noShootoutClass}>
          {String(scoreRow.visitingTeamScore)}
        </div>
        {/* Scores if SO */}
        <div
          className={"absolute inline-block align-middle bg-gray-300 right-1/2 top-0 bottom-0 w-20 z-1 font-semibold text-3xl leading-[4rem] text-center " + inter.className + shootoutClass}>
          {String(scoreRow.visitingTeamScore)}
        </div>
        <div className={"absolute inline-block right-1/2 bottom-1 w-20 h-4 z-2 font-semibold leading-4 text-left pl-2 " + inter.className + shootoutClass}>
          {String(scoreRow.visitingTeamShootoutScore)}
        </div>
        <div className="absolute left-1/2 right-0 z-0 top-0 bottom-0" style={homeTeamBgColorStyle}>
          <div className={"absolute flex right-0 w-20 h-16 mt-2 mr-2 align-middle justify-center items-center"}>
            <img src={`/assets/logos/${scoreRow.homeTeam}.png`}
                 className="absolute max-h-16 max-w-20 inline-block"/>
          </div>
          <div
            className={"absolute inline-block align-middle font-bold text-4xl leading-[4rem] mt-2 right-24 " + inter.className}
            style={homeTeamFgColorStyle}>{teamShortNames[scoreRow.homeTeam]?.toUpperCase()}</div>
        </div>
        {/* Scores if no SO */}
        <div
          className={"absolute inline-block align-middle bg-gray-300 left-1/2 top-0 bottom-0 w-20 z-1 font-semibold text-4xl leading-[5rem] text-center " + inter.className + noShootoutClass}>
          {String(scoreRow.homeTeamScore)}
        </div>
        {/* Scores if SO */}
        <div
          className={"absolute inline-block align-middle bg-gray-300 left-1/2 top-0 bottom-0 w-20 z-1 font-semibold text-3xl leading-[4rem] text-center " + inter.className + shootoutClass}>
          {String(scoreRow.homeTeamScore)}
        </div>
        <div className={"absolute inline-block left-1/2 bottom-1 w-20 h-4 z-2 font-semibold leading-4 text-right pr-2 " + inter.className + shootoutClass}>
          {String(scoreRow.homeTeamShootoutScore)}
        </div>
        {/* Final Indicator */}
        <div className={"absolute inline-block left-0 right-0 bottom-1 h-4 z-3 font-semibold leading-4 text-center " + inter.className}>
          {scoreRow.final}
        </div>
      </div>
    );
  });
  return (
    <>
      {returnValue}
    </>
  );
}

export default scoreEmblems;