import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Seminar.module.css";

export default function SeminarPage({ seminar }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(seminar && seminar.date).toLocaleDateString("en-US")} at{" "}
          {seminar && seminar.time}
        </span>
        <ToastContainer />
        <h1>{seminar && seminar.name}</h1>
        {seminar && seminar.image && (
          <div className={styles.image}>
            <Image
              src={seminar.image.formats.medium.url}
              alt='Seminar'
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Our Instructor: </h3>
        <p>{seminar && seminar.instructor}</p>
        <h3>Description:</h3>
        <p>{seminar && seminar.description}</p>
        <h3>Venue: {seminar && seminar.venue}</h3>
        <p>{seminar && seminar.address}</p>

        <Link href='/seminars'>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/seminars`);
//   const seminars = await res.json();

//   const paths = seminars.map((seminar) => ({
//     params: { slug: seminar.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/seminars?slug=${slug}`);
//   const seminars = await res.json();

//   return {
//     props: {
//       seminar: seminars[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/seminars?slug=${slug}`);
  const seminars = await res.json();

  return {
    props: {
      seminar: seminars[0],
    },
  };
}
