import Link from "next/link";
import Layout from "@/components/Layout";
import SeminarItem from "@/components/SeminarItem";
import { API_URL } from "@/config/index";

export default function Home({ seminars }) {
  return (
    <Layout>
      <h1>Upcoming Seminars</h1>
      {seminars && seminars.length === 0 && <h3>No Seminars to show</h3>}

      {seminars &&
        seminars.map((seminar) => (
          <SeminarItem key={seminar.id} seminar={seminar} />
        ))}

      {seminars && seminars.length > 0 && (
        <Link href='/seminars'>
          <a className='btn-secondary'>View All Seminars</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/seminars?_sort=date:ASC&_limit=3`);
  const seminars = await res.json();

  return {
    props: { seminars },
    revalidate: 1,
  };
}
