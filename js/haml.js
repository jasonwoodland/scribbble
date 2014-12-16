//     Underscore.js 1.1.6
//     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _;
    _._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.1.6';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects implementing `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (_.isNumber(obj.length)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = memo !== void 0;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial && index === 0) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError("Reduce of empty array with no initial value");
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
    return _.reduce(reversed, iterator, memo, context);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result = iterator.call(context, value, index, list)) return breaker;
    });
    return result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    any(obj, function(value) {
      if (found = value === target) return true;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (method.call ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return iterable;
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Get the last element of an array.
  _.last = function(array) {
    return array[array.length - 1];
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(_.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    var values = slice.call(arguments, 1);
    return _.filter(array, function(value){ return !_.include(values, value); });
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted) {
    return _.reduce(array, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) memo[memo.length] = el;
      return memo;
    }, []);
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
    return -1;
  };


  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function(func, obj) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(obj, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Internal function used to implement `_.throttle` and `_.debounce`.
  var limit = function(func, wait, debounce) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args);
      };
      if (debounce) clearTimeout(timeout);
      if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    return limit(func, wait, false);
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    return limit(func, wait, true);
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = slice.call(arguments);
    return function() {
      var args = slice.call(arguments);
      for (var i=funcs.length-1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };


  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    return _.filter(_.keys(obj), function(key){ return _.isFunction(obj[key]); }).sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    // Check object identity.
    if (a === b) return true;
    // Different types?
    var atype = typeof(a), btype = typeof(b);
    if (atype != btype) return false;
    // Basic equality test (watch out for coercions).
    if (a == b) return true;
    // One is falsy and the other truthy.
    if ((!a && b) || (a && !b)) return false;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // One of them implements an isEqual()?
    if (a.isEqual) return a.isEqual(b);
    // Check dates' integer values.
    if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
    // Both are NaN?
    if (_.isNaN(a) && _.isNaN(b)) return false;
    // Compare regular expressions.
    if (_.isRegExp(a) && _.isRegExp(b))
      return a.source     === b.source &&
             a.global     === b.global &&
             a.ignoreCase === b.ignoreCase &&
             a.multiline  === b.multiline;
    // If a is not an object by this point, we can't handle it.
    if (atype !== 'object') return false;
    // Check for different array lengths before comparing contents.
    if (a.length && (a.length !== b.length)) return false;
    // Nothing else worked, deep compare the contents.
    var aKeys = _.keys(a), bKeys = _.keys(b);
    // Different object sizes?
    if (aKeys.length != bKeys.length) return false;
    // Recursive comparison of contents.
    for (var key in a) if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
    return true;
  };

  // Is a given array or object empty?
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  };

  // Is a given value a function?
  _.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
  };

  // Is the given value `NaN`? `NaN` happens to be the only value in JavaScript
  // that does not equal itself.
  _.isNaN = function(obj) {
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : func;
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

})();



//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.3.0'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    amp: '&'
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars){ reversedEscapeChars[escapeChars[key]] = key; }

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.3.0',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;
      return String(str).split(substr).length - 1;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      return String(str).replace(/(?:^|\s)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c.toUpperCase(); });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(String(str).replace(/_/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (str == null || str == '') return 0;
      str = String(str);
      var num = parseNumber(parseNumber(str).toFixed(~~decimals));
      return num === 0 && !str.match(/^0+$/) ? Number.NaN : num;
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = tsep || ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', '
      lastSeparator = lastSeparator || ' and '
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",
          to    = "aaaaaaaaceeeeeiiiilnoooooouuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str) {
      return _s.surround(str, '"');
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      // Export module
      module.exports = _s;
    }
    exports._s = _s;

  } else if (typeof define === 'function' && define.amd) {
    // Register as a named module with AMD.
    define('underscore.string', [], function() {
      return _s;
    });

  } else {
    // Integrate with Underscore.js if defined
    // or create our own underscore object.
    root._ = root._ || {};
    root._.string = root._.str = _s;
  }

}(this, String);



