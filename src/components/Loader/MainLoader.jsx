import logo from "/logo.png";

function MainLoader() {
    return (
        <div className="bg-gray-800 size-full flex justify-center items-center">
            <img src={logo} alt="logo" className="size-13 animate-pulse"/>
        </div>
    );
}

export default MainLoader;