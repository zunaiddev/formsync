import InputField from "../Inputs/InputsField.jsx";
import Button from "../Button/Button.jsx";
import {X} from "lucide-react";

function AddDomainPopup() {

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-400/40">
            <div className="relative w-full max-w-md bg-gray-800 p-4 rounded-lg text-white">
                <h1 className="font-bold text-lg mb-4">Enter Custom Domain</h1>
                <form>
                    <InputField label="Enter Domain"
                                placeholder="formsync.netlify.app"
                    />
                    <div className="w-full flex justify-end mt-4 gap-3">
                        <Button className="bg-gray-500/30 hover:bg-gray-500/20">
                            Cancel
                        </Button>

                        <Button>
                            Add Domain
                        </Button>
                    </div>
                </form>

                <button className="r-3 absolute right-3 top-2 cursor-pointer">
                    <X/>
                </button>
            </div>
        </div>
    );
}

export default AddDomainPopup;