'use strict';

/**
 * Catconfig.js controller
 *
 * @description: A set of functions called "actions" for managing `Catconfig`.
 */

module.exports = {

  /**
   * Retrieve catconfig records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.catconfig.search(ctx.query);
    } else {
      return strapi.services.catconfig.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a catconfig record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.catconfig.fetch(ctx.params);
  },

  /**
   * Count catconfig records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.catconfig.count(ctx.query);
  },

  /**
   * Create a/an catconfig record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.catconfig.add(ctx.request.body);
  },

  /**
   * Update a/an catconfig record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.catconfig.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an catconfig record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.catconfig.remove(ctx.params);
  }
};
