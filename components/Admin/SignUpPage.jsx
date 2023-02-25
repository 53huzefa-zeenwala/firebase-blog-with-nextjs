import { StateContext } from "@/context/stateContext"
import Link from "next/link"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import Loader from "../Loader"
import axios from "axios"

export default function SignUpPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { setAlert } = useContext(StateContext)
    const { replace } = useRouter()
    const onSubmit = async e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return setAlert({ isShow: true, duration: 3000, message: "Password Not Matched", type: "error" })
        }
        setLoading(true)
        try {
            const { data } = await axios.post("/api/createAccount/emailAndPassword", { email, password })
            setAlert({ isShow: true, duration: 3000, message: data.message, type: "success" })
            replace('/')
        } catch (error) {
            console.log(error)
            setAlert({ isShow: true, duration: 3000, message: error.message, type: "error" })
        }
        setLoading(false)
    }
    return (
        <>
            {loading && <Loader />}
            <section className="bg-white dark:bg-gray-900">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt="Pattern"
                            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </aside>
                    <main
                        aria-label="Main"
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                                Welcome to Next Blog 🦑
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                                nam dolorum aliquam, quibusdam aperiam voluptatum.
                            </p>
                            <form onSubmit={onSubmit} className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Email
                                    </label>

                                    <input
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="email"
                                        id="Email"
                                        name="email"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                        required

                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="Password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Password
                                    </label>

                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                        id="Password"
                                        name="password"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                        required

                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="PasswordConfirmation"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Password Confirmation
                                    </label>

                                    <input
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        type="password"
                                        id="PasswordConfirmation"
                                        name="password_confirmation"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                        required

                                    />
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button className="inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-teal-500 dark:hover:bg-teal-700 dark:hover:text-white" type="submit">
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                        Already have an account?
                                        <Link
                                            href={'/login'}
                                            className="text-gray-700 underline dark:text-gray-200 ml-2"
                                        >
                                            Log in
                                        </Link>
                                    </p>
                                </div>
                                {/* <div className="col-span-6 text-xl text-black dark:text-white flex justify-center">or</div>
                                <div className="col-span-6 h-10">
                                    <button
                                        className="rounded border-2 border-[#c3c3c3] bg-white h-full w-1/2 mx-auto py-2 text-sm font-medium text-black hover:border-blue-600 hover:text-blue-600 hover:fill-blue-600 focus:outline-none focus:ring active:text-blue-500 flex gap-1 justify-center"
                                        type="button" onClick={withGoogle}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 24 24" fill="inherit">
                                            <path d="M21.575 12.225C21.575 11.5667 21.5167 10.9417 21.4167 10.3333H12V14.0917H17.3917C17.15 15.325 16.4417 16.3667 15.3917 17.075V19.575H18.6083C20.4917 17.8333 21.575 15.2667 21.575 12.225Z" fill="inherit" />
                                            <path d="M12 5.95833C13.475 5.95833 14.7917 6.46667 15.8333 7.45834L18.6833 4.60833C16.9583 2.99167 14.7 2 12 2C8.09167 2 4.71667 4.25 3.075 7.51667L6.39167 10.0917C7.18333 7.71667 9.39167 5.95833 12 5.95833Z" fill="inherit" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C8.09167 22 4.71667 19.75 3.075 16.4833L6.39167 13.9083C7.18333 16.2833 9.39167 18.0417 12 18.0417C13.35 18.0417 14.4917 17.675 15.3917 17.075L18.6083 19.575C16.9583 21.1 14.7 22 12 22ZM6.39167 10.0917V7.51667H3.075L6.39167 10.0917Z" fill="inherit" />
                                            <path d="M3.075 13.9083H6.39167C6.18333 13.3083 6.075 12.6667 6.075 12C6.075 11.3333 6.19167 10.6917 6.39167 10.0917L3.075 7.51667C2.39167 8.86667 2 10.3833 2 12C2 13.6167 2.39167 15.1333 3.075 16.4833V13.9083Z" fill="inherit" />
                                            <path d="M6.39167 13.9083H3.075V16.4833L6.39167 13.9083Z" fill="inherit" />
                                        </svg>
                                        Sign in with Google
                                    </button> */}
                                {/* </div> */}
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}
