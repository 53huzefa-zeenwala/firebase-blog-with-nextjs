import { db } from '@/firebase';
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader'
import Link from 'next/link'
import { StateContext } from '@/context/stateContext';
import SideMenu from './SideMenu';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import getBlogCount from '@/firebase/getBlogCount';

const BlogList = ({ posts }) => {
    const [items, setItems] = useState([])
    const { setAlert } = useContext(StateContext)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (posts) setItems(posts)
    }, [posts])
    const update = async (index, id) => {
        setLoading(true);

        try {
            await updateDoc(doc(db, "blog", id), { index })
            setAlert({
                isShow: true,
                duration: 3000,
                message: "Blog updated successfully.",
                type: "success",
            });
        } catch (error) {
            setAlert({
                isShow: true,
                duration: 3000,
                message: error.message,
                type: "error",
            });
        }
        setLoading(false);
    }
    const changeIndex = (posts, redefine) => {
        console.log(posts)

        redefine.map((item => {
            const post = posts.filter((post => post.id == item.id))[0]
            console.log(post.index, post.id, item.index, item.id)
            if (post.index !== item.index) {
                update(item.index, item.id)
            }
        }))
    }
    const title = (data) => {
        return data.length >= 60 ? data.slice(0, 60) + "..." : data
    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const itemsCopy = [...items];
        const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
        itemsCopy.splice(result.destination.index, 0, reorderedItem);
        const redefine = itemsCopy.map((item, i) => {
            return { ...item, index: i + 1 }
        })
        setItems(redefine);
        changeIndex(posts, redefine)
    };
    function removeTags(str) {
        if ((str === null) || (str === '')) {
            return '';
        } else {
            str = str.toString();
        }
        const newStr = str.replace(/(<([^>]+)>)/gi, '')
        return newStr.length >= 100 ? newStr.slice(0, 100) + "..." : newStr
    }
    return (
        <>
            {loading && <Loader />}
            {items && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex gap-8 flex-wrap p-10"
                            >
                                {items.map((post, i) => (
                                    <Draggable key={post.id} draggableId={post.id} index={i} className="">
                                        {(provided) => (
                                            <li
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                // key={post.id}
                                                className="bg-white rounded-lg shadow-xl w-full relative dragDiv flex"
                                            >
                                                <span {...provided.dragHandleProps} className='absolute bg-teal-100 hover:bg-teal-200 cursor-grab left-0 dragButton p-1 h-full rounded-lg rounded-r-none transition-[left] flex justify-center items-center drop-shadow-xl'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' viewBox="0 0 16 16" version="1.1" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                                        <circle cy="2.5" cx="5.5" r=".75" />
                                                        <circle cy="8" cx="5.5" r=".75" />
                                                        <circle cy="13.5" cx="5.5" r=".75" />
                                                        <circle cy="2.5" cx="10.4957" r=".75" />
                                                        <circle cy="8" cx="10.4957" r=".75" />
                                                        <circle cy="13.5" cx="10.4957" r=".75" />
                                                    </svg>
                                                </span>

                                                <div className='overflow-hidden z-10 bg-white w-full flex flex-col sm:flex-row'>
                                                    <div className="relative h-40 sm:aspect-[2] lg:aspect-[2.5] aspect-[1]">
                                                        <img
                                                            className="absolute h-full w-full object-cover"
                                                            src={post.image}
                                                            alt={title(post.title)} />
                                                    </div>
                                                    <div className="p-4 flex flex-col justify-between">
                                                        <Link href={`/blogs/${post.id}`} className="text-lg text-gray-900 font-cutiveMono tracking-tighter font-semibold hover:text-teal-900 transition-colors cursor-pointer block">
                                                            {title(post.title)}
                                                        </Link>
                                                        <p className='hidden md:block text-base font-medium text-gray-700 py-2'>{removeTags(post.description)}</p>
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
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </>
    )
}


function AdminHome() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const { replace } = useRouter()
    const { setAlert, user, pageLoading = true } = useContext(StateContext)
    useEffect(() => {
        const getData = async () => {
            console.log(await getBlogCount())
            try {
                const data = []
                const q = query(collection(db, 'blog'), orderBy('index', 'asc'))
                const querySnapshot = await getDocs(q);

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
            <h1 className='text-4xl font-cutiveMono font-medium capitalize p-10'>Welcome to admin page.</h1>
            <BlogList posts={data} />
        </div>
    )
}

export default AdminHome
