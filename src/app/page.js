import FloatButton from "@/components/FloatButton";
import SubjectList from "@/components/SubjectList";

export default function Home() {
    return (
        <>
            <section className="mx-auto lg:w-1/2 min-w-90">
                <div className="px-4">
                    <h2 className="text-6xl md:text-8xl font-black">Bora</h2>
                    <h2 className="text-7xl md:text-9xl font-black -mt-5 md:-mt-8">estudar?</h2>
                </div>
                <SubjectList/>
            </section>
            <FloatButton link="subjects/create"/>
        </>

    );
}
