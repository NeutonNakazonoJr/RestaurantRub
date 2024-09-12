import { FocusEventHandler, useState } from "react"
import InputError from "./InputError";

interface InputProps {
    labelText: string,
    name?: string,
    type?: string,
    iconType: keyof typeof iconDefinition,
    onChange?: FocusEventHandler<HTMLInputElement>,
    onBlur?: FocusEventHandler<HTMLInputElement>,
    isTouched?: boolean,
    error?: string,
    defaultValue?: string | number,
    infoMessage?: string,
    autocomplete?: string
}

const iconDefinition = {
    'user': '/assets/icons/user-icon.svg',
    'email': '/assets/icons/email-icon.svg',
    'password': '/assets/icons/pass-icon.svg',
    'closeEye': '/assets/icons/close-eye-icon.svg',
    'openEye': '/assets/icons/open-eye-icon.svg',
    'info': '/assets/icons/info-icon.svg',
    'info-2': '/assets/icons/info-2-icon.svg',
}

const InputDefault:React.FC<InputProps> = ({
    labelText,
    name,
    type,
    iconType,
    onChange,
    onBlur,
    isTouched,
    error,
    defaultValue,
    infoMessage,
    autocomplete
}) => {

    const [ showPass, setShowPass ] = useState(false);
    const [ showMessage, setShowMessage ] = useState(false);


    return (
        <div className="w-full flex flex-col text-default relative">
            <label className="font-light" htmlFor={ labelText }>{ labelText }</label>
            <div className="flex border border-gray px-2 py-1 rounded-md ">
                <img className="w-4" src={ iconDefinition[iconType] } alt="icon" />
                <input 
                    className="ps-1 border-0 outline-none focus:border-0 focus:ring-0 w-full text-black"
                    name={ name }
                    type={ type === 'password' ? (showPass ? 'text' : 'password') : type } 
                    onChange={ onChange }
                    onBlurCapture={ onBlur }
                    defaultValue={ defaultValue }
                    autoComplete={ autocomplete }
                />
            </div>
            {type === 'password' &&
                <button 
                    type="button" 
                    aria-label={ showPass ? "Hide password" : "Show password" }
                    className="absolute border-0 right-2 top-[50%]"
                    onClick={ () => setShowPass(!showPass) }
                    >
                    <img className="w-5 h-5" 
                        src={ showPass ? iconDefinition['openEye'] : iconDefinition['closeEye'] } 
                        alt="show password button." 
                    />
                </button>
            }
            {infoMessage &&
                <button 
                    type="button" 
                    aria-label="show input info button."
                    className="absolute border-0 right-2 top-[55%]"
                    onMouseEnter={() => setShowMessage(true)}
                    onMouseLeave={() => setShowMessage(false)}
                    >
                    <img className="w-4 h-4" 
                        src={ iconDefinition['info'] } 
                        alt="show input info button." 
                    />
                </button>
            }
            {showMessage &&
                <div className="w-[90%] absolute top-0 bg-white z-30 p-4 border border-zinc-200 rounded" >
                    <div className="flex gap-1">
                        <img className="w-4" src={ iconDefinition['info-2'] } alt="icon" />
                        <h3 className="font-medium">Why are we collecting this data?</h3>
                    </div>
                    <span className="text-sm">{ infoMessage }</span>
                </div>
            }
            {isTouched &&
                <InputError
                    message={ error }
                    className="absolute -bottom-5"
                />
            }
        </div>
    )
}

export default InputDefault;