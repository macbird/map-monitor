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
                        disableClosed: true,
                        height:"700px",
                        width: "1100px"
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
                    <DropdownMenu.Item className="DropdownMenuItem" onClick={()=>app.openLoading()}>
                        ESF <div className="RightSlot">⌘+N</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="DropdownMenuArrow"/>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
const AvatarMenu = () => {
    const {user, ...auth} = useAuth();
    const [bookmarksChecked, setBookmarksChecked] = useState(true);
    const [urlsChecked, setUrlsChecked] = useState(false);
    const [person, setPerson] = useState("pedro");
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                        className="AvatarImage"
                        src={user?.base64}
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
            <AvatarMenu/>
            <MapPage/>

        </>

    )
}

export default App
