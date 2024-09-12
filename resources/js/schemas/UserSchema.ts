import * as yup from 'yup';

const BaseUserSchema = yup.object().shape({
    email: 
        yup.string()
        .email('Invalid email format')
        .required('Email is required.'),
    password: 
        yup.string()
        .required('Password is required')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be: min 8 characters, one number, one letter.'
    )
});

export const RegisterUserSchema = BaseUserSchema.shape({
    username: 
        yup.string()
        .required('Username is required.')
        .max(100, 'Username must be a maximum of 100 characters.'),
    password_confirmation:
        yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password.')
});

export const LoginUserSchema = BaseUserSchema;


