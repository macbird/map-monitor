import Backdrop from "./Backdrop";
import {useApp} from "../../context/AppProvider/useApp"
import './Modal.css'


const Loading = () => {

    const {loading} = useApp()

    const log = () => {
        console.log("await")
    }

    return (
        loading.visible ?
            <Backdrop onClick={log}>
                <div>
                    <img style={{"height": "60px"}}
                         src="https://olaargentina.com/wp-content/uploads/2019/11/loading-gif-transparent-10.gif"/>
                </div>
            </Backdrop> :
            <></>
    );
};


export default Loading;
