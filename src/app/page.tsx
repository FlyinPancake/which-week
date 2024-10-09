"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodText, setPeriodText] = useState("");

  useEffect(() => {
    const startDateObj = new Date("2024-09-02");
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
    } else if (diffWeeks === 15) {
      setPeriodText("Póthét");
    } else {
      setPeriodText("Vizsgaidőszak");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Szemeszter Számláló
        </h1>
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
          <p className="text-6xl font-bold text-blue-600 mb-4">{periodText}</p>
          <p className="text-xl text-gray-600">
            {startDate} - {endDate}
          </p>
          {currentWeek > 15 && (
            <p className="mt-4 text-purple-500 font-semibold">
              Jó felkészülést a vizsgákra!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
