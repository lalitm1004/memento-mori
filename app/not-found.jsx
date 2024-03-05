export default function Custom404() {
  return (
    <main>
      <div className={`h-screen w-screen bg-cream flex flex-col justify-center items-center`}>
        <div className="flex mb-10">
          <p className={`text-4xl md:text-7xl`}>404</p>
        </div>
        <div className="flex flex-col justify-center items-center px-10 overflow-hidden">
          <p className="text-xl text-wrap text-center">The time you have is limited. There is nothing to find here.</p>
        </div>
      </div>
    </main>
  )
}