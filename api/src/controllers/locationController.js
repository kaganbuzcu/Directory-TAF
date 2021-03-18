import db from "../db/dbQuery";

/**
 * Get locations
 */
const getLocations = (req, res) => {
  db.query(`SELECT * FROM locations`, [])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch(({ message }) => {
      res.status(500).send({ message });
    });
};

/**
 * Create a location.
 */
const createLocation = (req, res) => {
  const { author_id: authorId, title, content } = req.body || {};

  res.status(200).send({ hede: "ok" });
};

/**
 * Remove a location.
 */
const removeLocation = (req, res) => {
  res.status(203).send({ hede: "ok" });
};

/**
 * Update a location.
 */
const updateLocation = (req, res) => {
  const { title, content } = req.body || {};

  if (!title || !content) {
    res.status(400).send({ message: "Post title and content are required." });
    return;
  }
};

/**
 * Get a post.
 */
const getLocation = (req, res) => {
  res.status(200).send({ hede: "ok" });
};

export {
  getLocations,
  createLocation,
  removeLocation,
  updateLocation,
  getLocation,
};
