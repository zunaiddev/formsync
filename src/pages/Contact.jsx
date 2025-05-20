import {useForm} from "react-hook-form";
import InputField from "../components/Inputs/InputsField.jsx";
import Select from "../components/Select/Select.jsx";
import Button from "../components/Button/Button.jsx";

function Contact() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm();

    function onSubmit(data) {

    }

    return (
        <div
            className="w-full flex justify-center flex-col items-center mx-auto p-6 text-white rounded-lg shadow-lg ">
            <h1 className="text-3xl font-bold mb-4 text-blue-400">Contact Me</h1>
            <p className="mb-4">Feel free to reach out to me using the form below.</p>
            <div className="w-full bg-gray-800 max-w-2xl p-6 rounded-lg shadow-md">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="Full Name"
                                placeholder="Full Name"
                                register={register("name", {
                                    required: "Please enter your full name",
                                    pattern: {value: /^[a-zA-Z\s'-]+$/, message: "Please enter valid name"},
                                    minLength: {value: 3, message: "Please enter at least 3 characters"},
                                    maxLength: {value: 50, message: "Name is too long"},
                                    validate: (value) => value.toString().trim().length > 3 || "Name can't be blank",
                                })}
                                error={errors.name}/>
                    <InputField label="email"
                                placeholder="Email"
                                register={register("email", {
                                    required: "Please enter your email",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter valid email address"
                                    },
                                })}
                                error={errors.email}/>

                    <Select label="Subject"
                            values={["Support", "Feedback", "Billing", "Other"]}
                            register={register("subject", {required: "Please Select Subject"})}
                            error={errors.subject}/>

                    <InputField label="Message"
                                placeholder="Message"
                                register={register("message", {
                                    required: "Please enter your message",
                                    minLength: {value: 15, message: "Please enter at least 15 characters"},
                                    maxLength: {value: 200, message: "Message can only be less than 200 characters"},
                                    validate: (value) => value.toString().trim().length > 15 || "message can't be blank",
                                })}
                                error={errors.message}/>
                    <Button type="submit" text="Submit" isSubmitting={isSubmitting}/>
                </form>
            </div>
        </div>
    );
}

export default Contact;