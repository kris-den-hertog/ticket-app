'use client'

import { useState } from "react";
import Link from "next/link";
import Output from "@/components/output";
import QRCode from 'qrcode';

export default function Create() {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const value = `ID: $ID  date: $date`;

    const generateQRCode = async (text: string) => {
        try {
            const url = await QRCode.toDataURL(text, {
                width: 400,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                }
            });
            setQrCodeUrl(url);
        } catch (err) {
            console.error(err);
            alert("Something went wrong while generating, please try again later");
        }
    };

    useState(() => {
        generateQRCode(value);
    },);

    return (
        <main className="w-[100vw] h-[100vh] grid justify-center">
            <div className="max-w-[800px] w-[100vw] h-[100vh] p-5 flex flex-col">
                <Link
                    className="text-[20px] text-sky-300 underline mt-3"
                    href={"../"}
                >
                    Home
                </Link>

                <h1 className="text-[40px] font-bold mt-5">Generate Ticket</h1>

                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-whiten mt-5">Event name:</label>
                        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">Event date::</label>
                        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">Event description:</label>
                        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">Event description:</label>
                        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    
                    <input type="submit" placeholder="submit" className="text-[20px] text-sky-300 underline mt-3" />
                    </div>
                </form>

                <div className="flex-grow flex items-center justify-center">
                    {/* {qrCodeUrl ? (
                        <Output
                            qrCodeUrl={qrCodeUrl}
                            title="Peacock in concert" date="01/09/2025"
                            desc="" />
                    ) : (
                        <div className="text-gray-500">Generating QR code...</div>
                    )} */}
                </div>
            </div>
        </main>
    );
}

