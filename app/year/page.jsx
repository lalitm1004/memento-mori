"use client";
import { useEffect, useState } from "react";

export default function Year() {
  const [msPassed, setMsPassed] = useState(0);
  const [msTotal, setMsTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const updateTimeMetrics = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const endOfYear = new Date(currentYear + 1, 0, 1);

      const msPassed = currentDate - startOfYear;
      const msTotal = endOfYear - startOfYear;

      setMsPassed(msPassed);
      setMsTotal(msTotal);
      setPercentage((msPassed / msTotal) * 100);
    };

    updateTimeMetrics(); // Initial calculation

    const updateIntervalMs = 1; // Update every millisecond
    const intervalId = setInterval(() => {
      updateTimeMetrics(); // Update metrics continuously
    }, updateIntervalMs);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <main>
      <div
        className={`w-screen h-screen flex flex-col md:flex-row justify-center items-center gap-2 text-xl`}
      >
        <p>The year is</p>
        <p className={`${percentage ? "text-left" : "text-center"} w-[180px]`}>
          {percentage ? percentage.toFixed(14): "----------"}
        </p>
        <p>% over</p>
      </div>
    </main>
  );
}