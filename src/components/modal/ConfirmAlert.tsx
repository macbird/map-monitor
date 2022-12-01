import { motion } from "framer-motion";
import "./ConfirmAlert.css"
import {useApp} from "../../context/AppProvider/useApp"
const Icon =({type}) => {
    let icons = {
        error:
        <svg className="w-12 h-12 fill-current text-red-500"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 700 600">
            <path d="m350 14c-146.68 0-266 119.32-266 266s119.32 266 266 266 266-119.32 266-266-119.32-266-266-266zm0 498.75c-128.34 0-232.75-104.41-232.75-232.75s104.41-232.75 232.75-232.75 232.75 104.41 232.75 232.75-104.41 232.75-232.75 232.75z"/>
            <path d="m444.07 185.93c-6.4961-6.4961-17.023-6.4961-23.52 0l-70.555 70.555-70.531-70.535c-6.4961-6.4961-17.023-6.4961-23.516 0-6.5 6.4961-6.5 17.023 0 23.516l70.531 70.535-70.516 70.52c-6.4961 6.4961-6.4961 17.023 0 23.516 3.2344 3.2578 7.4922 4.875 11.75 4.875 4.2344 0 8.4883-1.6133 11.766-4.875l70.52-70.52 70.527 70.52c3.2344 3.2578 7.4922 4.875 11.746 4.875 4.2578 0 8.5156-1.6133 11.77-4.8555 6.5-6.4961 6.5-17.023 0-23.516l-70.527-70.535 70.559-70.555c6.4922-6.5 6.4922-17.027-0.003906-23.52z"/>
    
        </svg>,
        danger:
        <svg className="w-12 h-12 fill-current text-yellow-500"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 700 600">
            <path xmlns="http://www.w3.org/2000/svg" d="m199.92 482.72h299.6c25.762 0 48.719-13.441 61.602-35.281 12.879-22.398 12.879-48.719 0.55859-71.121l-150.08-263.2c-12.879-22.398-35.84-35.84-62.16-35.84-26.32 0-49.281 13.441-62.16 35.84l-150.08 263.2c-12.879 22.398-12.32 48.719 0.55859 71.121 13.434 22.402 36.395 35.281 62.156 35.281zm-27.441-86.797 150.08-263.2c5.6016-10.078 16.238-16.238 28-16.238 11.762 0 21.84 6.1602 28 16.238l150.08 263.2c5.6016 10.078 5.6016 21.84 0 31.922-5.6016 10.078-16.238 15.68-27.441 15.68l-301.27-0.003907c-11.762 0-21.84-6.1602-27.441-15.68-5.6016-10.078-6.1602-21.84 0-31.918z"/>
            <path xmlns="http://www.w3.org/2000/svg" d="m347.2 344.4c10.641 0 19.602-8.9609 19.602-19.602v-106.4c0-10.641-8.9609-19.602-19.602-19.602-10.641 0.003906-19.598 8.9648-19.598 19.602v106.4c0 10.645 8.957 19.602 19.598 19.602z"/>
            <path xmlns="http://www.w3.org/2000/svg" d="m347.2 417.2c10.641 0 19.602-8.9609 19.602-19.602v-16.801c0-10.641-8.9609-19.602-19.602-19.602-10.641 0.003907-19.598 8.9648-19.598 19.605v16.801c0 10.637 8.957 19.598 19.598 19.598z"/>
        </svg>,
        info:
            <svg className="w-12 h-12 fill-current text-blue-500"
                 xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 700 700">
                <g fill="none" stroke="#646cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path transform="matrix(23.333 0 0 23.333 70 0)" d="m23 12c0 6.0752-4.9249 11-11 11s-11-4.9249-11-11 4.9249-11 11-11 11 4.9249 11 11"/>
                    <path transform="matrix(23.333 0 0 23.333 70 0)" d="m12 9.9999v8.0001"/>
                    <path transform="matrix(23.333 0 0 23.333 70 0)" d="m12 6.9999v-0.99994"/>
                </g>
            </svg>,

    }
    return icons[type];
}
const Alert = () => {
    const {alert, ...app} = useApp()
    const {options, title, description} = alert
    var color = `bg-${options?.confirmButtonColor || "red"}-500`;
    var colorHover = `bg-${options?.confirmButtonColor || "red"}-600`;

    return(
        alert.visible?
        <div className="backdrop absolute bg-orange ">
            <motion.div initial={{ opacity: 0,
                y: 60, scale: 0.5 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            // making use of framer-motion spring animation
                            // with stiffness = 300
                            transition: { type: "spring",
                                stiffness: 300 }
                        }}
                        exit={{ opacity: 0, scale: 0.5,
                            transition: { duration: 0.6 } }}  className="alert absolute bg-white">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                    <div className="flex flex-col items-center text-center">

                        {options && options?.icon && < Icon type={options?.icon}/>}

                        <h2 className="mt-2 font-semibold text-gray-800">{title}</h2>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed"><p dangerouslySetInnerHTML={{__html: description}}/></p>
                    </div>

                    <div className="flex items-center mt-3">
                        <button onClick={app.closeAlert}
                                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                            {options?.cancelButtonLabel || "Cancel"}
                        </button>

                        <button onClick={alert.onConfirm}
                                className={`flex-1 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md`}>
                            {options?.confirmButtonLabel || "Agree"}
                        </button>
                    </div>
                </div>

            </motion.div>
        </div>:
        <></>
    )

}
export default Alert
