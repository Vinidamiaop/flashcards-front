import Input from "@/components/FormComponents/Input";
import Textarea from "@/components/FormComponents/Textarea";

export default function SubjectForm({handleChange, data, errors}) {
    return (
        <div className={`animate-slideRight`}>
            <h1 className="text-lg font-black">Novo assunto</h1>

            <div className="flex flex-col gap-2 my-2 w-full transition ease-in-out text-white">
                {errors?.length > 0 && errors.map(error => <span className="bg-red-500 p-2 rounded block"
                                                                 key={error}>{error}</span>)}
            </div>

            <form className="flex flex-col gap-4 w-full my-4">
                <div className="flex flex-col gap-2">
                    <Input id="title" value={data.title} type="text" placeholder="Titulo"
                           onChange={handleChange}/>
                    <Textarea id="description" rows="6" defaultValue={data.description} placeholder="Descrição"
                              onChange={handleChange}/>
                </div>
            </form>
        </div>
    )
}