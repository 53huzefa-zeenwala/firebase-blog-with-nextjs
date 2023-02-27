import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Blog from "@/components/Blog";
import Layout from "@/components/Layout";

export default function blog({ data }) {
  return (
    <Layout>
      <Blog
        title={data.title}
        date={data.date}
        description={data.description}
        image={data.image}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const collectionRef = collection(db, "blog");
  const collectionDocs = await getDocs(collectionRef);

  const paths = collectionDocs.docs.map((doc) => ({
    params: {
      id: doc.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);

  const data = {
    ...docSnap.data(),
  };
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
