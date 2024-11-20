"use client";

import { GridDriverData, Series, Team } from "@/app/types";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({subsets: ["latin"]});
const f1Text = localFont({
  src: [{
    path: "../fonts/F1NewRegular-Regular.otf",
    weight: "400",
    style: "normal"
  }, {
    path: "../fonts/F1NewRegular-Bold.otf",
    weight: "700",
    style: "normal"
  }, {
    path: "../fonts/F1NewRegular-Black.otf",
    weight: "900",
    style: "normal"
  }, {
    path: "../fonts/F1NewRegular-Italic.otf",
    weight: "400",
    style: "italic"
  }]
});

const startingGridEmblem = (driver: GridDriverData, series: Series) => {
  const getTeamColor = (team: Team) => {
    switch (team) {
      case "Alpine": return "text-[#ff87bc]";
      case "Aston Martin": return "text-[#008b72]";
      case "Ferrari": return "text-[#ff0028]";
      case "Mercedes": return "text-[#36d6bf]";
      case "Haas": return "text-[#b5babd]";
      case "McLaren": return "text-[#ff7800]";
      case "Racing Bulls": return "text-[#5894ff]";
      case "Red Bull Racing": return "text-[#1673cc]";
      case "Sauber": return "text-[#00e631]";
      case "Williams": return "text-[#00c1e1]";
      default: return "text-white";
    }
  }

  return(
    <>
      <div className={"relative bg-[#252525] w-full h-24"}>
        <div className={`absolute left-0 top-0 bottom-0 w-24 text-white ${f1Text.className} font-semibold text-5xl align-middle text-center leading-[6rem]`}>{driver.position}</div>
        <div className={`absolute left-24 top-0 bottom-0 right-0 ${driver.chineseName && "hidden"}`}>
          <div className={`h-1/3 align-middle pl-2 text-2xl text-white ${f1Text.className} font-normal italic leading-[3.5rem]`}>{driver.firstName}</div>
          <div className={`h-2/3 align-middle pl-2 text-5xl ${f1Text.className} font-normal italic uppercase leading-[3.5rem] ${getTeamColor(driver.team)}`}>{driver.lastName}</div>
        </div>
        <div className={`absolute left-24 top-0 bottom-0 right-0 ${!driver.chineseName && "hidden"}`}>
          <div className={`h-2/3 align-middle pl-2 text-5xl ${f1Text.className} font-normal italic uppercase leading-[4.5rem] ${getTeamColor(driver.team)}`}>{driver.lastName}</div>
          <div className={`h-1/3 align-middle pl-2 text-2xl text-white ${f1Text.className} font-normal italic leading-[0.5rem]`}>{driver.firstName}</div>
        </div>
        <img
          src={`assets/teamlogos/${series == "F1S" ? "f1" : series.toLowerCase()}/${driver.team.replace(/ /g, "-").toLowerCase()}.webp`}
          className={`block absolute right-0 top-0 bottom-0 h-24 z-1`}
        />
        <img
          src={`assets/investigation.webp`}
          className={`block absolute right-12 top-0 bottom-12 h-12 z-2 ${!driver.investigation && "hidden"}`}
        />
        <img
          src={`assets/penalty.webp`}
          className={`block absolute right-12 top-0 bottom-12 h-12 z-3 ${!driver.penalty && "hidden"}`}
        />
      </div>
    </>
  )
}

export default startingGridEmblem;