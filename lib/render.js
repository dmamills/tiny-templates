
function templates(options) {
	options = options || {};

	if(!options.open_brace) options.open_brace = '{{';
	if(!options.close_brace) options.close_brace = '}}';

	var TEMPLATE_REGEX = new RegExp(options.open_brace + '[a-zA-Z]+' + options.close_brace,['g']);

	return function(template,locals) {
		
		for(var k in locals) {
			if(typeof locals[k] !== 'string' && typeof locals[k] !== 'number') {
				throw new Error('Strings & numbers only please, failed on: ' + k);
			}
		}

		var res;
		while(res = TEMPLATE_REGEX.exec(template)){
			var t = res[0];
			var rt = new RegExp(t,['g']);
			var name = t.substr(2,t.length-4);

			if(!locals[name]) {
				throw new Error('Variable ' + t + ' not found in locals');
			}
			
			template = template.replace(rt,locals[name]);

			//RegExp are stateful, reset last index
			TEMPLATE_REGEX.lastIndex = 0;
		}

		return template;
	}
}

module.exports = templates;
