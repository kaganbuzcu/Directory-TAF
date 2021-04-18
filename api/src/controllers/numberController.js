import db from "../db/dbQuery";

/**
 * Get numbers
 */
const getNumbers = (req, res) => {
  db.query(`SELECT * FROM numbers`, [])
    .then((result) => {
      res.status(200).send({ status: "success", data: result.rows });
    })
    .catch(({ message }) => {
      res.send({ status: "error", message: message });
    });
};

/**
 * Create a number.
 */
const createNumber = (req, res) => {
  const { duty, internalNumber, nameSurname, rank, gsm, subLocationID, locationID } = req.body || {};

  if (duty === '' || internalNumber === '' || subLocationID === undefined || locationID === undefined) {
    res.status(400).send({ status: "error", message: "Dahili Numara ve Makam boş olamaz." });
    return;
  }

  db.query(`SELECT * FROM locations WHERE "internalNumber" = $1 OR "duty" = $2`, [internalNumber, duty])
    .then((result) => {
      if (result.rows.length != 0) {
        res.send({ status: "error", message: "Dahili Numara veya Makam veri tabanında mevcut." });
      } else {
        db.query(`INSERT INTO numbers(
          "duty",
          "internalNumber",
          "nameSurname",
          "rank",
          "gsm",
          "subLocationID",
          "locationID") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
          duty,
          internalNumber,
          nameSurname === undefined ? "" : nameSurname,
          rank === undefined ? "" : rank,
          gsm === undefined ? "" : gsm,
          subLocationID,
          locationID,
        ])
          .then((result) => res.status(200)
            .send({
              status: "success",
              message: "Numara başarıyla eklendi.",
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
 * Update a number.
 */
const updateNumber = (req, res) => {
  const { column, data } = req.body || {};

  if (column === undefined || data === undefined || req.params.id === undefined) {
    res.status(400).send({ status: "error", message: 'Eksik parametre!' });
    return;
  }

  db.query(`UPDATE numbers SET "${column}" = $1 WHERE "ID" = $2`, [
    data,
    req.params.id,
  ])
    .then(() => res.status(200).send({ status: "success", message: "Güncelleme başarılı." }))
    .catch(({ message }) => res.status(500).send({ status: "error", message: message }));
};

/**
 * Remove a number.
 */
const removeNumber = (req, res) => {
  if (req.params.id === undefined || req.params.id === "") {
    res.status(400).send({ status: "error", message: 'Eksik parametre!' });
    return;
  }

  db.query(`DELETE FROM numbers WHERE "ID" = $1`, [req.params.id])
    .then(() => res.status(200)
      .send({
        status: "success",
        message: "Numara başarıyla silindi.",
        lastID: req.params.id
      }))
    .catch(({ error }) => res.status(500).send({ status: "error", message: error }));
};

/**
 * Get a number.
 */
const getNumberByID = (req, res) => {
  db.query(`SELECT * FROM numbers WHERE "ID" = $1`, [req.params.id])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch(({ message }) => {
      res.status(500).send({ message });
    });
};

export {
  getNumbers,
  createNumber,
  updateNumber,
  removeNumber,
  getNumberByID,
};
