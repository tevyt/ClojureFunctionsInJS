//Returns the first element of a seq
function first(collection){
	return collection[0];
}

//Example: 
//first([1, 2, 3]) => 1

//Returns a collection with the first element removed
function rest(collection){
	return collection.slice(1, collection.length);
}
//Example:
//rest([1, 2, 3]) => [2, 3]

//Predicate function takes a collection
//Returns true if the collection is empty.
function empty(collection){
	return !collection.length;
}
//Example:
//empty([]) => true
//empty([1, 2, 3]) => false

//Applies a function(fun) to each element of a collection
//Returns a new collection that contains the result of each application
function map(fun, collection){
	var helper = function(final, remainder){
		if(empty(remainder)){
			return final;
		}
		else{
			var top = first(remainder);

			return helper(final.concat([fun(top)]), rest(remainder));
		}
	}
	return helper([], collection);
}
//Example:
//function double(x){
// return x * 2;	
//}
//map(double, [1, 2, 3]) => [2, 4, 6]

//Returns a collection containing only the elements that match a given predicate function
function filter(predicate, collection){
	var helper = function(final, remainder){
		if(empty(remainder)){
			return final;
		}
		else{
			var top = first(remainder);
			if(predicate(top)){
				return helper(final.concat([top]), rest(remainder));
			}
			else{
				return helper(final, rest(remainder));
			}
		}
	}
	return helper([], collection);
}
//Example:
//function even(x){
//	return x % 2 == 0
//}
//filter(even, [1, 2, 3]) => [2]

//Iterate over the elements in a collection and build a final result.
function reduce(fun, init, collection){
	if(empty(collection)){
		return init;
	}
	else{
		var top = first(collection);
		return reduce(fun, fun(init, top), rest(collection));
	}
}
//Example:
//function sum(x, y){
//    return +x + +y;	
//}
//reduce(sum, 0, [1, 2, 3]) => 6
//Had to cheat with the +x and +y because JavaScript converts the rest operator arguments(...) to strings 

//Returns a function that returns the opposite of the predicate, when given the same arguments
function complement(predicate){
	return function(...args){
		return !predicate(args);
	}
}
//Example:
//function even(x){
//	return x % 2 == 0
//}
//
//var odd = predicate(even);
//even(10) => true
//odd(10) => false
//
//even(3) => false
//odd(3) => true

//Takes a function and some arguments
//Returns a function that applies the initial function to the initial argument + more arguments
function partial(fun, ...args){
	return function(...more){
		return fun(args, more);
	}
}
//Example:
//function sum(x, y){
//    return x + y;
//}
//
//var add10 = partial(sum, 10);
//add10(3) => 13
//add10(5) => 15