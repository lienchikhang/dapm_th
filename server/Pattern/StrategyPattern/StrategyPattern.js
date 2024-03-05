const Order = require("../../models/Order");
const Cart = require("../../models/Cart");

class PaymentDirect {
    async makeOrder(info) {
        try {
            const order = new Order({
                userId: info.idUser,
                shoes: info.shoes,
                methodPay: info.methodPay,
                name: info.name,
                address: info.address,
                phone: info.phone,
            })
            await order.save();
            const PullCart = await Cart.findOneAndUpdate(
                { userId: info.idUser },
                {
                    $pull: { shoes: {} },
                },
                {
                    new: true,
                }
            );
            await this.descShoeCountWithSize(info.shoes);
        } catch (err) {
            console.log(err)
        }
    }
    descShoeCountWithSize = (shoes) => {
        try {
            shoes.map(async (shoe) => {
                await Shoe.findOneAndUpdate(
                    {
                        _id: shoe._id,
                        "size.ss": shoe.size,
                    },
                    {
                        $inc: { "size.$.cs": -shoe.quantity },
                    }
                );
            });
        } catch (err) {
            console.log(err);
        }
    };
}
class PaymentOnline {
    async makeOrder(info) {
        const ShoeList = await this.querryToMakeOrder(info.jsonShoes);
        const result = new order({
            userId: info.idUser,
            shoes: ShoeList,
            methodPay: info.methodPay,
            name: info.name,
            address: info.address,
            phone: info.phone,
        });
        await result.save();
        await descShoeCountWithSize(ShoeList);
        await Cart.findOneAndUpdate(
            { userId: info.idUser },
            {
                $pull: { shoes: {} },
            },
            {
                new: true,
            }
        );
    }
    querryToMakeOrder = async (shoeList) => {
        const shoeListMax = await Promise.all(
            shoeList.map(async (shoe, index) => {
                let shoeItem = await Shoe.findById(shoe._id);
                return {
                    ...shoe,
                    price: shoeItem.price,
                    img: shoeItem.img,
                    desc: shoeItem.desc,
                    color: shoeItem.color,
                    type: shoeItem.type,
                    name: shoeItem.name,
                };
            })
        );
        return shoeListMax;
    };
}
class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy
    }
    setStrategy(strategy) {
        this.strategy = strategy
    }
    async makeOrder(info) {
        await this.strategy.makeOrder(info)
    }
}
module.exports = {
    PaymentContext,
    PaymentOnline,
    PaymentDirect
}