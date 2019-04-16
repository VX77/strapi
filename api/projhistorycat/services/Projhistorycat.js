/* global Projhistorycat */
'use strict';

/**
 * Projhistorycat.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

// Strapi utilities.
const utils = require('strapi-hook-bookshelf/lib/utils/');

// request code
const SUCCESS_CODE = 1;

const FAIL_CODE = 0;

module.exports = {

  /**
   * Promise to fetch all projhistorycats.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('projhistorycat', params);
    // Select field to populate.
    const populate = Projhistorycat.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    return Projhistorycat.query(function(qb) {
      _.forEach(filters.where, (where, key) => {
        if (_.isArray(where.value) && where.symbol !== 'IN' && where.symbol !== 'NOT IN') {
          for (const value in where.value) {
            qb[value ? 'where' : 'orWhere'](key, where.symbol, where.value[value]);
          }
        } else {
          qb.where(key, where.symbol, where.value);
        }
      });

      if (filters.sort) {
        qb.orderBy(filters.sort.key, filters.sort.order);
      }

      qb.offset(filters.start);
      qb.limit(filters.limit);
    }).fetchAll({
      withRelated: filters.populate || populate
    });
  },

  /**
   * Promise to fetch a/an projhistorycat.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Projhistorycat.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    return Projhistorycat.forge(_.pick(params, 'id')).fetch({
      withRelated: populate
    });
  },

  /**
   * Promise to count a/an projhistorycat.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('projhistorycat', params);

    return Projhistorycat.query(function(qb) {
      _.forEach(filters.where, (where, key) => {
        if (_.isArray(where.value)) {
          for (const value in where.value) {
            qb[value ? 'where' : 'orWhere'](key, where.symbol, where.value[value]);
          }
        } else {
          qb.where(key, where.symbol, where.value);
        }
      });
    }).count();
  },

  /**
   * Promise to add a/an projhistorycat.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Projhistorycat.associations.map(ast => ast.alias));
    const data = _.omit(values, Projhistorycat.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Projhistorycat.forge(data).save();

    // Create relational data and return the entry.
    return Projhistorycat.updateRelations({ id: entry.id , values: relations });
  },

  /**
  * Promise to add projhistorycats
  * (problem is if 3 records insert ok, 2 left unseccessful,how to deal that)
  * @return {Promise}
  */
  addBulk:  async (values) => {
    let obj = {
      'code': SUCCESS_CODE,
      'msg': 'create successfully'
    };
    let saveArr = [];
    for (let index=0;index < values.length; index++) {
      try {
        await module.exports.add(values[index]).then((val)=>{
          saveArr.push(val);
        });
      } catch (e) {
        obj.code = FAIL_CODE;
        obj.msg = 'create unsuccessfully';
        await module.exports.removeBulk(saveArr);
        return obj;
      }
    }
    return obj;
  },

  /**
   * Promise to edit a/an projhistorycat.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Projhistorycat.associations.map(ast => ast.alias));
    const data = _.omit(values, Projhistorycat.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = Projhistorycat.forge(params).save(data);

    // Create relational data and return the entry.
    return Projhistorycat.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an projhistorycat.
   *
   * @return {Promise}
   */

  remove: async (params) => {
    params.values = {};
    Projhistorycat.associations.map(association => {
      switch (association.nature) {
        case 'oneWay':
        case 'oneToOne':
        case 'manyToOne':
        case 'oneToManyMorph':
          params.values[association.alias] = null;
          break;
        case 'oneToMany':
        case 'manyToMany':
        case 'manyToManyMorph':
          params.values[association.alias] = [];
          break;
        default:
      }
    });

    await Projhistorycat.updateRelations(params);

    return Projhistorycat.forge(params).destroy();
  },
  /**
   * Promise to remove projhistorycats.
   *
   *
   */
  removeBulk: async (values) => {
    for (let val of values) {
      await module.exports.remove(val);
    }
    return;
  },

  /**
   * Promise to search a/an projhistorycat.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('projhistorycat', params);
    // Select field to populate.
    const populate = Projhistorycat.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const associations = Projhistorycat.associations.map(x => x.alias);
    const searchText = Object.keys(Projhistorycat._attributes)
      .filter(attribute => attribute !== Projhistorycat.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(Projhistorycat._attributes[attribute].type));

    const searchNoText = Object.keys(Projhistorycat._attributes)
      .filter(attribute => attribute !== Projhistorycat.primaryKey && !associations.includes(attribute))
      .filter(attribute => !['string', 'text', 'boolean', 'integer', 'decimal', 'float'].includes(Projhistorycat._attributes[attribute].type));

    const searchInt = Object.keys(Projhistorycat._attributes)
      .filter(attribute => attribute !== Projhistorycat.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(Projhistorycat._attributes[attribute].type));

    const searchBool = Object.keys(Projhistorycat._attributes)
      .filter(attribute => attribute !== Projhistorycat.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(Projhistorycat._attributes[attribute].type));

    const query = (params._q || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');

    return Projhistorycat.query(qb => {
      // Search in columns which are not text value.
      searchNoText.forEach(attribute => {
        qb.orWhereRaw(`LOWER(${attribute}) LIKE '%${_.toLower(query)}%'`);
      });

      if (!_.isNaN(_.toNumber(query))) {
        searchInt.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query)}`);
        });
      }

      if (query === 'true' || query === 'false') {
        searchBool.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query === 'true')}`);
        });
      }

      // Search in columns with text using index.
      switch (Projhistorycat.client) {
        case 'mysql':
          qb.orWhereRaw(`MATCH(${searchText.join(',')}) AGAINST(? IN BOOLEAN MODE)`, `*${query}*`);
          break;
        case 'pg': {
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector(${attribute})`
              : `to_tsvector('${attribute}')`
          );

          qb.orWhereRaw(`${searchQuery.join(' || ')} @@ to_tsquery(?)`, query);
          break;
        }
      }

      if (filters.sort) {
        qb.orderBy(filters.sort.key, filters.sort.order);
      }

      if (filters.skip) {
        qb.offset(_.toNumber(filters.skip));
      }

      if (filters.limit) {
        qb.limit(_.toNumber(filters.limit));
      }
    }).fetchAll({
      width: populate
    });
  }
};
