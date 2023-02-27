import { Cutive_Mono, Poppins } from "@next/font/google";
import Blogs from "@/components/Blogs";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Layout from "@/components/Layout";
import Link from "next/link";

const cutiveMono = Cutive_Mono({
  variable: "--font-cutive-mono",
  subsets: ["latin"],
  weight: ['400']
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})

export default function Home({ data }) {
  return (
    <div className={`${cutiveMono.variable} ${poppins.variable}`}>
      <Layout>
        <h1 className="md:text-6xl text-4xl pl-4 py-12 px-12 md:px-24 font-poppins font-semibold capitalize">Welcome to nextjs blogs 💖</h1>
        <Blogs blogs={data} />
        <Link href={'/blogs'} className="w-full flex justify-end text-base font-poppins px-14 pb-5">See more</Link>
      </Layout>
    </div>
  );
}



export async function getStaticProps() {
  const data = [];

  try {
    const querySnapshot = await getDocs(query(collection(db, 'blog'), orderBy('index', 'asc')));

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