import './css/App.css'
import React ,{ReactElement,useState, useRef, useContext} from 'react';
import MapPage from "./MapPage";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {DotFilledIcon, HamburgerMenuIcon,} from '@radix-ui/react-icons';
import './css/Menu.css'
import './css/Avatar.css'
import Dialog from '../components/modal/Dialog'
import Modal from '../components/modal/Modal'
import FormProfile from '../components/FormProfile'
import FormProfile2 from '../components/FormProfile2'
import * as Avatar from "@radix-ui/react-avatar";
import {GoCalendar} from "react-icons/go";
import  {motion} from 'framer-motion'
import Agente from "./Agente"
import {AuthContext} from "../context/AuthProvider"
import {useAuth} from '../context/AuthProvider/useAuth'
import {useApp} from '../context/AppProvider/useApp'
const Menu = () => {
    const [bookmarksChecked, setBookmarksChecked] = useState(true);
    const [urlsChecked, setUrlsChecked] = useState(false);
    const app = useApp();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton">
                    <HamburgerMenuIcon/>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} align="start">
                    <DropdownMenu.Item className="DropdownMenuItem" onClick={()=>app.openModal({
                        component: <Agente/>,
                        title: "Lista de Agentes",
                        visible: true,
                        disableClosed: true
                    })}>
                        Agentes <div className="RightSlot">⌘+N</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem" onClick={()=>app.openModal({
                        component: <FormProfile2/>,
                        title: "Lista de Agentes",
                        visible: true
                    })}>
                        Dispositivos <div className="RightSlot">⌘+N</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                        ESF <div className="RightSlot">⌘+N</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="DropdownMenuArrow"/>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
const AvatarMenu = () => {
    const auth = useAuth();
    const [bookmarksChecked, setBookmarksChecked] = useState(true);
    const [urlsChecked, setUrlsChecked] = useState(false);
    const [person, setPerson] = useState("pedro");
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                        className="AvatarImage"
                        src="https://avatars.githubusercontent.com/u/29990147?v=4"
                        alt="Colm Tuite"
                    />
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                        CT
                    </Avatar.Fallback>
                </Avatar.Root>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="DropdownMenuContent"
                    sideOffset={5}
                    align="end"
                >
                    <DropdownMenu.Item
                        className="DropdownMenuItem"
                        onClick={() => {
                            alert();
                        }}
                    >
                        Profile
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                        Configurações
                    </DropdownMenu.Item>

                    <DropdownMenu.Item onClick={auth.logout} className="DropdownMenuItem">
                        Sair
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className="DropdownMenuArrow" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

function App() {
    const auth = useAuth();
    const childRef = useRef();
    type ModalState = {
        component: string,
        title: string,
    }
    const [infoAgente, setInfoAgente] = useState<any>();
    const reset = () => {
        childRef.current.reset();
        setInfoAgente(null)
    }
    const dropIn ={
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition:{
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit:{
            y: "100vh",
            opacity: 0,
        }

    }

    return (
        <>
            <Menu/>
            {infoAgente?(<>

                <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" id="authentication-modal" aria-hidden="true"
                     className="absolute top-32 left-12 z-50 overflow-y-auto overflow-x-hidden    ">
                    <div className="relative w-full max-w-md h-full md:h-auto">
                        <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" onClick={reset}
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
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Atividades</h2>
                            </div>

                            <div className="flex mx-auto sm:mr-10 sm:m-0">
                                <div
                                    className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-24 sm:h-24">
                                    <img alt="profile"
                                         src={infoAgente?.base64}
                                         className="object-cover w-20 h-20 mx-auto rounded-full sm:w-24 sm:h-24"/>
                                </div>
                            </div>
                            <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                                <div className="pb-6 px-6 flex flex-row mt-4"  >
                                    <GoCalendar size={30} className="mr-4"/>
                                    21/11/2022 8:00
                                </div>
                                <div className="pb-6 px-6 flex flex-row mt-4"  >
                                    <GoCalendar size={30} className="mr-4"/>
                                    21/11/2022 13:00
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </>
                ):null}

            <AvatarMenu/>


            <MapPage onInfoChange={setInfoAgente} ref={childRef}/>

        </>

    )
}

export default App
