import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <ToastContainer stacked/>
            <div className="w-full flex sm:max-w-screen-lg bg-white shadow-default overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
