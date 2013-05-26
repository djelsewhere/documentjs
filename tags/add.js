steal(function(){
	/**
	 * @constructor documentjs/tags/add @add 
	 * @parent DocumentJS
	 * 
	 * Sets a [DocObject] as the 
	 * current scope. [documentjs/tags/function Functions]
	 * or [documentjs/tags/property properties] created
	 * without a name will use their code block and
	 * the scope to guess the name.
	 * 
	 * 
	 * @signature `@add NAME`
	 * 
	 * @codestart
	 * /** @@add lib.Component.prototype *|
	 * lib.extend(lib.Component.prototype,{
	 *   /**
	 *    *  A plugin method on [lib.Component]
	 *    *|
	 *   plugin: function(){}
	 * })
	 * @codeend
	 * 
	 * @param {STRING} NAME the name of [DocObject]
	 * to set as the scope.
	 * 
	 * @body
	 * 
	 * 
	 */
	return {
		add: function(line, curData, scope, docMap){
			
			var name = line.match(/\s*@add\s*([^\s]+)/)[1]
			if(name){
				var docObject = docMap[name] ?
					docMap[name] :
					docMap[name] = {name: name};
				return ["scope",docObject]
			}
		}
	}
})