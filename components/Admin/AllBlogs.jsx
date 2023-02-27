import { StateContext } from '@/context/stateContext'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader'
import SideMenu from './SideMenu'

const BlogList = ({ posts }) => {
    const title = (data) => {
        return data.length >= 60 ? data.slice(0, 60) + "..." : data
    }
    return (
        <div className="flex gap-8 flex-wrap p-10">
            {posts.map(post => (
                <div key={post.id} className='overflow-hidden z-10 bg-white rounded-lg shadow-md w-full  max-w-sm'>
                    <div className="relative h-40">
                        <img
                            className="absolute h-full w-full object-cover"
                            src={post.image}
                            alt={title(post.title)} />
                    </div>
                    <div className="p-4">
                        <Link href={`/blogs/${post.id}`} className="text-lg mb-2 text-gray-900 font-cutiveMono tracking-tighter font-semibold hover:text-teal-900 transition-colors cursor-pointer min-h-[3.5rem] block">
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
                                            fill="currentColor" />
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

function AllBlogs() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const { replace } = useRouter()
    const { setAlert, user, pageLoading = true } = useContext(StateContext)
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
    if (pageLoading) {

        return (
            <div className="bg-blue-200 h-screen w-full fixed top-0 flex justify-center items-center z-50">
                <div>
                    <div role="status">
                        <svg className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 dark:fill-teal-300 fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
    if (!pageLoading && user === null) {
        replace('/admin/login')
        return (
            <div className="bg-blue-200 h-screen w-full fixed top-0 flex justify-center items-center z-50">
                <h1 className="font-cutiveMono text-3xl">
                    Sorry You Are Not Logged In
                </h1>
            </div>
        )
    }
    return (
        <div>
            {loading && <Loader />}
            <SideMenu />
            <h1 className='text-4xl font-cutiveMono font-medium capitalize p-10'>All Blogs.</h1>
            <BlogList posts={data} />
        </div>
    )
}

export default AllBlogs