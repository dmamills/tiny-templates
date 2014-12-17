# tiny templates <img src="https://travis-ci.org/dmamills/tiny-templates.svg?branch=master"/>

a really simple templating lib

### usage

Just do something like this:

```
var render = require('tiny-templates')();
//or
var render = require('tiny-templates')(options);

var template = 'Hello my name is {{name}}';
var locals = {
	name:'dmamills'
};

//then
var renderedTemplate = render(template,locals);
console.log(renderedTemplate);
```

Can it really be that easy?

### api

options, there really aren't that many in life.

* `open_brace` defines the opening brace in your templates
* `close_brace` defines the closing brace in your templates

### license

do whatever you want whenever you want
