'use client'

interface OutputProps {
  qrCodeUrl: string;
  title: string;
  date: string;
  desc: string;
}

export default function Output({ qrCodeUrl, title, date, desc }: OutputProps) {
  return (
    <div className="bg-white border-2 border-black h-[800px] w-[698px] p-5 m-5">
      <h1 className="text-[50px] font-black">{title}</h1>
      <h2 className="text-[30px] font-medium">{date}</h2>

      <div className="bg-slate-300 w-full h-[250px]" />
      <h1 className="text-[40px] font-bold pt-8">Description</h1>
      <p className="text-[15px] pr-[200px]">{desc}</p>

      {qrCodeUrl && (
        <div className="mb-24 flex flex-col items-end">
            <img
              src={qrCodeUrl}
              alt="Generated QR Code"
              className="w-40 h-40 object-contain"
            />
        </div>
      )}
    </div>
  );
}