// Generated by CoffeeScript 1.6.2
/*
  clientside HAML compiler for Javascript and Coffeescript (Version 5)

  Copyright 2011-12, Ronald Holshausen (https://github.com/uglyog)
  Released under the MIT License (http://www.opensource.org/licenses/MIT)
*/(function(){var e,t,n,r,i,s,o,u,a,f,l,c={}.hasOwnProperty,h=function(e,t){function r(){this.constructor=e}for(var n in t)c.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};f=this,r={escapeHTML:function(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},perserveWhitespace:function(e){var t,n,r,i;r=/<[a-zA-Z]+>[^<]*<\/[a-zA-Z]+>/g,n="",t=0,i=r.exec(e);if(i){while(i)n+=e.substring(t,i.index),n+=i[0].replace(/\n/g,"&#x000A;"),t=i.index+i[0].length,i=r.exec(e);n+=e.substring(t)}else n=e;return n},templateError:function(e,t,n,r){var i,s;s=r+" at line "+e+" and character "+t+":\n"+n+"\n",i=0;while(i<t-1)s+="-",i++;return s+="^",s},generateElementAttributes:function(e,t,n,r,i,s,o,u,f,l){var h,p,d,v,m,g,y,b,w,E;l==null&&(l=this._raiseError),p={},p=this.combineAttributes(p,"id",t),n.length>0&&n[0].length>0&&(p=this.combineAttributes(p,"class",n));if(i!=null)for(h in i){if(!c.call(i,h))continue;E=i[h],p=this.combineAttributes(p,h,E)}if(r!=null)try{b=r.call(e,e),b!=null&&(w=null,b.id!=null?w=b.id:b.get&&(w=b.get("id")),p=this.combineAttributes(p,"id",w),d=null,b["class"]?d=b["class"]:b.get&&(d=b.get("class")),p=this.combineAttributes(p,"class",d))}catch(S){v=S,l(a.HamlRuntime.templateError(o,u,f,"Error evaluating object reference - "+v))}if(s!=null)try{g=s.call(e,e);if(g!=null){g=this._flattenHash(null,g);for(h in g){if(!c.call(g,h))continue;E=g[h],p=this.combineAttributes(p,h,E)}}}catch(S){m=S,l(a.HamlRuntime.templateError(o,u,f,"Error evaluating attribute hash - "+m))}y="";if(p)for(h in p){if(!c.call(p,h))continue;a.hasValue(p[h])&&((h==="id"||h==="for")&&p[h]instanceof Array?y+=" "+h+'="'+_(p[h]).flatten().join("-")+'"':h==="class"&&p[h]instanceof Array?y+=" "+h+'="'+_(p[h]).flatten().join(" ")+'"':y+=" "+h+'="'+a.attrValue(h,p[h])+'"')}return y},indentText:function(e){var t,n;n="",t=0;while(t<e)n+="  ",t++;return n},combineAttributes:function(e,t,n){var r;return a.hasValue(n)&&(t==="id"&&n.toString().length>0?e&&e.id instanceof Array?e.id.unshift(n):e&&e.id?e.id=[e.id,n]:e?e.id=n:e={id:n}:t==="for"&&n.toString().length>0?e&&e["for"]instanceof Array?e["for"].unshift(n):e&&e["for"]?e["for"]=[e["for"],n]:e?e["for"]=n:e={"for":n}:t==="class"?(r=[],n instanceof Array?r=r.concat(n):r.push(n),e&&e["class"]?e["class"]=e["class"].concat(r):e?e["class"]=r:e={"class":r}):t!=="id"&&(e||(e={}),e[t]=n)),e},_flattenHash:function(e,t){var n,r,i,s,o,u,a,f;a={};if(this._isHash(t))for(n in t){if(!c.call(t,n))continue;f=t[n],s=[],e!=null&&s.push(e),s.push(n),i=s.join("-"),r=this._flattenHash(i,f);if(this._isHash(r))for(o in r){if(!c.call(r,o))continue;u=r[o],a[o]=u}else a[i]=r}else e!=null?a[e]=t:a=t;return a},_isHash:function(e){return e!=null&&typeof e=="object"&&!(e instanceof Array||e instanceof Date)},_logError:function(e){return typeof console!="undefined"&&console!==null?console.log(e):void 0},_raiseError:function(e){throw new Error(e)},trim:function(e,t){return e.substring(t)}},o=function(){function e(e){var t,n,r,i=this;this.buffer=null,this.bufferIndex=null,this.prevToken=null,this.token=null;if(e.templateId!=null){r=document.getElementById(e.templateId);if(!r)throw"Did not find a template with ID '"+e.templateId+"'";this.buffer=r.text,this.bufferIndex=0}else e.template!=null?(this.buffer=e.template,this.bufferIndex=0):e.templateUrl!=null&&(t=function(t,n,r){throw"Failed to fetch haml template at URL "+e.templateUrl+": "+n+" "+r},n=function(e){return i.buffer=e,i.bufferIndex=0},jQuery.ajax({url:e.templateUrl,success:n,error:t,dataType:"text",async:!1,beforeSend:function(e){return e.withCredentials=!0}}))}return e.prototype.currentLineMatcher=/[^\n]*/g,e.prototype.tokenMatchers={whitespace:/[ \t]+/g,element:/%[a-zA-Z][a-zA-Z0-9]*/g,idSelector:/#[a-zA-Z_\-][a-zA-Z0-9_\-]*/g,classSelector:/\.[a-zA-Z0-9_\-]+/g,identifier:/[a-zA-Z][a-zA-Z0-9\-]*/g,quotedString:/[\'][^\'\n]*[\']/g,quotedString2:/[\"][^\"\n]*[\"]/g,comment:/\-#/g,escapeHtml:/\&=/g,unescapeHtml:/\!=/g,objectReference:/\[[a-zA-Z_@][a-zA-Z0-9_]*\]/g,doctype:/!!!/g,continueLine:/\|\s*\n/g,filter:/:\w+/g},e.prototype.matchToken=function(e){var t;e.lastIndex=this.bufferIndex,t=e.exec(this.buffer);if((t!=null?t.index:void 0)===this.bufferIndex)return t[0]},e.prototype.matchMultiCharToken=function(e,t,n){var r,i;if(!this.token){r=this.matchToken(e);if(r)return this.token=t,this.token.tokenString=(i=typeof n==="function"?n(r):void 0)!=null?i:r,this.token.matched=r,this.advanceCharsInBuffer(r.length)}},e.prototype.matchSingleCharToken=function(e,t){if(!this.token&&this.buffer.charAt(this.bufferIndex)===e)return this.token=t,this.token.tokenString=e,this.token.matched=e,this.advanceCharsInBuffer(1)},e.prototype.getNextToken=function(){var e,t,n;if(isNaN(this.bufferIndex))throw a.HamlRuntime.templateError(this.lineNumber,this.characterNumber,this.currentLine,"An internal parser error has occurred in the HAML parser");this.prevToken=this.token,this.token=null;if(this.buffer===null||this.buffer.length===this.bufferIndex)this.token={eof:!0,token:"EOF"};else{this.initLine();if(!this.token){e=this.buffer.charCodeAt(this.bufferIndex),t=this.buffer.charCodeAt(this.bufferIndex+1);if(e===10||e===13&&t===10)this.token={eol:!0,token:"EOL"},e===13&&t===10?(this.advanceCharsInBuffer(2),this.token.matched=String.fromCharCode(e)+String.fromCharCode(t)):(this.advanceCharsInBuffer(1),this.token.matched=String.fromCharCode(e)),this.characterNumber=0,this.currentLine=this.getCurrentLine()}this.matchMultiCharToken(this.tokenMatchers.whitespace,{ws:!0,token:"WS"}),this.matchMultiCharToken(this.tokenMatchers.continueLine,{continueLine:!0,token:"CONTINUELINE"}),this.matchMultiCharToken(this.tokenMatchers.element,{element:!0,token:"ELEMENT"},function(e){return e.substring(1)}),this.matchMultiCharToken(this.tokenMatchers.idSelector,{idSelector:!0,token:"ID"},function(e){return e.substring(1)}),this.matchMultiCharToken(this.tokenMatchers.classSelector,{classSelector:!0,token:"CLASS"},function(e){return e.substring(1)}),this.matchMultiCharToken(this.tokenMatchers.identifier,{identifier:!0,token:"IDENTIFIER"}),this.matchMultiCharToken(this.tokenMatchers.doctype,{doctype:!0,token:"DOCTYPE"}),this.matchMultiCharToken(this.tokenMatchers.filter,{filter:!0,token:"FILTER"},function(e){return e.substring(1)}),this.token||(n=this.matchToken(this.tokenMatchers.quotedString),n||(n=this.matchToken(this.tokenMatchers.quotedString2)),n&&(this.token={string:!0,token:"STRING",tokenString:n.substring(1,n.length-1),matched:n},this.advanceCharsInBuffer(n.length))),this.matchMultiCharToken(this.tokenMatchers.comment,{comment:!0,token:"COMMENT"}),this.matchMultiCharToken(this.tokenMatchers.escapeHtml,{escapeHtml:!0,token:"ESCAPEHTML"}),this.matchMultiCharToken(this.tokenMatchers.unescapeHtml,{unescapeHtml:!0,token:"UNESCAPEHTML"}),this.matchMultiCharToken(this.tokenMatchers.objectReference,{objectReference:!0,token:"OBJECTREFERENCE"},function(e){return e.substring(1,e.length-1)}),!this.token&&this.buffer&&this.buffer.charAt(this.bufferIndex)==="{"&&this.matchJavascriptHash(),this.matchSingleCharToken("(",{openBracket:!0,token:"OPENBRACKET"}),this.matchSingleCharToken(")",{closeBracket:!0,token:"CLOSEBRACKET"}),this.matchSingleCharToken("=",{equal:!0,token:"EQUAL"}),this.matchSingleCharToken("/",{slash:!0,token:"SLASH"}),this.matchSingleCharToken("!",{exclamation:!0,token:"EXCLAMATION"}),this.matchSingleCharToken("-",{minus:!0,token:"MINUS"}),this.matchSingleCharToken("&",{amp:!0,token:"AMP"}),this.matchSingleCharToken("<",{lt:!0,token:"LT"}),this.matchSingleCharToken(">",{gt:!0,token:"GT"}),this.matchSingleCharToken("~",{tilde:!0,token:"TILDE"}),this.token===null&&(this.token={unknown:!0,token:"UNKNOWN",matched:this.buffer.charAt(this.bufferIndex)},this.advanceCharsInBuffer(1))}return this.token},e.prototype.lookAhead=function(e){var t,n,r,i,s,o,u,a;a=null;if(e>0){i=this.token,u=this.prevToken,r=this.currentLine,o=this.lineNumber,n=this.characterNumber,t=this.bufferIndex,s=0;while(s++<e)a=this.getNextToken();this.token=i,this.prevToken=u,this.currentLine=r,this.lineNumber=o,this.characterNumber=n,this.bufferIndex=t}return a},e.prototype.initLine=function(){if(!this.currentLine&&this.currentLine!=="")return this.currentLine=this.getCurrentLine(),this.lineNumber=1,this.characterNumber=0},e.prototype.getCurrentLine=function(e){var t;return this.currentLineMatcher.lastIndex=this.bufferIndex+(e!=null?e:0),t=this.currentLineMatcher.exec(this.buffer),t?t[0]:""},e.prototype.parseError=function(e){return a.HamlRuntime.templateError(this.lineNumber,this.characterNumber,this.currentLine,e)},e.prototype.skipToEOLorEOF=function(){var e,t,n;return n="",!this.token.eof&&!this.token.eol&&(this.token.matched!=null&&(n+=this.token.matched),this.currentLineMatcher.lastIndex=this.bufferIndex,t=this.currentLineMatcher.exec(this.buffer),t&&t.index===this.bufferIndex&&(e=(_.str||_).rtrim(t[0]),(_.str||_).endsWith(e,"|")?(n+=e.substring(0,e.length-1),this.advanceCharsInBuffer(e.length-1),this.getNextToken(),n+=this.parseMultiLine()):(n+=t[0],this.advanceCharsInBuffer(t[0].length),this.getNextToken()))),n},e.prototype.parseMultiLine=function(){var e,t,n;n="";while(this.token.continueLine)this.currentLineMatcher.lastIndex=this.bufferIndex,t=this.currentLineMatcher.exec(this.buffer),t&&t.index===this.bufferIndex&&(e=(_.str||_).rtrim(t[0]),(_.str||_).endsWith(e,"|")&&(n+=e.substring(0,e.length-1),this.advanceCharsInBuffer(e.length-1)),this.getNextToken());return n},e.prototype.advanceCharsInBuffer=function(e){var t,n,r;r=0;while(r<e)t=this.buffer.charCodeAt(this.bufferIndex+r),n=this.buffer.charCodeAt(this.bufferIndex+r+1),t===13&&n===10?(this.lineNumber++,this.characterNumber=0,this.currentLine=this.getCurrentLine(r),r++):t===10?(this.lineNumber++,this.characterNumber=0,this.currentLine=this.getCurrentLine(r)):this.characterNumber++,r++;return this.bufferIndex+=e},e.prototype.currentParsePoint=function(){return{lineNumber:this.lineNumber,characterNumber:this.characterNumber,currentLine:this.currentLine}},e.prototype.pushBackToken=function(){if(!this.token.eof)return this.bufferIndex-=this.token.matched.length,this.token=this.prevToken},e.prototype.isEolOrEof=function(){return this.token.eol||this.token.eof},e.prototype.matchJavascriptHash=function(){var e,t,n,r,i,s,o;i=this.calculateCurrentIndent(),s=this.bufferIndex+1,r=this.characterNumber,o=this.lineNumber,e=1;while(s<this.buffer.length&&(e>1||this.buffer.charAt(s)!=="}"))t=this.buffer.charAt(s),n=this.buffer.charCodeAt(s),t==="{"?(e++,s++):t==="}"?(e--,s++):n===10||n===13?s++:s++;if(s===this.buffer.length)throw this.characterNumber=r+1,this.lineNumber=o,this.parseError('Error parsing attribute hash - Did not find a terminating "}"');return this.token={attributeHash:!0,token:"ATTRHASH",tokenString:this.buffer.substring(this.bufferIndex,s+1),matched:this.buffer.substring(this.bufferIndex,s+1)},this.advanceCharsInBuffer(s-this.bufferIndex+1)},e.prototype.calculateCurrentIndent=function(){var e;return this.tokenMatchers.whitespace.lastIndex=0,e=this.tokenMatchers.whitespace.exec(this.currentLine),(e!=null?e.index:void 0)===0?this.calculateIndent(e[0]):0},e.prototype.calculateIndent=function(e){var t,n;n=0,t=0;while(t<e.length)e.charCodeAt(t)===9?n+=2:n++,t++;return Math.floor((n+1)/2)},e}(),e=function(){function e(e){this.generator=e,this.buffer="",this.outputBuffer=""}return e.prototype.append=function(e){this.generator!=null&&this.buffer.length===0&&this.generator.mark();if((e!=null?e.length:void 0)>0)return this.buffer+=e},e.prototype.appendToOutputBuffer=function(e){if((e!=null?e.length:void 0)>0)return this.flush(),this.outputBuffer+=e},e.prototype.flush=function(){var e;return((e=this.buffer)!=null?e.length:void 0)>0&&(this.outputBuffer+=this.generator.generateFlush(this.buffer)),this.buffer=""},e.prototype.output=function(){return this.outputBuffer},e.prototype.trimWhitespace=function(){var e,t;if(this.buffer.length>0){t=this.buffer.length-1;while(t>0){e=this.buffer.charAt(t);if(this._isWhitespace(e))t--;else{if(!(t>1)||e!=="n"&&e!=="t"||this.buffer.charAt(t-1)!=="\\")break;t-=2}}if(t>0&&t<this.buffer.length-1)return this.buffer=this.buffer.substring(0,t+1);if(t===0&&this._isWhitespace(this.buffer.charAt(0)))return this.buffer=""}},e.prototype._isWhitespace=function(e){return e===" "||e==="	"||e==="\n"},e}(),t=function(){function e(){}return e.prototype.embeddedCodeBlockMatcher=/#{([^}]*)}/g,e}(),i=function(e){function t(e){this.options=e,this.outputBuffer=new a.Buffer(this)}return h(t,e),t.prototype.appendEmbeddedCode=function(e,t,n,r,i){return this.outputBuffer.flush(),this.outputBuffer.appendToOutputBuffer(e+"try {\n"),this.outputBuffer.appendToOutputBuffer(e+'    var value = eval("'+(_.str||_).trim(t).replace(/"/g,'\\"').replace(/\\n/g,"\\\\n")+'");\n'),this.outputBuffer.appendToOutputBuffer(e+'    value = value === null ? "" : value;'),n?this.outputBuffer.appendToOutputBuffer(e+"    html.push(haml.HamlRuntime.escapeHTML(String(value)));\n"):r?this.outputBuffer.appendToOutputBuffer(e+"    html.push(haml.HamlRuntime.perserveWhitespace(String(value)));\n"):this.outputBuffer.appendToOutputBuffer(e+"    html.push(String(value));\n"),this.outputBuffer.appendToOutputBuffer(e+"} catch (e) {\n"),this.outputBuffer.appendToOutputBuffer(e+"  handleError(haml.HamlRuntime.templateError("+i.lineNumber+", "+i.characterNumber+', "'+this.escapeCode(i.currentLine)+'",\n'),this.outputBuffer.appendToOutputBuffer(e+'    "Error evaluating expression - " + e));\n'),this.outputBuffer.appendToOutputBuffer(e+"}\n")},t.prototype.initOutput=function(){var e;return((e=this.options)!=null?e.tolerateFaults:void 0)?this.outputBuffer.appendToOutputBuffer("  var handleError = haml.HamlRuntime._logError;"):this.outputBuffer.appendToOutputBuffer("  var handleError = haml.HamlRuntime._raiseError;"),this.outputBuffer.appendToOutputBuffer("var html = [];\nvar hashFunction = null, hashObject = null, objRef = null, objRefFn = null;\nwith (context || {}) {")},t.prototype.closeAndReturnOutput=function(){return this.outputBuffer.flush(),this.outputBuffer.output()+'  }\n  return html.join("");\n'},t.prototype.appendCodeLine=function(e,t){return this.outputBuffer.flush(),this.outputBuffer.appendToOutputBuffer(r.indentText(this.indent)),this.outputBuffer.appendToOutputBuffer(e),this.outputBuffer.appendToOutputBuffer(t)},t.prototype.lineMatchesStartFunctionBlock=function(e){return e.match(/function\s*\((,?\s*\w+)*\)\s*\{\s*$/)},t.prototype.lineMatchesStartBlock=function(e){return e.match(/\{\s*$/)},t.prototype.closeOffCodeBlock=function(e){if(!e.token.minus||!e.matchToken(/\s*\}/g))return this.outputBuffer.flush(),this.outputBuffer.appendToOutputBuffer(r.indentText(this.indent)+"}\n")},t.prototype.closeOffFunctionBlock=function(e){if(!e.token.minus||!e.matchToken(/\s*\}/g))return this.outputBuffer.flush(),this.outputBuffer.appendToOutputBuffer(r.indentText(this.indent)+"});\n")},t.prototype.generateCodeForDynamicAttributes=function(e,t,n,r,i,s){return this.outputBuffer.flush(),r.length>0?(r=this.replaceReservedWordsInHash(r),this.outputBuffer.appendToOutputBuffer('    hashFunction = function () { return eval("hashObject = '+r.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"); };\n')):this.outputBuffer.appendToOutputBuffer("    hashFunction = null;\n"),i.length>0?this.outputBuffer.appendToOutputBuffer('    objRefFn = function () { return eval("objRef = '+i.replace(/"/g,'\\"')+'"); };\n'):this.outputBuffer.appendToOutputBuffer("    objRefFn = null;\n"),this.outputBuffer.appendToOutputBuffer('    html.push(haml.HamlRuntime.generateElementAttributes(context, "'+e+'", ["'+t.join('","')+'"], objRefFn, '+JSON.stringify(n)+", hashFunction, "+s.lineNumber+", "+s.characterNumber+', "'+this.escapeCode(s.currentLine)+'", handleError));\n')},t.prototype.replaceReservedWordsInHash=function(e){var t,n,r,i,s;n=e,s=["class","for"];for(r=0,i=s.length;r<i;r++)t=s[r],n=n.replace(t+":",'"'+t+'":');return n},t.prototype.escapeCode=function(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r")},t.prototype.generateJsFunction=function(e){var t;try{return new Function("context",e)}catch(n){throw t=n,"Incorrect embedded code has resulted in an invalid Haml function - "+t+"\nGenerated Function:\n"+e}},t.prototype.generateFlush=function(e){return'    html.push("'+this.escapeCode(e)+'");\n'},t.prototype.setIndent=function(e){return this.indent=e},t.prototype.mark=function(){},t.prototype.appendTextContents=function(e,t,n,r){return r==null&&(r={}),t&&e.match(/#{[^}]*}/)?this.interpolateString(e,n,r):this.outputBuffer.append(this.processText(e,r))},t.prototype.interpolateString=function(e,t,n){var i,s,o,u;i=0,u=this.embeddedCodeBlockMatcher.exec(e);while(u)u.index>0&&(s=e.charAt(u.index-1)),u.index>1&&(o=e.charAt(u.index-2)),s==="\\"&&o!=="\\"?(u.index!==0&&this.outputBuffer.append(this.processText(e.substring(i,u.index-1),n)),this.outputBuffer.append(this.processText(u[0]),n)):(this.outputBuffer.append(this.processText(e.substring(i,u.index)),n),this.appendEmbeddedCode(r.indentText(this.indent+1),u[1],n.escapeHTML,n.perserveWhitespace,t)),i=this.embeddedCodeBlockMatcher.lastIndex,u=this.embeddedCodeBlockMatcher.exec(e);if(i<e.length)return this.outputBuffer.append(this.processText(e.substring(i),n))},t.prototype.processText=function(e,t){return(t!=null?t.escapeHTML:void 0)?a.HamlRuntime.escapeHTML(e):(t!=null?t.perserveWhitespace:void 0)?a.HamlRuntime.perserveWhitespace(e):e},t}(t),s=function(e){function t(){return l=t.__super__.constructor.apply(this,arguments),l}return h(t,e),t.prototype.appendEmbeddedCode=function(e,t,n,r,i){return this.outputBuffer.flush(),this.outputBuffer.appendToOutputBuffer(e+"    value = "+(_.str||_).trim(t)+";\n"),this.outputBuffer.appendToOutputBuffer(e+'    value = value === null ? "" : value;'),n?this.outputBuffer.appendToOutputBuffer(e+"    html.push(haml.HamlRuntime.escapeHTML(String(value)));\n"):r?this.outputBuffer.appendToOutputBuffer(e+"    html.push(haml.HamlRuntime.perserveWhitespace(String(value)));\n"):this.outputBuffer.appendToOutputBuffer(e+"    html.push(String(value));\n")},t.prototype.generateCodeForDynamicAttributes=function(e,t,n,r,i,s){return this.outputBuffer.flush(),r.length>0?(r=this.replaceReservedWordsInHash(r),this.outputBuffer.appendToOutputBuffer("    hashFunction = function () { return "+r+"; };\n")):this.outputBuffer.appendToOutputBuffer("    hashFunction = null;\n"),i.length>0?this.outputBuffer.appendToOutputBuffer("    objRefFn = function () { return "+i+"; };\n"):this.outputBuffer.appendToOutputBuffer("    objRefFn = null;\n"),this.outputBuffer.appendToOutputBuffer('    html.push(haml.HamlRuntime.generateElementAttributes(context, "'+e+'", ["'+t.join('","')+'"], objRefFn, '+JSON.stringify(n)+", hashFunction, "+s.lineNumber+", "+s.characterNumber+', "'+this.escapeCode(s.currentLine)+'"));\n')},t.prototype.initOutput=function(){return this.outputBuffer.appendToOutputBuffer("  var html = [];\n  var hashFunction = null, hashObject = null, objRef = null, objRefFn = null, value= null;\n  with (context || {}) {\n")},t}(i),n=function(e){function t(e){this.options=e,this.outputBuffer=new a.Buffer(this)}return h(t,e),t.prototype.appendEmbeddedCode=function(e,t,n,r,i){var s;return this.outputBuffer.flush(),s=this.calcCodeIndent(),this.outputBuffer.appendToOutputBuffer(s+"try\n"),this.outputBuffer.appendToOutputBuffer(s+"  exp = CoffeeScript.compile('"+t.replace(/'/g,"\\'").replace(/\\n/g,"\\\\n")+"', bare: true)\n"),this.outputBuffer.appendToOutputBuffer(s+"  value = eval(exp)\n"),this.outputBuffer.appendToOutputBuffer(s+"  value ?= ''\n"),n?this.outputBuffer.appendToOutputBuffer(s+"  html.push(haml.HamlRuntime.escapeHTML(String(value)))\n"):r?this.outputBuffer.appendToOutputBuffer(s+"  html.push(haml.HamlRuntime.perserveWhitespace(String(value)))\n"):this.outputBuffer.appendToOutputBuffer(s+"  html.push(String(value))\n"),this.outputBuffer.appendToOutputBuffer(s+"catch e \n"),this.outputBuffer.appendToOutputBuffer(s+"  handleError new Error(haml.HamlRuntime.templateError("+i.lineNumber+", "+i.characterNumber+", '"+this.escapeCode(i.currentLine)+"',\n"),this.outputBuffer.appendToOutputBuffer(s+"    'Error evaluating expression - ' + e))\n")},t.prototype.initOutput=function(){var e;return((e=this.options)!=null?e.tolerateFaults:void 0)?this.outputBuffer.appendToOutputBuffer("handleError = haml.HamlRuntime._logError\n"):this.outputBuffer.appendToOutputBuffer("handleError = haml.HamlRuntime._raiseError\n"),this.outputBuffer.appendToOutputBuffer("html = []\n")},t.prototype.closeAndReturnOutput=function(){return this.outputBuffer.flush(),this.outputBuffer.output()+'return html.join("")\n'},t.prototype.appendCodeLine=function(e,t){return this.outputBuffer.flush(),this.outputBuffer.appendToOutputBuffer(this.calcCodeIndent()),this.outputBuffer.appendToOutputBuffer((_.str||_).trim(e)),this.outputBuffer.appendToOutputBuffer(t),this.prevCodeIndent=this.indent},t.prototype.lineMatchesStartFunctionBlock=function(e){return e.match(/\) [\-=]>\s*$/)},t.prototype.lineMatchesStartBlock=function(e){return!0},t.prototype.closeOffCodeBlock=function(e){return this.outputBuffer.flush()},t.prototype.closeOffFunctionBlock=function(e){return this.outputBuffer.flush()},t.prototype.generateCodeForDynamicAttributes=function(e,t,n,r,i,s){var o;return this.outputBuffer.flush(),o=this.calcCodeIndent(),r.length>0?(r=this.replaceReservedWordsInHash(r),this.outputBuffer.appendToOutputBuffer(o+"hashFunction = () -> s = CoffeeScript.compile('"+r.replace(/'/g,"\\'").replace(/\n/g,"\\n")+"', bare: true); eval 'hashObject = ' + s\n")):this.outputBuffer.appendToOutputBuffer(o+"hashFunction = null\n"),i.length>0?this.outputBuffer.appendToOutputBuffer(o+"objRefFn = () -> s = CoffeeScript.compile('"+i.replace(/'/g,"\\'")+"', bare: true); eval 'objRef = ' + s\n"):this.outputBuffer.appendToOutputBuffer(o+"objRefFn = null\n"),this.outputBuffer.appendToOutputBuffer(o+"html.push(haml.HamlRuntime.generateElementAttributes(this, '"+e+"', ['"+t.join("','")+"'], objRefFn ? null, "+JSON.stringify(n)+", hashFunction ? null, "+s.lineNumber+", "+s.characterNumber+", '"+this.escapeCode(s.currentLine)+"', handleError))\n")},t.prototype.replaceReservedWordsInHash=function(e){var t,n,r,i,s;n=e,s=["class","for"];for(r=0,i=s.length;r<i;r++)t=s[r],n=n.replace(t+":","'"+t+"':");return n},t.prototype.escapeCode=function(e){var t,n,r,i,s;n="",t=0,s=this.embeddedCodeBlockMatcher.exec(e);while(s)s.index>0&&(r=e.charAt(s.index-1)),s.index>1&&(i=e.charAt(s.index-2)),r==="\\"&&i!=="\\"?(s.index!==0&&(n+=this._escapeText(e.substring(t,s.index-1))),n+=this._escapeText("\\"+s[0])):(n+=this._escapeText(e.substring(t,s.index)),n+=s[0]),t=this.embeddedCodeBlockMatcher.lastIndex,s=this.embeddedCodeBlockMatcher.exec(e);return t<e.length&&(n+=this._escapeText(e.substring(t))),n},t.prototype._escapeText=function(e){return e.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/(^|[^\\]{2})\\\\#{/g,"$1\\#{")},t.prototype.generateJsFunction=function(e){var t,n;try{return n=CoffeeScript.compile(e,{bare:!0}),new Function(n)}catch(r){throw t=r,"Incorrect embedded code has resulted in an invalid Haml function - "+t+"\nGenerated Function:\n"+n}},t.prototype.generateFlush=function(e){return this.calcCodeIndent()+"html.push('"+this.escapeCode(e)+"')\n"},t.prototype.setIndent=function(e){return this.indent=e},t.prototype.mark=function(){return this.prevIndent=this.indent},t.prototype.calcCodeIndent=function(){var e,t,n,i,s,o;e=0;for(t=n=0,i=this.indent;0<=i?n<=i:n>=i;t=0<=i?++n:--n)if(((s=this.elementStack[t])!=null?s.block:void 0)||((o=this.elementStack[t])!=null?o.fnBlock:void 0))e+=1;return r.indentText(e)},t.prototype.appendTextContents=function(e,t,n,r){var i,s;if(t&&e.match(/#{[^}]*}/)){this.outputBuffer.flush(),i=s="";if(r!=null?r.escapeHTML:void 0)i="haml.HamlRuntime.escapeHTML(",s=")";else if(r!=null?r.perserveWhitespace:void 0)i="haml.HamlRuntime.perserveWhitespace(",s=")";return this.outputBuffer.appendToOutputBuffer(this.calcCodeIndent()+"html.push("+i+'"'+this.escapeCode(e)+'"'+s+")\n")}if(r!=null?r.escapeHTML:void 0)e=a.HamlRuntime.escapeHTML(e);if(r!=null?r.perserveWhitespace:void 0)e=a.HamlRuntime.perserveWhitespace(e);return this.outputBuffer.append(e)},t}(t),u={plain:function(e,t,n,r){var i,s,o;for(s=0,o=e.length;s<o;s++)i=e[s],t.appendTextContents(a.HamlRuntime.indentText(n-1)+i+"\n",!0,r);return!0},javascript:function(e,t,n,r){var i,s,o;t.outputBuffer.append(a.HamlRuntime.indentText(n)+'<script type="text/javascript">\n'),t.outputBuffer.append(a.HamlRuntime.indentText(n+1)+"//<![CDATA[\n");for(s=0,o=e.length;s<o;s++)i=e[s],t.appendTextContents(a.HamlRuntime.indentText(n+1)+i+"\n",!0,r);return t.outputBuffer.append(a.HamlRuntime.indentText(n+1)+"//]]>\n"),t.outputBuffer.append(a.HamlRuntime.indentText(n)+"</script>\n")},css:function(e,t,n,r){var i,s,o;t.outputBuffer.append(a.HamlRuntime.indentText(n)+'<style type="text/css">\n'),t.outputBuffer.append(a.HamlRuntime.indentText(n+1)+"/*<![CDATA[*/\n");for(s=0,o=e.length;s<o;s++)i=e[s],t.appendTextContents(a.HamlRuntime.indentText(n+1)+i+"\n",!0,r);return t.outputBuffer.append(a.HamlRuntime.indentText(n+1)+"/*]]>*/\n"),t.outputBuffer.append(a.HamlRuntime.indentText(n)+"</style>\n")},cdata:function(e,t,n,r){var i,s,o;t.outputBuffer.append(a.HamlRuntime.indentText(n)+"<![CDATA[\n");for(s=0,o=e.length;s<o;s++)i=e[s],t.appendTextContents(a.HamlRuntime.indentText(n)+i+"\n",!0,r);return t.outputBuffer.append(a.HamlRuntime.indentText(n)+"]]>\n")},preserve:function(e,t,n,r){var i;return t.appendTextContents(a.HamlRuntime.indentText(n),!1,r),t.appendTextContents(function(){var t,n,r;r=[];for(t=0,n=e.length;t<n;t++)i=e[t],r.push(a.HamlRuntime.trim(i,2));return r}().join("&#x000A; ")+"\n",!0,r)},escaped:function(e,t,n,r){var i,s,o;for(s=0,o=e.length;s<o;s++)i=e[s],t.appendTextContents(a.HamlRuntime.indentText(n-1)+i+"\n",!0,r,{escapeHTML:!0});return!0}},a={compileHaml:function(e){var t,n,r;if(typeof e=="string")return this._compileHamlTemplate(e,new a.JsCodeGenerator);t=function(){switch(e.generator){case"coffeescript":return new a.CoffeeCodeGenerator(e);case"productionjavascript":return new a.ProductionJsCodeGenerator(e);default:return new a.JsCodeGenerator(e)}}();if(e.source!=null)r=new a.Tokeniser({template:e.source});else if(e.sourceId!=null)r=new a.Tokeniser({templateId:e.sourceId});else{if(e.sourceUrl==null)throw"No template source specified for compileHaml. You need to provide a source, sourceId or sourceUrl option";r=new a.Tokeniser({templateUrl:e.sourceUrl})}return n=this._compileHamlToJs(r,t,e),e.outputFormat!=="string"?t.generateJsFunction(n):"function (context) {\n"+n+"}\n"},compileCoffeeHaml:function(e){return this._compileHamlTemplate(e,new a.CoffeeCodeGenerator)},compileStringToJs:function(e){var t,n;return t=new a.JsCodeGenerator,n=this._compileHamlToJs(new a.Tokeniser({template:e}),t),t.generateJsFunction(n)},compileCoffeeHamlFromString:function(e){var t,n;return t=new a.CoffeeCodeGenerator,n=this._compileHamlToJs(new a.Tokeniser({template:e}),t),t.generateJsFunction(n)},compileHamlToJsString:function(e){var t;return t="function (context) {\n",t+=this._compileHamlToJs(new a.Tokeniser({template:e}),new a.JsCodeGenerator),t+="}\n"},_compileHamlTemplate:function(e,t){var n,r;return a.cache||(a.cache={}),a.cache[e]?a.cache[e]:(r=this._compileHamlToJs(new a.Tokeniser({templateId:e}),t),n=t.generateJsFunction(r),a.cache[e]=n,n)},_compileHamlToJs:function(e,t,n){var i,s;n==null&&(n={}),t.elementStack=[],t.initOutput(),e.getNextToken();while(!e.token.eof)if(!e.token.eol)try{s=this._whitespace(e),t.setIndent(s),e.token.eol?(t.outputBuffer.append(r.indentText(s)+e.token.matched),e.getNextToken()):e.token.doctype?this._doctype(e,s,t):e.token.exclamation?this._ignoredLine(e,s,t.elementStack,t):e.token.equal||e.token.escapeHtml||e.token.unescapeHtml||e.token.tilde?this._embeddedJs(e,s,t.elementStack,{innerWhitespace:!0},t):e.token.minus?this._jsLine(e,s,t.elementStack,t):e.token.comment||e.token.slash?this._commentLine(e,s,t.elementStack,t):e.token.amp?this._escapedLine(e,s,t.elementStack,t):e.token.filter?this._filter(e,s,t,n):this._templateLine(e,t.elementStack,s,t,n)}catch(o){i=o,this._handleError(n,{skipTo:!0},e,i)}else t.outputBuffer.append(e.token.matched),e.getNextToken();return this._closeElements(0,t.elementStack,e,t),t.closeAndReturnOutput()},_doctype:function(e,t,n){var i,s;if(e.token.doctype){n.outputBuffer.append(r.indentText(t)),e.getNextToken(),e.token.ws&&e.getNextToken(),i=e.skipToEOLorEOF();if(i&&i.length>0){s=i.split(/\s+/);switch(s[0]){case"XML":s.length>1?n.outputBuffer.append("<?xml version='1.0' encoding='"+s[1]+"' ?>"):n.outputBuffer.append("<?xml version='1.0' encoding='utf-8' ?>");break;case"Strict":n.outputBuffer.append('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');break;case"Frameset":n.outputBuffer.append('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">');break;case"5":n.outputBuffer.append("<!DOCTYPE html>");break;case"1.1":n.outputBuffer.append('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">');break;case"Basic":n.outputBuffer.append('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">');break;case"Mobile":n.outputBuffer.append('<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">');break;case"RDFa":n.outputBuffer.append('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">')}}else n.outputBuffer.append("<!DOCTYPE html>");return n.outputBuffer.append(this._newline(e)),e.getNextToken()}},_filter:function(e,t,n,i){var s,o,u,f;if(e.token.filter){s=e.token.tokenString;if(!a.filters[s]){this._handleError(i,{skipTo:t},e,e.parseError("Filter '"+s+"' not registered. Filter functions need to be added to 'haml.filters'."));return}e.skipToEOLorEOF(),e.getNextToken(),u=a._whitespace(e),o=[];while(!e.token.eof&&u>t)e.pushBackToken(),f=e.skipToEOLorEOF(),o.push(r.trim(f,2*t)),e.getNextToken(),u=a._whitespace(e);return a.filters[s](o,n,t,e.currentParsePoint()),e.pushBackToken()}},_commentLine:function(e,t,n,i){var s,o;if(e.token.comment){e.skipToEOLorEOF(),e.getNextToken(),o=this._whitespace(e);while(!e.token.eof&&o>t)e.skipToEOLorEOF(),e.getNextToken(),o=this._whitespace(e);if(o>0)return e.pushBackToken()}else if(e.token.slash)return a._closeElements(t,n,e,i),i.outputBuffer.append(r.indentText(t)),i.outputBuffer.append("<!--"),e.getNextToken(),s=e.skipToEOLorEOF(),s&&s.length>0&&i.outputBuffer.append(s),s&&(_.str||_).startsWith(s,"[")&&s.match(/\]\s*$/)?(n[t]={htmlConditionalComment:!0,eol:this._newline(e)},i.outputBuffer.append(">")):n[t]={htmlComment:!0,eol:this._newline(e)},a._tagHasContents(t,e)&&i.outputBuffer.append("\n"),e.getNextToken()},_escapedLine:function(e,t,n,i){var s;if(e.token.amp)return a._closeElements(t,n,e,i),i.outputBuffer.append(r.indentText(t)),e.getNextToken(),s=e.skipToEOLorEOF(),s&&s.length>0&&i.outputBuffer.append(a.HamlRuntime.escapeHTML(s)),i.outputBuffer.append(this._newline(e)),e.getNextToken()},_ignoredLine:function(e,t,n,i){var s;if(e.token.exclamation)return e.getNextToken(),e.token.ws&&(t+=a._whitespace(e)),a._closeElements(t,n,e,i),s=e.skipToEOLorEOF(),i.outputBuffer.append(r.indentText(t)+s)},_embeddedJs:function(e,t,n,i,s){var o,u,f,l,c;n&&a._closeElements(t,n,e,s);if(e.token.equal||e.token.escapeHtml||e.token.unescapeHtml||e.token.tilde){u=e.token.escapeHtml||e.token.equal,c=e.token.tilde,o=e.currentParsePoint(),e.getNextToken(),f=e.skipToEOLorEOF(),l=r.indentText(t),(!i||i.innerWhitespace)&&s.outputBuffer.append(l),s.appendEmbeddedCode(l,f,u,c,o);if(!i||i.innerWhitespace){s.outputBuffer.append(this._newline(e));if(e.token.eol)return e.getNextToken()}}},_jsLine:function(e,t,n,r){var i;if(e.token.minus){a._closeElements(t,n,e,r),e.getNextToken(),i=e.skipToEOLorEOF(),r.setIndent(t),r.appendCodeLine(i,this._newline(e)),e.token.eol&&e.getNextToken();if(r.lineMatchesStartFunctionBlock(i))return n[t]={fnBlock:!0};if(r.lineMatchesStartBlock(i))return n[t]={block:!0}}},_templateLine:function(e,t,n,i,s){var o,u,f,l,c,h,p,d,v,m,g,y,b;e.token.eol||this._closeElements(n,t,e,i),d=this._element(e),p=this._idSelector(e),f=
this._classSelector(e),g=this._objectReference(e),o=this._attributeList(e,s),c=e.currentParsePoint(),u=this._attributeHash(e),b={selfClosingTag:!1,innerWhitespace:!0,outerWhitespace:!0},m=this._lineHasElement(d,p,f),e.token.slash&&(b.selfClosingTag=!0,e.getNextToken()),e.token.gt&&m&&(b.outerWhitespace=!1,e.getNextToken()),e.token.lt&&m&&(b.innerWhitespace=!1,e.getNextToken()),m&&(b.selfClosingTag||(b.selfClosingTag=a._isSelfClosingTag(d)&&!a._tagHasContents(n,e)),this._openElement(c,n,d,p,f,g,o,u,t,b,i)),h=!1,e.token.ws&&e.getNextToken(),e.token.equal||e.token.escapeHtml||e.token.unescapeHtml?(this._embeddedJs(e,n+1,null,b,i),h=!0):(l="",y=!1,e.token.exclamation?(e.getNextToken(),l=e.skipToEOLorEOF()):(l=e.skipToEOLorEOF(),l.match(/^\\/)&&(l=l.substring(1)),y=!0),h=l.length>0,h&&(b.innerWhitespace&&m||!m&&a._parentInnerWhitespace(t,n)?v=r.indentText(d.length>0?n+1:n):(v="",l=(_.str||_).trim(l)),i.appendTextContents(v+l,y,c),i.outputBuffer.append(this._newline(e))),this._eolOrEof(e));if(b.selfClosingTag&&h)return this._handleError(s,null,e,a.HamlRuntime.templateError(c.lineNumber,c.characterNumber,c.currentLine,"A self-closing tag can not have any contents"))},_attributeHash:function(e){var t;return t="",e.token.attributeHash&&(t=e.token.tokenString,e.getNextToken()),t},_objectReference:function(e){var t;return t="",e.token.objectReference&&(t=e.token.tokenString,e.getNextToken()),t},_attributeList:function(e,t){var n,r;r={};if(e.token.openBracket){e.getNextToken();while(!e.token.closeBracket){n=a._attribute(e);if(n)r[n.name]=n.value;else if(e.token.ws||e.token.eol)e.getNextToken();else if(!e.token.closeBracket&&!e.token.identifier)return this._handleError(t,null,e,e.parseError("Expecting either an attribute name to continue the attibutes or a closing bracket to end")),r}e.getNextToken()}return r},_attribute:function(e){var t,n;t=null;if(e.token.identifier){n=e.token.tokenString,e.getNextToken(),a._whitespace(e);if(!e.token.equal)throw e.parseError("Expected '=' after attribute name");e.getNextToken(),a._whitespace(e);if(!e.token.string&&!e.token.identifier)throw e.parseError("Expected a quoted string or an identifier for the attribute value");t={name:n,value:e.token.tokenString},e.getNextToken()}return t},_closeElement:function(e,t,n,i){var s,o;if(t[e])return i.setIndent(e),t[e].htmlComment?i.outputBuffer.append(r.indentText(e)+"-->"+t[e].eol):t[e].htmlConditionalComment?i.outputBuffer.append(r.indentText(e)+"<![endif]-->"+t[e].eol):t[e].block?i.closeOffCodeBlock(n):t[e].fnBlock?i.closeOffFunctionBlock(n):(s=!t[e].tagOptions||t[e].tagOptions.innerWhitespace,s?i.outputBuffer.append(r.indentText(e)):i.outputBuffer.trimWhitespace(),i.outputBuffer.append("</"+t[e].tag+">"),o=!t[e].tagOptions||t[e].tagOptions.outerWhitespace,a._parentInnerWhitespace(t,e)&&o&&i.outputBuffer.append("\n")),t[e]=null,i.mark()},_closeElements:function(e,t,n,r){var i,s;i=t.length-1,s=[];while(i>=e)s.push(this._closeElement(i--,t,n,r));return s},_openElement:function(e,t,n,i,s,o,u,a,f,l,c){var h,p,d;h=n.length===0?"div":n,p=this._parentInnerWhitespace(f,t),d=!l||l.outerWhitespace,d||c.outputBuffer.trimWhitespace(),t>0&&p&&d&&c.outputBuffer.append(r.indentText(t)),c.outputBuffer.append("<"+h),a.length>0||o.length>0?c.generateCodeForDynamicAttributes(i,s,u,a,o,e):c.outputBuffer.append(r.generateElementAttributes(null,i,s,null,u,null,e.lineNumber,e.characterNumber,e.currentLine));if(l.selfClosingTag){c.outputBuffer.append("/>");if(l.outerWhitespace)return c.outputBuffer.append("\n")}else{c.outputBuffer.append(">"),f[t]={tag:h,tagOptions:l};if(l.innerWhitespace)return c.outputBuffer.append("\n")}},_isSelfClosingTag:function(e){return e==="meta"||e==="img"||e==="link"||e==="script"||e==="br"||e==="hr"},_tagHasContents:function(e,t){var n;return t.isEolOrEof()?(n=t.lookAhead(1),n.ws&&n.tokenString.length/2>e):!0},_parentInnerWhitespace:function(e,t){return t===0||!e[t-1]||!e[t-1].tagOptions||e[t-1].tagOptions.innerWhitespace},_lineHasElement:function(e,t,n){return e.length>0||t.length>0||n.length>0},hasValue:function(e){return e!=null&&e!==!1},attrValue:function(e,t){return e==="selected"||e==="checked"||e==="disabled"?e:t},_whitespace:function(e){var t;return t=0,e.token.ws&&(t=e.calculateIndent(e.token.tokenString),e.getNextToken()),t},_element:function(e){var t;return t="",e.token.element&&(t=e.token.tokenString,e.getNextToken()),t},_eolOrEof:function(e){if(e.token.eol||e.token.continueLine)return e.getNextToken();if(!e.token.eof)throw e.parseError("Expected EOL or EOF")},_idSelector:function(e){var t;return t="",e.token.idSelector&&(t=e.token.tokenString,e.getNextToken()),t},_classSelector:function(e){var t;t=[];while(e.token.classSelector)t.push(e.token.tokenString),e.getNextToken();return t},_newline:function(e){return e.token.eol?e.token.matched:e.token.continueLine?e.token.matched.substring(1):"\n"},_handleError:function(e,t,n,r){if(e!=null?!e.tolerateFaults:!void 0)throw r;console.log(r);if(t!=null?t.skipTo:void 0)return this._skipToNextLineWithIndent(n,t.skipTo)},_skipToNextLineWithIndent:function(e,t){var n;e.skipToEOLorEOF(),e.getNextToken(),n=this._whitespace(e);while(n>t)e.skipToEOLorEOF(),e.getNextToken(),n=this._whitespace(e);return e.pushBackToken()}},a.Tokeniser=o,a.Buffer=e,a.JsCodeGenerator=i,a.ProductionJsCodeGenerator=s,a.CoffeeCodeGenerator=n,a.HamlRuntime=r,a.filters=u,(typeof module!=="undefined"&&module!==null?module.exports:void 0)!=null?module.exports=a:f.haml=a}).call(this);