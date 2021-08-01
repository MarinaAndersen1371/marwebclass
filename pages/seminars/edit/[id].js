import { parseCookies } from "@/helpers/index";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Link from "next/link";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import styles from "@/styles/Form.module.css";

export default function EditSeminarPage({ seminar, token }) {
  const [values, setValues] = useState({
    name: seminar.name,
    instructor: seminar.instructor,
    address: seminar.address,
    description: seminar.description,
    date: seminar.date,
    time: seminar.time,
    venue: seminar.venue,
  });
  const [imagePreview, setImagePreview] = useState(
    seminar.image ? seminar.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all Fields");
    }

    const res = await fetch(`${API_URL}/seminars/${seminar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        toast.error("Not authorized");
        return;
      }
      toast.error("Something went wrong");
    } else {
      const seminar = await res.json();
      router.push(`/seminars/${seminar.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/seminars/${seminar.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title='Edit Seminar'>
      <Link href='/seminars'>Go Back</Link>
      <h1>Edit Seminar</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Seminar Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='instructor'>Instructor</label>
            <input
              type='text'
              name='instructor'
              id='instructor'
              value={values.instructor}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Seminar Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Update Seminar' className='btn' />
      </form>

      <h2>Seminar Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} alt='' height={100} width={170} />
      ) : (
        <div>
          <p>No Image uploaded</p>
        </div>
      )}
      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage />
          {"   "}
          Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          seminarId={seminar.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/seminars/${id}`);
  const seminar = await res.json();

  return {
    props: { seminar, token },
  };
}
