const moment = require('moment');
const chartPoint = require('./chartPoint');
const _ = require('lodash');
//See clips data object for charts for def

/**
 * 
 *
 * @class chartSerie
 */
class chartSerie {
    // Members definition
    constructor({
        name = '',
        type = '',
        opts = {}
    }) {
        if (name == '') throw new Error('Missing name');
        this.name = name;
        this.type = type;
        this.opts = opts;
        this.data = [];
        this.points = [];
        this.cumulatedTotal = 0;
        this.defaultdateFormat = 'YYYY-MM-DD';
        this.format = this.opts.dateFormat ? this.opts.dateFormat : this.defaultdateFormat;

    }

    /**
     *
     *
     * @param {*} [dataPoint={}]
     * @memberof chartSerie
     */
    setDataPoint(dataPoint = {}) {
        //this._setDataPoint(dataPoint);
        this.points.push(new chartPoint(dataPoint));
    }

    // EndPOINT !
    /**
     *
     *
     * @returns
     * @memberof chartSerie
     */
    get() {
        this._preparePoints();
        if (this.opts.fillNullDateValues) {
            this._fillMissingValues(this.points)
        }
        if (this.opts.sort) {
            this._chartSort(this.opts.order, this.opts.direction)
        }
        // TODO
        if (this._isCumulative()) {
            this._cumulate();
        }

        if (this._isGrouped()) {
            this.points = this._group_by_label();
        }
        return this;
    }

    /**
     *
     *
     * @memberof chartSerie
     */
    _preparePoints() {
        let output = {};
        let point = {};
        for (point of this.points) {
            // If label is not defined, label = x
            // If x is a javascript date, we convert it to moment
            if (point.x instanceof Date || point.x._isAMomentObject) {
                this.type == undefined ? "date" : this.type;
                point.x = moment(point.x);
                if (point.label == undefined) {
                    // Label is date formatted
                    point.label = point.x.format(this.format);
                }
            }

            if (point.label == undefined) point.label = point.x;
            // If sort tyoe is date, point.x has to be a date
            if (this._isGrouped() || this._isCumulative()) {
                output[point.label] += point.y
                    ? point.y
                    : 0;
            }
        }
        for (let point in this.points) {
            for (let label in output) {
                if (point.label == label) {
                    point.y = output[label];
                }
            }
        }
    }


    /**
     *
     *
     * @returns boolean
     * @memberof chartSerie
     */
    _isCumulative() {
        if (this.opts.cumulative)
            return true;
        else
            return false;
    }

    /**
     *
     *
     * @returns boolean
     * @memberof chartSerie
     */
    _isGrouped() {
        if (this.opts.grouped)
            return true;
        else
            return false;
    }

    _cumulate() {
        let totalGen = 0;
        for (let point of this.points) {
            point.y += totalGen;
            totalGen = point.y;
        }
    }


    _group_by_label() {
        var by_label = _.groupBy(this.points, 'label');
        return Object.keys(by_label).map(key => {
            if (by_label[key].length == 1) return by_label[key][0];
            else {
                let s = 0;
                let opts = {};
                by_label[key].forEach(p => {
                    s += p.y;
                    opts = _.merge(opts, s.options)
                })
                // Take first value as sample
                // Merges options
                return new chartPoint({
                    x: by_label[key][0]['x'],
                    label: by_label[key][0]['label'],
                    y: s,
                    value: s,
                    options: opts
                })
            }
        })
    }


    // Add missing values if series has dates as x
    _fillMissingValues() {
        let minMax = this._getMinMax(this.points);
        var m = minMax.min.clone();
        while (m.isSameOrBefore(minMax.max)) {
            let n = m.clone()
            let mForm = n.format(this.format);
            if (!this._point_exists(mForm)) {
                this.setDataPoint({
                    x: n,
                    label: mForm,
                    y: 0
                })
            }
            m.add(1, 'days')
        }
    }

    _point_exists(mForm) {
        for (let point of this.points) {
            if (point.label == mForm) return true;
        }
        return false;
    }

    _getMinMax(points) {
        let min = moment();
        let max = 0;
        for (let point of points) {
            let date = point.x
            if (date < min)
                min = date;
            if (date > max)
                max = date;
        }
        return { min: min, max: max };
    }

    _chartSort(order = '', direction = 'ASC') {
        direction = direction ? direction : 'ASC';
        if (order == 'alpha' || order == '') {
            this.points.sort((a, b) => {
                if (direction == 'ASC')
                    return a.x > b.x ? 1 : -1;
                else if (direction == 'DESC')
                    return a.x < b.x ? 1 : -1;
            }
            )
        } else if (_.isArray(order)) {
            if (direction == 'ASC')
                this.points.sort((a, b) => (order.indexOf(a.x) > order.indexOf(b.x))
                    ? 1
                    : -1)
            else if (direction == 'DESC')
                this.points.sort((a, b) => (order.indexOf(a.x) > order.indexOf(b.x))
                    ? -1
                    : 1)
        } else if (order == 'date') {
            if (direction == 'ASC')
                this.points.sort((a, b) => (a.x > b.x)
                    ? 1
                    : -1)
            else if (direction == 'DESC')
                this.points.sort((a, b) => (a.x > b.x)
                    ? -1
                    : 1)
        }
    }

}

module.exports = chartSerie;