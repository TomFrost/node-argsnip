/*
 Copyright (c) 2012 Tom Frost <tom@frosteddesign.com>

 MIT License

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/**
 * Returns a callback function that will receive only a subset of the
 * arguments that were originally passed to it.
 *
 * @param {Number} start The index of the first argument to be sent to the
 *      callback.  No arguments before this number will be sent.  If start is
 *      negative, argSnip will could back from the last argument.  If undefined
 *      or omitted, 0 is assumed.  This value is not used if 'args' is an
 *      array.
 * @param {Number|Array} args The number of arguments starting from the 'start'
 *      value that should be passed to the callback function, or an array of
 *      argument indexes that should be cherry-picked from the argument list.
 *      If null, all arguments after the 'start' index will be passed on.
 * @param {Function} callback The callback function to be called with a
 *      limited set of arguments.
 * @return {Function} The given callback function, prepared to ignore
 *      extraneous arguments.
 */
function argSnip(start, args, callback) {
	// Shift arguments if 'start' is omitted
	if (typeof args == 'function') {
		callback = args;
		args = start;
		start = 0;
	}
	else if (!start) start = 0;
	return function() {
		var argArray = Array.prototype.slice.call(arguments);
		if (Array.isArray(args)) {
			var newArgs = [];
			args.forEach(function(idx) {
				newArgs.push(argArray[idx])
			});
			argArray = newArgs;
		}
		else if (args || args === 0) argArray = argArray.splice(start, args);
		else argArray = argArray.splice(start);
		callback.apply(this, argArray);
	};
}

// Hook into CommonJS systems.
if (typeof module !== 'undefined' && 'exports' in module) {
	module.exports = argSnip;
}
