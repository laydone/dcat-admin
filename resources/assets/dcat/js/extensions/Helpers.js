
import debounce from './Debounce'

export default class Helpers {
    constructor(Dcat) {
        Dcat.helpers = this;

        // 延迟触发，消除重复触发
        this.debounce = debounce;
    }

    /**
     * 获取json对象或数组的长度
     *
     * @param obj
     * @returns {number}
     */
    len(obj) {
        if (typeof obj !== 'object') {
            return 0;
        }
        let i, len = 0;

        for(i in obj) {
            len += 1;
        }

        return len;
    }

    /**
     * 判断变量或key是否存在
     *
     * @param _var
     * @param key
     * @returns {boolean}
     */
    isset(_var, key) {
        let isset = (typeof _var !== 'undefined' && _var !== null);

        if (typeof key === 'undefined') {
            return isset;
        }

        return isset && typeof _var[key] !== 'undefined';
    };

    empty(obj, key) {
        return !(this.isset(obj, key) && obj[key]);
    };

    /**
     * 根据key获取对象的值，支持获取多维数据
     *
     * @param arr
     * @param key
     * @param def
     * @returns {null|*}
     */
    get(arr, key, def) {
        def = null;

        if (this.len(arr) < 1) {
            return def;
        }

        key = String(key).split('.');

        for (var i = 0; i < key.length; i++) {
            if (this.isset(arr, key[i])) {
                arr = arr[key[i]];
            } else {
                return def;
            }
        }

        return arr;
    }

    /**
     * 判断key是否存在
     *
     * @param arr
     * @param key
     * @returns {def|boolean}
     */
    has(arr, key) {
        if (LA.len(arr) < 1) return def;
        key = String(key).split('.');

        for (var i = 0; i < key.length; i++) {
            if (LA.isset(arr, key[i])) {
                arr = arr[key[i]];
            } else {
                return false;
            }
        }

        return true;
    }

    /**
     * 判断元素是否在对象中存在
     *
     * @param arr
     * @param val
     * @param strict
     * @returns {boolean}
     */
    inObject(arr, val, strict) {
        if (this.len(arr) < 1) {
            return false;
        }

        for (var i in arr) {
            if (strict) {
                if (val === arr[i]) {
                    return true;
                }
                continue
            }

            if (val == arr[i]) {
                return true;
            }
        }
        return false;
    }

    // 判断对象是否相等
    equal(array, array2, strict) {
        if (!array || !array2) {
            return false;
        }

        let len1 = this.len(array),
            len2 = this.len(array2), i;

        if (len1 != len2) {
            return false;
        }

        for (i in array) {
            if (! this.isset(array2, i)) {
                return false;
            }

            if (array[i] === null && array2[i] === null) {
                return true;
            }

            if (typeof array[i] == 'object' && typeof array2[i] == 'object') {
                if (! this.equal(array[i], array2[i], strict))
                    return false;
            }
            else if (array[i] != array2[i]) {
                return false;
            }
        }
        return true;
    }

    // 字符串替换
    replace(str, replace, subject) {
        if (!str) {
            return str;
        }

        return str.replace(
            new RegExp(replace, "g"),
            subject
        );
    }
}
