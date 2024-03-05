"use client";
import { useEffect, useState } from "react"

export default function Year() {
  
  const [msPassed, setMsPassed] = useState(null);
  const [msTotal, setMsTotal] = useState(null);
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const currentDate = new Date();
    const startOfYear = new Date(currentYear, 0, 1);
    setMsPassed(currentDate - startOfYear);

    const nextYear = currentYear + 1;
    const endOfYear = new Date(nextYear, 0, 1);
    setMsTotal(endOfYear - startOfYear);
  }, [])

  useEffect(() => {
    const updateIntervalMs = 1;
    const intervalId = setInterval(() => {
      setPercentage((msPassed / msTotal) * 100)
      setMsPassed(prev => prev + updateIntervalMs);
    }, updateIntervalMs)
    return () => clearInterval(intervalId);
  }, [msPassed, msTotal])

  return (
    <main>
      <div className={`w-screen h-screen flex flex-col md:flex-row justify-center items-center gap-2 text-xl`}>
        <p>The year is</p>
        <p className={`${percentage ? "text-left" : "text-center"} w-[200px]`}>{(percentage) ? percentage : "----------"}</p>
        <p>% over</p>
      </div>  
    </main>
  )    
}