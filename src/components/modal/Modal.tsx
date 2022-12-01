import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import {forwardRef} from 'react';
import {useApp} from "../../context/AppProvider/useApp"
import './Modal.css'
const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};


const Modal = () => {

    const {modal, ...app} = useApp()


    return (
        modal.visible?
        <Backdrop onClick={!modal.disableClosed && app.closeModal}>
            <motion.div
                onClick={(e) => e.stopPropagation()}

                variants={dropIn}
                initial="hidden"
                animate="visible"
            >
                <div
                    className="flex flex-col mx-auto rounded-lg border border-gray-300 shadow-xl">
                    <div
                        className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
                    >
                        <p className="font-semibold text-gray-800">{modal.title}</p>
                        <svg onClick={app.closeModal}
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </div>
                    <div className="flex flex-col  bg-gray-50">
                        {modal.component}
                    </div>

                </div>

            </motion.div>
        </Backdrop>:
        <></>
    );
};


export default Modal;
