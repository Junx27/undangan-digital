import { Head, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="w-96 h-screen mx-auto overflow-hidden relative">
            <Head title="Log in" />
            <img
                src="bg-login.jpg"
                alt=""
                className="w-full h-full object-cover z-10"
            />
            <div className="inset-0 absolute z-50">
                <form
                    onSubmit={submit}
                    className="text-[10px] mt-32 flex flex-col p-5 rounded-md bg-white mx-10 shadow-md"
                >
                    <div>
                        <label htmlFor="email">Masukan email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full h-8 rounded-sm outline-none text-[10px]"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="">Masukan password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full h-8 rounded-sm outline-none text-[10px]"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 text-white p-2 px-4 rounded-sm mt-5">
                            Masuk
                        </button>
                    </div>
                </form>
                <div>
                    <h1 className="mt-10 text-[10px] pb-3 text-center">
                        Directed by Junx Web Developer
                    </h1>
                    <div className="mt-10 flex justify-center gap-2 pb-3">
                        <a href="https://wa.me/6281217114742" target="blank">
                            <img
                                src="whatsapp.png"
                                alt=""
                                className="w-7 h-7"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/tri-saptono"
                            target="blank"
                        >
                            <img
                                src="linkedin.png"
                                alt=""
                                className="w-7 h-7"
                            />
                        </a>
                        <a href="https://github.com/Junx27" target="blank">
                            <img src="web.png" alt="" className="w-7 h-7" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
