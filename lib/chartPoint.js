

class chartPoint {

    constructor({ label, x, y, options = {} }) {
        if (x == undefined || y == undefined) {
            throw new Error('At least point.x and point.y have to be defined');
        }
        this.label = label;
        this.x = x;
        this.y = y;
        this.value = y;
        this.options = options;
    }
}

module.exports = chartPoint;