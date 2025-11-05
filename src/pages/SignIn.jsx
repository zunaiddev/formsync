import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {HttpStatusCode} from "axios";
import {useMutation} from "@tanstack/react-query";
import {login, verifyToken} from "../services/authService.js";
import AuthForm from "../components/AuthForm/AuthForm.jsx";
import InputField from "../components/Inputs/InputsField.jsx";
import Button from "../components/Button/Button.jsx";
import extractErrorInfo from "../util/extractErrorInfo.js";
import {useEffect, useState} from "react";
import {confirmReactivate, showAccountLockedPopup, showAccountNotVerifiedPopup} from "../components/Popup/Popups.jsx";

function SignIn() {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField,
        setFocus
    } = useForm();

    const {mutate, isPending} = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const {status, token} = data;

            if (status === "ACTIVE") {
                localStorage.setItem("token", token);
                navigate("/dashboard", {replace: true});
                return;
            }

            setPopup(data);
        },
        onError: err => {
            const {status} = extractErrorInfo(err);

            if (status === HttpStatusCode.Unauthorized) {
                resetField("password");
                setFocus("password");
                toast.error("Invalid Email or Password", {
                    duration: 2000,
                });
            } else if (status === HttpStatusCode.Locked) {
                setPopup({
                    status: "LOCKED",
                });
            } else if (status === HttpStatusCode.BadRequest) {
                setPopup({
                    status: "NOT_VERIFIED",
                });
            }
        }
    });
    const {mutate: reactivate, isPending: reactivating} = useMutation({
        mutationFn: verifyToken,
        onSuccess: (data) => {
            const {token} = data.extra;
            localStorage.setItem("token", token);
            navigate("/dashboard", {replace: true});
        },
    });

    useEffect(() => {
        if (!popup) return;

        const {status, token, deleteAt} = popup;

        console.log("token: ", token);

        (async () => {
            if (status === "LOCKED") {
                await showAccountLockedPopup();
            } else if (status === "NOT_VERIFIED") {
                await showAccountNotVerifiedPopup();
            } else {
                let result = await confirmReactivate(deleteAt);
                if (result) {
                    reactivate(token);
                }
            }
        })();

    }, [popup]);

    async function onSubmit(data) {
        mutate(data);
    }

    return (<AuthForm isSignup={false}>
        <form className="w-full flex flex-col justify-center items-center gap-5"
              onSubmit={handleSubmit(onSubmit)} autoComplete="on">
            <InputField
                name="email"
                label="Email"
                placeholder={"example@example.com"}
                register={register("email", {
                    required: "Email is required",
                })}
                error={errors.email}
                autoComplete="email"
            />

            <div className="w-full flex items-end flex-col gap-2">
                <InputField
                    name="password"
                    label="Password"
                    placeholder={"password"}
                    type="password"
                    register={register("password", {
                        required: "Password is required",
                    })}
                    error={errors.password}
                    autoComplete="password"
                />

                <span className="text-blue-600 text-sm cursor-pointer hover:underline">
                                <Link to="/forget-password">Forget Password</Link>
            </span>
            </div>


            <Button type="submit" className="w-full" isSubmitting={isPending}>
                Sign in
            </Button>
        </form>
    </AuthForm>);
}

export default SignIn;