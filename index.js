const mongoose = require('mongoose');
const databaseURI = 'mongodb://localhost:27017/myapp';

mongoose.connect(databaseURI);

// You can read more about Schemas in the documentation
// https://mongoosejs.com/docs/schematypes.html

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
});

const UserModel = mongoose.model('User', UserSchema);

// You can read more about method in Model object in the documentation
// https://mongoosejs.com/docs/api.html#Model

UserModel.create({ firstName: 'Dawid', lastName: 'Kędzierski' }, (err) => {
    if (err) {
        console.error(err);
    }
});

// UserModel.find({ firstName: 'Dawid' }, (err, data) => {
//     if (err) {
//         console.error(err);
//     }
//
//     console.log(data);
// });

// const userId = '5c891cb919caba6b50f492a4';

// UserModel.updateOne({ _id: userId }, { lastName: 'Kędzierski' }, (err, raw) => {
//     if (err) {
//         console.error(err);
//     }
//
//     console.log(raw);
// });

// UserModel.deleteOne({ _id: userId }, (err) => {
//     if (err) {
//         console.error(err);
//     }
// });
