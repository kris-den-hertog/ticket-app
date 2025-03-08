"use client";

import { useState } from "react";
import Link from "next/link";
import { Scanner } from '@yudiel/react-qr-scanner';

export default function Create() {
  const [scanResult, setScanResult] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState("");

  const handleScan = (data: any) => {
    if (data) {
      console.log(data);
     setScanResult(data[0].rawValue);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError("Error accessing camera: " + err.toString());
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    if (!cameraActive) {
      setScanResult(""); // Clear previous result when starting new scan
    }
  };

  return (
    <main className="w-full h-screen grid justify-center">
      <div className="max-w-[800px] w-full h-full p-5 flex flex-col">
        <Link className="text-[20px] text-sky-300 underline mt-3 mb-6" href={"../"}>
          Home
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={toggleCamera}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded"
          >
            {cameraActive ? "Stop Camera" : "Start Camera"}
          </button>
          
          {cameraActive && (
            <div className="w-full max-w-[500px] h-[300px] overflow-hidden border border-gray-300 rounded">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                scanDelay={500}
              />
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {error}
            </div>
          )}
        </div>
        {scanResult && (
            <div className="w-[300px] h-auto bg-slate-300 rounded-lg p-5 mt-5">
             <p>{scanResult}</p>
            </div>
          )}
      </div>
    </main>
  );
}
