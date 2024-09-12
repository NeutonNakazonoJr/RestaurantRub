import InputDefault from "@/Components/Inputs/InputDefault";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { RegisterUserSchema } from "@/schemas/UserSchema"
import { Form, Formik } from "formik"
import ToggleButton from "@/Components/Buttons/ToggleButton";
import { router } from "@inertiajs/react";
import { IUser } from "@/types/user";
import useToast from "@/hooks/useToast";

interface RegisterFormProps {
    handleAnimationRight: () => void,
    moveLeftAnimation: boolean,
    moveRightAnimation: boolean
}

const emailDataMessage = "We need your email to send important account updates, help with account recovery, and keep you informed about new features and updates tailored to your restaurant's needs.";
const usernameMessage = "A unique username helps you log in and personalize your Restaurant Hub experience."

const RegisterForm:React.FC<RegisterFormProps> = ({
    handleAnimationRight,
    moveRightAnimation,
    moveLeftAnimation
}) => {

    const showToast = useToast();

    const handleError = (errorsMessage:Array<string>) => errorsMessage.forEach(error => showToast(error, "error"))

    const handleSubmit = (values:IUser) => {
        router.post('/register', { ...values }, {
                onError: (error) => handleError(Object.values(error))            
            }
        )
    }

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                password_confirmation: ''
            }}
            validationSchema={ RegisterUserSchema }
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
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
                <Form className={`z-10 opacity-0 w-full md:w-[50%] flex flex-col items-center h-full gap-4 px-8 py-16 relative 
                    ${ moveLeftAnimation && 'translate-x-full opacity-100 duration-1000'}
                    ${ moveRightAnimation && 'translate-x-0 opacity-0'}`}
                >  
                    <h1 className='text-center text-xl font-medium pb-8 text-gray-600'>Register Form</h1>    
                    <InputDefault 
                        labelText='Email' 
                        iconType='email'
                        defaultValue={ values.email }
                        name="email"
                        isTouched={ touched.email }
                        error={ errors.email }
                        onBlur={ handleBlur }
                        onChange={ handleChange }
                        infoMessage={ emailDataMessage }
                    />
                    <InputDefault 
                        labelText='Username' 
                        iconType='user'
                        defaultValue={ values.username }
                        name="username"
                        isTouched={ touched.username }
                        error={ errors.username }
                        onBlur={ handleBlur }
                        onChange={ handleChange }
                        infoMessage={ usernameMessage }
                    />
                    <InputDefault 
                        labelText='Password' 
                        iconType='password' 
                        type='password'
                        name="password"
                        isTouched={ touched.password }
                        error={ errors.password }
                        onBlur={ handleBlur }
                        onChange={ handleChange }
                    />
                    <div className='w-full'>
                        <InputDefault 
                            labelText='Password confirmation' 
                            iconType='password' 
                            type='password'
                            name="password_confirmation"
                            isTouched={ touched.password_confirmation }
                            error={ errors.password_confirmation }
                            onBlur={ handleBlur }
                            onChange={ handleChange }
                        />
                        <div className="flex justify-between items-center  mt-4">
                            <div className="flex gap-2 items-center">
                                <label className="font-light text-default text-sm" htmlFor="toggle-btn">Send me notifications </label>
                                <ToggleButton id="toggle-btn" handleChange={ () => console.log('ok')}/>
                            </div>
                            <button>
                                <img className="w-4 h-4" src="/assets/icons/info-icon.svg" alt="button info notifications" />
                            </button>
                        </div>
                        <div className='flex justify-between w-full text-sm mt-2'>
                            <div>
                                <span>Have an account?</span>
                                <button 
                                    type='button' 
                                    className='border-0 text-primary ms-2'
                                    onClick={() => handleAnimationRight()}
                                >
                                Log in
                                </button>
                            </div>
                            <button 
                                type='button'
                                className='border-0'
                            >
                            Privacy policy
                            </button>
                        </div>
                    </div>
                    <PrimaryButton className='mt-8 justify-center py-3 w-[80%] shadow-default' type="submit">
                        Create
                    </PrimaryButton>
                </Form>
            )}
        }
        </Formik>
    )
}

export default RegisterForm;