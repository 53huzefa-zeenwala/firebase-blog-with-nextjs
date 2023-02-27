import Blogs from '@/components/Blogs';
import Layout from '@/components/Layout';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'

function blogs({ data }) {
    return (
        <div>
            <Layout>
                <h1 className="md:text-6xl text-4xl pl-4 py-12 px-12 md:px-24 font-poppins font-semibold capitalize">All the Blogs 💖</h1>
                <Blogs blogs={data} />
            </Layout>
        </div>
    )
}

export default blogs

export async function getStaticProps() {
    const data = [];

    try {
        const querySnapshot = await getDocs(collection(db, 'blog'));

        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data(),
            });
        });
    } catch (error) {
        console.error(error);
    }

    return {
        props: {
            data,
        },
        revalidate: 60,
    };
}