import InputDefault from "@/Components/Inputs/InputDefault";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { LoginUserSchema } from "@/schemas/UserSchema"
import { Form, Formik } from "formik"
import { IUser } from "@/types/user";
import { router } from "@inertiajs/react";
import useToast from "@/hooks/useToast";

interface LoginFormProps {
    handleAnimationRight: () => void,
    moveLeftAnimation: boolean,
    moveRightAnimation: boolean
}

const LoginForm:React.FC<LoginFormProps> = ({
    handleAnimationRight,
    moveRightAnimation,
    moveLeftAnimation
}) => {

    const showToast = useToast();

    const handleError = (errorsMessage:Array<string>) => errorsMessage.forEach(error => showToast(error, "error"))
    
    const handleSubmit = (values:IUser) => {
        router.post('/login', { ...values }, {
                onError: (error) => handleError(Object.values(error))             
            }
        )
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={ LoginUserSchema }
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values)
                setSubmitting(false);
            }}
        >
        {(formik) => {
            const {
                values,
                errors,
                isValid,
                touched,
                isSubmitting,
                dirty,
                handleChange,
                handleBlur,
            } = formik;
            return (
                <Form className={`z-20 w-full md:w-[50%] flex flex-col gap-6 px-8 py-16 absolute 
                    ${ moveRightAnimation && '-translate-x-0 duration-1000 opacity-100 !z-20'}
                    ${ moveLeftAnimation && 'translate-x-full opacity-0 !z-10'}`
                }>
                    <h1 className='text-center text-xl font-medium pb-8 text-gray-600'>Login Form</h1>    
                    <InputDefault 
                        labelText='Email' 
                        iconType='email'
                        defaultValue={ values.email }
                        name="email"
                        isTouched={ touched.email }
                        error={ errors.email }
                        onBlur={ handleBlur }
                        onChange={ handleChange }
                        autocomplete="off"
                    />
                    <div>
                        <InputDefault 
                            labelText='Password' 
                            iconType='password' 
                            defaultValue={ values.password }
                            isTouched={ touched.password }
                            type='password'
                            name='password'
                            error={ errors.password }
                            onBlur={ handleBlur }
                            onChange={ handleChange }
                            autocomplete="off"
                        />
                        <div className='flex justify-between mt-4 text-sm text-black'>
                            <button 
                                type='button' 
                                className='border-0'
                                onClick={ () => handleAnimationRight() }
                            >
                                Create account
                            </button>
                            <button type='button' className='border-0'>Forgot password?</button>
                        </div>
                    </div>
                    <div className='w-full flex justify-center  pt-8 '>
                        <PrimaryButton 
                            className='justify-center py-3 w-[80%] shadow-default'
                            disabled={!isValid || isSubmitting}
                        >
                            Login
                        </PrimaryButton>
                    </div>
                </Form>
            )}
        }
        </Formik>
    )
}

export default LoginForm;