var argSnip = require('../lib/argsnip.js'),
	should = require('should');

describe('argSnip', function() {
	it('should block arguments when numArgs is zero', function(done) {
		var cb = argSnip(0, function() {
			arguments.length.should.eql(0);
			done();
		});
		cb(1, 2, 3, 4);
	});
	it('should limit arguments when numArgs is nonzero', function(done) {
		var cb = argSnip(2, function() {
			arguments.length.should.eql(2);
			done();
		});
		cb(1, 2, 3, 4);
	});
	it('should start arguments at the specified index', function(done) {
		var cb = argSnip(2, 1, function(arg) {
			arguments.length.should.eql(1);
			arg.should.eql(3);
			done();
		});
		cb(1, 2, 3, 4);
	});
	it('should not limit arguments when args is null', function(done) {
		var cb = argSnip(2, null, function(a, b, c) {
			arguments.length.should.eql(3);
			a.should.eql(3);
			b.should.eql(4);
			c.should.eql(5);
			done();
		});
		cb(1, 2, 3, 4, 5);
	});
	it('should cherry-pick arguments when given an array', function(done) {
		var cb = argSnip([3, 1], function(a, b) {
			arguments.length.should.eql(2);
			a.should.eql(4);
			b.should.eql(2);
			done();
		});
		cb(1, 2, 3, 4);
	});
	it('should set an argument to undefined when not found', function(done) {
		var cb = argSnip([0, 9, 1], function(a, b, c) {
			arguments.length.should.eql(3);
			a.should.eql(1);
			should.not.exist(b);
			c.should.eql(2);
			done();
		});
		cb(1, 2, 3);
	});
});