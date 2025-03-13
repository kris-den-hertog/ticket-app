'use client'

import { useRef } from 'react';
import html2canvas from 'html2canvas';

interface OutputProps {
  qrCodeUrl: string;
  title: string;
  date: string;
  desc: string;
}

export default function Output({ qrCodeUrl, title, date, desc }: OutputProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (outputRef.current) {
      try {
        const canvas = await html2canvas(outputRef.current);

        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${title.replace(/\s+/g, '-')}-ticket.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading div:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={outputRef} 
        className="bg-white border-2 border-black h-[800px] w-[698px] p-5 m-5"
      >
        <h1 className="text-[50px] font-black">{title}</h1>
        <h2 className="text-[30px] font-medium">{date}</h2>

        <div className="bg-[url(/bg.jpg)] bg-cover bg-bottom w-full h-[250px]" />
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
      
      <button 
        onClick={handleDownload}
        className="text-[20px] text-sky-300 underline my-4"
      >
        Download Ticket
      </button>
    </div>
  );
}