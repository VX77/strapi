'use strict';

/**
 * Projhistorycat.js controller
 *
 * @description: A set of functions called "actions" for managing `Projhistorycat`.
 */

module.exports = {

  /**
   * Retrieve projhistorycat records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.projhistorycat.search(ctx.query);
    } else {
      return strapi.services.projhistorycat.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a projhistorycat record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.projhistorycat.fetch(ctx.params);
  },

  /**
   * Count projhistorycat records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.projhistorycat.count(ctx.query);
  },

  /**
   * Create a/an projhistorycat record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.projhistorycat.add(ctx.request.body);
  },

  /**
   * Create projhistorycat records.
   *
   * @return {Object}
   */

  createBulk: async (ctx) => {
    return strapi.services.projhistorycat.addBulk(ctx.request.body);
  },

  /**
   * Update a/an projhistorycat record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.projhistorycat.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an projhistorycat record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.projhistorycat.remove(ctx.params);
  }
};
