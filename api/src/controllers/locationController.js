import db from "../db/dbQuery";

/**
 * Get locations
 */
const getLocations = (req, res) => {
  db.query(`SELECT * FROM locations ORDER BY "isGeneral" DESC`, [])
    .then((result) => {
      res.status(200).send({ status: "success", data: result.rows });
    })
    .catch(({ message }) => {
      res.send({ status: "error", message: message });
    });
};

/**
 * Create a location.
 */
const createLocation = (req, res) => {
  const { name, externalNumber, tafics, isGeneral, operatorAccessNumber } = req.body || {};

  if (name === '' || externalNumber === '' || tafics === '' || isGeneral === undefined || operatorAccessNumber === '') {
    res.status(400).send({ status: "error", message: "Tüm alanlar gereklidir." });
    return;
  }

  db.query(`SELECT * FROM locations WHERE "name" = $1`, [name])
    .then((result) => {
      if (result.rows.length != 0) {
        res.send({ status: "error", message: "Aynı isme sahip bir birlik var." });
      } else {
        db.query(`INSERT INTO locations(
          "name",
          "externalNumber",
          "tafics",
          "isGeneral",
          "operatorAccessNumber") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
          name,
          externalNumber,
          tafics,
          isGeneral,
          operatorAccessNumber
        ])
          .then((result) => res.status(200)
            .send({
              status: "success",
              message: "Birlik başarıyla eklendi.",
              lastID: result.rows[0].ID
            }))
          .catch(message => res.status(500).send({ status: "error", message: message }));
      }
    })
    .catch(({ message }) => {
      res.status(500).send({ status: "error", message: message });
      return;
    });
};

/**
 * Update a location.
 */
const updateLocation = (req, res) => {
  const { column, data } = req.body || {};

  if (column === undefined || data === undefined || req.params.id === undefined) {
    res.status(400).send({ status: "error", message: 'Eksik parametre!' });
    return;
  }

  db.query(`UPDATE locations SET "${column}" = $1 WHERE "ID" = $2`, [
    data,
    req.params.id,
  ])
    .then(() => res.status(200).send({ status: "success", message: "Güncelleme başarılı." }))
    .catch(({ message }) => res.status(500).send({ status: "error", message: message }));
};

/**
 * Remove a location.
 */
const removeLocation = (req, res) => {
  if (req.params.id === undefined || req.params.id === "") {
    res.status(400).send({ status: "error", message: 'Eksik parametre!' });
    return;
  }

  db.query(`DELETE FROM locations WHERE "ID" = $1`, [req.params.id])
    .then(() => res.status(200)
      .send({
        status: "success",
        message: "Birlik başarıyla silindi.",
        lastID: req.params.id
      }))
    .catch(({ error }) => res.status(500).send({ status: "error", message: error }));
};

/**
 * Get a location.
 */
const getLocationByID = (req, res) => {
  db.query(`SELECT * FROM locations WHERE "ID" = $1`, [req.params.id])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch(({ message }) => {
      res.status(500).send({ message });
    });
};

/**
 * Create many locations for general tafics
 */
const createStackLocation = (req, res) => {
  if (req.body.length > 0) {
    try {
      req.body.forEach(location => {
        db.query(`SELECT * FROM locations WHERE "name" = $1`, [location.name])
          .then((result) => {
            if (result.rows.length === 0) {
              db.query(`INSERT INTO locations(
          "name",
          "externalNumber",
          "tafics",
          "isGeneral",
          "operatorAccessNumber") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
                location.name,
                location.externalNumber,
                location.tafics,
                false,
                location.operatorAccessNumber
              ])
            }
          })
      })
    }
    catch (error) {
      res.status(500).send({ status: "error", message: error });
      return;
    }
    res.status(200)
      .send({
        status: "success",
        message: "Birlikler başarıyla eklendi."
      });
  }
};

/**
 * Remove many locations.
 */
const removeStackLocation = (req, res) => {
  console.log("aaa");

  db.query(`DELETE FROM locations WHERE "isGeneral" = false`, [])
    .then(() => res.status(200)
      .send({
        status: "success",
        message: "Birlikler başarıyla silindi."
      }))
    .catch((error) => res.status(500).send({ status: "error", message: error }));
};

export {
  getLocations,
  createLocation,
  updateLocation,
  removeLocation,
  getLocationByID,
  createStackLocation,
  removeStackLocation
};
