var halson = require('halson');
/**
 * BusinessesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index:  async function(req, res) {
        return res.ok('index 111');   
    },
    indexOne:  async function(req, res) {
        return res.ok('indexOne');
    },
    create:  async function(req, res) {
        return res.ok('cerated');
    },
    update:  async function(req, res) {
        return res.ok('updated');
    },
    destory:  async function(req, res) {
        return res.ok('destory');
    }  
};

