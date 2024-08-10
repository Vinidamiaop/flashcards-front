import {FaCheck} from "react-icons/fa";
import React from "react";

export default function Stepper({steps}) {
    return (
        <div className="flex items-center justify-center gap-4 ">
            {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                    <div  className="flex gap-2 items-center">
                        <div
                            className={`${step.active || step.completed ? "bg-green-600" : "bg-gray-400 text-gray-900"} flex justify-center items-center size-8 min-w-8 min-h-8 rounded-full text-white}`}>
                            { step.completed ? <FaCheck /> : (step?.icon ? step.icon : ++index)}
                        </div>
                        <p>{step.label}</p>

                    </div>
                    {index < steps.length && <div className={`w-full flex-grow h-1 ${step.completed ? "bg-emerald-600" : "bg-gray-400 text-gray-900"} overflow-hidden rounded-lg`}>
                        <div className={`h-1 w-3/4 ${step.completed || !step.active ? '' : 'animate-lineLoading bg-emerald-600' } `}></div>
                    </div>}
                </React.Fragment>
            ))}
        </div>
    )
}
