import Checkbox from "../CheckBox/CheckBox.jsx";

function Form({form, idx, setViewData, addForm, removeForm, checked}) {

    function handleOnChange(e) {
        if (e.target.checked) {
            addForm(form.id);
        } else {
            removeForm(form.id);
        }
    }

    function handleView() {
        setViewData(form);
    }

    return <div key={form.id}
                className="flex gap-2 items-center bg-[#1b263b] w-full h-12 rounded-lg relative group border border-transparent hover:border-blue-400 hover:bg-[#1b263c]">
        <div
            className={`flex justify-center items-center cursor-pointer h-full rounded-r-lg px-2 min-w-9 min-h-full group-hover:visible ${checked ? "visible" : "invisible"}`}>
            <Checkbox onChange={handleOnChange} checked={checked}/>
        </div>
        <div
            className="h-full w-5  rounded-l-lg flex items-center justify-center text-white border-r-2 mr-1">
            <span>{idx + 1}.</span>
        </div>
        <h1 className="md:text-lg sm:text-sm text-white font-bold sm:mr-2 md:mr-6 lg:mr-9">
            {form.name}
        </h1>
        <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9 hidden md:block">
            {form.email}
          </span>
        <span className="text-sm text-white truncate hidden lg:block">
            {form.subject}
          </span>
        <span className="text-sm text-white sm:mr-3 md:mr-2 lg:mr-9 hidden lg:block truncate">
            {form.submittedAt}
          </span>
        <span className="text-sm text-white truncate max-w-45 hidden md:block">
            {form.message}
          </span>
        <span className="text-sm cursor-pointer text-blue-500 hover:underline"
              onClick={handleView}> View </span>
    </div>
}

export default Form;