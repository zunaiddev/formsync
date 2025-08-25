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

    return <div
        key={form.id}
        className="flex flex-wrap gap-2 items-center bg-[#1b263b] w-full min-h-12 rounded-lg relative group border border-transparent hover:border-blue-400 hover:bg-[#1b263c] p-2"
    >
        <div
            className={`flex justify-center items-center cursor-pointer h-full rounded-r-lg px-2 min-w-9 group-hover:visible ${
                checked ? "visible" : "invisible"
            }`}
        >
            <Checkbox onChange={handleOnChange} checked={checked}/>
        </div>

        <div className="h-full min-w-[30px] rounded-l-lg flex items-center justify-center text-white border-r-2">
            <span>{idx + 1}.</span>
        </div>

        <h1 className="text-sm sm:text-base md:text-lg text-white font-bold truncate flex-1">
            {form.name.charAt(0).toUpperCase() + form.name.slice(1)}
        </h1>

        <span className="text-xs sm:text-sm text-white truncate flex-1 sm:flex-[0.8] hidden sm:block">
    {form.email}
  </span>

        <span className="text-xs sm:text-sm text-white truncate flex-1 md:flex-[0.7] hidden md:block">
    {form.subject}
  </span>

        <span className="text-xs sm:text-sm text-white hidden lg:block flex-[0.5]">
    {form.submittedAt}
  </span>

        <span className="text-xs sm:text-sm text-white truncate flex-1 hidden md:block">
    {form.message}
  </span>

        <span
            className="text-sm cursor-pointer text-blue-500 hover:underline"
            onClick={handleView}
        >
    View
  </span>
    </div>
}

export default Form;