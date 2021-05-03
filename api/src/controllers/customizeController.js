import db from "../db/dbQuery";

/**
 * Get header
 */
const getHeader = (req, res) => {
    db.query(`SELECT "headerText" FROM "static_datas"`, [])
        .then((result) => {
            res.status(200).send({ status: "success", data: result.rows[0].headerText });
        })
        .catch(({ message }) => {
            res.send({ status: "error", message: message });
        });
};

/**
 * Create or update header.
 */
const createOrUpdateHeader = (req, res) => {
    db.query(`UPDATE static_datas SET "headerText" = $1`, [
        req.params.headerText,
    ])
        .then(() => res.status(200).send({ status: "success", message: "Güncelleme başarılı." }))
        .catch(({ message }) => res.status(500).send({ status: "error", message: message }));
};

export {
    getHeader,
    createOrUpdateHeader,
};
