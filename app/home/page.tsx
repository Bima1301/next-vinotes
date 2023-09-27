import getNotesData from "@/actions/getNotesData";
import Card from "./components/atoms/Card";
import Topbar from "./components/atoms/Topbar";
import getCategoryByUser from "@/actions/getCategoryByUser";

export default async function page() {
    const notesData = await getNotesData();
    const category = await getCategoryByUser();
    if (!notesData) {
        return {
            notFound: true,
        };
    }

    return (
        <div className="w-full h-full px-4 md:px-16">
            <Topbar category={category} />
            <div className="flex flex-wrap justify-center gap-4 md:px-5 xl:max-h-[40rem] md:max-h-[37rem] max-h-[67vh] overflow-auto ">
                {notesData.map((note) => (
                    <Card key={note.id}
                        title={note.title}
                        content={note.content}
                        date={note.createdAt}
                        image={note.image}
                    />
                ))}
            </div>
        </div>
    )
}
