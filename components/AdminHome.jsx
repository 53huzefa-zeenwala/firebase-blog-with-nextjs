import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Loader from './Loader'
import Link from 'next/link'
import { StateContext } from '@/context/stateContext';

const BlogList = ({ posts }) => {
    const title = (data) => {
        return data.length >= 60 ? data.slice(0, 60) + "..." : data
    }
    return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-10">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
                    <div className="relative h-40">
                        <img
                            className="absolute h-full w-full object-cover"
                            src={post.image}
                            alt={title(post.title)}
                        />
                    </div>
                    <div className="p-4">
                        <Link href={`/blog/${post.id}`} className="text-lg mb-2 text-gray-900 font-cutiveMono tracking-tighter font-semibold hover:text-teal-900 transition-colors cursor-pointer min-h-[3.5rem] block">
                            {title(post.title)}
                        </Link>
                        <div className="flex justify-between items-center text-gray">
                            <Link href={`/admin/edit/${post.id}`} passHref>
                                <span className="text-sm font-medium text-teal-600 hover:text-teal-700 inline-flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17 6.99999H6.99998V17H17V6.99999ZM16 16.012V9.98799H8V16.012H16ZM6.99998 6.99999V17C6.99998 17.552 7.44798 18 7.99998 18H17C17.552 18 18 17.552 18 17V6.99999C18 6.44799 17.552 5.99999 17 5.99999H7.99998C7.44798 5.99999 6.99998 6.44799 6.99998 6.99999Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Edit
                                </span>
                            </Link>
                            <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function AdminHome() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {setAlert} = useContext(StateContext)
    useEffect(() => {
        const getData = async () => {
            try {
                const data = []
                const querySnapshot = await getDocs(collection(db, 'blog'));

                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                })
                setData(data)
            } catch (error) {
                console.log(error)
                setAlert({ isShow: true, duration: 3000, message: error.response?.data?.message || error.message, type: "error" })
            }
            setLoading(false)
        }
        getData()
    }, [])
    return (
        <div>
            {loading && <Loader />}
            <h1 className='text-4xl font-cutiveMono font-medium capitalize p-10'>Welcome to admin page.</h1>
            <BlogList posts={data} />
        </div>
    )
}

export default AdminHome
