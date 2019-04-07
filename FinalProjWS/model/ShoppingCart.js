class ShoppingCart {
    constructor() {
        this.items = [];

    }
    add(scloth) {
        let found = false;
        for (const item of this.items) {
            if (item.scloth._id == scloth._id) {
                found = true;
                ++item.qty
            }
        }
        if (!found) {
            this.items.push({scloth: scloth, qty: 1});
        }
    }

    serialize () {
        return this.items;
    }

    static deserialize(items) {
        const sc = new ShoppingCart();
        sc.items = items;
        return sc;
    }

    getQty(id) {
        for (const item of this.items) {
            if (item.scloth._id == id) {
                return item.qty;
            }
        }
        return 0;
    }

    getTotal(){
        let sum = 0;
        for (const item of this.items) {
            sum += item.qty * item.scloth.price;
        }
        return sum;
    }
}

module.exports = ShoppingCart;