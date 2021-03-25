import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserList, getVisualNovel} from '../../services/vndb/index';
import { VisualNovel, VNInUserList } from '../../services/vndb/types';

import moment from 'moment';

const userID: string = `131608`;
const limit: number = 100; // ! Maximum number of item per request (though I doubt I'd ever gonna read this many VN)

type VNDBResponse = {
    success: boolean,
    message: string,
    data: any[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {     
    try {
        const getUList: VNDBResponse = await getUserList(userID, limit);

        if (!getUList.success) {     
            return res.send({ status: 500 });
        }

        const userList: VNInUserList[] = getUList.data;

        const vnIDs: number[] = getUList.data.map((item) => item.vn);

        const pages = Math.ceil(userList.length / 25); // ! VNDB only allows 25 items per request for get VN query
        
        const visualNovels: VisualNovel[] = [];

        try {              
            for (let i = 0; i < pages; i++) {
                const currentBatchIDs = vnIDs.slice(i * 25, i * 25 + 25);
                const getCurrentBatch: VNDBResponse = await getVisualNovel(currentBatchIDs);

                if (!getCurrentBatch.success) {
                    return res.send({ status: 500 });
                }

                visualNovels.push(...getCurrentBatch.data);
            }
            const fullList = joinAndClean(userList, visualNovels);

            res.send({
                status: 200,
                fullList
            }); 
        } catch (error2) {
            console.error(error2);
        }
    } catch (error) {
        console.error(error);
    }
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
            vote: base.vote / 10 || 'Not Rated',
            voted: moment(base.voted * 1000).format("MM/DD/YYYY") || 'Not Rated',
            vn: formatedVN
        };
    });

    return fullList;
}