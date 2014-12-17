var should = require('should');
var mocha = require('mocha');
var templates = require('./../lib/render');

describe('render',function() {

	it('templates should return a function',function() {
		var render = templates();
		render.should.be.type('function');
	})

	it('render should allow strings',function() {
		var render = templates();
		var testTemplates = [
			'this package is {{name}}',
			'this package is {{name}} and its made by {{author}}',
			'this package is {{name}} and its made by {{author}} for {{verbage}}'
		];
		var locals = { 
			name:'tiny-templates',
			author:'dmamills',
			verbage:'funfunfun'
		};

		var expectedResults = [
			'this package is tiny-templates',
			'this package is tiny-templates and its made by dmamills',
			'this package is tiny-templates and its made by dmamills for funfunfun'

		];

		for(var i =0; i <testTemplates.length;i++) {
			var template = testTemplates[i];
			render(template,locals).should.equal(expectedResults[i]);
		}
	});

	it('render should allow numbers',function() {
		var render = templates();
		var template = 'node is currently {{age}} years old!';
		var locals = { age:5 }
		render(template,locals).should.equal('node is currently 5 years old!');
	});

	it('should not allow arrays',function() {
		var render = templates();
		var template = 'this will {{fail}}'
		var locals = {fail:[1,2,3,4]};

		(function(){
			render(template,locals)
		}).should.throw();

	});

	it('should throw when local not found',function() {
		var render = templates();
		var template = 'this has no {{name}}'
		var locals = {};

		(function(){
			render(template,locals)
		}).should.throw();

	});

	it('should not allow functions in locals',function() {
		var render = templates();
		var template = 'this will {{fail}}'
		var locals = {fail:function(){ return 'faaail';}};

		(function(){
			render(template,locals)
		}).should.throw();

	});

	it('should allow custom braces',function() {
		var opts = {
			open_brace:"--",
			close_brace:"--"
		};
		var render = templates(opts);
		var template = 'hello my name is --name--';
		var locals = { name:'tiny-templates' }
		render(template,locals).should.equal('hello my name is tiny-templates');

	});

});
