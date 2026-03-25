export async function GET() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startDateYYYYMMDD = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
    const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateYYYYMMDD}&api_key=${process.env.API_KEY}`
    );
    const data = await res.json();

    const lastFive = Object.values(data.near_earth_objects)
        .flat()
        .sort((a: any, b: any) => {
            const aTime = a?.close_approach_data?.[0]?.close_approach_date
                ? new Date(a.close_approach_data[0].close_approach_date).getTime()
                : 0;
            const bTime = b?.close_approach_data?.[0]?.close_approach_date
                ? new Date(b.close_approach_data[0].close_approach_date).getTime()
                : 0;

            return bTime - aTime;
        })
        .slice(0, 5);

    return Response.json(lastFive);
}