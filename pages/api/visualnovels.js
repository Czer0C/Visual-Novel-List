const VNDB = require("vndb-api");

const userID = `131608`;
const limit = 100; // ! Maximum number of item per request (though I doubt I'd ever gonna read this many VN)

export default async (req, res) => {
    const vndb = new VNDB("clientname", {
        minConnection: 1,
        maxConnection: 10,
    });
    
    const query = `get ulist basic,labels (uid=${userID}) {"results": ${limit}}`;

    // ! The plan is to merge ulist and list of VNs respectively
    // * Firstly get the main list based on user ID
    // * Next up create an array of VN ID based on the aforementioned list
    // * Now cycle through this list to get the list of VNs
    // * Since limit rate is 25 per request, have to make several calls depending on the size of the base list
    // ? hence the 'count'
    // * Lastly, combine the overall results from various get VN calls together.

    try {
        const getVNList = await vndb.query(query);
        const baseList = getVNList.items;
        const vnIDs = baseList.map((item) => item.vn);
        const pages = Math.ceil(baseList.length / 25); // ! VNDB only allows 25 items per request for get VN query
        const vns = [];

        try {  
            for (let i = 0; i < pages; i++) {
                const currentBatchIDs = await vnIDs.slice(i * 25, i * 25 + 25);
                const currentBatch = await vndb.query(
                    `get vn basic,details (id=[${currentBatchIDs}]) {"results": ${25}}`
                );
                vns.push(...currentBatch.items);
            }

            // ! Clean up data, only get what's necessary from both list and join them.
            const fullList = baseList.map((base, index) => {
                const {
                    labels,
                    lastmod,
                    started,
                    finished,
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
                    vn: formatedVN
                };
            });
            
            res.send(fullList); 
        } catch (error2) {
            console.error(error2);
        }
    } catch (error) {
        console.error(error);
    }
    vndb.destroy();
};