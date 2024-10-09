"use client";

import { useState, useEffect } from "react";

export default function OECounter() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodText, setPeriodText] = useState("");

  useEffect(() => {
    const startDateObj = new Date("2024-09-09");
    const now = new Date();
    const diffTime = now.getTime() - startDateObj.getTime();
    const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000)) + 1;

    setCurrentWeek(diffWeeks);

    const weekStartDate = new Date(
      startDateObj.getTime() + (diffWeeks - 1) * 7 * 24 * 60 * 60 * 1000
    );
    const weekEndDate = new Date(
      weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000
    );

    const hungarianDateFormatter = new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setStartDate(hungarianDateFormatter.format(weekStartDate));
    setEndDate(hungarianDateFormatter.format(weekEndDate));

    if (diffWeeks <= 14) {
      setPeriodText(`${diffWeeks}. hét`);
    } else {
      setPeriodText("Vizsgaidőszak");
    }
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        background:
          "linear-gradient(135deg, #1d294d 0%, #2d3a5d 40%, #3d4b6d 60%, #fcaf17 100%)",
      }}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Óbudai Egyetem Szemeszter Számláló
        </h1>
        <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-8 text-center">
          <p className="text-6xl font-bold text-[#1d294d] mb-4">{periodText}</p>
          <p className="text-xl text-gray-700">
            {startDate} - {endDate}
          </p>
          {currentWeek > 14 && (
            <p className="mt-4 text-[#fcaf17] font-semibold">
              Jó felkészülést a vizsgákra!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
