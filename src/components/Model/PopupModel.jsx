import PropTypes from "prop-types";
import {XMarkIcon} from "@heroicons/react/24/solid/index.js";

function PopupModel({message, desc, onSubmit, onClose, custom, buttonText}) {
    return (
        <div
            className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow-sm bg-gray-700 pt-4">
                    <button type="button" onClick={onClose}
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                        <XMarkIcon className="h-6 w-6 text-gray-400"/>
                    </button>
                    <div className={`p-4 md:p-5 ${!custom && 'text-center'}`}>
                        <svg className="mx-auto mb-4 size-10 text-gray-200" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <div className="mb-4 space-y-2">
                            {custom || <>
                                <h3 className="text-md font-normal text-gray-300">
                                    {message}
                                </h3>
                                <small className="text-red-500">{desc}</small>
                            </>}
                        </div>
                        <button type="button" onClick={onSubmit}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            {buttonText || "Yes, I'm sure"}
                        </button>
                        <button type="button" onClick={onClose}
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No,
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

PopupModel.propTypes = {
    message: PropTypes.string.isRequired,
    desc: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    custom: PropTypes.element,
    buttonText: PropTypes.string,
}

export default PopupModel;