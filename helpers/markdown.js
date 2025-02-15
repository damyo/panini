var hljs = require('highlight.js');
var marked = require('marked');

/**
 * Handlebars block helper that converts Markdown to HTML.
 * The code blocks in the markdown are rendered with the syntax highlighting.
 * @param {object} options - Handlebars object.
 * @example
 * {{#markdown}}Welcome to [zombo.com](http://zombo.com){{/markdown}}
 * @returns The Markdown inside the helper, converted to HTML.
 */

 module.exports = function(options) {
   var renderer = new marked.Renderer();

   renderer.list = function(text, ordered) {
     if (!ordered) {
       return '<ul>' + text.replace(/<li>(<input(checked|[disabled="\s])+type="checkbox")/g, '<li class="task-item">$1') + '</ul>';
     }
     return '<ol>' + text + '</ol>'
   };

   renderer.paragraph = function(text) {
     return text.replace(/::: ?(info|warning|danger|success) ?([^\n]+)?\s?([\S\s]*?):::/g, '<div class="note $1"><p class="title" data-title="$1">$2</p><p>$3</p></div>');
   };

   renderer.code = function(code, language) {
     if (typeof language === 'undefined') return code;

     language = hljs.getLanguage(language) ? language : 'html';

     var renderedCode = hljs.highlight(code, { language }).value;
     var output = `<div class="code-example"><pre><code class="${language} hljs">${renderedCode.replace(/\n/g, '<br class="break-fixed">')}</code></pre></div>`;

     return output;
   };

   var result = marked(options.fn(this), { renderer });
   var source = result.match(/<script([\S\s]*?)>([\S\s]*?)<\/script>/);
   if (source) {
     result = result.replace(source[2], source[2].replace(/&#39;/g, "'").replace(/&#34;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<'));
   }

   return result;
 }
