"use client";
import { useState } from "react";

interface NEOWSViewerProps {
    apiUrl: string;
}

interface Asteroid {
    id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_max: number;
        };
    };
    close_approach_data: {
        close_approach_date_full: string;
        relative_velocity: {
            kilometers_per_hour: string;
        };
        miss_distance: {
            kilometers: string;
        };
    }[];
}

export default function NEOWSViewer({ apiUrl }: NEOWSViewerProps) {
    const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

    async function fetchData() {
        const res = await fetch(apiUrl);
        const json = await res.json();
        setAsteroids(json);
    }

    return (
        <div className="flex sm:flex-col lg:flex-row justify-center items-center w-full">
            <button className="border border-white p-2 rounded hover:bg-white hover:text-black transition-all duration-300" onClick={fetchData}>
                Get a list of near earth objects
            </button>
            {asteroids.map((asteroid) => (
                <div key={asteroid.id} className="bg-black/60 rounded-2xl backdrop-blur-sm flex flex-col justify-center items-center w-100 m-4 p-4 gap-2">
                    <h2 className="text-2xl font-bold text-center">{asteroid.name}</h2>
                    <p className="text-center">
                        📅 {asteroid.close_approach_data[0].close_approach_date_full}
                    </p>
                    <p className="text-center">
                        💨 {Number(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0)} km/h
                    </p>
                    <p className="text-center">
                        📏 {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(4)} km (max diameter)
                    </p>
                    <p className="text-center">
                        🌍 Miss distance: {Number(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
                    </p>
                    <p className={asteroid.is_potentially_hazardous_asteroid ? "text-red-500 font-bold" : "text-green-400"}>
                        {asteroid.is_potentially_hazardous_asteroid ? "⚠️ Potentially Hazardous" : "✅ Not Hazardous"}
                    </p>
                </div>
            ))}
        </div>
    );
}