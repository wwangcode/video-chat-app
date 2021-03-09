require('dotenv').config()
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');


export default async (req, resp) => { 
    const APP_ID = `${process.env.AGORA_APP_ID}`
    const APP_CERTIFICATE = `${process.env.AGORA_APP_CERTIFICATE}`

    resp.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.setHeader('Expires', '-1');
    resp.setHeader('Pragma', 'no-cache');
    resp.setHeader('Access-Control-Allow-Origin', '*');

    console.log(req)
    const channelName = req.body.channelName;

    if (!channelName) {
        return resp.status(500).json({ 'error': 'channel is required' });
    }

    // get uid 
    let uid = req.body.uid;
    if(!uid || uid == '') {
        uid = 0;
    }
    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.body.role == 'publisher') {
        role = RtcRole.PUBLISHER;
    }
    // get the expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '') {
        expireTime = 3600;
    } else {
        expireTime = parseInt(expireTime, 10);
    }
    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID, 
        APP_CERTIFICATE, 
        channelName, 
        uid, 
        role, 
        privilegeExpireTime,
    );

    return resp.status(200).json({ 'token': token });
};