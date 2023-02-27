import { StateContext } from '@/context/stateContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Loader from '../Loader'

function SideMenu() {
    const { logout, setAlert } = useContext(StateContext)
    const [isOpen, setIsOpen] = useState(false)
    const { pathname, replace } = useRouter()
    const [loading, setLoading] = useState(false)
    const signOut = () => {
        try {
            setLoading(true)
            logout()
            replace('/admin/login')
            setLoading(false)
        } catch (error) {
            console.log(error)
            setAlert({ isShow: true, duration: 3000, message: error.response?.data?.message || error.message, type: "error" })
        }
    }
    return (
        <>
            {loading && <Loader />}
            <div className='p-4'>
                <button onClick={() => setIsOpen(true)} className="rounded bg-teal-100 p-2 text-teal-600 transition hover:text-teal-600/75"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h20M4 12h20M4 18h20"
                        />
                    </svg></button>
            </div>
            <div style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }} className="flex h-screen flex-col justify-between border-r bg-slate-100/60 w-64 fixed top-0 left-0 bottom-0 transition-transform duration-500 z-40  backdrop-blur-md">
                <div className="px-4 py-6">

                    <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
                        <Link
                            style={{ background: pathname == '/admin' ? "rgb(153, 246, 228)" : '' }}
                            href={"/admin"}
                            passHref
                            className="rounded-lg px-4 py-2 hover:bg-teal-100 hover:text-gray-700"
                        >
                            <span className="text-sm font-medium flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                Home </span>
                        </Link>



                        <Link
                            style={{ background: pathname == '/admin/addblog' ? "rgb(153, 246, 228)" : '' }}

                            href={'/admin/addblog'}
                            className="rounded-lg px-4 py-2 text-gray-500 hover:bg-teal-100 hover:text-gray-700"
                            passHref
                        >
                            <span className="flex items-center gap-2 text-sm font-medium">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>

                                New Blog </span>
                        </Link>

                        <Link
                            style={{ background: pathname == '/admin/blogs' ? "rgb(153, 246, 228)" : '' }}
                            href={'/admin/blogs'}
                            className="rounded-lg px-4 py-2 text-gray-500 hover:bg-teal-100 hover:text-gray-700"
                            passHref
                        >
                            <span className="flex items-center gap-2 text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75"viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M8 8H16M8 12H16M12 16H16M3.5 12C3.5 5.5 5.5 3.5 12 3.5C18.5 3.5 20.5 5.5 20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                All Blogs </span>
                        </Link>

                        <Link
                            href={'/admin'}
                            className="rounded-lg px-4 py-2 text-gray-500 hover:bg-teal-100 hover:text-gray-700"
                        >
                            <span className="flex items-center gap-2 text-sm font-medium">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>

                                Analysis </span>
                        </Link>
                    </nav>
                </div>
                <button className="shrink-0 transition duration-300 rotate-90 absolute top-[50%] right-0 cursor-pointer hover:fill-teal-200" onClick={() => setIsOpen(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="inherit"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <button onClick={signOut} className="flex items-center gap-2 p-4 pl-[50%] hover:bg-teal-200 w-full">
                        Logout
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </div>
            </div>

        </>
    )
}

export default SideMenu