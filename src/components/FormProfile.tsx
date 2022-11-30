import {forwardRef,useImperativeHandle} from 'react'
const FormProfile = forwardRef((options, ref)=> {

    useImperativeHandle(ref, () => ({

        save: () => {
            console.log('Saving')
        }

    }));
    return(
        <>
            <p className="mb-2 font-semibold text-gray-700">Bots Message</p>
            <textarea
                type="text"
                name=""
                placeholder="Type message..."
                className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
                id=""
            ></textarea>
            <div className="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                <div className="w-full sm:w-1/2">
                    <p className="mb-2 font-semibold text-gray-700">Customer Response</p>
                    <select
                        type="text"
                        name=""
                        className="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                        id=""
                    >
                        <option value="0">Add service</option>
                    </select>
                </div>
                <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
                    <p className="mb-2 font-semibold text-gray-700">Next step</p>
                    <select
                        type="text"
                        name=""
                        className="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                        id=""
                    >
                        <option value="0">Book Appointment</option>
                    </select>
                </div>
            </div>
            <hr/>

            <div className="flex items-center mt-5 mb-3 space-x-4">
                <input
                    className="inline-flex rounded-full"
                    type="checkbox"
                    id="check1"
                    name="check1"
                />
                <label className="inline-flex font-semibold text-gray-400" htmlFor="check1">
                    Add a crew</label
                ><br/>
                <input
                    className="inline-flex"
                    type="checkbox"
                    id="check2"
                    name="check2"
                    checked
                />
                <label className="inline-flex font-semibold text-blue-500" htmlFor="check2">
                    Add a specific agent</label
                ><br/>
            </div>
            <div
                className="flex flex-row items-center justify-between p-5 bg-white border border-gray-200 rounded shadow-sm"
            >
                <div className="flex flex-row items-center">
                    <img
                        className="w-10 h-10 mr-3 rounded-full"
                        src="https://randomuser.me/api/portraits/lego/7.jpg"
                        alt=""
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-800">Xu Lin Bashir</p>
                        <p className="text-gray-400">table.co</p>
                    </div>
                </div>
                <h1 className="font-semibold text-red-400">Remove</h1>
            </div>
        </>
    )
})

export default FormProfile;
