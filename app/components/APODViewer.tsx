"use client";
import { useState } from "react";

interface APODViewerProps {
    apiUrl: string,
}

interface APODData {
    title: string,
    url: string,
    explanation: string;
}

export default function APODViewer({ apiUrl }: APODViewerProps) {
    const [data, setData] = useState<APODData | null>(null)

    async function fetchData() {
        const res = await fetch(`${apiUrl}`);
        const json = await res.json();
        setData(json);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <button className="border border-white p-2 rounded hover:bg-white hover:text-black transition-all duration-300" onClick={fetchData}>Get picture of the day</button>

            {data && (
                <div className="bg-black/60 rounded-2xl backdrop-blur-sm flex flex-col justify-center items-center m-4 p-4 gap-2">
                    <h2 className="text-2xl font-bold text-center">{data.title}</h2>
                    {data.url.endsWith("mp4")
                        ? <video controls> <source src={data.url} type="video/mp4"></source> </video>
                        : <img src={data.url} alt={data.title}></img>
                    }
                    <p className="text-center w-full">{data.explanation}</p>
                </div>
            )}
        </div>
    )
}