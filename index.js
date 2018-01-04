/*
 * 思路:
 * obj表示对象  k:表示key  result:需要赋值的值  取值: 即点操作(obj.key)
 * 判断obj能否取值
 *      * 能取值(obj是对象)
 *               * 如果k已经是最后一个了,直接obj[k]=result
 *               * 如果不是并且当前对象不能进行取值,则根据key值和newArrayIfNeed  返回{}或[]
 *      * 不能取值,则根据key值和newArrayIfNeed 新建{}或[]
 *               * 如果k已经是最后一个了,直接obj[k]=result
 *               * 如果不是并且当前对象不能进行取值,则根据key值和newArrayIfNeed  返回{}或[]
 */
/**
 * 如果key为正整数,并且newArrayIfNeed为true则返回[],否则返回{}
 * @param {String|Number} key
 * @returns
 */

/**
 * @param {Object} obj
 * @param {String|Array} path
 * @param {Any} val
 */
module.exports = function safeSet(data, path, result) {
    if (Array.isArray(path)) {
        var ob = data,
            cachedObj = [], // 用于存储每个data每个取值之后的值(除最后一个,其他值必定为引用值{}或[]) 从而cachedObj[0]即为修改之后的值
            key,
            val;
        for (var i = 0, len = path.length; i <= len - 1; i++) {
            key = String(path[i]).replace(/^\[(([1-9]\d*)|0)\]$/,'$1');
            if (typeof ob == "object" && ob != null) {
                cachedObj.push(ob);
                val = ob[key];
                if (i == len - 1) {
                    ob[key] = result;
                } else if (!val || typeof val != "object") {
                    ob[key] = _newObjectOrArray(path, i + 1);
                }
            } else {
                ob = _newObjectOrArray(path,i);
                cachedObj.push(ob);
                if (i == len - 1) {
                    ob[key] = result;
                } else {
                    ob[key] = _newObjectOrArray(path, i + 1);
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
        return safeSet(data, pathKeys, result);
    }
};

function _newObjectOrArray(path, key) {
    var m, num;
    if (m = String(path[key]).match(/^\[(([1-9]\d*)|0)\]$/)) {
        num = parseInt(m[1]);
        path[key] = num;
        return new Array(num); //  因为new Array("1") => ["1"] ,所以需要parseInt处理一下
    } else {
        return {};
    }
}

/*

//例1:
var data = {b:1}; 
safeSet(data,'b',2);  //=> {b:2}

//例2:
var data = {b:1}; 
// safeSet(data,'b.1',2);  //=> {b:{1:2}}
// safeSet(data,'b.1',2,true);  //=> {b:[,2]}

//例3:
var data = 1; 
//safeSet(data,'b',2);  //=> {b:2}
//safeSet(data,'1',2);  //=> {1:2}
//safeSet(data,'1',2,true);  //=> [,2]

//例4:
var data = 1; 
//safeSet(data,'b.c',2);   //=> {b:{c:2}}
//safeSet(data,'b.1',2);   //=> {b:{1:2}}
//safeSet(data,'b.1',2,true);   //=> {b:[,2]}

*/