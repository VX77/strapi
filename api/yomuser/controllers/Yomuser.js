'use strict';

/**
 * Yomuser.js controller
 *
 * @description: A set of functions called "actions" for managing `Yomuser`.
 */

module.exports = {

  /**
   * Retrieve yomuser records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.yomuser.search(ctx.query);
    } else {
      return strapi.services.yomuser.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a yomuser record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.yomuser.fetch(ctx.params);
  },

  /**
   * Count yomuser records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.yomuser.count(ctx.query);
  },

  /**
   * Create a/an yomuser record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.yomuser.add(ctx.request.body);
  },

  /**
   * Update a/an yomuser record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.yomuser.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an yomuser record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.yomuser.remove(ctx.params);
  }
};
