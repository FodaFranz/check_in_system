import express, { Router } from "express";
import CheckinDb from "../dal/dbAccess";

const router: Router = express.Router();
const dbAccess: CheckinDb = new CheckinDb();

router.post("/checkin", (req, res) => {
  const name = req.query.name;
  res.setHeader("Access-Control-Allow-Origin", "*");
  dbAccess.checkin(name)
    .then(user => {
      //Header attribute to allow CORS
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    })
});

router.post("/checkout", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const name = req.query.name;
  dbAccess.checkout(name)
    .then(checkinTime => {
      res.status(200).json(checkinTime);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    })
});

router.get("/checkins", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  dbAccess.getCheckins()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message);
    })
});

export default router;