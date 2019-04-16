'use strict';

/**
 * Projtype.js controller
 *
 * @description: A set of functions called "actions" for managing `Projtype`.
 */

module.exports = {

  /**
   * Retrieve projtype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.projtype.search(ctx.query);
    } else {
      return strapi.services.projtype.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a projtype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.projtype.fetch(ctx.params);
  },

  /**
   * Count projtype records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.projtype.count(ctx.query);
  },

  /**
   * Create a/an projtype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.projtype.add(ctx.request.body);
  },

  /**
   * Update a/an projtype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.projtype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an projtype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.projtype.remove(ctx.params);
  }
};
