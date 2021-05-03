const getNumbers = (req, res) => {
    db.query(`SELECT * FROM numbers`, [])
      .then((result) => {
        res.status(200).send({ status: "success", data: result.rows });
      })
      .catch(({ message }) => {
        res.send({ status: "error", message: message });
      });
  };