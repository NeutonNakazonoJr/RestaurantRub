import { toast, ToastOptions, Slide, Flip, ToastContentProps  } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ToastType = "info" | "success" | "error" | "warn";

const useToast = () => {
    const defaultOptions: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip
    };

    const showToast = (
        message: string,
        type: ToastType = "info",
        options?: ToastOptions
    ) => {
        const mergedOptions = {
            ...defaultOptions,
            ...options,
            style: {
                background:
                    type === "success"
                        ? "#06A678"
                        : type === "error"
                        ? "#d37c76"
                        : type === "warn"
                        ? "#AF5706"
                        : "#103F89",
                color: "#FFFFFF",
            },
        };
        
        switch (type) {
            case "success":
                toast.success(message, mergedOptions);
                break;
            case "error":
                toast.error(message, mergedOptions);
                break;
            case "warn":
                toast.warn(message, mergedOptions);
                break;
            default:
                toast.info(message, mergedOptions);
                break;
        }
    };

    return showToast;
};

interface ConfirmContainerProps extends ToastContentProps {
    onConfirm: () => void;
    title?: string,
    message?: string,
    className?: string
}

interface ToastConfirmationProps {
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmContainer: React.FC<ConfirmContainerProps> = ({ closeToast, onConfirm, message, title }) => {
    return (
        <div className="flex justify-between items-center flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
                { title && <h3 className="text-lg text-semibold text-primary-dark " >{ title }</h3>}
                { message && <span className="text-red-600 text-bold ">{ message }</span>}
            </div>
            <div className="flex justify-between w-full gap-2">
                <button onClick={closeToast} className="bg-red-500 text-white py-2 px-4 rounded w-full">Cancelar</button>
                <button onClick={() => { 
                    onConfirm(); 
                    closeToast && closeToast();
                }} className=" bg-primary-green text-white py-2 px-4 rounded  w-full">Confirmar</button>
            </div>
        </div>

    )
};
  
export const toastConfirmation = ({ onConfirm, title, message }: ToastConfirmationProps): void => {
    toast.warn(
        (props) => <ConfirmContainer { ...props } onConfirm={ onConfirm } title={ title } message={ message } />,
        {
            position: 'top-right',
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        } 
    );
};

export default useToast;
