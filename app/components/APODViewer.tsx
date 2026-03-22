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
        <div className="flex flex-col justify-center items-center w-full">
            <button className="border-1 border-white p-2 rounded" onClick={fetchData}>Get picture of the day</button>

            {data && (
                <div className="flex flex-col justify-center items-center w-100 m-10">
                    <h2 className="text-2xl font-bold">{data.title}</h2>
                    {data.url.endsWith("mp4")
                        ? <video controls> <source src={data.url} type="video/mp4"></source> </video>
                        : <img src={data.url} alt={data.title}></img>
                    }
                    <p className="text-center">{data.explanation}</p>
                </div>
            )}
        </div>
    )
}