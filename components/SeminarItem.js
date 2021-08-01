import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/SeminarItem.module.css";

export default function SeminarItem({ seminar }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            seminar.image
              ? seminar.image.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
          alt=''
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(seminar && seminar.date).toLocaleDateString("en-US")} at{" "}
          {seminar.time}
        </span>
        <h3>{seminar.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/seminars/${seminar.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
}
