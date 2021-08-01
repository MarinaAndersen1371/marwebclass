import Layout from "@/components/Layout";
import SeminarItem from "@/components/SeminarItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function SeminarsPage({ seminars, page, total }) {
  return (
    <Layout>
      <h1>Seminars</h1>
      {seminars && seminars.length === 0 && <h3>No Seminars to show</h3>}

      {seminars &&
        seminars.map((seminar) => (
          <SeminarItem key={seminar.id} seminar={seminar} />
        ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/seminars/count`);
  const total = await totalRes.json();

  // Fetch seminars
  const seminarRes = await fetch(
    `${API_URL}/seminars?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const seminars = await seminarRes.json();

  return {
    props: { seminars, page: +page, total },
  };
}
