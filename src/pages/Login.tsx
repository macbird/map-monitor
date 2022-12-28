import React from 'react';
import {Field, Form, Formik} from 'formik'
import {useAuth} from '../context/AuthProvider/useAuth'
import {useNavigate} from 'react-router-dom'
import image from "../assets/bg2.webp";

export const Login = () => {

    const auth = useAuth();
    console.log("authLogin", auth.authenticated)
    const navigate = useNavigate();


    async function onSubmit({email, password}: { email: string, password: string }) {
        try {
            await auth.authenticate(email, password)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Formik
                onSubmit={onSubmit}
                initialValues={{
                    email: '',
                    password: ''
                }}

            >
                <Form>
                    <div>
                        <div className="bg-no-repeat bg-cover  relative"
                             style={{
                                 backgroundImage: `url(${image})`,
                                 backgroundColor: '#f2f2f2',
                                 backgroundPosition: '-100px'
                             }}>
                            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                                <div className="flex-col ml-80 flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                                    <div className="self-start hidden lg:flex flex-col  text-white">
                                        <img src="" className="mb-3"/>
                                        <h1 className="mb-3 font-bold drop-shadow-2xl text-purple-600 text-5xl">Sistema
                                            de monitoramento </h1>
                                        <p className="text-black pr-3">Lorem ipsum is placeholder text commonly used in
                                            the graphic, print,
                                            and publishing industries for previewing layouts and visual mockups</p>
                                    </div>
                                </div>
                                <div className="flex text-left justify-center self-center  z-10">
                                    <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                                        <div className="mb-4">
                                            <h3 className="font-semibold text-2xl text-gray-800">Login </h3>
                                            <p className="text-gray-500">Por favor entre em sua conta.</p>
                                        </div>
                                        <div className="space-y-5">
                                            <div className="space-y-2">
                                                <label
                                                    className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                                <Field
                                                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                                                    type="" name="email" placeholder="mail@gmail.com"/>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                                    Senha
                                                </label>
                                                <Field name="password"
                                                       className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                                                       type="password"/>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <input id="remember_me" name="remember_me" type="checkbox"
                                                           className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                                                    <label htmlFor="remember_me"
                                                           className="ml-2 block text-sm text-gray-800">
                                                        Lembrar me
                                                    </label>
                                                </div>
                                                <div className="text-sm">
                                                    <a href="#" className="text-purple-400 hover:text-purple-500">
                                                        Esqueceu sua senha?
                                                    </a>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="submit"
                                                        className="w-full flex justify-center bg-purple-400  hover:bg-purple-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                                    Acessar
                                                </button>
                                            </div>
                                        </div>
                                        <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon"
                   className="text-purple hover:text-purple-500 ">Techon</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );


}

export default Login;
