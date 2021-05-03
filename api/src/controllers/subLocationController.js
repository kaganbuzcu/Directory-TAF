import db from "../db/dbQuery";

/**
 * Get sub locations
 */
const getSubLocations = (req, res) => {
  db.query(`SELECT * FROM sub_locations`, [])
    .then((result) => {
      res.status(200).send({ status: "success", data: result.rows });
    })
    .catch(({ message }) => {
      res.send({ status: "error", message: message });
    });
};

/**
 * Create a sub location.
 */
const createSubLocation = (req, res) => {
  const { name, locationID } = req.body || {};

  if (name === "" || locationID === "") {
    res
      .status(400)
      .send({ status: "error", message: "Tüm alanlar gereklidir." });
    return;
  }

  db.query(
    `INSERT INTO sub_locations("name", "locationID", "locationName") 
                VALUES ($1, $2, (SELECT name FROM locations WHERE "ID" = $2)) RETURNING *`,
    [name, parseInt(locationID)]
  )
    .then((result) =>
      res.status(200).send({
        status: "success",
        message: "Kısım/Şube başarıyla eklendi.",
        lastID: result.rows[0].ID,
        locationName: result.rows[0].locationName,
      })
    )
    .catch((message) =>
      res.status(500).send({ status: "error", message: message })
    );
};

/**
 * Update a sub location.
 */
const updateSubLocation = (req, res) => {
  const { name } = req.body || {};

  if (name === "") {
    res.status(400).send({ status: "error", message: "Eksik parametre!" });
    return;
  }

  db.query(`UPDATE sub_locations SET "name" = $1 WHERE "ID" = $2`, [
    name,
    req.params.id,
  ])
    .then(() =>
      res
        .status(200)
        .send({ status: "success", message: "Güncelleme başarılı." })
    )
    .catch(({ message }) =>
      res.status(500).send({ status: "error", message: message })
    );
};

/**
 * Remove a sub location.
 */
const removeSubLocation = (req, res) => {
  if (req.params.id === undefined || req.params.id === "") {
    res.status(400).send({ status: "error", message: "Eksik parametre!" });
    return;
  }

  db.query(`DELETE FROM sub_locations WHERE "ID" = $1`, [req.params.id])
    .then(() =>
      res.status(200).send({
        status: "success",
        message: "Kısım/Şube başarıyla silindi.",
        lastID: req.params.id,
      })
    )
    .catch(({ error }) =>
      res.status(500).send({ status: "error", message: error })
    );
};

/**
 * Get a sub location.
 */
const getSubLocationByID = (req, res) => {
  db.query(`SELECT * FROM sub_locations WHERE "ID" = $1`, [req.params.id])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch(({ message }) => {
      res.status(500).send({ message });
    });
};

export {
  getSubLocations,
  createSubLocation,
  updateSubLocation,
  removeSubLocation,
  getSubLocationByID,
};
