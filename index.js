const express = require("express");
const app = express();
const port = 3000;

var user = encodeURIComponent("Phillip");
var password = encodeURIComponent("18041997");

const mongoose = require("mongoose");
const databaseURI = `mongodb+srv://${user}:${password}@wmi-test-nodejs-jzsvj.mongodb.net/test?retryWrites=true`;
const UserSchema = require("./helpers/user.schema");

mongoose.connect(databaseURI, { useNewUrlParser: true });

const UserModel = mongoose.model("User", UserSchema);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/users", (req, res) => {
	UserModel.find({}, "firstName lastName", (err, data) => {
		res.send({
			data: data.map(user => {
				return {
					id: user._id,
					firstName: user.firstName,
					lastName: user.lastName
				};
			})
		});
	});
});

app.post("/users", (req, res) => {
	if (!req.body.firstName || !req.body.lastName) {
		return res.sendStatus(400);
	}

	// odbpytać find zeby sprawdzić czy taki użytkownik juz istnieje
	UserModel.create(
		{ firstName: req.body.firstName, lastName: req.body.lastName },
		err => {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}

			return res.sendStatus(204);
		}
	);
});

app.put("/users/:userId", (req, res) => {
	if (!req.body.firstName || !req.body.lastName) {
		return res.sendStatus(400);
	}

	UserModel.updateOne(
		{ _id: req.params.userId },
		{ firstName: req.body.firstName, lastName: req.body.lastName },
		err => {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}

			return res.sendStatus(204);
		}
	);
});

app.delete("/users/:userId", (req, res) => {
	UserModel.deleteOne({ _id: req.params.userId }, err => {
		if (err) {
			console.error(err);
			return res.sendStatus(500);
		}

		return res.sendStatus(204);
	});
});

app.listen(process.env.PORT || 3000, () =>
	console.log(`App listening on port ${port}!`)
);
