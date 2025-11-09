import {useForm} from "react-hook-form";
import {useState} from "react";
import InputField from "../components/Inputs/InputsField.jsx";
import {useMutation} from "@tanstack/react-query";
import Api from "../api.js";
import Button from "../components/Button/Button.jsx";
import toast from "react-hot-toast";

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => {
            let response = await Api.post("/public/submit", data, {
                headers: {
                    "Content-Type": "application/json",
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                },
            });
            return response.data;
        },
        onSuccess: _ => {
            setResponseMessage({type: "success", text: "Message sent successfully!"});
            setTimeout(() => setResponseMessage(undefined), 5000);
            reset();
        },
        onError: error => {
            if (error.response) {
                toast.error("Something Went Wrong!");
            }
        }
    });

    const [responseMessage, setResponseMessage] = useState(null);

    function onSubmit(data) {
        console.log("submit", data);
        mutate(data);
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
            <div className="w-full max-w-xl bg-gray-800 p-6 rounded-md shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6 text-blue-400">Contact Us</h1>

                {responseMessage && (
                    <div
                        className={`mb-4 p-3 text-sm rounded-sm text-center ${
                            responseMessage.type === "success" ? "bg-green-700" : "bg-red-700"
                        }`}
                    >
                        {responseMessage.text}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                        label="Full Name"
                        placeholder="Enter your full name"
                        register={register("name", {
                            required: "Please enter your full name",
                            pattern: {value: /^[a-zA-Z\s'-]+$/, message: "Please enter valid name"},
                            minLength: {value: 3, message: "Please enter at least 3 characters"},
                            maxLength: {value: 50, message: "Name is too long"},
                            validate: (value) => value.trim().length > 3 || "Name can't be blank",
                        })}
                        error={errors.name}
                    />

                    <InputField
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        register={register("email", {
                            required: "Please enter your email",
                            pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format"},
                        })}
                        error={errors.email}
                    />

                    <div className="w-full flex flex-col">
                        <label className="block mb-1 text-sm font-medium text-gray-300">Select Topic</label>
                        <select
                            className="shadow-xs border border-gray-700 text-sm rounded-sm focus:border-blue-500 outline-none block w-full p-2.5 bg-gray-700 text-white"
                            {...register("subject", {required: "Please select a topic"})}
                        >
                            <option value="">-- Select an option --</option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Support</option>
                            <option value="feedback">Feedback</option>
                            <option value="partnership">Partnership</option>
                        </select>
                        {errors.topic?.message && (
                            <span className="text-[12px] ml-1 text-red-600 mt-1">{errors.topic.message}</span>
                        )}
                    </div>

                    <div className="w-full flex flex-col">
                        <label className="block mb-1 text-sm font-medium text-gray-300">Message</label>
                        <textarea
                            className="shadow-xs border border-gray-700 text-sm rounded-sm focus:border-blue-500 outline-none block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white min-h-[120px]"
                            placeholder="Write your message..."
                            {...register("message", {
                                required: "Please enter your message",
                                minLength: {value: 10, message: "Message must be at least 10 characters"},
                            })}
                        ></textarea>
                        {errors.message?.message && (
                            <span className="text-[12px] ml-1 text-red-600 mt-1">{errors.message.message}</span>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-sm"
                        isSubmitting={isPending}>
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
}