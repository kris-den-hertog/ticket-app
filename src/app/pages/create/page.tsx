'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Output from "@/components/output";
import QRCode from 'qrcode';

export default function Create() {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id === 'event-name' ? 'title' : id === 'event-description' ? 'description' : 'date']: value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmitted(true);
        
        // Create QR code content from form data
        const qrValue = JSON.stringify(formData);
        generateQRCode(qrValue);
    };

    const generateQRCode = async (text: any) => {
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

    useEffect(() => {
        if (isSubmitted) {
            const qrValue = JSON.stringify(formData.date).replace(/^"|"$/g, '');;
            generateQRCode(qrValue);
        }
    }, [formData, isSubmitted]);

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

                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">Event name:</label>
                        <input 
                            type="text" 
                            id="event-name" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">Event description:</label>
                        <input 
                            type="text" 
                            id="event-description" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                        
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">Event date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    
                        <button 
                            type="submit" 
                            className="bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-5 w-[300px]"
                        >
                            Generate QR Code
                        </button>
                    </div>
                </form>

                <div className="flex-grow flex items-center justify-center">
                    {qrCodeUrl ? (
                        <Output
                            qrCodeUrl={qrCodeUrl}
                            title={formData.title}
                            date={formData.date}
                            desc={formData.description}
                        />
                    ) : (
                        <div className="text-gray-500">Enter event details and submit to generate QR code</div>
                    )}
                </div>
            </div>
        </main>
    );
}
