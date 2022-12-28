import React from 'react';
import {useApp} from '../context/AppProvider/useApp'
import {motion} from 'framer-motion'

const PanelFloat = () => {
    const {panel, ...app} = useApp()
    const {title, component} = panel
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
                stiffness: 500
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
        }

    }

    const close = () => {
        app.closePanelFloat()
        panel.onClose()
    }
    return (
        panel.visible ?
            <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" id="authentication-modal"
                        aria-hidden="true"
                        className="absolute top-32 left-12 z-50 overflow-y-auto overflow-x-hidden    ">
                <div className="relative w-full max-w-md h-full md:h-auto">
                    <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" onClick={close}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-toggle="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                        </div>
                        {component}
                    </div>
                </div>
            </motion.div> : <></>
    )
}

export default PanelFloat
