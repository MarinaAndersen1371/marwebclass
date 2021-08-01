import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import SeminarItem from "@/components/SeminarItem";
import { API_URL } from "@/config/index";

export default function SearchPage({ seminars }) {
  const router = useRouter();

  return (
    <Layout title='Search Results'>
      <Link href='/seminars'>Go Back</Link>
      <h1>Search Results for {router.query.term}: </h1>
      {seminars && seminars.length === 0 && <h3>No Seminars to show</h3>}

      {seminars &&
        seminars.map((seminar) => (
          <SeminarItem key={seminar.id} seminar={seminar} />
        ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { description_contains: term },
        { instructor_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/seminars?${query}`);
  const seminars = await res.json();

  return {
    props: { seminars },
  };
}
