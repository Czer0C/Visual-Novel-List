/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import VNDB from 'vndb-api';
import type { VNDBResponse } from 'vndb-api/lib/utils';

import { STATUS } from '@/utils/constant';

import { VisualNovel, VNInUserList } from './types';

type Response = {
  success: boolean;
  message: string;
  data: any[];
};

const userID = `131608`;
const limit = 100; // ! Maximum number of item per request (though I doubt I'd ever gonna read this many VN)

const getUserList = async (uID: string, lim: number) => {
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

    const query = `get ulist basic,labels (uid=${uID}) {"results": ${lim}}`;

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

const getVisualNovel = async (vnIDs: number[] | string[]) => {
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
  vndb.destroy();

  return response;
};

const getStatus = (status: number): string | undefined => STATUS[status - 1];

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
      status: getStatus(base?.labels[0]?.id || 0),
      statusCode: base?.labels[0]?.id,
      vote: base.vote / 10 || -1,
      voted: base.voted || '-',
      ...extraInfo,
    };
  });

  return fullList;
};

export const getFullList = async () => {
  try {
    const getUList = await getUserList(userID, limit);

    if (!getUList.success) {
      console.error('Could not fetch ulist');
    }

    const userList = getUList.data;

    const vnIDs = getUList.data.map((item) => item.vn);

    const pages = Math.ceil(userList.length / 25); // ! VNDB only allows 25 items per request for get VN query

    const visualNovels = [];

    for (let i = 0; i < pages; i++) {
      const currentBatchIDs = vnIDs.slice(i * 25, i * 25 + 25);
      const getCurrentBatch = await getVisualNovel(currentBatchIDs);

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
