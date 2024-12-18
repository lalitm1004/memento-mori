"use client";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";


export default function Home() {

  const [input, setInput] = useState("");
  const [weeksLived, setWeeksLived] = useState(0);
  const [progress, setProgress] = useState(0);
  const [valid, setValid] = useState(null);
  const [svgArray, setSvgArray] = useState(null);
  const [showProgress, setShowProgress] = useState(false);

  const handleInput = (event) => {

    const checkValidity = (dateString) => {
      const dateFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

      if (!dateFormat.test(dateString)) {
        return (valid == null) ? null : false;
      }

      let [, day, month, year] = dateString.match(dateFormat);

      day = parseInt(day, 10);
      month = parseInt(month, 10);
      year = parseInt(year, 10);

      if (month < 1 || month > 12) {
        return (valid == null) ? null : false;
      }

      if (day < 1 || day > 31) {
        return (valid == null) ? null : false;
      }

      const today = new Date()
      if (year > today.getFullYear()) {
        return (valid == null) ? null : false;
      }

      if (year == today.getFullYear()) {
        if (month > today.getMonth() + 1) {
          return (valid == null) ? null : false;
        } else if (month == today.getMonth() + 1) {
          if (day > today.getDate()) {
            return (valid == null) ? null : false;
          }
        }
      }

      if (year < today.getFullYear() - 79) {
        return (valid == null) ? null : false;
      }

      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) {
        return (valid == null) ? null : false;
      }

      return true;
    }

    setValid(checkValidity(event.target.value));
    setInput(event.target.value);
  }

  const handleClick = () => {
    const weeksPassedSince = (dateString) => {
      const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
      const inputDate = new Date(year, month - 1, day);
      const differenceMs = Date.now() - inputDate.getTime();
      const weeksPassed = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 7));
      return weeksPassed;
    }
    setShowProgress(true);
    setWeeksLived(0);
    setTimeout(() => setWeeksLived(weeksPassedSince(input)), 1);
  }

  useEffect(() => {
    const main = async () => {
      const setCalendar = (weeksLived) => {

        const BG = "#EBE7B8"
        const FILL = "#000000"
        const STROKE = "#000000"

        const intialX = 55;
        const initialY = 55;
        const boxWidth = 25;
        const gap = 10;
        const moat = 50;

        let x_offset = 0;
        let y_offset = 0;

        const rowsColored = Math.floor(weeksLived / 52);
        const boxesColored = weeksLived - 52 * rowsColored;
        const boxesBlank = 52 - boxesColored;

        const localSvgArray = []

        const getRectangle = (x, y, week, fill) => {
          return (
            <rect id={week} x={x} y={y} width={boxWidth} height={boxWidth} fill={(fill ? FILL : BG)} stroke={STROKE}><title>{`Week ${week}`}</title></rect>
          )
        }

        // Colored rows
        for (let i = 0; i < rowsColored; i++) {
          for (let j = 0; j < 52; j++) {
            localSvgArray.push(getRectangle(
              intialX + x_offset,
              initialY + y_offset,
              i * 52 + j + 1,
              true
            ))
            x_offset += boxWidth + gap;
          }
          if ((i + 1) % 10 == 0) {
            y_offset += moat + gap;
          } else {
            y_offset += boxWidth + gap;
          }
          x_offset = 0;
        }

        // For colored boxes in carryover row
        for (let i = 0; i < boxesColored; i++) {
          localSvgArray.push(getRectangle(
            intialX + x_offset,
            initialY + y_offset,
            rowsColored * 52 + i + 1,
            true
          ))
          x_offset += boxWidth + gap;
        }

        // Empty boxes in carryover row
        for (let i = 0; i < boxesBlank; i++) {
          localSvgArray.push(getRectangle(
            intialX + x_offset,
            initialY + y_offset,
            rowsColored * 52 + boxesColored + i + 1,
            false,
          ));
          x_offset += boxWidth + gap;
        }

        if ((rowsColored + 1) % 10 == 0) {
          y_offset += moat + gap;
        } else {
          y_offset += boxWidth + gap;
        }
        x_offset = 0;

        // Remaining empty rows
        let emptyRowNum = 1;
        for (let i = rowsColored + 1; i < 80; i++) {
          for (let j = 0; j < 52; j++) {
            localSvgArray.push(getRectangle(
              intialX + x_offset,
              initialY + y_offset,
              (rowsColored + emptyRowNum) * 52 + j + 1,
              false
            ));
            x_offset += boxWidth + gap;
          }
          if ((i + 1) % 10 == 0) {
            y_offset += moat + gap;
          } else {
            y_offset += boxWidth + gap;
          }
          x_offset = 0;
          emptyRowNum += 1
        }
        setSvgArray(localSvgArray);
      }

      const stepSize = 8;
      for (let i = 0; i <= weeksLived; i = i + ((weeksLived - i > stepSize) ? stepSize : 1)) {
        await new Promise(r => setTimeout(r, 1));
        setCalendar(i);
        setProgress(i);
      }
    }
    main();
  }, [weeksLived])

  useEffect(() => {
    const button = document.getElementById("submit-button");
    const handleKeyDown = (event) => {
      console.log("keydown")
      if (event.key === "Enter") {
        console.log("enter")
        console.log(valid);
        if (valid) {
          console.log("valid")
          button.click();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [valid])

  useEffect(() => {
    const input = document.getElementById("birthday");
    input.select();
  }, [])

  return (
    <main>
      <div className={`overflow-hidden`}>
        <div className="flex flex-col justify-center items-center mb-4">
          <h1 className="text-black my-5 text-4xl md:text-7xl">Memento Mori</h1>
          <motion.div
            className="sex w-full flex flex-col justify-center items-center"
            animate={{
              scaleY: [0.2 , (showProgress) ? 1 : 0.2],
              translateY: (showProgress) ? [0, 5] : [0]
            }}
            transition={{
              ease: "easeInOut"
            }}
          >
            <Progress
              className="w-[75%] md:w-[40%] h-[10px]"
              value={(showProgress) ? progress / (52 * 80) * 100 : 100}
            />
          </motion.div>
            <motion.div
              className={`w-[75%] md:w-[40%] px-1 flex justify-between`}
              animate={{
                translateY: (showProgress) ? [0,5] : [0]
              }}
              transition={{
                ease: "easeInOut"
              }}
            >
              <div className={`w-1/3 flex justify-center items-center`}>
                <Link href={"/year"} className="opacity-85 hover:opacity-50">Year</Link>
              </div>
              <div className={`w-1/3 flex justify-center items-center`}>
                <Link href={"https://github.com/lalitm1004"} target="_blank" className="opacity-85 hover:opacity-50">Github</Link>
              </div>
            </motion.div>
        </div>
        <motion.div
          className="w-full flex flex-row justify-center items-center"
          initial={{translateX:56/2}}
          animate={{
            translateX: (valid) ? [56/2, 0] : ((valid == null) ? [56/2] : [0, 56/2])
          }}
        >
          <div className="flex h-full flex-col items-center">
            <Label htmlFor="birthday" className='text-left w-full ml-2 mb-1'>Enter your birthday</Label>
            <Input
              id="birthday"
              className="h-[65px] w-[200px] z-20 bg-cream opacity-100 border border-black mr-2 text-xl"
              placeholder="DD/MM/YYYY"
              onChange={handleInput}
            />
          </div>
          <motion.div
            className="border mt-[16px] h-full border-black rounded-full z-10"
            initial={{translateX: -70}}
            animate={{
              translateX: (valid) ? [-70, 0] : ((valid == null) ? [-70] : [0, -70])
            }}
          >
            <Button
              id="submit-button"
              className="bg-inherit h-[56px] w-[56px] hover:bg-inherit hover:opacity-30 active:opacity-20 flex justify-center items-center"
              onClick={handleClick}
              disabled={(progress !== 0) && (progress !== weeksLived)}
            >
              <Skull color="#000000"/>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex justify-center w-full"
        >
          <svg
            viewBox="0 0 1920 3070"
            className={`w-[75%] md:w-[40%]`}
          >
            {svgArray && svgArray.map(x => x)}
          </svg>
        </motion.div>
      </div>
    </main>
  );
}
