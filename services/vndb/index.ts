import VNDB from 'vndb-api';
import { VNDBResponse } from 'vndb-api/lib/utils';
import { VNInUserList, VisualNovel } from './types';

type Response = {
    success: boolean,
    message: string,
    data: any[]
}

export const getUserList = async (userID: string, limit: number) => {
    const response: Response = {
        success: false,
        message: '',
        data: []
    }

    if (limit < 1 || limit > 100) {
        response.message = 'Limit must be a number from 1 to 100';
    } else {
        const vndb = new VNDB("clientname", {
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
            response.message = 'An error has occurred on VNDB side:\n' + JSON.stringify(error);
        }
        vndb.destroy();
    }

    return response;    
};

export const getVisualNovel = async (vnIDs: number[] | string[]) => {
    const response: Response = {
        success: false,
        message: '',
        data: []
    }

    const vndb = new VNDB("clientname", {
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
        response.message = 'An error has occurred on VNDB side:\n' + JSON.stringify(error);
    }
    vndb.destroy();

    return response;    
};