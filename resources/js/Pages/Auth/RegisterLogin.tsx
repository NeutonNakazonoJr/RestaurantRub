import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Register() {

    const [loginFormAnimation, setLoginFormAnimation] = useState(false);
    const [loginFormAnimationRight, setLoginFormAnimationRight] = useState(false);

    const handleMoveContainerLeft = () => {
        setLoginFormAnimation(false);
        setLoginFormAnimationRight(true);
    }

    const handleMoveContainerRight = () => {
        setLoginFormAnimationRight(false);
        setLoginFormAnimation(true);
    }

    return (
        <GuestLayout>
            <Head title="Register" />
            <section className='w-full relative flex items-center'>
                <LoginForm 
                    handleAnimationRight={ handleMoveContainerRight } 
                    moveLeftAnimation={ loginFormAnimation } 
                    moveRightAnimation={ loginFormAnimationRight }
                />
                <section className={`z-30 w-[50%] text-white px-6 py-10 h-full bg-custom-gradient absolute right-0 hidden sm:flex flex-col justify-between items-center
                    ${ loginFormAnimation && '-translate-x-full duration-500' }
                    ${ loginFormAnimationRight && 'translate-x-0 duration-500' }`
                }> 
                    <div className='flex flex-col gap-2 w-full'>
                        <h1 className='max-w-[65%] text-4xl flex font-extrabold items-start gap-2 relative'>
                            Welcome to Restaurant Hub 
                            <img className='absolute right-[-20px] bottom-2' src="/assets/icons/form-icon.svg" alt="icon" />
                        </h1>
                        <h4 className='max-w-[70%] font-semibold text-xl'>
                            Manage Your Restaurant's Online Presence with Ease
                        </h4>
                    </div>
                    <img className='w-[10rem] h-[10rem] drop-shadow-xl ' src="/assets/icons/chef-hat-icon.svg" alt="chef hat icon" />
                    <span className='font-extralight'>
                        Restaurant Hub simplifies your online management. Update menus, track reservations, and more—everything you need is right here. Transform your restaurant’s digital experience today.
                    </span>
                </section>
                <RegisterForm 
                    handleAnimationRight={ handleMoveContainerLeft }
                    moveLeftAnimation={ loginFormAnimation } 
                    moveRightAnimation={ loginFormAnimationRight }
                />
            </section>
        </GuestLayout>
    );
}
