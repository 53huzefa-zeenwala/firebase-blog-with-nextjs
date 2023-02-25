import { Cutive_Mono, Poppins } from "@next/font/google";
import Blogs from "@/components/Blogs";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Layout from "@/components/Layout";

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
      </Layout>
    </div>
  );
}



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