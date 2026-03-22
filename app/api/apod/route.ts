export async function GET() {
    const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    );

    const data = await res.json();
    return Response.json(data);
}