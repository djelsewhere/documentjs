steal('steal',function(s){
	
	
var matches = {
 "(" : ")",
 "<" : ">",
 "{" : "}",
 "[" : "]"
},
    reverse = {},
    regStr = "";
for(var left in matches){
  regStr += "\\"+left+"\\"+matches[left]
  reverse[matches[left]] = left
}


var makeCounter = function(){
  var counters = {}
  for(var left in matches){
    counters[left] = 0
  }
  
  return {
    add: function(token){
      if(matches[token]){
        counters[token] ++
      } else {
         counters[reverse[token]]--
      }
    },
    allZero: function(){
      for(var left in counters){
        if(counters[left]){
          return false;
        }
      }
      return true;
    }
  }
  
}


return function(str, tokens, ignore){
	
	
	var reg = new RegExp("(["+regStr+"])"+(
		tokens? 
			"|"+tokens :
			"" )
		+(ignore? "|"+ignore : "")	
			
		,"g")
	
	var root = {
		children : []
	},
		stack = [root],
		match,
		currentIndex = 0,
		current = function(){
			return stack[stack.length-1]
		};
		
	reg.lastIndex  = 0;
	
	while(match = reg.exec(str)){
		// if we found something like (
		var prev = str.substring(currentIndex, reg.lastIndex - match[0].length );
		if(prev){
			current().children.push(prev)
		}
		
		if(match[3]) { // ignore matched
			
		} else if(!match[1]) { // not a nested
			current().children.push(match[0])
			
		} else if(matches[match[0]]) { // a nested
			var node = {
				type: match[0],
				children: [],
				start: reg.lastIndex - match[0].length
			};
			current().children.push(node);
			stack.push(node)
		} else if( reverse[match[0]] ) {
			var top = stack.pop()
			top.end = reg.lastIndex
		}
		currentIndex = reg.lastIndex
	}
	var last = str.substring(currentIndex);
	if(last){
		root.children.push(last)
	}
	return root.children;

}
	
	
	
})
