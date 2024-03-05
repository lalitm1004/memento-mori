import P from "@/components/P";
import { Noto_Serif_Khojki } from "next/font/google";

const noto = Noto_Serif_Khojki({subsets: ["latin"]});

export default function Custom404() {
  return (
    <main>
      <div className={`${noto.className} h-screen w-screen bg-cream flex flex-col justify-bet items-center`}>
        <div className="flex-shrink">
          <p className={`text-4xl md:text-7xl`}>
            404
          </p>
        </div>

        <div className="flex flex-grow flex-col justify-center items-center px-10 overflow-x-hidden">
          <P>The time you have is limited. There is nothing to find here.</P>
        </div>
      </div>
    </main>
  )
}