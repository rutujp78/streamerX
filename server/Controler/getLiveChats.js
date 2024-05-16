const { google } = require('googleapis')
const youtube = google.youtube('v3');

const getLiveChats = async (req, res) => {
    try {
        const liveChatId = req.query.liveChatId;
        // console.log('this is livechatid: ', liveChatId)
        const resp = await youtube.liveChatMessages.list({
            access_token: req.query.accessToken,
            part: 'snippet, authorDetails',
            liveChatId: liveChatId,
            pageToken: req.query.nextPageToken
        });
    
        const { data } = resp;
        
        // if(req.query.nextPageToken) {
        //     console.log('second: ', data);
        //     const newMessages = data.items;
        //     console.log('second: ', newMessages);
        // }
        // else {
        //     console.log('first:', data);
        //     const newMessages = data.items;
        //     console.log('first: ', newMessages);
        // }
    
        res.status(200).json({ data: data });
    } catch (error) {
        console.log('Error in getting live chats... ', error);
        res.status(400).json({ msg: 'Error in getting live chats...' });
    }
}

module.exports = { getLiveChats };