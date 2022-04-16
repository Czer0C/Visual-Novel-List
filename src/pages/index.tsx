import { Table } from '@/components/table';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getFullList } from '@/utils/connect';
import { MergedVNItem } from '@/utils/types';

interface Props {
  list: MergedVNItem[];
}

const Index = ({ list }: Props) => {
  return (
    <Main
      meta={
        <Meta
          title="Czer0C Visual Novel List"
          description="A list to keep track of my vn journey."
        />
      }
    >
      <div className="flex min-h-screen w-full items-start justify-center overflow-auto font-sans">
        <div className="my-6 rounded shadow-lg ">
          <Table list={list} />
        </div>
      </div>
    </Main>
  );
};

export default Index;

export const getStaticProps = async () => {
  const list = await getFullList();
  return {
    props: {
      list,
    },
  };
};
