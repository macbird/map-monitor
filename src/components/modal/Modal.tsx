import {motion} from "framer-motion";
import Backdrop from "./Backdrop";
import {useRef, useState} from 'react';
import {useApp} from "../../context/AppProvider/useApp"
import './Modal.css'
import TextField from '@mui/material/TextField';
import {FiSearch} from "react-icons/fi"
import {InputAdornment} from "@mui/material";
import {MdClose} from "react-icons/md"

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

    const {modal, searchHandler, clearSearch, searchable, toogleSearch, search, ...app} = useApp()

    const [expanded, setExpanded] = useState(false)

    const close = () => {
        setExpanded(false)
        setTimeout(() => app.closeModal(), expanded ? 500 : 0)
    }

    const variants = {
        open: {width: "100%"},
        closed: {width: "80px"},
    }


    const inputRef = useRef<HTMLInputElement>(null);

    const clear = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus()
        }
        clearSearch()
        setExpanded(false)

    }
    return (
        modal.visible ?
            <Backdrop onClick={!modal.disableClosed ? close : null}>
                <motion.div
                    onClick={(e) => e.stopPropagation()}

                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                >
                    <div
                        style={{
                            height: modal.height || "auto",
                            maxHeight: "80vh",
                            width: modal.width || "auto"
                        }}
                        className="flex flex-col mx-auto rounded-lg border border-gray-300 shadow-xl">

                        <div
                            className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
                        >
                            <p className="font-semibold text-gray-800">{modal.title}</p>
                            <div className="flex flex-row justify-start form">

                                {searchable ? <motion.div animate={expanded ? "open" : "closed"} variants={variants}
                                                          className="mr-6 text-end">
                                    <TextField

                                        id="searchInput"
                                        size="small"
                                        autoComplete="off"

                                        onBlur={(event) => {
                                            console.log("OnBlur fired");
                                            if (!event.currentTarget.value) setExpanded(false)

                                        }}
                                        inputRef={inputRef}
                                        onClick={() => {
                                            inputRef?.current?.focus()
                                            setExpanded(true)
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key == "Escape") clear()
                                        }}
                                        onChange={(event) => {
                                            event.persist();
                                            searchHandler(event)
                                        }}
                                        autoFocus
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FiSearch
                                                        className={!expanded ? 'cursor-pointer ml-4 w-5 h-5' : 'w-5 h-5'}/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment onClick={(event) => {
                                                    event.persist()
                                                    clear()
                                                }} position="end">
                                                    {search ?
                                                        <MdClose className=" cursor-pointer  mt-2 w-4 h-4"/> : null}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                    />
                                </motion.div> : null}
                                <MdClose onClick={close}
                                         className="absolute top-0 right-0 cursor-pointer mr-4 mt-2 w-5 h-5"/>


                            </div>
                        </div>
                        <div className="flex flex-col h-full  bg-gray-50">
                            {modal.component}
                        </div>

                    </div>

                </motion.div>
            </Backdrop> :
            <></>
    );
};


export default Modal;
