"use client"

import {Inter} from "next/font/google";
import {useState} from "react";
import {ScheduleListItem} from "@/app/types";
import {teamFullNames} from "@/app/components/teams";

const inter = Inter({subsets: ["latin"]});

const scheduleEmblems = (scheduleList: ScheduleListItem[]) => {

  let returnValue: JSX.Element[] = [];

  scheduleList.forEach(scheduleRow => {
    let neutralIce = "";
    let notNeutralIce = "";
    if (scheduleRow.neutralIce) {
      notNeutralIce = " hidden";
    } else {
      neutralIce = " hidden";
    }

    if (!scheduleRow) return;

    let timeColor = (scheduleRow.time.getHours() > 7) && (scheduleRow.time.getHours() < 23) ? " text-yellow-500" : " text-white";


    returnValue.push(
      <div className="block w-full text-center">
        {/* Left Team */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + notNeutralIce}>
          {teamFullNames[scheduleRow.visitingTeam]}
        </div>
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + neutralIce}>
          {teamFullNames[scheduleRow.homeTeam]}
        </div>
        {/* Separator */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + notNeutralIce}>
          @
        </div>
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + neutralIce}>
          v.
        </div>
        {/* Right Team */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + notNeutralIce}>
          {teamFullNames[scheduleRow.homeTeam] + ","}
        </div>
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + neutralIce}>
          {teamFullNames[scheduleRow.visitingTeam] + ","}
        </div>
        {/* Time */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + timeColor}>
          {scheduleRow.time.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"})}
        </div>
      </div>
    )
  })

  return (returnValue);
}

export default scheduleEmblems;