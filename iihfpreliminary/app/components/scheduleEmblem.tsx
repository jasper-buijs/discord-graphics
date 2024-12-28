"use client"

import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

const teamFullNames = {
  "CAN": "Canada",
  "FIN": "Finland",
  "GER": "Germany",
  "LAT": "Latvia",
  "USA": "United States",
  "CZE": "Czechia",
  "KAZ": "Kazakhstan",
  "SVK": "Slovakia",
  "SWE": "Sweden",
  "SUI": "Switzerland"
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scheduleEmblems = (scheduleList: any[]) => {

  const returnValue: JSX.Element[] = [];

  scheduleList.forEach(scheduleRow => {
    if (!scheduleRow) return;

    const timeColor = (Number(scheduleRow.utcTime.substring(0, 2)) > 7) && (Number(scheduleRow.utcTime.substring(0, 2)) < 23) ? " text-yellow-500" : " text-white";


    returnValue.push(
      <div className="block w-full text-center">
        {/* Left Team */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className}>
          {
            // @ts-expect-error idkwhy
            teamFullNames[scheduleRow.home]
          }
        </div>
        {/* Separator */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className}>
          vs.
        </div>
        {/* Right Team */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className}>
          {
            // @ts-expect-error idkwhy
            teamFullNames[scheduleRow.visiting] + ","
          }
        </div>
        {/* Time */}
        <div className={"inline-block font-medium text-white text-xl p-2 " + inter.className + timeColor}>
          {`${Number(scheduleRow.utcTime.substring(0, 2)) + 1}:${scheduleRow.utcTime.substring(3, 5)}`}
        </div>
      </div>
    )
  })

  return (returnValue);
}

export default scheduleEmblems;