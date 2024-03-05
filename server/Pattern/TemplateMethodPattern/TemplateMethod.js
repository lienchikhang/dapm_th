const User = require("../../models/User")
const Shoe = require("../../models/Shoe")
class behavior {
    make() {
        this.get();
        this.remove();
        this.add();
    }
}
class userBehavior extends behavior {
    async add(user) {
        try {
            const newUser = new User(user)
            await newUser.save();
        }
        catch (err) {
            console.log(err)
        }
    }
    async get() {
        try {
            const users = await User.find();
            return users;
        } catch (err) {
            console.log(err)
        }
    }
}
class shoeBehavior extends behavior {
    async add(shoe) {
        try {
            const newShoe = new Shoe(shoe)
            await newShoe.save();
        } catch (err) {
            console.log(err)
        }
    }
    async remove(id) {
        try {
            await Shoe.findByIdAndDelete({ _id: id });
        } catch (err) {
            console.log(err)
        }
    }
    async get(id) {
        try {
            const detail = await Shoe.findById(id);
            return detail
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = {
    userBehavior,
    shoeBehavior
}