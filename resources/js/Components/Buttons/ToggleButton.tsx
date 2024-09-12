import { useState } from "react";

interface ToggleButtonProps {
    id?: string
    className?: string;
    handleChange: () => void;
    initialState?: boolean;
}

const ToggleButton:React.FC<ToggleButtonProps> = ({
    id,
    className,
    handleChange,
    initialState
}) => {
    const [changeState, setChangeState] = useState(initialState || false);

    return(
        <button 
            id={ id }
            className={ `w-8 h-3 rounded-full border-2 border-zinc-300 flex items-center overflow-visible 
                ${changeState && 'bg-red-200 border-red-500 '}` + className 
            }
            type="button"
            onClick={ () => {
                setChangeState(!changeState)
                handleChange()
            }}
        >
            <div 
                className={`w-4 h-4 rounded-full duration-300 
                    ${changeState ? 'translate-x-full bg-red-500' : '-translate-x-1 bg-zinc-300'}`
                }
            >                
            </div>
        </button>
    )
}

export default ToggleButton;