import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import { loginTC } from '../auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';

export const Login = () => {

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Password should be longer 2 symbols';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            //alert(JSON.stringify(values))
            formik.resetForm()
        }
    })


    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>or use common test account credentials:</p>
                        <p>Email: nya-admin@nya.nya</p>
                        <p>Password: 1qazxcvBG</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label='Email'
                            margin='normal'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type='password'
                            label='Password'
                            margin='normal'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password
                            && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label='Remember me'
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
