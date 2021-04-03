import moment from "moment";
import { getUserList, getVisualNovel } from "../services/vndb/index";
import { Table } from "../components/Table/Table";
import { VNInUserList, VisualNovel } from '../services/vndb/types';

const userID = `131608`;
const limit = 100; // ! Maximum number of item per request (though I doubt I'd ever gonna read this many VN)

interface HomeProps {
  fullList: object[]
}

const Home = ({ fullList }: HomeProps) => {
  if (typeof window === undefined) return <div>'loading...'</div>;
  
  return fullList && <Table fullList={fullList} />;
};

export default Home;

// ! Static Site Generator
export const getStaticProps = async () => {
  const fullList = await getFullList();

  return {
    props: { fullList },
  };
};

const getFullList = async () => {
  try {
    const getUList = await getUserList(userID, limit);

    if (!getUList.success) {
      console.error("Could not fetch ulist");
    }

    const userList = getUList.data;

    const vnIDs = getUList.data.map((item) => item.vn);

    const pages = Math.ceil(userList.length / 25); // ! VNDB only allows 25 items per request for get VN query

    const visualNovels = [];

    for (let i = 0; i < pages; i++) {
      const currentBatchIDs = vnIDs.slice(i * 25, i * 25 + 25);
      const getCurrentBatch = await getVisualNovel(currentBatchIDs);

      if (!getCurrentBatch.success) {
        console.error("Could not fetch VNs");
      }

      visualNovels.push(...getCurrentBatch.data);
    }

    return joinAndClean(userList, visualNovels);
  } catch (error) {
    console.error(error);
  }

  return [];
};

const joinAndClean = (uList: VNInUserList[], vns: VisualNovel[]) => {
  const fullList = uList.map((base, index) => {
    const {
      labels,
      lastmod,
      started,
      finished,
      added,
      uid,
      ...formatedBase
    } = base;

    const {
      languages,
      aliases,
      image_flagging,
      orig_lang,
      links,
      platforms,
      ...formatedVN
    } = vns[index];

    return {
      ...formatedBase,
      status: base.labels[0].id,
      vote: base.vote / 10 || -1,
      voted: base.voted ? moment(base.voted * 1000).format("MM/DD/YYYY") : "Unrated",
      vn: formatedVN,
    };
  });

  return fullList;
};

// ! Server Side Rendering
// export async function getServerSideProps({ req, params }) {
//   const fullList = await getFullList();

//   return {
//     props: { fullList: vns },
//   };
// }
