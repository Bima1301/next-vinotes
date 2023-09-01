import Card from "./components/atoms/Card";
import Topbar from "./components/atoms/Topbar";

export default function page() {
    return (
        <div className="w-full h-full px-4 md:px-16">
            <Topbar />
            <div className="flex flex-wrap justify-center gap-4 px-5 md:max-h-[43rem] max-h-[33rem] overflow-auto ">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Card key={i} />
                ))}
            </div>
        </div>
    )
}
