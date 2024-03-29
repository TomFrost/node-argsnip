# ArgSnip
Snips arguments off of callback functions, for simpler code and cleaner APIs.

[![Build Status](https://secure.travis-ci.org/TomFrost/node-argsnip.png?branch=master)](http://travis-ci.org/TomFrost/node-argsnip)

## Installation
In your project folder, type:

	npm install argsnip

## Usage
Whenever you have code that looks like this, just to trim off unnecessary
arguments from your callback:

	db.query(query, function(err, result, code, meta) {
		callback(err, result);
	}

Just snip the args!

	var argSnip = require('argsnip');
	db.query(query, argSnip(2, callback));

But what if you want just the 'err' and 'code' arguments?

	db.query(query, argSnip([0, 2], callback));

How about the same two, in reverse order?

	db.query(query, argSnip([2, 0], callback));

What if we want all arguments except the first one?

	db.query(query, argSnip(1, null, callback));

What if we want to skip the first one, then take the next two arguments?

	db.query(query, argSnip(1, 2, callback));
	// OR:
	db.query(query, argSnip([1, 2], callback));

## Details
ArgSnip will save you from using countless wrapper functions to sanitize your
callback arguments by letting you send just a slice or cheery-pick of the
original arguments to the specified function.  Here's what it looks like:

**argSnip(_[start]_, args, callback)**

- **start:** An optional index at which to start grabbing arguments.  If
omitted, it's 0.

- **args:** The number of arguments from the 'start' index that should be
sent to the callback, OR an array specifying the index of each argument to be
sent to the callback, in the order they should be arranged in.  Null to take
all arguments after the start index.

- **callback:** The function to call with reduced arguments.

### Returns
Your callback function.  But when it's called, only the specified subset of
arguments will be passed into it.  The 'this' context will not be affected.
Any arguments argSnip expects, but doesn't see at call time, will be passed as
undefined.

**Example:**

	var cb = argSnip([0, 9, 1], function(a, b, c) {
		// a is 0, b is undefined, c is 1.
	});
	cb(0, 1, 2);

## License
ArgSnip is distributed under the MIT license.

## Credits
ArgSnip was created by Tom Frost in 2012.  Because screw writing callback
wrappers.
