/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import scheduleEmblems from "@/app/components/scheduleEmblem";
import { time, TimestampStyles } from "@discordjs/formatters";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import useScreenshot from "use-screenshot-hook";
import scoreEmblems from "./components/scoreEmblem";

import schedule from "./components/schedule.json";

const inter = Inter({subsets: ["latin"]});

export default function Home() {

  const groupA = ["CAN", "USA", "FIN", "LAT", "GER"];
  const groupB = ["SWE", "CZE", "SVK", "KAZ", "SUI"];

  const ref = useRef<any>(null);

  const {image: saveImage, takeScreenshot: saveScreenshot} = useScreenshot();
  useEffect(() => {
    if (!saveImage) return;
    const date = new Date();
    const name = `${String(date.getFullYear()).substring(2, 4)}${String(date.getMonth() + 1)}${String(date.getDate())}.png`;
    const link = document.createElement("a");
    link.href = saveImage || "";
    link.download = name;
    link.click();
    link.remove();
  }, [saveImage]);
  const onSaveScreenshot = () => {
    saveScreenshot(ref.current);
  }

  function dataURLToBlob(dataURL: string) {
    const parts = dataURL.split(',');
    const byteString = atob(parts[1]);
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mimeString = mimeMatch?.[1] ?? 'application/octet-stream';

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  // const webhookUrls = [String(Bun.env.WEBHOOK_TEST)];
  const webhookUrls = [String(Bun.env.WEBHOOK_1), String(Bun.env.WEBHOOK_2)];
  const {image: sendImage, takeScreenshot: sendScreenshot} = useScreenshot();
  useEffect(() => {
    if (!sendImage) return;
    webhookUrls.forEach(url => {
      const form = new FormData();
      //form.append("file", sendImage);
      form.append("file", dataURLToBlob(sendImage), "preliminary-today.png");
      form.append("payload_json", JSON.stringify({
        content: `## ${time(new Date(), TimestampStyles.LongDate)}`,
        username: "IIHF World Juniors - Preliminary Round",
      }));
      console.log(form);
      fetch(url, {
        method: "POST",
        headers: {"Content-Disposition": "form-data"},
        body: form
      }).then(r => console.log(r));
      /*fetch(url, {
       method: "POST",
       headers: { "Content-Disposition": "form-data"; name="payload_json", "Content-Type": "application/json" },
       body: JSON.stringify({
       content: `## ${time(new Date(), TimestampStyles.LongDate)}`,
       username: "National Hockey League - Regular Season",

       })
       });*/
    });
  }, [sendImage]);
  const onSendScreenshot = () => {
    sendScreenshot(ref.current);
  }

  const [title] = useState<string>("Ice Hockey World Championship");
  const [tournamentLogo] = useState<string>("/assets/WorldJuniors.png");
  const [gamesToday, setGamesToday] = useState<any[]>([]);
  const [gamesYesterday, setGamesYesterday] = useState<any[]>([]);

  const newGT: any[] = [];
  const newGY: any[] = [];
  if (gamesYesterday.length == 0) {
    schedule.games.forEach(game => {
      const date = new Date(Date.now());
      const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      date.setDate(date.getDate() - 1);
      const yesterday = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      console.log(game.localDate, today, yesterday);
      if (game.localDate == today) {
        newGT.push(game);
      } else if (game.localDate == yesterday) {
        const scoreGame: any = game;
        scoreGame.homeScore = prompt(`${scoreGame.home} score against ${scoreGame.visiting}?`);
        scoreGame.visitingScore = prompt(`${scoreGame.visiting} score against ${scoreGame.home}?`);
        if (scoreGame.shootout) {
          scoreGame.homeSO = prompt(`${scoreGame.home} goals in SO?`);
          scoreGame.visitingSO = prompt(`${scoreGame.visiting} score in SO?`);
        }
        newGY.push(scoreGame);
      }
    });
    //const [gamesToday] = useState<any[]>(newGT);
    //const [gamesYesterday] = useState<any[]>(newGY);
    setGamesToday(newGT);
    setGamesYesterday(newGY);
  }

  return (
    <>
      {/* GRAPHIC PREVIEW */}
      <div className="bg-black w-[1800px] overflow-y-scroll" id={"root"} ref={ref}>
        {/* Header */}
        <div className="sticky top-0 w-full h-32 bg-[#252525] text-center">
          <img src={tournamentLogo} className="h-full py-4 pr-8 inline-block" alt="IIHF" />
          <div className={"inline-block text-white font-semibold text-5xl align-middle " + inter.className}>
            {title}
          </div>
        </div>

        {/* Left Column */}
        <div className="w-1/3 float-left">
          <div className={"h-16 text-center bg-[#1f1f1f] text-white leading-[4rem] text-2xl border-r-[1px] border-black " + inter.className}>
            Yesterday&apos;s Scores
          </div>
          <div className="relative">
            { scoreEmblems(gamesYesterday) }
          </div>
        </div>

        {/* Center Column */}
        <div className="w-1/3 float-left">
          <div
            className={"h-16 text-center bg-[#1f1f1f] text-white leading-[4rem] text-2xl border-r-[1px] border-black " + inter.className}
          >
            Today&apos;s Game Schedule
          </div>
          <div className="relative">
            { scheduleEmblems(gamesToday) }
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3 float-left">
          <div className={"h-16 text-center bg-[#1f1f1f] text-white leading-[4rem] text-2xl border-r-[1px] border-black " + inter.className}>
            Group Standings
          </div>
          <div className="relative">
            <div className="relative w-full h-20">
              <div className="absolute left-0 right-1/2 z-0 top-0 bottom-0">
                <div className={"w-full text-center text-white text-2xl pt-2"}>Group A</div>
                { groupA.map((name, i) =>
                  <div key={i} className="w-full text-center text-white text-xl mt-1">
                    <div className={"inline-block align-middle"}>{String(i + 1) + "."}</div>
                    <img src={`/assets/logos/${name}.png`} className={"h-[2rem] inline-block ml-2 align-middle"} />
                  </div>
                )}
              </div>
              <div className="absolute left-1/2 right-0 z-0 top-0 bottom-0">
                <div className={"w-full text-center text-white text-2xl pt-2"}>Group B</div>
                { groupB.map((name, i) =>
                  <div key={i} className="w-full text-center text-white text-xl mt-1">
                    <div className={"inline-block align-middle"}>{String(i + 1) + "."}</div>
                    <img src={`/assets/logos/${name}.png`} className={"h-[2rem] inline-block ml-2 align-middle"} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TITLE CONFIG */}
      <div className={"m-4"}>
      <div className={"text-2xl"}>Screenshot</div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Save Screenshot:</div>
          <button className={"border-black border-[1px] px-2 rounded-md"} onClick={onSaveScreenshot}>SAVE SCREENSHOT</button>
        </div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Take and Send Screenshot:</div>
          <button className={"border-black border-[1px] px-2 rounded-md"} onClick={onSendScreenshot}>SEND SCREENSHOT</button>
        </div>
      </div>
    </>
  );
}
