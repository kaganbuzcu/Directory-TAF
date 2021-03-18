import db from '../db/dbQuery';
const ColorThief = require('colorthief');

/**
 * Get my profile.
 * @param userID: string * 
 */
const getMyProfile = (req, res) => {
    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('');

    ColorThief.getColor(req.query.image)
        .then(color => {
            res.send(rgbToHex(color[0], color[1], color[2]));
        })
        .catch(err => { console.log(err) })

}

export {
    getMyProfile,
};

