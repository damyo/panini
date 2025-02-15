/**
 * Adds built-in helpers to Panini's internal Handlebars instance.
 */
module.exports = function() {
  this.Handlebars.registerHelper('ifequal', require('../helpers/ifEqual'));
  this.Handlebars.registerHelper('markdown', require('../helpers/markdown'));
  this.Handlebars.registerHelper('repeat', require('../helpers/repeat'));
  this.Handlebars.registerHelper('code', require('../helpers/code'));
  this.Handlebars.registerHelper('lower', require('../helpers/lower'));
  this.Handlebars.registerHelper('upper', require('../helpers/upper'));
  this.Handlebars.registerHelper('slug', require('../helpers/slug'));
}
