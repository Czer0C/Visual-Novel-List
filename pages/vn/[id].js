import { useRouter } from "next/router";
import Link from "next/link";

import Head from "next/head";
import styles from "../../styles/Home.module.css";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const api = `https://vndb-3a69f-default-rtdb.firebaseio.com/mylist.json`;

export default function Vn({ vn }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>{vn.title}</title>
      </Head>

      <main className={styles.main}>
        <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-8 sm:px-6 text-center">
          <h1 className="text-6xl text-green-400 font-semibold py-3 ">
            {vn.title}
          </h1>
          <h3 className="text-3xl  text-green-200 font-semibold">
            {vn.original}
          </h3>
        </div>

        <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-8 sm:px-6"></div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="grid grid-flow-col gap-4 px-8 max-w-screen-xl">
            <div className="row-span-4">
              <img
                className="py-32"
                src={`https://s2.vndb.org/cv/${vn.image.slice(
                  -2
                )}/${vn.image.slice(2)}.jpg`}
              />
            </div>
            <div className="col-span-1">
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Released</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {vn.released}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Synopsis</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {vn.desc.slice(0, 1500)}
                      {vn.desc.length > 1500 ? (
                        <Tippy content="Read more on VNDB">
                          <a
                            href={`https://vndb.org/v${id}`}
                            target="_blank"
                            className="text-indigo-500 hover:text-indigo-700 sm:ml-4"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                          </a>
                        </Tippy>
                      ) : (
                        ""
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Length</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {parseLength(vn.length)}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Vote</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {vn.vote === null ? "Not Rated" : vn.vote / 10}
                    </dd>
                  </div>

                  <div className={`bg-${parseStatusColor(vn.status)}-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text font-medium text-indigo-800">
                      Some Thoughts
                    </dt>
                    <dd className="mt-1 text text-indigo-600 sm:mt-0 sm:col-span-2">
                      {vn.notes}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Added</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {vn.added}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Status</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              bg-${parseStatusColor(vn.status)}-100 
                              text-${parseStatusColor(vn.status)}-800`}
                      >
                        {parseStatus(vn.status)}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <br />
        <Link href="/">
          <button
            type="button"
            className="m-9 py-4 px-6 p w-2/12 bg-white hover:bg-green-200 hover:text-white 
          focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white 
           text-center text-base 
          font-semibold shadow-md focus:outline-none focus:ring-2 
          
          transform hover:-translate-y-2.5
          transition duration-500 ease-in-out
          focus:ring-offset-2 rounded-full"
          >
            <span className="font-medium text-indigo-500 text-xl">Back</span>
          </button>
        </Link>
      </main>
    </div>
  );
}

// export async function getServerSideProps({ params }) {
//     const req = await fetch(api);
//     const data = await req.json();

//     const getDate = await fetch(`https://vnstat.net/api/novel/${params.id}`);

//     const releasedDate = await getDate.json();

//     const vn = data.filter(v => v.ID.toString() === params.id)[0];

//     vn.added = vn.added === undefined ? 'Not rated' : isoFormatDMY(parseISOString(vn.added));

//     vn.released = releasedDate.result.basic.released;

//     return {
//         props: { vn },
//     }
// }

export async function getStaticProps({ params }) {
  const req = await fetch(api);
  const getDate = await fetch(`https://vnstat.net/api/novel/${params.id}`);

  const releasedDate = await getDate.json();

  const data = await req.json();

  const vn = data.filter((v) => v.ID.toString() === params.id)[0];

  vn.added =
    vn.added === undefined
      ? "Not rated"
      : isoFormatDMY(parseISOString(vn.added));

  vn.released = releasedDate.result.basic.released;

  return {
    props: { vn },
  };
}

export async function getStaticPaths() {
  const req = await fetch(api);
  const data = await req.json();

  const paths = data.map((vn) => {
    return { params: { id: vn.ID.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

function parseLength(length) {
  switch (length) {
    case 1:
      return "Very Short (< 2 hours)";
    case 2:
      return "Short (2 - 10 hours)";
    case 3:
      return "Medium (10 - 30 hours)";
    case 4:
      return "Long (30 - 50 hours)";
    case 5:
      return "Very Long (> 50 hours)";
    default:
      return "";
  }
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function isoFormatDMY(d) {
  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate())
  );
}

function parseStatus(status) {
  switch (status) {
    case 1:
      return "Playing";
    case 2:
      return "Finished";
    case 3:
      return "Stalled";
    case 4:
      return "Dropped";
    case 5:
      return "Wishlist";
    case 6:
      return "Blacklist";
  }
}

function parseStatusColor(status) {
  switch (status) {
    case 1:
      return "gray";
    case 2:
      return "green";
    case 3:
      return "yellow";
    case 4:
      return "red";
    case 5:
      return "white";
    case 6:
      return "indigo";
  }
}
