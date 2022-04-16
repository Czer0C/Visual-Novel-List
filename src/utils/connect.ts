/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import VNDB from 'vndb-api';
import type { VNDBResponse } from 'vndb-api/lib/utils';

import { VisualNovel, VNInUserList, Tier } from './types';

type Response = {
  success: boolean;
  message: string;
  data: any[];
};

const ID = `131608`;
const LIMIT = 100; // ! Maximum number of item per request (though I doubt I'd ever gonna read this many VN)

const getUserList = async (userID: string, limit: number) => {
  const response: Response = {
    success: false,
    message: '',
    data: [],
  };

  if (limit < 1 || limit > 100) {
    response.message = 'Limit must be a number from 1 to 100';
  } else {
    const vndb = new VNDB('clientname', {
      minConnection: 1,
      maxConnection: 10,
    });

    const query = `get ulist basic,labels (uid=${userID}) {"results": ${limit}}`;

    try {
      const getVNList: VNDBResponse = await vndb.query(query);
      const vnList: VNInUserList[] = getVNList.items;

      response.success = true;
      response.message = 'Get user list successfully';
      response.data = vnList;
    } catch (error) {
      console.error(error);
      response.message = `An error has occurred on VNDB side:\n${JSON.stringify(
        error
      )}`;
    }
    vndb.destroy();
  }

  return response;
};

const getVisualNovelInfo = async (vnIDs: number[] | string[]) => {
  const response: Response = {
    success: false,
    message: '',
    data: [],
  };

  const vndb = new VNDB('clientname', {
    minConnection: 1,
    maxConnection: 10,
  });

  const query = `get vn basic,details (id=[${vnIDs}]) {"results": ${25}}`;

  try {
    const getVNs: VNDBResponse = await vndb.query(query);
    const vnList: VisualNovel[] = getVNs.items;

    response.success = true;
    response.message = 'Get Visual Novels successfully';
    response.data = vnList;
  } catch (error) {
    console.error(error);
    response.message = `An error has occurred on VNDB side:\n${JSON.stringify(
      error
    )}`;
  }

  return response;
};

const getTier = (vote: number): Tier =>
  vote > 9 ? 'X' : vote > 8 ? 'S' : vote > 7 ? 'A' : vote > 6 ? 'B' : 'C';

const joinAndClean = (uList: VNInUserList[], vns: VisualNovel[]) => {
  const fullList: any[] = uList.map((base) => {
    const { labels, lastmod, started, finished, added, uid, ...formatedBase } =
      base;

    const vn = vns.find((i) => i?.id === base.vn);

    let extraInfo;

    if (vn) {
      const { languages, aliases, orig_lang, platforms, ...formatedVN } = vn;
      extraInfo = {
        ...formatedVN,
      };
    } else {
      extraInfo = {
        id: base.vn,
        title: null,
        original: null,
        released: null,
        length: null,
        description: null,
        links: null,
        image: null,
        image_nsfw: null,
        image_flagging: null,
      };
    }

    return {
      ...formatedBase,
      vote: base.vote / 10 || -1,
      voted: base.voted || '-',
      status: labels[0],
      tier: getTier(base.vote / 10),
      ...extraInfo,
    };
  });

  return fullList;
};

export const getFullList = async () => {
  try {
    const getUList = await getUserList(ID, LIMIT);

    if (!getUList.success) {
      console.error('Could not fetch ulist');
    }

    const userList = getUList.data;

    const vnIDs = getUList.data.map((item) => item.vn);

    const pages = Math.ceil(userList.length / 25); // ! VNDB only allows 25 items per request for get VN query

    const visualNovels = [];

    for (let i = 0; i < pages; i++) {
      const currentBatchIDs = vnIDs.slice(i * 25, i * 25 + 25);
      const getCurrentBatch = await getVisualNovelInfo(currentBatchIDs);

      if (!getCurrentBatch.success) {
        console.error('Could not fetch VNs');
      }

      visualNovels.push(...getCurrentBatch.data);
    }

    return joinAndClean(userList, visualNovels);
  } catch (error) {
    console.error(error);
  }

  return [];
};
