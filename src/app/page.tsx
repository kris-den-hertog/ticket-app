import Link from "next/link";

export default function Home() {
  return (<main className="w-[100vw] h-[100vh] grid justify-center ">
    <div className="max-w-[800px] w-[100vw] h-[100vh] p-5 flex flex-col">
      <h1 className="font-black text-[60px] max-[450px]:text-[40px]">Ticket system</h1>

      <h2 className=" text-[30px] max-[450px]:text-[25px] mt-5">what would you like to do?</h2>
      <Link className="text-[20px] text-sky-300 underline mt-3" href={'../pages/scan'}>Scan Tickets</Link>
      <Link className="text-[20px] text-sky-300 underline mt-3" href={'../pages/create'}>Create Tickets</Link>
    </div>
  </main>);
}
