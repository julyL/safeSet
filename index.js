/**
 * @param {Object} obj
 * @param {String|Array} path
 * @param {*} val
 */
module.exports = function safeSet(obj, path, result) {
    if (Array.isArray(path)) {
        var ob = obj,
            cachedObj = [], // 用于存储每个obj每个取值之后的值(除最后一个,其他值必定为引用值{}或[]) 从而cachedObj[0]即为修改之后的值
            key,
            val;
        for (var i = 0, len = path.length; i <= len - 1; i++) {
            key = String(path[i]).replace(/^\[(([1-9]\d*)|0)\]$/,'$1');  // [1] => 1
            if (typeof ob == "object" && ob != null) {
                cachedObj.push(ob);
                val = ob[key];
                if (i == len - 1) {
                    ob[key] = result;
                } else if (!val || typeof val != "object") {
                    ob[key] = createObjectOrArray(path, i + 1);
                }
            } else {
                ob = createObjectOrArray(path,i);
                cachedObj.push(ob);
                if (i == len - 1) {
                    ob[key] = result;
                } else {
                    ob[key] = createObjectOrArray(path, i + 1);
                }
            }
            ob = ob[key];
        }
        return cachedObj[0];
    } else if (typeof path == "string") {
        // list.2.user.[3]  =>  ['list','2','user',[3]]
        var keys = path.split("."),
            pathKeys = [],
            m;
        keys.forEach(key => {
            if ((m = key.match(/([^\[\]]+)|(\[\d+\])/g))) {
                //  list[2] => ['list','[2]']
                [].push.apply(pathKeys, m);
            }
        });
        return safeSet(obj, pathKeys, result);
    }
};

function createObjectOrArray(path, key) {
    var m, num;
    if (m = String(path[key]).match(/^\[(([1-9]\d*)|0)\]$/)) {
        num = parseInt(m[1]);
        return new Array(num);  // new Array("1") => ["1"] 
    } else {
        return {};
    }
}