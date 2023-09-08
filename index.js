const qs = require("qs");

class StrapiEz {
  #baseURL; //store the Base URL
  #endPoint; //store the endpoint
  constructor() {
    this.tmpFilter = {}; //store the condition
    this.tmpObject = {}; //store the object
    this.tmpKey = {}; //store the key
    this.query = {
      filters: {},
    }; //store the query
  }

  /**
   * Set the base url for the query.
   * In case of using base url, the endpoint will be needed to the base url.
   *
   * @param {string} endpointPath The base URL to be set .
   * @returns {this}
   */
  baseURL(baseURL) {
    this.#baseURL = baseURL;
    return this;
  }

  /**
   * Set the base endpoint for the query.
   *
   * @param {string} endpointPath The endpoint to be set .
   * @returns {this}
   */
  endpoint(endpointPath) {
    this.#endPoint = endpointPath;
    return this;
  }

  /**
   * Queries can accept a `fields` parameter to select only some fields. By default, only the following types of fields are returned:
   *
   * `string` types: string, text, richtext, enumeration, email, password, and uid,
   *
   * `date` types: date, time, datetime, and timestamp,
   *
   * `number` types: integer, biginteger, float, and decimal,
   *
   * `generic` types: boolean, array, and JSON.
   *
   * Field selection does not work on relational, media, component, or dynamic zone fields.
   *
   * To populate these fields, use the populate parameter.
   *
   * @param  {...string} fields
   * @returns {this}
   */
  fields(...fields) {
    this.query.fields = fields;
    return this;
  }

  /**
   * Queries can accept a `populate` parameter to populate various field types
   * To populate children entries, populate from parent first.
   * @param  {...string} fields
   * @returns {this}
   */
  populate(...fields) {
    this.query.populate = fields;
    if (fields.length === 1) this.query.populate = fields[0];
    return this;
  }

  /**
   * Queries can accept a `publicationState` parameter to fetch entries based on their publication state:
   *
   * `live`: returns only published entries (default)
   *
   * `preview`: returns both draft entries & published entries
   *
   * @param {("live"|"preview")} publicationState
   * @returns {this}
   */
  state(publicationState = "live") {
    this.query.publicationState = publicationState;
    return this;
  }

  /**
   * Queries can accept a sort parameter that allows sorting on one or multiple fields.
   * The sorting order can be defined with:
   *
   * `:asc` for ascending order (default order, can be omitted)
   * or
   * `:desc` for descending order.
   *
   * example: `title:desc`
   *
   * @param  {...string} fields
   * @returns {this}
   */
  sort(...fields) {
    this.query.sort = fields;
    return this;
  }

  #condition(key = "$and", path) {
    if (!this.query.filters[key]) {
      this.query.filters[key] = [];
    }
    this.#clearFilters();

    this.tmpFilter = this.query.filters[key];
    let last = this.tmpObject;
    for (let index = 0; index < path.length; index++) {
      const element = path[index];

      last[element] = {};

      last = last[element];
    }
    this.tmpKey = last;

