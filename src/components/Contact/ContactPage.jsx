import InputField from "../Inputs/InputsField.jsx";
import {useForm} from "react-hook-form";
import styles from "./Contact.module.css";
import Button from "../Button/Button.jsx";
import Select from "../Select/Select.jsx";

function ContactPage() {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm();

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <section className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        </section>
    );
}

export default ContactPage;