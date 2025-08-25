class APIFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        //filtering
        //de-structure into an object having query fields (create a copy that is not referenced by the original query)
        const queryObj = {...this.queryString};
        const excludedFields = ['sort', 'page', 'limit', 'fields']; //these frield will be deleted from the query
        excludedFields.forEach(e => delete queryObj[e]); //delete the fields
        //advanced filtering
        let queryString = JSON.stringify(queryObj); //so we could replace, for example, gt by $gt
        queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/, op => `$${op}`);
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        return this;
    }

    limitFields() {
        //if only certain fields are requested
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v'); //don't show __v thing
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;