    return this;
  }

  /**
   * Joins the filters in an "and" expression
   *
   * @param  {...string} path
   * @returns {this}
   */
  and(...path) {
    return this.#condition("$and", path);
  }

  /**
   * Joins the filters in an "or" expression
   *
   * @param  {...string} path
   * @returns {this}
   */
  or(...path) {
    return this.#condition("$or", path);
  }

  /**
   * To paginate results by page, use the following parameters:
   *
   * @param {number} page Page number
   * @param {number} pageSize Page size
   * @param {boolean} withCount Adds the total numbers of entries and the number of pages to the response
   * @returns {this}
   */
  page(page = 1, pageSize = 25, withCount = true) {
    if (!this.query.pagination) {
      this.query.pagination = {};
    }

    this.query.pagination = {
      page,
      pageSize,
      withCount,
    };
    return this;
  }

  /**
   * To paginate results by offset, use the following parameters:
   *
   * @param {number} start Page number
   * @param {number} limit Page size
   * @param {boolean} withCount Adds the total numbers of entries and the number of pages to the response
   * @returns {this}
   */
  offset(start = 0, limit = 25, withCount = true) {
    if (!this.query.pagination) {
      this.query.pagination = {};
    }

    this.query.pagination = {
      start,
      limit,
      withCount,
    };
    return this;
  }

  #filter(key = "$eq", fields) {
    this.tmpKey[key] = fields;

    this.tmpFilter.push(this.tmpObject);
    this.#clearFilters();
    return this;
  }

  /**
   * Equal
   *
   * @param  {...string} fields
   * @returns {this}
   */
  eq(...fields) {
    return this.#filter("$eq", fields);
  }

  /**
   * Equal (case-insensitive)
   *
   * @param  {...string} fields
   * @returns {this}
   */
  eqi(...fields) {
    return this.#filter("$eqi", fields);
  }

  /**
   * Not equal
   *
   * @param  {...string} fields
   * @returns {this}
   */
  ne(...fields) {
    return this.#filter("$ne", fields);
  }

  /**
   * Less than
   *
   * @param  {...string} fields
   * @returns {this}
   */
  lt(...fields) {
    return this.#filter("$lt", fields);
  }

  /**
   * Less than or equal to
   *
   * @param  {...string} fields
   * @returns {this}
   */
  lte(...fields) {
    return this.#filter("$lte", fields);
  }

  /**
   * Greater than
   *
   * @param  {...string} fields
   * @returns {this}
   */
  gt(...fields) {
    return this.#filter("$gt", fields);
  }

  /**
   * Greater than or equal to
   *
   * @param  {...string} fields
   * @returns {this}
   */
  gte(...fields) {
    return this.#filter("$gte", fields);
  }

  /**
   * Included in fields
   *
   * @param  {...string} fields
   * @returns {this}
   */
  in(...fields) {
    return this.#filter("$in", fields);
  }

  /**
   * Not included in fields
   *
   * @param  {...string} fields
   * @returns {this}
   */
  notIn(...fields) {
    return this.#filter("$notIn", fields);
  }

  /**
   * Contains
   *
   * @param  {...string} fields
   * @returns {this}
   */
  contains(...fields) {
    return this.#filter("$contains", fields);
  }

  /**
   * Does not contain
   *
   * @param  {...string} fields
   * @returns {this}
   */
  notContains(...fields) {
    return this.#filter("$notContains", fields);
  }

  /**
   * Contains (case-insensitive)
   *
   * @param  {...string} fields
   * @returns {this}
   */
  containsi(...fields) {
    return this.#filter("$containsi", fields);
  }

  /**
   * Does not contain (case-insensitive)
   *
   * @param  {...string} fields
   * @returns {this}
   */
  notContainsi(...fields) {
    return this.#filter("$notContainsi", fields);
  }

  /**
   * Is null
   *
   * @param  {...string} fields
   * @returns {this}
   */
  null(...fields) {
    return this.#filter("$null", fields);
  }

  /**
   * Is not null
   *
   * @param  {...string} fields
   * @returns {this}
   */
  notNull(...fields) {
    return this.#filter("$notNull", fields);
  }

  /**
   * Is between
   *
   * @param  {...string} fields
   * @returns {this}
   */
  between(...fields) {
    return this.#filter("$between", fields);
  }

  /**
   * Starts with
   *
   * @param  {...string} fields
   * @returns {this}
   */
  startsWith(...fields) {
    return this.#filter("$startsWith", fields);
  }

  /**
   * Starts with (case-insensitive)
   *
   * @param  {...string} fields
   * @returns {this}
   */
  startsWithi(...fields) {
    return this.#filter("$startsWithi", fields);
  }

  /**
   * Ends with
   *
   * @param  {...string} fields
   * @returns {this}
   */
  endsWith(...fields) {
    return this.#filter("$endsWith", fields);
  }

  /**
   * Ends with (case-insensitive)
   *
   * @param  {...string} fields
   * @returns {this}
   */
  endsWithi(...fields) {
    return this.#filter("$endsWithi", fields);
  }

  #clearFilters() {
    this.tmpKey = {};
    this.tmpFilter = {};
    this.tmpObject = {};
  }

  /**
   * Get query string
   *
   * @returns {string}
   */
  get() {
    const queryString = qs.stringify(this.query, {
      encodeValuesOnly: true, // prettify URL
    });
    if (typeof this.#endPoint === "undefined") return queryString; // if endpoint is not set, return only query string.To use base url, endpoint must be set.
    if (typeof this.#baseURL !== "undefined")
      return `${this.#baseURL}${!this.#baseURL.includes("api") ? "/api" : ""}/${
        this.#endPoint
      }?${queryString}`; // Return base url + endpoint + query string.(full URL)

    return `${this.#endPoint}?${queryString}`; // Return endpoint + query string.(full endpoint)
  }
}

module.exports = StrapiEz;
