import {IoIosAdd} from "react-icons/io";
import Link from "next/link";

export default function FloatButton({link, icon}) {
    return (
        <div className="flex justify-center items-center bottom-5 w-full py-12">
            <Link href={link}
                  className="flex justify-center items-center size-12 bg-green-600 rounded-full text-white text-4xl hover:-translate-y-2 transition duration-300 ease-in-out">
                <IoIosAdd/>
            </Link>
        </div>
    )
}
