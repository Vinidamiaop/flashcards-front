export default function Button({handleChange, className, text, icon, ...props}) {

    return (
        <button
            className={`bg-green-600 rounded py-2 px-4 hover:bg-green-700 text-white transition ease-in-out ${className}`}
            {...props}>
            {icon}{text}
        </button>
    )
}
