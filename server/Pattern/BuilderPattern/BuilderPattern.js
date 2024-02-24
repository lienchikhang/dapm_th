class shoeBuilder {
    constructor() {
        this.size = []
        this.name = ''
        this.price = 0
        this.img = ''
        this.desc = ''
        this.color = ''
        this.type = ''
    }
    setSize = (size) => {
        this.size = size
        return this
    }
    setName = (name) => {
        this.name = name
        return this
    }
    setPrice = (price) => {
        this.price = price
        return this
    }
    setImg = (img) => {
        this.img = img
        return this
    }
    setDesc = (desc) => {
        this.desc = desc
        return this
    }
    setColor = (color) => {
        this.color = color
        return this
    }
    setType = (type) => {
        this.type = type
        return this
    }
    builder = () => {
        return {
            size: this.size,
            name: this.name,
            price: this.price,
            img: this.img,
            desc: this.desc,
            color: this.color,
            type: this.type
        }
    }
}
module.exports = { shoeBuilder }