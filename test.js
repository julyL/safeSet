require('mocha');
var assert = require('assert'),
    safeSet = require('./');

describe('set value:', function() {
    it('should get a value', function() {
        assert.deepEqual(safeSet({ b: 1 }, 'b', 2), { b: 2 });
        assert.deepEqual(safeSet({ b: 1 }, ['b'], 2), { b: 2 });

        assert.deepEqual(safeSet({ b: 1 }, 'b.1', 2), { b: { 1: 2 } });
        assert.deepEqual(safeSet({ b: 1 }, ['b', 1], 2), { b: { 1: 2 } });

        assert.deepEqual(safeSet({ b: 1 }, 'b[1]', 2), { b: [, 2] });
        assert.deepEqual(safeSet({ b: 1 }, ['b', [1]], 2), { b: [, 2] });

        assert.deepEqual(safeSet(1, 'b', 2), { b: 2 });
        assert.deepEqual(safeSet(1, ['b'], 2), { b: 2 });

        assert.deepEqual(safeSet(1, '1', 2), { 1: 2 });
        assert.deepEqual(safeSet(1, [1], 2), { 1: 2 });

        assert.deepEqual(safeSet(1, '[1]', 2), [, 2]);
        assert.deepEqual(safeSet(1, ['[1]'], 2), [, 2]);

        assert.deepEqual(safeSet({ b: { c: [2, 3, { d: 4, 1: { e: 5, f: [6] } } ] }}, 'b.c[2].1.f.0.end.[0]', { a: 666  }), { b: { c: [ 2 ,3, { d: 4, 1: { e: 5, f: [{ end: [{ a: 666 }] }] }} ]} });
    
        assert.deepEqual(safeSet({ b: { c: [2, 3, { d: 4, 1: { e: 5, f: [6] } } ] }}, ['b','c','[2]',1,'f',0,'end',['0']], { a: 666 }), { b: { c: [ 2 ,3, { d: 4, 1: { e: 5, f: [{ end: [{ a: 666 }] }] }} ]} });
    });
});