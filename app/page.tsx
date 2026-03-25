import APODViewer from "./components/APODViewer";
import NEOWSViewer from "./components/NEOWSViewer";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-2">
      <video
        autoPlay
        muted
        loop
        className="fixed right-0 bottom-0 min-w-full min-h-full -z-10 object-cover"
      >
        <source src="/background/space.mp4" type="video/mp4" />
      </video>

      <h1 className="text-3xl text-center font-bold">Spacey</h1>
      <div className="flex flex-col w-full items-center gap-2">
        <APODViewer apiUrl="/api/apod" />
        <NEOWSViewer apiUrl="/api/neows" />
      </div>
    </main>
  );
}
