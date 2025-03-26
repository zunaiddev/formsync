import deleteIcon from '../../assets/delete.svg';

function FormsPage() {
    // let [forms, setForms] = useState([]);
    // let response = useLoaderData();

    // useEffect(() => {
    //     setForms(response.data);
    // }, [])

    return <div className="flex items-center gap-4 flex-col sm:p-2 md:p-4 ">
        {/*{forms.map((item, index) => (<Form key={item.id} name={item.name}*/}
        {/*                                   subject={item.subject} email={item.email} date={item.createdAt}*/}
        {/*                                   message={item.message} onDelete={() => {*/}
        {/*    deleteForm(item.id).then(() => {*/}
        {/*        setForms(prev => prev.filter((_, i) => i !== index));*/}
        {/*    });*/}
        {/*}}/>))}*/}
        <div className="flex flex-wrap items-center bg-[#1b263b] w-full h-12 rounded-lg relative">
            <div className="h-full w-5  rounded-l-lg flex items-center justify-center text-white border-r-2 mr-1">
                <span>1</span>
            </div>
            <h1 className="md:text-lg sm:text-sm text-white font-bold sm:mr-2 md:mr-6 lg:mr-9">John deo</h1>
            <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9">example@gmail.com</span>
            <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9">Subject</span>
            <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9">11-jan-2024 11:14pm</span>
            <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9 truncate md:max-w-50 sm:max-w-25">
                this is a sample text message from my side
            </span>
            <span className="text-sm sm:mr-3 md:mr-6 lg:mr-9 cursor-pointer text-blue-500 hover:underline">View</span>
            <button className="flex justify-center items-center cursor-pointer justify-self-stretch-end
                                absolute right-0 bg-red-700 h-full rounded-r-lg px-2">
                <img src={deleteIcon} className="size-5" alt="deleteIcon"/>
            </button>
        </div>
    </div>;
}

export default FormsPage;