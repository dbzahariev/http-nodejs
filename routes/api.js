const express = require("express");

const router = express.Router();

const Games = require("../models/games");

const cors = require('cors')

// Routes

router.get("/", cors(), (req, res) => {
  Games.find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
});

router.get("/users", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  Games.find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
});

router.post("/save", cors(), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const data = req.body;

  const newGame = new Games(data);

  newGame.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      return;
    }
    // newGame
    return res.json({
      msg: "Your data has been saved!!!!!!",
    });
  });
});

router.post("/update", cors(), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const data = req.body || {};
  let id = req?.query?.id;

  if (!id) {
    res.status(404).json({ msg: `Not found id (${id})` });
    return;
  }
  if (data.bets) {
    Games.findOneAndUpdate(
      { _id: id },
      { bets: data.bets },
      { useFindAndModify: false }
    )
      .then(() => {
        return res.json({ msg: "Bet is saved successfully!" });
      })
      .catch(() => {
        return res.status(500);
      });
  }
  if (data.finalWinner) {
    Games.findOneAndUpdate(
      { _id: id },
      { finalWinner: data.finalWinner },
      { useFindAndModify: false }
    )
      .then(() => {
        return res.json({ msg: "Final winner is saved successfully!" });
      })
      .catch(() => {
        return res.status(500);
      });
  }
});

// Games.findOne(id).then((game) => {
//   console.log(game);
//   // Games.findOneAndUpdate(
//   //   { _id: id },
//   //   { bets: data.bets },
//   //   { useFindAndModify: false }
//   // )
//   //   .then(() => {
//   //     return res.json({ msg: "Bet is saved successfully!" });
//   //   })
//   //   .catch(() => {
//   //     return res.status(500);
//   //   });
// });
// });

module.exports = router;
