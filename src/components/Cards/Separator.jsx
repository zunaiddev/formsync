import {twMerge} from "tailwind-merge";

function Separator({className}) {
    return (
        <hr className={twMerge("w-full", className)}/>
    );
}

export default Separator;