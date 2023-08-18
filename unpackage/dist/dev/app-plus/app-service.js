if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  var _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
  "use strict";
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const mpMixin = {};
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value);
  }
  function url$1(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
  }
  function date$1(value) {
    if (!value)
      return false;
    if (number$1(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number$1(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  }
  function string$1(value) {
    return typeof value === "string";
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    }
    if (value.length === 8) {
      return xreg.test(value);
    }
    return false;
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range$2(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (value === 0 || isNaN(value))
          return true;
        break;
      case "object":
        if (value === null || value.length === 0)
          return true;
        for (const i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value === "string") {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array$1(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function object$1(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object$1(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    amount,
    array: array$1,
    carNo,
    chinese,
    code,
    contains,
    date: date$1,
    dateISO,
    digits,
    email,
    empty,
    enOrNum,
    func,
    idCard,
    image,
    jsonString,
    landline,
    letter,
    mobile,
    number: number$1,
    object: object$1,
    promise,
    range: range$2,
    rangeLength,
    regExp,
    string: string$1,
    url: url$1,
    video
  }, Symbol.toStringTag, { value: "Module" }));
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uv-ui-tools/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range$1(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
  }
  function getPx(value, unit = false) {
    if (number$1(value)) {
      return unit ? `${value}px` : Number(value);
    }
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  }
  function sleep(value = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit(value = "auto", unit = ((_b) => (_b = ((_a) => (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config)()) == null ? void 0 : _b.unit)() ? ((_d) => (_d = ((_c) => (_c = uni == null ? void 0 : uni.$uv) == null ? void 0 : _c.config)()) == null ? void 0 : _d.unit)() : "px") {
    value = String(value);
    return number$1(value) ? `${value}${unit}` : value;
  }
  function deepClone(obj, cache = /* @__PURE__ */ new WeakMap()) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (cache.has(obj))
      return cache.get(obj);
    let clone;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]));
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value) => deepClone(value, cache)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value) => deepClone(value, cache));
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache.set(obj, clone);
      for (const [key, value] of Object.entries(obj)) {
        clone[key] = deepClone(value, cache);
      }
    } else {
      clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
  }
  function deepMerge$1(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
      return target;
    const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop];
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue);
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue);
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue);
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue);
      } else if (typeof sourceValue === "object" && sourceValue !== null) {
        merged[prop] = deepMerge$1(targetValue, sourceValue);
      } else {
        merged[prop] = sourceValue;
      }
    }
    return merged;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uv-ui-tools/libs/function/index.js:250", `uvui提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime == null ? void 0 : dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
      date2 = new Date(dateTime.replace(/-/g, "/"));
    } else {
      date2 = new Date(dateTime);
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format2 = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(`${key}[${i}]=${value[i]}`);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
      if (/s$/.test(value))
        return value;
      return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value))
      return valueNum;
    if (/s$/.test(value))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value) {
    return `00${value}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "uv-form-item");
    const form = $parent.call(instance, "uv-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value);
    } else {
      obj[key] = value;
    }
  }
  function page() {
    var _a;
    const pages2 = getCurrentPages();
    const route = (_a = pages2[pages2.length - 1]) == null ? void 0 : _a.route;
    return `/${route ? route : ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getHistoryPage(back = 0) {
    const pages2 = getCurrentPages();
    const len = pages2.length;
    return pages2[len - 1 + back];
  }
  function setConfig({
    props: props2 = {},
    config = {},
    color = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color);
    uni.$uv.zIndex = deepMerge2(uni.$uv.zIndex, zIndex);
  }
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge: deepMerge$1,
    error,
    formValidate,
    getDuration,
    getHistoryPage,
    getProperty,
    getPx,
    guid,
    os,
    padZero,
    page,
    pages,
    priceFormat,
    queryParams,
    random,
    randomArray,
    range: range$1,
    setConfig,
    setProperty,
    sleep,
    sys,
    timeFormat,
    timeFrom,
    toast,
    trim,
    type2icon
  }, Symbol.toStringTag, { value: "Module" }));
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$uv.getRect = this.$uvGetRect;
    },
    created() {
      this.$uv.getRect = this.$uvGetRect;
    },
    computed: {
      $uv() {
        return {
          ...index,
          test
        };
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `uv-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uvGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$uv.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uvOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && array$1(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const icons = {
    "uvicon-level": "e68e",
    "uvicon-checkbox-mark": "e659",
    "uvicon-folder": "e694",
    "uvicon-movie": "e67c",
    "uvicon-star-fill": "e61e",
    "uvicon-star": "e618",
    "uvicon-phone-fill": "e6ac",
    "uvicon-phone": "e6ba",
    "uvicon-apple-fill": "e635",
    "uvicon-backspace": "e64d",
    "uvicon-attach": "e640",
    "uvicon-cut": "e65e",
    "uvicon-empty-address": "e68a",
    "uvicon-empty-favor": "e662",
    "uvicon-reload": "e627",
    "uvicon-order": "e695",
    "uvicon-server-man": "e601",
    "uvicon-search": "e632",
    "uvicon-fingerprint": "e6aa",
    "uvicon-more-dot-fill": "e66f",
    "uvicon-scan": "e631",
    "uvicon-map": "e61d",
    "uvicon-map-fill": "e6a8",
    "uvicon-tags": "e621",
    "uvicon-tags-fill": "e613",
    "uvicon-eye": "e664",
    "uvicon-eye-fill": "e697",
    "uvicon-eye-off": "e69c",
    "uvicon-eye-off-outline": "e688",
    "uvicon-mic": "e66d",
    "uvicon-mic-off": "e691",
    "uvicon-calendar": "e65c",
    "uvicon-trash": "e623",
    "uvicon-trash-fill": "e6ce",
    "uvicon-play-left": "e6bf",
    "uvicon-play-right": "e6b3",
    "uvicon-minus": "e614",
    "uvicon-plus": "e625",
    "uvicon-info-circle": "e69f",
    "uvicon-info-circle-fill": "e6a7",
    "uvicon-question-circle": "e622",
    "uvicon-question-circle-fill": "e6bc",
    "uvicon-close": "e65a",
    "uvicon-checkmark": "e64a",
    "uvicon-checkmark-circle": "e643",
    "uvicon-checkmark-circle-fill": "e668",
    "uvicon-setting": "e602",
    "uvicon-setting-fill": "e6d0",
    "uvicon-heart": "e6a2",
    "uvicon-heart-fill": "e68b",
    "uvicon-camera": "e642",
    "uvicon-camera-fill": "e650",
    "uvicon-more-circle": "e69e",
    "uvicon-more-circle-fill": "e684",
    "uvicon-chat": "e656",
    "uvicon-chat-fill": "e63f",
    "uvicon-bag": "e647",
    "uvicon-error-circle": "e66e",
    "uvicon-error-circle-fill": "e655",
    "uvicon-close-circle": "e64e",
    "uvicon-close-circle-fill": "e666",
    "uvicon-share": "e629",
    "uvicon-share-fill": "e6bb",
    "uvicon-share-square": "e6c4",
    "uvicon-shopping-cart": "e6cb",
    "uvicon-shopping-cart-fill": "e630",
    "uvicon-bell": "e651",
    "uvicon-bell-fill": "e604",
    "uvicon-list": "e690",
    "uvicon-list-dot": "e6a9",
    "uvicon-zhifubao-circle-fill": "e617",
    "uvicon-weixin-circle-fill": "e6cd",
    "uvicon-weixin-fill": "e620",
    "uvicon-qq-fill": "e608",
    "uvicon-qq-circle-fill": "e6b9",
    "uvicon-moments-circel-fill": "e6c2",
    "uvicon-moments": "e6a0",
    "uvicon-facebook-circle-fill": "e661",
    "uvicon-facebook": "e674",
    "uvicon-car": "e64f",
    "uvicon-car-fill": "e648",
    "uvicon-warning-fill": "e6c7",
    "uvicon-warning": "e6c1",
    "uvicon-clock-fill": "e64b",
    "uvicon-clock": "e66c",
    "uvicon-edit-pen": "e65d",
    "uvicon-edit-pen-fill": "e679",
    "uvicon-email": "e673",
    "uvicon-email-fill": "e683",
    "uvicon-minus-circle": "e6a5",
    "uvicon-plus-circle": "e603",
    "uvicon-plus-circle-fill": "e611",
    "uvicon-file-text": "e687",
    "uvicon-file-text-fill": "e67f",
    "uvicon-pushpin": "e6d1",
    "uvicon-pushpin-fill": "e6b6",
    "uvicon-grid": "e68c",
    "uvicon-grid-fill": "e698",
    "uvicon-play-circle": "e6af",
    "uvicon-play-circle-fill": "e62a",
    "uvicon-pause-circle-fill": "e60c",
    "uvicon-pause": "e61c",
    "uvicon-pause-circle": "e696",
    "uvicon-gift-fill": "e6b0",
    "uvicon-gift": "e680",
    "uvicon-kefu-ermai": "e660",
    "uvicon-server-fill": "e610",
    "uvicon-coupon-fill": "e64c",
    "uvicon-coupon": "e65f",
    "uvicon-integral": "e693",
    "uvicon-integral-fill": "e6b1",
    "uvicon-home-fill": "e68e",
    "uvicon-home": "e67b",
    "uvicon-account": "e63a",
    "uvicon-account-fill": "e653",
    "uvicon-thumb-down-fill": "e628",
    "uvicon-thumb-down": "e60a",
    "uvicon-thumb-up": "e612",
    "uvicon-thumb-up-fill": "e62c",
    "uvicon-lock-fill": "e6a6",
    "uvicon-lock-open": "e68d",
    "uvicon-lock-opened-fill": "e6a1",
    "uvicon-lock": "e69d",
    "uvicon-red-packet": "e6c3",
    "uvicon-photo-fill": "e6b4",
    "uvicon-photo": "e60d",
    "uvicon-volume-off-fill": "e6c8",
    "uvicon-volume-off": "e6bd",
    "uvicon-volume-fill": "e624",
    "uvicon-volume": "e605",
    "uvicon-download": "e670",
    "uvicon-arrow-up-fill": "e636",
    "uvicon-arrow-down-fill": "e638",
    "uvicon-play-left-fill": "e6ae",
    "uvicon-play-right-fill": "e6ad",
    "uvicon-arrow-downward": "e634",
    "uvicon-arrow-leftward": "e63b",
    "uvicon-arrow-rightward": "e644",
    "uvicon-arrow-upward": "e641",
    "uvicon-arrow-down": "e63e",
    "uvicon-arrow-right": "e63c",
    "uvicon-arrow-left": "e646",
    "uvicon-arrow-up": "e633",
    "uvicon-skip-back-left": "e6c5",
    "uvicon-skip-forward-right": "e61f",
    "uvicon-rewind-left": "e62f",
    "uvicon-arrow-right-double": "e639",
    "uvicon-arrow-left-double": "e637",
    "uvicon-empty-data": "e671",
    "uvicon-man": "e675",
    "uvicon-woman": "e626",
    "uvicon-zh": "e6d3",
    "uvicon-en": "e6b8",
    "uvicon-twitte": "e607",
    "uvicon-twitter-circle-fill": "e6cf"
  };
  const props$f = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: "16px"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: null
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uvicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "15px"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: "3px"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: ""
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: false
      },
      ...(_f = (_e = uni.$uv) == null ? void 0 : _e.props) == null ? void 0 : _f.icon
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$p = {
    name: "uv-icon",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$f],
    data() {
      return {
        colorType: [
          "primary",
          "success",
          "info",
          "error",
          "warning"
        ]
      };
    },
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix);
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && this.colorType.includes(this.color))
          classes.push("uv-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.$uv.addUnit(this.size),
          lineHeight: this.$uv.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$uv.addUnit(this.top)
        };
        if (this.color && !this.colorType.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$uv.addUnit(this.width) : this.$uv.addUnit(this.size);
        style.height = this.height ? this.$uv.addUnit(this.height) : this.$uv.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        const code2 = icons["uvicon-" + this.name];
        return code2 ? unescape(`%u${code2}`) : ["uvicon"].indexOf(this.customPrefix) > -1 ? this.name : "";
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-icon", ["uv-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "uv-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["uv-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "uv-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$uv.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$uv.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  const props$e = {
    props: {
      // 输入的值
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框类型
      // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
      // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
      // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
      // text-文本输入键盘
      type: {
        type: String,
        default: "text"
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用状态时的背景色
      disabledColor: {
        type: String,
        default: "#f5f7fa"
      },
      // 是否显示清除控件
      clearable: {
        type: Boolean,
        default: false
      },
      // 是否密码类型
      password: {
        type: Boolean,
        default: false
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: -1
      },
      // 	输入框为空时的占位符
      placeholder: {
        type: String,
        default: null
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: "input-placeholder"
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: "color: #c0c4cc"
      },
      // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
      // https://uniapp.dcloud.io/component/input
      // https://uniapp.dcloud.io/component/textarea
      confirmType: {
        type: String,
        default: "done"
      },
      // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
      confirmHold: {
        type: Boolean,
        default: false
      },
      // focus时，点击页面的时候不收起键盘，微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      // 自动获取焦点
      // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
      autoBlur: {
        type: Boolean,
        default: false
      },
      // 指定focus时光标的位置
      cursor: {
        type: [String, Number],
        default: -1
      },
      // 输入框聚焦时底部与键盘的距离
      cursorSpacing: {
        type: [String, Number],
        default: 30
      },
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      selectionStart: {
        type: [String, Number],
        default: -1
      },
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [String, Number],
        default: -1
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 输入框内容对齐方式，可选值为：left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // 输入框字体的大小
      fontSize: {
        type: [String, Number],
        default: "14px"
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 输入框前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 前置图标样式，对象或字符串
      prefixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 输入框后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 后置图标样式，对象或字符串
      suffixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
      border: {
        type: String,
        default: "surround"
      },
      // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
      readonly: {
        type: Boolean,
        default: false
      },
      // 输入框形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      },
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.input
    }
  };
  const _sfc_main$o = {
    name: "uv-input",
    mixins: [mpMixin, mixin, props$e],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
        firstChange: true,
        // value绑定值的变化是由内部还是外部引起的
        changeFromInner: false,
        // 过滤处理方法
        innerFormatter: (value) => value
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal, oldVal) {
          this.innerValue = newVal;
          this.firstChange = false;
          this.changeFromInner = false;
        }
      }
    },
    computed: {
      // 是否显示清除控件
      isShowClear() {
        const { clearable, readonly, focused, innerValue } = this;
        return !!clearable && !readonly && !!focused && innerValue !== "";
      },
      // 组件的类名
      inputClass() {
        let classes = [], { border, disabled, shape } = this;
        border === "surround" && (classes = classes.concat(["uv-border", "uv-input--radius"]));
        classes.push(`uv-input--${shape}`);
        border === "bottom" && (classes = classes.concat([
          "uv-border-bottom",
          "uv-input--no-radius"
        ]));
        return classes.join(" ");
      },
      // 组件的样式
      wrapperStyle() {
        const style = {};
        if (this.disabled) {
          style.backgroundColor = this.disabledColor;
        }
        if (this.border === "none") {
          style.padding = "0";
        } else {
          style.paddingTop = "6px";
          style.paddingBottom = "6px";
          style.paddingLeft = "9px";
          style.paddingRight = "9px";
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 输入框的样式
      inputStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
        return style;
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      // 当键盘输入时，触发input事件
      onInput(e) {
        let { value = "" } = e.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value);
        this.innerValue = value;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 输入框失去焦点时触发
      onBlur(event) {
        this.$emit("blur", event.detail.value);
        this.$uv.sleep(50).then(() => {
          this.focused = false;
        });
        this.$uv.formValidate(this, "blur");
      },
      // 输入框聚焦时触发
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      // 点击完成按钮时触发
      onConfirm(event) {
        this.$emit("confirm", this.innerValue);
      },
      // 键盘高度发生变化的时候触发此事件
      // 兼容性：微信小程序2.7.0+、App 3.1.0+
      onkeyboardheightchange() {
        this.$emit("keyboardheightchange");
      },
      // 内容发生变化，进行处理
      valueChange() {
        const value = this.innerValue;
        this.$nextTick(() => {
          this.$emit("update:modelValue", value);
          this.changeFromInner = true;
          this.$emit("change", value);
          this.$uv.formValidate(this, "change");
        });
      },
      // 点击清除控件
      onClear() {
        this.innerValue = "";
        this.$nextTick(() => {
          this.valueChange();
          this.$emit("clear");
        });
      },
      /**
       * 在安卓nvue上，事件无法冒泡
       * 在某些时间，我们希望监听uv-from-item的点击事件，此时会导致点击uv-form-item内的uv-input后
       * 无法触发uv-form-item的点击事件，这里通过手动调用uv-form-item的方法进行触发
       */
      clickHandler() {
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-input", $options.inputClass]),
        style: vue.normalizeStyle([$options.wrapperStyle])
      },
      [
        vue.createElementVNode("view", { class: "uv-input__content" }, [
          vue.createElementVNode("view", { class: "uv-input__content__prefix-icon" }, [
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.prefixIcon,
                size: "18",
                customStyle: _ctx.prefixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ]),
          vue.createElementVNode("view", {
            class: "uv-input__content__field-wrapper",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
          }, [
            vue.createCommentVNode(" 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时\r\n				为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined\r\n			 "),
            vue.createElementVNode("input", {
              class: "uv-input__content__field-wrapper__field",
              style: vue.normalizeStyle([$options.inputStyle]),
              type: _ctx.type,
              focus: _ctx.focus,
              cursor: _ctx.cursor,
              value: $data.innerValue,
              "auto-blur": _ctx.autoBlur,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              placeholder: _ctx.placeholder,
              "placeholder-style": _ctx.placeholderStyle,
              "placeholder-class": _ctx.placeholderClass,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              "hold-keyboard": _ctx.holdKeyboard,
              "cursor-spacing": _ctx.cursorSpacing,
              "adjust-position": _ctx.adjustPosition,
              "selection-end": _ctx.selectionEnd,
              "selection-start": _ctx.selectionStart,
              password: _ctx.password || _ctx.type === "password" || void 0,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
              onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
              onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args)),
              onClick: _cache[5] || (_cache[5] = () => {
              })
            }, null, 44, ["type", "focus", "cursor", "value", "auto-blur", "disabled", "maxlength", "placeholder", "placeholder-style", "placeholder-class", "confirm-type", "confirm-hold", "hold-keyboard", "cursor-spacing", "adjust-position", "selection-end", "selection-start", "password", "ignoreCompositionEvent"])
          ]),
          $options.isShowClear ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-input__content__clear",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "close",
              size: "11",
              color: "#ffffff",
              customStyle: "line-height: 12px"
            })
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uv-input__content__subfix-icon" }, [
            vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
              _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.suffixIcon,
                size: "18",
                customStyle: _ctx.suffixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ])
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-651602aa"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-input/components/uv-input/uv-input.vue"]]);
  class MPAnimation {
    constructor(options2, _this) {
      this.options = options2;
      this.animation = uni.createAnimation({
        ...options2
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type2, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type2)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type2 === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type2}(${args + unit}) `;
      } else {
        styles.styles[type2] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type2) => {
    MPAnimation.prototype[type2] = function(...args) {
      this.animation[type2](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$n = {
    name: "uv-transition",
    mixins: [mpMixin, mixin],
    emits: ["click", "change"],
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: false
      },
      // 使用的动画模式
      mode: {
        type: [Array, String, null],
        default() {
          return "fade";
        }
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: "ease-out"
      },
      customClass: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 初始化动画条件
      transformStyles() {
        const style = {
          transform: this.transform,
          opacity: this.opacity,
          ...this.$uv.addStyle(this.customStyle),
          "transition-duration": `${this.duration / 1e3}s`
        };
        return this.$uv.addStyle(style, "string");
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: this.timingFunction,
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uv-transition/components/uv-transition/uv-transition.vue:161", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过渡动画
      close(type2) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type2) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type3, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type3)[mode];
          } else {
            styles.transform += this.animationType(type3)[mode] + " ";
          }
        };
        if (typeof this.mode === "string") {
          buildStyle(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildStyle(type2, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type2) {
        let buildTranfrom = (type3, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type3 ? 0 : 1;
          } else {
            aniNum = type3 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type3 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type3 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type3 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type3 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.mode === "string") {
          buildTranfrom(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildTranfrom(type2, mode);
          });
        }
        return this.animation;
      },
      animationType(type2) {
        return {
          fade: type2 ? 1 : 0,
          "slide-top": `translateY(${type2 ? "0" : "-100%"})`,
          "slide-right": `translateX(${type2 ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type2 ? "0" : "100%"})`,
          "slide-left": `translateX(${type2 ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type2 ? 1 : 0.8}) scaleY(${type2 ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type2 ? 1 : 1.2}) scaleY(${type2 ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-transition/components/uv-transition/uv-transition.vue"]]);
  const props$d = {
    props: {
      color: {
        type: String,
        default: "#d6d7d9"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: 0
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: false
      },
      ...(_j = (_i = uni.$uv) == null ? void 0 : _i.props) == null ? void 0 : _j.line
    }
  };
  const _sfc_main$m = {
    name: "uv-line",
    mixins: [mpMixin, mixin, props$d],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-dcf8cb8f"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);
  const props$c = {
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [Boolean],
        default: false
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      leftIconStyle: {
        type: [String, Object],
        default: ""
      },
      ...(_l = (_k = uni.$uv) == null ? void 0 : _k.props) == null ? void 0 : _l.formItem
    }
  };
  const _sfc_main$l = {
    name: "uv-form-item",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {
        // 错误提示语
        message: "",
        parentData: {
          // 提示文本的位置
          labelPosition: "left",
          // 提示文本对齐方式
          labelAlign: "left",
          // 提示文本的样式
          labelStyle: {},
          // 提示文本的宽度
          labelWidth: 45,
          // 错误提示方式
          errorType: "message"
        }
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          this.$uv.error("uv-form-item需要结合uv-form组件使用");
        }
      },
      // 获取父组件的参数
      updateParentData() {
        this.getParentData("uv-form");
      },
      // 移除uv-form-item的校验结果
      clearValidate() {
        this.message = null;
      },
      // 清空当前的组件的校验结果，并重置为初始值
      resetField() {
        const value = this.$uv.getProperty(this.parent.originalModel, this.prop);
        this.$uv.setProperty(this.parent.model, this.prop, value);
        this.message = null;
      },
      // 点击组件
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$2);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_2$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form-item" }, [
      vue.createElementVNode(
        "view",
        {
          class: "uv-form-item__body",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
          style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), {
            flexDirection: (_ctx.labelPosition || $data.parentData.labelPosition) === "left" ? "row" : "column"
          }])
        },
        [
          vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
          vue.renderSlot(_ctx.$slots, "label", {}, () => [
            vue.createCommentVNode(" {{required}} "),
            _ctx.required || _ctx.leftIcon || _ctx.label ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "uv-form-item__body__left",
                style: vue.normalizeStyle({
                  width: _ctx.$uv.addUnit(_ctx.labelWidth || $data.parentData.labelWidth),
                  marginBottom: $data.parentData.labelPosition === "left" ? 0 : "5px"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                vue.createElementVNode("view", { class: "uv-form-item__body__left__content" }, [
                  vue.createCommentVNode(" nvue不支持伪元素before "),
                  _ctx.required ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "uv-form-item__body__left__content__required"
                  }, "*")) : vue.createCommentVNode("v-if", true),
                  _ctx.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "uv-form-item__body__left__content__icon"
                  }, [
                    vue.createVNode(_component_uv_icon, {
                      name: _ctx.leftIcon,
                      "custom-style": _ctx.leftIconStyle
                    }, null, 8, ["name", "custom-style"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    {
                      class: "uv-form-item__body__left__content__label",
                      style: vue.normalizeStyle([$data.parentData.labelStyle, {
                        justifyContent: $data.parentData.labelAlign === "left" ? "flex-start" : $data.parentData.labelAlign === "center" ? "center" : "flex-end"
                      }])
                    },
                    vue.toDisplayString(_ctx.label),
                    5
                    /* TEXT, STYLE */
                  )
                ])
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          vue.createElementVNode("view", { class: "uv-form-item__body__right" }, [
            vue.createElementVNode("view", { class: "uv-form-item__body__right__content" }, [
              vue.createElementVNode("view", { class: "uv-form-item__body__right__content__slot" }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "item__body__right__content__icon" }, [
                vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
              ])
            ])
          ])
        ],
        4
        /* STYLE */
      ),
      vue.createElementVNode("view", { class: "uv-form-item__body__right__message__box" }, [
        vue.renderSlot(_ctx.$slots, "error", {}, () => [
          !!$data.message && $data.parentData.errorType === "message" ? (vue.openBlock(), vue.createBlock(_component_uv_transition, {
            key: 0,
            show: true,
            duration: 100,
            mode: "slide-top"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "text",
                {
                  class: "uv-form-item__body__right__message",
                  style: vue.normalizeStyle({
                    marginLeft: _ctx.$uv.addUnit($data.parentData.labelPosition === "top" ? 0 : _ctx.labelWidth || $data.parentData.labelWidth)
                  })
                },
                vue.toDisplayString($data.message),
                5
                /* TEXT, STYLE */
              )
            ]),
            _: 1
            /* STABLE */
          })) : vue.createCommentVNode("v-if", true)
        ], true)
      ]),
      _ctx.borderBottom ? (vue.openBlock(), vue.createBlock(_component_uv_line, {
        key: 0,
        color: $data.message && $data.parentData.errorType === "border-bottom" ? "#f56c6c" : "#d6d7d9"
      }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-d1e73275"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-form/components/uv-form-item/uv-form-item.vue"]]);
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex$1(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex$1(startColor);
      if (i === step - 1)
        hex = rgbToHex$1(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex$1(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const props$b = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 颜色
      color: {
        type: String,
        default: "#909193"
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: "#909193"
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: false
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: "spinner"
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: 24
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: 15
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 动画模式 https://www.runoob.com/cssref/css3-pr-animation-timing-function.html
      timingFunction: {
        type: String,
        default: "linear"
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: 1200
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: ""
      },
      ...(_n = (_m = uni.$uv) == null ? void 0 : _m.props) == null ? void 0 : _n.loadingIcon
    }
  };
  const _sfc_main$k = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$b],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-loading-icon", [_ctx.vertical && "uv-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-loading-icon__spinner", [`uv-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "uv-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-loading-icon__text",
            style: vue.normalizeStyle({
              fontSize: _ctx.$uv.addUnit(_ctx.textSize),
              color: _ctx.textColor
            })
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-29b619ea"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const props$a = {
    props: {
      // 是否细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，info，primary，error，warning，success
      type: {
        type: String,
        default: "info"
      },
      // 按钮尺寸，large，normal，small，mini
      size: {
        type: String,
        default: "normal"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 加载中提示文字
      loadingText: {
        type: [String, Number],
        default: ""
      },
      // 加载状态图标类型
      loadingMode: {
        type: String,
        default: "spinner"
      },
      // 加载图标大小
      loadingSize: {
        type: [String, Number],
        default: 14
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: true
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: true
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 0
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 0
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 200
      },
      // 按钮文字，之所以通过props传入，是因为slot传入的话
      // nvue中无法控制文字的样式
      text: {
        type: [String, Number],
        default: ""
      },
      // 按钮图标
      icon: {
        type: String,
        default: ""
      },
      // 按钮图标颜色
      iconColor: {
        type: String,
        default: "#000000"
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: {
        type: String,
        default: ""
      },
      ...(_p = (_o = uni.$uv) == null ? void 0 : _o.props) == null ? void 0 : _p.button
    }
  };
  const _sfc_main$j = {
    name: "uv-button",
    mixins: [mpMixin, mixin, props$a],
    emits: ["click"],
    data() {
      return {};
    },
    computed: {
      // 生成bem风格的类名
      bemClass() {
        if (!this.color) {
          return this.bem(
            "button",
            ["type", "shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        } else {
          return this.bem(
            "button",
            ["shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        }
      },
      loadingColor() {
        if (this.plain) {
          return this.color ? this.color : "#3c9cff";
        }
        if (this.type === "info") {
          return "#c9c9c9";
        }
        return "rgb(200, 200, 200)";
      },
      iconColorCom() {
        if (this.iconColor)
          return this.iconColor;
        if (this.plain) {
          return this.color ? this.color : this.type;
        } else {
          return this.type === "info" ? "#000000" : "#ffffff";
        }
      },
      baseColor() {
        let style = {};
        if (this.color) {
          style.color = this.plain ? this.color : "white";
          if (!this.plain) {
            style["background-color"] = this.color;
          }
          if (this.color.indexOf("gradient") !== -1) {
            style.borderTopWidth = 0;
            style.borderRightWidth = 0;
            style.borderBottomWidth = 0;
            style.borderLeftWidth = 0;
            if (!this.plain) {
              style.backgroundImage = this.color;
            }
          } else {
            style.borderColor = this.color;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
        }
        return style;
      },
      // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
      nvueTextStyle() {
        let style = {};
        if (this.type === "info") {
          style.color = "#323233";
        }
        if (this.color) {
          style.color = this.plain ? this.color : "white";
        }
        style.fontSize = this.textSize + "px";
        return style;
      },
      // 字体大小
      textSize() {
        let fontSize = 14, { size } = this;
        if (size === "large")
          fontSize = 16;
        if (size === "normal")
          fontSize = 14;
        if (size === "small")
          fontSize = 12;
        if (size === "mini")
          fontSize = 10;
        return fontSize;
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          throttle(() => {
            this.$emit("click");
          }, this.throttleTime);
        }
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$2);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    return vue.openBlock(), vue.createElementBlock("button", {
      "hover-start-time": Number(_ctx.hoverStartTime),
      "hover-stay-time": Number(_ctx.hoverStayTime),
      "form-type": _ctx.formType,
      "open-type": _ctx.openType,
      "app-parameter": _ctx.appParameter,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      "send-message-title": _ctx.sendMessageTitle,
      "send-message-path": _ctx.sendMessagePath,
      lang: _ctx.lang,
      "data-name": _ctx.dataName,
      "session-from": _ctx.sessionFrom,
      "send-message-img": _ctx.sendMessageImg,
      "show-message-card": _ctx.showMessageCard,
      "hover-class": !_ctx.disabled && !_ctx.loading ? "uv-button--active" : "",
      class: vue.normalizeClass(["uv-button uv-reset-button", $options.bemClass]),
      style: vue.normalizeStyle([$options.baseColor, _ctx.$uv.addStyle(_ctx.customStyle)]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createVNode(_component_uv_loading_icon, {
            mode: _ctx.loadingMode,
            size: _ctx.loadingSize * 1.15,
            color: $options.loadingColor
          }, null, 8, ["mode", "size", "color"]),
          vue.createElementVNode(
            "text",
            {
              class: "uv-button__loading-text",
              style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
            },
            vue.toDisplayString(_ctx.loadingText || _ctx.text),
            5
            /* TEXT, STYLE */
          )
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: _ctx.icon,
            color: $options.iconColorCom,
            size: $options.textSize * 1.35,
            customStyle: { marginRight: "2px" }
          }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "text",
              {
                class: "uv-button__text",
                style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
              },
              vue.toDisplayString(_ctx.text),
              5
              /* TEXT, STYLE */
            )
          ], true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ], 14, ["hover-start-time", "hover-stay-time", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "send-message-path", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class"]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-ae8e42c7"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-button/components/uv-button/uv-button.vue"]]);
  const props$9 = {
    props: {
      // 当前form的需要验证字段的集合
      model: {
        type: Object,
        default: () => ({})
      },
      // 验证规则
      rules: {
        type: [Object, Function, Array],
        default: () => ({})
      },
      // 有错误时的提示方式，message-提示信息，toast-进行toast提示
      // border-bottom-下边框呈现红色，none-无提示
      errorType: {
        type: String,
        default: "message"
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: "left"
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: 45
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: "left"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default: () => ({})
      },
      ...(_r = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r.form
    }
  };
  const formatRegExp = /%[sdj%]/g;
  let warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every((e) => typeof e === "string")) {
          formatAppLog("warn", "at uni_modules/uv-form/components/uv-form/valid.js:28", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    const fields = {};
    errors.forEach((error2) => {
      const { field } = error2;
      fields[field] = fields[field] || [];
      fields[field].push(error2);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    let i = 1;
    const f = args[0];
    const len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      let str = String(f).replace(formatRegExp, (x) => {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (let arg = args[i]; i < len; arg = args[++i]) {
        str += ` ${arg}`;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue(value, type2) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value) && !value.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value === "string" && !value) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func2, callback) {
    const results = [];
    let total = 0;
    const arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach((a) => {
      func2(a, count);
    });
  }
  function asyncSerialArray(arr, func2, callback) {
    let index2 = 0;
    const arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      const original = index2;
      index2 += 1;
      if (original < arrLength) {
        func2(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    const ret = [];
    Object.keys(objArr).forEach((k) => {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func2, callback) {
    if (option.first) {
      const _pending = new Promise((resolve, reject) => {
        const next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        const flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func2, next);
      });
      _pending.catch((e) => e);
      return _pending;
    }
    let firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    const objArrKeys = Object.keys(objArr);
    const objArrLength = objArrKeys.length;
    let total = 0;
    const results = [];
    const pending = new Promise((resolve, reject) => {
      const next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach((key) => {
        const arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func2, next);
        } else {
          asyncParallelArray(arr, func2, next);
        }
      });
    });
    pending.catch((e) => e);
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge(target, source) {
    if (source) {
      for (const s in source) {
        if (source.hasOwnProperty(s)) {
          const value = source[s];
          if (typeof value === "object" && typeof target[s] === "object") {
            target[s] = { ...target[s], ...value };
          } else {
            target[s] = value;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value, source, errors, options2, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
      errors.push(format(options2.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value, source, errors, options2) {
    if (/^\s+$/.test(value) || value === "") {
      errors.push(format(options2.messages.whitespace, rule.fullField));
    }
  }
  const pattern = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer2(value) {
      return /^(-)?\d+$/.test(value);
    },
    float: function float(value) {
      return /^(-)?\d+(\.\d+)?$/.test(value);
    },
    array: function array2(value) {
      return Array.isArray(value);
    },
    regexp: function regexp2(value) {
      if (value instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value);
      } catch (e) {
        return false;
      }
    },
    date: function date2(value) {
      return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function";
    },
    number: function number2(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof +value === "number";
    },
    object: function object2(value) {
      return typeof value === "object" && !types.array(value);
    },
    method: function method2(value) {
      return typeof value === "function";
    },
    email: function email2(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url: function url2(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    hex: function hex(value) {
      return typeof value === "string" && !!value.match(pattern.hex);
    }
  };
  function type(rule, value, source, errors, options2) {
    if (rule.required && value === void 0) {
      required(rule, value, source, errors, options2);
      return;
    }
    const custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    const ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value)) {
        errors.push(format(options2.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value !== rule.type) {
      errors.push(format(options2.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range(rule, value, source, errors, options2) {
    const len = typeof rule.len === "number";
    const min = typeof rule.min === "number";
    const max = typeof rule.max === "number";
    const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    let val = value;
    let key = null;
    const num = typeof value === "number";
    const str = typeof value === "string";
    const arr = Array.isArray(value);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value.length;
    }
    if (str) {
      val = value.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options2.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options2.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options2.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options2.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  const ENUM = "enum";
  function enumerable(rule, value, source, errors, options2) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value) === -1) {
      errors.push(format(options2.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1(rule, value, source, errors, options2) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value)) {
          errors.push(format(options2.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        const _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value)) {
          errors.push(format(options2.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }
  }
  const rules = {
    required,
    whitespace,
    type,
    range,
    enum: enumerable,
    pattern: pattern$1
  };
  function string(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2, "string");
      if (!isEmptyValue(value, "string")) {
        rules.type(rule, value, source, errors, options2);
        rules.range(rule, value, source, errors, options2);
        rules.pattern(rule, value, source, errors, options2);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value, source, errors, options2);
        }
      }
    }
    callback(errors);
  }
  function method(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function number(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value === "") {
        value = void 0;
      }
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options2);
        rules.range(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function regexp(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (!isEmptyValue(value)) {
        rules.type(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function integer(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options2);
        rules.range(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options2);
        rules.range(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function array(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2, "array");
      if (!isEmptyValue(value, "array")) {
        rules.type(rule, value, source, errors, options2);
        rules.range(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function object(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  const ENUM$1 = "enum";
  function enumerable$1(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (value !== void 0) {
        rules[ENUM$1](rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (!isEmptyValue(value, "string")) {
        rules.pattern(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function date(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
      if (!isEmptyValue(value)) {
        let dateObject;
        if (typeof value === "number") {
          dateObject = new Date(value);
        } else {
          dateObject = value;
        }
        rules.type(rule, dateObject, source, errors, options2);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options2);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value, callback, source, options2) {
    const errors = [];
    const type2 = Array.isArray(value) ? "array" : typeof value;
    rules.required(rule, value, source, errors, options2, type2);
    callback(errors);
  }
  function type$1(rule, value, callback, source, options2) {
    const ruleType = rule.type;
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2, ruleType);
      if (!isEmptyValue(value, ruleType)) {
        rules.type(rule, value, source, errors, options2);
      }
    }
    callback(errors);
  }
  function any(rule, value, callback, source, options2) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options2);
    }
    callback(errors);
  }
  const validators = {
    string,
    method,
    number,
    boolean: _boolean,
    regexp,
    integer,
    float: floatFn,
    array,
    object,
    enum: enumerable$1,
    pattern: pattern$2,
    date,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      default: "Validation error on field %s",
      required: "%s is required",
      enum: "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        boolean: "%s is not a %s",
        integer: "%s is not an %s",
        float: "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        const cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  const messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      let z;
      let item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      const _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      let source = source_;
      let options2 = o;
      let callback = oc;
      if (typeof options2 === "function") {
        callback = options2;
        options2 = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        let i;
        let errors = [];
        let fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            let _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options2.messages) {
        let messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge(messages$1, options2.messages);
        options2.messages = messages$1;
      } else {
        options2.messages = this.messages();
      }
      let arr;
      let value;
      const series = {};
      const keys = options2.keys || Object.keys(this.rules);
      keys.forEach((z) => {
        arr = _this.rules[z];
        value = source[z];
        arr.forEach((r) => {
          let rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = { ...source };
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = { ...rule };
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value,
            source,
            field: z
          });
        });
      });
      const errorFields = {};
      return asyncMap(series, options2, (data, doIt) => {
        const { rule } = data;
        let deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return { ...schema, fullField: `${rule.fullField}.${key}` };
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          let errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options2.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options2.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options2.error) {
                errors = [options2.error(rule, format(options2.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            let fieldsSchema = {};
            if (rule.defaultField) {
              for (const k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = { ...fieldsSchema, ...data.rule.fields };
            for (const f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                const fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            const schema = new Schema(fieldsSchema);
            schema.messages(options2.messages);
            if (data.rule.options) {
              data.rule.options.messages = options2.messages;
              data.rule.options.error = options2.error;
            }
            schema.validate(data.value, data.rule.options || options2, (errs) => {
              const finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        let res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options2);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options2);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || `${rule.field} fails`);
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(() => cb(), (e) => cb(e));
        }
      }, (results) => {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      const keys = Object.keys(rule);
      const messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$i = {
    name: "uv-form",
    mixins: [mpMixin, mixin, props$9],
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        formRules: {},
        // 规则校验器
        validator: {},
        // 原始的model快照，用于resetFields方法重置表单时使用
        originalModel: null
      };
    },
    watch: {
      // 监听规则的变化
      rules: {
        immediate: true,
        handler(n) {
          this.setRules(n);
        }
      },
      // 监听属性的变化，通知子组件uv-form-item重新获取信息
      propsChange(n) {
        var _a;
        if ((_a = this.children) == null ? void 0 : _a.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      },
      // 监听model的初始值作为重置表单的快照
      model: {
        immediate: true,
        handler(n) {
          if (!this.originalModel) {
            this.originalModel = this.$uv.deepClone(n);
          }
        }
      }
    },
    computed: {
      propsChange() {
        return [
          this.errorType,
          this.borderBottom,
          this.labelPosition,
          this.labelWidth,
          this.labelAlign,
          this.labelStyle
        ];
      }
    },
    created() {
      this.children = [];
    },
    methods: {
      // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
      setRules(rules2) {
        if (Object.keys(rules2).length === 0)
          return;
        if (Object.keys(this.model).length === 0) {
          this.$uv.error("设置rules，model必须设置！如果已经设置，请刷新页面。");
          return;
        }
        this.formRules = rules2;
        this.validator = new Schema(rules2);
      },
      // 清空所有uv-form-item组件的内容，本质上是调用了uv-form-item组件中的resetField()方法
      resetFields() {
        this.resetModel();
      },
      // 重置model为初始值的快照
      resetModel(obj) {
        this.children.map((child) => {
          const prop = child == null ? void 0 : child.prop;
          const value = this.$uv.getProperty(this.originalModel, prop);
          this.$uv.setProperty(this.model, prop, value);
        });
      },
      // 清空校验结果
      clearValidate(props2) {
        props2 = [].concat(props2);
        this.children.map((child) => {
          if (props2[0] === void 0 || props2.includes(child.prop)) {
            child.message = null;
          }
        });
      },
      // 对部分表单字段进行校验
      async validateField(value, callback, event = null) {
        this.$nextTick(() => {
          const errorsRes = [];
          value = [].concat(value);
          this.children.map((child) => {
            const childErrors = [];
            if (value.includes(child.prop)) {
              const propertyVal = this.$uv.getProperty(
                this.model,
                child.prop
              );
              const propertyChain = child.prop.split(".");
              const propertyName = propertyChain[propertyChain.length - 1];
              const rule = this.formRules[child.prop];
              if (!rule)
                return;
              const rules2 = [].concat(rule);
              for (let i = 0; i < rules2.length; i++) {
                const ruleItem = rules2[i];
                const trigger = [].concat(ruleItem == null ? void 0 : ruleItem.trigger);
                if (event && !trigger.includes(event))
                  continue;
                const validator = new Schema({
                  [propertyName]: ruleItem
                });
                validator.validate(
                  {
                    [propertyName]: propertyVal
                  },
                  (errors, fields) => {
                    var _a, _b;
                    if (this.$uv.test.array(errors)) {
                      errorsRes.push(...errors);
                      childErrors.push(...errors);
                    }
                    child.message = ((_a = childErrors[0]) == null ? void 0 : _a.message) ? (_b = childErrors[0]) == null ? void 0 : _b.message : null;
                  }
                );
              }
            }
          });
          typeof callback === "function" && callback(errorsRes);
        });
      },
      // 校验全部数据
      validate(callback) {
        if (Object.keys(this.formRules).length === 0) {
          this.$uv.error("未设置rules，请看文档说明！如果已经设置，请刷新页面。");
          return;
        }
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            const formItemProps = this.children.map(
              (item) => item.prop
            );
            this.validateField(formItemProps, (errors) => {
              if (errors.length) {
                this.errorType === "toast" && this.$uv.toast(errors[0].message);
                reject(errors);
              } else {
                resolve(true);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form" }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-form/components/uv-form/uv-form.vue"]]);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var mqttExports = {};
  var mqtt$1 = {
    get exports() {
      return mqttExports;
    },
    set exports(v) {
      mqttExports = v;
    }
  };
  (function(module, exports) {
    (function(f) {
      {
        module.exports = f();
      }
    })(function() {
      return function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof commonjsRequire && commonjsRequire;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        return r;
      }()({ 1: [function(require, module2, exports2) {
        (function(process2, global2) {
          var EventEmitter = require("events").EventEmitter;
          var Store = require("./store");
          var mqttPacket = require("mqtt-packet");
          var Writable = require("readable-stream").Writable;
          var inherits = require("inherits");
          var reInterval = require("reinterval");
          var validations = require("./validations");
          var xtend = require("xtend");
          var debug = require("debug")("mqttjs:client");
          var setImmediate = global2.setImmediate || function(callback) {
            process2.nextTick(callback);
          };
          var defaultConnectOptions = {
            keepalive: 60,
            reschedulePings: true,
            protocolId: "MQTT",
            protocolVersion: 4,
            reconnectPeriod: 1e3,
            connectTimeout: 30 * 1e3,
            clean: true,
            resubscribe: true
          };
          var socketErrors = [
            "ECONNREFUSED",
            "EADDRINUSE",
            "ECONNRESET",
            "ENOTFOUND"
          ];
          var errors = {
            0: "",
            1: "Unacceptable protocol version",
            2: "Identifier rejected",
            3: "Server unavailable",
            4: "Bad username or password",
            5: "Not authorized",
            16: "No matching subscribers",
            17: "No subscription existed",
            128: "Unspecified error",
            129: "Malformed Packet",
            130: "Protocol Error",
            131: "Implementation specific error",
            132: "Unsupported Protocol Version",
            133: "Client Identifier not valid",
            134: "Bad User Name or Password",
            135: "Not authorized",
            136: "Server unavailable",
            137: "Server busy",
            138: "Banned",
            139: "Server shutting down",
            140: "Bad authentication method",
            141: "Keep Alive timeout",
            142: "Session taken over",
            143: "Topic Filter invalid",
            144: "Topic Name invalid",
            145: "Packet identifier in use",
            146: "Packet Identifier not found",
            147: "Receive Maximum exceeded",
            148: "Topic Alias invalid",
            149: "Packet too large",
            150: "Message rate too high",
            151: "Quota exceeded",
            152: "Administrative action",
            153: "Payload format invalid",
            154: "Retain not supported",
            155: "QoS not supported",
            156: "Use another server",
            157: "Server moved",
            158: "Shared Subscriptions not supported",
            159: "Connection rate exceeded",
            160: "Maximum connect time",
            161: "Subscription Identifiers not supported",
            162: "Wildcard Subscriptions not supported"
          };
          function defaultId() {
            return "mqttjs_" + Math.random().toString(16).substr(2, 8);
          }
          function sendPacket(client2, packet, cb) {
            debug("sendPacket :: packet: %O", packet);
            debug("sendPacket :: emitting `packetsend`");
            client2.emit("packetsend", packet);
            debug("sendPacket :: writing to stream");
            var result = mqttPacket.writeToStream(packet, client2.stream, client2.options);
            debug("sendPacket :: writeToStream result %s", result);
            if (!result && cb) {
              debug("sendPacket :: handle events on `drain` once through callback.");
              client2.stream.once("drain", cb);
            } else if (cb) {
              debug("sendPacket :: invoking cb");
              cb();
            }
          }
          function flush(queue) {
            if (queue) {
              debug("flush: queue exists? %b", !!queue);
              Object.keys(queue).forEach(function(messageId) {
                if (typeof queue[messageId].cb === "function") {
                  queue[messageId].cb(new Error("Connection closed"));
                  delete queue[messageId];
                }
              });
            }
          }
          function flushVolatile(queue) {
            if (queue) {
              debug("flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function");
              Object.keys(queue).forEach(function(messageId) {
                if (queue[messageId].volatile && typeof queue[messageId].cb === "function") {
                  queue[messageId].cb(new Error("Connection closed"));
                  delete queue[messageId];
                }
              });
            }
          }
          function storeAndSend(client2, packet, cb, cbStorePut) {
            debug("storeAndSend :: store packet with cmd %s to outgoingStore", packet.cmd);
            client2.outgoingStore.put(packet, function storedPacket(err) {
              if (err) {
                return cb && cb(err);
              }
              cbStorePut();
              sendPacket(client2, packet, cb);
            });
          }
          function nop(error2) {
            debug("nop ::", error2);
          }
          function MqttClient(streamBuilder, options2) {
            var k;
            var that = this;
            if (!(this instanceof MqttClient)) {
              return new MqttClient(streamBuilder, options2);
            }
            this.options = options2 || {};
            for (k in defaultConnectOptions) {
              if (typeof this.options[k] === "undefined") {
                this.options[k] = defaultConnectOptions[k];
              } else {
                this.options[k] = options2[k];
              }
            }
            debug("MqttClient :: options.protocol", options2.protocol);
            debug("MqttClient :: options.protocolVersion", options2.protocolVersion);
            debug("MqttClient :: options.username", options2.username);
            debug("MqttClient :: options.keepalive", options2.keepalive);
            debug("MqttClient :: options.reconnectPeriod", options2.reconnectPeriod);
            debug("MqttClient :: options.rejectUnauthorized", options2.rejectUnauthorized);
            this.options.clientId = typeof options2.clientId === "string" ? options2.clientId : defaultId();
            debug("MqttClient :: clientId", this.options.clientId);
            this.options.customHandleAcks = options2.protocolVersion === 5 && options2.customHandleAcks ? options2.customHandleAcks : function() {
              arguments[3](0);
            };
            this.streamBuilder = streamBuilder;
            this.outgoingStore = options2.outgoingStore || new Store();
            this.incomingStore = options2.incomingStore || new Store();
            this.queueQoSZero = options2.queueQoSZero === void 0 ? true : options2.queueQoSZero;
            this._resubscribeTopics = {};
            this.messageIdToTopic = {};
            this.pingTimer = null;
            this.connected = false;
            this.disconnecting = false;
            this.queue = [];
            this.connackTimer = null;
            this.reconnectTimer = null;
            this._storeProcessing = false;
            this._packetIdsDuringStoreProcessing = {};
            this.nextId = Math.max(1, Math.floor(Math.random() * 65535));
            this.outgoing = {};
            this._firstConnection = true;
            this.on("connect", function() {
              var queue = this.queue;
              function deliver() {
                var entry = queue.shift();
                debug("deliver :: entry %o", entry);
                var packet = null;
                if (!entry) {
                  return;
                }
                packet = entry.packet;
                debug("deliver :: call _sendPacket for %o", packet);
                that._sendPacket(
                  packet,
                  function(err) {
                    if (entry.cb) {
                      entry.cb(err);
                    }
                    deliver();
                  }
                );
              }
              debug("connect :: sending queued packets");
              deliver();
            });
            this.on("close", function() {
              debug("close :: connected set to `false`");
              this.connected = false;
              debug("close :: clearing connackTimer");
              clearTimeout(this.connackTimer);
              debug("close :: clearing ping timer");
              if (that.pingTimer !== null) {
                that.pingTimer.clear();
                that.pingTimer = null;
              }
              debug("close :: calling _setupReconnect");
              this._setupReconnect();
            });
            EventEmitter.call(this);
            debug("MqttClient :: setting up stream");
            this._setupStream();
          }
          inherits(MqttClient, EventEmitter);
          MqttClient.prototype._setupStream = function() {
            var connectPacket;
            var that = this;
            var writable = new Writable();
            var parser = mqttPacket.parser(this.options);
            var completeParse = null;
            var packets = [];
            debug("_setupStream :: calling method to clear reconnect");
            this._clearReconnect();
            debug("_setupStream :: using streamBuilder provided to client to create stream");
            this.stream = this.streamBuilder(this);
            parser.on("packet", function(packet) {
              debug("parser :: on packet push to packets array.");
              packets.push(packet);
            });
            function nextTickWork() {
              if (packets.length) {
                process2.nextTick(work);
              } else {
                var done = completeParse;
                completeParse = null;
                done();
              }
            }
            function work() {
              debug("work :: getting next packet in queue");
              var packet = packets.shift();
              if (packet) {
                debug("work :: packet pulled from queue");
                that._handlePacket(packet, nextTickWork);
              } else {
                debug("work :: no packets in queue");
                var done = completeParse;
                completeParse = null;
                debug("work :: done flag is %s", !!done);
                if (done)
                  done();
              }
            }
            writable._write = function(buf, enc, done) {
              completeParse = done;
              debug("writable stream :: parsing buffer");
              parser.parse(buf);
              work();
            };
            function streamErrorHandler(error2) {
              debug("streamErrorHandler :: error", error2.message);
              if (socketErrors.includes(error2.code)) {
                debug("streamErrorHandler :: emitting error");
                that.emit("error", error2);
              } else {
                nop(error2);
              }
            }
            debug("_setupStream :: pipe stream to writable stream");
            this.stream.pipe(writable);
            this.stream.on("error", streamErrorHandler);
            this.stream.on("close", function() {
              debug("(%s)stream :: on close", that.options.clientId);
              flushVolatile(that.outgoing);
              debug("stream: emit close to MqttClient");
              that.emit("close");
            });
            debug("_setupStream: sending packet `connect`");
            connectPacket = Object.create(this.options);
            connectPacket.cmd = "connect";
            sendPacket(this, connectPacket);
            parser.on("error", this.emit.bind(this, "error"));
            if (this.options.properties) {
              if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData) {
                that.end(() => this.emit(
                  "error",
                  new Error("Packet has no Authentication Method")
                ));
                return this;
              }
              if (this.options.properties.authenticationMethod && this.options.authPacket && typeof this.options.authPacket === "object") {
                var authPacket = xtend({ cmd: "auth", reasonCode: 0 }, this.options.authPacket);
                sendPacket(this, authPacket);
              }
            }
            this.stream.setMaxListeners(1e3);
            clearTimeout(this.connackTimer);
            this.connackTimer = setTimeout(function() {
              debug("!!connectTimeout hit!! Calling _cleanUp with force `true`");
              that._cleanUp(true);
            }, this.options.connectTimeout);
          };
          MqttClient.prototype._handlePacket = function(packet, done) {
            var options2 = this.options;
            if (options2.protocolVersion === 5 && options2.properties && options2.properties.maximumPacketSize && options2.properties.maximumPacketSize < packet.length) {
              this.emit("error", new Error("exceeding packets size " + packet.cmd));
              this.end({ reasonCode: 149, properties: { reasonString: "Maximum packet size was exceeded" } });
              return this;
            }
            debug("_handlePacket :: emitting packetreceive");
            this.emit("packetreceive", packet);
            switch (packet.cmd) {
              case "publish":
                this._handlePublish(packet, done);
                break;
              case "puback":
              case "pubrec":
              case "pubcomp":
              case "suback":
              case "unsuback":
                this._handleAck(packet);
                done();
                break;
              case "pubrel":
                this._handlePubrel(packet, done);
                break;
              case "connack":
                this._handleConnack(packet);
                done();
                break;
              case "pingresp":
                this._handlePingresp(packet);
                done();
                break;
              case "disconnect":
                this._handleDisconnect(packet);
                done();
                break;
            }
          };
          MqttClient.prototype._checkDisconnecting = function(callback) {
            if (this.disconnecting) {
              if (callback) {
                callback(new Error("client disconnecting"));
              } else {
                this.emit("error", new Error("client disconnecting"));
              }
            }
            return this.disconnecting;
          };
          MqttClient.prototype.publish = function(topic, message, opts, callback) {
            debug("publish :: message `%s` to topic `%s`", message, topic);
            var packet;
            var options2 = this.options;
            if (typeof opts === "function") {
              callback = opts;
              opts = null;
            }
            var defaultOpts = { qos: 0, retain: false, dup: false };
            opts = xtend(defaultOpts, opts);
            if (this._checkDisconnecting(callback)) {
              return this;
            }
            packet = {
              cmd: "publish",
              topic,
              payload: message,
              qos: opts.qos,
              retain: opts.retain,
              messageId: this._nextId(),
              dup: opts.dup
            };
            if (options2.protocolVersion === 5) {
              packet.properties = opts.properties;
              if (!options2.properties && packet.properties && packet.properties.topicAlias || opts.properties && options2.properties && (opts.properties.topicAlias && options2.properties.topicAliasMaximum && opts.properties.topicAlias > options2.properties.topicAliasMaximum || !options2.properties.topicAliasMaximum && opts.properties.topicAlias)) {
                delete packet.properties.topicAlias;
              }
            }
            debug("publish :: qos", opts.qos);
            switch (opts.qos) {
              case 1:
              case 2:
                this.outgoing[packet.messageId] = {
                  volatile: false,
                  cb: callback || nop
                };
                if (this._storeProcessing) {
                  debug("_storeProcessing enabled");
                  this._packetIdsDuringStoreProcessing[packet.messageId] = false;
                  this._storePacket(packet, void 0, opts.cbStorePut);
                } else {
                  debug("MqttClient:publish: packet cmd: %s", packet.cmd);
                  this._sendPacket(packet, void 0, opts.cbStorePut);
                }
                break;
              default:
                if (this._storeProcessing) {
                  debug("_storeProcessing enabled");
                  this._storePacket(packet, callback, opts.cbStorePut);
                } else {
                  debug("MqttClient:publish: packet cmd: %s", packet.cmd);
                  this._sendPacket(packet, callback, opts.cbStorePut);
                }
                break;
            }
            return this;
          };
          MqttClient.prototype.subscribe = function() {
            var packet;
            var args = new Array(arguments.length);
            for (var i = 0; i < arguments.length; i++) {
              args[i] = arguments[i];
            }
            var subs = [];
            var obj = args.shift();
            var resubscribe = obj.resubscribe;
            var callback = args.pop() || nop;
            var opts = args.pop();
            var invalidTopic;
            var that = this;
            var version = this.options.protocolVersion;
            delete obj.resubscribe;
            if (typeof obj === "string") {
              obj = [obj];
            }
            if (typeof callback !== "function") {
              opts = callback;
              callback = nop;
            }
            invalidTopic = validations.validateTopics(obj);
            if (invalidTopic !== null) {
              setImmediate(callback, new Error("Invalid topic " + invalidTopic));
              return this;
            }
            if (this._checkDisconnecting(callback)) {
              debug("subscribe: discconecting true");
              return this;
            }
            var defaultOpts = {
              qos: 0
            };
            if (version === 5) {
              defaultOpts.nl = false;
              defaultOpts.rap = false;
              defaultOpts.rh = 0;
            }
            opts = xtend(defaultOpts, opts);
            if (Array.isArray(obj)) {
              obj.forEach(function(topic) {
                debug("subscribe: array topic %s", topic);
                if (!that._resubscribeTopics.hasOwnProperty(topic) || that._resubscribeTopics[topic].qos < opts.qos || resubscribe) {
                  var currentOpts = {
                    topic,
                    qos: opts.qos
                  };
                  if (version === 5) {
                    currentOpts.nl = opts.nl;
                    currentOpts.rap = opts.rap;
                    currentOpts.rh = opts.rh;
                    currentOpts.properties = opts.properties;
                  }
                  debug("subscribe: pushing topic `%s` and qos `%s` to subs list", currentOpts.topic, currentOpts.qos);
                  subs.push(currentOpts);
                }
              });
            } else {
              Object.keys(obj).forEach(function(k) {
                debug("subscribe: object topic %s", k);
                if (!that._resubscribeTopics.hasOwnProperty(k) || that._resubscribeTopics[k].qos < obj[k].qos || resubscribe) {
                  var currentOpts = {
                    topic: k,
                    qos: obj[k].qos
                  };
                  if (version === 5) {
                    currentOpts.nl = obj[k].nl;
                    currentOpts.rap = obj[k].rap;
                    currentOpts.rh = obj[k].rh;
                    currentOpts.properties = opts.properties;
                  }
                  debug("subscribe: pushing `%s` to subs list", currentOpts);
                  subs.push(currentOpts);
                }
              });
            }
            packet = {
              cmd: "subscribe",
              subscriptions: subs,
              qos: 1,
              retain: false,
              dup: false,
              messageId: this._nextId()
            };
            if (opts.properties) {
              packet.properties = opts.properties;
            }
            if (!subs.length) {
              callback(null, []);
              return;
            }
            if (this.options.resubscribe) {
              debug("subscribe :: resubscribe true");
              var topics = [];
              subs.forEach(function(sub) {
                if (that.options.reconnectPeriod > 0) {
                  var topic = { qos: sub.qos };
                  if (version === 5) {
                    topic.nl = sub.nl || false;
                    topic.rap = sub.rap || false;
                    topic.rh = sub.rh || 0;
                    topic.properties = sub.properties;
                  }
                  that._resubscribeTopics[sub.topic] = topic;
                  topics.push(sub.topic);
                }
              });
              that.messageIdToTopic[packet.messageId] = topics;
            }
            this.outgoing[packet.messageId] = {
              volatile: true,
              cb: function(err, packet2) {
                if (!err) {
                  var granted = packet2.granted;
                  for (var i2 = 0; i2 < granted.length; i2 += 1) {
                    subs[i2].qos = granted[i2];
                  }
                }
                callback(err, subs);
              }
            };
            debug("subscribe :: call _sendPacket");
            this._sendPacket(packet);
            return this;
          };
          MqttClient.prototype.unsubscribe = function() {
            var packet = {
              cmd: "unsubscribe",
              qos: 1,
              messageId: this._nextId()
            };
            var that = this;
            var args = new Array(arguments.length);
            for (var i = 0; i < arguments.length; i++) {
              args[i] = arguments[i];
            }
            var topic = args.shift();
            var callback = args.pop() || nop;
            var opts = args.pop();
            if (typeof topic === "string") {
              topic = [topic];
            }
            if (typeof callback !== "function") {
              opts = callback;
              callback = nop;
            }
            if (this._checkDisconnecting(callback)) {
              return this;
            }
            if (typeof topic === "string") {
              packet.unsubscriptions = [topic];
            } else if (Array.isArray(topic)) {
              packet.unsubscriptions = topic;
            }
            if (this.options.resubscribe) {
              packet.unsubscriptions.forEach(function(topic2) {
                delete that._resubscribeTopics[topic2];
              });
            }
            if (typeof opts === "object" && opts.properties) {
              packet.properties = opts.properties;
            }
            this.outgoing[packet.messageId] = {
              volatile: true,
              cb: callback
            };
            debug("unsubscribe: call _sendPacket");
            this._sendPacket(packet);
            return this;
          };
          MqttClient.prototype.end = function(force, opts, cb) {
            var that = this;
            debug("end :: (%s)", this.options.clientId);
            if (force == null || typeof force !== "boolean") {
              cb = opts || nop;
              opts = force;
              force = false;
              if (typeof opts !== "object") {
                cb = opts;
                opts = null;
                if (typeof cb !== "function") {
                  cb = nop;
                }
              }
            }
            if (typeof opts !== "object") {
              cb = opts;
              opts = null;
            }
            debug("end :: cb? %s", !!cb);
            cb = cb || nop;
            function closeStores() {
              debug("end :: closeStores: closing incoming and outgoing stores");
              that.disconnected = true;
              that.incomingStore.close(function() {
                that.outgoingStore.close(function() {
                  debug("end :: closeStores: emitting end");
                  that.emit("end");
                  if (cb) {
                    debug("end :: closeStores: invoking callback with args");
                    cb();
                  }
                });
              });
              if (that._deferredReconnect) {
                that._deferredReconnect();
              }
            }
            function finish() {
              debug("end :: (%s) :: finish :: calling _cleanUp with force %s", that.options.clientId, force);
              that._cleanUp(force, () => {
                debug("end :: finish :: calling process.nextTick on closeStores");
                process2.nextTick(closeStores.bind(that));
              }, opts);
            }
            if (this.disconnecting) {
              cb();
              return this;
            }
            this._clearReconnect();
            this.disconnecting = true;
            if (!force && Object.keys(this.outgoing).length > 0) {
              debug("end :: (%s) :: calling finish in 10ms once outgoing is empty", that.options.clientId);
              this.once("outgoingEmpty", setTimeout.bind(null, finish, 10));
            } else {
              debug("end :: (%s) :: immediately calling finish", that.options.clientId);
              finish();
            }
            return this;
          };
          MqttClient.prototype.removeOutgoingMessage = function(messageId) {
            var cb = this.outgoing[messageId] ? this.outgoing[messageId].cb : null;
            delete this.outgoing[messageId];
            this.outgoingStore.del({ messageId }, function() {
              cb(new Error("Message removed"));
            });
            return this;
          };
          MqttClient.prototype.reconnect = function(opts) {
            debug("client reconnect");
            var that = this;
            var f = function() {
              if (opts) {
                that.options.incomingStore = opts.incomingStore;
                that.options.outgoingStore = opts.outgoingStore;
              } else {
                that.options.incomingStore = null;
                that.options.outgoingStore = null;
              }
              that.incomingStore = that.options.incomingStore || new Store();
              that.outgoingStore = that.options.outgoingStore || new Store();
              that.disconnecting = false;
              that.disconnected = false;
              that._deferredReconnect = null;
              that._reconnect();
            };
            if (this.disconnecting && !this.disconnected) {
              this._deferredReconnect = f;
            } else {
              f();
            }
            return this;
          };
          MqttClient.prototype._reconnect = function() {
            debug("_reconnect: emitting reconnect to client");
            this.emit("reconnect");
            debug("_reconnect: calling _setupStream");
            this._setupStream();
          };
          MqttClient.prototype._setupReconnect = function() {
            var that = this;
            if (!that.disconnecting && !that.reconnectTimer && that.options.reconnectPeriod > 0) {
              if (!this.reconnecting) {
                debug("_setupReconnect :: emit `offline` state");
                this.emit("offline");
                debug("_setupReconnect :: set `reconnecting` to `true`");
                this.reconnecting = true;
              }
              debug("_setupReconnect :: setting reconnectTimer for %d ms", that.options.reconnectPeriod);
              that.reconnectTimer = setInterval(function() {
                debug("reconnectTimer :: reconnect triggered!");
                that._reconnect();
              }, that.options.reconnectPeriod);
            } else {
              debug("_setupReconnect :: doing nothing...");
            }
          };
          MqttClient.prototype._clearReconnect = function() {
            debug("_clearReconnect : clearing reconnect timer");
            if (this.reconnectTimer) {
              clearInterval(this.reconnectTimer);
              this.reconnectTimer = null;
            }
          };
          MqttClient.prototype._cleanUp = function(forced, done) {
            var opts = arguments[2];
            if (done) {
              debug("_cleanUp :: done callback provided for on stream close");
              this.stream.on("close", done);
            }
            debug("_cleanUp :: forced? %s", forced);
            if (forced) {
              if (this.options.reconnectPeriod === 0 && this.options.clean) {
                flush(this.outgoing);
              }
              debug("_cleanUp :: (%s) :: destroying stream", this.options.clientId);
              this.stream.destroy();
            } else {
              var packet = xtend({ cmd: "disconnect" }, opts);
              debug("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId);
              this._sendPacket(
                packet,
                setImmediate.bind(
                  null,
                  this.stream.end.bind(this.stream)
                )
              );
            }
            if (!this.disconnecting) {
              debug("_cleanUp :: client not disconnecting. Clearing and resetting reconnect.");
              this._clearReconnect();
              this._setupReconnect();
            }
            if (this.pingTimer !== null) {
              debug("_cleanUp :: clearing pingTimer");
              this.pingTimer.clear();
              this.pingTimer = null;
            }
            if (done && !this.connected) {
              debug("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId);
              this.stream.removeListener("close", done);
              done();
            }
          };
          MqttClient.prototype._sendPacket = function(packet, cb, cbStorePut) {
            debug("_sendPacket :: (%s) ::  start", this.options.clientId);
            cbStorePut = cbStorePut || nop;
            if (!this.connected) {
              debug("_sendPacket :: client not connected. Storing packet offline.");
              this._storePacket(packet, cb, cbStorePut);
              return;
            }
            this._shiftPingInterval();
            switch (packet.cmd) {
              case "publish":
                break;
              case "pubrel":
                storeAndSend(this, packet, cb, cbStorePut);
                return;
              default:
                sendPacket(this, packet, cb);
                return;
            }
            switch (packet.qos) {
              case 2:
              case 1:
                storeAndSend(this, packet, cb, cbStorePut);
                break;
              case 0:
              default:
                sendPacket(this, packet, cb);
                break;
            }
            debug("_sendPacket :: (%s) ::  end", this.options.clientId);
          };
          MqttClient.prototype._storePacket = function(packet, cb, cbStorePut) {
            debug("_storePacket :: packet: %o", packet);
            debug("_storePacket :: cb? %s", !!cb);
            cbStorePut = cbStorePut || nop;
            if ((packet.qos || 0) === 0 && this.queueQoSZero || packet.cmd !== "publish") {
              this.queue.push({ packet, cb });
            } else if (packet.qos > 0) {
              cb = this.outgoing[packet.messageId] ? this.outgoing[packet.messageId].cb : null;
              this.outgoingStore.put(packet, function(err) {
                if (err) {
                  return cb && cb(err);
                }
                cbStorePut();
              });
            } else if (cb) {
              cb(new Error("No connection to broker"));
            }
          };
          MqttClient.prototype._setupPingTimer = function() {
            debug("_setupPingTimer :: keepalive %d (seconds)", this.options.keepalive);
            var that = this;
            if (!this.pingTimer && this.options.keepalive) {
              this.pingResp = true;
              this.pingTimer = reInterval(function() {
                that._checkPing();
              }, this.options.keepalive * 1e3);
            }
          };
          MqttClient.prototype._shiftPingInterval = function() {
            if (this.pingTimer && this.options.keepalive && this.options.reschedulePings) {
              this.pingTimer.reschedule(this.options.keepalive * 1e3);
            }
          };
          MqttClient.prototype._checkPing = function() {
            debug("_checkPing :: checking ping...");
            if (this.pingResp) {
              debug("_checkPing :: ping response received. Clearing flag and sending `pingreq`");
              this.pingResp = false;
              this._sendPacket({ cmd: "pingreq" });
            } else {
              debug("_checkPing :: calling _cleanUp with force true");
              this._cleanUp(true);
            }
          };
          MqttClient.prototype._handlePingresp = function() {
            this.pingResp = true;
          };
          MqttClient.prototype._handleConnack = function(packet) {
            debug("_handleConnack");
            var options2 = this.options;
            var version = options2.protocolVersion;
            var rc = version === 5 ? packet.reasonCode : packet.returnCode;
            clearTimeout(this.connackTimer);
            if (packet.properties) {
              if (packet.properties.topicAliasMaximum) {
                if (!options2.properties) {
                  options2.properties = {};
                }
                options2.properties.topicAliasMaximum = packet.properties.topicAliasMaximum;
              }
              if (packet.properties.serverKeepAlive && options2.keepalive) {
                options2.keepalive = packet.properties.serverKeepAlive;
                this._shiftPingInterval();
              }
              if (packet.properties.maximumPacketSize) {
                if (!options2.properties) {
                  options2.properties = {};
                }
                options2.properties.maximumPacketSize = packet.properties.maximumPacketSize;
              }
            }
            if (rc === 0) {
              this.reconnecting = false;
              this._onConnect(packet);
            } else if (rc > 0) {
              var err = new Error("Connection refused: " + errors[rc]);
              err.code = rc;
              this.emit("error", err);
            }
          };
          MqttClient.prototype._handlePublish = function(packet, done) {
            debug("_handlePublish: packet %o", packet);
            done = typeof done !== "undefined" ? done : nop;
            var topic = packet.topic.toString();
            var message = packet.payload;
            var qos = packet.qos;
            var messageId = packet.messageId;
            var that = this;
            var options2 = this.options;
            var validReasonCodes = [0, 16, 128, 131, 135, 144, 145, 151, 153];
            debug("_handlePublish: qos %d", qos);
            switch (qos) {
              case 2: {
                options2.customHandleAcks(topic, message, packet, function(error2, code2) {
                  if (!(error2 instanceof Error)) {
                    code2 = error2;
                    error2 = null;
                  }
                  if (error2) {
                    return that.emit("error", error2);
                  }
                  if (validReasonCodes.indexOf(code2) === -1) {
                    return that.emit("error", new Error("Wrong reason code for pubrec"));
                  }
                  if (code2) {
                    that._sendPacket({ cmd: "pubrec", messageId, reasonCode: code2 }, done);
                  } else {
                    that.incomingStore.put(packet, function() {
                      that._sendPacket({ cmd: "pubrec", messageId }, done);
                    });
                  }
                });
                break;
              }
              case 1: {
                options2.customHandleAcks(topic, message, packet, function(error2, code2) {
                  if (!(error2 instanceof Error)) {
                    code2 = error2;
                    error2 = null;
                  }
                  if (error2) {
                    return that.emit("error", error2);
                  }
                  if (validReasonCodes.indexOf(code2) === -1) {
                    return that.emit("error", new Error("Wrong reason code for puback"));
                  }
                  if (!code2) {
                    that.emit("message", topic, message, packet);
                  }
                  that.handleMessage(packet, function(err) {
                    if (err) {
                      return done && done(err);
                    }
                    that._sendPacket({ cmd: "puback", messageId, reasonCode: code2 }, done);
                  });
                });
                break;
              }
              case 0:
                this.emit("message", topic, message, packet);
                this.handleMessage(packet, done);
                break;
              default:
                debug("_handlePublish: unknown QoS. Doing nothing.");
                break;
            }
          };
          MqttClient.prototype.handleMessage = function(packet, callback) {
            callback();
          };
          MqttClient.prototype._handleAck = function(packet) {
            var messageId = packet.messageId;
            var type2 = packet.cmd;
            var response = null;
            var cb = this.outgoing[messageId] ? this.outgoing[messageId].cb : null;
            var that = this;
            var err;
            if (!cb) {
              debug("_handleAck :: Server sent an ack in error. Ignoring.");
              return;
            }
            debug("_handleAck :: packet type", type2);
            switch (type2) {
              case "pubcomp":
              case "puback":
                var pubackRC = packet.reasonCode;
                if (pubackRC && pubackRC > 0 && pubackRC !== 16) {
                  err = new Error("Publish error: " + errors[pubackRC]);
                  err.code = pubackRC;
                  cb(err, packet);
                }
                delete this.outgoing[messageId];
                this.outgoingStore.del(packet, cb);
                break;
              case "pubrec":
                response = {
                  cmd: "pubrel",
                  qos: 2,
                  messageId
                };
                var pubrecRC = packet.reasonCode;
                if (pubrecRC && pubrecRC > 0 && pubrecRC !== 16) {
                  err = new Error("Publish error: " + errors[pubrecRC]);
                  err.code = pubrecRC;
                  cb(err, packet);
                } else {
                  this._sendPacket(response);
                }
                break;
              case "suback":
                delete this.outgoing[messageId];
                for (var grantedI = 0; grantedI < packet.granted.length; grantedI++) {
                  if ((packet.granted[grantedI] & 128) !== 0) {
                    var topics = this.messageIdToTopic[messageId];
                    if (topics) {
                      topics.forEach(function(topic) {
                        delete that._resubscribeTopics[topic];
                      });
                    }
                  }
                }
                cb(null, packet);
                break;
              case "unsuback":
                delete this.outgoing[messageId];
                cb(null);
                break;
              default:
                that.emit("error", new Error("unrecognized packet type"));
            }
            if (this.disconnecting && Object.keys(this.outgoing).length === 0) {
              this.emit("outgoingEmpty");
            }
          };
          MqttClient.prototype._handlePubrel = function(packet, callback) {
            debug("handling pubrel packet");
            callback = typeof callback !== "undefined" ? callback : nop;
            var messageId = packet.messageId;
            var that = this;
            var comp = { cmd: "pubcomp", messageId };
            that.incomingStore.get(packet, function(err, pub) {
              if (!err) {
                that.emit("message", pub.topic, pub.payload, pub);
                that.handleMessage(pub, function(err2) {
                  if (err2) {
                    return callback(err2);
                  }
                  that.incomingStore.del(pub, nop);
                  that._sendPacket(comp, callback);
                });
              } else {
                that._sendPacket(comp, callback);
              }
            });
          };
          MqttClient.prototype._handleDisconnect = function(packet) {
            this.emit("disconnect", packet);
          };
          MqttClient.prototype._nextId = function() {
            var id = this.nextId++;
            if (this.nextId === 65536) {
              this.nextId = 1;
            }
            return id;
          };
          MqttClient.prototype.getLastMessageId = function() {
            return this.nextId === 1 ? 65535 : this.nextId - 1;
          };
          MqttClient.prototype._resubscribe = function(connack) {
            debug("_resubscribe");
            var _resubscribeTopicsKeys = Object.keys(this._resubscribeTopics);
            if (!this._firstConnection && (this.options.clean || this.options.protocolVersion === 5 && !connack.sessionPresent) && _resubscribeTopicsKeys.length > 0) {
              if (this.options.resubscribe) {
                if (this.options.protocolVersion === 5) {
                  debug("_resubscribe: protocolVersion 5");
                  for (var topicI = 0; topicI < _resubscribeTopicsKeys.length; topicI++) {
                    var resubscribeTopic = {};
                    resubscribeTopic[_resubscribeTopicsKeys[topicI]] = this._resubscribeTopics[_resubscribeTopicsKeys[topicI]];
                    resubscribeTopic.resubscribe = true;
                    this.subscribe(resubscribeTopic, { properties: resubscribeTopic[_resubscribeTopicsKeys[topicI]].properties });
                  }
                } else {
                  this._resubscribeTopics.resubscribe = true;
                  this.subscribe(this._resubscribeTopics);
                }
              } else {
                this._resubscribeTopics = {};
              }
            }
            this._firstConnection = false;
          };
          MqttClient.prototype._onConnect = function(packet) {
            if (this.disconnected) {
              this.emit("connect", packet);
              return;
            }
            var that = this;
            this._setupPingTimer();
            this._resubscribe(packet);
            this.connected = true;
            function startStreamProcess() {
              var outStore = that.outgoingStore.createStream();
              function clearStoreProcessing() {
                that._storeProcessing = false;
                that._packetIdsDuringStoreProcessing = {};
              }
              that.once("close", remove);
              outStore.on("error", function(err) {
                clearStoreProcessing();
                that.removeListener("close", remove);
                that.emit("error", err);
              });
              function remove() {
                outStore.destroy();
                outStore = null;
                clearStoreProcessing();
              }
              function storeDeliver() {
                if (!outStore) {
                  return;
                }
                that._storeProcessing = true;
                var packet2 = outStore.read(1);
                var cb;
                if (!packet2) {
                  outStore.once("readable", storeDeliver);
                  return;
                }
                if (that._packetIdsDuringStoreProcessing[packet2.messageId]) {
                  storeDeliver();
                  return;
                }
                if (!that.disconnecting && !that.reconnectTimer) {
                  cb = that.outgoing[packet2.messageId] ? that.outgoing[packet2.messageId].cb : null;
                  that.outgoing[packet2.messageId] = {
                    volatile: false,
                    cb: function(err, status) {
                      if (cb) {
                        cb(err, status);
                      }
                      storeDeliver();
                    }
                  };
                  that._packetIdsDuringStoreProcessing[packet2.messageId] = true;
                  that._sendPacket(packet2);
                } else if (outStore.destroy) {
                  outStore.destroy();
                }
              }
              outStore.on("end", function() {
                var allProcessed = true;
                for (var id in that._packetIdsDuringStoreProcessing) {
                  if (!that._packetIdsDuringStoreProcessing[id]) {
                    allProcessed = false;
                    break;
                  }
                }
                if (allProcessed) {
                  clearStoreProcessing();
                  that.removeListener("close", remove);
                  that.emit("connect", packet);
                } else {
                  startStreamProcess();
                }
              });
              storeDeliver();
            }
            startStreamProcess();
          };
          module2.exports = MqttClient;
        }).call(this, require("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./store": 7, "./validations": 8, "_process": 100, "debug": 17, "events": 83, "inherits": 88, "mqtt-packet": 92, "readable-stream": 116, "reinterval": 117, "xtend": 140 }], 2: [function(require, module2, exports2) {
        (function(Buffer) {
          var Transform = require("readable-stream").Transform;
          var duplexify = require("duplexify");
          var base64 = require("base64-js");
          var my;
          var proxy;
          var stream;
          var isInitialized = false;
          function buildProxy() {
            var proxy2 = new Transform();
            proxy2._write = function(chunk, encoding, next) {
              my.sendSocketMessage({
                data: chunk.buffer,
                success: function() {
                  next();
                },
                fail: function() {
                  next(new Error());
                }
              });
            };
            proxy2._flush = function socketEnd(done) {
              my.closeSocket({
                success: function() {
                  done();
                }
              });
            };
            return proxy2;
          }
          function setDefaultOpts(opts) {
            if (!opts.hostname) {
              opts.hostname = "localhost";
            }
            if (!opts.path) {
              opts.path = "/";
            }
            if (!opts.wsOptions) {
              opts.wsOptions = {};
            }
          }
          function buildUrl(opts, client2) {
            var protocol = opts.protocol === "alis" ? "wss" : "ws";
            var url2 = protocol + "://" + opts.hostname + opts.path;
            if (opts.port && opts.port !== 80 && opts.port !== 443) {
              url2 = protocol + "://" + opts.hostname + ":" + opts.port + opts.path;
            }
            if (typeof opts.transformWsUrl === "function") {
              url2 = opts.transformWsUrl(url2, opts, client2);
            }
            return url2;
          }
          function bindEventHandler() {
            if (isInitialized)
              return;
            isInitialized = true;
            my.onSocketOpen(function() {
              stream.setReadable(proxy);
              stream.setWritable(proxy);
              stream.emit("connect");
            });
            my.onSocketMessage(function(res) {
              if (typeof res.data === "string") {
                var array2 = base64.toByteArray(res.data);
                var buffer = Buffer.from(array2);
                proxy.push(buffer);
              } else {
                var reader = new FileReader();
                reader.addEventListener("load", function() {
                  var data = reader.result;
                  if (data instanceof ArrayBuffer)
                    data = Buffer.from(data);
                  else
                    data = Buffer.from(data, "utf8");
                  proxy.push(data);
                });
                reader.readAsArrayBuffer(res.data);
              }
            });
            my.onSocketClose(function() {
              stream.end();
              stream.destroy();
            });
            my.onSocketError(function(res) {
              stream.destroy(res);
            });
          }
          function buildStream(client2, opts) {
            opts.hostname = opts.hostname || opts.host;
            if (!opts.hostname) {
              throw new Error("Could not determine host. Specify host manually.");
            }
            var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
            setDefaultOpts(opts);
            var url2 = buildUrl(opts, client2);
            my = opts.my;
            my.connectSocket({
              url: url2,
              protocols: websocketSubProtocol
            });
            proxy = buildProxy();
            stream = duplexify.obj();
            bindEventHandler();
            return stream;
          }
          module2.exports = buildStream;
        }).call(this, require("buffer").Buffer);
      }, { "base64-js": 10, "buffer": 12, "duplexify": 19, "readable-stream": 116 }], 3: [function(require, module2, exports2) {
        var net = require("net");
        var debug = require("debug")("mqttjs:tcp");
        function streamBuilder(client2, opts) {
          var port, host;
          opts.port = opts.port || 1883;
          opts.hostname = opts.hostname || opts.host || "localhost";
          port = opts.port;
          host = opts.hostname;
          debug("port %d and host %s", port, host);
          return net.createConnection(port, host);
        }
        module2.exports = streamBuilder;
      }, { "debug": 17, "net": 11 }], 4: [function(require, module2, exports2) {
        var tls = require("tls");
        var debug = require("debug")("mqttjs:tls");
        function buildBuilder(mqttClient, opts) {
          var connection;
          opts.port = opts.port || 8883;
          opts.host = opts.hostname || opts.host || "localhost";
          opts.servername = opts.host;
          opts.rejectUnauthorized = opts.rejectUnauthorized !== false;
          delete opts.path;
          debug("port %d host %s rejectUnauthorized %b", opts.port, opts.host, opts.rejectUnauthorized);
          connection = tls.connect(opts);
          connection.on("secureConnect", function() {
            if (opts.rejectUnauthorized && !connection.authorized) {
              connection.emit("error", new Error("TLS not authorized"));
            } else {
              connection.removeListener("error", handleTLSerrors);
            }
          });
          function handleTLSerrors(err) {
            if (opts.rejectUnauthorized) {
              mqttClient.emit("error", err);
            }
            connection.end();
          }
          connection.on("error", handleTLSerrors);
          return connection;
        }
        module2.exports = buildBuilder;
      }, { "debug": 17, "tls": 11 }], 5: [function(require, module2, exports2) {
        (function(process2) {
          var debug = require("debug")("mqttjs:ws");
          var websocket = require("websocket-stream");
          var urlModule = require("url");
          var WSS_OPTIONS = [
            "rejectUnauthorized",
            "ca",
            "cert",
            "key",
            "pfx",
            "passphrase"
          ];
          var IS_BROWSER = process2.title === "browser";
          function buildUrl(opts, client2) {
            var url2 = opts.protocol + "://" + opts.hostname + ":" + opts.port + opts.path;
            if (typeof opts.transformWsUrl === "function") {
              url2 = opts.transformWsUrl(url2, opts, client2);
            }
            return url2;
          }
          function setDefaultOpts(opts) {
            if (!opts.hostname) {
              opts.hostname = "localhost";
            }
            if (!opts.port) {
              if (opts.protocol === "wss") {
                opts.port = 443;
              } else {
                opts.port = 80;
              }
            }
            if (!opts.path) {
              opts.path = "/";
            }
            if (!opts.wsOptions) {
              opts.wsOptions = {};
            }
            if (!IS_BROWSER && opts.protocol === "wss") {
              WSS_OPTIONS.forEach(function(prop) {
                if (opts.hasOwnProperty(prop) && !opts.wsOptions.hasOwnProperty(prop)) {
                  opts.wsOptions[prop] = opts[prop];
                }
              });
            }
          }
          function createWebSocket(client2, opts) {
            debug("createWebSocket");
            var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
            setDefaultOpts(opts);
            var url2 = buildUrl(opts, client2);
            debug("url %s protocol %s", url2, websocketSubProtocol);
            return websocket(url2, [websocketSubProtocol], opts.wsOptions);
          }
          function streamBuilder(client2, opts) {
            return createWebSocket(client2, opts);
          }
          function browserStreamBuilder(client2, opts) {
            debug("browserStreamBuilder");
            if (!opts.hostname) {
              opts.hostname = opts.host;
            }
            if (!opts.hostname) {
              if (typeof document === "undefined") {
                throw new Error("Could not determine host. Specify host manually.");
              }
              var parsed = urlModule.parse(document.URL);
              opts.hostname = parsed.hostname;
              if (!opts.port) {
                opts.port = parsed.port;
              }
            }
            return createWebSocket(client2, opts);
          }
          if (IS_BROWSER) {
            module2.exports = browserStreamBuilder;
          } else {
            module2.exports = streamBuilder;
          }
        }).call(this, require("_process"));
      }, { "_process": 100, "debug": 17, "url": 132, "websocket-stream": 137 }], 6: [function(require, module2, exports2) {
        (function(process2, Buffer) {
          var Transform = require("readable-stream").Transform;
          var duplexify = require("duplexify");
          var socketTask;
          var proxy;
          var stream;
          function buildProxy() {
            var proxy2 = new Transform();
            proxy2._write = function(chunk, encoding, next) {
              socketTask.send({
                data: chunk.buffer,
                success: function() {
                  next();
                },
                fail: function(errMsg) {
                  next(new Error(errMsg));
                }
              });
            };
            proxy2._flush = function socketEnd(done) {
              socketTask.close({
                success: function() {
                  done();
                }
              });
            };
            return proxy2;
          }
          function setDefaultOpts(opts) {
            if (!opts.hostname) {
              opts.hostname = "localhost";
            }
            if (!opts.path) {
              opts.path = "/";
            }
            if (!opts.wsOptions) {
              opts.wsOptions = {};
            }
          }
          function buildUrl(opts, client2) {
            var protocol = opts.protocol === "wxs" ? "wss" : "ws";
            var url2 = protocol + "://" + opts.hostname + opts.path;
            if (opts.port && opts.port !== 80 && opts.port !== 443) {
              url2 = protocol + "://" + opts.hostname + ":" + opts.port + opts.path;
            }
            if (typeof opts.transformWsUrl === "function") {
              url2 = opts.transformWsUrl(url2, opts, client2);
            }
            return url2;
          }
          function bindEventHandler() {
            socketTask.onOpen(function() {
              stream.setReadable(proxy);
              stream.setWritable(proxy);
              stream.emit("connect");
            });
            socketTask.onMessage(function(res) {
              var data = res.data;
              if (data instanceof ArrayBuffer)
                data = Buffer.from(data);
              else
                data = Buffer.from(data, "utf8");
              proxy.push(data);
            });
            socketTask.onClose(function() {
              stream.end();
              stream.destroy();
            });
            socketTask.onError(function(res) {
              stream.destroy(new Error(res.errMsg));
            });
          }
          function buildStream(client2, opts) {
            opts.hostname = opts.hostname || opts.host;
            if (!opts.hostname) {
              throw new Error("Could not determine host. Specify host manually.");
            }
            var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
            setDefaultOpts(opts);
            var url2 = buildUrl(opts, client2);
            socketTask = wx.connectSocket({
              url: url2,
              protocols: [websocketSubProtocol]
            });
            proxy = buildProxy();
            stream = duplexify.obj();
            stream._destroy = function(err, cb) {
              socketTask.close({
                success: function() {
                  cb && cb(err);
                }
              });
            };
            var destroyRef = stream.destroy;
            stream.destroy = function() {
              stream.destroy = destroyRef;
              var self2 = this;
              process2.nextTick(function() {
                socketTask.close({
                  fail: function() {
                    self2._destroy(new Error());
                  }
                });
              });
            }.bind(stream);
            bindEventHandler();
            return stream;
          }
          module2.exports = buildStream;
        }).call(this, require("_process"), require("buffer").Buffer);
      }, { "_process": 100, "buffer": 12, "duplexify": 19, "readable-stream": 116 }], 7: [function(require, module2, exports2) {
        (function(process2) {
          var xtend = require("xtend");
          var Readable = require("readable-stream").Readable;
          var streamsOpts = { objectMode: true };
          var defaultStoreOptions = {
            clean: true
          };
          var Map2 = require("es6-map");
          function Store(options2) {
            if (!(this instanceof Store)) {
              return new Store(options2);
            }
            this.options = options2 || {};
            this.options = xtend(defaultStoreOptions, options2);
            this._inflights = new Map2();
          }
          Store.prototype.put = function(packet, cb) {
            this._inflights.set(packet.messageId, packet);
            if (cb) {
              cb();
            }
            return this;
          };
          Store.prototype.createStream = function() {
            var stream = new Readable(streamsOpts);
            var destroyed = false;
            var values = [];
            var i = 0;
            this._inflights.forEach(function(value, key) {
              values.push(value);
            });
            stream._read = function() {
              if (!destroyed && i < values.length) {
                this.push(values[i++]);
              } else {
                this.push(null);
              }
            };
            stream.destroy = function() {
              if (destroyed) {
                return;
              }
              var self2 = this;
              destroyed = true;
              process2.nextTick(function() {
                self2.emit("close");
              });
            };
            return stream;
          };
          Store.prototype.del = function(packet, cb) {
            packet = this._inflights.get(packet.messageId);
            if (packet) {
              this._inflights.delete(packet.messageId);
              cb(null, packet);
            } else if (cb) {
              cb(new Error("missing packet"));
            }
            return this;
          };
          Store.prototype.get = function(packet, cb) {
            packet = this._inflights.get(packet.messageId);
            if (packet) {
              cb(null, packet);
            } else if (cb) {
              cb(new Error("missing packet"));
            }
            return this;
          };
          Store.prototype.close = function(cb) {
            if (this.options.clean) {
              this._inflights = null;
            }
            if (cb) {
              cb();
            }
          };
          module2.exports = Store;
        }).call(this, require("_process"));
      }, { "_process": 100, "es6-map": 68, "readable-stream": 116, "xtend": 140 }], 8: [function(require, module2, exports2) {
        function validateTopic(topic) {
          var parts = topic.split("/");
          for (var i = 0; i < parts.length; i++) {
            if (parts[i] === "+") {
              continue;
            }
            if (parts[i] === "#") {
              return i === parts.length - 1;
            }
            if (parts[i].indexOf("+") !== -1 || parts[i].indexOf("#") !== -1) {
              return false;
            }
          }
          return true;
        }
        function validateTopics(topics) {
          if (topics.length === 0) {
            return "empty_topic_list";
          }
          for (var i = 0; i < topics.length; i++) {
            if (!validateTopic(topics[i])) {
              return topics[i];
            }
          }
          return null;
        }
        module2.exports = {
          validateTopics
        };
      }, {}], 9: [function(require, module2, exports2) {
        (function(process2) {
          var MqttClient = require("../client");
          var Store = require("../store");
          var url2 = require("url");
          var xtend = require("xtend");
          var debug = require("debug")("mqttjs");
          var protocols = {};
          if (process2.title !== "browser") {
            protocols.mqtt = require("./tcp");
            protocols.tcp = require("./tcp");
            protocols.ssl = require("./tls");
            protocols.tls = require("./tls");
            protocols.mqtts = require("./tls");
          } else {
            protocols.wx = require("./wx");
            protocols.wxs = require("./wx");
            protocols.ali = require("./ali");
            protocols.alis = require("./ali");
          }
          protocols.ws = require("./ws");
          protocols.wss = require("./ws");
          function parseAuthOptions(opts) {
            var matches;
            if (opts.auth) {
              matches = opts.auth.match(/^(.+):(.+)$/);
              if (matches) {
                opts.username = matches[1];
                opts.password = matches[2];
              } else {
                opts.username = opts.auth;
              }
            }
          }
          function connect(brokerUrl, opts) {
            debug("connecting to an MQTT broker...");
            if (typeof brokerUrl === "object" && !opts) {
              opts = brokerUrl;
              brokerUrl = null;
            }
            opts = opts || {};
            if (brokerUrl) {
              var parsed = url2.parse(brokerUrl, true);
              if (parsed.port != null) {
                parsed.port = Number(parsed.port);
              }
              opts = xtend(parsed, opts);
              if (opts.protocol === null) {
                throw new Error("Missing protocol");
              }
              opts.protocol = opts.protocol.replace(/:$/, "");
            }
            parseAuthOptions(opts);
            if (opts.query && typeof opts.query.clientId === "string") {
              opts.clientId = opts.query.clientId;
            }
            if (opts.cert && opts.key) {
              if (opts.protocol) {
                if (["mqtts", "wss", "wxs", "alis"].indexOf(opts.protocol) === -1) {
                  switch (opts.protocol) {
                    case "mqtt":
                      opts.protocol = "mqtts";
                      break;
                    case "ws":
                      opts.protocol = "wss";
                      break;
                    case "wx":
                      opts.protocol = "wxs";
                      break;
                    case "ali":
                      opts.protocol = "alis";
                      break;
                    default:
                      throw new Error('Unknown protocol for secure connection: "' + opts.protocol + '"!');
                  }
                }
              } else {
                throw new Error("Missing secure protocol key");
              }
            }
            if (!protocols[opts.protocol]) {
              var isSecure = ["mqtts", "wss"].indexOf(opts.protocol) !== -1;
              opts.protocol = [
                "mqtt",
                "mqtts",
                "ws",
                "wss",
                "wx",
                "wxs",
                "ali",
                "alis"
              ].filter(function(key, index2) {
                if (isSecure && index2 % 2 === 0) {
                  return false;
                }
                return typeof protocols[key] === "function";
              })[0];
            }
            if (opts.clean === false && !opts.clientId) {
              throw new Error("Missing clientId for unclean clients");
            }
            if (opts.protocol) {
              opts.defaultProtocol = opts.protocol;
            }
            function wrapper(client3) {
              if (opts.servers) {
                if (!client3._reconnectCount || client3._reconnectCount === opts.servers.length) {
                  client3._reconnectCount = 0;
                }
                opts.host = opts.servers[client3._reconnectCount].host;
                opts.port = opts.servers[client3._reconnectCount].port;
                opts.protocol = !opts.servers[client3._reconnectCount].protocol ? opts.defaultProtocol : opts.servers[client3._reconnectCount].protocol;
                opts.hostname = opts.host;
                client3._reconnectCount++;
              }
              debug("calling streambuilder for", opts.protocol);
              return protocols[opts.protocol](client3, opts);
            }
            var client2 = new MqttClient(wrapper, opts);
            client2.on("error", function() {
            });
            return client2;
          }
          module2.exports = connect;
          module2.exports.connect = connect;
          module2.exports.MqttClient = MqttClient;
          module2.exports.Store = Store;
        }).call(this, require("_process"));
      }, { "../client": 1, "../store": 7, "./ali": 2, "./tcp": 3, "./tls": 4, "./ws": 5, "./wx": 6, "_process": 100, "debug": 17, "url": 132, "xtend": 140 }], 10: [function(require, module2, exports2) {
        exports2.byteLength = byteLength;
        exports2.toByteArray = toByteArray;
        exports2.fromByteArray = fromByteArray;
        var lookup = [];
        var revLookup = [];
        var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
        var code2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code2.length; i < len; ++i) {
          lookup[i] = code2[i];
          revLookup[code2.charCodeAt(i)] = i;
        }
        revLookup["-".charCodeAt(0)] = 62;
        revLookup["_".charCodeAt(0)] = 63;
        function getLens(b64) {
          var len2 = b64.length;
          if (len2 % 4 > 0) {
            throw new Error("Invalid string. Length must be a multiple of 4");
          }
          var validLen = b64.indexOf("=");
          if (validLen === -1)
            validLen = len2;
          var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
          return [validLen, placeHoldersLen];
        }
        function byteLength(b64) {
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function _byteLength(b64, validLen, placeHoldersLen) {
          return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function toByteArray(b64) {
          var tmp;
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
          var curByte = 0;
          var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
          for (var i2 = 0; i2 < len2; i2 += 4) {
            tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
            arr[curByte++] = tmp >> 16 & 255;
            arr[curByte++] = tmp >> 8 & 255;
            arr[curByte++] = tmp & 255;
          }
          if (placeHoldersLen === 2) {
            tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
            arr[curByte++] = tmp & 255;
          }
          if (placeHoldersLen === 1) {
            tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
            arr[curByte++] = tmp >> 8 & 255;
            arr[curByte++] = tmp & 255;
          }
          return arr;
        }
        function tripletToBase64(num) {
          return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
        }
        function encodeChunk(uint8, start, end) {
          var tmp;
          var output = [];
          for (var i2 = start; i2 < end; i2 += 3) {
            tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
            output.push(tripletToBase64(tmp));
          }
          return output.join("");
        }
        function fromByteArray(uint8) {
          var tmp;
          var len2 = uint8.length;
          var extraBytes = len2 % 3;
          var parts = [];
          var maxChunkLength = 16383;
          for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
            parts.push(encodeChunk(
              uint8,
              i2,
              i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength
            ));
          }
          if (extraBytes === 1) {
            tmp = uint8[len2 - 1];
            parts.push(
              lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
            );
          } else if (extraBytes === 2) {
            tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
            parts.push(
              lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
            );
          }
          return parts.join("");
        }
      }, {}], 11: [function(require, module2, exports2) {
      }, {}], 12: [function(require, module2, exports2) {
        (function(Buffer) {
          var base64 = require("base64-js");
          var ieee754 = require("ieee754");
          exports2.Buffer = Buffer;
          exports2.SlowBuffer = SlowBuffer;
          exports2.INSPECT_MAX_BYTES = 50;
          var K_MAX_LENGTH = 2147483647;
          exports2.kMaxLength = K_MAX_LENGTH;
          Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
          if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
            formatAppLog(
              "error",
              "at node_modules/mqtt/dist/mqtt.js:2579",
              "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
            );
          }
          function typedArraySupport() {
            try {
              var arr = new Uint8Array(1);
              arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                return 42;
              } };
              return arr.foo() === 42;
            } catch (e) {
              return false;
            }
          }
          Object.defineProperty(Buffer.prototype, "parent", {
            enumerable: true,
            get: function() {
              if (!Buffer.isBuffer(this))
                return void 0;
              return this.buffer;
            }
          });
          Object.defineProperty(Buffer.prototype, "offset", {
            enumerable: true,
            get: function() {
              if (!Buffer.isBuffer(this))
                return void 0;
              return this.byteOffset;
            }
          });
          function createBuffer(length) {
            if (length > K_MAX_LENGTH) {
              throw new RangeError('The value "' + length + '" is invalid for option "size"');
            }
            var buf = new Uint8Array(length);
            buf.__proto__ = Buffer.prototype;
            return buf;
          }
          function Buffer(arg, encodingOrOffset, length) {
            if (typeof arg === "number") {
              if (typeof encodingOrOffset === "string") {
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              }
              return allocUnsafe(arg);
            }
            return from(arg, encodingOrOffset, length);
          }
          if (typeof Symbol !== "undefined" && Symbol.species != null && Buffer[Symbol.species] === Buffer) {
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true,
              enumerable: false,
              writable: false
            });
          }
          Buffer.poolSize = 8192;
          function from(value, encodingOrOffset, length) {
            if (typeof value === "string") {
              return fromString(value, encodingOrOffset);
            }
            if (ArrayBuffer.isView(value)) {
              return fromArrayLike(value);
            }
            if (value == null) {
              throw TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
              );
            }
            if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
              return fromArrayBuffer(value, encodingOrOffset, length);
            }
            if (typeof value === "number") {
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            }
            var valueOf = value.valueOf && value.valueOf();
            if (valueOf != null && valueOf !== value) {
              return Buffer.from(valueOf, encodingOrOffset, length);
            }
            var b = fromObject(value);
            if (b)
              return b;
            if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
              return Buffer.from(
                value[Symbol.toPrimitive]("string"),
                encodingOrOffset,
                length
              );
            }
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
            );
          }
          Buffer.from = function(value, encodingOrOffset, length) {
            return from(value, encodingOrOffset, length);
          };
          Buffer.prototype.__proto__ = Uint8Array.prototype;
          Buffer.__proto__ = Uint8Array;
          function assertSize(size) {
            if (typeof size !== "number") {
              throw new TypeError('"size" argument must be of type number');
            } else if (size < 0) {
              throw new RangeError('The value "' + size + '" is invalid for option "size"');
            }
          }
          function alloc(size, fill, encoding) {
            assertSize(size);
            if (size <= 0) {
              return createBuffer(size);
            }
            if (fill !== void 0) {
              return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
            }
            return createBuffer(size);
          }
          Buffer.alloc = function(size, fill, encoding) {
            return alloc(size, fill, encoding);
          };
          function allocUnsafe(size) {
            assertSize(size);
            return createBuffer(size < 0 ? 0 : checked(size) | 0);
          }
          Buffer.allocUnsafe = function(size) {
            return allocUnsafe(size);
          };
          Buffer.allocUnsafeSlow = function(size) {
            return allocUnsafe(size);
          };
          function fromString(string2, encoding) {
            if (typeof encoding !== "string" || encoding === "") {
              encoding = "utf8";
            }
            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            var length = byteLength(string2, encoding) | 0;
            var buf = createBuffer(length);
            var actual = buf.write(string2, encoding);
            if (actual !== length) {
              buf = buf.slice(0, actual);
            }
            return buf;
          }
          function fromArrayLike(array2) {
            var length = array2.length < 0 ? 0 : checked(array2.length) | 0;
            var buf = createBuffer(length);
            for (var i = 0; i < length; i += 1) {
              buf[i] = array2[i] & 255;
            }
            return buf;
          }
          function fromArrayBuffer(array2, byteOffset, length) {
            if (byteOffset < 0 || array2.byteLength < byteOffset) {
              throw new RangeError('"offset" is outside of buffer bounds');
            }
            if (array2.byteLength < byteOffset + (length || 0)) {
              throw new RangeError('"length" is outside of buffer bounds');
            }
            var buf;
            if (byteOffset === void 0 && length === void 0) {
              buf = new Uint8Array(array2);
            } else if (length === void 0) {
              buf = new Uint8Array(array2, byteOffset);
            } else {
              buf = new Uint8Array(array2, byteOffset, length);
            }
            buf.__proto__ = Buffer.prototype;
            return buf;
          }
          function fromObject(obj) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0;
              var buf = createBuffer(len);
              if (buf.length === 0) {
                return buf;
              }
              obj.copy(buf, 0, 0, len);
              return buf;
            }
            if (obj.length !== void 0) {
              if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
                return createBuffer(0);
              }
              return fromArrayLike(obj);
            }
            if (obj.type === "Buffer" && Array.isArray(obj.data)) {
              return fromArrayLike(obj.data);
            }
          }
          function checked(length) {
            if (length >= K_MAX_LENGTH) {
              throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
            }
            return length | 0;
          }
          function SlowBuffer(length) {
            if (+length != length) {
              length = 0;
            }
            return Buffer.alloc(+length);
          }
          Buffer.isBuffer = function isBuffer(b) {
            return b != null && b._isBuffer === true && b !== Buffer.prototype;
          };
          Buffer.compare = function compare(a, b) {
            if (isInstance(a, Uint8Array))
              a = Buffer.from(a, a.offset, a.byteLength);
            if (isInstance(b, Uint8Array))
              b = Buffer.from(b, b.offset, b.byteLength);
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
              );
            }
            if (a === b)
              return 0;
            var x = a.length;
            var y = b.length;
            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
              }
            }
            if (x < y)
              return -1;
            if (y < x)
              return 1;
            return 0;
          };
          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          };
          Buffer.concat = function concat(list, length) {
            if (!Array.isArray(list)) {
              throw new TypeError('"list" argument must be an Array of Buffers');
            }
            if (list.length === 0) {
              return Buffer.alloc(0);
            }
            var i;
            if (length === void 0) {
              length = 0;
              for (i = 0; i < list.length; ++i) {
                length += list[i].length;
              }
            }
            var buffer = Buffer.allocUnsafe(length);
            var pos = 0;
            for (i = 0; i < list.length; ++i) {
              var buf = list[i];
              if (isInstance(buf, Uint8Array)) {
                buf = Buffer.from(buf);
              }
              if (!Buffer.isBuffer(buf)) {
                throw new TypeError('"list" argument must be an Array of Buffers');
              }
              buf.copy(buffer, pos);
              pos += buf.length;
            }
            return buffer;
          };
          function byteLength(string2, encoding) {
            if (Buffer.isBuffer(string2)) {
              return string2.length;
            }
            if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
              return string2.byteLength;
            }
            if (typeof string2 !== "string") {
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
              );
            }
            var len = string2.length;
            var mustMatch = arguments.length > 2 && arguments[2] === true;
            if (!mustMatch && len === 0)
              return 0;
            var loweredCase = false;
            for (; ; ) {
              switch (encoding) {
                case "ascii":
                case "latin1":
                case "binary":
                  return len;
                case "utf8":
                case "utf-8":
                  return utf8ToBytes(string2).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return len * 2;
                case "hex":
                  return len >>> 1;
                case "base64":
                  return base64ToBytes(string2).length;
                default:
                  if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string2).length;
                  }
                  encoding = ("" + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          }
          Buffer.byteLength = byteLength;
          function slowToString(encoding, start, end) {
            var loweredCase = false;
            if (start === void 0 || start < 0) {
              start = 0;
            }
            if (start > this.length) {
              return "";
            }
            if (end === void 0 || end > this.length) {
              end = this.length;
            }
            if (end <= 0) {
              return "";
            }
            end >>>= 0;
            start >>>= 0;
            if (end <= start) {
              return "";
            }
            if (!encoding)
              encoding = "utf8";
            while (true) {
              switch (encoding) {
                case "hex":
                  return hexSlice(this, start, end);
                case "utf8":
                case "utf-8":
                  return utf8Slice(this, start, end);
                case "ascii":
                  return asciiSlice(this, start, end);
                case "latin1":
                case "binary":
                  return latin1Slice(this, start, end);
                case "base64":
                  return base64Slice(this, start, end);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return utf16leSlice(this, start, end);
                default:
                  if (loweredCase)
                    throw new TypeError("Unknown encoding: " + encoding);
                  encoding = (encoding + "").toLowerCase();
                  loweredCase = true;
              }
            }
          }
          Buffer.prototype._isBuffer = true;
          function swap(b, n, m) {
            var i = b[n];
            b[n] = b[m];
            b[m] = i;
          }
          Buffer.prototype.swap16 = function swap16() {
            var len = this.length;
            if (len % 2 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            }
            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1);
            }
            return this;
          };
          Buffer.prototype.swap32 = function swap32() {
            var len = this.length;
            if (len % 4 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            }
            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3);
              swap(this, i + 1, i + 2);
            }
            return this;
          };
          Buffer.prototype.swap64 = function swap64() {
            var len = this.length;
            if (len % 8 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            }
            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7);
              swap(this, i + 1, i + 6);
              swap(this, i + 2, i + 5);
              swap(this, i + 3, i + 4);
            }
            return this;
          };
          Buffer.prototype.toString = function toString() {
            var length = this.length;
            if (length === 0)
              return "";
            if (arguments.length === 0)
              return utf8Slice(this, 0, length);
            return slowToString.apply(this, arguments);
          };
          Buffer.prototype.toLocaleString = Buffer.prototype.toString;
          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b))
              throw new TypeError("Argument must be a Buffer");
            if (this === b)
              return true;
            return Buffer.compare(this, b) === 0;
          };
          Buffer.prototype.inspect = function inspect() {
            var str = "";
            var max = exports2.INSPECT_MAX_BYTES;
            str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
            if (this.length > max)
              str += " ... ";
            return "<Buffer " + str + ">";
          };
          Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
            if (isInstance(target, Uint8Array)) {
              target = Buffer.from(target, target.offset, target.byteLength);
            }
            if (!Buffer.isBuffer(target)) {
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
              );
            }
            if (start === void 0) {
              start = 0;
            }
            if (end === void 0) {
              end = target ? target.length : 0;
            }
            if (thisStart === void 0) {
              thisStart = 0;
            }
            if (thisEnd === void 0) {
              thisEnd = this.length;
            }
            if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
              throw new RangeError("out of range index");
            }
            if (thisStart >= thisEnd && start >= end) {
              return 0;
            }
            if (thisStart >= thisEnd) {
              return -1;
            }
            if (start >= end) {
              return 1;
            }
            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;
            if (this === target)
              return 0;
            var x = thisEnd - thisStart;
            var y = end - start;
            var len = Math.min(x, y);
            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);
            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i];
                y = targetCopy[i];
                break;
              }
            }
            if (x < y)
              return -1;
            if (y < x)
              return 1;
            return 0;
          };
          function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
            if (buffer.length === 0)
              return -1;
            if (typeof byteOffset === "string") {
              encoding = byteOffset;
              byteOffset = 0;
            } else if (byteOffset > 2147483647) {
              byteOffset = 2147483647;
            } else if (byteOffset < -2147483648) {
              byteOffset = -2147483648;
            }
            byteOffset = +byteOffset;
            if (numberIsNaN(byteOffset)) {
              byteOffset = dir ? 0 : buffer.length - 1;
            }
            if (byteOffset < 0)
              byteOffset = buffer.length + byteOffset;
            if (byteOffset >= buffer.length) {
              if (dir)
                return -1;
              else
                byteOffset = buffer.length - 1;
            } else if (byteOffset < 0) {
              if (dir)
                byteOffset = 0;
              else
                return -1;
            }
            if (typeof val === "string") {
              val = Buffer.from(val, encoding);
            }
            if (Buffer.isBuffer(val)) {
              if (val.length === 0) {
                return -1;
              }
              return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            } else if (typeof val === "number") {
              val = val & 255;
              if (typeof Uint8Array.prototype.indexOf === "function") {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                }
              }
              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
            }
            throw new TypeError("val must be string, number or Buffer");
          }
          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;
            if (encoding !== void 0) {
              encoding = String(encoding).toLowerCase();
              if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
                if (arr.length < 2 || val.length < 2) {
                  return -1;
                }
                indexSize = 2;
                arrLength /= 2;
                valLength /= 2;
                byteOffset /= 2;
              }
            }
            function read(buf, i2) {
              if (indexSize === 1) {
                return buf[i2];
              } else {
                return buf.readUInt16BE(i2 * indexSize);
              }
            }
            var i;
            if (dir) {
              var foundIndex = -1;
              for (i = byteOffset; i < arrLength; i++) {
                if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                  if (foundIndex === -1)
                    foundIndex = i;
                  if (i - foundIndex + 1 === valLength)
                    return foundIndex * indexSize;
                } else {
                  if (foundIndex !== -1)
                    i -= i - foundIndex;
                  foundIndex = -1;
                }
              }
            } else {
              if (byteOffset + valLength > arrLength)
                byteOffset = arrLength - valLength;
              for (i = byteOffset; i >= 0; i--) {
                var found = true;
                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                  }
                }
                if (found)
                  return i;
              }
            }
            return -1;
          }
          Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
            return this.indexOf(val, byteOffset, encoding) !== -1;
          };
          Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
          };
          Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
          };
          function hexWrite(buf, string2, offset, length) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;
            if (!length) {
              length = remaining;
            } else {
              length = Number(length);
              if (length > remaining) {
                length = remaining;
              }
            }
            var strLen = string2.length;
            if (length > strLen / 2) {
              length = strLen / 2;
            }
            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string2.substr(i * 2, 2), 16);
              if (numberIsNaN(parsed))
                return i;
              buf[offset + i] = parsed;
            }
            return i;
          }
          function utf8Write(buf, string2, offset, length) {
            return blitBuffer(utf8ToBytes(string2, buf.length - offset), buf, offset, length);
          }
          function asciiWrite(buf, string2, offset, length) {
            return blitBuffer(asciiToBytes(string2), buf, offset, length);
          }
          function latin1Write(buf, string2, offset, length) {
            return asciiWrite(buf, string2, offset, length);
          }
          function base64Write(buf, string2, offset, length) {
            return blitBuffer(base64ToBytes(string2), buf, offset, length);
          }
          function ucs2Write(buf, string2, offset, length) {
            return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length);
          }
          Buffer.prototype.write = function write(string2, offset, length, encoding) {
            if (offset === void 0) {
              encoding = "utf8";
              length = this.length;
              offset = 0;
            } else if (length === void 0 && typeof offset === "string") {
              encoding = offset;
              length = this.length;
              offset = 0;
            } else if (isFinite(offset)) {
              offset = offset >>> 0;
              if (isFinite(length)) {
                length = length >>> 0;
                if (encoding === void 0)
                  encoding = "utf8";
              } else {
                encoding = length;
                length = void 0;
              }
            } else {
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            }
            var remaining = this.length - offset;
            if (length === void 0 || length > remaining)
              length = remaining;
            if (string2.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
              throw new RangeError("Attempt to write outside buffer bounds");
            }
            if (!encoding)
              encoding = "utf8";
            var loweredCase = false;
            for (; ; ) {
              switch (encoding) {
                case "hex":
                  return hexWrite(this, string2, offset, length);
                case "utf8":
                case "utf-8":
                  return utf8Write(this, string2, offset, length);
                case "ascii":
                  return asciiWrite(this, string2, offset, length);
                case "latin1":
                case "binary":
                  return latin1Write(this, string2, offset, length);
                case "base64":
                  return base64Write(this, string2, offset, length);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return ucs2Write(this, string2, offset, length);
                default:
                  if (loweredCase)
                    throw new TypeError("Unknown encoding: " + encoding);
                  encoding = ("" + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          };
          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          };
          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf);
            } else {
              return base64.fromByteArray(buf.slice(start, end));
            }
          }
          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];
            var i = start;
            while (i < end) {
              var firstByte = buf[i];
              var codePoint = null;
              var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint;
                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 128) {
                      codePoint = firstByte;
                    }
                    break;
                  case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 192) === 128) {
                      tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                      if (tempCodePoint > 127) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                      tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                      if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                      tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                      if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                        codePoint = tempCodePoint;
                      }
                    }
                }
              }
              if (codePoint === null) {
                codePoint = 65533;
                bytesPerSequence = 1;
              } else if (codePoint > 65535) {
                codePoint -= 65536;
                res.push(codePoint >>> 10 & 1023 | 55296);
                codePoint = 56320 | codePoint & 1023;
              }
              res.push(codePoint);
              i += bytesPerSequence;
            }
            return decodeCodePointsArray(res);
          }
          var MAX_ARGUMENTS_LENGTH = 4096;
          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;
            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints);
            }
            var res = "";
            var i = 0;
            while (i < len) {
              res += String.fromCharCode.apply(
                String,
                codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
              );
            }
            return res;
          }
          function asciiSlice(buf, start, end) {
            var ret = "";
            end = Math.min(buf.length, end);
            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 127);
            }
            return ret;
          }
          function latin1Slice(buf, start, end) {
            var ret = "";
            end = Math.min(buf.length, end);
            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i]);
            }
            return ret;
          }
          function hexSlice(buf, start, end) {
            var len = buf.length;
            if (!start || start < 0)
              start = 0;
            if (!end || end < 0 || end > len)
              end = len;
            var out = "";
            for (var i = start; i < end; ++i) {
              out += toHex(buf[i]);
            }
            return out;
          }
          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = "";
            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
            }
            return res;
          }
          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === void 0 ? len : ~~end;
            if (start < 0) {
              start += len;
              if (start < 0)
                start = 0;
            } else if (start > len) {
              start = len;
            }
            if (end < 0) {
              end += len;
              if (end < 0)
                end = 0;
            } else if (end > len) {
              end = len;
            }
            if (end < start)
              end = start;
            var newBuf = this.subarray(start, end);
            newBuf.__proto__ = Buffer.prototype;
            return newBuf;
          };
          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0)
              throw new RangeError("offset is not uint");
            if (offset + ext > length)
              throw new RangeError("Trying to access beyond buffer length");
          }
          Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert)
              checkOffset(offset, byteLength2, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength2 && (mul *= 256)) {
              val += this[offset + i] * mul;
            }
            return val;
          };
          Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) {
              checkOffset(offset, byteLength2, this.length);
            }
            var val = this[offset + --byteLength2];
            var mul = 1;
            while (byteLength2 > 0 && (mul *= 256)) {
              val += this[offset + --byteLength2] * mul;
            }
            return val;
          };
          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 1, this.length);
            return this[offset];
          };
          Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 2, this.length);
            return this[offset] | this[offset + 1] << 8;
          };
          Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 2, this.length);
            return this[offset] << 8 | this[offset + 1];
          };
          Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 4, this.length);
            return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
          };
          Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 4, this.length);
            return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
          };
          Buffer.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert)
              checkOffset(offset, byteLength2, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength2 && (mul *= 256)) {
              val += this[offset + i] * mul;
            }
            mul *= 128;
            if (val >= mul)
              val -= Math.pow(2, 8 * byteLength2);
            return val;
          };
          Buffer.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert)
              checkOffset(offset, byteLength2, this.length);
            var i = byteLength2;
            var mul = 1;
            var val = this[offset + --i];
            while (i > 0 && (mul *= 256)) {
              val += this[offset + --i] * mul;
            }
            mul *= 128;
            if (val >= mul)
              val -= Math.pow(2, 8 * byteLength2);
            return val;
          };
          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 1, this.length);
            if (!(this[offset] & 128))
              return this[offset];
            return (255 - this[offset] + 1) * -1;
          };
          Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 2, this.length);
            var val = this[offset] | this[offset + 1] << 8;
            return val & 32768 ? val | 4294901760 : val;
          };
          Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | this[offset] << 8;
            return val & 32768 ? val | 4294901760 : val;
          };
          Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 4, this.length);
            return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
          };
          Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 4, this.length);
            return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
          };
          Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
          };
          Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
          };
          Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
          };
          Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert)
              checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
          };
          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf))
              throw new TypeError('"buffer" argument must be a Buffer instance');
            if (value > max || value < min)
              throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length)
              throw new RangeError("Index out of range");
          }
          Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
              checkInt(this, value, offset, byteLength2, maxBytes, 0);
            }
            var mul = 1;
            var i = 0;
            this[offset] = value & 255;
            while (++i < byteLength2 && (mul *= 256)) {
              this[offset + i] = value / mul & 255;
            }
            return offset + byteLength2;
          };
          Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength2 = byteLength2 >>> 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
              checkInt(this, value, offset, byteLength2, maxBytes, 0);
            }
            var i = byteLength2 - 1;
            var mul = 1;
            this[offset + i] = value & 255;
            while (--i >= 0 && (mul *= 256)) {
              this[offset + i] = value / mul & 255;
            }
            return offset + byteLength2;
          };
          Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 1, 255, 0);
            this[offset] = value & 255;
            return offset + 1;
          };
          Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 2, 65535, 0);
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };
          Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 2, 65535, 0);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 255;
            return offset + 2;
          };
          Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 4294967295, 0);
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = value & 255;
            return offset + 4;
          };
          Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 4294967295, 0);
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 255;
            return offset + 4;
          };
          Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength2 - 1);
              checkInt(this, value, offset, byteLength2, limit - 1, -limit);
            }
            var i = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = value & 255;
            while (++i < byteLength2 && (mul *= 256)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (value / mul >> 0) - sub & 255;
            }
            return offset + byteLength2;
          };
          Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength2 - 1);
              checkInt(this, value, offset, byteLength2, limit - 1, -limit);
            }
            var i = byteLength2 - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i] = value & 255;
            while (--i >= 0 && (mul *= 256)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (value / mul >> 0) - sub & 255;
            }
            return offset + byteLength2;
          };
          Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 1, 127, -128);
            if (value < 0)
              value = 255 + value + 1;
            this[offset] = value & 255;
            return offset + 1;
          };
          Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 2, 32767, -32768);
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };
          Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 2, 32767, -32768);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 255;
            return offset + 2;
          };
          Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 2147483647, -2147483648);
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
            this[offset + 2] = value >>> 16;
            this[offset + 3] = value >>> 24;
            return offset + 4;
          };
          Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 2147483647, -2147483648);
            if (value < 0)
              value = 4294967295 + value + 1;
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 255;
            return offset + 4;
          };
          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length)
              throw new RangeError("Index out of range");
            if (offset < 0)
              throw new RangeError("Index out of range");
          }
          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              checkIEEE754(buf, value, offset, 4);
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
          }
          Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
            return writeFloat(this, value, offset, true, noAssert);
          };
          Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
            return writeFloat(this, value, offset, false, noAssert);
          };
          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              checkIEEE754(buf, value, offset, 8);
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
          }
          Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
            return writeDouble(this, value, offset, true, noAssert);
          };
          Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
            return writeDouble(this, value, offset, false, noAssert);
          };
          Buffer.prototype.copy = function copy(target, targetStart, start, end) {
            if (!Buffer.isBuffer(target))
              throw new TypeError("argument should be a Buffer");
            if (!start)
              start = 0;
            if (!end && end !== 0)
              end = this.length;
            if (targetStart >= target.length)
              targetStart = target.length;
            if (!targetStart)
              targetStart = 0;
            if (end > 0 && end < start)
              end = start;
            if (end === start)
              return 0;
            if (target.length === 0 || this.length === 0)
              return 0;
            if (targetStart < 0) {
              throw new RangeError("targetStart out of bounds");
            }
            if (start < 0 || start >= this.length)
              throw new RangeError("Index out of range");
            if (end < 0)
              throw new RangeError("sourceEnd out of bounds");
            if (end > this.length)
              end = this.length;
            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start;
            }
            var len = end - start;
            if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
              this.copyWithin(targetStart, start, end);
            } else if (this === target && start < targetStart && targetStart < end) {
              for (var i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start];
              }
            } else {
              Uint8Array.prototype.set.call(
                target,
                this.subarray(start, end),
                targetStart
              );
            }
            return len;
          };
          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            if (typeof val === "string") {
              if (typeof start === "string") {
                encoding = start;
                start = 0;
                end = this.length;
              } else if (typeof end === "string") {
                encoding = end;
                end = this.length;
              }
              if (encoding !== void 0 && typeof encoding !== "string") {
                throw new TypeError("encoding must be a string");
              }
              if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
                throw new TypeError("Unknown encoding: " + encoding);
              }
              if (val.length === 1) {
                var code2 = val.charCodeAt(0);
                if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
                  val = code2;
                }
              }
            } else if (typeof val === "number") {
              val = val & 255;
            }
            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError("Out of range index");
            }
            if (end <= start) {
              return this;
            }
            start = start >>> 0;
            end = end === void 0 ? this.length : end >>> 0;
            if (!val)
              val = 0;
            var i;
            if (typeof val === "number") {
              for (i = start; i < end; ++i) {
                this[i] = val;
              }
            } else {
              var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
              var len = bytes.length;
              if (len === 0) {
                throw new TypeError('The value "' + val + '" is invalid for argument "value"');
              }
              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len];
              }
            }
            return this;
          };
          var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
          function base64clean(str) {
            str = str.split("=")[0];
            str = str.trim().replace(INVALID_BASE64_RE, "");
            if (str.length < 2)
              return "";
            while (str.length % 4 !== 0) {
              str = str + "=";
            }
            return str;
          }
          function toHex(n) {
            if (n < 16)
              return "0" + n.toString(16);
            return n.toString(16);
          }
          function utf8ToBytes(string2, units) {
            units = units || Infinity;
            var codePoint;
            var length = string2.length;
            var leadSurrogate = null;
            var bytes = [];
            for (var i = 0; i < length; ++i) {
              codePoint = string2.charCodeAt(i);
              if (codePoint > 55295 && codePoint < 57344) {
                if (!leadSurrogate) {
                  if (codePoint > 56319) {
                    if ((units -= 3) > -1)
                      bytes.push(239, 191, 189);
                    continue;
                  } else if (i + 1 === length) {
                    if ((units -= 3) > -1)
                      bytes.push(239, 191, 189);
                    continue;
                  }
                  leadSurrogate = codePoint;
                  continue;
                }
                if (codePoint < 56320) {
                  if ((units -= 3) > -1)
                    bytes.push(239, 191, 189);
                  leadSurrogate = codePoint;
                  continue;
                }
                codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
              } else if (leadSurrogate) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
              }
              leadSurrogate = null;
              if (codePoint < 128) {
                if ((units -= 1) < 0)
                  break;
                bytes.push(codePoint);
              } else if (codePoint < 2048) {
                if ((units -= 2) < 0)
                  break;
                bytes.push(
                  codePoint >> 6 | 192,
                  codePoint & 63 | 128
                );
              } else if (codePoint < 65536) {
                if ((units -= 3) < 0)
                  break;
                bytes.push(
                  codePoint >> 12 | 224,
                  codePoint >> 6 & 63 | 128,
                  codePoint & 63 | 128
                );
              } else if (codePoint < 1114112) {
                if ((units -= 4) < 0)
                  break;
                bytes.push(
                  codePoint >> 18 | 240,
                  codePoint >> 12 & 63 | 128,
                  codePoint >> 6 & 63 | 128,
                  codePoint & 63 | 128
                );
              } else {
                throw new Error("Invalid code point");
              }
            }
            return bytes;
          }
          function asciiToBytes(str) {
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              byteArray.push(str.charCodeAt(i) & 255);
            }
            return byteArray;
          }
          function utf16leToBytes(str, units) {
            var c, hi, lo;
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0)
                break;
              c = str.charCodeAt(i);
              hi = c >> 8;
              lo = c % 256;
              byteArray.push(lo);
              byteArray.push(hi);
            }
            return byteArray;
          }
          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str));
          }
          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length)
                break;
              dst[i + offset] = src[i];
            }
            return i;
          }
          function isInstance(obj, type2) {
            return obj instanceof type2 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type2.name;
          }
          function numberIsNaN(obj) {
            return obj !== obj;
          }
        }).call(this, require("buffer").Buffer);
      }, { "base64-js": 10, "buffer": 12, "ieee754": 87 }], 13: [function(require, module2, exports2) {
        (function(Buffer) {
          function isArray(arg) {
            if (Array.isArray) {
              return Array.isArray(arg);
            }
            return objectToString(arg) === "[object Array]";
          }
          exports2.isArray = isArray;
          function isBoolean(arg) {
            return typeof arg === "boolean";
          }
          exports2.isBoolean = isBoolean;
          function isNull(arg) {
            return arg === null;
          }
          exports2.isNull = isNull;
          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports2.isNullOrUndefined = isNullOrUndefined;
          function isNumber(arg) {
            return typeof arg === "number";
          }
          exports2.isNumber = isNumber;
          function isString(arg) {
            return typeof arg === "string";
          }
          exports2.isString = isString;
          function isSymbol(arg) {
            return typeof arg === "symbol";
          }
          exports2.isSymbol = isSymbol;
          function isUndefined(arg) {
            return arg === void 0;
          }
          exports2.isUndefined = isUndefined;
          function isRegExp(re) {
            return objectToString(re) === "[object RegExp]";
          }
          exports2.isRegExp = isRegExp;
          function isObject(arg) {
            return typeof arg === "object" && arg !== null;
          }
          exports2.isObject = isObject;
          function isDate(d) {
            return objectToString(d) === "[object Date]";
          }
          exports2.isDate = isDate;
          function isError(e) {
            return objectToString(e) === "[object Error]" || e instanceof Error;
          }
          exports2.isError = isError;
          function isFunction(arg) {
            return typeof arg === "function";
          }
          exports2.isFunction = isFunction;
          function isPrimitive(arg) {
            return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
            typeof arg === "undefined";
          }
          exports2.isPrimitive = isPrimitive;
          exports2.isBuffer = Buffer.isBuffer;
          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }
        }).call(this, { "isBuffer": require("../../is-buffer/index.js") });
      }, { "../../is-buffer/index.js": 89 }], 14: [function(require, module2, exports2) {
        var isValue = require("type/value/is"), ensureValue = require("type/value/ensure"), ensurePlainFunction = require("type/plain-function/ensure"), copy = require("es5-ext/object/copy"), normalizeOptions = require("es5-ext/object/normalize-options"), map = require("es5-ext/object/map");
        var bind = Function.prototype.bind, defineProperty = Object.defineProperty, hasOwnProperty2 = Object.prototype.hasOwnProperty, define;
        define = function(name, desc, options2) {
          var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
          dgs = copy(desc);
          delete dgs.writable;
          delete dgs.value;
          dgs.get = function() {
            if (!options2.overwriteDefinition && hasOwnProperty2.call(this, name))
              return value;
            desc.value = bind.call(value, options2.resolveContext ? options2.resolveContext(this) : this);
            defineProperty(this, name, desc);
            return this[name];
          };
          return dgs;
        };
        module2.exports = function(props2) {
          var options2 = normalizeOptions(arguments[1]);
          if (isValue(options2.resolveContext))
            ensurePlainFunction(options2.resolveContext);
          return map(props2, function(desc, name) {
            return define(name, desc, options2);
          });
        };
      }, { "es5-ext/object/copy": 41, "es5-ext/object/map": 49, "es5-ext/object/normalize-options": 50, "type/plain-function/ensure": 126, "type/value/ensure": 130, "type/value/is": 131 }], 15: [function(require, module2, exports2) {
        var isValue = require("type/value/is"), isPlainFunction = require("type/plain-function/is"), assign = require("es5-ext/object/assign"), normalizeOpts = require("es5-ext/object/normalize-options"), contains2 = require("es5-ext/string/#/contains");
        var d = module2.exports = function(dscr, value) {
          var c, e, w, options2, desc;
          if (arguments.length < 2 || typeof dscr !== "string") {
            options2 = value;
            value = dscr;
            dscr = null;
          } else {
            options2 = arguments[2];
          }
          if (isValue(dscr)) {
            c = contains2.call(dscr, "c");
            e = contains2.call(dscr, "e");
            w = contains2.call(dscr, "w");
          } else {
            c = w = true;
            e = false;
          }
          desc = { value, configurable: c, enumerable: e, writable: w };
          return !options2 ? desc : assign(normalizeOpts(options2), desc);
        };
        d.gs = function(dscr, get, set) {
          var c, e, options2, desc;
          if (typeof dscr !== "string") {
            options2 = set;
            set = get;
            get = dscr;
            dscr = null;
          } else {
            options2 = arguments[3];
          }
          if (!isValue(get)) {
            get = void 0;
          } else if (!isPlainFunction(get)) {
            options2 = get;
            get = set = void 0;
          } else if (!isValue(set)) {
            set = void 0;
          } else if (!isPlainFunction(set)) {
            options2 = set;
            set = void 0;
          }
          if (isValue(dscr)) {
            c = contains2.call(dscr, "c");
            e = contains2.call(dscr, "e");
          } else {
            c = true;
            e = false;
          }
          desc = { get, set, configurable: c, enumerable: e };
          return !options2 ? desc : assign(normalizeOpts(options2), desc);
        };
      }, { "es5-ext/object/assign": 38, "es5-ext/object/normalize-options": 50, "es5-ext/string/#/contains": 57, "type/plain-function/is": 127, "type/value/is": 131 }], 16: [function(require, module2, exports2) {
        var s = 1e3;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var w = d * 7;
        var y = d * 365.25;
        module2.exports = function(val, options2) {
          options2 = options2 || {};
          var type2 = typeof val;
          if (type2 === "string" && val.length > 0) {
            return parse(val);
          } else if (type2 === "number" && isFinite(val)) {
            return options2.long ? fmtLong(val) : fmtShort(val);
          }
          throw new Error(
            "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
          );
        };
        function parse(str) {
          str = String(str);
          if (str.length > 100) {
            return;
          }
          var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            str
          );
          if (!match) {
            return;
          }
          var n = parseFloat(match[1]);
          var type2 = (match[2] || "ms").toLowerCase();
          switch (type2) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return n * y;
            case "weeks":
            case "week":
            case "w":
              return n * w;
            case "days":
            case "day":
            case "d":
              return n * d;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return n * h;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return n * m;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return n * s;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return n;
            default:
              return void 0;
          }
        }
        function fmtShort(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) {
            return Math.round(ms / d) + "d";
          }
          if (msAbs >= h) {
            return Math.round(ms / h) + "h";
          }
          if (msAbs >= m) {
            return Math.round(ms / m) + "m";
          }
          if (msAbs >= s) {
            return Math.round(ms / s) + "s";
          }
          return ms + "ms";
        }
        function fmtLong(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) {
            return plural(ms, msAbs, d, "day");
          }
          if (msAbs >= h) {
            return plural(ms, msAbs, h, "hour");
          }
          if (msAbs >= m) {
            return plural(ms, msAbs, m, "minute");
          }
          if (msAbs >= s) {
            return plural(ms, msAbs, s, "second");
          }
          return ms + " ms";
        }
        function plural(ms, msAbs, n, name) {
          var isPlural = msAbs >= n * 1.5;
          return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
        }
      }, {}], 17: [function(require, module2, exports2) {
        (function(process2) {
          exports2.log = log;
          exports2.formatArgs = formatArgs;
          exports2.save = save;
          exports2.load = load;
          exports2.useColors = useColors;
          exports2.storage = localstorage();
          exports2.colors = [
            "#0000CC",
            "#0000FF",
            "#0033CC",
            "#0033FF",
            "#0066CC",
            "#0066FF",
            "#0099CC",
            "#0099FF",
            "#00CC00",
            "#00CC33",
            "#00CC66",
            "#00CC99",
            "#00CCCC",
            "#00CCFF",
            "#3300CC",
            "#3300FF",
            "#3333CC",
            "#3333FF",
            "#3366CC",
            "#3366FF",
            "#3399CC",
            "#3399FF",
            "#33CC00",
            "#33CC33",
            "#33CC66",
            "#33CC99",
            "#33CCCC",
            "#33CCFF",
            "#6600CC",
            "#6600FF",
            "#6633CC",
            "#6633FF",
            "#66CC00",
            "#66CC33",
            "#9900CC",
            "#9900FF",
            "#9933CC",
            "#9933FF",
            "#99CC00",
            "#99CC33",
            "#CC0000",
            "#CC0033",
            "#CC0066",
            "#CC0099",
            "#CC00CC",
            "#CC00FF",
            "#CC3300",
            "#CC3333",
            "#CC3366",
            "#CC3399",
            "#CC33CC",
            "#CC33FF",
            "#CC6600",
            "#CC6633",
            "#CC9900",
            "#CC9933",
            "#CCCC00",
            "#CCCC33",
            "#FF0000",
            "#FF0033",
            "#FF0066",
            "#FF0099",
            "#FF00CC",
            "#FF00FF",
            "#FF3300",
            "#FF3333",
            "#FF3366",
            "#FF3399",
            "#FF33CC",
            "#FF33FF",
            "#FF6600",
            "#FF6633",
            "#FF9900",
            "#FF9933",
            "#FFCC00",
            "#FFCC33"
          ];
          function useColors() {
            if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
              return true;
            }
            if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
              return false;
            }
            return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
            typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
            // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
            typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
            typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
          }
          function formatArgs(args) {
            args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
            if (!this.useColors) {
              return;
            }
            const c = "color: " + this.color;
            args.splice(1, 0, c, "color: inherit");
            let index2 = 0;
            let lastC = 0;
            args[0].replace(/%[a-zA-Z%]/g, (match) => {
              if (match === "%%") {
                return;
              }
              index2++;
              if (match === "%c") {
                lastC = index2;
              }
            });
            args.splice(lastC, 0, c);
          }
          function log(...args) {
            return typeof console === "object" && console.log && formatAppLog("log", "at node_modules/mqtt/dist/mqtt.js:4878", ...args);
          }
          function save(namespaces) {
            try {
              if (namespaces) {
                exports2.storage.setItem("debug", namespaces);
              } else {
                exports2.storage.removeItem("debug");
              }
            } catch (error2) {
            }
          }
          function load() {
            let r;
            try {
              r = exports2.storage.getItem("debug");
            } catch (error2) {
            }
            if (!r && typeof process2 !== "undefined" && "env" in process2) {
              r = {}.DEBUG;
            }
            return r;
          }
          function localstorage() {
            try {
              return localStorage;
            } catch (error2) {
            }
          }
          module2.exports = require("./common")(exports2);
          const { formatters } = module2.exports;
          formatters.j = function(v) {
            try {
              return JSON.stringify(v);
            } catch (error2) {
              return "[UnexpectedJSONParseError]: " + error2.message;
            }
          };
        }).call(this, require("_process"));
      }, { "./common": 18, "_process": 100 }], 18: [function(require, module2, exports2) {
        function setup(env) {
          createDebug.debug = createDebug;
          createDebug.default = createDebug;
          createDebug.coerce = coerce;
          createDebug.disable = disable;
          createDebug.enable = enable;
          createDebug.enabled = enabled;
          createDebug.humanize = require("ms");
          Object.keys(env).forEach((key) => {
            createDebug[key] = env[key];
          });
          createDebug.instances = [];
          createDebug.names = [];
          createDebug.skips = [];
          createDebug.formatters = {};
          function selectColor(namespace) {
            let hash = 0;
            for (let i = 0; i < namespace.length; i++) {
              hash = (hash << 5) - hash + namespace.charCodeAt(i);
              hash |= 0;
            }
            return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
          }
          createDebug.selectColor = selectColor;
          function createDebug(namespace) {
            let prevTime;
            function debug(...args) {
              if (!debug.enabled) {
                return;
              }
              const self2 = debug;
              const curr = Number(/* @__PURE__ */ new Date());
              const ms = curr - (prevTime || curr);
              self2.diff = ms;
              self2.prev = prevTime;
              self2.curr = curr;
              prevTime = curr;
              args[0] = createDebug.coerce(args[0]);
              if (typeof args[0] !== "string") {
                args.unshift("%O");
              }
              let index2 = 0;
              args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
                if (match === "%%") {
                  return match;
                }
                index2++;
                const formatter = createDebug.formatters[format2];
                if (typeof formatter === "function") {
                  const val = args[index2];
                  match = formatter.call(self2, val);
                  args.splice(index2, 1);
                  index2--;
                }
                return match;
              });
              createDebug.formatArgs.call(self2, args);
              const logFn = self2.log || createDebug.log;
              logFn.apply(self2, args);
            }
            debug.namespace = namespace;
            debug.enabled = createDebug.enabled(namespace);
            debug.useColors = createDebug.useColors();
            debug.color = selectColor(namespace);
            debug.destroy = destroy;
            debug.extend = extend;
            if (typeof createDebug.init === "function") {
              createDebug.init(debug);
            }
            createDebug.instances.push(debug);
            return debug;
          }
          function destroy() {
            const index2 = createDebug.instances.indexOf(this);
            if (index2 !== -1) {
              createDebug.instances.splice(index2, 1);
              return true;
            }
            return false;
          }
          function extend(namespace, delimiter) {
            const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
            newDebug.log = this.log;
            return newDebug;
          }
          function enable(namespaces) {
            createDebug.save(namespaces);
            createDebug.names = [];
            createDebug.skips = [];
            let i;
            const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
            const len = split.length;
            for (i = 0; i < len; i++) {
              if (!split[i]) {
                continue;
              }
              namespaces = split[i].replace(/\*/g, ".*?");
              if (namespaces[0] === "-") {
                createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
              } else {
                createDebug.names.push(new RegExp("^" + namespaces + "$"));
              }
            }
            for (i = 0; i < createDebug.instances.length; i++) {
              const instance = createDebug.instances[i];
              instance.enabled = createDebug.enabled(instance.namespace);
            }
          }
          function disable() {
            const namespaces = [
              ...createDebug.names.map(toNamespace),
              ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
            ].join(",");
            createDebug.enable("");
            return namespaces;
          }
          function enabled(name) {
            if (name[name.length - 1] === "*") {
              return true;
            }
            let i;
            let len;
            for (i = 0, len = createDebug.skips.length; i < len; i++) {
              if (createDebug.skips[i].test(name)) {
                return false;
              }
            }
            for (i = 0, len = createDebug.names.length; i < len; i++) {
              if (createDebug.names[i].test(name)) {
                return true;
              }
            }
            return false;
          }
          function toNamespace(regexp2) {
            return regexp2.toString().substring(2, regexp2.toString().length - 2).replace(/\.\*\?$/, "*");
          }
          function coerce(val) {
            if (val instanceof Error) {
              return val.stack || val.message;
            }
            return val;
          }
          createDebug.enable(createDebug.load());
          return createDebug;
        }
        module2.exports = setup;
      }, { "ms": 16 }], 19: [function(require, module2, exports2) {
        (function(process2, Buffer) {
          var stream = require("readable-stream");
          var eos = require("end-of-stream");
          var inherits = require("inherits");
          var shift = require("stream-shift");
          var SIGNAL_FLUSH = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from([0]) : new Buffer([0]);
          var onuncork = function(self2, fn) {
            if (self2._corked)
              self2.once("uncork", fn);
            else
              fn();
          };
          var autoDestroy = function(self2, err) {
            if (self2._autoDestroy)
              self2.destroy(err);
          };
          var destroyer = function(self2, end2) {
            return function(err) {
              if (err)
                autoDestroy(self2, err.message === "premature close" ? null : err);
              else if (end2 && !self2._ended)
                self2.end();
            };
          };
          var end = function(ws, fn) {
            if (!ws)
              return fn();
            if (ws._writableState && ws._writableState.finished)
              return fn();
            if (ws._writableState)
              return ws.end(fn);
            ws.end();
            fn();
          };
          var toStreams2 = function(rs) {
            return new stream.Readable({ objectMode: true, highWaterMark: 16 }).wrap(rs);
          };
          var Duplexify = function(writable, readable, opts) {
            if (!(this instanceof Duplexify))
              return new Duplexify(writable, readable, opts);
            stream.Duplex.call(this, opts);
            this._writable = null;
            this._readable = null;
            this._readable2 = null;
            this._autoDestroy = !opts || opts.autoDestroy !== false;
            this._forwardDestroy = !opts || opts.destroy !== false;
            this._forwardEnd = !opts || opts.end !== false;
            this._corked = 1;
            this._ondrain = null;
            this._drained = false;
            this._forwarding = false;
            this._unwrite = null;
            this._unread = null;
            this._ended = false;
            this.destroyed = false;
            if (writable)
              this.setWritable(writable);
            if (readable)
              this.setReadable(readable);
          };
          inherits(Duplexify, stream.Duplex);
          Duplexify.obj = function(writable, readable, opts) {
            if (!opts)
              opts = {};
            opts.objectMode = true;
            opts.highWaterMark = 16;
            return new Duplexify(writable, readable, opts);
          };
          Duplexify.prototype.cork = function() {
            if (++this._corked === 1)
              this.emit("cork");
          };
          Duplexify.prototype.uncork = function() {
            if (this._corked && --this._corked === 0)
              this.emit("uncork");
          };
          Duplexify.prototype.setWritable = function(writable) {
            if (this._unwrite)
              this._unwrite();
            if (this.destroyed) {
              if (writable && writable.destroy)
                writable.destroy();
              return;
            }
            if (writable === null || writable === false) {
              this.end();
              return;
            }
            var self2 = this;
            var unend = eos(writable, { writable: true, readable: false }, destroyer(this, this._forwardEnd));
            var ondrain = function() {
              var ondrain2 = self2._ondrain;
              self2._ondrain = null;
              if (ondrain2)
                ondrain2();
            };
            var clear = function() {
              self2._writable.removeListener("drain", ondrain);
              unend();
            };
            if (this._unwrite)
              process2.nextTick(ondrain);
            this._writable = writable;
            this._writable.on("drain", ondrain);
            this._unwrite = clear;
            this.uncork();
          };
          Duplexify.prototype.setReadable = function(readable) {
            if (this._unread)
              this._unread();
            if (this.destroyed) {
              if (readable && readable.destroy)
                readable.destroy();
              return;
            }
            if (readable === null || readable === false) {
              this.push(null);
              this.resume();
              return;
            }
            var self2 = this;
            var unend = eos(readable, { writable: false, readable: true }, destroyer(this));
            var onreadable = function() {
              self2._forward();
            };
            var onend = function() {
              self2.push(null);
            };
            var clear = function() {
              self2._readable2.removeListener("readable", onreadable);
              self2._readable2.removeListener("end", onend);
              unend();
            };
            this._drained = true;
            this._readable = readable;
            this._readable2 = readable._readableState ? readable : toStreams2(readable);
            this._readable2.on("readable", onreadable);
            this._readable2.on("end", onend);
            this._unread = clear;
            this._forward();
          };
          Duplexify.prototype._read = function() {
            this._drained = true;
            this._forward();
          };
          Duplexify.prototype._forward = function() {
            if (this._forwarding || !this._readable2 || !this._drained)
              return;
            this._forwarding = true;
            var data;
            while (this._drained && (data = shift(this._readable2)) !== null) {
              if (this.destroyed)
                continue;
              this._drained = this.push(data);
            }
            this._forwarding = false;
          };
          Duplexify.prototype.destroy = function(err) {
            if (this.destroyed)
              return;
            this.destroyed = true;
            var self2 = this;
            process2.nextTick(function() {
              self2._destroy(err);
            });
          };
          Duplexify.prototype._destroy = function(err) {
            if (err) {
              var ondrain = this._ondrain;
              this._ondrain = null;
              if (ondrain)
                ondrain(err);
              else
                this.emit("error", err);
            }
            if (this._forwardDestroy) {
              if (this._readable && this._readable.destroy)
                this._readable.destroy();
              if (this._writable && this._writable.destroy)
                this._writable.destroy();
            }
            this.emit("close");
          };
          Duplexify.prototype._write = function(data, enc, cb) {
            if (this.destroyed)
              return cb();
            if (this._corked)
              return onuncork(this, this._write.bind(this, data, enc, cb));
            if (data === SIGNAL_FLUSH)
              return this._finish(cb);
            if (!this._writable)
              return cb();
            if (this._writable.write(data) === false)
              this._ondrain = cb;
            else
              cb();
          };
          Duplexify.prototype._finish = function(cb) {
            var self2 = this;
            this.emit("preend");
            onuncork(this, function() {
              end(self2._forwardEnd && self2._writable, function() {
                if (self2._writableState.prefinished === false)
                  self2._writableState.prefinished = true;
                self2.emit("prefinish");
                onuncork(self2, cb);
              });
            });
          };
          Duplexify.prototype.end = function(data, enc, cb) {
            if (typeof data === "function")
              return this.end(null, null, data);
            if (typeof enc === "function")
              return this.end(data, null, enc);
            this._ended = true;
            if (data)
              this.write(data);
            if (!this._writableState.ending)
              this.write(SIGNAL_FLUSH);
            return stream.Writable.prototype.end.call(this, cb);
          };
          module2.exports = Duplexify;
        }).call(this, require("_process"), require("buffer").Buffer);
      }, { "_process": 100, "buffer": 12, "end-of-stream": 20, "inherits": 88, "readable-stream": 116, "stream-shift": 119 }], 20: [function(require, module2, exports2) {
        var once = require("once");
        var noop = function() {
        };
        var isRequest = function(stream) {
          return stream.setHeader && typeof stream.abort === "function";
        };
        var isChildProcess = function(stream) {
          return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
        };
        var eos = function(stream, opts, callback) {
          if (typeof opts === "function")
            return eos(stream, null, opts);
          if (!opts)
            opts = {};
          callback = once(callback || noop);
          var ws = stream._writableState;
          var rs = stream._readableState;
          var readable = opts.readable || opts.readable !== false && stream.readable;
          var writable = opts.writable || opts.writable !== false && stream.writable;
          var onlegacyfinish = function() {
            if (!stream.writable)
              onfinish();
          };
          var onfinish = function() {
            writable = false;
            if (!readable)
              callback.call(stream);
          };
          var onend = function() {
            readable = false;
            if (!writable)
              callback.call(stream);
          };
          var onexit = function(exitCode) {
            callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
          };
          var onerror = function(err) {
            callback.call(stream, err);
          };
          var onclose = function() {
            if (readable && !(rs && rs.ended))
              return callback.call(stream, new Error("premature close"));
            if (writable && !(ws && ws.ended))
              return callback.call(stream, new Error("premature close"));
          };
          var onrequest = function() {
            stream.req.on("finish", onfinish);
          };
          if (isRequest(stream)) {
            stream.on("complete", onfinish);
            stream.on("abort", onclose);
            if (stream.req)
              onrequest();
            else
              stream.on("request", onrequest);
          } else if (writable && !ws) {
            stream.on("end", onlegacyfinish);
            stream.on("close", onlegacyfinish);
          }
          if (isChildProcess(stream))
            stream.on("exit", onexit);
          stream.on("end", onend);
          stream.on("finish", onfinish);
          if (opts.error !== false)
            stream.on("error", onerror);
          stream.on("close", onclose);
          return function() {
            stream.removeListener("complete", onfinish);
            stream.removeListener("abort", onclose);
            stream.removeListener("request", onrequest);
            if (stream.req)
              stream.req.removeListener("finish", onfinish);
            stream.removeListener("end", onlegacyfinish);
            stream.removeListener("close", onlegacyfinish);
            stream.removeListener("finish", onfinish);
            stream.removeListener("exit", onexit);
            stream.removeListener("end", onend);
            stream.removeListener("error", onerror);
            stream.removeListener("close", onclose);
          };
        };
        module2.exports = eos;
      }, { "once": 98 }], 21: [function(require, module2, exports2) {
        var value = require("../../object/valid-value");
        module2.exports = function() {
          value(this).length = 0;
          return this;
        };
      }, { "../../object/valid-value": 56 }], 22: [function(require, module2, exports2) {
        var numberIsNaN = require("../../number/is-nan"), toPosInt = require("../../number/to-pos-integer"), value = require("../../object/valid-value"), indexOf = Array.prototype.indexOf, objHasOwnProperty = Object.prototype.hasOwnProperty, abs = Math.abs, floor = Math.floor;
        module2.exports = function(searchElement) {
          var i, length, fromIndex, val;
          if (!numberIsNaN(searchElement))
            return indexOf.apply(this, arguments);
          length = toPosInt(value(this).length);
          fromIndex = arguments[1];
          if (isNaN(fromIndex))
            fromIndex = 0;
          else if (fromIndex >= 0)
            fromIndex = floor(fromIndex);
          else
            fromIndex = toPosInt(this.length) - floor(abs(fromIndex));
          for (i = fromIndex; i < length; ++i) {
            if (objHasOwnProperty.call(this, i)) {
              val = this[i];
              if (numberIsNaN(val))
                return i;
            }
          }
          return -1;
        };
      }, { "../../number/is-nan": 32, "../../number/to-pos-integer": 36, "../../object/valid-value": 56 }], 23: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? Array.from : require("./shim");
      }, { "./is-implemented": 24, "./shim": 25 }], 24: [function(require, module2, exports2) {
        module2.exports = function() {
          var from = Array.from, arr, result;
          if (typeof from !== "function")
            return false;
          arr = ["raz", "dwa"];
          result = from(arr);
          return Boolean(result && result !== arr && result[1] === "dwa");
        };
      }, {}], 25: [function(require, module2, exports2) {
        var iteratorSymbol = require("es6-symbol").iterator, isArguments = require("../../function/is-arguments"), isFunction = require("../../function/is-function"), toPosInt = require("../../number/to-pos-integer"), callable = require("../../object/valid-callable"), validValue = require("../../object/valid-value"), isValue = require("../../object/is-value"), isString = require("../../string/is-string"), isArray = Array.isArray, call = Function.prototype.call, desc = { configurable: true, enumerable: true, writable: true, value: null }, defineProperty = Object.defineProperty;
        module2.exports = function(arrayLike) {
          var mapFn = arguments[1], thisArg = arguments[2], Context, i, j, arr, length, code2, iterator, result, getIterator, value;
          arrayLike = Object(validValue(arrayLike));
          if (isValue(mapFn))
            callable(mapFn);
          if (!this || this === Array || !isFunction(this)) {
            if (!mapFn) {
              if (isArguments(arrayLike)) {
                length = arrayLike.length;
                if (length !== 1)
                  return Array.apply(null, arrayLike);
                arr = new Array(1);
                arr[0] = arrayLike[0];
                return arr;
              }
              if (isArray(arrayLike)) {
                arr = new Array(length = arrayLike.length);
                for (i = 0; i < length; ++i)
                  arr[i] = arrayLike[i];
                return arr;
              }
            }
            arr = [];
          } else {
            Context = this;
          }
          if (!isArray(arrayLike)) {
            if ((getIterator = arrayLike[iteratorSymbol]) !== void 0) {
              iterator = callable(getIterator).call(arrayLike);
              if (Context)
                arr = new Context();
              result = iterator.next();
              i = 0;
              while (!result.done) {
                value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
                if (Context) {
                  desc.value = value;
                  defineProperty(arr, i, desc);
                } else {
                  arr[i] = value;
                }
                result = iterator.next();
                ++i;
              }
              length = i;
            } else if (isString(arrayLike)) {
              length = arrayLike.length;
              if (Context)
                arr = new Context();
              for (i = 0, j = 0; i < length; ++i) {
                value = arrayLike[i];
                if (i + 1 < length) {
                  code2 = value.charCodeAt(0);
                  if (code2 >= 55296 && code2 <= 56319)
                    value += arrayLike[++i];
                }
                value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
                if (Context) {
                  desc.value = value;
                  defineProperty(arr, j, desc);
                } else {
                  arr[j] = value;
                }
                ++j;
              }
              length = j;
            }
          }
          if (length === void 0) {
            length = toPosInt(arrayLike.length);
            if (Context)
              arr = new Context(length);
            for (i = 0; i < length; ++i) {
              value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
              if (Context) {
                desc.value = value;
                defineProperty(arr, i, desc);
              } else {
                arr[i] = value;
              }
            }
          }
          if (Context) {
            desc.value = null;
            arr.length = length;
          }
          return arr;
        };
      }, { "../../function/is-arguments": 26, "../../function/is-function": 27, "../../number/to-pos-integer": 36, "../../object/is-value": 45, "../../object/valid-callable": 55, "../../object/valid-value": 56, "../../string/is-string": 60, "es6-symbol": 74 }], 26: [function(require, module2, exports2) {
        var objToString = Object.prototype.toString, id = objToString.call(function() {
          return arguments;
        }());
        module2.exports = function(value) {
          return objToString.call(value) === id;
        };
      }, {}], 27: [function(require, module2, exports2) {
        var objToString = Object.prototype.toString, isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
        module2.exports = function(value) {
          return typeof value === "function" && isFunctionStringTag(objToString.call(value));
        };
      }, {}], 28: [function(require, module2, exports2) {
        module2.exports = function() {
        };
      }, {}], 29: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? Math.sign : require("./shim");
      }, { "./is-implemented": 30, "./shim": 31 }], 30: [function(require, module2, exports2) {
        module2.exports = function() {
          var sign = Math.sign;
          if (typeof sign !== "function")
            return false;
          return sign(10) === 1 && sign(-20) === -1;
        };
      }, {}], 31: [function(require, module2, exports2) {
        module2.exports = function(value) {
          value = Number(value);
          if (isNaN(value) || value === 0)
            return value;
          return value > 0 ? 1 : -1;
        };
      }, {}], 32: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? Number.isNaN : require("./shim");
      }, { "./is-implemented": 33, "./shim": 34 }], 33: [function(require, module2, exports2) {
        module2.exports = function() {
          var numberIsNaN = Number.isNaN;
          if (typeof numberIsNaN !== "function")
            return false;
          return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
        };
      }, {}], 34: [function(require, module2, exports2) {
        module2.exports = function(value) {
          return value !== value;
        };
      }, {}], 35: [function(require, module2, exports2) {
        var sign = require("../math/sign"), abs = Math.abs, floor = Math.floor;
        module2.exports = function(value) {
          if (isNaN(value))
            return 0;
          value = Number(value);
          if (value === 0 || !isFinite(value))
            return value;
          return sign(value) * floor(abs(value));
        };
      }, { "../math/sign": 29 }], 36: [function(require, module2, exports2) {
        var toInteger = require("./to-integer"), max = Math.max;
        module2.exports = function(value) {
          return max(0, toInteger(value));
        };
      }, { "./to-integer": 35 }], 37: [function(require, module2, exports2) {
        var callable = require("./valid-callable"), value = require("./valid-value"), bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys, objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;
        module2.exports = function(method2, defVal) {
          return function(obj, cb) {
            var list, thisArg = arguments[2], compareFn = arguments[3];
            obj = Object(value(obj));
            callable(cb);
            list = keys(obj);
            if (compareFn) {
              list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : void 0);
            }
            if (typeof method2 !== "function")
              method2 = list[method2];
            return call.call(method2, list, function(key, index2) {
              if (!objPropertyIsEnumerable.call(obj, key))
                return defVal;
              return call.call(cb, thisArg, obj[key], key, obj, index2);
            });
          };
        };
      }, { "./valid-callable": 55, "./valid-value": 56 }], 38: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? Object.assign : require("./shim");
      }, { "./is-implemented": 39, "./shim": 40 }], 39: [function(require, module2, exports2) {
        module2.exports = function() {
          var assign = Object.assign, obj;
          if (typeof assign !== "function")
            return false;
          obj = { foo: "raz" };
          assign(obj, { bar: "dwa" }, { trzy: "trzy" });
          return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
        };
      }, {}], 40: [function(require, module2, exports2) {
        var keys = require("../keys"), value = require("../valid-value"), max = Math.max;
        module2.exports = function(dest, src) {
          var error2, i, length = max(arguments.length, 2), assign;
          dest = Object(value(dest));
          assign = function(key) {
            try {
              dest[key] = src[key];
            } catch (e) {
              if (!error2)
                error2 = e;
            }
          };
          for (i = 1; i < length; ++i) {
            src = arguments[i];
            keys(src).forEach(assign);
          }
          if (error2 !== void 0)
            throw error2;
          return dest;
        };
      }, { "../keys": 46, "../valid-value": 56 }], 41: [function(require, module2, exports2) {
        var aFrom = require("../array/from"), assign = require("./assign"), value = require("./valid-value");
        module2.exports = function(obj) {
          var copy = Object(value(obj)), propertyNames = arguments[1], options2 = Object(arguments[2]);
          if (copy !== obj && !propertyNames)
            return copy;
          var result = {};
          if (propertyNames) {
            aFrom(propertyNames, function(propertyName) {
              if (options2.ensure || propertyName in obj)
                result[propertyName] = obj[propertyName];
            });
          } else {
            assign(result, obj);
          }
          return result;
        };
      }, { "../array/from": 23, "./assign": 38, "./valid-value": 56 }], 42: [function(require, module2, exports2) {
        var create = Object.create, shim;
        if (!require("./set-prototype-of/is-implemented")()) {
          shim = require("./set-prototype-of/shim");
        }
        module2.exports = function() {
          var nullObject, polyProps, desc;
          if (!shim)
            return create;
          if (shim.level !== 1)
            return create;
          nullObject = {};
          polyProps = {};
          desc = { configurable: false, enumerable: false, writable: true, value: void 0 };
          Object.getOwnPropertyNames(Object.prototype).forEach(function(name) {
            if (name === "__proto__") {
              polyProps[name] = {
                configurable: true,
                enumerable: false,
                writable: true,
                value: void 0
              };
              return;
            }
            polyProps[name] = desc;
          });
          Object.defineProperties(nullObject, polyProps);
          Object.defineProperty(shim, "nullPolyfill", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: nullObject
          });
          return function(prototype, props2) {
            return create(prototype === null ? nullObject : prototype, props2);
          };
        }();
      }, { "./set-prototype-of/is-implemented": 53, "./set-prototype-of/shim": 54 }], 43: [function(require, module2, exports2) {
        module2.exports = require("./_iterate")("forEach");
      }, { "./_iterate": 37 }], 44: [function(require, module2, exports2) {
        var isValue = require("./is-value");
        var map = { function: true, object: true };
        module2.exports = function(value) {
          return isValue(value) && map[typeof value] || false;
        };
      }, { "./is-value": 45 }], 45: [function(require, module2, exports2) {
        var _undefined = require("../function/noop")();
        module2.exports = function(val) {
          return val !== _undefined && val !== null;
        };
      }, { "../function/noop": 28 }], 46: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? Object.keys : require("./shim");
      }, { "./is-implemented": 47, "./shim": 48 }], 47: [function(require, module2, exports2) {
        module2.exports = function() {
          try {
            Object.keys("primitive");
            return true;
          } catch (e) {
            return false;
          }
        };
      }, {}], 48: [function(require, module2, exports2) {
        var isValue = require("../is-value");
        var keys = Object.keys;
        module2.exports = function(object2) {
          return keys(isValue(object2) ? Object(object2) : object2);
        };
      }, { "../is-value": 45 }], 49: [function(require, module2, exports2) {
        var callable = require("./valid-callable"), forEach = require("./for-each"), call = Function.prototype.call;
        module2.exports = function(obj, cb) {
          var result = {}, thisArg = arguments[2];
          callable(cb);
          forEach(obj, function(value, key, targetObj, index2) {
            result[key] = call.call(cb, thisArg, value, key, targetObj, index2);
          });
          return result;
        };
      }, { "./for-each": 43, "./valid-callable": 55 }], 50: [function(require, module2, exports2) {
        var isValue = require("./is-value");
        var forEach = Array.prototype.forEach, create = Object.create;
        var process2 = function(src, obj) {
          var key;
          for (key in src)
            obj[key] = src[key];
        };
        module2.exports = function(opts1) {
          var result = create(null);
          forEach.call(arguments, function(options2) {
            if (!isValue(options2))
              return;
            process2(Object(options2), result);
          });
          return result;
        };
      }, { "./is-value": 45 }], 51: [function(require, module2, exports2) {
        var forEach = Array.prototype.forEach, create = Object.create;
        module2.exports = function(arg) {
          var set = create(null);
          forEach.call(arguments, function(name) {
            set[name] = true;
          });
          return set;
        };
      }, {}], 52: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? Object.setPrototypeOf : require("./shim");
      }, { "./is-implemented": 53, "./shim": 54 }], 53: [function(require, module2, exports2) {
        var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};
        module2.exports = function() {
          var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
          if (typeof setPrototypeOf !== "function")
            return false;
          return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
        };
      }, {}], 54: [function(require, module2, exports2) {
        var isObject = require("../is-object"), value = require("../valid-value"), objIsPrototypeOf = Object.prototype.isPrototypeOf, defineProperty = Object.defineProperty, nullDesc = { configurable: true, enumerable: false, writable: true, value: void 0 }, validate;
        validate = function(obj, prototype) {
          value(obj);
          if (prototype === null || isObject(prototype))
            return obj;
          throw new TypeError("Prototype must be null or an object");
        };
        module2.exports = function(status) {
          var fn, set;
          if (!status)
            return null;
          if (status.level === 2) {
            if (status.set) {
              set = status.set;
              fn = function(obj, prototype) {
                set.call(validate(obj, prototype), prototype);
                return obj;
              };
            } else {
              fn = function(obj, prototype) {
                validate(obj, prototype).__proto__ = prototype;
                return obj;
              };
            }
          } else {
            fn = function self2(obj, prototype) {
              var isNullBase;
              validate(obj, prototype);
              isNullBase = objIsPrototypeOf.call(self2.nullPolyfill, obj);
              if (isNullBase)
                delete self2.nullPolyfill.__proto__;
              if (prototype === null)
                prototype = self2.nullPolyfill;
              obj.__proto__ = prototype;
              if (isNullBase)
                defineProperty(self2.nullPolyfill, "__proto__", nullDesc);
              return obj;
            };
          }
          return Object.defineProperty(fn, "level", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: status.level
          });
        }(
          function() {
            var tmpObj1 = /* @__PURE__ */ Object.create(null), tmpObj2 = {}, set, desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
            if (desc) {
              try {
                set = desc.set;
                set.call(tmpObj1, tmpObj2);
              } catch (ignore) {
              }
              if (Object.getPrototypeOf(tmpObj1) === tmpObj2)
                return { set, level: 2 };
            }
            tmpObj1.__proto__ = tmpObj2;
            if (Object.getPrototypeOf(tmpObj1) === tmpObj2)
              return { level: 2 };
            tmpObj1 = {};
            tmpObj1.__proto__ = tmpObj2;
            if (Object.getPrototypeOf(tmpObj1) === tmpObj2)
              return { level: 1 };
            return false;
          }()
        );
        require("../create");
      }, { "../create": 42, "../is-object": 44, "../valid-value": 56 }], 55: [function(require, module2, exports2) {
        module2.exports = function(fn) {
          if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");
          return fn;
        };
      }, {}], 56: [function(require, module2, exports2) {
        var isValue = require("./is-value");
        module2.exports = function(value) {
          if (!isValue(value))
            throw new TypeError("Cannot use null or undefined");
          return value;
        };
      }, { "./is-value": 45 }], 57: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? String.prototype.contains : require("./shim");
      }, { "./is-implemented": 58, "./shim": 59 }], 58: [function(require, module2, exports2) {
        var str = "razdwatrzy";
        module2.exports = function() {
          if (typeof str.contains !== "function")
            return false;
          return str.contains("dwa") === true && str.contains("foo") === false;
        };
      }, {}], 59: [function(require, module2, exports2) {
        var indexOf = String.prototype.indexOf;
        module2.exports = function(searchString) {
          return indexOf.call(this, searchString, arguments[1]) > -1;
        };
      }, {}], 60: [function(require, module2, exports2) {
        var objToString = Object.prototype.toString, id = objToString.call("");
        module2.exports = function(value) {
          return typeof value === "string" || value && typeof value === "object" && (value instanceof String || objToString.call(value) === id) || false;
        };
      }, {}], 61: [function(require, module2, exports2) {
        var setPrototypeOf = require("es5-ext/object/set-prototype-of"), contains2 = require("es5-ext/string/#/contains"), d = require("d"), Symbol2 = require("es6-symbol"), Iterator = require("./");
        var defineProperty = Object.defineProperty, ArrayIterator;
        ArrayIterator = module2.exports = function(arr, kind) {
          if (!(this instanceof ArrayIterator))
            throw new TypeError("Constructor requires 'new'");
          Iterator.call(this, arr);
          if (!kind)
            kind = "value";
          else if (contains2.call(kind, "key+value"))
            kind = "key+value";
          else if (contains2.call(kind, "key"))
            kind = "key";
          else
            kind = "value";
          defineProperty(this, "__kind__", d("", kind));
        };
        if (setPrototypeOf)
          setPrototypeOf(ArrayIterator, Iterator);
        delete ArrayIterator.prototype.constructor;
        ArrayIterator.prototype = Object.create(Iterator.prototype, {
          _resolve: d(function(i) {
            if (this.__kind__ === "value")
              return this.__list__[i];
            if (this.__kind__ === "key+value")
              return [i, this.__list__[i]];
            return i;
          })
        });
        defineProperty(ArrayIterator.prototype, Symbol2.toStringTag, d("c", "Array Iterator"));
      }, { "./": 64, "d": 15, "es5-ext/object/set-prototype-of": 52, "es5-ext/string/#/contains": 57, "es6-symbol": 74 }], 62: [function(require, module2, exports2) {
        var isArguments = require("es5-ext/function/is-arguments"), callable = require("es5-ext/object/valid-callable"), isString = require("es5-ext/string/is-string"), get = require("./get");
        var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;
        module2.exports = function(iterable, cb) {
          var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code2;
          if (isArray(iterable) || isArguments(iterable))
            mode = "array";
          else if (isString(iterable))
            mode = "string";
          else
            iterable = get(iterable);
          callable(cb);
          doBreak = function() {
            broken = true;
          };
          if (mode === "array") {
            some.call(iterable, function(value) {
              call.call(cb, thisArg, value, doBreak);
              return broken;
            });
            return;
          }
          if (mode === "string") {
            length = iterable.length;
            for (i = 0; i < length; ++i) {
              char = iterable[i];
              if (i + 1 < length) {
                code2 = char.charCodeAt(0);
                if (code2 >= 55296 && code2 <= 56319)
                  char += iterable[++i];
              }
              call.call(cb, thisArg, char, doBreak);
              if (broken)
                break;
            }
            return;
          }
          result = iterable.next();
          while (!result.done) {
            call.call(cb, thisArg, result.value, doBreak);
            if (broken)
              return;
            result = iterable.next();
          }
        };
      }, { "./get": 63, "es5-ext/function/is-arguments": 26, "es5-ext/object/valid-callable": 55, "es5-ext/string/is-string": 60 }], 63: [function(require, module2, exports2) {
        var isArguments = require("es5-ext/function/is-arguments"), isString = require("es5-ext/string/is-string"), ArrayIterator = require("./array"), StringIterator = require("./string"), iterable = require("./valid-iterable"), iteratorSymbol = require("es6-symbol").iterator;
        module2.exports = function(obj) {
          if (typeof iterable(obj)[iteratorSymbol] === "function")
            return obj[iteratorSymbol]();
          if (isArguments(obj))
            return new ArrayIterator(obj);
          if (isString(obj))
            return new StringIterator(obj);
          return new ArrayIterator(obj);
        };
      }, { "./array": 61, "./string": 66, "./valid-iterable": 67, "es5-ext/function/is-arguments": 26, "es5-ext/string/is-string": 60, "es6-symbol": 74 }], 64: [function(require, module2, exports2) {
        var clear = require("es5-ext/array/#/clear"), assign = require("es5-ext/object/assign"), callable = require("es5-ext/object/valid-callable"), value = require("es5-ext/object/valid-value"), d = require("d"), autoBind = require("d/auto-bind"), Symbol2 = require("es6-symbol");
        var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;
        module2.exports = Iterator = function(list, context) {
          if (!(this instanceof Iterator))
            throw new TypeError("Constructor requires 'new'");
          defineProperties(this, {
            __list__: d("w", value(list)),
            __context__: d("w", context),
            __nextIndex__: d("w", 0)
          });
          if (!context)
            return;
          callable(context.on);
          context.on("_add", this._onAdd);
          context.on("_delete", this._onDelete);
          context.on("_clear", this._onClear);
        };
        delete Iterator.prototype.constructor;
        defineProperties(
          Iterator.prototype,
          assign(
            {
              _next: d(function() {
                var i;
                if (!this.__list__)
                  return void 0;
                if (this.__redo__) {
                  i = this.__redo__.shift();
                  if (i !== void 0)
                    return i;
                }
                if (this.__nextIndex__ < this.__list__.length)
                  return this.__nextIndex__++;
                this._unBind();
                return void 0;
              }),
              next: d(function() {
                return this._createResult(this._next());
              }),
              _createResult: d(function(i) {
                if (i === void 0)
                  return { done: true, value: void 0 };
                return { done: false, value: this._resolve(i) };
              }),
              _resolve: d(function(i) {
                return this.__list__[i];
              }),
              _unBind: d(function() {
                this.__list__ = null;
                delete this.__redo__;
                if (!this.__context__)
                  return;
                this.__context__.off("_add", this._onAdd);
                this.__context__.off("_delete", this._onDelete);
                this.__context__.off("_clear", this._onClear);
                this.__context__ = null;
              }),
              toString: d(function() {
                return "[object " + (this[Symbol2.toStringTag] || "Object") + "]";
              })
            },
            autoBind({
              _onAdd: d(function(index2) {
                if (index2 >= this.__nextIndex__)
                  return;
                ++this.__nextIndex__;
                if (!this.__redo__) {
                  defineProperty(this, "__redo__", d("c", [index2]));
                  return;
                }
                this.__redo__.forEach(function(redo, i) {
                  if (redo >= index2)
                    this.__redo__[i] = ++redo;
                }, this);
                this.__redo__.push(index2);
              }),
              _onDelete: d(function(index2) {
                var i;
                if (index2 >= this.__nextIndex__)
                  return;
                --this.__nextIndex__;
                if (!this.__redo__)
                  return;
                i = this.__redo__.indexOf(index2);
                if (i !== -1)
                  this.__redo__.splice(i, 1);
                this.__redo__.forEach(function(redo, j) {
                  if (redo > index2)
                    this.__redo__[j] = --redo;
                }, this);
              }),
              _onClear: d(function() {
                if (this.__redo__)
                  clear.call(this.__redo__);
                this.__nextIndex__ = 0;
              })
            })
          )
        );
        defineProperty(
          Iterator.prototype,
          Symbol2.iterator,
          d(function() {
            return this;
          })
        );
      }, { "d": 15, "d/auto-bind": 14, "es5-ext/array/#/clear": 21, "es5-ext/object/assign": 38, "es5-ext/object/valid-callable": 55, "es5-ext/object/valid-value": 56, "es6-symbol": 74 }], 65: [function(require, module2, exports2) {
        var isArguments = require("es5-ext/function/is-arguments"), isValue = require("es5-ext/object/is-value"), isString = require("es5-ext/string/is-string");
        var iteratorSymbol = require("es6-symbol").iterator, isArray = Array.isArray;
        module2.exports = function(value) {
          if (!isValue(value))
            return false;
          if (isArray(value))
            return true;
          if (isString(value))
            return true;
          if (isArguments(value))
            return true;
          return typeof value[iteratorSymbol] === "function";
        };
      }, { "es5-ext/function/is-arguments": 26, "es5-ext/object/is-value": 45, "es5-ext/string/is-string": 60, "es6-symbol": 74 }], 66: [function(require, module2, exports2) {
        var setPrototypeOf = require("es5-ext/object/set-prototype-of"), d = require("d"), Symbol2 = require("es6-symbol"), Iterator = require("./");
        var defineProperty = Object.defineProperty, StringIterator;
        StringIterator = module2.exports = function(str) {
          if (!(this instanceof StringIterator))
            throw new TypeError("Constructor requires 'new'");
          str = String(str);
          Iterator.call(this, str);
          defineProperty(this, "__length__", d("", str.length));
        };
        if (setPrototypeOf)
          setPrototypeOf(StringIterator, Iterator);
        delete StringIterator.prototype.constructor;
        StringIterator.prototype = Object.create(Iterator.prototype, {
          _next: d(function() {
            if (!this.__list__)
              return void 0;
            if (this.__nextIndex__ < this.__length__)
              return this.__nextIndex__++;
            this._unBind();
            return void 0;
          }),
          _resolve: d(function(i) {
            var char = this.__list__[i], code2;
            if (this.__nextIndex__ === this.__length__)
              return char;
            code2 = char.charCodeAt(0);
            if (code2 >= 55296 && code2 <= 56319)
              return char + this.__list__[this.__nextIndex__++];
            return char;
          })
        });
        defineProperty(StringIterator.prototype, Symbol2.toStringTag, d("c", "String Iterator"));
      }, { "./": 64, "d": 15, "es5-ext/object/set-prototype-of": 52, "es6-symbol": 74 }], 67: [function(require, module2, exports2) {
        var isIterable = require("./is-iterable");
        module2.exports = function(value) {
          if (!isIterable(value))
            throw new TypeError(value + " is not iterable");
          return value;
        };
      }, { "./is-iterable": 65 }], 68: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? Map : require("./polyfill");
      }, { "./is-implemented": 69, "./polyfill": 73 }], 69: [function(require, module2, exports2) {
        module2.exports = function() {
          var map, iterator, result;
          if (typeof Map !== "function")
            return false;
          try {
            map = /* @__PURE__ */ new Map([["raz", "one"], ["dwa", "two"], ["trzy", "three"]]);
          } catch (e) {
            return false;
          }
          if (String(map) !== "[object Map]")
            return false;
          if (map.size !== 3)
            return false;
          if (typeof map.clear !== "function")
            return false;
          if (typeof map.delete !== "function")
            return false;
          if (typeof map.entries !== "function")
            return false;
          if (typeof map.forEach !== "function")
            return false;
          if (typeof map.get !== "function")
            return false;
          if (typeof map.has !== "function")
            return false;
          if (typeof map.keys !== "function")
            return false;
          if (typeof map.set !== "function")
            return false;
          if (typeof map.values !== "function")
            return false;
          iterator = map.entries();
          result = iterator.next();
          if (result.done !== false)
            return false;
          if (!result.value)
            return false;
          if (result.value[0] !== "raz")
            return false;
          if (result.value[1] !== "one")
            return false;
          return true;
        };
      }, {}], 70: [function(require, module2, exports2) {
        module2.exports = function() {
          if (typeof Map === "undefined")
            return false;
          return Object.prototype.toString.call(/* @__PURE__ */ new Map()) === "[object Map]";
        }();
      }, {}], 71: [function(require, module2, exports2) {
        module2.exports = require("es5-ext/object/primitive-set")(
          "key",
          "value",
          "key+value"
        );
      }, { "es5-ext/object/primitive-set": 51 }], 72: [function(require, module2, exports2) {
        var setPrototypeOf = require("es5-ext/object/set-prototype-of"), d = require("d"), Iterator = require("es6-iterator"), toStringTagSymbol = require("es6-symbol").toStringTag, kinds = require("./iterator-kinds"), defineProperties = Object.defineProperties, unBind = Iterator.prototype._unBind, MapIterator;
        MapIterator = module2.exports = function(map, kind) {
          if (!(this instanceof MapIterator))
            return new MapIterator(map, kind);
          Iterator.call(this, map.__mapKeysData__, map);
          if (!kind || !kinds[kind])
            kind = "key+value";
          defineProperties(this, {
            __kind__: d("", kind),
            __values__: d("w", map.__mapValuesData__)
          });
        };
        if (setPrototypeOf)
          setPrototypeOf(MapIterator, Iterator);
        MapIterator.prototype = Object.create(Iterator.prototype, {
          constructor: d(MapIterator),
          _resolve: d(function(i) {
            if (this.__kind__ === "value")
              return this.__values__[i];
            if (this.__kind__ === "key")
              return this.__list__[i];
            return [this.__list__[i], this.__values__[i]];
          }),
          _unBind: d(function() {
            this.__values__ = null;
            unBind.call(this);
          }),
          toString: d(function() {
            return "[object Map Iterator]";
          })
        });
        Object.defineProperty(
          MapIterator.prototype,
          toStringTagSymbol,
          d("c", "Map Iterator")
        );
      }, { "./iterator-kinds": 71, "d": 15, "es5-ext/object/set-prototype-of": 52, "es6-iterator": 64, "es6-symbol": 74 }], 73: [function(require, module2, exports2) {
        var clear = require("es5-ext/array/#/clear"), eIndexOf = require("es5-ext/array/#/e-index-of"), setPrototypeOf = require("es5-ext/object/set-prototype-of"), callable = require("es5-ext/object/valid-callable"), validValue = require("es5-ext/object/valid-value"), d = require("d"), ee = require("event-emitter"), Symbol2 = require("es6-symbol"), iterator = require("es6-iterator/valid-iterable"), forOf = require("es6-iterator/for-of"), Iterator = require("./lib/iterator"), isNative = require("./is-native-implemented"), call = Function.prototype.call, defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf, MapPoly;
        module2.exports = MapPoly = function() {
          var iterable = arguments[0], keys, values, self2;
          if (!(this instanceof MapPoly))
            throw new TypeError("Constructor requires 'new'");
          if (isNative && setPrototypeOf && Map !== MapPoly) {
            self2 = setPrototypeOf(/* @__PURE__ */ new Map(), getPrototypeOf(this));
          } else {
            self2 = this;
          }
          if (iterable != null)
            iterator(iterable);
          defineProperties(self2, {
            __mapKeysData__: d("c", keys = []),
            __mapValuesData__: d("c", values = [])
          });
          if (!iterable)
            return self2;
          forOf(iterable, function(value) {
            var key = validValue(value)[0];
            value = value[1];
            if (eIndexOf.call(keys, key) !== -1)
              return;
            keys.push(key);
            values.push(value);
          }, self2);
          return self2;
        };
        if (isNative) {
          if (setPrototypeOf)
            setPrototypeOf(MapPoly, Map);
          MapPoly.prototype = Object.create(Map.prototype, {
            constructor: d(MapPoly)
          });
        }
        ee(defineProperties(MapPoly.prototype, {
          clear: d(function() {
            if (!this.__mapKeysData__.length)
              return;
            clear.call(this.__mapKeysData__);
            clear.call(this.__mapValuesData__);
            this.emit("_clear");
          }),
          delete: d(function(key) {
            var index2 = eIndexOf.call(this.__mapKeysData__, key);
            if (index2 === -1)
              return false;
            this.__mapKeysData__.splice(index2, 1);
            this.__mapValuesData__.splice(index2, 1);
            this.emit("_delete", index2, key);
            return true;
          }),
          entries: d(function() {
            return new Iterator(this, "key+value");
          }),
          forEach: d(function(cb) {
            var thisArg = arguments[1], iterator2, result;
            callable(cb);
            iterator2 = this.entries();
            result = iterator2._next();
            while (result !== void 0) {
              call.call(
                cb,
                thisArg,
                this.__mapValuesData__[result],
                this.__mapKeysData__[result],
                this
              );
              result = iterator2._next();
            }
          }),
          get: d(function(key) {
            var index2 = eIndexOf.call(this.__mapKeysData__, key);
            if (index2 === -1)
              return;
            return this.__mapValuesData__[index2];
          }),
          has: d(function(key) {
            return eIndexOf.call(this.__mapKeysData__, key) !== -1;
          }),
          keys: d(function() {
            return new Iterator(this, "key");
          }),
          set: d(function(key, value) {
            var index2 = eIndexOf.call(this.__mapKeysData__, key), emit;
            if (index2 === -1) {
              index2 = this.__mapKeysData__.push(key) - 1;
              emit = true;
            }
            this.__mapValuesData__[index2] = value;
            if (emit)
              this.emit("_add", index2, key);
            return this;
          }),
          size: d.gs(function() {
            return this.__mapKeysData__.length;
          }),
          values: d(function() {
            return new Iterator(this, "value");
          }),
          toString: d(function() {
            return "[object Map]";
          })
        }));
        Object.defineProperty(MapPoly.prototype, Symbol2.iterator, d(function() {
          return this.entries();
        }));
        Object.defineProperty(MapPoly.prototype, Symbol2.toStringTag, d("c", "Map"));
      }, { "./is-native-implemented": 70, "./lib/iterator": 72, "d": 15, "es5-ext/array/#/clear": 21, "es5-ext/array/#/e-index-of": 22, "es5-ext/object/set-prototype-of": 52, "es5-ext/object/valid-callable": 55, "es5-ext/object/valid-value": 56, "es6-iterator/for-of": 62, "es6-iterator/valid-iterable": 67, "es6-symbol": 74, "event-emitter": 82 }], 74: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? require("ext/global-this").Symbol : require("./polyfill");
      }, { "./is-implemented": 75, "./polyfill": 80, "ext/global-this": 85 }], 75: [function(require, module2, exports2) {
        var global2 = require("ext/global-this"), validTypes = { object: true, symbol: true };
        module2.exports = function() {
          var Symbol2 = global2.Symbol;
          var symbol;
          if (typeof Symbol2 !== "function")
            return false;
          symbol = Symbol2("test symbol");
          try {
            String(symbol);
          } catch (e) {
            return false;
          }
          if (!validTypes[typeof Symbol2.iterator])
            return false;
          if (!validTypes[typeof Symbol2.toPrimitive])
            return false;
          if (!validTypes[typeof Symbol2.toStringTag])
            return false;
          return true;
        };
      }, { "ext/global-this": 85 }], 76: [function(require, module2, exports2) {
        module2.exports = function(value) {
          if (!value)
            return false;
          if (typeof value === "symbol")
            return true;
          if (!value.constructor)
            return false;
          if (value.constructor.name !== "Symbol")
            return false;
          return value[value.constructor.toStringTag] === "Symbol";
        };
      }, {}], 77: [function(require, module2, exports2) {
        var d = require("d");
        var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;
        var created = create(null);
        module2.exports = function(desc) {
          var postfix = 0, name, ie11BugWorkaround;
          while (created[desc + (postfix || "")])
            ++postfix;
          desc += postfix || "";
          created[desc] = true;
          name = "@@" + desc;
          defineProperty(
            objPrototype,
            name,
            d.gs(null, function(value) {
              if (ie11BugWorkaround)
                return;
              ie11BugWorkaround = true;
              defineProperty(this, name, d(value));
              ie11BugWorkaround = false;
            })
          );
          return name;
        };
      }, { "d": 15 }], 78: [function(require, module2, exports2) {
        var d = require("d"), NativeSymbol = require("ext/global-this").Symbol;
        module2.exports = function(SymbolPolyfill) {
          return Object.defineProperties(SymbolPolyfill, {
            // To ensure proper interoperability with other native functions (e.g. Array.from)
            // fallback to eventual native implementation of given symbol
            hasInstance: d(
              "",
              NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill("hasInstance")
            ),
            isConcatSpreadable: d(
              "",
              NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill("isConcatSpreadable")
            ),
            iterator: d("", NativeSymbol && NativeSymbol.iterator || SymbolPolyfill("iterator")),
            match: d("", NativeSymbol && NativeSymbol.match || SymbolPolyfill("match")),
            replace: d("", NativeSymbol && NativeSymbol.replace || SymbolPolyfill("replace")),
            search: d("", NativeSymbol && NativeSymbol.search || SymbolPolyfill("search")),
            species: d("", NativeSymbol && NativeSymbol.species || SymbolPolyfill("species")),
            split: d("", NativeSymbol && NativeSymbol.split || SymbolPolyfill("split")),
            toPrimitive: d(
              "",
              NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill("toPrimitive")
            ),
            toStringTag: d(
              "",
              NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill("toStringTag")
            ),
            unscopables: d(
              "",
              NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill("unscopables")
            )
          });
        };
      }, { "d": 15, "ext/global-this": 85 }], 79: [function(require, module2, exports2) {
        var d = require("d"), validateSymbol = require("../../../validate-symbol");
        var registry = /* @__PURE__ */ Object.create(null);
        module2.exports = function(SymbolPolyfill) {
          return Object.defineProperties(SymbolPolyfill, {
            for: d(function(key) {
              if (registry[key])
                return registry[key];
              return registry[key] = SymbolPolyfill(String(key));
            }),
            keyFor: d(function(symbol) {
              var key;
              validateSymbol(symbol);
              for (key in registry) {
                if (registry[key] === symbol)
                  return key;
              }
              return void 0;
            })
          });
        };
      }, { "../../../validate-symbol": 81, "d": 15 }], 80: [function(require, module2, exports2) {
        var d = require("d"), validateSymbol = require("./validate-symbol"), NativeSymbol = require("ext/global-this").Symbol, generateName = require("./lib/private/generate-name"), setupStandardSymbols = require("./lib/private/setup/standard-symbols"), setupSymbolRegistry = require("./lib/private/setup/symbol-registry");
        var create = Object.create, defineProperties = Object.defineProperties, defineProperty = Object.defineProperty;
        var SymbolPolyfill, HiddenSymbol, isNativeSafe;
        if (typeof NativeSymbol === "function") {
          try {
            String(NativeSymbol());
            isNativeSafe = true;
          } catch (ignore) {
          }
        } else {
          NativeSymbol = null;
        }
        HiddenSymbol = function Symbol2(description) {
          if (this instanceof HiddenSymbol)
            throw new TypeError("Symbol is not a constructor");
          return SymbolPolyfill(description);
        };
        module2.exports = SymbolPolyfill = function Symbol2(description) {
          var symbol;
          if (this instanceof Symbol2)
            throw new TypeError("Symbol is not a constructor");
          if (isNativeSafe)
            return NativeSymbol(description);
          symbol = create(HiddenSymbol.prototype);
          description = description === void 0 ? "" : String(description);
          return defineProperties(symbol, {
            __description__: d("", description),
            __name__: d("", generateName(description))
          });
        };
        setupStandardSymbols(SymbolPolyfill);
        setupSymbolRegistry(SymbolPolyfill);
        defineProperties(HiddenSymbol.prototype, {
          constructor: d(SymbolPolyfill),
          toString: d("", function() {
            return this.__name__;
          })
        });
        defineProperties(SymbolPolyfill.prototype, {
          toString: d(function() {
            return "Symbol (" + validateSymbol(this).__description__ + ")";
          }),
          valueOf: d(function() {
            return validateSymbol(this);
          })
        });
        defineProperty(
          SymbolPolyfill.prototype,
          SymbolPolyfill.toPrimitive,
          d("", function() {
            var symbol = validateSymbol(this);
            if (typeof symbol === "symbol")
              return symbol;
            return symbol.toString();
          })
        );
        defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));
        defineProperty(
          HiddenSymbol.prototype,
          SymbolPolyfill.toStringTag,
          d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
        );
        defineProperty(
          HiddenSymbol.prototype,
          SymbolPolyfill.toPrimitive,
          d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
        );
      }, { "./lib/private/generate-name": 77, "./lib/private/setup/standard-symbols": 78, "./lib/private/setup/symbol-registry": 79, "./validate-symbol": 81, "d": 15, "ext/global-this": 85 }], 81: [function(require, module2, exports2) {
        var isSymbol = require("./is-symbol");
        module2.exports = function(value) {
          if (!isSymbol(value))
            throw new TypeError(value + " is not a symbol");
          return value;
        };
      }, { "./is-symbol": 76 }], 82: [function(require, module2, exports2) {
        var d = require("d"), callable = require("es5-ext/object/valid-callable"), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, hasOwnProperty2 = Object.prototype.hasOwnProperty, descriptor = { configurable: true, enumerable: false, writable: true }, on, once, off, emit, methods, descriptors, base;
        on = function(type2, listener) {
          var data;
          callable(listener);
          if (!hasOwnProperty2.call(this, "__ee__")) {
            data = descriptor.value = create(null);
            defineProperty(this, "__ee__", descriptor);
            descriptor.value = null;
          } else {
            data = this.__ee__;
          }
          if (!data[type2])
            data[type2] = listener;
          else if (typeof data[type2] === "object")
            data[type2].push(listener);
          else
            data[type2] = [data[type2], listener];
          return this;
        };
        once = function(type2, listener) {
          var once2, self2;
          callable(listener);
          self2 = this;
          on.call(this, type2, once2 = function() {
            off.call(self2, type2, once2);
            apply.call(listener, this, arguments);
          });
          once2.__eeOnceListener__ = listener;
          return this;
        };
        off = function(type2, listener) {
          var data, listeners, candidate, i;
          callable(listener);
          if (!hasOwnProperty2.call(this, "__ee__"))
            return this;
          data = this.__ee__;
          if (!data[type2])
            return this;
          listeners = data[type2];
          if (typeof listeners === "object") {
            for (i = 0; candidate = listeners[i]; ++i) {
              if (candidate === listener || candidate.__eeOnceListener__ === listener) {
                if (listeners.length === 2)
                  data[type2] = listeners[i ? 0 : 1];
                else
                  listeners.splice(i, 1);
              }
            }
          } else {
            if (listeners === listener || listeners.__eeOnceListener__ === listener) {
              delete data[type2];
            }
          }
          return this;
        };
        emit = function(type2) {
          var i, l, listener, listeners, args;
          if (!hasOwnProperty2.call(this, "__ee__"))
            return;
          listeners = this.__ee__[type2];
          if (!listeners)
            return;
          if (typeof listeners === "object") {
            l = arguments.length;
            args = new Array(l - 1);
            for (i = 1; i < l; ++i)
              args[i - 1] = arguments[i];
            listeners = listeners.slice();
            for (i = 0; listener = listeners[i]; ++i) {
              apply.call(listener, this, args);
            }
          } else {
            switch (arguments.length) {
              case 1:
                call.call(listeners, this);
                break;
              case 2:
                call.call(listeners, this, arguments[1]);
                break;
              case 3:
                call.call(listeners, this, arguments[1], arguments[2]);
                break;
              default:
                l = arguments.length;
                args = new Array(l - 1);
                for (i = 1; i < l; ++i) {
                  args[i - 1] = arguments[i];
                }
                apply.call(listeners, this, args);
            }
          }
        };
        methods = {
          on,
          once,
          off,
          emit
        };
        descriptors = {
          on: d(on),
          once: d(once),
          off: d(off),
          emit: d(emit)
        };
        base = defineProperties({}, descriptors);
        module2.exports = exports2 = function(o) {
          return o == null ? create(base) : defineProperties(Object(o), descriptors);
        };
        exports2.methods = methods;
      }, { "d": 15, "es5-ext/object/valid-callable": 55 }], 83: [function(require, module2, exports2) {
        var objectCreate = Object.create || objectCreatePolyfill;
        var objectKeys = Object.keys || objectKeysPolyfill;
        var bind = Function.prototype.bind || functionBindPolyfill;
        function EventEmitter() {
          if (!this._events || !Object.prototype.hasOwnProperty.call(this, "_events")) {
            this._events = objectCreate(null);
            this._eventsCount = 0;
          }
          this._maxListeners = this._maxListeners || void 0;
        }
        module2.exports = EventEmitter;
        EventEmitter.EventEmitter = EventEmitter;
        EventEmitter.prototype._events = void 0;
        EventEmitter.prototype._maxListeners = void 0;
        var defaultMaxListeners = 10;
        var hasDefineProperty;
        try {
          var o = {};
          if (Object.defineProperty)
            Object.defineProperty(o, "x", { value: 0 });
          hasDefineProperty = o.x === 0;
        } catch (err) {
          hasDefineProperty = false;
        }
        if (hasDefineProperty) {
          Object.defineProperty(EventEmitter, "defaultMaxListeners", {
            enumerable: true,
            get: function() {
              return defaultMaxListeners;
            },
            set: function(arg) {
              if (typeof arg !== "number" || arg < 0 || arg !== arg)
                throw new TypeError('"defaultMaxListeners" must be a positive number');
              defaultMaxListeners = arg;
            }
          });
        } else {
          EventEmitter.defaultMaxListeners = defaultMaxListeners;
        }
        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
          if (typeof n !== "number" || n < 0 || isNaN(n))
            throw new TypeError('"n" argument must be a positive number');
          this._maxListeners = n;
          return this;
        };
        function $getMaxListeners(that) {
          if (that._maxListeners === void 0)
            return EventEmitter.defaultMaxListeners;
          return that._maxListeners;
        }
        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
          return $getMaxListeners(this);
        };
        function emitNone(handler, isFn, self2) {
          if (isFn)
            handler.call(self2);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              listeners[i].call(self2);
          }
        }
        function emitOne(handler, isFn, self2, arg1) {
          if (isFn)
            handler.call(self2, arg1);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              listeners[i].call(self2, arg1);
          }
        }
        function emitTwo(handler, isFn, self2, arg1, arg2) {
          if (isFn)
            handler.call(self2, arg1, arg2);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              listeners[i].call(self2, arg1, arg2);
          }
        }
        function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
          if (isFn)
            handler.call(self2, arg1, arg2, arg3);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              listeners[i].call(self2, arg1, arg2, arg3);
          }
        }
        function emitMany(handler, isFn, self2, args) {
          if (isFn)
            handler.apply(self2, args);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              listeners[i].apply(self2, args);
          }
        }
        EventEmitter.prototype.emit = function emit(type2) {
          var er, handler, len, args, i, events;
          var doError = type2 === "error";
          events = this._events;
          if (events)
            doError = doError && events.error == null;
          else if (!doError)
            return false;
          if (doError) {
            if (arguments.length > 1)
              er = arguments[1];
            if (er instanceof Error) {
              throw er;
            } else {
              var err = new Error('Unhandled "error" event. (' + er + ")");
              err.context = er;
              throw err;
            }
          }
          handler = events[type2];
          if (!handler)
            return false;
          var isFn = typeof handler === "function";
          len = arguments.length;
          switch (len) {
            case 1:
              emitNone(handler, isFn, this);
              break;
            case 2:
              emitOne(handler, isFn, this, arguments[1]);
              break;
            case 3:
              emitTwo(handler, isFn, this, arguments[1], arguments[2]);
              break;
            case 4:
              emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
              break;
            default:
              args = new Array(len - 1);
              for (i = 1; i < len; i++)
                args[i - 1] = arguments[i];
              emitMany(handler, isFn, this, args);
          }
          return true;
        };
        function _addListener(target, type2, listener, prepend) {
          var m;
          var events;
          var existing;
          if (typeof listener !== "function")
            throw new TypeError('"listener" argument must be a function');
          events = target._events;
          if (!events) {
            events = target._events = objectCreate(null);
            target._eventsCount = 0;
          } else {
            if (events.newListener) {
              target.emit(
                "newListener",
                type2,
                listener.listener ? listener.listener : listener
              );
              events = target._events;
            }
            existing = events[type2];
          }
          if (!existing) {
            existing = events[type2] = listener;
            ++target._eventsCount;
          } else {
            if (typeof existing === "function") {
              existing = events[type2] = prepend ? [listener, existing] : [existing, listener];
            } else {
              if (prepend) {
                existing.unshift(listener);
              } else {
                existing.push(listener);
              }
            }
            if (!existing.warned) {
              m = $getMaxListeners(target);
              if (m && m > 0 && existing.length > m) {
                existing.warned = true;
                var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + ' "' + String(type2) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
                w.name = "MaxListenersExceededWarning";
                w.emitter = target;
                w.type = type2;
                w.count = existing.length;
                if (typeof console === "object" && console.warn) {
                  formatAppLog("warn", "at node_modules/mqtt/dist/mqtt.js:7326", "%s: %s", w.name, w.message);
                }
              }
            }
          }
          return target;
        }
        EventEmitter.prototype.addListener = function addListener(type2, listener) {
          return _addListener(this, type2, listener, false);
        };
        EventEmitter.prototype.on = EventEmitter.prototype.addListener;
        EventEmitter.prototype.prependListener = function prependListener(type2, listener) {
          return _addListener(this, type2, listener, true);
        };
        function onceWrapper() {
          if (!this.fired) {
            this.target.removeListener(this.type, this.wrapFn);
            this.fired = true;
            switch (arguments.length) {
              case 0:
                return this.listener.call(this.target);
              case 1:
                return this.listener.call(this.target, arguments[0]);
              case 2:
                return this.listener.call(this.target, arguments[0], arguments[1]);
              case 3:
                return this.listener.call(
                  this.target,
                  arguments[0],
                  arguments[1],
                  arguments[2]
                );
              default:
                var args = new Array(arguments.length);
                for (var i = 0; i < args.length; ++i)
                  args[i] = arguments[i];
                this.listener.apply(this.target, args);
            }
          }
        }
        function _onceWrap(target, type2, listener) {
          var state = { fired: false, wrapFn: void 0, target, type: type2, listener };
          var wrapped = bind.call(onceWrapper, state);
          wrapped.listener = listener;
          state.wrapFn = wrapped;
          return wrapped;
        }
        EventEmitter.prototype.once = function once(type2, listener) {
          if (typeof listener !== "function")
            throw new TypeError('"listener" argument must be a function');
          this.on(type2, _onceWrap(this, type2, listener));
          return this;
        };
        EventEmitter.prototype.prependOnceListener = function prependOnceListener(type2, listener) {
          if (typeof listener !== "function")
            throw new TypeError('"listener" argument must be a function');
          this.prependListener(type2, _onceWrap(this, type2, listener));
          return this;
        };
        EventEmitter.prototype.removeListener = function removeListener(type2, listener) {
          var list, events, position, i, originalListener;
          if (typeof listener !== "function")
            throw new TypeError('"listener" argument must be a function');
          events = this._events;
          if (!events)
            return this;
          list = events[type2];
          if (!list)
            return this;
          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
              this._events = objectCreate(null);
            else {
              delete events[type2];
              if (events.removeListener)
                this.emit("removeListener", type2, list.listener || listener);
            }
          } else if (typeof list !== "function") {
            position = -1;
            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }
            if (position < 0)
              return this;
            if (position === 0)
              list.shift();
            else
              spliceOne(list, position);
            if (list.length === 1)
              events[type2] = list[0];
            if (events.removeListener)
              this.emit("removeListener", type2, originalListener || listener);
          }
          return this;
        };
        EventEmitter.prototype.removeAllListeners = function removeAllListeners(type2) {
          var listeners, events, i;
          events = this._events;
          if (!events)
            return this;
          if (!events.removeListener) {
            if (arguments.length === 0) {
              this._events = objectCreate(null);
              this._eventsCount = 0;
            } else if (events[type2]) {
              if (--this._eventsCount === 0)
                this._events = objectCreate(null);
              else
                delete events[type2];
            }
            return this;
          }
          if (arguments.length === 0) {
            var keys = objectKeys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === "removeListener")
                continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = objectCreate(null);
            this._eventsCount = 0;
            return this;
          }
          listeners = events[type2];
          if (typeof listeners === "function") {
            this.removeListener(type2, listeners);
          } else if (listeners) {
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type2, listeners[i]);
            }
          }
          return this;
        };
        function _listeners(target, type2, unwrap) {
          var events = target._events;
          if (!events)
            return [];
          var evlistener = events[type2];
          if (!evlistener)
            return [];
          if (typeof evlistener === "function")
            return unwrap ? [evlistener.listener || evlistener] : [evlistener];
          return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
        }
        EventEmitter.prototype.listeners = function listeners(type2) {
          return _listeners(this, type2, true);
        };
        EventEmitter.prototype.rawListeners = function rawListeners(type2) {
          return _listeners(this, type2, false);
        };
        EventEmitter.listenerCount = function(emitter, type2) {
          if (typeof emitter.listenerCount === "function") {
            return emitter.listenerCount(type2);
          } else {
            return listenerCount.call(emitter, type2);
          }
        };
        EventEmitter.prototype.listenerCount = listenerCount;
        function listenerCount(type2) {
          var events = this._events;
          if (events) {
            var evlistener = events[type2];
            if (typeof evlistener === "function") {
              return 1;
            } else if (evlistener) {
              return evlistener.length;
            }
          }
          return 0;
        }
        EventEmitter.prototype.eventNames = function eventNames() {
          return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
        };
        function spliceOne(list, index2) {
          for (var i = index2, k = i + 1, n = list.length; k < n; i += 1, k += 1)
            list[i] = list[k];
          list.pop();
        }
        function arrayClone(arr, n) {
          var copy = new Array(n);
          for (var i = 0; i < n; ++i)
            copy[i] = arr[i];
          return copy;
        }
        function unwrapListeners(arr) {
          var ret = new Array(arr.length);
          for (var i = 0; i < ret.length; ++i) {
            ret[i] = arr[i].listener || arr[i];
          }
          return ret;
        }
        function objectCreatePolyfill(proto) {
          var F = function() {
          };
          F.prototype = proto;
          return new F();
        }
        function objectKeysPolyfill(obj) {
          for (var k in obj)
            if (Object.prototype.hasOwnProperty.call(obj, k))
              ;
          return k;
        }
        function functionBindPolyfill(context) {
          var fn = this;
          return function() {
            return fn.apply(context, arguments);
          };
        }
      }, {}], 84: [function(require, module2, exports2) {
        var naiveFallback = function() {
          if (typeof self === "object" && self)
            return self;
          if (typeof window === "object" && window)
            return window;
          throw new Error("Unable to resolve global `this`");
        };
        module2.exports = function() {
          if (this)
            return this;
          try {
            Object.defineProperty(Object.prototype, "__global__", {
              get: function() {
                return this;
              },
              configurable: true
            });
          } catch (error2) {
            return naiveFallback();
          }
          try {
            if (!__global__)
              return naiveFallback();
            return __global__;
          } finally {
            delete Object.prototype.__global__;
          }
        }();
      }, {}], 85: [function(require, module2, exports2) {
        module2.exports = require("./is-implemented")() ? globalThis : require("./implementation");
      }, { "./implementation": 84, "./is-implemented": 86 }], 86: [function(require, module2, exports2) {
        module2.exports = function() {
          if (typeof globalThis !== "object")
            return false;
          if (!globalThis)
            return false;
          return globalThis.Array === Array;
        };
      }, {}], 87: [function(require, module2, exports2) {
        exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
          var e, m;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var nBits = -7;
          var i = isLE ? nBytes - 1 : 0;
          var d = isLE ? -1 : 1;
          var s = buffer[offset + i];
          i += d;
          e = s & (1 << -nBits) - 1;
          s >>= -nBits;
          nBits += eLen;
          for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
          }
          m = e & (1 << -nBits) - 1;
          e >>= -nBits;
          nBits += mLen;
          for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
          }
          if (e === 0) {
            e = 1 - eBias;
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity;
          } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        };
        exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
          var e, m, c;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
          var i = isLE ? 0 : nBytes - 1;
          var d = isLE ? 1 : -1;
          var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
          value = Math.abs(value);
          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
          } else {
            e = Math.floor(Math.log(value) / Math.LN2);
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--;
              c *= 2;
            }
            if (e + eBias >= 1) {
              value += rt / c;
            } else {
              value += rt * Math.pow(2, 1 - eBias);
            }
            if (value * c >= 2) {
              e++;
              c /= 2;
            }
            if (e + eBias >= eMax) {
              m = 0;
              e = eMax;
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen);
              e = e + eBias;
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
              e = 0;
            }
          }
          for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
          }
          e = e << mLen | m;
          eLen += mLen;
          for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
          }
          buffer[offset + i - d] |= s * 128;
        };
      }, {}], 88: [function(require, module2, exports2) {
        if (typeof Object.create === "function") {
          module2.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          };
        } else {
          module2.exports = function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          };
        }
      }, {}], 89: [function(require, module2, exports2) {
        /*!
         * Determine if an object is a Buffer
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        module2.exports = function(obj) {
          return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
        };
        function isBuffer(obj) {
          return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
        }
        function isSlowBuffer(obj) {
          return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
        }
      }, {}], 90: [function(require, module2, exports2) {
        var Buffer = require("safe-buffer").Buffer;
        var protocol = module2.exports;
        protocol.types = {
          0: "reserved",
          1: "connect",
          2: "connack",
          3: "publish",
          4: "puback",
          5: "pubrec",
          6: "pubrel",
          7: "pubcomp",
          8: "subscribe",
          9: "suback",
          10: "unsubscribe",
          11: "unsuback",
          12: "pingreq",
          13: "pingresp",
          14: "disconnect",
          15: "auth"
        };
        protocol.codes = {};
        for (var k in protocol.types) {
          var v = protocol.types[k];
          protocol.codes[v] = k;
        }
        protocol.CMD_SHIFT = 4;
        protocol.CMD_MASK = 240;
        protocol.DUP_MASK = 8;
        protocol.QOS_MASK = 3;
        protocol.QOS_SHIFT = 1;
        protocol.RETAIN_MASK = 1;
        protocol.LENGTH_MASK = 127;
        protocol.LENGTH_FIN_MASK = 128;
        protocol.SESSIONPRESENT_MASK = 1;
        protocol.SESSIONPRESENT_HEADER = Buffer.from([protocol.SESSIONPRESENT_MASK]);
        protocol.CONNACK_HEADER = Buffer.from([protocol.codes["connack"] << protocol.CMD_SHIFT]);
        protocol.USERNAME_MASK = 128;
        protocol.PASSWORD_MASK = 64;
        protocol.WILL_RETAIN_MASK = 32;
        protocol.WILL_QOS_MASK = 24;
        protocol.WILL_QOS_SHIFT = 3;
        protocol.WILL_FLAG_MASK = 4;
        protocol.CLEAN_SESSION_MASK = 2;
        protocol.CONNECT_HEADER = Buffer.from([protocol.codes["connect"] << protocol.CMD_SHIFT]);
        protocol.properties = {
          sessionExpiryInterval: 17,
          willDelayInterval: 24,
          receiveMaximum: 33,
          maximumPacketSize: 39,
          topicAliasMaximum: 34,
          requestResponseInformation: 25,
          requestProblemInformation: 23,
          userProperties: 38,
          authenticationMethod: 21,
          authenticationData: 22,
          payloadFormatIndicator: 1,
          messageExpiryInterval: 2,
          contentType: 3,
          responseTopic: 8,
          correlationData: 9,
          maximumQoS: 36,
          retainAvailable: 37,
          assignedClientIdentifier: 18,
          reasonString: 31,
          wildcardSubscriptionAvailable: 40,
          subscriptionIdentifiersAvailable: 41,
          sharedSubscriptionAvailable: 42,
          serverKeepAlive: 19,
          responseInformation: 26,
          serverReference: 28,
          topicAlias: 35,
          subscriptionIdentifier: 11
        };
        protocol.propertiesCodes = {};
        for (var prop in protocol.properties) {
          var id = protocol.properties[prop];
          protocol.propertiesCodes[id] = prop;
        }
        protocol.propertiesTypes = {
          sessionExpiryInterval: "int32",
          willDelayInterval: "int32",
          receiveMaximum: "int16",
          maximumPacketSize: "int32",
          topicAliasMaximum: "int16",
          requestResponseInformation: "byte",
          requestProblemInformation: "byte",
          userProperties: "pair",
          authenticationMethod: "string",
          authenticationData: "binary",
          payloadFormatIndicator: "byte",
          messageExpiryInterval: "int32",
          contentType: "string",
          responseTopic: "string",
          correlationData: "binary",
          maximumQoS: "int8",
          retainAvailable: "byte",
          assignedClientIdentifier: "string",
          reasonString: "string",
          wildcardSubscriptionAvailable: "byte",
          subscriptionIdentifiersAvailable: "byte",
          sharedSubscriptionAvailable: "byte",
          serverKeepAlive: "int32",
          responseInformation: "string",
          serverReference: "string",
          topicAlias: "int16",
          subscriptionIdentifier: "var"
        };
        function genHeader(type2) {
          return [0, 1, 2].map(function(qos) {
            return [0, 1].map(function(dup) {
              return [0, 1].map(function(retain) {
                var buf = new Buffer(1);
                buf.writeUInt8(
                  protocol.codes[type2] << protocol.CMD_SHIFT | (dup ? protocol.DUP_MASK : 0) | qos << protocol.QOS_SHIFT | retain,
                  0,
                  true
                );
                return buf;
              });
            });
          });
        }
        protocol.PUBLISH_HEADER = genHeader("publish");
        protocol.SUBSCRIBE_HEADER = genHeader("subscribe");
        protocol.SUBSCRIBE_OPTIONS_QOS_MASK = 3;
        protocol.SUBSCRIBE_OPTIONS_NL_MASK = 1;
        protocol.SUBSCRIBE_OPTIONS_NL_SHIFT = 2;
        protocol.SUBSCRIBE_OPTIONS_RAP_MASK = 1;
        protocol.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3;
        protocol.SUBSCRIBE_OPTIONS_RH_MASK = 3;
        protocol.SUBSCRIBE_OPTIONS_RH_SHIFT = 4;
        protocol.SUBSCRIBE_OPTIONS_RH = [0, 16, 32];
        protocol.SUBSCRIBE_OPTIONS_NL = 4;
        protocol.SUBSCRIBE_OPTIONS_RAP = 8;
        protocol.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2];
        protocol.UNSUBSCRIBE_HEADER = genHeader("unsubscribe");
        protocol.ACKS = {
          unsuback: genHeader("unsuback"),
          puback: genHeader("puback"),
          pubcomp: genHeader("pubcomp"),
          pubrel: genHeader("pubrel"),
          pubrec: genHeader("pubrec")
        };
        protocol.SUBACK_HEADER = Buffer.from([protocol.codes["suback"] << protocol.CMD_SHIFT]);
        protocol.VERSION3 = Buffer.from([3]);
        protocol.VERSION4 = Buffer.from([4]);
        protocol.VERSION5 = Buffer.from([5]);
        protocol.QOS = [0, 1, 2].map(function(qos) {
          return Buffer.from([qos]);
        });
        protocol.EMPTY = {
          pingreq: Buffer.from([protocol.codes["pingreq"] << 4, 0]),
          pingresp: Buffer.from([protocol.codes["pingresp"] << 4, 0]),
          disconnect: Buffer.from([protocol.codes["disconnect"] << 4, 0])
        };
      }, { "safe-buffer": 118 }], 91: [function(require, module2, exports2) {
        var Buffer = require("safe-buffer").Buffer;
        var writeToStream = require("./writeToStream");
        var EE = require("events").EventEmitter;
        var inherits = require("inherits");
        function generate(packet, opts) {
          var stream = new Accumulator();
          writeToStream(packet, stream, opts);
          return stream.concat();
        }
        function Accumulator() {
          this._array = new Array(20);
          this._i = 0;
        }
        inherits(Accumulator, EE);
        Accumulator.prototype.write = function(chunk) {
          this._array[this._i++] = chunk;
          return true;
        };
        Accumulator.prototype.concat = function() {
          var length = 0;
          var lengths = new Array(this._array.length);
          var list = this._array;
          var pos = 0;
          var i;
          var result;
          for (i = 0; i < list.length && list[i] !== void 0; i++) {
            if (typeof list[i] !== "string")
              lengths[i] = list[i].length;
            else
              lengths[i] = Buffer.byteLength(list[i]);
            length += lengths[i];
          }
          result = Buffer.allocUnsafe(length);
          for (i = 0; i < list.length && list[i] !== void 0; i++) {
            if (typeof list[i] !== "string") {
              list[i].copy(result, pos);
              pos += lengths[i];
            } else {
              result.write(list[i], pos);
              pos += lengths[i];
            }
          }
          return result;
        };
        module2.exports = generate;
      }, { "./writeToStream": 97, "events": 83, "inherits": 88, "safe-buffer": 118 }], 92: [function(require, module2, exports2) {
        exports2.parser = require("./parser");
        exports2.generate = require("./generate");
        exports2.writeToStream = require("./writeToStream");
      }, { "./generate": 91, "./parser": 96, "./writeToStream": 97 }], 93: [function(require, module2, exports2) {
        var DuplexStream = require("readable-stream/duplex"), util = require("util"), Buffer = require("safe-buffer").Buffer;
        function BufferList(callback) {
          if (!(this instanceof BufferList))
            return new BufferList(callback);
          this._bufs = [];
          this.length = 0;
          if (typeof callback == "function") {
            this._callback = callback;
            var piper = function piper2(err) {
              if (this._callback) {
                this._callback(err);
                this._callback = null;
              }
            }.bind(this);
            this.on("pipe", function onPipe(src) {
              src.on("error", piper);
            });
            this.on("unpipe", function onUnpipe(src) {
              src.removeListener("error", piper);
            });
          } else {
            this.append(callback);
          }
          DuplexStream.call(this);
        }
        util.inherits(BufferList, DuplexStream);
        BufferList.prototype._offset = function _offset(offset) {
          var tot = 0, i = 0, _t2;
          if (offset === 0)
            return [0, 0];
          for (; i < this._bufs.length; i++) {
            _t2 = tot + this._bufs[i].length;
            if (offset < _t2 || i == this._bufs.length - 1)
              return [i, offset - tot];
            tot = _t2;
          }
        };
        BufferList.prototype.append = function append(buf) {
          var i = 0;
          if (Buffer.isBuffer(buf)) {
            this._appendBuffer(buf);
          } else if (Array.isArray(buf)) {
            for (; i < buf.length; i++)
              this.append(buf[i]);
          } else if (buf instanceof BufferList) {
            for (; i < buf._bufs.length; i++)
              this.append(buf._bufs[i]);
          } else if (buf != null) {
            if (typeof buf == "number")
              buf = buf.toString();
            this._appendBuffer(Buffer.from(buf));
          }
          return this;
        };
        BufferList.prototype._appendBuffer = function appendBuffer(buf) {
          this._bufs.push(buf);
          this.length += buf.length;
        };
        BufferList.prototype._write = function _write(buf, encoding, callback) {
          this._appendBuffer(buf);
          if (typeof callback == "function")
            callback();
        };
        BufferList.prototype._read = function _read(size) {
          if (!this.length)
            return this.push(null);
          size = Math.min(size, this.length);
          this.push(this.slice(0, size));
          this.consume(size);
        };
        BufferList.prototype.end = function end(chunk) {
          DuplexStream.prototype.end.call(this, chunk);
          if (this._callback) {
            this._callback(null, this.slice());
            this._callback = null;
          }
        };
        BufferList.prototype.get = function get(index2) {
          return this.slice(index2, index2 + 1)[0];
        };
        BufferList.prototype.slice = function slice(start, end) {
          if (typeof start == "number" && start < 0)
            start += this.length;
          if (typeof end == "number" && end < 0)
            end += this.length;
          return this.copy(null, 0, start, end);
        };
        BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
          if (typeof srcStart != "number" || srcStart < 0)
            srcStart = 0;
          if (typeof srcEnd != "number" || srcEnd > this.length)
            srcEnd = this.length;
          if (srcStart >= this.length)
            return dst || Buffer.alloc(0);
          if (srcEnd <= 0)
            return dst || Buffer.alloc(0);
          var copy2 = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart, bytes = len, bufoff = copy2 && dstStart || 0, start = off[1], l, i;
          if (srcStart === 0 && srcEnd == this.length) {
            if (!copy2) {
              return this._bufs.length === 1 ? this._bufs[0] : Buffer.concat(this._bufs, this.length);
            }
            for (i = 0; i < this._bufs.length; i++) {
              this._bufs[i].copy(dst, bufoff);
              bufoff += this._bufs[i].length;
            }
            return dst;
          }
          if (bytes <= this._bufs[off[0]].length - start) {
            return copy2 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
          }
          if (!copy2)
            dst = Buffer.allocUnsafe(len);
          for (i = off[0]; i < this._bufs.length; i++) {
            l = this._bufs[i].length - start;
            if (bytes > l) {
              this._bufs[i].copy(dst, bufoff, start);
            } else {
              this._bufs[i].copy(dst, bufoff, start, start + bytes);
              break;
            }
            bufoff += l;
            bytes -= l;
            if (start)
              start = 0;
          }
          return dst;
        };
        BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
          start = start || 0;
          end = end || this.length;
          if (start < 0)
            start += this.length;
          if (end < 0)
            end += this.length;
          var startOffset = this._offset(start), endOffset = this._offset(end), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
          if (endOffset[1] == 0)
            buffers.pop();
          else
            buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
          if (startOffset[1] != 0)
            buffers[0] = buffers[0].slice(startOffset[1]);
          return new BufferList(buffers);
        };
        BufferList.prototype.toString = function toString(encoding, start, end) {
          return this.slice(start, end).toString(encoding);
        };
        BufferList.prototype.consume = function consume(bytes) {
          while (this._bufs.length) {
            if (bytes >= this._bufs[0].length) {
              bytes -= this._bufs[0].length;
              this.length -= this._bufs[0].length;
              this._bufs.shift();
            } else {
              this._bufs[0] = this._bufs[0].slice(bytes);
              this.length -= bytes;
              break;
            }
          }
          return this;
        };
        BufferList.prototype.duplicate = function duplicate() {
          var i = 0, copy = new BufferList();
          for (; i < this._bufs.length; i++)
            copy.append(this._bufs[i]);
          return copy;
        };
        BufferList.prototype.destroy = function destroy() {
          this._bufs.length = 0;
          this.length = 0;
          this.push(null);
        };
        (function() {
          var methods = {
            "readDoubleBE": 8,
            "readDoubleLE": 8,
            "readFloatBE": 4,
            "readFloatLE": 4,
            "readInt32BE": 4,
            "readInt32LE": 4,
            "readUInt32BE": 4,
            "readUInt32LE": 4,
            "readInt16BE": 2,
            "readInt16LE": 2,
            "readUInt16BE": 2,
            "readUInt16LE": 2,
            "readInt8": 1,
            "readUInt8": 1
          };
          for (var m in methods) {
            (function(m2) {
              BufferList.prototype[m2] = function(offset) {
                return this.slice(offset, offset + methods[m2])[m2](0);
              };
            })(m);
          }
        })();
        module2.exports = BufferList;
      }, { "readable-stream/duplex": 105, "safe-buffer": 118, "util": 136 }], 94: [function(require, module2, exports2) {
        var Buffer = require("safe-buffer").Buffer;
        var max = 65536;
        var cache = {};
        function generateBuffer(i) {
          var buffer = Buffer.allocUnsafe(2);
          buffer.writeUInt8(i >> 8, 0);
          buffer.writeUInt8(i & 255, 0 + 1);
          return buffer;
        }
        function generateCache() {
          for (var i = 0; i < max; i++) {
            cache[i] = generateBuffer(i);
          }
        }
        function calcVariableByteIntLength(length) {
          if (length >= 0 && length < 128)
            return 1;
          else if (length >= 128 && length < 16384)
            return 2;
          else if (length >= 16384 && length < 2097152)
            return 3;
          else if (length >= 2097152 && length < 268435456)
            return 4;
          else
            return 0;
        }
        function genBufVariableByteInt(num) {
          var digit = 0;
          var pos = 0;
          var length = calcVariableByteIntLength(num);
          var buffer = Buffer.allocUnsafe(length);
          do {
            digit = num % 128 | 0;
            num = num / 128 | 0;
            if (num > 0)
              digit = digit | 128;
            buffer.writeUInt8(digit, pos++);
          } while (num > 0);
          return {
            data: buffer,
            length
          };
        }
        function generate4ByteBuffer(num) {
          var buffer = Buffer.allocUnsafe(4);
          buffer.writeUInt32BE(num, 0);
          return buffer;
        }
        module2.exports = {
          cache,
          generateCache,
          generateNumber: generateBuffer,
          genBufVariableByteInt,
          generate4ByteBuffer
        };
      }, { "safe-buffer": 118 }], 95: [function(require, module2, exports2) {
        function Packet() {
          this.cmd = null;
          this.retain = false;
          this.qos = 0;
          this.dup = false;
          this.length = -1;
          this.topic = null;
          this.payload = null;
        }
        module2.exports = Packet;
      }, {}], 96: [function(require, module2, exports2) {
        var bl = require("bl");
        var inherits = require("inherits");
        var EE = require("events").EventEmitter;
        var Packet = require("./packet");
        var constants = require("./constants");
        function Parser(opt) {
          if (!(this instanceof Parser))
            return new Parser(opt);
          this.settings = opt || {};
          this._states = [
            "_parseHeader",
            "_parseLength",
            "_parsePayload",
            "_newPacket"
          ];
          this._resetState();
        }
        inherits(Parser, EE);
        Parser.prototype._resetState = function() {
          this.packet = new Packet();
          this.error = null;
          this._list = bl();
          this._stateCounter = 0;
        };
        Parser.prototype.parse = function(buf) {
          if (this.error)
            this._resetState();
          this._list.append(buf);
          while ((this.packet.length !== -1 || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error) {
            this._stateCounter++;
            if (this._stateCounter >= this._states.length)
              this._stateCounter = 0;
          }
          return this._list.length;
        };
        Parser.prototype._parseHeader = function() {
          var zero = this._list.readUInt8(0);
          this.packet.cmd = constants.types[zero >> constants.CMD_SHIFT];
          this.packet.retain = (zero & constants.RETAIN_MASK) !== 0;
          this.packet.qos = zero >> constants.QOS_SHIFT & constants.QOS_MASK;
          this.packet.dup = (zero & constants.DUP_MASK) !== 0;
          this._list.consume(1);
          return true;
        };
        Parser.prototype._parseLength = function() {
          var result = this._parseVarByteNum(true);
          if (result) {
            this.packet.length = result.value;
            this._list.consume(result.bytes);
          }
          return !!result;
        };
        Parser.prototype._parsePayload = function() {
          var result = false;
          if (this.packet.length === 0 || this._list.length >= this.packet.length) {
            this._pos = 0;
            switch (this.packet.cmd) {
              case "connect":
                this._parseConnect();
                break;
              case "connack":
                this._parseConnack();
                break;
              case "publish":
                this._parsePublish();
                break;
              case "puback":
              case "pubrec":
              case "pubrel":
              case "pubcomp":
                this._parseConfirmation();
                break;
              case "subscribe":
                this._parseSubscribe();
                break;
              case "suback":
                this._parseSuback();
                break;
              case "unsubscribe":
                this._parseUnsubscribe();
                break;
              case "unsuback":
                this._parseUnsuback();
                break;
              case "pingreq":
              case "pingresp":
                break;
              case "disconnect":
                this._parseDisconnect();
                break;
              case "auth":
                this._parseAuth();
                break;
              default:
                this._emitError(new Error("Not supported"));
            }
            result = true;
          }
          return result;
        };
        Parser.prototype._parseConnect = function() {
          var protocolId;
          var clientId;
          var topic;
          var payload;
          var password2;
          var username2;
          var flags = {};
          var packet = this.packet;
          protocolId = this._parseString();
          if (protocolId === null)
            return this._emitError(new Error("Cannot parse protocolId"));
          if (protocolId !== "MQTT" && protocolId !== "MQIsdp") {
            return this._emitError(new Error("Invalid protocolId"));
          }
          packet.protocolId = protocolId;
          if (this._pos >= this._list.length)
            return this._emitError(new Error("Packet too short"));
          packet.protocolVersion = this._list.readUInt8(this._pos);
          if (packet.protocolVersion !== 3 && packet.protocolVersion !== 4 && packet.protocolVersion !== 5) {
            return this._emitError(new Error("Invalid protocol version"));
          }
          this._pos++;
          if (this._pos >= this._list.length) {
            return this._emitError(new Error("Packet too short"));
          }
          flags.username = this._list.readUInt8(this._pos) & constants.USERNAME_MASK;
          flags.password = this._list.readUInt8(this._pos) & constants.PASSWORD_MASK;
          flags.will = this._list.readUInt8(this._pos) & constants.WILL_FLAG_MASK;
          if (flags.will) {
            packet.will = {};
            packet.will.retain = (this._list.readUInt8(this._pos) & constants.WILL_RETAIN_MASK) !== 0;
            packet.will.qos = (this._list.readUInt8(this._pos) & constants.WILL_QOS_MASK) >> constants.WILL_QOS_SHIFT;
          }
          packet.clean = (this._list.readUInt8(this._pos) & constants.CLEAN_SESSION_MASK) !== 0;
          this._pos++;
          packet.keepalive = this._parseNum();
          if (packet.keepalive === -1)
            return this._emitError(new Error("Packet too short"));
          if (packet.protocolVersion === 5) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          clientId = this._parseString();
          if (clientId === null)
            return this._emitError(new Error("Packet too short"));
          packet.clientId = clientId;
          if (flags.will) {
            if (packet.protocolVersion === 5) {
              var willProperties = this._parseProperties();
              if (Object.getOwnPropertyNames(willProperties).length) {
                packet.will.properties = willProperties;
              }
            }
            topic = this._parseString();
            if (topic === null)
              return this._emitError(new Error("Cannot parse will topic"));
            packet.will.topic = topic;
            payload = this._parseBuffer();
            if (payload === null)
              return this._emitError(new Error("Cannot parse will payload"));
            packet.will.payload = payload;
          }
          if (flags.username) {
            username2 = this._parseString();
            if (username2 === null)
              return this._emitError(new Error("Cannot parse username"));
            packet.username = username2;
          }
          if (flags.password) {
            password2 = this._parseBuffer();
            if (password2 === null)
              return this._emitError(new Error("Cannot parse password"));
            packet.password = password2;
          }
          this.settings = packet;
          return packet;
        };
        Parser.prototype._parseConnack = function() {
          var packet = this.packet;
          if (this._list.length < 2)
            return null;
          packet.sessionPresent = !!(this._list.readUInt8(this._pos++) & constants.SESSIONPRESENT_MASK);
          if (this.settings.protocolVersion === 5) {
            packet.reasonCode = this._list.readUInt8(this._pos++);
          } else {
            packet.returnCode = this._list.readUInt8(this._pos++);
          }
          if (packet.returnCode === -1 || packet.reasonCode === -1)
            return this._emitError(new Error("Cannot parse return code"));
          if (this.settings.protocolVersion === 5) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
        };
        Parser.prototype._parsePublish = function() {
          var packet = this.packet;
          packet.topic = this._parseString();
          if (packet.topic === null)
            return this._emitError(new Error("Cannot parse topic"));
          if (packet.qos > 0) {
            if (!this._parseMessageId()) {
              return;
            }
          }
          if (this.settings.protocolVersion === 5) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          packet.payload = this._list.slice(this._pos, packet.length);
        };
        Parser.prototype._parseSubscribe = function() {
          var packet = this.packet;
          var topic;
          var options2;
          var qos;
          var rh;
          var rap;
          var nl;
          var subscription;
          if (packet.qos !== 1) {
            return this._emitError(new Error("Wrong subscribe header"));
          }
          packet.subscriptions = [];
          if (!this._parseMessageId()) {
            return;
          }
          if (this.settings.protocolVersion === 5) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          while (this._pos < packet.length) {
            topic = this._parseString();
            if (topic === null)
              return this._emitError(new Error("Cannot parse topic"));
            options2 = this._parseByte();
            qos = options2 & constants.SUBSCRIBE_OPTIONS_QOS_MASK;
            nl = (options2 >> constants.SUBSCRIBE_OPTIONS_NL_SHIFT & constants.SUBSCRIBE_OPTIONS_NL_MASK) !== 0;
            rap = (options2 >> constants.SUBSCRIBE_OPTIONS_RAP_SHIFT & constants.SUBSCRIBE_OPTIONS_RAP_MASK) !== 0;
            rh = options2 >> constants.SUBSCRIBE_OPTIONS_RH_SHIFT & constants.SUBSCRIBE_OPTIONS_RH_MASK;
            subscription = { topic, qos };
            if (this.settings.protocolVersion === 5) {
              subscription.nl = nl;
              subscription.rap = rap;
              subscription.rh = rh;
            }
            packet.subscriptions.push(subscription);
          }
        };
        Parser.prototype._parseSuback = function() {
          var packet = this.packet;
          this.packet.granted = [];
          if (!this._parseMessageId()) {
            return;
          }
          if (this.settings.protocolVersion === 5) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          while (this._pos < this.packet.length) {
            this.packet.granted.push(this._list.readUInt8(this._pos++));
          }
        };
        Parser.prototype._parseUnsubscribe = function() {
          var packet = this.packet;
          packet.unsubscriptions = [];
          if (!this._parseMessageId()) {
            return;
          }
          if (this.settings.protocolVersion === 5) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          while (this._pos < packet.length) {
            var topic;
            topic = this._parseString();
            if (topic === null)
              return this._emitError(new Error("Cannot parse topic"));
            packet.unsubscriptions.push(topic);
          }
        };
        Parser.prototype._parseUnsuback = function() {
          var packet = this.packet;
          if (!this._parseMessageId())
            return this._emitError(new Error("Cannot parse messageId"));
          if (this.settings.protocolVersion === 5) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
            packet.granted = [];
            while (this._pos < this.packet.length) {
              this.packet.granted.push(this._list.readUInt8(this._pos++));
            }
          }
        };
        Parser.prototype._parseConfirmation = function() {
          var packet = this.packet;
          this._parseMessageId();
          if (this.settings.protocolVersion === 5) {
            if (packet.length > 2) {
              packet.reasonCode = this._parseByte();
              var properties = this._parseProperties();
              if (Object.getOwnPropertyNames(properties).length) {
                packet.properties = properties;
              }
            }
          }
          return true;
        };
        Parser.prototype._parseDisconnect = function() {
          var packet = this.packet;
          if (this.settings.protocolVersion === 5) {
            packet.reasonCode = this._parseByte();
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          return true;
        };
        Parser.prototype._parseAuth = function() {
          var packet = this.packet;
          if (this.settings.protocolVersion !== 5) {
            return this._emitError(new Error("Not supported auth packet for this version MQTT"));
          }
          packet.reasonCode = this._parseByte();
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
          return true;
        };
        Parser.prototype._parseMessageId = function() {
          var packet = this.packet;
          packet.messageId = this._parseNum();
          if (packet.messageId === null) {
            this._emitError(new Error("Cannot parse messageId"));
            return false;
          }
          return true;
        };
        Parser.prototype._parseString = function(maybeBuffer) {
          var length = this._parseNum();
          var result;
          var end = length + this._pos;
          if (length === -1 || end > this._list.length || end > this.packet.length)
            return null;
          result = this._list.toString("utf8", this._pos, end);
          this._pos += length;
          return result;
        };
        Parser.prototype._parseStringPair = function() {
          return {
            name: this._parseString(),
            value: this._parseString()
          };
        };
        Parser.prototype._parseBuffer = function() {
          var length = this._parseNum();
          var result;
          var end = length + this._pos;
          if (length === -1 || end > this._list.length || end > this.packet.length)
            return null;
          result = this._list.slice(this._pos, end);
          this._pos += length;
          return result;
        };
        Parser.prototype._parseNum = function() {
          if (this._list.length - this._pos < 2)
            return -1;
          var result = this._list.readUInt16BE(this._pos);
          this._pos += 2;
          return result;
        };
        Parser.prototype._parse4ByteNum = function() {
          if (this._list.length - this._pos < 4)
            return -1;
          var result = this._list.readUInt32BE(this._pos);
          this._pos += 4;
          return result;
        };
        Parser.prototype._parseVarByteNum = function(fullInfoFlag) {
          var bytes = 0;
          var mul = 1;
          var length = 0;
          var result = true;
          var current;
          var padding = this._pos ? this._pos : 0;
          while (bytes < 5) {
            current = this._list.readUInt8(padding + bytes++);
            length += mul * (current & constants.LENGTH_MASK);
            mul *= 128;
            if ((current & constants.LENGTH_FIN_MASK) === 0)
              break;
            if (this._list.length <= bytes) {
              result = false;
              break;
            }
          }
          if (padding) {
            this._pos += bytes;
          }
          result = result ? fullInfoFlag ? {
            bytes,
            value: length
          } : length : false;
          return result;
        };
        Parser.prototype._parseByte = function() {
          var result = this._list.readUInt8(this._pos);
          this._pos++;
          return result;
        };
        Parser.prototype._parseByType = function(type2) {
          switch (type2) {
            case "byte": {
              return this._parseByte() !== 0;
            }
            case "int8": {
              return this._parseByte();
            }
            case "int16": {
              return this._parseNum();
            }
            case "int32": {
              return this._parse4ByteNum();
            }
            case "var": {
              return this._parseVarByteNum();
            }
            case "string": {
              return this._parseString();
            }
            case "pair": {
              return this._parseStringPair();
            }
            case "binary": {
              return this._parseBuffer();
            }
          }
        };
        Parser.prototype._parseProperties = function() {
          var length = this._parseVarByteNum();
          var start = this._pos;
          var end = start + length;
          var result = {};
          while (this._pos < end) {
            var type2 = this._parseByte();
            var name = constants.propertiesCodes[type2];
            if (!name) {
              this._emitError(new Error("Unknown property"));
              return false;
            }
            if (name === "userProperties") {
              if (!result[name]) {
                result[name] = {};
              }
              var currentUserProperty = this._parseByType(constants.propertiesTypes[name]);
              result[name][currentUserProperty.name] = currentUserProperty.value;
              continue;
            }
            result[name] = this._parseByType(constants.propertiesTypes[name]);
          }
          return result;
        };
        Parser.prototype._newPacket = function() {
          if (this.packet) {
            this._list.consume(this.packet.length);
            this.emit("packet", this.packet);
          }
          this.packet = new Packet();
          this._pos = 0;
          return true;
        };
        Parser.prototype._emitError = function(err) {
          this.error = err;
          this.emit("error", err);
        };
        module2.exports = Parser;
      }, { "./constants": 90, "./packet": 95, "bl": 93, "events": 83, "inherits": 88 }], 97: [function(require, module2, exports2) {
        var protocol = require("./constants");
        var Buffer = require("safe-buffer").Buffer;
        var empty2 = Buffer.allocUnsafe(0);
        var zeroBuf = Buffer.from([0]);
        var numbers = require("./numbers");
        var nextTick = require("process-nextick-args").nextTick;
        var numCache = numbers.cache;
        var generateNumber = numbers.generateNumber;
        var generateCache = numbers.generateCache;
        var genBufVariableByteInt = numbers.genBufVariableByteInt;
        var generate4ByteBuffer = numbers.generate4ByteBuffer;
        var writeNumber = writeNumberCached;
        var toGenerate = true;
        function generate(packet, stream, opts) {
          if (stream.cork) {
            stream.cork();
            nextTick(uncork, stream);
          }
          if (toGenerate) {
            toGenerate = false;
            generateCache();
          }
          switch (packet.cmd) {
            case "connect":
              return connect(packet, stream);
            case "connack":
              return connack(packet, stream, opts);
            case "publish":
              return publish2(packet, stream, opts);
            case "puback":
            case "pubrec":
            case "pubrel":
            case "pubcomp":
              return confirmation(packet, stream, opts);
            case "subscribe":
              return subscribe(packet, stream, opts);
            case "suback":
              return suback(packet, stream, opts);
            case "unsubscribe":
              return unsubscribe(packet, stream, opts);
            case "unsuback":
              return unsuback(packet, stream, opts);
            case "pingreq":
            case "pingresp":
              return emptyPacket(packet, stream);
            case "disconnect":
              return disconnect(packet, stream, opts);
            case "auth":
              return auth(packet, stream, opts);
            default:
              stream.emit("error", new Error("Unknown command"));
              return false;
          }
        }
        Object.defineProperty(generate, "cacheNumbers", {
          get: function() {
            return writeNumber === writeNumberCached;
          },
          set: function(value) {
            if (value) {
              if (!numCache || Object.keys(numCache).length === 0)
                toGenerate = true;
              writeNumber = writeNumberCached;
            } else {
              toGenerate = false;
              writeNumber = writeNumberGenerated;
            }
          }
        });
        function uncork(stream) {
          stream.uncork();
        }
        function connect(packet, stream, opts) {
          var settings = packet || {};
          var protocolId = settings.protocolId || "MQTT";
          var protocolVersion = settings.protocolVersion || 4;
          var will = settings.will;
          var clean = settings.clean;
          var keepalive = settings.keepalive || 0;
          var clientId = settings.clientId || "";
          var username2 = settings.username;
          var password2 = settings.password;
          var properties = settings.properties;
          if (clean === void 0)
            clean = true;
          var length = 0;
          if (!protocolId || typeof protocolId !== "string" && !Buffer.isBuffer(protocolId)) {
            stream.emit("error", new Error("Invalid protocolId"));
            return false;
          } else
            length += protocolId.length + 2;
          if (protocolVersion !== 3 && protocolVersion !== 4 && protocolVersion !== 5) {
            stream.emit("error", new Error("Invalid protocol version"));
            return false;
          } else
            length += 1;
          if ((typeof clientId === "string" || Buffer.isBuffer(clientId)) && (clientId || protocolVersion === 4) && (clientId || clean)) {
            length += clientId.length + 2;
          } else {
            if (protocolVersion < 4) {
              stream.emit("error", new Error("clientId must be supplied before 3.1.1"));
              return false;
            }
            if (clean * 1 === 0) {
              stream.emit("error", new Error("clientId must be given if cleanSession set to 0"));
              return false;
            }
          }
          if (typeof keepalive !== "number" || keepalive < 0 || keepalive > 65535 || keepalive % 1 !== 0) {
            stream.emit("error", new Error("Invalid keepalive"));
            return false;
          } else
            length += 2;
          length += 1;
          if (protocolVersion === 5) {
            var propertiesData = getProperties(stream, properties);
            length += propertiesData.length;
          }
          if (will) {
            if (typeof will !== "object") {
              stream.emit("error", new Error("Invalid will"));
              return false;
            }
            if (!will.topic || typeof will.topic !== "string") {
              stream.emit("error", new Error("Invalid will topic"));
              return false;
            } else {
              length += Buffer.byteLength(will.topic) + 2;
            }
            if (will.payload) {
              if (will.payload.length >= 0) {
                if (typeof will.payload === "string") {
                  length += Buffer.byteLength(will.payload) + 2;
                } else {
                  length += will.payload.length + 2;
                }
              } else {
                stream.emit("error", new Error("Invalid will payload"));
                return false;
              }
              var willProperties = {};
              if (protocolVersion === 5) {
                willProperties = getProperties(stream, will.properties);
                length += willProperties.length;
              }
            }
          }
          var providedUsername = false;
          if (username2 != null) {
            if (isStringOrBuffer(username2)) {
              providedUsername = true;
              length += Buffer.byteLength(username2) + 2;
            } else {
              stream.emit("error", new Error("Invalid username"));
              return false;
            }
          }
          if (password2 != null) {
            if (!providedUsername) {
              stream.emit("error", new Error("Username is required to use password"));
              return false;
            }
            if (isStringOrBuffer(password2)) {
              length += byteLength(password2) + 2;
            } else {
              stream.emit("error", new Error("Invalid password"));
              return false;
            }
          }
          stream.write(protocol.CONNECT_HEADER);
          writeVarByteInt(stream, length);
          writeStringOrBuffer(stream, protocolId);
          stream.write(
            protocolVersion === 4 ? protocol.VERSION4 : protocolVersion === 5 ? protocol.VERSION5 : protocol.VERSION3
          );
          var flags = 0;
          flags |= username2 != null ? protocol.USERNAME_MASK : 0;
          flags |= password2 != null ? protocol.PASSWORD_MASK : 0;
          flags |= will && will.retain ? protocol.WILL_RETAIN_MASK : 0;
          flags |= will && will.qos ? will.qos << protocol.WILL_QOS_SHIFT : 0;
          flags |= will ? protocol.WILL_FLAG_MASK : 0;
          flags |= clean ? protocol.CLEAN_SESSION_MASK : 0;
          stream.write(Buffer.from([flags]));
          writeNumber(stream, keepalive);
          if (protocolVersion === 5) {
            propertiesData.write();
          }
          writeStringOrBuffer(stream, clientId);
          if (will) {
            if (protocolVersion === 5) {
              willProperties.write();
            }
            writeString(stream, will.topic);
            writeStringOrBuffer(stream, will.payload);
          }
          if (username2 != null) {
            writeStringOrBuffer(stream, username2);
          }
          if (password2 != null) {
            writeStringOrBuffer(stream, password2);
          }
          return true;
        }
        function connack(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var rc = version === 5 ? settings.reasonCode : settings.returnCode;
          var properties = settings.properties;
          var length = 2;
          if (typeof rc !== "number") {
            stream.emit("error", new Error("Invalid return code"));
            return false;
          }
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getProperties(stream, properties);
            length += propertiesData.length;
          }
          stream.write(protocol.CONNACK_HEADER);
          writeVarByteInt(stream, length);
          stream.write(settings.sessionPresent ? protocol.SESSIONPRESENT_HEADER : zeroBuf);
          stream.write(Buffer.from([rc]));
          if (propertiesData != null) {
            propertiesData.write();
          }
          return true;
        }
        function publish2(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var qos = settings.qos || 0;
          var retain = settings.retain ? protocol.RETAIN_MASK : 0;
          var topic = settings.topic;
          var payload = settings.payload || empty2;
          var id = settings.messageId;
          var properties = settings.properties;
          var length = 0;
          if (typeof topic === "string")
            length += Buffer.byteLength(topic) + 2;
          else if (Buffer.isBuffer(topic))
            length += topic.length + 2;
          else {
            stream.emit("error", new Error("Invalid topic"));
            return false;
          }
          if (!Buffer.isBuffer(payload))
            length += Buffer.byteLength(payload);
          else
            length += payload.length;
          if (qos && typeof id !== "number") {
            stream.emit("error", new Error("Invalid messageId"));
            return false;
          } else if (qos)
            length += 2;
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getProperties(stream, properties);
            length += propertiesData.length;
          }
          stream.write(protocol.PUBLISH_HEADER[qos][settings.dup ? 1 : 0][retain ? 1 : 0]);
          writeVarByteInt(stream, length);
          writeNumber(stream, byteLength(topic));
          stream.write(topic);
          if (qos > 0)
            writeNumber(stream, id);
          if (propertiesData != null) {
            propertiesData.write();
          }
          return stream.write(payload);
        }
        function confirmation(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var type2 = settings.cmd || "puback";
          var id = settings.messageId;
          var dup = settings.dup && type2 === "pubrel" ? protocol.DUP_MASK : 0;
          var qos = 0;
          var reasonCode = settings.reasonCode;
          var properties = settings.properties;
          var length = version === 5 ? 3 : 2;
          if (type2 === "pubrel")
            qos = 1;
          if (typeof id !== "number") {
            stream.emit("error", new Error("Invalid messageId"));
            return false;
          }
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
            if (!propertiesData) {
              return false;
            }
            length += propertiesData.length;
          }
          stream.write(protocol.ACKS[type2][qos][dup][0]);
          writeVarByteInt(stream, length);
          writeNumber(stream, id);
          if (version === 5) {
            stream.write(Buffer.from([reasonCode]));
          }
          if (propertiesData !== null) {
            propertiesData.write();
          }
          return true;
        }
        function subscribe(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var dup = settings.dup ? protocol.DUP_MASK : 0;
          var id = settings.messageId;
          var subs = settings.subscriptions;
          var properties = settings.properties;
          var length = 0;
          if (typeof id !== "number") {
            stream.emit("error", new Error("Invalid messageId"));
            return false;
          } else
            length += 2;
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getProperties(stream, properties);
            length += propertiesData.length;
          }
          if (typeof subs === "object" && subs.length) {
            for (var i = 0; i < subs.length; i += 1) {
              var itopic = subs[i].topic;
              var iqos = subs[i].qos;
              if (typeof itopic !== "string") {
                stream.emit("error", new Error("Invalid subscriptions - invalid topic"));
                return false;
              }
              if (typeof iqos !== "number") {
                stream.emit("error", new Error("Invalid subscriptions - invalid qos"));
                return false;
              }
              if (version === 5) {
                var nl = subs[i].nl || false;
                if (typeof nl !== "boolean") {
                  stream.emit("error", new Error("Invalid subscriptions - invalid No Local"));
                  return false;
                }
                var rap = subs[i].rap || false;
                if (typeof rap !== "boolean") {
                  stream.emit("error", new Error("Invalid subscriptions - invalid Retain as Published"));
                  return false;
                }
                var rh = subs[i].rh || 0;
                if (typeof rh !== "number" || rh > 2) {
                  stream.emit("error", new Error("Invalid subscriptions - invalid Retain Handling"));
                  return false;
                }
              }
              length += Buffer.byteLength(itopic) + 2 + 1;
            }
          } else {
            stream.emit("error", new Error("Invalid subscriptions"));
            return false;
          }
          stream.write(protocol.SUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);
          writeVarByteInt(stream, length);
          writeNumber(stream, id);
          if (propertiesData !== null) {
            propertiesData.write();
          }
          var result = true;
          for (var j = 0; j < subs.length; j++) {
            var sub = subs[j];
            var jtopic = sub.topic;
            var jqos = sub.qos;
            var jnl = +sub.nl;
            var jrap = +sub.rap;
            var jrh = sub.rh;
            var joptions;
            writeString(stream, jtopic);
            joptions = protocol.SUBSCRIBE_OPTIONS_QOS[jqos];
            if (version === 5) {
              joptions |= jnl ? protocol.SUBSCRIBE_OPTIONS_NL : 0;
              joptions |= jrap ? protocol.SUBSCRIBE_OPTIONS_RAP : 0;
              joptions |= jrh ? protocol.SUBSCRIBE_OPTIONS_RH[jrh] : 0;
            }
            result = stream.write(Buffer.from([joptions]));
          }
          return result;
        }
        function suback(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var id = settings.messageId;
          var granted = settings.granted;
          var properties = settings.properties;
          var length = 0;
          if (typeof id !== "number") {
            stream.emit("error", new Error("Invalid messageId"));
            return false;
          } else
            length += 2;
          if (typeof granted === "object" && granted.length) {
            for (var i = 0; i < granted.length; i += 1) {
              if (typeof granted[i] !== "number") {
                stream.emit("error", new Error("Invalid qos vector"));
                return false;
              }
              length += 1;
            }
          } else {
            stream.emit("error", new Error("Invalid qos vector"));
            return false;
          }
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
            if (!propertiesData) {
              return false;
            }
            length += propertiesData.length;
          }
          stream.write(protocol.SUBACK_HEADER);
          writeVarByteInt(stream, length);
          writeNumber(stream, id);
          if (propertiesData !== null) {
            propertiesData.write();
          }
          return stream.write(Buffer.from(granted));
        }
        function unsubscribe(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var id = settings.messageId;
          var dup = settings.dup ? protocol.DUP_MASK : 0;
          var unsubs = settings.unsubscriptions;
          var properties = settings.properties;
          var length = 0;
          if (typeof id !== "number") {
            stream.emit("error", new Error("Invalid messageId"));
            return false;
          } else {
            length += 2;
          }
          if (typeof unsubs === "object" && unsubs.length) {
            for (var i = 0; i < unsubs.length; i += 1) {
              if (typeof unsubs[i] !== "string") {
                stream.emit("error", new Error("Invalid unsubscriptions"));
                return false;
              }
              length += Buffer.byteLength(unsubs[i]) + 2;
            }
          } else {
            stream.emit("error", new Error("Invalid unsubscriptions"));
            return false;
          }
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getProperties(stream, properties);
            length += propertiesData.length;
          }
          stream.write(protocol.UNSUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);
          writeVarByteInt(stream, length);
          writeNumber(stream, id);
          if (propertiesData !== null) {
            propertiesData.write();
          }
          var result = true;
          for (var j = 0; j < unsubs.length; j++) {
            result = writeString(stream, unsubs[j]);
          }
          return result;
        }
        function unsuback(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var id = settings.messageId;
          var dup = settings.dup ? protocol.DUP_MASK : 0;
          var granted = settings.granted;
          var properties = settings.properties;
          var type2 = settings.cmd;
          var qos = 0;
          var length = 2;
          if (typeof id !== "number") {
            stream.emit("error", new Error("Invalid messageId"));
            return false;
          }
          if (version === 5) {
            if (typeof granted === "object" && granted.length) {
              for (var i = 0; i < granted.length; i += 1) {
                if (typeof granted[i] !== "number") {
                  stream.emit("error", new Error("Invalid qos vector"));
                  return false;
                }
                length += 1;
              }
            } else {
              stream.emit("error", new Error("Invalid qos vector"));
              return false;
            }
          }
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
            if (!propertiesData) {
              return false;
            }
            length += propertiesData.length;
          }
          stream.write(protocol.ACKS[type2][qos][dup][0]);
          writeVarByteInt(stream, length);
          writeNumber(stream, id);
          if (propertiesData !== null) {
            propertiesData.write();
          }
          if (version === 5) {
            stream.write(Buffer.from(granted));
          }
          return true;
        }
        function emptyPacket(packet, stream, opts) {
          return stream.write(protocol.EMPTY[packet.cmd]);
        }
        function disconnect(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var reasonCode = settings.reasonCode;
          var properties = settings.properties;
          var length = version === 5 ? 1 : 0;
          var propertiesData = null;
          if (version === 5) {
            propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
            if (!propertiesData) {
              return false;
            }
            length += propertiesData.length;
          }
          stream.write(Buffer.from([protocol.codes["disconnect"] << 4]));
          writeVarByteInt(stream, length);
          if (version === 5) {
            stream.write(Buffer.from([reasonCode]));
          }
          if (propertiesData !== null) {
            propertiesData.write();
          }
          return true;
        }
        function auth(packet, stream, opts) {
          var version = opts ? opts.protocolVersion : 4;
          var settings = packet || {};
          var reasonCode = settings.reasonCode;
          var properties = settings.properties;
          var length = version === 5 ? 1 : 0;
          if (version !== 5)
            stream.emit("error", new Error("Invalid mqtt version for auth packet"));
          var propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
          stream.write(Buffer.from([protocol.codes["auth"] << 4]));
          writeVarByteInt(stream, length);
          stream.write(Buffer.from([reasonCode]));
          if (propertiesData !== null) {
            propertiesData.write();
          }
          return true;
        }
        var varByteIntCache = {};
        function writeVarByteInt(stream, num) {
          var buffer = varByteIntCache[num];
          if (!buffer) {
            buffer = genBufVariableByteInt(num).data;
            if (num < 16384)
              varByteIntCache[num] = buffer;
          }
          stream.write(buffer);
        }
        function writeString(stream, string2) {
          var strlen = Buffer.byteLength(string2);
          writeNumber(stream, strlen);
          stream.write(string2, "utf8");
        }
        function writeStringPair(stream, name, value) {
          writeString(stream, name);
          writeString(stream, value);
        }
        function writeNumberCached(stream, number2) {
          return stream.write(numCache[number2]);
        }
        function writeNumberGenerated(stream, number2) {
          return stream.write(generateNumber(number2));
        }
        function write4ByteNumber(stream, number2) {
          return stream.write(generate4ByteBuffer(number2));
        }
        function writeStringOrBuffer(stream, toWrite) {
          if (typeof toWrite === "string") {
            writeString(stream, toWrite);
          } else if (toWrite) {
            writeNumber(stream, toWrite.length);
            stream.write(toWrite);
          } else
            writeNumber(stream, 0);
        }
        function getProperties(stream, properties) {
          if (typeof properties !== "object" || properties.length != null) {
            return {
              length: 1,
              write: function() {
                writeProperties(stream, {}, 0);
              }
            };
          }
          var propertiesLength = 0;
          function getLengthProperty(name) {
            var type2 = protocol.propertiesTypes[name];
            var value = properties[name];
            var length = 0;
            switch (type2) {
              case "byte": {
                if (typeof value !== "boolean") {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += 1 + 1;
                break;
              }
              case "int8": {
                if (typeof value !== "number") {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += 1 + 1;
                break;
              }
              case "binary": {
                if (value && value === null) {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += 1 + Buffer.byteLength(value) + 2;
                break;
              }
              case "int16": {
                if (typeof value !== "number") {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += 1 + 2;
                break;
              }
              case "int32": {
                if (typeof value !== "number") {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += 1 + 4;
                break;
              }
              case "var": {
                if (typeof value !== "number") {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += 1 + genBufVariableByteInt(value).length;
                break;
              }
              case "string": {
                if (typeof value !== "string") {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += 1 + 2 + Buffer.byteLength(value.toString());
                break;
              }
              case "pair": {
                if (typeof value !== "object") {
                  stream.emit("error", new Error("Invalid " + name));
                  return false;
                }
                length += Object.getOwnPropertyNames(value).reduce(function(result, name2) {
                  result += 1 + 2 + Buffer.byteLength(name2.toString()) + 2 + Buffer.byteLength(value[name2].toString());
                  return result;
                }, 0);
                break;
              }
              default: {
                stream.emit("error", new Error("Invalid property " + name));
                return false;
              }
            }
            return length;
          }
          if (properties) {
            for (var propName in properties) {
              var propLength = getLengthProperty(propName);
              if (!propLength)
                return false;
              propertiesLength += propLength;
            }
          }
          var propertiesLengthLength = genBufVariableByteInt(propertiesLength).length;
          return {
            length: propertiesLengthLength + propertiesLength,
            write: function() {
              writeProperties(stream, properties, propertiesLength);
            }
          };
        }
        function getPropertiesByMaximumPacketSize(stream, properties, opts, length) {
          var mayEmptyProps = ["reasonString", "userProperties"];
          var maximumPacketSize = opts && opts.properties && opts.properties.maximumPacketSize ? opts.properties.maximumPacketSize : 0;
          var propertiesData = getProperties(stream, properties);
          if (maximumPacketSize) {
            while (length + propertiesData.length > maximumPacketSize) {
              var currentMayEmptyProp = mayEmptyProps.shift();
              if (currentMayEmptyProp && properties[currentMayEmptyProp]) {
                delete properties[currentMayEmptyProp];
                propertiesData = getProperties(stream, properties);
              } else {
                return false;
              }
            }
          }
          return propertiesData;
        }
        function writeProperties(stream, properties, propertiesLength) {
          writeVarByteInt(stream, propertiesLength);
          for (var propName in properties) {
            if (properties.hasOwnProperty(propName) && properties[propName] !== null) {
              var value = properties[propName];
              var type2 = protocol.propertiesTypes[propName];
              switch (type2) {
                case "byte": {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  stream.write(Buffer.from([+value]));
                  break;
                }
                case "int8": {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  stream.write(Buffer.from([value]));
                  break;
                }
                case "binary": {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  writeStringOrBuffer(stream, value);
                  break;
                }
                case "int16": {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  writeNumber(stream, value);
                  break;
                }
                case "int32": {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  write4ByteNumber(stream, value);
                  break;
                }
                case "var": {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  writeVarByteInt(stream, value);
                  break;
                }
                case "string": {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  writeString(stream, value);
                  break;
                }
                case "pair": {
                  Object.getOwnPropertyNames(value).forEach(function(name) {
                    stream.write(Buffer.from([protocol.properties[propName]]));
                    writeStringPair(stream, name.toString(), value[name].toString());
                  });
                  break;
                }
                default: {
                  stream.emit("error", new Error("Invalid property " + propName));
                  return false;
                }
              }
            }
          }
        }
        function byteLength(bufOrString) {
          if (!bufOrString)
            return 0;
          else if (bufOrString instanceof Buffer)
            return bufOrString.length;
          else
            return Buffer.byteLength(bufOrString);
        }
        function isStringOrBuffer(field) {
          return typeof field === "string" || field instanceof Buffer;
        }
        module2.exports = generate;
      }, { "./constants": 90, "./numbers": 94, "process-nextick-args": 99, "safe-buffer": 118 }], 98: [function(require, module2, exports2) {
        var wrappy = require("wrappy");
        module2.exports = wrappy(once);
        module2.exports.strict = wrappy(onceStrict);
        once.proto = once(function() {
          Object.defineProperty(Function.prototype, "once", {
            value: function() {
              return once(this);
            },
            configurable: true
          });
          Object.defineProperty(Function.prototype, "onceStrict", {
            value: function() {
              return onceStrict(this);
            },
            configurable: true
          });
        });
        function once(fn) {
          var f = function() {
            if (f.called)
              return f.value;
            f.called = true;
            return f.value = fn.apply(this, arguments);
          };
          f.called = false;
          return f;
        }
        function onceStrict(fn) {
          var f = function() {
            if (f.called)
              throw new Error(f.onceError);
            f.called = true;
            return f.value = fn.apply(this, arguments);
          };
          var name = fn.name || "Function wrapped with `once`";
          f.onceError = name + " shouldn't be called more than once";
          f.called = false;
          return f;
        }
      }, { "wrappy": 139 }], 99: [function(require, module2, exports2) {
        (function(process2) {
          if (typeof process2 === "undefined" || !process2.version || process2.version.indexOf("v0.") === 0 || process2.version.indexOf("v1.") === 0 && process2.version.indexOf("v1.8.") !== 0) {
            module2.exports = { nextTick };
          } else {
            module2.exports = process2;
          }
          function nextTick(fn, arg1, arg2, arg3) {
            if (typeof fn !== "function") {
              throw new TypeError('"callback" argument must be a function');
            }
            var len = arguments.length;
            var args, i;
            switch (len) {
              case 0:
              case 1:
                return process2.nextTick(fn);
              case 2:
                return process2.nextTick(function afterTickOne() {
                  fn.call(null, arg1);
                });
              case 3:
                return process2.nextTick(function afterTickTwo() {
                  fn.call(null, arg1, arg2);
                });
              case 4:
                return process2.nextTick(function afterTickThree() {
                  fn.call(null, arg1, arg2, arg3);
                });
              default:
                args = new Array(len - 1);
                i = 0;
                while (i < args.length) {
                  args[i++] = arguments[i];
                }
                return process2.nextTick(function afterTick() {
                  fn.apply(null, args);
                });
            }
          }
        }).call(this, require("_process"));
      }, { "_process": 100 }], 100: [function(require, module2, exports2) {
        var process2 = module2.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        process2.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array2) {
          this.fun = fun;
          this.array = array2;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process2.title = "browser";
        process2.browser = true;
        process2.env = {};
        process2.argv = [];
        process2.version = "";
        process2.versions = {};
        function noop() {
        }
        process2.on = noop;
        process2.addListener = noop;
        process2.once = noop;
        process2.off = noop;
        process2.removeListener = noop;
        process2.removeAllListeners = noop;
        process2.emit = noop;
        process2.prependListener = noop;
        process2.prependOnceListener = noop;
        process2.listeners = function(name) {
          return [];
        };
        process2.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process2.cwd = function() {
          return "/";
        };
        process2.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process2.umask = function() {
          return 0;
        };
      }, {}], 101: [function(require, module2, exports2) {
        (function(global2) {
          (function(root) {
            var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
            var freeModule = typeof module2 == "object" && module2 && !module2.nodeType && module2;
            var freeGlobal = typeof global2 == "object" && global2;
            if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
              root = freeGlobal;
            }
            var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
              "overflow": "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input"
            }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
            function error2(type2) {
              throw new RangeError(errors[type2]);
            }
            function map(array2, fn) {
              var length = array2.length;
              var result = [];
              while (length--) {
                result[length] = fn(array2[length]);
              }
              return result;
            }
            function mapDomain(string2, fn) {
              var parts = string2.split("@");
              var result = "";
              if (parts.length > 1) {
                result = parts[0] + "@";
                string2 = parts[1];
              }
              string2 = string2.replace(regexSeparators, ".");
              var labels = string2.split(".");
              var encoded = map(labels, fn).join(".");
              return result + encoded;
            }
            function ucs2decode(string2) {
              var output = [], counter = 0, length = string2.length, value, extra;
              while (counter < length) {
                value = string2.charCodeAt(counter++);
                if (value >= 55296 && value <= 56319 && counter < length) {
                  extra = string2.charCodeAt(counter++);
                  if ((extra & 64512) == 56320) {
                    output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                  } else {
                    output.push(value);
                    counter--;
                  }
                } else {
                  output.push(value);
                }
              }
              return output;
            }
            function ucs2encode(array2) {
              return map(array2, function(value) {
                var output = "";
                if (value > 65535) {
                  value -= 65536;
                  output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                  value = 56320 | value & 1023;
                }
                output += stringFromCharCode(value);
                return output;
              }).join("");
            }
            function basicToDigit(codePoint) {
              if (codePoint - 48 < 10) {
                return codePoint - 22;
              }
              if (codePoint - 65 < 26) {
                return codePoint - 65;
              }
              if (codePoint - 97 < 26) {
                return codePoint - 97;
              }
              return base;
            }
            function digitToBasic(digit, flag2) {
              return digit + 22 + 75 * (digit < 26) - ((flag2 != 0) << 5);
            }
            function adapt(delta, numPoints, firstTime) {
              var k = 0;
              delta = firstTime ? floor(delta / damp) : delta >> 1;
              delta += floor(delta / numPoints);
              for (; delta > baseMinusTMin * tMax >> 1; k += base) {
                delta = floor(delta / baseMinusTMin);
              }
              return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
            }
            function decode(input) {
              var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index2, oldi, w, k, digit, t, baseMinusT;
              basic = input.lastIndexOf(delimiter);
              if (basic < 0) {
                basic = 0;
              }
              for (j = 0; j < basic; ++j) {
                if (input.charCodeAt(j) >= 128) {
                  error2("not-basic");
                }
                output.push(input.charCodeAt(j));
              }
              for (index2 = basic > 0 ? basic + 1 : 0; index2 < inputLength; ) {
                for (oldi = i, w = 1, k = base; ; k += base) {
                  if (index2 >= inputLength) {
                    error2("invalid-input");
                  }
                  digit = basicToDigit(input.charCodeAt(index2++));
                  if (digit >= base || digit > floor((maxInt - i) / w)) {
                    error2("overflow");
                  }
                  i += digit * w;
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (digit < t) {
                    break;
                  }
                  baseMinusT = base - t;
                  if (w > floor(maxInt / baseMinusT)) {
                    error2("overflow");
                  }
                  w *= baseMinusT;
                }
                out = output.length + 1;
                bias = adapt(i - oldi, out, oldi == 0);
                if (floor(i / out) > maxInt - n) {
                  error2("overflow");
                }
                n += floor(i / out);
                i %= out;
                output.splice(i++, 0, n);
              }
              return ucs2encode(output);
            }
            function encode(input) {
              var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
              input = ucs2decode(input);
              inputLength = input.length;
              n = initialN;
              delta = 0;
              bias = initialBias;
              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue < 128) {
                  output.push(stringFromCharCode(currentValue));
                }
              }
              handledCPCount = basicLength = output.length;
              if (basicLength) {
                output.push(delimiter);
              }
              while (handledCPCount < inputLength) {
                for (m = maxInt, j = 0; j < inputLength; ++j) {
                  currentValue = input[j];
                  if (currentValue >= n && currentValue < m) {
                    m = currentValue;
                  }
                }
                handledCPCountPlusOne = handledCPCount + 1;
                if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                  error2("overflow");
                }
                delta += (m - n) * handledCPCountPlusOne;
                n = m;
                for (j = 0; j < inputLength; ++j) {
                  currentValue = input[j];
                  if (currentValue < n && ++delta > maxInt) {
                    error2("overflow");
                  }
                  if (currentValue == n) {
                    for (q = delta, k = base; ; k += base) {
                      t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                      if (q < t) {
                        break;
                      }
                      qMinusT = q - t;
                      baseMinusT = base - t;
                      output.push(
                        stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                      );
                      q = floor(qMinusT / baseMinusT);
                    }
                    output.push(stringFromCharCode(digitToBasic(q, 0)));
                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                    delta = 0;
                    ++handledCPCount;
                  }
                }
                ++delta;
                ++n;
              }
              return output.join("");
            }
            function toUnicode(input) {
              return mapDomain(input, function(string2) {
                return regexPunycode.test(string2) ? decode(string2.slice(4).toLowerCase()) : string2;
              });
            }
            function toASCII(input) {
              return mapDomain(input, function(string2) {
                return regexNonASCII.test(string2) ? "xn--" + encode(string2) : string2;
              });
            }
            punycode = {
              /**
               * A string representing the current Punycode.js version number.
               * @memberOf punycode
               * @type String
               */
              "version": "1.4.1",
              /**
               * An object of methods to convert from JavaScript's internal character
               * representation (UCS-2) to Unicode code points, and back.
               * @see <https://mathiasbynens.be/notes/javascript-encoding>
               * @memberOf punycode
               * @type Object
               */
              "ucs2": {
                "decode": ucs2decode,
                "encode": ucs2encode
              },
              "decode": decode,
              "encode": encode,
              "toASCII": toASCII,
              "toUnicode": toUnicode
            };
            if (freeExports && freeModule) {
              if (module2.exports == freeExports) {
                freeModule.exports = punycode;
              } else {
                for (key in punycode) {
                  punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                }
              }
            } else {
              root.punycode = punycode;
            }
          })(this);
        }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 102: [function(require, module2, exports2) {
        function hasOwnProperty2(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }
        module2.exports = function(qs, sep, eq, options2) {
          sep = sep || "&";
          eq = eq || "=";
          var obj = {};
          if (typeof qs !== "string" || qs.length === 0) {
            return obj;
          }
          var regexp2 = /\+/g;
          qs = qs.split(sep);
          var maxKeys = 1e3;
          if (options2 && typeof options2.maxKeys === "number") {
            maxKeys = options2.maxKeys;
          }
          var len = qs.length;
          if (maxKeys > 0 && len > maxKeys) {
            len = maxKeys;
          }
          for (var i = 0; i < len; ++i) {
            var x = qs[i].replace(regexp2, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
            if (idx >= 0) {
              kstr = x.substr(0, idx);
              vstr = x.substr(idx + 1);
            } else {
              kstr = x;
              vstr = "";
            }
            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);
            if (!hasOwnProperty2(obj, k)) {
              obj[k] = v;
            } else if (isArray(obj[k])) {
              obj[k].push(v);
            } else {
              obj[k] = [obj[k], v];
            }
          }
          return obj;
        };
        var isArray = Array.isArray || function(xs) {
          return Object.prototype.toString.call(xs) === "[object Array]";
        };
      }, {}], 103: [function(require, module2, exports2) {
        var stringifyPrimitive = function(v) {
          switch (typeof v) {
            case "string":
              return v;
            case "boolean":
              return v ? "true" : "false";
            case "number":
              return isFinite(v) ? v : "";
            default:
              return "";
          }
        };
        module2.exports = function(obj, sep, eq, name) {
          sep = sep || "&";
          eq = eq || "=";
          if (obj === null) {
            obj = void 0;
          }
          if (typeof obj === "object") {
            return map(objectKeys(obj), function(k) {
              var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
              if (isArray(obj[k])) {
                return map(obj[k], function(v) {
                  return ks + encodeURIComponent(stringifyPrimitive(v));
                }).join(sep);
              } else {
                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
              }
            }).join(sep);
          }
          if (!name)
            return "";
          return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
        };
        var isArray = Array.isArray || function(xs) {
          return Object.prototype.toString.call(xs) === "[object Array]";
        };
        function map(xs, f) {
          if (xs.map)
            return xs.map(f);
          var res = [];
          for (var i = 0; i < xs.length; i++) {
            res.push(f(xs[i], i));
          }
          return res;
        }
        var objectKeys = Object.keys || function(obj) {
          var res = [];
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              res.push(key);
          }
          return res;
        };
      }, {}], 104: [function(require, module2, exports2) {
        exports2.decode = exports2.parse = require("./decode");
        exports2.encode = exports2.stringify = require("./encode");
      }, { "./decode": 102, "./encode": 103 }], 105: [function(require, module2, exports2) {
        module2.exports = require("./lib/_stream_duplex.js");
      }, { "./lib/_stream_duplex.js": 106 }], 106: [function(require, module2, exports2) {
        var pna = require("process-nextick-args");
        var objectKeys = Object.keys || function(obj) {
          var keys2 = [];
          for (var key in obj) {
            keys2.push(key);
          }
          return keys2;
        };
        module2.exports = Duplex;
        var util = require("core-util-is");
        util.inherits = require("inherits");
        var Readable = require("./_stream_readable");
        var Writable = require("./_stream_writable");
        util.inherits(Duplex, Readable);
        {
          var keys = objectKeys(Writable.prototype);
          for (var v = 0; v < keys.length; v++) {
            var method2 = keys[v];
            if (!Duplex.prototype[method2])
              Duplex.prototype[method2] = Writable.prototype[method2];
          }
        }
        function Duplex(options2) {
          if (!(this instanceof Duplex))
            return new Duplex(options2);
          Readable.call(this, options2);
          Writable.call(this, options2);
          if (options2 && options2.readable === false)
            this.readable = false;
          if (options2 && options2.writable === false)
            this.writable = false;
          this.allowHalfOpen = true;
          if (options2 && options2.allowHalfOpen === false)
            this.allowHalfOpen = false;
          this.once("end", onend);
        }
        Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function() {
            return this._writableState.highWaterMark;
          }
        });
        function onend() {
          if (this.allowHalfOpen || this._writableState.ended)
            return;
          pna.nextTick(onEndNT, this);
        }
        function onEndNT(self2) {
          self2.end();
        }
        Object.defineProperty(Duplex.prototype, "destroyed", {
          get: function() {
            if (this._readableState === void 0 || this._writableState === void 0) {
              return false;
            }
            return this._readableState.destroyed && this._writableState.destroyed;
          },
          set: function(value) {
            if (this._readableState === void 0 || this._writableState === void 0) {
              return;
            }
            this._readableState.destroyed = value;
            this._writableState.destroyed = value;
          }
        });
        Duplex.prototype._destroy = function(err, cb) {
          this.push(null);
          this.end();
          pna.nextTick(cb, err);
        };
      }, { "./_stream_readable": 108, "./_stream_writable": 110, "core-util-is": 13, "inherits": 88, "process-nextick-args": 99 }], 107: [function(require, module2, exports2) {
        module2.exports = PassThrough;
        var Transform = require("./_stream_transform");
        var util = require("core-util-is");
        util.inherits = require("inherits");
        util.inherits(PassThrough, Transform);
        function PassThrough(options2) {
          if (!(this instanceof PassThrough))
            return new PassThrough(options2);
          Transform.call(this, options2);
        }
        PassThrough.prototype._transform = function(chunk, encoding, cb) {
          cb(null, chunk);
        };
      }, { "./_stream_transform": 109, "core-util-is": 13, "inherits": 88 }], 108: [function(require, module2, exports2) {
        (function(process2, global2) {
          var pna = require("process-nextick-args");
          module2.exports = Readable;
          var isArray = require("isarray");
          var Duplex;
          Readable.ReadableState = ReadableState;
          require("events").EventEmitter;
          var EElistenerCount = function(emitter, type2) {
            return emitter.listeners(type2).length;
          };
          var Stream = require("./internal/streams/stream");
          var Buffer = require("safe-buffer").Buffer;
          var OurUint8Array = global2.Uint8Array || function() {
          };
          function _uint8ArrayToBuffer(chunk) {
            return Buffer.from(chunk);
          }
          function _isUint8Array(obj) {
            return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
          }
          var util = require("core-util-is");
          util.inherits = require("inherits");
          var debugUtil = require("util");
          var debug = void 0;
          if (debugUtil && debugUtil.debuglog) {
            debug = debugUtil.debuglog("stream");
          } else {
            debug = function() {
            };
          }
          var BufferList = require("./internal/streams/BufferList");
          var destroyImpl = require("./internal/streams/destroy");
          var StringDecoder;
          util.inherits(Readable, Stream);
          var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
          function prependListener(emitter, event, fn) {
            if (typeof emitter.prependListener === "function")
              return emitter.prependListener(event, fn);
            if (!emitter._events || !emitter._events[event])
              emitter.on(event, fn);
            else if (isArray(emitter._events[event]))
              emitter._events[event].unshift(fn);
            else
              emitter._events[event] = [fn, emitter._events[event]];
          }
          function ReadableState(options2, stream) {
            Duplex = Duplex || require("./_stream_duplex");
            options2 = options2 || {};
            var isDuplex = stream instanceof Duplex;
            this.objectMode = !!options2.objectMode;
            if (isDuplex)
              this.objectMode = this.objectMode || !!options2.readableObjectMode;
            var hwm = options2.highWaterMark;
            var readableHwm = options2.readableHighWaterMark;
            var defaultHwm = this.objectMode ? 16 : 16 * 1024;
            if (hwm || hwm === 0)
              this.highWaterMark = hwm;
            else if (isDuplex && (readableHwm || readableHwm === 0))
              this.highWaterMark = readableHwm;
            else
              this.highWaterMark = defaultHwm;
            this.highWaterMark = Math.floor(this.highWaterMark);
            this.buffer = new BufferList();
            this.length = 0;
            this.pipes = null;
            this.pipesCount = 0;
            this.flowing = null;
            this.ended = false;
            this.endEmitted = false;
            this.reading = false;
            this.sync = true;
            this.needReadable = false;
            this.emittedReadable = false;
            this.readableListening = false;
            this.resumeScheduled = false;
            this.destroyed = false;
            this.defaultEncoding = options2.defaultEncoding || "utf8";
            this.awaitDrain = 0;
            this.readingMore = false;
            this.decoder = null;
            this.encoding = null;
            if (options2.encoding) {
              if (!StringDecoder)
                StringDecoder = require("string_decoder/").StringDecoder;
              this.decoder = new StringDecoder(options2.encoding);
              this.encoding = options2.encoding;
            }
          }
          function Readable(options2) {
            Duplex = Duplex || require("./_stream_duplex");
            if (!(this instanceof Readable))
              return new Readable(options2);
            this._readableState = new ReadableState(options2, this);
            this.readable = true;
            if (options2) {
              if (typeof options2.read === "function")
                this._read = options2.read;
              if (typeof options2.destroy === "function")
                this._destroy = options2.destroy;
            }
            Stream.call(this);
          }
          Object.defineProperty(Readable.prototype, "destroyed", {
            get: function() {
              if (this._readableState === void 0) {
                return false;
              }
              return this._readableState.destroyed;
            },
            set: function(value) {
              if (!this._readableState) {
                return;
              }
              this._readableState.destroyed = value;
            }
          });
          Readable.prototype.destroy = destroyImpl.destroy;
          Readable.prototype._undestroy = destroyImpl.undestroy;
          Readable.prototype._destroy = function(err, cb) {
            this.push(null);
            cb(err);
          };
          Readable.prototype.push = function(chunk, encoding) {
            var state = this._readableState;
            var skipChunkCheck;
            if (!state.objectMode) {
              if (typeof chunk === "string") {
                encoding = encoding || state.defaultEncoding;
                if (encoding !== state.encoding) {
                  chunk = Buffer.from(chunk, encoding);
                  encoding = "";
                }
                skipChunkCheck = true;
              }
            } else {
              skipChunkCheck = true;
            }
            return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
          };
          Readable.prototype.unshift = function(chunk) {
            return readableAddChunk(this, chunk, null, true, false);
          };
          function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
            var state = stream._readableState;
            if (chunk === null) {
              state.reading = false;
              onEofChunk(stream, state);
            } else {
              var er;
              if (!skipChunkCheck)
                er = chunkInvalid(state, chunk);
              if (er) {
                stream.emit("error", er);
              } else if (state.objectMode || chunk && chunk.length > 0) {
                if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                  chunk = _uint8ArrayToBuffer(chunk);
                }
                if (addToFront) {
                  if (state.endEmitted)
                    stream.emit("error", new Error("stream.unshift() after end event"));
                  else
                    addChunk(stream, state, chunk, true);
                } else if (state.ended) {
                  stream.emit("error", new Error("stream.push() after EOF"));
                } else {
                  state.reading = false;
                  if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0)
                      addChunk(stream, state, chunk, false);
                    else
                      maybeReadMore(stream, state);
                  } else {
                    addChunk(stream, state, chunk, false);
                  }
                }
              } else if (!addToFront) {
                state.reading = false;
              }
            }
            return needMoreData(state);
          }
          function addChunk(stream, state, chunk, addToFront) {
            if (state.flowing && state.length === 0 && !state.sync) {
              stream.emit("data", chunk);
              stream.read(0);
            } else {
              state.length += state.objectMode ? 1 : chunk.length;
              if (addToFront)
                state.buffer.unshift(chunk);
              else
                state.buffer.push(chunk);
              if (state.needReadable)
                emitReadable(stream);
            }
            maybeReadMore(stream, state);
          }
          function chunkInvalid(state, chunk) {
            var er;
            if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
              er = new TypeError("Invalid non-string/buffer chunk");
            }
            return er;
          }
          function needMoreData(state) {
            return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
          }
          Readable.prototype.isPaused = function() {
            return this._readableState.flowing === false;
          };
          Readable.prototype.setEncoding = function(enc) {
            if (!StringDecoder)
              StringDecoder = require("string_decoder/").StringDecoder;
            this._readableState.decoder = new StringDecoder(enc);
            this._readableState.encoding = enc;
            return this;
          };
          var MAX_HWM = 8388608;
          function computeNewHighWaterMark(n) {
            if (n >= MAX_HWM) {
              n = MAX_HWM;
            } else {
              n--;
              n |= n >>> 1;
              n |= n >>> 2;
              n |= n >>> 4;
              n |= n >>> 8;
              n |= n >>> 16;
              n++;
            }
            return n;
          }
          function howMuchToRead(n, state) {
            if (n <= 0 || state.length === 0 && state.ended)
              return 0;
            if (state.objectMode)
              return 1;
            if (n !== n) {
              if (state.flowing && state.length)
                return state.buffer.head.data.length;
              else
                return state.length;
            }
            if (n > state.highWaterMark)
              state.highWaterMark = computeNewHighWaterMark(n);
            if (n <= state.length)
              return n;
            if (!state.ended) {
              state.needReadable = true;
              return 0;
            }
            return state.length;
          }
          Readable.prototype.read = function(n) {
            debug("read", n);
            n = parseInt(n, 10);
            var state = this._readableState;
            var nOrig = n;
            if (n !== 0)
              state.emittedReadable = false;
            if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
              debug("read: emitReadable", state.length, state.ended);
              if (state.length === 0 && state.ended)
                endReadable(this);
              else
                emitReadable(this);
              return null;
            }
            n = howMuchToRead(n, state);
            if (n === 0 && state.ended) {
              if (state.length === 0)
                endReadable(this);
              return null;
            }
            var doRead = state.needReadable;
            debug("need readable", doRead);
            if (state.length === 0 || state.length - n < state.highWaterMark) {
              doRead = true;
              debug("length less than watermark", doRead);
            }
            if (state.ended || state.reading) {
              doRead = false;
              debug("reading or ended", doRead);
            } else if (doRead) {
              debug("do read");
              state.reading = true;
              state.sync = true;
              if (state.length === 0)
                state.needReadable = true;
              this._read(state.highWaterMark);
              state.sync = false;
              if (!state.reading)
                n = howMuchToRead(nOrig, state);
            }
            var ret;
            if (n > 0)
              ret = fromList(n, state);
            else
              ret = null;
            if (ret === null) {
              state.needReadable = true;
              n = 0;
            } else {
              state.length -= n;
            }
            if (state.length === 0) {
              if (!state.ended)
                state.needReadable = true;
              if (nOrig !== n && state.ended)
                endReadable(this);
            }
            if (ret !== null)
              this.emit("data", ret);
            return ret;
          };
          function onEofChunk(stream, state) {
            if (state.ended)
              return;
            if (state.decoder) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length) {
                state.buffer.push(chunk);
                state.length += state.objectMode ? 1 : chunk.length;
              }
            }
            state.ended = true;
            emitReadable(stream);
          }
          function emitReadable(stream) {
            var state = stream._readableState;
            state.needReadable = false;
            if (!state.emittedReadable) {
              debug("emitReadable", state.flowing);
              state.emittedReadable = true;
              if (state.sync)
                pna.nextTick(emitReadable_, stream);
              else
                emitReadable_(stream);
            }
          }
          function emitReadable_(stream) {
            debug("emit readable");
            stream.emit("readable");
            flow(stream);
          }
          function maybeReadMore(stream, state) {
            if (!state.readingMore) {
              state.readingMore = true;
              pna.nextTick(maybeReadMore_, stream, state);
            }
          }
          function maybeReadMore_(stream, state) {
            var len = state.length;
            while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
              debug("maybeReadMore read 0");
              stream.read(0);
              if (len === state.length)
                break;
              else
                len = state.length;
            }
            state.readingMore = false;
          }
          Readable.prototype._read = function(n) {
            this.emit("error", new Error("_read() is not implemented"));
          };
          Readable.prototype.pipe = function(dest, pipeOpts) {
            var src = this;
            var state = this._readableState;
            switch (state.pipesCount) {
              case 0:
                state.pipes = dest;
                break;
              case 1:
                state.pipes = [state.pipes, dest];
                break;
              default:
                state.pipes.push(dest);
                break;
            }
            state.pipesCount += 1;
            debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
            var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process2.stdout && dest !== process2.stderr;
            var endFn = doEnd ? onend : unpipe;
            if (state.endEmitted)
              pna.nextTick(endFn);
            else
              src.once("end", endFn);
            dest.on("unpipe", onunpipe);
            function onunpipe(readable, unpipeInfo) {
              debug("onunpipe");
              if (readable === src) {
                if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                  unpipeInfo.hasUnpiped = true;
                  cleanup();
                }
              }
            }
            function onend() {
              debug("onend");
              dest.end();
            }
            var ondrain = pipeOnDrain(src);
            dest.on("drain", ondrain);
            var cleanedUp = false;
            function cleanup() {
              debug("cleanup");
              dest.removeListener("close", onclose);
              dest.removeListener("finish", onfinish);
              dest.removeListener("drain", ondrain);
              dest.removeListener("error", onerror);
              dest.removeListener("unpipe", onunpipe);
              src.removeListener("end", onend);
              src.removeListener("end", unpipe);
              src.removeListener("data", ondata);
              cleanedUp = true;
              if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
                ondrain();
            }
            var increasedAwaitDrain = false;
            src.on("data", ondata);
            function ondata(chunk) {
              debug("ondata");
              increasedAwaitDrain = false;
              var ret = dest.write(chunk);
              if (false === ret && !increasedAwaitDrain) {
                if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                  debug("false write response, pause", src._readableState.awaitDrain);
                  src._readableState.awaitDrain++;
                  increasedAwaitDrain = true;
                }
                src.pause();
              }
            }
            function onerror(er) {
              debug("onerror", er);
              unpipe();
              dest.removeListener("error", onerror);
              if (EElistenerCount(dest, "error") === 0)
                dest.emit("error", er);
            }
            prependListener(dest, "error", onerror);
            function onclose() {
              dest.removeListener("finish", onfinish);
              unpipe();
            }
            dest.once("close", onclose);
            function onfinish() {
              debug("onfinish");
              dest.removeListener("close", onclose);
              unpipe();
            }
            dest.once("finish", onfinish);
            function unpipe() {
              debug("unpipe");
              src.unpipe(dest);
            }
            dest.emit("pipe", src);
            if (!state.flowing) {
              debug("pipe resume");
              src.resume();
            }
            return dest;
          };
          function pipeOnDrain(src) {
            return function() {
              var state = src._readableState;
              debug("pipeOnDrain", state.awaitDrain);
              if (state.awaitDrain)
                state.awaitDrain--;
              if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
                state.flowing = true;
                flow(src);
              }
            };
          }
          Readable.prototype.unpipe = function(dest) {
            var state = this._readableState;
            var unpipeInfo = { hasUnpiped: false };
            if (state.pipesCount === 0)
              return this;
            if (state.pipesCount === 1) {
              if (dest && dest !== state.pipes)
                return this;
              if (!dest)
                dest = state.pipes;
              state.pipes = null;
              state.pipesCount = 0;
              state.flowing = false;
              if (dest)
                dest.emit("unpipe", this, unpipeInfo);
              return this;
            }
            if (!dest) {
              var dests = state.pipes;
              var len = state.pipesCount;
              state.pipes = null;
              state.pipesCount = 0;
              state.flowing = false;
              for (var i = 0; i < len; i++) {
                dests[i].emit("unpipe", this, unpipeInfo);
              }
              return this;
            }
            var index2 = indexOf(state.pipes, dest);
            if (index2 === -1)
              return this;
            state.pipes.splice(index2, 1);
            state.pipesCount -= 1;
            if (state.pipesCount === 1)
              state.pipes = state.pipes[0];
            dest.emit("unpipe", this, unpipeInfo);
            return this;
          };
          Readable.prototype.on = function(ev, fn) {
            var res = Stream.prototype.on.call(this, ev, fn);
            if (ev === "data") {
              if (this._readableState.flowing !== false)
                this.resume();
            } else if (ev === "readable") {
              var state = this._readableState;
              if (!state.endEmitted && !state.readableListening) {
                state.readableListening = state.needReadable = true;
                state.emittedReadable = false;
                if (!state.reading) {
                  pna.nextTick(nReadingNextTick, this);
                } else if (state.length) {
                  emitReadable(this);
                }
              }
            }
            return res;
          };
          Readable.prototype.addListener = Readable.prototype.on;
          function nReadingNextTick(self2) {
            debug("readable nexttick read 0");
            self2.read(0);
          }
          Readable.prototype.resume = function() {
            var state = this._readableState;
            if (!state.flowing) {
              debug("resume");
              state.flowing = true;
              resume(this, state);
            }
            return this;
          };
          function resume(stream, state) {
            if (!state.resumeScheduled) {
              state.resumeScheduled = true;
              pna.nextTick(resume_, stream, state);
            }
          }
          function resume_(stream, state) {
            if (!state.reading) {
              debug("resume read 0");
              stream.read(0);
            }
            state.resumeScheduled = false;
            state.awaitDrain = 0;
            stream.emit("resume");
            flow(stream);
            if (state.flowing && !state.reading)
              stream.read(0);
          }
          Readable.prototype.pause = function() {
            debug("call pause flowing=%j", this._readableState.flowing);
            if (false !== this._readableState.flowing) {
              debug("pause");
              this._readableState.flowing = false;
              this.emit("pause");
            }
            return this;
          };
          function flow(stream) {
            var state = stream._readableState;
            debug("flow", state.flowing);
            while (state.flowing && stream.read() !== null) {
            }
          }
          Readable.prototype.wrap = function(stream) {
            var _this = this;
            var state = this._readableState;
            var paused = false;
            stream.on("end", function() {
              debug("wrapped end");
              if (state.decoder && !state.ended) {
                var chunk = state.decoder.end();
                if (chunk && chunk.length)
                  _this.push(chunk);
              }
              _this.push(null);
            });
            stream.on("data", function(chunk) {
              debug("wrapped data");
              if (state.decoder)
                chunk = state.decoder.write(chunk);
              if (state.objectMode && (chunk === null || chunk === void 0))
                return;
              else if (!state.objectMode && (!chunk || !chunk.length))
                return;
              var ret = _this.push(chunk);
              if (!ret) {
                paused = true;
                stream.pause();
              }
            });
            for (var i in stream) {
              if (this[i] === void 0 && typeof stream[i] === "function") {
                this[i] = function(method2) {
                  return function() {
                    return stream[method2].apply(stream, arguments);
                  };
                }(i);
              }
            }
            for (var n = 0; n < kProxyEvents.length; n++) {
              stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
            }
            this._read = function(n2) {
              debug("wrapped _read", n2);
              if (paused) {
                paused = false;
                stream.resume();
              }
            };
            return this;
          };
          Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function() {
              return this._readableState.highWaterMark;
            }
          });
          Readable._fromList = fromList;
          function fromList(n, state) {
            if (state.length === 0)
              return null;
            var ret;
            if (state.objectMode)
              ret = state.buffer.shift();
            else if (!n || n >= state.length) {
              if (state.decoder)
                ret = state.buffer.join("");
              else if (state.buffer.length === 1)
                ret = state.buffer.head.data;
              else
                ret = state.buffer.concat(state.length);
              state.buffer.clear();
            } else {
              ret = fromListPartial(n, state.buffer, state.decoder);
            }
            return ret;
          }
          function fromListPartial(n, list, hasStrings) {
            var ret;
            if (n < list.head.data.length) {
              ret = list.head.data.slice(0, n);
              list.head.data = list.head.data.slice(n);
            } else if (n === list.head.data.length) {
              ret = list.shift();
            } else {
              ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
            }
            return ret;
          }
          function copyFromBufferString(n, list) {
            var p = list.head;
            var c = 1;
            var ret = p.data;
            n -= ret.length;
            while (p = p.next) {
              var str = p.data;
              var nb = n > str.length ? str.length : n;
              if (nb === str.length)
                ret += str;
              else
                ret += str.slice(0, n);
              n -= nb;
              if (n === 0) {
                if (nb === str.length) {
                  ++c;
                  if (p.next)
                    list.head = p.next;
                  else
                    list.head = list.tail = null;
                } else {
                  list.head = p;
                  p.data = str.slice(nb);
                }
                break;
              }
              ++c;
            }
            list.length -= c;
            return ret;
          }
          function copyFromBuffer(n, list) {
            var ret = Buffer.allocUnsafe(n);
            var p = list.head;
            var c = 1;
            p.data.copy(ret);
            n -= p.data.length;
            while (p = p.next) {
              var buf = p.data;
              var nb = n > buf.length ? buf.length : n;
              buf.copy(ret, ret.length - n, 0, nb);
              n -= nb;
              if (n === 0) {
                if (nb === buf.length) {
                  ++c;
                  if (p.next)
                    list.head = p.next;
                  else
                    list.head = list.tail = null;
                } else {
                  list.head = p;
                  p.data = buf.slice(nb);
                }
                break;
              }
              ++c;
            }
            list.length -= c;
            return ret;
          }
          function endReadable(stream) {
            var state = stream._readableState;
            if (state.length > 0)
              throw new Error('"endReadable()" called on non-empty stream');
            if (!state.endEmitted) {
              state.ended = true;
              pna.nextTick(endReadableNT, state, stream);
            }
          }
          function endReadableNT(state, stream) {
            if (!state.endEmitted && state.length === 0) {
              state.endEmitted = true;
              stream.readable = false;
              stream.emit("end");
            }
          }
          function indexOf(xs, x) {
            for (var i = 0, l = xs.length; i < l; i++) {
              if (xs[i] === x)
                return i;
            }
            return -1;
          }
        }).call(this, require("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./_stream_duplex": 106, "./internal/streams/BufferList": 111, "./internal/streams/destroy": 112, "./internal/streams/stream": 113, "_process": 100, "core-util-is": 13, "events": 83, "inherits": 88, "isarray": 114, "process-nextick-args": 99, "safe-buffer": 118, "string_decoder/": 115, "util": 11 }], 109: [function(require, module2, exports2) {
        module2.exports = Transform;
        var Duplex = require("./_stream_duplex");
        var util = require("core-util-is");
        util.inherits = require("inherits");
        util.inherits(Transform, Duplex);
        function afterTransform(er, data) {
          var ts = this._transformState;
          ts.transforming = false;
          var cb = ts.writecb;
          if (!cb) {
            return this.emit("error", new Error("write callback called multiple times"));
          }
          ts.writechunk = null;
          ts.writecb = null;
          if (data != null)
            this.push(data);
          cb(er);
          var rs = this._readableState;
          rs.reading = false;
          if (rs.needReadable || rs.length < rs.highWaterMark) {
            this._read(rs.highWaterMark);
          }
        }
        function Transform(options2) {
          if (!(this instanceof Transform))
            return new Transform(options2);
          Duplex.call(this, options2);
          this._transformState = {
            afterTransform: afterTransform.bind(this),
            needTransform: false,
            transforming: false,
            writecb: null,
            writechunk: null,
            writeencoding: null
          };
          this._readableState.needReadable = true;
          this._readableState.sync = false;
          if (options2) {
            if (typeof options2.transform === "function")
              this._transform = options2.transform;
            if (typeof options2.flush === "function")
              this._flush = options2.flush;
          }
          this.on("prefinish", prefinish);
        }
        function prefinish() {
          var _this = this;
          if (typeof this._flush === "function") {
            this._flush(function(er, data) {
              done(_this, er, data);
            });
          } else {
            done(this, null, null);
          }
        }
        Transform.prototype.push = function(chunk, encoding) {
          this._transformState.needTransform = false;
          return Duplex.prototype.push.call(this, chunk, encoding);
        };
        Transform.prototype._transform = function(chunk, encoding, cb) {
          throw new Error("_transform() is not implemented");
        };
        Transform.prototype._write = function(chunk, encoding, cb) {
          var ts = this._transformState;
          ts.writecb = cb;
          ts.writechunk = chunk;
          ts.writeencoding = encoding;
          if (!ts.transforming) {
            var rs = this._readableState;
            if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
              this._read(rs.highWaterMark);
          }
        };
        Transform.prototype._read = function(n) {
          var ts = this._transformState;
          if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
            ts.transforming = true;
            this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
          } else {
            ts.needTransform = true;
          }
        };
        Transform.prototype._destroy = function(err, cb) {
          var _this2 = this;
          Duplex.prototype._destroy.call(this, err, function(err2) {
            cb(err2);
            _this2.emit("close");
          });
        };
        function done(stream, er, data) {
          if (er)
            return stream.emit("error", er);
          if (data != null)
            stream.push(data);
          if (stream._writableState.length)
            throw new Error("Calling transform done when ws.length != 0");
          if (stream._transformState.transforming)
            throw new Error("Calling transform done when still transforming");
          return stream.push(null);
        }
      }, { "./_stream_duplex": 106, "core-util-is": 13, "inherits": 88 }], 110: [function(require, module2, exports2) {
        (function(process2, global2, setImmediate) {
          var pna = require("process-nextick-args");
          module2.exports = Writable;
          function CorkedRequest(state) {
            var _this = this;
            this.next = null;
            this.entry = null;
            this.finish = function() {
              onCorkedFinish(_this, state);
            };
          }
          var asyncWrite = !process2.browser && ["v0.10", "v0.9."].indexOf(process2.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
          var Duplex;
          Writable.WritableState = WritableState;
          var util = require("core-util-is");
          util.inherits = require("inherits");
          var internalUtil = {
            deprecate: require("util-deprecate")
          };
          var Stream = require("./internal/streams/stream");
          var Buffer = require("safe-buffer").Buffer;
          var OurUint8Array = global2.Uint8Array || function() {
          };
          function _uint8ArrayToBuffer(chunk) {
            return Buffer.from(chunk);
          }
          function _isUint8Array(obj) {
            return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
          }
          var destroyImpl = require("./internal/streams/destroy");
          util.inherits(Writable, Stream);
          function nop() {
          }
          function WritableState(options2, stream) {
            Duplex = Duplex || require("./_stream_duplex");
            options2 = options2 || {};
            var isDuplex = stream instanceof Duplex;
            this.objectMode = !!options2.objectMode;
            if (isDuplex)
              this.objectMode = this.objectMode || !!options2.writableObjectMode;
            var hwm = options2.highWaterMark;
            var writableHwm = options2.writableHighWaterMark;
            var defaultHwm = this.objectMode ? 16 : 16 * 1024;
            if (hwm || hwm === 0)
              this.highWaterMark = hwm;
            else if (isDuplex && (writableHwm || writableHwm === 0))
              this.highWaterMark = writableHwm;
            else
              this.highWaterMark = defaultHwm;
            this.highWaterMark = Math.floor(this.highWaterMark);
            this.finalCalled = false;
            this.needDrain = false;
            this.ending = false;
            this.ended = false;
            this.finished = false;
            this.destroyed = false;
            var noDecode = options2.decodeStrings === false;
            this.decodeStrings = !noDecode;
            this.defaultEncoding = options2.defaultEncoding || "utf8";
            this.length = 0;
            this.writing = false;
            this.corked = 0;
            this.sync = true;
            this.bufferProcessing = false;
            this.onwrite = function(er) {
              onwrite(stream, er);
            };
            this.writecb = null;
            this.writelen = 0;
            this.bufferedRequest = null;
            this.lastBufferedRequest = null;
            this.pendingcb = 0;
            this.prefinished = false;
            this.errorEmitted = false;
            this.bufferedRequestCount = 0;
            this.corkedRequestsFree = new CorkedRequest(this);
          }
          WritableState.prototype.getBuffer = function getBuffer() {
            var current = this.bufferedRequest;
            var out = [];
            while (current) {
              out.push(current);
              current = current.next;
            }
            return out;
          };
          (function() {
            try {
              Object.defineProperty(WritableState.prototype, "buffer", {
                get: internalUtil.deprecate(function() {
                  return this.getBuffer();
                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
              });
            } catch (_) {
            }
          })();
          var realHasInstance;
          if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
            realHasInstance = Function.prototype[Symbol.hasInstance];
            Object.defineProperty(Writable, Symbol.hasInstance, {
              value: function(object2) {
                if (realHasInstance.call(this, object2))
                  return true;
                if (this !== Writable)
                  return false;
                return object2 && object2._writableState instanceof WritableState;
              }
            });
          } else {
            realHasInstance = function(object2) {
              return object2 instanceof this;
            };
          }
          function Writable(options2) {
            Duplex = Duplex || require("./_stream_duplex");
            if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
              return new Writable(options2);
            }
            this._writableState = new WritableState(options2, this);
            this.writable = true;
            if (options2) {
              if (typeof options2.write === "function")
                this._write = options2.write;
              if (typeof options2.writev === "function")
                this._writev = options2.writev;
              if (typeof options2.destroy === "function")
                this._destroy = options2.destroy;
              if (typeof options2.final === "function")
                this._final = options2.final;
            }
            Stream.call(this);
          }
          Writable.prototype.pipe = function() {
            this.emit("error", new Error("Cannot pipe, not readable"));
          };
          function writeAfterEnd(stream, cb) {
            var er = new Error("write after end");
            stream.emit("error", er);
            pna.nextTick(cb, er);
          }
          function validChunk(stream, state, chunk, cb) {
            var valid = true;
            var er = false;
            if (chunk === null) {
              er = new TypeError("May not write null values to stream");
            } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
              er = new TypeError("Invalid non-string/buffer chunk");
            }
            if (er) {
              stream.emit("error", er);
              pna.nextTick(cb, er);
              valid = false;
            }
            return valid;
          }
          Writable.prototype.write = function(chunk, encoding, cb) {
            var state = this._writableState;
            var ret = false;
            var isBuf = !state.objectMode && _isUint8Array(chunk);
            if (isBuf && !Buffer.isBuffer(chunk)) {
              chunk = _uint8ArrayToBuffer(chunk);
            }
            if (typeof encoding === "function") {
              cb = encoding;
              encoding = null;
            }
            if (isBuf)
              encoding = "buffer";
            else if (!encoding)
              encoding = state.defaultEncoding;
            if (typeof cb !== "function")
              cb = nop;
            if (state.ended)
              writeAfterEnd(this, cb);
            else if (isBuf || validChunk(this, state, chunk, cb)) {
              state.pendingcb++;
              ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
            }
            return ret;
          };
          Writable.prototype.cork = function() {
            var state = this._writableState;
            state.corked++;
          };
          Writable.prototype.uncork = function() {
            var state = this._writableState;
            if (state.corked) {
              state.corked--;
              if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
                clearBuffer(this, state);
            }
          };
          Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
            if (typeof encoding === "string")
              encoding = encoding.toLowerCase();
            if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
              throw new TypeError("Unknown encoding: " + encoding);
            this._writableState.defaultEncoding = encoding;
            return this;
          };
          function decodeChunk(state, chunk, encoding) {
            if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
              chunk = Buffer.from(chunk, encoding);
            }
            return chunk;
          }
          Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function() {
              return this._writableState.highWaterMark;
            }
          });
          function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
            if (!isBuf) {
              var newChunk = decodeChunk(state, chunk, encoding);
              if (chunk !== newChunk) {
                isBuf = true;
                encoding = "buffer";
                chunk = newChunk;
              }
            }
            var len = state.objectMode ? 1 : chunk.length;
            state.length += len;
            var ret = state.length < state.highWaterMark;
            if (!ret)
              state.needDrain = true;
            if (state.writing || state.corked) {
              var last = state.lastBufferedRequest;
              state.lastBufferedRequest = {
                chunk,
                encoding,
                isBuf,
                callback: cb,
                next: null
              };
              if (last) {
                last.next = state.lastBufferedRequest;
              } else {
                state.bufferedRequest = state.lastBufferedRequest;
              }
              state.bufferedRequestCount += 1;
            } else {
              doWrite(stream, state, false, len, chunk, encoding, cb);
            }
            return ret;
          }
          function doWrite(stream, state, writev, len, chunk, encoding, cb) {
            state.writelen = len;
            state.writecb = cb;
            state.writing = true;
            state.sync = true;
            if (writev)
              stream._writev(chunk, state.onwrite);
            else
              stream._write(chunk, encoding, state.onwrite);
            state.sync = false;
          }
          function onwriteError(stream, state, sync, er, cb) {
            --state.pendingcb;
            if (sync) {
              pna.nextTick(cb, er);
              pna.nextTick(finishMaybe, stream, state);
              stream._writableState.errorEmitted = true;
              stream.emit("error", er);
            } else {
              cb(er);
              stream._writableState.errorEmitted = true;
              stream.emit("error", er);
              finishMaybe(stream, state);
            }
          }
          function onwriteStateUpdate(state) {
            state.writing = false;
            state.writecb = null;
            state.length -= state.writelen;
            state.writelen = 0;
          }
          function onwrite(stream, er) {
            var state = stream._writableState;
            var sync = state.sync;
            var cb = state.writecb;
            onwriteStateUpdate(state);
            if (er)
              onwriteError(stream, state, sync, er, cb);
            else {
              var finished = needFinish(state);
              if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
                clearBuffer(stream, state);
              }
              if (sync) {
                asyncWrite(afterWrite, stream, state, finished, cb);
              } else {
                afterWrite(stream, state, finished, cb);
              }
            }
          }
          function afterWrite(stream, state, finished, cb) {
            if (!finished)
              onwriteDrain(stream, state);
            state.pendingcb--;
            cb();
            finishMaybe(stream, state);
          }
          function onwriteDrain(stream, state) {
            if (state.length === 0 && state.needDrain) {
              state.needDrain = false;
              stream.emit("drain");
            }
          }
          function clearBuffer(stream, state) {
            state.bufferProcessing = true;
            var entry = state.bufferedRequest;
            if (stream._writev && entry && entry.next) {
              var l = state.bufferedRequestCount;
              var buffer = new Array(l);
              var holder = state.corkedRequestsFree;
              holder.entry = entry;
              var count = 0;
              var allBuffers = true;
              while (entry) {
                buffer[count] = entry;
                if (!entry.isBuf)
                  allBuffers = false;
                entry = entry.next;
                count += 1;
              }
              buffer.allBuffers = allBuffers;
              doWrite(stream, state, true, state.length, buffer, "", holder.finish);
              state.pendingcb++;
              state.lastBufferedRequest = null;
              if (holder.next) {
                state.corkedRequestsFree = holder.next;
                holder.next = null;
              } else {
                state.corkedRequestsFree = new CorkedRequest(state);
              }
              state.bufferedRequestCount = 0;
            } else {
              while (entry) {
                var chunk = entry.chunk;
                var encoding = entry.encoding;
                var cb = entry.callback;
                var len = state.objectMode ? 1 : chunk.length;
                doWrite(stream, state, false, len, chunk, encoding, cb);
                entry = entry.next;
                state.bufferedRequestCount--;
                if (state.writing) {
                  break;
                }
              }
              if (entry === null)
                state.lastBufferedRequest = null;
            }
            state.bufferedRequest = entry;
            state.bufferProcessing = false;
          }
          Writable.prototype._write = function(chunk, encoding, cb) {
            cb(new Error("_write() is not implemented"));
          };
          Writable.prototype._writev = null;
          Writable.prototype.end = function(chunk, encoding, cb) {
            var state = this._writableState;
            if (typeof chunk === "function") {
              cb = chunk;
              chunk = null;
              encoding = null;
            } else if (typeof encoding === "function") {
              cb = encoding;
              encoding = null;
            }
            if (chunk !== null && chunk !== void 0)
              this.write(chunk, encoding);
            if (state.corked) {
              state.corked = 1;
              this.uncork();
            }
            if (!state.ending && !state.finished)
              endWritable(this, state, cb);
          };
          function needFinish(state) {
            return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
          }
          function callFinal(stream, state) {
            stream._final(function(err) {
              state.pendingcb--;
              if (err) {
                stream.emit("error", err);
              }
              state.prefinished = true;
              stream.emit("prefinish");
              finishMaybe(stream, state);
            });
          }
          function prefinish(stream, state) {
            if (!state.prefinished && !state.finalCalled) {
              if (typeof stream._final === "function") {
                state.pendingcb++;
                state.finalCalled = true;
                pna.nextTick(callFinal, stream, state);
              } else {
                state.prefinished = true;
                stream.emit("prefinish");
              }
            }
          }
          function finishMaybe(stream, state) {
            var need = needFinish(state);
            if (need) {
              prefinish(stream, state);
              if (state.pendingcb === 0) {
                state.finished = true;
                stream.emit("finish");
              }
            }
            return need;
          }
          function endWritable(stream, state, cb) {
            state.ending = true;
            finishMaybe(stream, state);
            if (cb) {
              if (state.finished)
                pna.nextTick(cb);
              else
                stream.once("finish", cb);
            }
            state.ended = true;
            stream.writable = false;
          }
          function onCorkedFinish(corkReq, state, err) {
            var entry = corkReq.entry;
            corkReq.entry = null;
            while (entry) {
              var cb = entry.callback;
              state.pendingcb--;
              cb(err);
              entry = entry.next;
            }
            if (state.corkedRequestsFree) {
              state.corkedRequestsFree.next = corkReq;
            } else {
              state.corkedRequestsFree = corkReq;
            }
          }
          Object.defineProperty(Writable.prototype, "destroyed", {
            get: function() {
              if (this._writableState === void 0) {
                return false;
              }
              return this._writableState.destroyed;
            },
            set: function(value) {
              if (!this._writableState) {
                return;
              }
              this._writableState.destroyed = value;
            }
          });
          Writable.prototype.destroy = destroyImpl.destroy;
          Writable.prototype._undestroy = destroyImpl.undestroy;
          Writable.prototype._destroy = function(err, cb) {
            this.end();
            cb(err);
          };
        }).call(this, require("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("timers").setImmediate);
      }, { "./_stream_duplex": 106, "./internal/streams/destroy": 112, "./internal/streams/stream": 113, "_process": 100, "core-util-is": 13, "inherits": 88, "process-nextick-args": 99, "safe-buffer": 118, "timers": 120, "util-deprecate": 134 }], 111: [function(require, module2, exports2) {
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        var Buffer = require("safe-buffer").Buffer;
        var util = require("util");
        function copyBuffer(src, target, offset) {
          src.copy(target, offset);
        }
        module2.exports = function() {
          function BufferList() {
            _classCallCheck(this, BufferList);
            this.head = null;
            this.tail = null;
            this.length = 0;
          }
          BufferList.prototype.push = function push(v) {
            var entry = { data: v, next: null };
            if (this.length > 0)
              this.tail.next = entry;
            else
              this.head = entry;
            this.tail = entry;
            ++this.length;
          };
          BufferList.prototype.unshift = function unshift(v) {
            var entry = { data: v, next: this.head };
            if (this.length === 0)
              this.tail = entry;
            this.head = entry;
            ++this.length;
          };
          BufferList.prototype.shift = function shift() {
            if (this.length === 0)
              return;
            var ret = this.head.data;
            if (this.length === 1)
              this.head = this.tail = null;
            else
              this.head = this.head.next;
            --this.length;
            return ret;
          };
          BufferList.prototype.clear = function clear() {
            this.head = this.tail = null;
            this.length = 0;
          };
          BufferList.prototype.join = function join(s) {
            if (this.length === 0)
              return "";
            var p = this.head;
            var ret = "" + p.data;
            while (p = p.next) {
              ret += s + p.data;
            }
            return ret;
          };
          BufferList.prototype.concat = function concat(n) {
            if (this.length === 0)
              return Buffer.alloc(0);
            if (this.length === 1)
              return this.head.data;
            var ret = Buffer.allocUnsafe(n >>> 0);
            var p = this.head;
            var i = 0;
            while (p) {
              copyBuffer(p.data, ret, i);
              i += p.data.length;
              p = p.next;
            }
            return ret;
          };
          return BufferList;
        }();
        if (util && util.inspect && util.inspect.custom) {
          module2.exports.prototype[util.inspect.custom] = function() {
            var obj = util.inspect({ length: this.length });
            return this.constructor.name + " " + obj;
          };
        }
      }, { "safe-buffer": 118, "util": 11 }], 112: [function(require, module2, exports2) {
        var pna = require("process-nextick-args");
        function destroy(err, cb) {
          var _this = this;
          var readableDestroyed = this._readableState && this._readableState.destroyed;
          var writableDestroyed = this._writableState && this._writableState.destroyed;
          if (readableDestroyed || writableDestroyed) {
            if (cb) {
              cb(err);
            } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
              pna.nextTick(emitErrorNT, this, err);
            }
            return this;
          }
          if (this._readableState) {
            this._readableState.destroyed = true;
          }
          if (this._writableState) {
            this._writableState.destroyed = true;
          }
          this._destroy(err || null, function(err2) {
            if (!cb && err2) {
              pna.nextTick(emitErrorNT, _this, err2);
              if (_this._writableState) {
                _this._writableState.errorEmitted = true;
              }
            } else if (cb) {
              cb(err2);
            }
          });
          return this;
        }
        function undestroy() {
          if (this._readableState) {
            this._readableState.destroyed = false;
            this._readableState.reading = false;
            this._readableState.ended = false;
            this._readableState.endEmitted = false;
          }
          if (this._writableState) {
            this._writableState.destroyed = false;
            this._writableState.ended = false;
            this._writableState.ending = false;
            this._writableState.finished = false;
            this._writableState.errorEmitted = false;
          }
        }
        function emitErrorNT(self2, err) {
          self2.emit("error", err);
        }
        module2.exports = {
          destroy,
          undestroy
        };
      }, { "process-nextick-args": 99 }], 113: [function(require, module2, exports2) {
        module2.exports = require("events").EventEmitter;
      }, { "events": 83 }], 114: [function(require, module2, exports2) {
        var toString = {}.toString;
        module2.exports = Array.isArray || function(arr) {
          return toString.call(arr) == "[object Array]";
        };
      }, {}], 115: [function(require, module2, exports2) {
        var Buffer = require("safe-buffer").Buffer;
        var isEncoding = Buffer.isEncoding || function(encoding) {
          encoding = "" + encoding;
          switch (encoding && encoding.toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
            case "raw":
              return true;
            default:
              return false;
          }
        };
        function _normalizeEncoding(enc) {
          if (!enc)
            return "utf8";
          var retried;
          while (true) {
            switch (enc) {
              case "utf8":
              case "utf-8":
                return "utf8";
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return "utf16le";
              case "latin1":
              case "binary":
                return "latin1";
              case "base64":
              case "ascii":
              case "hex":
                return enc;
              default:
                if (retried)
                  return;
                enc = ("" + enc).toLowerCase();
                retried = true;
            }
          }
        }
        function normalizeEncoding(enc) {
          var nenc = _normalizeEncoding(enc);
          if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc)))
            throw new Error("Unknown encoding: " + enc);
          return nenc || enc;
        }
        exports2.StringDecoder = StringDecoder;
        function StringDecoder(encoding) {
          this.encoding = normalizeEncoding(encoding);
          var nb;
          switch (this.encoding) {
            case "utf16le":
              this.text = utf16Text;
              this.end = utf16End;
              nb = 4;
              break;
            case "utf8":
              this.fillLast = utf8FillLast;
              nb = 4;
              break;
            case "base64":
              this.text = base64Text;
              this.end = base64End;
              nb = 3;
              break;
            default:
              this.write = simpleWrite;
              this.end = simpleEnd;
              return;
          }
          this.lastNeed = 0;
          this.lastTotal = 0;
          this.lastChar = Buffer.allocUnsafe(nb);
        }
        StringDecoder.prototype.write = function(buf) {
          if (buf.length === 0)
            return "";
          var r;
          var i;
          if (this.lastNeed) {
            r = this.fillLast(buf);
            if (r === void 0)
              return "";
            i = this.lastNeed;
            this.lastNeed = 0;
          } else {
            i = 0;
          }
          if (i < buf.length)
            return r ? r + this.text(buf, i) : this.text(buf, i);
          return r || "";
        };
        StringDecoder.prototype.end = utf8End;
        StringDecoder.prototype.text = utf8Text;
        StringDecoder.prototype.fillLast = function(buf) {
          if (this.lastNeed <= buf.length) {
            buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
            return this.lastChar.toString(this.encoding, 0, this.lastTotal);
          }
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
          this.lastNeed -= buf.length;
        };
        function utf8CheckByte(byte) {
          if (byte <= 127)
            return 0;
          else if (byte >> 5 === 6)
            return 2;
          else if (byte >> 4 === 14)
            return 3;
          else if (byte >> 3 === 30)
            return 4;
          return byte >> 6 === 2 ? -1 : -2;
        }
        function utf8CheckIncomplete(self2, buf, i) {
          var j = buf.length - 1;
          if (j < i)
            return 0;
          var nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0)
              self2.lastNeed = nb - 1;
            return nb;
          }
          if (--j < i || nb === -2)
            return 0;
          nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0)
              self2.lastNeed = nb - 2;
            return nb;
          }
          if (--j < i || nb === -2)
            return 0;
          nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0) {
              if (nb === 2)
                nb = 0;
              else
                self2.lastNeed = nb - 3;
            }
            return nb;
          }
          return 0;
        }
        function utf8CheckExtraBytes(self2, buf, p) {
          if ((buf[0] & 192) !== 128) {
            self2.lastNeed = 0;
            return "�";
          }
          if (self2.lastNeed > 1 && buf.length > 1) {
            if ((buf[1] & 192) !== 128) {
              self2.lastNeed = 1;
              return "�";
            }
            if (self2.lastNeed > 2 && buf.length > 2) {
              if ((buf[2] & 192) !== 128) {
                self2.lastNeed = 2;
                return "�";
              }
            }
          }
        }
        function utf8FillLast(buf) {
          var p = this.lastTotal - this.lastNeed;
          var r = utf8CheckExtraBytes(this, buf);
          if (r !== void 0)
            return r;
          if (this.lastNeed <= buf.length) {
            buf.copy(this.lastChar, p, 0, this.lastNeed);
            return this.lastChar.toString(this.encoding, 0, this.lastTotal);
          }
          buf.copy(this.lastChar, p, 0, buf.length);
          this.lastNeed -= buf.length;
        }
        function utf8Text(buf, i) {
          var total = utf8CheckIncomplete(this, buf, i);
          if (!this.lastNeed)
            return buf.toString("utf8", i);
          this.lastTotal = total;
          var end = buf.length - (total - this.lastNeed);
          buf.copy(this.lastChar, 0, end);
          return buf.toString("utf8", i, end);
        }
        function utf8End(buf) {
          var r = buf && buf.length ? this.write(buf) : "";
          if (this.lastNeed)
            return r + "�";
          return r;
        }
        function utf16Text(buf, i) {
          if ((buf.length - i) % 2 === 0) {
            var r = buf.toString("utf16le", i);
            if (r) {
              var c = r.charCodeAt(r.length - 1);
              if (c >= 55296 && c <= 56319) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
              }
            }
            return r;
          }
          this.lastNeed = 1;
          this.lastTotal = 2;
          this.lastChar[0] = buf[buf.length - 1];
          return buf.toString("utf16le", i, buf.length - 1);
        }
        function utf16End(buf) {
          var r = buf && buf.length ? this.write(buf) : "";
          if (this.lastNeed) {
            var end = this.lastTotal - this.lastNeed;
            return r + this.lastChar.toString("utf16le", 0, end);
          }
          return r;
        }
        function base64Text(buf, i) {
          var n = (buf.length - i) % 3;
          if (n === 0)
            return buf.toString("base64", i);
          this.lastNeed = 3 - n;
          this.lastTotal = 3;
          if (n === 1) {
            this.lastChar[0] = buf[buf.length - 1];
          } else {
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
          }
          return buf.toString("base64", i, buf.length - n);
        }
        function base64End(buf) {
          var r = buf && buf.length ? this.write(buf) : "";
          if (this.lastNeed)
            return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
          return r;
        }
        function simpleWrite(buf) {
          return buf.toString(this.encoding);
        }
        function simpleEnd(buf) {
          return buf && buf.length ? this.write(buf) : "";
        }
      }, { "safe-buffer": 118 }], 116: [function(require, module2, exports2) {
        exports2 = module2.exports = require("./lib/_stream_readable.js");
        exports2.Stream = exports2;
        exports2.Readable = exports2;
        exports2.Writable = require("./lib/_stream_writable.js");
        exports2.Duplex = require("./lib/_stream_duplex.js");
        exports2.Transform = require("./lib/_stream_transform.js");
        exports2.PassThrough = require("./lib/_stream_passthrough.js");
      }, { "./lib/_stream_duplex.js": 106, "./lib/_stream_passthrough.js": 107, "./lib/_stream_readable.js": 108, "./lib/_stream_transform.js": 109, "./lib/_stream_writable.js": 110 }], 117: [function(require, module2, exports2) {
        function ReInterval(callback, interval, args) {
          var self2 = this;
          this._callback = callback;
          this._args = args;
          this._interval = setInterval(callback, interval, this._args);
          this.reschedule = function(interval2) {
            if (!interval2)
              interval2 = self2._interval;
            if (self2._interval)
              clearInterval(self2._interval);
            self2._interval = setInterval(self2._callback, interval2, self2._args);
          };
          this.clear = function() {
            if (self2._interval) {
              clearInterval(self2._interval);
              self2._interval = void 0;
            }
          };
          this.destroy = function() {
            if (self2._interval) {
              clearInterval(self2._interval);
            }
            self2._callback = void 0;
            self2._interval = void 0;
            self2._args = void 0;
          };
        }
        function reInterval() {
          if (typeof arguments[0] !== "function")
            throw new Error("callback needed");
          if (typeof arguments[1] !== "number")
            throw new Error("interval needed");
          var args;
          if (arguments.length > 0) {
            args = new Array(arguments.length - 2);
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i + 2];
            }
          }
          return new ReInterval(arguments[0], arguments[1], args);
        }
        module2.exports = reInterval;
      }, {}], 118: [function(require, module2, exports2) {
        var buffer = require("buffer");
        var Buffer = buffer.Buffer;
        function copyProps(src, dst) {
          for (var key in src) {
            dst[key] = src[key];
          }
        }
        if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
          module2.exports = buffer;
        } else {
          copyProps(buffer, exports2);
          exports2.Buffer = SafeBuffer;
        }
        function SafeBuffer(arg, encodingOrOffset, length) {
          return Buffer(arg, encodingOrOffset, length);
        }
        copyProps(Buffer, SafeBuffer);
        SafeBuffer.from = function(arg, encodingOrOffset, length) {
          if (typeof arg === "number") {
            throw new TypeError("Argument must not be a number");
          }
          return Buffer(arg, encodingOrOffset, length);
        };
        SafeBuffer.alloc = function(size, fill, encoding) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number");
          }
          var buf = Buffer(size);
          if (fill !== void 0) {
            if (typeof encoding === "string") {
              buf.fill(fill, encoding);
            } else {
              buf.fill(fill);
            }
          } else {
            buf.fill(0);
          }
          return buf;
        };
        SafeBuffer.allocUnsafe = function(size) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number");
          }
          return Buffer(size);
        };
        SafeBuffer.allocUnsafeSlow = function(size) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number");
          }
          return buffer.SlowBuffer(size);
        };
      }, { "buffer": 12 }], 119: [function(require, module2, exports2) {
        module2.exports = shift;
        function shift(stream) {
          var rs = stream._readableState;
          if (!rs)
            return null;
          return rs.objectMode || typeof stream._duplexState === "number" ? stream.read() : stream.read(getStateLength(rs));
        }
        function getStateLength(state) {
          if (state.buffer.length) {
            if (state.buffer.head) {
              return state.buffer.head.data.length;
            }
            return state.buffer[0].length;
          }
          return state.length;
        }
      }, {}], 120: [function(require, module2, exports2) {
        (function(setImmediate, clearImmediate) {
          var nextTick = require("process/browser.js").nextTick;
          var apply = Function.prototype.apply;
          var slice = Array.prototype.slice;
          var immediateIds = {};
          var nextImmediateId = 0;
          exports2.setTimeout = function() {
            return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
          };
          exports2.setInterval = function() {
            return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
          };
          exports2.clearTimeout = exports2.clearInterval = function(timeout) {
            timeout.close();
          };
          function Timeout(id, clearFn) {
            this._id = id;
            this._clearFn = clearFn;
          }
          Timeout.prototype.unref = Timeout.prototype.ref = function() {
          };
          Timeout.prototype.close = function() {
            this._clearFn.call(window, this._id);
          };
          exports2.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = msecs;
          };
          exports2.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = -1;
          };
          exports2._unrefActive = exports2.active = function(item) {
            clearTimeout(item._idleTimeoutId);
            var msecs = item._idleTimeout;
            if (msecs >= 0) {
              item._idleTimeoutId = setTimeout(function onTimeout() {
                if (item._onTimeout)
                  item._onTimeout();
              }, msecs);
            }
          };
          exports2.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
            var id = nextImmediateId++;
            var args = arguments.length < 2 ? false : slice.call(arguments, 1);
            immediateIds[id] = true;
            nextTick(function onNextTick() {
              if (immediateIds[id]) {
                if (args) {
                  fn.apply(null, args);
                } else {
                  fn.call(null);
                }
                exports2.clearImmediate(id);
              }
            });
            return id;
          };
          exports2.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
            delete immediateIds[id];
          };
        }).call(this, require("timers").setImmediate, require("timers").clearImmediate);
      }, { "process/browser.js": 100, "timers": 120 }], 121: [function(require, module2, exports2) {
        var isPrototype = require("../prototype/is");
        module2.exports = function(value) {
          if (typeof value !== "function")
            return false;
          if (!hasOwnProperty.call(value, "length"))
            return false;
          try {
            if (typeof value.length !== "number")
              return false;
            if (typeof value.call !== "function")
              return false;
            if (typeof value.apply !== "function")
              return false;
          } catch (error2) {
            return false;
          }
          return !isPrototype(value);
        };
      }, { "../prototype/is": 128 }], 122: [function(require, module2, exports2) {
        var isValue = require("../value/is"), isObject = require("../object/is"), stringCoerce = require("../string/coerce"), toShortString = require("./to-short-string");
        var resolveMessage = function(message, value) {
          return message.replace("%v", toShortString(value));
        };
        module2.exports = function(value, defaultMessage, inputOptions) {
          if (!isObject(inputOptions))
            throw new TypeError(resolveMessage(defaultMessage, value));
          if (!isValue(value)) {
            if ("default" in inputOptions)
              return inputOptions["default"];
            if (inputOptions.isOptional)
              return null;
          }
          var errorMessage = stringCoerce(inputOptions.errorMessage);
          if (!isValue(errorMessage))
            errorMessage = defaultMessage;
          throw new TypeError(resolveMessage(errorMessage, value));
        };
      }, { "../object/is": 125, "../string/coerce": 129, "../value/is": 131, "./to-short-string": 124 }], 123: [function(require, module2, exports2) {
        module2.exports = function(value) {
          try {
            return value.toString();
          } catch (error2) {
            try {
              return String(value);
            } catch (error22) {
              return null;
            }
          }
        };
      }, {}], 124: [function(require, module2, exports2) {
        var safeToString = require("./safe-to-string");
        var reNewLine = /[\n\r\u2028\u2029]/g;
        module2.exports = function(value) {
          var string2 = safeToString(value);
          if (string2 === null)
            return "<Non-coercible to string value>";
          if (string2.length > 100)
            string2 = string2.slice(0, 99) + "…";
          string2 = string2.replace(reNewLine, function(char) {
            switch (char) {
              case "\n":
                return "\\n";
              case "\r":
                return "\\r";
              case "\u2028":
                return "\\u2028";
              case "\u2029":
                return "\\u2029";
              default:
                throw new Error("Unexpected character");
            }
          });
          return string2;
        };
      }, { "./safe-to-string": 123 }], 125: [function(require, module2, exports2) {
        var isValue = require("../value/is");
        var possibleTypes = {
          "object": true,
          "function": true,
          "undefined": true
          /* document.all */
        };
        module2.exports = function(value) {
          if (!isValue(value))
            return false;
          return hasOwnProperty.call(possibleTypes, typeof value);
        };
      }, { "../value/is": 131 }], 126: [function(require, module2, exports2) {
        var resolveException = require("../lib/resolve-exception"), is = require("./is");
        module2.exports = function(value) {
          if (is(value))
            return value;
          return resolveException(value, "%v is not a plain function", arguments[1]);
        };
      }, { "../lib/resolve-exception": 122, "./is": 127 }], 127: [function(require, module2, exports2) {
        var isFunction = require("../function/is");
        var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
        module2.exports = function(value) {
          if (!isFunction(value))
            return false;
          if (classRe.test(functionToString.call(value)))
            return false;
          return true;
        };
      }, { "../function/is": 121 }], 128: [function(require, module2, exports2) {
        var isObject = require("../object/is");
        module2.exports = function(value) {
          if (!isObject(value))
            return false;
          try {
            if (!value.constructor)
              return false;
            return value.constructor.prototype === value;
          } catch (error2) {
            return false;
          }
        };
      }, { "../object/is": 125 }], 129: [function(require, module2, exports2) {
        var isValue = require("../value/is"), isObject = require("../object/is");
        var objectToString = Object.prototype.toString;
        module2.exports = function(value) {
          if (!isValue(value))
            return null;
          if (isObject(value)) {
            var valueToString = value.toString;
            if (typeof valueToString !== "function")
              return null;
            if (valueToString === objectToString)
              return null;
          }
          try {
            return "" + value;
          } catch (error2) {
            return null;
          }
        };
      }, { "../object/is": 125, "../value/is": 131 }], 130: [function(require, module2, exports2) {
        var resolveException = require("../lib/resolve-exception"), is = require("./is");
        module2.exports = function(value) {
          if (is(value))
            return value;
          return resolveException(value, "Cannot use %v", arguments[1]);
        };
      }, { "../lib/resolve-exception": 122, "./is": 131 }], 131: [function(require, module2, exports2) {
        var _undefined = void 0;
        module2.exports = function(value) {
          return value !== _undefined && value !== null;
        };
      }, {}], 132: [function(require, module2, exports2) {
        var punycode = require("punycode");
        var util = require("./util");
        exports2.parse = urlParse;
        exports2.resolve = urlResolve;
        exports2.resolveObject = urlResolveObject;
        exports2.format = urlFormat;
        exports2.Url = Url;
        function Url() {
          this.protocol = null;
          this.slashes = null;
          this.auth = null;
          this.host = null;
          this.port = null;
          this.hostname = null;
          this.hash = null;
          this.search = null;
          this.query = null;
          this.pathname = null;
          this.path = null;
          this.href = null;
        }
        var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"], unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape), hostEndingChars = ["/", "?", "#"], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
          "javascript": true,
          "javascript:": true
        }, hostlessProtocol = {
          "javascript": true,
          "javascript:": true
        }, slashedProtocol = {
          "http": true,
          "https": true,
          "ftp": true,
          "gopher": true,
          "file": true,
          "http:": true,
          "https:": true,
          "ftp:": true,
          "gopher:": true,
          "file:": true
        }, querystring = require("querystring");
        function urlParse(url2, parseQueryString, slashesDenoteHost) {
          if (url2 && util.isObject(url2) && url2 instanceof Url)
            return url2;
          var u = new Url();
          u.parse(url2, parseQueryString, slashesDenoteHost);
          return u;
        }
        Url.prototype.parse = function(url2, parseQueryString, slashesDenoteHost) {
          if (!util.isString(url2)) {
            throw new TypeError("Parameter 'url' must be a string, not " + typeof url2);
          }
          var queryIndex = url2.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url2.indexOf("#") ? "?" : "#", uSplit = url2.split(splitter), slashRegex = /\\/g;
          uSplit[0] = uSplit[0].replace(slashRegex, "/");
          url2 = uSplit.join(splitter);
          var rest = url2;
          rest = rest.trim();
          if (!slashesDenoteHost && url2.split("#").length === 1) {
            var simplePath = simplePathPattern.exec(rest);
            if (simplePath) {
              this.path = rest;
              this.href = rest;
              this.pathname = simplePath[1];
              if (simplePath[2]) {
                this.search = simplePath[2];
                if (parseQueryString) {
                  this.query = querystring.parse(this.search.substr(1));
                } else {
                  this.query = this.search.substr(1);
                }
              } else if (parseQueryString) {
                this.search = "";
                this.query = {};
              }
              return this;
            }
          }
          var proto = protocolPattern.exec(rest);
          if (proto) {
            proto = proto[0];
            var lowerProto = proto.toLowerCase();
            this.protocol = lowerProto;
            rest = rest.substr(proto.length);
          }
          if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var slashes = rest.substr(0, 2) === "//";
            if (slashes && !(proto && hostlessProtocol[proto])) {
              rest = rest.substr(2);
              this.slashes = true;
            }
          }
          if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
            var hostEnd = -1;
            for (var i = 0; i < hostEndingChars.length; i++) {
              var hec = rest.indexOf(hostEndingChars[i]);
              if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                hostEnd = hec;
            }
            var auth, atSign;
            if (hostEnd === -1) {
              atSign = rest.lastIndexOf("@");
            } else {
              atSign = rest.lastIndexOf("@", hostEnd);
            }
            if (atSign !== -1) {
              auth = rest.slice(0, atSign);
              rest = rest.slice(atSign + 1);
              this.auth = decodeURIComponent(auth);
            }
            hostEnd = -1;
            for (var i = 0; i < nonHostChars.length; i++) {
              var hec = rest.indexOf(nonHostChars[i]);
              if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                hostEnd = hec;
            }
            if (hostEnd === -1)
              hostEnd = rest.length;
            this.host = rest.slice(0, hostEnd);
            rest = rest.slice(hostEnd);
            this.parseHost();
            this.hostname = this.hostname || "";
            var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
            if (!ipv6Hostname) {
              var hostparts = this.hostname.split(/\./);
              for (var i = 0, l = hostparts.length; i < l; i++) {
                var part = hostparts[i];
                if (!part)
                  continue;
                if (!part.match(hostnamePartPattern)) {
                  var newpart = "";
                  for (var j = 0, k = part.length; j < k; j++) {
                    if (part.charCodeAt(j) > 127) {
                      newpart += "x";
                    } else {
                      newpart += part[j];
                    }
                  }
                  if (!newpart.match(hostnamePartPattern)) {
                    var validParts = hostparts.slice(0, i);
                    var notHost = hostparts.slice(i + 1);
                    var bit = part.match(hostnamePartStart);
                    if (bit) {
                      validParts.push(bit[1]);
                      notHost.unshift(bit[2]);
                    }
                    if (notHost.length) {
                      rest = "/" + notHost.join(".") + rest;
                    }
                    this.hostname = validParts.join(".");
                    break;
                  }
                }
              }
            }
            if (this.hostname.length > hostnameMaxLen) {
              this.hostname = "";
            } else {
              this.hostname = this.hostname.toLowerCase();
            }
            if (!ipv6Hostname) {
              this.hostname = punycode.toASCII(this.hostname);
            }
            var p = this.port ? ":" + this.port : "";
            var h = this.hostname || "";
            this.host = h + p;
            this.href += this.host;
            if (ipv6Hostname) {
              this.hostname = this.hostname.substr(1, this.hostname.length - 2);
              if (rest[0] !== "/") {
                rest = "/" + rest;
              }
            }
          }
          if (!unsafeProtocol[lowerProto]) {
            for (var i = 0, l = autoEscape.length; i < l; i++) {
              var ae = autoEscape[i];
              if (rest.indexOf(ae) === -1)
                continue;
              var esc = encodeURIComponent(ae);
              if (esc === ae) {
                esc = escape(ae);
              }
              rest = rest.split(ae).join(esc);
            }
          }
          var hash = rest.indexOf("#");
          if (hash !== -1) {
            this.hash = rest.substr(hash);
            rest = rest.slice(0, hash);
          }
          var qm = rest.indexOf("?");
          if (qm !== -1) {
            this.search = rest.substr(qm);
            this.query = rest.substr(qm + 1);
            if (parseQueryString) {
              this.query = querystring.parse(this.query);
            }
            rest = rest.slice(0, qm);
          } else if (parseQueryString) {
            this.search = "";
            this.query = {};
          }
          if (rest)
            this.pathname = rest;
          if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
            this.pathname = "/";
          }
          if (this.pathname || this.search) {
            var p = this.pathname || "";
            var s = this.search || "";
            this.path = p + s;
          }
          this.href = this.format();
          return this;
        };
        function urlFormat(obj) {
          if (util.isString(obj))
            obj = urlParse(obj);
          if (!(obj instanceof Url))
            return Url.prototype.format.call(obj);
          return obj.format();
        }
        Url.prototype.format = function() {
          var auth = this.auth || "";
          if (auth) {
            auth = encodeURIComponent(auth);
            auth = auth.replace(/%3A/i, ":");
            auth += "@";
          }
          var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
          if (this.host) {
            host = auth + this.host;
          } else if (this.hostname) {
            host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
            if (this.port) {
              host += ":" + this.port;
            }
          }
          if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
            query = querystring.stringify(this.query);
          }
          var search = this.search || query && "?" + query || "";
          if (protocol && protocol.substr(-1) !== ":")
            protocol += ":";
          if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
            host = "//" + (host || "");
            if (pathname && pathname.charAt(0) !== "/")
              pathname = "/" + pathname;
          } else if (!host) {
            host = "";
          }
          if (hash && hash.charAt(0) !== "#")
            hash = "#" + hash;
          if (search && search.charAt(0) !== "?")
            search = "?" + search;
          pathname = pathname.replace(/[?#]/g, function(match) {
            return encodeURIComponent(match);
          });
          search = search.replace("#", "%23");
          return protocol + host + pathname + search + hash;
        };
        function urlResolve(source, relative) {
          return urlParse(source, false, true).resolve(relative);
        }
        Url.prototype.resolve = function(relative) {
          return this.resolveObject(urlParse(relative, false, true)).format();
        };
        function urlResolveObject(source, relative) {
          if (!source)
            return relative;
          return urlParse(source, false, true).resolveObject(relative);
        }
        Url.prototype.resolveObject = function(relative) {
          if (util.isString(relative)) {
            var rel = new Url();
            rel.parse(relative, false, true);
            relative = rel;
          }
          var result = new Url();
          var tkeys = Object.keys(this);
          for (var tk = 0; tk < tkeys.length; tk++) {
            var tkey = tkeys[tk];
            result[tkey] = this[tkey];
          }
          result.hash = relative.hash;
          if (relative.href === "") {
            result.href = result.format();
            return result;
          }
          if (relative.slashes && !relative.protocol) {
            var rkeys = Object.keys(relative);
            for (var rk = 0; rk < rkeys.length; rk++) {
              var rkey = rkeys[rk];
              if (rkey !== "protocol")
                result[rkey] = relative[rkey];
            }
            if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
              result.path = result.pathname = "/";
            }
            result.href = result.format();
            return result;
          }
          if (relative.protocol && relative.protocol !== result.protocol) {
            if (!slashedProtocol[relative.protocol]) {
              var keys = Object.keys(relative);
              for (var v = 0; v < keys.length; v++) {
                var k = keys[v];
                result[k] = relative[k];
              }
              result.href = result.format();
              return result;
            }
            result.protocol = relative.protocol;
            if (!relative.host && !hostlessProtocol[relative.protocol]) {
              var relPath = (relative.pathname || "").split("/");
              while (relPath.length && !(relative.host = relPath.shift()))
                ;
              if (!relative.host)
                relative.host = "";
              if (!relative.hostname)
                relative.hostname = "";
              if (relPath[0] !== "")
                relPath.unshift("");
              if (relPath.length < 2)
                relPath.unshift("");
              result.pathname = relPath.join("/");
            } else {
              result.pathname = relative.pathname;
            }
            result.search = relative.search;
            result.query = relative.query;
            result.host = relative.host || "";
            result.auth = relative.auth;
            result.hostname = relative.hostname || relative.host;
            result.port = relative.port;
            if (result.pathname || result.search) {
              var p = result.pathname || "";
              var s = result.search || "";
              result.path = p + s;
            }
            result.slashes = result.slashes || relative.slashes;
            result.href = result.format();
            return result;
          }
          var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
          if (psychotic) {
            result.hostname = "";
            result.port = null;
            if (result.host) {
              if (srcPath[0] === "")
                srcPath[0] = result.host;
              else
                srcPath.unshift(result.host);
            }
            result.host = "";
            if (relative.protocol) {
              relative.hostname = null;
              relative.port = null;
              if (relative.host) {
                if (relPath[0] === "")
                  relPath[0] = relative.host;
                else
                  relPath.unshift(relative.host);
              }
              relative.host = null;
            }
            mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
          }
          if (isRelAbs) {
            result.host = relative.host || relative.host === "" ? relative.host : result.host;
            result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
            result.search = relative.search;
            result.query = relative.query;
            srcPath = relPath;
          } else if (relPath.length) {
            if (!srcPath)
              srcPath = [];
            srcPath.pop();
            srcPath = srcPath.concat(relPath);
            result.search = relative.search;
            result.query = relative.query;
          } else if (!util.isNullOrUndefined(relative.search)) {
            if (psychotic) {
              result.hostname = result.host = srcPath.shift();
              var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
              if (authInHost) {
                result.auth = authInHost.shift();
                result.host = result.hostname = authInHost.shift();
              }
            }
            result.search = relative.search;
            result.query = relative.query;
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
              result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
            }
            result.href = result.format();
            return result;
          }
          if (!srcPath.length) {
            result.pathname = null;
            if (result.search) {
              result.path = "/" + result.search;
            } else {
              result.path = null;
            }
            result.href = result.format();
            return result;
          }
          var last = srcPath.slice(-1)[0];
          var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
          var up = 0;
          for (var i = srcPath.length; i >= 0; i--) {
            last = srcPath[i];
            if (last === ".") {
              srcPath.splice(i, 1);
            } else if (last === "..") {
              srcPath.splice(i, 1);
              up++;
            } else if (up) {
              srcPath.splice(i, 1);
              up--;
            }
          }
          if (!mustEndAbs && !removeAllDots) {
            for (; up--; up) {
              srcPath.unshift("..");
            }
          }
          if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
            srcPath.unshift("");
          }
          if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
            srcPath.push("");
          }
          var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
          if (psychotic) {
            result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          mustEndAbs = mustEndAbs || result.host && srcPath.length;
          if (mustEndAbs && !isAbsolute) {
            srcPath.unshift("");
          }
          if (!srcPath.length) {
            result.pathname = null;
            result.path = null;
          } else {
            result.pathname = srcPath.join("/");
          }
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          }
          result.auth = relative.auth || result.auth;
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        };
        Url.prototype.parseHost = function() {
          var host = this.host;
          var port = portPattern.exec(host);
          if (port) {
            port = port[0];
            if (port !== ":") {
              this.port = port.substr(1);
            }
            host = host.substr(0, host.length - port.length);
          }
          if (host)
            this.hostname = host;
        };
      }, { "./util": 133, "punycode": 101, "querystring": 104 }], 133: [function(require, module2, exports2) {
        module2.exports = {
          isString: function(arg) {
            return typeof arg === "string";
          },
          isObject: function(arg) {
            return typeof arg === "object" && arg !== null;
          },
          isNull: function(arg) {
            return arg === null;
          },
          isNullOrUndefined: function(arg) {
            return arg == null;
          }
        };
      }, {}], 134: [function(require, module2, exports2) {
        (function(global2) {
          module2.exports = deprecate;
          function deprecate(fn, msg) {
            if (config("noDeprecation")) {
              return fn;
            }
            var warned = false;
            function deprecated() {
              if (!warned) {
                if (config("throwDeprecation")) {
                  throw new Error(msg);
                } else if (config("traceDeprecation")) {
                  console.trace(msg);
                } else {
                  formatAppLog("warn", "at node_modules/mqtt/dist/mqtt.js:14843", msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }
            return deprecated;
          }
          function config(name) {
            try {
              if (!global2.localStorage)
                return false;
            } catch (_) {
              return false;
            }
            var val = global2.localStorage[name];
            if (null == val)
              return false;
            return String(val).toLowerCase() === "true";
          }
        }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 135: [function(require, module2, exports2) {
        module2.exports = function isBuffer(arg) {
          return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
        };
      }, {}], 136: [function(require, module2, exports2) {
        (function(process2, global2) {
          var formatRegExp2 = /%[sdj%]/g;
          exports2.format = function(f) {
            if (!isString(f)) {
              var objects = [];
              for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
              }
              return objects.join(" ");
            }
            var i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp2, function(x2) {
              if (x2 === "%%")
                return "%";
              if (i >= len)
                return x2;
              switch (x2) {
                case "%s":
                  return String(args[i++]);
                case "%d":
                  return Number(args[i++]);
                case "%j":
                  try {
                    return JSON.stringify(args[i++]);
                  } catch (_) {
                    return "[Circular]";
                  }
                default:
                  return x2;
              }
            });
            for (var x = args[i]; i < len; x = args[++i]) {
              if (isNull(x) || !isObject(x)) {
                str += " " + x;
              } else {
                str += " " + inspect(x);
              }
            }
            return str;
          };
          exports2.deprecate = function(fn, msg) {
            if (isUndefined(global2.process)) {
              return function() {
                return exports2.deprecate(fn, msg).apply(this, arguments);
              };
            }
            if (process2.noDeprecation === true) {
              return fn;
            }
            var warned = false;
            function deprecated() {
              if (!warned) {
                if (process2.throwDeprecation) {
                  throw new Error(msg);
                } else if (process2.traceDeprecation) {
                  console.trace(msg);
                } else {
                  formatAppLog("error", "at node_modules/mqtt/dist/mqtt.js:14967", msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }
            return deprecated;
          };
          var debugs = {};
          var debugEnviron;
          exports2.debuglog = function(set) {
            if (isUndefined(debugEnviron))
              debugEnviron = {}.NODE_DEBUG || "";
            set = set.toUpperCase();
            if (!debugs[set]) {
              if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
                var pid = process2.pid;
                debugs[set] = function() {
                  var msg = exports2.format.apply(exports2, arguments);
                  formatAppLog("error", "at node_modules/mqtt/dist/mqtt.js:14989", "%s %d: %s", set, pid, msg);
                };
              } else {
                debugs[set] = function() {
                };
              }
            }
            return debugs[set];
          };
          function inspect(obj, opts) {
            var ctx = {
              seen: [],
              stylize: stylizeNoColor
            };
            if (arguments.length >= 3)
              ctx.depth = arguments[2];
            if (arguments.length >= 4)
              ctx.colors = arguments[3];
            if (isBoolean(opts)) {
              ctx.showHidden = opts;
            } else if (opts) {
              exports2._extend(ctx, opts);
            }
            if (isUndefined(ctx.showHidden))
              ctx.showHidden = false;
            if (isUndefined(ctx.depth))
              ctx.depth = 2;
            if (isUndefined(ctx.colors))
              ctx.colors = false;
            if (isUndefined(ctx.customInspect))
              ctx.customInspect = true;
            if (ctx.colors)
              ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
          }
          exports2.inspect = inspect;
          inspect.colors = {
            "bold": [1, 22],
            "italic": [3, 23],
            "underline": [4, 24],
            "inverse": [7, 27],
            "white": [37, 39],
            "grey": [90, 39],
            "black": [30, 39],
            "blue": [34, 39],
            "cyan": [36, 39],
            "green": [32, 39],
            "magenta": [35, 39],
            "red": [31, 39],
            "yellow": [33, 39]
          };
          inspect.styles = {
            "special": "cyan",
            "number": "yellow",
            "boolean": "yellow",
            "undefined": "grey",
            "null": "bold",
            "string": "green",
            "date": "magenta",
            // "name": intentionally not styling
            "regexp": "red"
          };
          function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            if (style) {
              return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
            } else {
              return str;
            }
          }
          function stylizeNoColor(str, styleType) {
            return str;
          }
          function arrayToHash(array2) {
            var hash = {};
            array2.forEach(function(val, idx) {
              hash[val] = true;
            });
            return hash;
          }
          function formatValue(ctx, value, recurseTimes) {
            if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
            value.inspect !== exports2.inspect && // Also filter out any prototype objects using the circular check.
            !(value.constructor && value.constructor.prototype === value)) {
              var ret = value.inspect(recurseTimes, ctx);
              if (!isString(ret)) {
                ret = formatValue(ctx, ret, recurseTimes);
              }
              return ret;
            }
            var primitive = formatPrimitive(ctx, value);
            if (primitive) {
              return primitive;
            }
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);
            if (ctx.showHidden) {
              keys = Object.getOwnPropertyNames(value);
            }
            if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
              return formatError(value);
            }
            if (keys.length === 0) {
              if (isFunction(value)) {
                var name = value.name ? ": " + value.name : "";
                return ctx.stylize("[Function" + name + "]", "special");
              }
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
              }
              if (isDate(value)) {
                return ctx.stylize(Date.prototype.toString.call(value), "date");
              }
              if (isError(value)) {
                return formatError(value);
              }
            }
            var base = "", array2 = false, braces = ["{", "}"];
            if (isArray(value)) {
              array2 = true;
              braces = ["[", "]"];
            }
            if (isFunction(value)) {
              var n = value.name ? ": " + value.name : "";
              base = " [Function" + n + "]";
            }
            if (isRegExp(value)) {
              base = " " + RegExp.prototype.toString.call(value);
            }
            if (isDate(value)) {
              base = " " + Date.prototype.toUTCString.call(value);
            }
            if (isError(value)) {
              base = " " + formatError(value);
            }
            if (keys.length === 0 && (!array2 || value.length == 0)) {
              return braces[0] + base + braces[1];
            }
            if (recurseTimes < 0) {
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
              } else {
                return ctx.stylize("[Object]", "special");
              }
            }
            ctx.seen.push(value);
            var output;
            if (array2) {
              output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
            } else {
              output = keys.map(function(key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2);
              });
            }
            ctx.seen.pop();
            return reduceToSingleString(output, base, braces);
          }
          function formatPrimitive(ctx, value) {
            if (isUndefined(value))
              return ctx.stylize("undefined", "undefined");
            if (isString(value)) {
              var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
              return ctx.stylize(simple, "string");
            }
            if (isNumber(value))
              return ctx.stylize("" + value, "number");
            if (isBoolean(value))
              return ctx.stylize("" + value, "boolean");
            if (isNull(value))
              return ctx.stylize("null", "null");
          }
          function formatError(value) {
            return "[" + Error.prototype.toString.call(value) + "]";
          }
          function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for (var i = 0, l = value.length; i < l; ++i) {
              if (hasOwnProperty2(value, String(i))) {
                output.push(formatProperty(
                  ctx,
                  value,
                  recurseTimes,
                  visibleKeys,
                  String(i),
                  true
                ));
              } else {
                output.push("");
              }
            }
            keys.forEach(function(key) {
              if (!key.match(/^\d+$/)) {
                output.push(formatProperty(
                  ctx,
                  value,
                  recurseTimes,
                  visibleKeys,
                  key,
                  true
                ));
              }
            });
            return output;
          }
          function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2) {
            var name, str, desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
            if (desc.get) {
              if (desc.set) {
                str = ctx.stylize("[Getter/Setter]", "special");
              } else {
                str = ctx.stylize("[Getter]", "special");
              }
            } else {
              if (desc.set) {
                str = ctx.stylize("[Setter]", "special");
              }
            }
            if (!hasOwnProperty2(visibleKeys, key)) {
              name = "[" + key + "]";
            }
            if (!str) {
              if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) {
                  str = formatValue(ctx, desc.value, null);
                } else {
                  str = formatValue(ctx, desc.value, recurseTimes - 1);
                }
                if (str.indexOf("\n") > -1) {
                  if (array2) {
                    str = str.split("\n").map(function(line) {
                      return "  " + line;
                    }).join("\n").substr(2);
                  } else {
                    str = "\n" + str.split("\n").map(function(line) {
                      return "   " + line;
                    }).join("\n");
                  }
                }
              } else {
                str = ctx.stylize("[Circular]", "special");
              }
            }
            if (isUndefined(name)) {
              if (array2 && key.match(/^\d+$/)) {
                return str;
              }
              name = JSON.stringify("" + key);
              if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                name = name.substr(1, name.length - 2);
                name = ctx.stylize(name, "name");
              } else {
                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                name = ctx.stylize(name, "string");
              }
            }
            return name + ": " + str;
          }
          function reduceToSingleString(output, base, braces) {
            var length = output.reduce(function(prev, cur) {
              if (cur.indexOf("\n") >= 0)
                ;
              return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
            }, 0);
            if (length > 60) {
              return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
            }
            return braces[0] + base + " " + output.join(", ") + " " + braces[1];
          }
          function isArray(ar) {
            return Array.isArray(ar);
          }
          exports2.isArray = isArray;
          function isBoolean(arg) {
            return typeof arg === "boolean";
          }
          exports2.isBoolean = isBoolean;
          function isNull(arg) {
            return arg === null;
          }
          exports2.isNull = isNull;
          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports2.isNullOrUndefined = isNullOrUndefined;
          function isNumber(arg) {
            return typeof arg === "number";
          }
          exports2.isNumber = isNumber;
          function isString(arg) {
            return typeof arg === "string";
          }
          exports2.isString = isString;
          function isSymbol(arg) {
            return typeof arg === "symbol";
          }
          exports2.isSymbol = isSymbol;
          function isUndefined(arg) {
            return arg === void 0;
          }
          exports2.isUndefined = isUndefined;
          function isRegExp(re) {
            return isObject(re) && objectToString(re) === "[object RegExp]";
          }
          exports2.isRegExp = isRegExp;
          function isObject(arg) {
            return typeof arg === "object" && arg !== null;
          }
          exports2.isObject = isObject;
          function isDate(d) {
            return isObject(d) && objectToString(d) === "[object Date]";
          }
          exports2.isDate = isDate;
          function isError(e) {
            return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
          }
          exports2.isError = isError;
          function isFunction(arg) {
            return typeof arg === "function";
          }
          exports2.isFunction = isFunction;
          function isPrimitive(arg) {
            return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
            typeof arg === "undefined";
          }
          exports2.isPrimitive = isPrimitive;
          exports2.isBuffer = require("./support/isBuffer");
          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }
          function pad(n) {
            return n < 10 ? "0" + n.toString(10) : n.toString(10);
          }
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          function timestamp() {
            var d = /* @__PURE__ */ new Date();
            var time = [
              pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())
            ].join(":");
            return [d.getDate(), months[d.getMonth()], time].join(" ");
          }
          exports2.log = function() {
            formatAppLog("log", "at node_modules/mqtt/dist/mqtt.js:15435", "%s - %s", timestamp(), exports2.format.apply(exports2, arguments));
          };
          exports2.inherits = require("inherits");
          exports2._extend = function(origin, add) {
            if (!add || !isObject(add))
              return origin;
            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) {
              origin[keys[i]] = add[keys[i]];
            }
            return origin;
          };
          function hasOwnProperty2(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          }
        }).call(this, require("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./support/isBuffer": 135, "_process": 100, "inherits": 88 }], 137: [function(require, module2, exports2) {
        (function(process2, global2) {
          var Transform = require("readable-stream").Transform;
          var duplexify = require("duplexify");
          var WS = require("ws");
          var Buffer = require("safe-buffer").Buffer;
          module2.exports = WebSocketStream;
          function buildProxy(options2, socketWrite, socketEnd) {
            var proxy = new Transform({
              objectMode: options2.objectMode
            });
            proxy._write = socketWrite;
            proxy._flush = socketEnd;
            return proxy;
          }
          function WebSocketStream(target, protocols, options2) {
            var stream, socket;
            var isBrowser = process2.title === "browser";
            var isNative = !!global2.WebSocket;
            var socketWrite = isBrowser ? socketWriteBrowser : socketWriteNode;
            if (protocols && !Array.isArray(protocols) && "object" === typeof protocols) {
              options2 = protocols;
              protocols = null;
              if (typeof options2.protocol === "string" || Array.isArray(options2.protocol)) {
                protocols = options2.protocol;
              }
            }
            if (!options2)
              options2 = {};
            if (options2.objectMode === void 0) {
              options2.objectMode = !(options2.binary === true || options2.binary === void 0);
            }
            var proxy = buildProxy(options2, socketWrite, socketEnd);
            if (!options2.objectMode) {
              proxy._writev = writev;
            }
            var bufferSize = options2.browserBufferSize || 1024 * 512;
            var bufferTimeout = options2.browserBufferTimeout || 1e3;
            if (typeof target === "object") {
              socket = target;
            } else {
              if (isNative && isBrowser) {
                socket = new WS(target, protocols);
              } else {
                socket = new WS(target, protocols, options2);
              }
              socket.binaryType = "arraybuffer";
            }
            if (socket.readyState === socket.OPEN) {
              stream = proxy;
            } else {
              stream = duplexify.obj();
              socket.onopen = onopen;
            }
            stream.socket = socket;
            socket.onclose = onclose;
            socket.onerror = onerror;
            socket.onmessage = onmessage;
            proxy.on("close", destroy);
            var coerceToBuffer = !options2.objectMode;
            function socketWriteNode(chunk, enc, next) {
              if (socket.readyState !== socket.OPEN) {
                next();
                return;
              }
              if (coerceToBuffer && typeof chunk === "string") {
                chunk = Buffer.from(chunk, "utf8");
              }
              socket.send(chunk, next);
            }
            function socketWriteBrowser(chunk, enc, next) {
              if (socket.bufferedAmount > bufferSize) {
                setTimeout(socketWriteBrowser, bufferTimeout, chunk, enc, next);
                return;
              }
              if (coerceToBuffer && typeof chunk === "string") {
                chunk = Buffer.from(chunk, "utf8");
              }
              try {
                socket.send(chunk);
              } catch (err) {
                return next(err);
              }
              next();
            }
            function socketEnd(done) {
              socket.close();
              done();
            }
            function onopen() {
              stream.setReadable(proxy);
              stream.setWritable(proxy);
              stream.emit("connect");
            }
            function onclose() {
              stream.end();
              stream.destroy();
            }
            function onerror(err) {
              stream.destroy(err);
            }
            function onmessage(event) {
              var data = event.data;
              if (data instanceof ArrayBuffer)
                data = Buffer.from(data);
              else
                data = Buffer.from(data, "utf8");
              proxy.push(data);
            }
            function destroy() {
              socket.close();
            }
            function writev(chunks, cb) {
              var buffers = new Array(chunks.length);
              for (var i = 0; i < chunks.length; i++) {
                if (typeof chunks[i].chunk === "string") {
                  buffers[i] = Buffer.from(chunks[i], "utf8");
                } else {
                  buffers[i] = chunks[i].chunk;
                }
              }
              this._write(Buffer.concat(buffers), "binary", cb);
            }
            return stream;
          }
        }).call(this, require("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "_process": 100, "duplexify": 19, "readable-stream": 116, "safe-buffer": 118, "ws": 138 }], 138: [function(require, module2, exports2) {
        var ws = null;
        if (typeof WebSocket !== "undefined") {
          ws = WebSocket;
        } else if (typeof MozWebSocket !== "undefined") {
          ws = MozWebSocket;
        } else if (typeof window !== "undefined") {
          ws = window.WebSocket || window.MozWebSocket;
        }
        module2.exports = ws;
      }, {}], 139: [function(require, module2, exports2) {
        module2.exports = wrappy;
        function wrappy(fn, cb) {
          if (fn && cb)
            return wrappy(fn)(cb);
          if (typeof fn !== "function")
            throw new TypeError("need wrapper function");
          Object.keys(fn).forEach(function(k) {
            wrapper[k] = fn[k];
          });
          return wrapper;
          function wrapper() {
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i];
            }
            var ret = fn.apply(this, args);
            var cb2 = args[args.length - 1];
            if (typeof ret === "function" && ret !== cb2) {
              Object.keys(cb2).forEach(function(k) {
                ret[k] = cb2[k];
              });
            }
            return ret;
          }
        }
      }, {}], 140: [function(require, module2, exports2) {
        module2.exports = extend;
        var hasOwnProperty2 = Object.prototype.hasOwnProperty;
        function extend() {
          var target = {};
          for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (hasOwnProperty2.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        }
      }, {}] }, {}, [9])(9);
    });
  })(mqtt$1);
  const mqtt = mqttExports;
  const username = "admin";
  const password = "zhao@1226";
  let client = null;
  const options = {
    // Clean session
    clean: false,
    connectTimeout: 4e3,
    // 认证信息
    clientId: getUuid(),
    username,
    password
  };
  function init() {
    client = mqtt.connect(url, options);
    client.on("connect", function() {
      formatAppLog("log", "at mqtt/mqtt.js:24", "连接成功");
    });
  }
  function reception() {
    client.on("message", function(topic, message) {
      let value = message.toString().split(":");
      if (value[0] == "temperature") {
        uni.setStorage({
          key: "temperature",
          data: value[1]
        });
      }
      if (value[0] == "humidity") {
        uni.setStorage({
          key: "humidity",
          data: value[1]
        });
      }
      if (value[0] == "lightswitch") {
        uni.setStorage({
          key: "lightswitch",
          data: value[1]
        });
      }
      if (value[0] == "lightbrightness") {
        uni.setStorage({
          key: "lightbrightness",
          data: value[1]
        });
      }
      if (value[0] == "lightbrightness") {
        uni.setStorage({
          key: "lightbrightness",
          data: value[1]
        });
      }
      if (value[0] == "color") {
        uni.setStorage({
          key: "color",
          data: value[1]
        });
      }
      if (value[0] == "buzzer") {
        uni.setStorage({
          key: "buzzer",
          data: value[1]
        });
      }
      if (value[0] == "maxtemperature") {
        uni.setStorage({
          key: "maxtemperature",
          data: value[1]
        });
      }
      if (value[0] == "maxhumidity") {
        uni.setStorage({
          key: "maxhumidity",
          data: value[1]
        });
      }
      formatAppLog("log", "at mqtt/mqtt.js:95", message.toString());
    });
  }
  function publish(topic, message) {
    client.subscribe(topic, function(err) {
      if (!err) {
        client.publish(topic, message);
      }
    });
  }
  function getUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  const apiUrl = "http://192.168.10.10:8080";
  const _sfc_main$h = {
    data() {
      return {
        showPassword: true,
        passwordIcon: "lock",
        form: {
          userInfo: {
            username: "",
            password: ""
          }
        },
        rules: {
          "userInfo.username": {
            type: "string",
            required: true,
            message: "请填写用户名",
            trigger: ["blur", "change"]
          },
          "userInfo.password": {
            type: "string",
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"]
          }
        },
        radio: "",
        switchVal: false
      };
    },
    methods: {
      submit() {
        let that = this;
        this.$refs.uvFormRef.validate().then((res) => {
          uni.request({
            header: {
              "Content-Type": "application/json"
            },
            url: apiUrl + "/user/login",
            method: "POST",
            data: {
              "username": this.form.userInfo.username,
              "password": this.form.userInfo.password
            },
            dataType: "json",
            success: (res2) => {
              if (res2.data.code == "2000") {
                uni.showToast({
                  icon: "success",
                  title: "登录成功"
                });
                uni.setStorage({
                  key: "username",
                  data: that.form.userInfo.username
                });
                uni.setStorage({
                  key: "userid",
                  data: res2.data.result[0].id
                });
                init();
                publish("/stm32", "订阅成功");
                reception();
                setTimeout(function() {
                  uni.reLaunch({
                    url: "/pages/tabbar/home/home"
                  });
                }, 1e3);
              } else {
                uni.showToast({
                  icon: "success",
                  title: res2.data.message
                });
              }
            }
          });
        });
      },
      // 重置
      reset() {
        this.$refs.uvFormRef.resetFields();
        this.$refs.uvFormRef.clearValidate();
      },
      register() {
        uni.navigateTo({
          url: "/pages/user/register/register"
        });
        this.$refs.uvFormRef.clearValidate();
      },
      hideKeyboard() {
        uni.hideKeyboard();
      },
      showPasswordMethod() {
        if (this.showPassword == false) {
          this.passwordIcon = "lock";
          this.showPassword = true;
        } else {
          this.passwordIcon = "lock-open";
          this.showPassword = false;
        }
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$3);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$1);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_3$1);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "head" }, [
          vue.createElementVNode("view", { class: "h1" }, "智能家居管理系统"),
          vue.createElementVNode("view", { class: "h2" }, "登录")
        ]),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createVNode(_component_uv_form, {
            labelPosition: "left",
            labelWidth: "50px",
            model: $data.form,
            rules: $data.rules,
            ref: "uvFormRef",
            class: "form"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "用户名",
                  prop: "userInfo.username",
                  borderBottom: "",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.form.userInfo.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.userInfo.username = $event),
                      placeholder: "请输入用户名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "密码",
                  prop: "userInfo.password",
                  borderBottom: "",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.form.userInfo.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.userInfo.password = $event),
                      password: $data.showPassword,
                      placeholder: "请输入密码",
                      suffixIconStyle: "color: #909399"
                    }, {
                      suffix: vue.withCtx(() => [
                        vue.createVNode(_component_uv_icon, {
                          name: $data.passwordIcon,
                          color: "#black",
                          size: "20",
                          onClick: $options.showPasswordMethod
                        }, null, 8, ["name", "onClick"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["modelValue", "password"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(_component_uv_button, {
                type: "primary",
                text: "提交",
                customStyle: "margin-top: 10px",
                onClick: _cache[2] || (_cache[2] = ($event) => $options.submit())
              }),
              vue.createVNode(_component_uv_button, {
                type: "primary",
                text: "注册",
                customStyle: "margin-top: 10px",
                onClick: _cache[3] || (_cache[3] = ($event) => $options.register())
              }),
              vue.createVNode(_component_uv_button, {
                type: "error",
                text: "重置",
                customStyle: "margin-top: 10px",
                onClick: _cache[4] || (_cache[4] = ($event) => $options.reset())
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesUserLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-58a866f6"], ["__file", "D:/imformation/uni-app/stm32/pages/user/login/login.vue"]]);
  const _sfc_main$g = {
    data() {
      return {};
    },
    onShow() {
      uni.getStorage({
        key: "username",
        fail: function() {
          formatAppLog("log", "at pages/tabbar/home/home.vue:20", "111");
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
      uni.getStorage({
        key: "userid",
        fail: function() {
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, " 首页 ");
  }
  const PagesTabbarHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "D:/imformation/uni-app/stm32/pages/tabbar/home/home.vue"]]);
  const props$8 = {
    props: {
      // 占父容器宽度的多少等分，总分为12份
      span: {
        type: [String, Number],
        default: 12
      },
      // 指定栅格左侧的间隔数(总12栏)
      offset: {
        type: [String, Number],
        default: 0
      },
      // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
      justify: {
        type: String,
        default: "start"
      },
      // 垂直对齐方式，可选值为top、center、bottom、stretch
      align: {
        type: String,
        default: "stretch"
      },
      // 文字对齐方式
      textAlign: {
        type: String,
        default: "left"
      },
      ...(_t = (_s = uni.$uv) == null ? void 0 : _s.props) == null ? void 0 : _t.col
    }
  };
  const _sfc_main$f = {
    name: "uv-col",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$8],
    data() {
      return {
        width: 0,
        parentData: {
          gutter: 0
        },
        gridNum: 12
      };
    },
    computed: {
      uJustify() {
        if (this.justify == "end" || this.justify == "start")
          return "flex-" + this.justify;
        else if (this.justify == "around" || this.justify == "between")
          return "space-" + this.justify;
        else
          return this.justify;
      },
      uAlignItem() {
        if (this.align == "top")
          return "flex-start";
        if (this.align == "bottom")
          return "flex-end";
        else
          return this.align;
      },
      colStyle() {
        const style = {
          // 这里写成"padding: 0 10px"的形式是因为nvue的需要
          paddingLeft: this.$uv.addUnit(this.$uv.getPx(this.parentData.gutter) / 2),
          paddingRight: this.$uv.addUnit(this.$uv.getPx(this.parentData.gutter) / 2),
          alignItems: this.uAlignItem,
          justifyContent: this.uJustify,
          textAlign: this.textAlign,
          // 在非nvue上，使用百分比形式
          flex: `0 0 ${100 / this.gridNum * this.span}%`,
          marginLeft: 100 / 12 * this.offset + "%"
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        this.updateParentData();
        this.width = await this.parent.getComponentWidth();
      },
      updateParentData() {
        this.getParentData("uv-row");
      },
      clickHandler(e) {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-col", [
          "uv-col-" + _ctx.span
        ]]),
        ref: "uv-col",
        style: vue.normalizeStyle([$options.colStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-d2bffd23"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-row/components/uv-col/uv-col.vue"]]);
  const props$7 = {
    props: {
      // 是否为加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 是否为禁用装填
      disabled: {
        type: Boolean,
        default: false
      },
      // 开关尺寸，单位px
      size: {
        type: [String, Number],
        default: 25
      },
      // 打开时的背景颜色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 关闭时的背景颜色
      inactiveColor: {
        type: String,
        default: "#fff"
      },
      // 通过v-model双向绑定的值
      modelValue: {
        type: [Boolean, String, Number],
        default: false
      },
      // switch打开时的值
      activeValue: {
        type: [String, Number, Boolean],
        default: true
      },
      // switch关闭时的值
      inactiveValue: {
        type: [String, Number, Boolean],
        default: false
      },
      // 是否开启异步变更，开启后需要手动控制输入值
      asyncChange: {
        type: Boolean,
        default: false
      },
      // 圆点与外边框的距离
      space: {
        type: [String, Number],
        default: 0
      },
      ...(_v = (_u = uni.$uv) == null ? void 0 : _u.props) == null ? void 0 : _v.switch
    }
  };
  const _sfc_main$e = {
    name: "uv-switch",
    mixins: [mpMixin, mixin, props$7],
    watch: {
      modelValue: {
        immediate: true,
        handler(n) {
          if (n !== this.inactiveValue && n !== this.activeValue) {
            this.$uv.error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
          }
        }
      }
    },
    data() {
      return {
        bgColor: "#ffffff"
      };
    },
    computed: {
      switchValue() {
        return this.modelValue;
      },
      isActive() {
        return this.modelValue === this.activeValue;
      },
      switchStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 + 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) + 2);
        if (this.customInactiveColor) {
          style.borderColor = "rgba(0, 0, 0, 0)";
        }
        style.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor;
        return style;
      },
      nodeStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        const translateX = this.isActive ? this.$uv.addUnit(this.space) : this.$uv.addUnit(this.$uv.getPx(this.size));
        style.transform = `translateX(-${translateX})`;
        return style;
      },
      bgStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 - this.$uv.getPx(this.size) / 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size));
        style.backgroundColor = this.inactiveColor;
        style.transform = `scale(${this.isActive ? 0 : 1})`;
        return style;
      },
      customInactiveColor() {
        return this.inactiveColor !== "#fff" && this.inactiveColor !== "#ffffff";
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
          if (!this.asyncChange) {
            this.$emit("update:modelValue", oldValue);
          }
          this.$nextTick(() => {
            this.$emit("change", oldValue);
          });
        }
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-switch", [_ctx.disabled && "uv-switch--disabled"]]),
        style: vue.normalizeStyle([$options.switchStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "uv-switch__bg",
            style: vue.normalizeStyle([$options.bgStyle])
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-switch__node", [$options.switchValue && "uv-switch__node--on"]]),
            style: vue.normalizeStyle([$options.nodeStyle]),
            ref: "uv-switch__node"
          },
          [
            vue.createVNode(_component_uv_loading_icon, {
              show: _ctx.loading,
              mode: "circle",
              timingFunction: "linear",
              color: $options.switchValue ? _ctx.activeColor : "#AAABAD",
              size: _ctx.size * 0.6
            }, null, 8, ["show", "color", "size"])
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-c713e4c9"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-switch/components/uv-switch/uv-switch.vue"]]);
  const props$6 = {
    props: {
      // 给col添加间距，左右边距各占一半
      gutter: {
        type: [String, Number],
        default: 0
      },
      // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
      justify: {
        type: String,
        default: "start"
      },
      // 垂直对齐方式，可选值为top、center、bottom
      align: {
        type: String,
        default: "center"
      },
      ...(_x = (_w = uni.$uv) == null ? void 0 : _w.props) == null ? void 0 : _x.row
    }
  };
  const _sfc_main$d = {
    name: "uv-row",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$6],
    data() {
      return {};
    },
    computed: {
      uJustify() {
        if (this.justify == "end" || this.justify == "start")
          return "flex-" + this.justify;
        else if (this.justify == "around" || this.justify == "between")
          return "space-" + this.justify;
        else
          return this.justify;
      },
      uAlignItem() {
        if (this.align == "top")
          return "flex-start";
        if (this.align == "bottom")
          return "flex-end";
        else
          return this.align;
      },
      rowStyle() {
        const style = {
          alignItems: this.uAlignItem,
          justifyContent: this.uJustify
        };
        if (this.gutter) {
          style.marginLeft = this.$uv.addUnit(-Number(this.gutter) / 2);
          style.marginRight = this.$uv.addUnit(-Number(this.gutter) / 2);
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click");
      },
      async getComponentWidth() {
        await this.$uv.sleep();
        return new Promise((resolve) => {
          this.$uvGetRect(".uv-row").then((res) => {
            resolve(res.width);
          });
        });
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-row",
        ref: "uv-row",
        style: vue.normalizeStyle([$options.rowStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-692ff899"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-row/components/uv-row/uv-row.vue"]]);
  const props$5 = {
    props: {
      // 最小可选值
      min: {
        type: [Number, String],
        default: 0
      },
      // 最大可选值
      max: {
        type: [Number, String],
        default: 100
      },
      // 步长，取值必须大于 0，并且可被(max - min)整除
      step: {
        type: [Number, String],
        default: 1
      },
      // 当前取值
      modelValue: {
        type: [Number, String],
        default: 0
      },
      // 滑块右侧已选择部分的背景色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 滑块左侧未选择部分的背景色
      inactiveColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 滑块的大小，取值范围为 12 - 28
      blockSize: {
        type: [Number, String],
        default: 18
      },
      // 滑块的颜色
      blockColor: {
        type: String,
        default: "#ffffff"
      },
      // 禁用状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示当前的选择值
      showValue: {
        type: Boolean,
        default: false
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.slider
    }
  };
  const _sfc_main$c = {
    name: "uv-slider",
    mixins: [mpMixin, mixin, props$5],
    computed: {
      sliderValue() {
        return this.modelValue;
      }
    },
    methods: {
      // 拖动过程中触发
      changingHandler(e) {
        const {
          value
        } = e.detail;
        this.$emit("update:modelValue", value);
        this.$emit("changing", value);
      },
      // 滑动结束时触发
      changeHandler(e) {
        const {
          value
        } = e.detail;
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-slider",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode("slider", {
          min: _ctx.min,
          max: _ctx.max,
          step: _ctx.step,
          value: $options.sliderValue,
          activeColor: _ctx.activeColor,
          inactiveColor: _ctx.inactiveColor,
          blockSize: _ctx.$uv.getPx(_ctx.blockSize),
          blockColor: _ctx.blockColor,
          showValue: _ctx.showValue,
          disabled: _ctx.disabled,
          onChanging: _cache[0] || (_cache[0] = (...args) => $options.changingHandler && $options.changingHandler(...args)),
          onChange: _cache[1] || (_cache[1] = (...args) => $options.changeHandler && $options.changeHandler(...args))
        }, null, 40, ["min", "max", "step", "value", "activeColor", "inactiveColor", "blockSize", "blockColor", "showValue", "disabled"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-slider/components/uv-slider/uv-slider.vue"]]);
  const props$4 = {
    props: {
      // 是否展示工具条
      show: {
        type: Boolean,
        default: true
      },
      // 是否显示下边框
      showBorder: {
        type: Boolean,
        default: false
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 标题文字
      title: {
        type: String,
        default: ""
      }
    }
  };
  const _sfc_main$b = {
    name: "uv-toolbar",
    emits: ["confirm", "cancel"],
    mixins: [mpMixin, mixin, props$4],
    methods: {
      // 点击取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击确定按钮
      confirm() {
        this.$emit("confirm");
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-toolbar", { "uv-border-bottom": _ctx.showBorder }]),
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        vue.createElementVNode("view", {
          class: "uv-toolbar__cancel__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__cancel",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args)),
              style: vue.normalizeStyle({
                color: _ctx.cancelColor
              })
            },
            vue.toDisplayString(_ctx.cancelText),
            5
            /* TEXT, STYLE */
          )
        ]),
        _ctx.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "uv-toolbar__title uv-line-1"
          },
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "uv-toolbar__confirm__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__confirm",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
              style: vue.normalizeStyle({
                color: _ctx.confirmColor
              })
            },
            vue.toDisplayString(_ctx.confirmText),
            5
            /* TEXT, STYLE */
          )
        ])
      ],
      34
      /* CLASS, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-4ac066bd"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-picker/components/uv-toolbar/uv-toolbar.vue"]]);
  const props$3 = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: 10070
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: 0.5
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.overlay
    }
  };
  const _sfc_main$a = {
    name: "uv-overlay",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$3],
    watch: {
      show(newVal) {
      }
    },
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler() {
        this.$emit("click");
      },
      clear() {
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$2);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      show: _ctx.show,
      mode: "fade",
      "custom-class": "uv-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler,
      onTouchmove: vue.withModifiers($options.clear, ["stop", "prevent"])
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick", "onTouchmove"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-7303e1aa"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-overlay/components/uv-overlay/uv-overlay.vue"]]);
  const props$2 = {
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      }
    }
  };
  const _sfc_main$9 = {
    name: "uv-status-bar",
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight, "px");
        if (this.bgColor) {
          if (this.bgColor.indexOf("gradient") > -1) {
            style.backgroundImage = this.bgColor;
          } else {
            style.background = this.bgColor;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "uv-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-f5bd6f5a"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.vue"]]);
  const _sfc_main$8 = {
    name: "uv-safe-bottom",
    mixins: [mpMixin, mixin],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-safe-bottom", [!$data.isNvue && "uv-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-560f16b2"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-safe-bottom/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
  const _sfc_main$7 = {
    name: "uv-popup",
    components: {},
    mixins: [mpMixin, mixin],
    emits: ["change", "maskClick"],
    props: {
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      mode: {
        type: String,
        default: "center"
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: 10075
      },
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: true
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: 0.4
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: ""
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: false
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: true
      },
      round: {
        type: [Number, String],
        default: 0
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type2) {
          if (!this.config[type2])
            return;
          this[this.config[type2]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.mode]](true);
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        transitionStyle: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupClass: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.bgColor === "" || this.bgColor === "none" || this.$uv.getPx(this.round) > 0) {
          return "transparent";
        }
        return this.bgColor;
      },
      contentStyle() {
        const style = {};
        if (this.bgColor) {
          style.backgroundColor = this.bg;
        }
        if (this.round) {
          const value = this.$uv.addUnit(this.round);
          style.backgroundColor = this.bgColor;
          if (this.mode === "top") {
            style.borderBottomLeftRadius = value;
            style.borderBottomRightRadius = value;
          } else if (this.mode === "bottom") {
            style.borderTopLeftRadius = value;
            style.borderTopRightRadius = value;
          } else if (this.mode === "center") {
            style.borderRadius = value;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      this.messageChild = null;
      this.clearPropagation = false;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.mode;
        }
        if (!this.config[direction]) {
          return this.$uv.error(`缺少类型：${direction}`);
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type2) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.mode
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.closeOnClickOverlay)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type2) {
        this.popupClass = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.mode === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type2) {
        this.popupClass = "bottom";
        this.ani = ["slide-bottom"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type2) {
        this.popupClass = "center";
        this.ani = this.zoom ? ["zoom-in", "fade"] : ["fade"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type2) {
        this.popupClass = "left";
        this.ani = ["slide-left"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type2) {
        this.popupClass = "right";
        this.ani = ["slide-right"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_overlay = resolveEasycom(vue.resolveDynamicComponent("uv-overlay"), __easycom_0);
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_1);
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_2);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$2);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-popup", [$data.popupClass, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            vue.createCommentVNode(" 遮罩层 "),
            $data.maskShow && $props.overlay ? (vue.openBlock(), vue.createBlock(_component_uv_overlay, {
              key: "1",
              show: $data.showTrans,
              duration: $props.duration,
              "custom-style": $props.overlayStyle,
              opacity: $props.overlayOpacity,
              zIndex: $props.zIndex,
              onClick: $options.onTap
            }, null, 8, ["show", "duration", "custom-style", "opacity", "zIndex", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uv_transition, {
              key: "2",
              mode: $data.ani,
              name: "content",
              "custom-style": $data.transitionStyle,
              duration: $props.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uv-popup__content", [$data.popupClass]]),
                    style: vue.normalizeStyle([$options.contentStyle]),
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    $props.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                    $props.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_uv_safe_bottom, { key: 1 })) : vue.createCommentVNode("v-if", true),
                    $props.closeable ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 2,
                        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                        class: vue.normalizeClass(["uv-popup__content__close", ["uv-popup__content__close--" + $props.closeIconPos]]),
                        "hover-class": "uv-popup__content__close--hover",
                        "hover-stay-time": "150"
                      },
                      [
                        vue.createVNode(_component_uv_icon, {
                          name: "close",
                          color: "#909399",
                          size: "18",
                          bold: ""
                        })
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode", "custom-style", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_5$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-01a3ad6e"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-popup/components/uv-popup/uv-popup.vue"]]);
  function hsbToRgb(hsb) {
    let rgb = {};
    let h = hsb.h;
    let s = hsb.s * 255 / 100;
    let v = hsb.b * 255 / 100;
    if (s == 0) {
      rgb.r = rgb.g = rgb.b = v;
    } else {
      let t1 = v;
      let t2 = (255 - s) * v / 255;
      let t3 = (t1 - t2) * (h % 60) / 60;
      if (h == 360)
        h = 0;
      if (h < 60) {
        rgb.r = t1;
        rgb.b = t2;
        rgb.g = t2 + t3;
      } else if (h < 120) {
        rgb.g = t1;
        rgb.b = t2;
        rgb.r = t1 - t3;
      } else if (h < 180) {
        rgb.g = t1;
        rgb.r = t2;
        rgb.b = t2 + t3;
      } else if (h < 240) {
        rgb.b = t1;
        rgb.r = t2;
        rgb.g = t1 - t3;
      } else if (h < 300) {
        rgb.b = t1;
        rgb.g = t2;
        rgb.r = t2 + t3;
      } else if (h < 360) {
        rgb.r = t1;
        rgb.g = t2;
        rgb.b = t1 - t3;
      } else {
        rgb.r = 0;
        rgb.g = 0;
        rgb.b = 0;
      }
    }
    return {
      r: Math.round(rgb.r),
      g: Math.round(rgb.g),
      b: Math.round(rgb.b)
    };
  }
  function rgbToHsb(rgb) {
    let hsb = {
      h: 0,
      s: 0,
      b: 0
    };
    let min = Math.min(rgb.r, rgb.g, rgb.b);
    let max = Math.max(rgb.r, rgb.g, rgb.b);
    let delta = max - min;
    hsb.b = max;
    hsb.s = max != 0 ? 255 * delta / max : 0;
    if (hsb.s != 0) {
      if (rgb.r == max)
        hsb.h = (rgb.g - rgb.b) / delta;
      else if (rgb.g == max)
        hsb.h = 2 + (rgb.b - rgb.r) / delta;
      else
        hsb.h = 4 + (rgb.r - rgb.g) / delta;
    } else
      hsb.h = -1;
    hsb.h *= 60;
    if (hsb.h < 0)
      hsb.h = 0;
    hsb.s *= 100 / 255;
    hsb.b *= 100 / 255;
    return hsb;
  }
  function rgbToHex(rgb) {
    let hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
    hex.map(function(str, i) {
      if (str.length == 1) {
        hex[i] = "0" + str;
      }
    });
    return hex.join("");
  }
  const colorList = [{
    r: 60,
    g: 156,
    b: 255,
    a: 1
  }, {
    r: 245,
    g: 108,
    b: 108,
    a: 1
  }, {
    r: 249,
    g: 174,
    b: 61,
    a: 1
  }, {
    r: 90,
    g: 199,
    b: 37,
    a: 1
  }, {
    r: 144,
    g: 147,
    b: 153,
    a: 1
  }, {
    r: 48,
    g: 49,
    b: 51,
    a: 1
  }, {
    r: 233,
    g: 30,
    b: 99,
    a: 1
  }, {
    r: 156,
    g: 39,
    b: 176,
    a: 1
  }, {
    r: 103,
    g: 58,
    b: 183,
    a: 1
  }, {
    r: 63,
    g: 81,
    b: 181,
    a: 1
  }, {
    r: 0,
    g: 188,
    b: 212,
    a: 1
  }, {
    r: 0,
    g: 150,
    b: 136,
    a: 1
  }, {
    r: 139,
    g: 195,
    b: 74,
    a: 1
  }, {
    r: 205,
    g: 220,
    b: 57,
    a: 1
  }, {
    r: 255,
    g: 235,
    b: 59,
    a: 1
  }, {
    r: 255,
    g: 193,
    b: 7,
    a: 1
  }, {
    r: 255,
    g: 152,
    b: 0,
    a: 1
  }, {
    r: 255,
    g: 87,
    b: 34,
    a: 1
  }, {
    r: 121,
    g: 85,
    b: 72,
    a: 1
  }, {
    r: 158,
    g: 158,
    b: 158,
    a: 1
  }, {
    r: 0,
    g: 0,
    b: 0,
    a: 0.5
  }, {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  }];
  const props$1 = {
    props: {
      // 颜色选择器初始颜色
      color: {
        type: Object,
        default: () => {
          return { r: 0, g: 0, b: 0, a: 0 };
        }
      },
      // 预制颜色
      prefabColor: {
        type: Array,
        default: () => []
      },
      // 是否允许点击遮罩关闭
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确定"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      }
    }
  };
  const _sfc_main$6 = {
    name: "uv-pick-color",
    emits: ["confirm", "cancel", "close", "change"],
    mixins: [mpMixin, mixin, props$1],
    computed: {
      pointerStyle() {
        const style = {};
        style.top = this.$uv.addUnit(this.site[0].top - 8);
        style.left = this.$uv.addUnit(this.site[0].left - 8);
        return style;
      }
    },
    data() {
      return {
        showToolbar: false,
        // rgba 颜色
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        },
        // hsb 颜色
        hsb: {
          h: 0,
          s: 0,
          b: 0
        },
        site: [{
          top: 0,
          left: 0
        }, {
          left: 0
        }, {
          left: 0
        }],
        index: 0,
        bgcolor: {
          r: 255,
          g: 0,
          b: 0,
          a: 1
        },
        hex: "#000000",
        mode: true,
        colorList
      };
    },
    watch: {
      prefabColor(newVal) {
        this.colorList = newVal;
      }
    },
    created() {
      this.rgba = this.color;
      if (this.prefabColor.length)
        this.colorList = this.prefabColor;
    },
    methods: {
      open() {
        this.$refs.pickerColorPopup.open();
        this.showToolbar = true;
        this.$nextTick(async () => {
          await this.$uv.sleep(350);
          this.getSelectorQuery();
        });
      },
      close() {
        this.$refs.pickerColorPopup.close();
      },
      popupChange(e) {
        if (!e.show)
          this.$emit("close");
      },
      // 点击工具栏的取消按钮
      cancelHandler() {
        this.$emit("cancel");
        this.close();
      },
      // 点击工具栏的确定按钮
      confirmHandler() {
        this.$emit("confirm", {
          rgba: this.rgba,
          hex: this.hex
        });
        this.close();
      },
      // 初始化
      init() {
        this.hsb = rgbToHsb(this.rgba);
        this.setValue(this.rgba);
      },
      async getSelectorQuery() {
        const data = await this.$uvGetRect(".drag-box", true);
        this.position = data;
        this.setColorBySelect(this.rgba);
      },
      // 选择模式
      select() {
        this.mode = !this.mode;
      },
      touchstart(e, index2) {
        const { pageX, pageY } = e.touches[0];
        this.pageX = pageX;
        this.pageY = pageY;
        this.setPosition(pageX, pageY, index2);
      },
      touchmove(e, index2) {
        const { pageX, pageY } = e.touches[0];
        this.moveX = pageX;
        this.moveY = pageY;
        this.setPosition(pageX, pageY, index2);
      },
      touchend(e, index2) {
      },
      /**
       * 设置位置
       */
      setPosition(x, y, index2) {
        this.index = index2;
        const { top, left, width, height } = this.position[index2];
        this.site[index2].left = Math.max(0, Math.min(parseInt(x - left), width));
        if (index2 === 0) {
          this.site[index2].top = Math.max(0, Math.min(parseInt(y - top), height));
          this.hsb.s = parseInt(100 * this.site[index2].left / width);
          this.hsb.b = parseInt(100 - 100 * this.site[index2].top / height);
          this.setColor();
          this.setValue(this.rgba);
        } else {
          this.setControl(index2, this.site[index2].left);
        }
      },
      /**
       * 设置 rgb 颜色
       */
      setColor() {
        const rgb = hsbToRgb(this.hsb);
        this.rgba.r = rgb.r;
        this.rgba.g = rgb.g;
        this.rgba.b = rgb.b;
      },
      /**
       * 设置二进制颜色
       * @param {Object} rgb
       */
      setValue(rgb) {
        this.hex = `#${rgbToHex(rgb)}`;
      },
      setControl(index2, x) {
        const {
          top,
          left,
          width,
          height
        } = this.position[index2];
        if (index2 === 1) {
          this.hsb.h = parseInt(360 * x / width);
          this.bgcolor = hsbToRgb({
            h: this.hsb.h,
            s: 100,
            b: 100
          });
          this.setColor();
        } else {
          this.rgba.a = +(x / width).toFixed(1);
        }
        this.setValue(this.rgba);
      },
      setColorBySelect(getrgb) {
        const { r, g, b, a } = getrgb;
        let rgb = {};
        rgb = {
          r: r ? parseInt(r) : 0,
          g: g ? parseInt(g) : 0,
          b: b ? parseInt(b) : 0,
          a: a ? a : 0
        };
        this.rgba = rgb;
        this.hsb = rgbToHsb(rgb);
        this.changeViewByHsb();
      },
      changeViewByHsb() {
        const [a, b, c] = this.position;
        this.site[0].left = parseInt(this.hsb.s * a.width / 100);
        this.site[0].top = parseInt((100 - this.hsb.b) * a.height / 100);
        this.setColor(this.hsb.h);
        this.setValue(this.rgba);
        this.bgcolor = hsbToRgb({
          h: this.hsb.h,
          s: 100,
          b: 100
        });
        this.site[1].left = this.hsb.h / 360 * b.width;
        this.site[2].left = this.rgba.a * c.width;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_toolbar = resolveEasycom(vue.resolveDynamicComponent("uv-toolbar"), __easycom_0$1);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_5$1);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "pickerColorPopup",
      mode: "bottom",
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-pick-color" }, [
          vue.createVNode(_component_uv_toolbar, {
            show: $data.showToolbar,
            cancelColor: _ctx.cancelColor,
            confirmColor: _ctx.confirmColor,
            cancelText: _ctx.cancelText,
            confirmText: _ctx.confirmText,
            title: _ctx.title,
            "show-border": true,
            onCancel: $options.cancelHandler,
            onConfirm: $options.confirmHandler
          }, null, 8, ["show", "cancelColor", "confirmColor", "cancelText", "confirmText", "title", "onCancel", "onConfirm"]),
          vue.createElementVNode(
            "view",
            {
              class: "uv-pick-color__box",
              style: vue.normalizeStyle({
                background: `rgb(${$data.bgcolor.r},${$data.bgcolor.g},${$data.bgcolor.b})`
              })
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "uv-pick-color__box__bg drag-box",
                  onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers(($event) => $options.touchstart($event, 0), ["stop", "prevent"])),
                  onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(($event) => $options.touchmove($event, 0), ["stop", "prevent"])),
                  onTouchend: _cache[2] || (_cache[2] = vue.withModifiers(($event) => $options.touchend($event, 0), ["stop", "prevent"]))
                },
                [
                  vue.createElementVNode("view", { class: "uv-pick-color__box__bg-mask" }),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "uv-pick-color__box__bg-pointer",
                      style: vue.normalizeStyle([$options.pointerStyle])
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ],
                32
                /* HYDRATE_EVENTS */
              )
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "uv-pick-color__control" }, [
            vue.createElementVNode("view", { class: "uv-pick-color__control__alpha" }, [
              vue.createElementVNode(
                "view",
                {
                  class: "uv-pick-color__control__alpha--color",
                  style: vue.normalizeStyle({ background: `rgba(${$data.rgba.r},${$data.rgba.g},${$data.rgba.b},${$data.rgba.a})` })
                },
                null,
                4
                /* STYLE */
              )
            ]),
            vue.createElementVNode("view", { class: "uv-pick-color__control__item" }, [
              vue.createElementVNode(
                "view",
                {
                  class: "uv-pick-color__control__item__drag drag-box",
                  onTouchstart: _cache[3] || (_cache[3] = vue.withModifiers(($event) => $options.touchstart($event, 1), ["stop"])),
                  onTouchmove: _cache[4] || (_cache[4] = vue.withModifiers(($event) => $options.touchmove($event, 1), ["stop"])),
                  onTouchend: _cache[5] || (_cache[5] = vue.withModifiers(($event) => $options.touchend($event, 1), ["stop"]))
                },
                [
                  vue.createElementVNode("view", { class: "uv-pick-color__control__item__drag--hue" }),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "uv-pick-color__control__item__drag--circle",
                      style: vue.normalizeStyle({
                        left: _ctx.$uv.getPx($data.site[1].left - 10, true)
                      })
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ],
                32
                /* HYDRATE_EVENTS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "uv-pick-color__control__item__drag drag-box",
                  onTouchstart: _cache[6] || (_cache[6] = vue.withModifiers(($event) => $options.touchstart($event, 2), ["stop"])),
                  onTouchmove: _cache[7] || (_cache[7] = vue.withModifiers(($event) => $options.touchmove($event, 2), ["stop"])),
                  onTouchend: _cache[8] || (_cache[8] = vue.withModifiers(($event) => $options.touchend($event, 2), ["stop"]))
                },
                [
                  vue.createElementVNode("view", { class: "uv-pick-color__control__item__drag--alpha" }),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "uv-pick-color__control__item__drag--circle",
                      style: vue.normalizeStyle({
                        left: _ctx.$uv.getPx($data.site[2].left - 10, true)
                      })
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ],
                32
                /* HYDRATE_EVENTS */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "uv-pick-color__result" }, [
            vue.createElementVNode("view", {
              class: "uv-pick-color__result__select",
              "hover-class": "uv-hover-class",
              onClick: _cache[9] || (_cache[9] = vue.withModifiers((...args) => $options.select && $options.select(...args), ["stop"]))
            }, [
              vue.createElementVNode("text", { class: "text" }, "切换"),
              vue.createElementVNode("text", { class: "text" }, "模式")
            ]),
            $data.mode ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uv-pick-color__result__item"
            }, [
              vue.createElementVNode("view", { class: "uv-pick-color__result__item--value uv-border" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($data.hex),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "uv-pick-color__result__item--hex" }, [
                vue.createElementVNode("text", null, "HEX")
              ])
            ])) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createElementVNode("view", { class: "uv-pick-color__result__item" }, [
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--value uv-border" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.rgba.r),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--rgba" }, [
                    vue.createElementVNode("text", null, "R")
                  ])
                ]),
                vue.createElementVNode("view", { class: "uv-pick-color__result__gap" }),
                vue.createElementVNode("view", { class: "uv-pick-color__result__item" }, [
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--value uv-border" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.rgba.g),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--rgba" }, [
                    vue.createElementVNode("text", null, "G")
                  ])
                ]),
                vue.createElementVNode("view", { class: "uv-pick-color__result__gap" }),
                vue.createElementVNode("view", { class: "uv-pick-color__result__item" }, [
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--value uv-border" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.rgba.b),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--rgba" }, [
                    vue.createElementVNode("text", null, "B")
                  ])
                ]),
                vue.createElementVNode("view", { class: "uv-pick-color__result__gap" }),
                vue.createElementVNode("view", { class: "uv-pick-color__result__item" }, [
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--value uv-border" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.rgba.a),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "uv-pick-color__result__item--rgba" }, [
                    vue.createElementVNode("text", null, "A")
                  ])
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "uv-pick-color__prefab" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.colorList, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "uv-pick-color__prefab__item",
                  key: index2
                }, [
                  vue.createElementVNode("view", {
                    class: "uv-pick-color__prefab__item--color",
                    style: vue.normalizeStyle({ background: `rgba(${item.r},${item.g},${item.b},${item.a})` }),
                    onClick: vue.withModifiers(($event) => $options.setColorBySelect(item), ["stop"])
                  }, null, 12, ["onClick"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["close-on-click-overlay", "onChange"]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-cddb40bb"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-pick-color/components/uv-pick-color/uv-pick-color.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        lightSwitch: false,
        lightBrightness: 0,
        color: "#000000",
        timer: null
      };
    },
    onShow() {
      this.getStatus();
      uni.getStorage({
        key: "username",
        fail: function() {
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
      uni.getStorage({
        key: "userid",
        fail: function() {
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
    },
    onHide() {
      clearInterval(this.timer);
    },
    methods: {
      openColor: function() {
        this.$refs.pickerColor.open();
      },
      confirm: function(e) {
        this.color = e.hex;
        formatAppLog("log", "at pages/tabbar/light/light.vue:89", "confirm", e.hex);
        publish("/stm32", "color:" + this.color);
      },
      changeSwitch: function() {
        publish("/stm32", "lightswitch:" + this.lightSwitch);
      },
      changeLightBrightness: function() {
        publish("/stm32", "lightbrightness:" + this.lightBrightness);
      },
      getStatus: function() {
        const that = this;
        that.timer = setInterval(function() {
          uni.getStorage({
            key: "lightswitch",
            success: function(res) {
              that.lightSwitch = res.data == "true" ? true : false;
            }
          });
          uni.getStorage({
            key: "lightbrightness",
            success: function(res) {
              that.lightBrightness = res.data;
            }
          });
          uni.getStorage({
            key: "color",
            success: function(res) {
              that.color = res.data;
            }
          });
        }, 1e3);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_col = resolveEasycom(vue.resolveDynamicComponent("uv-col"), __easycom_7);
    const _component_uv_switch = resolveEasycom(vue.resolveDynamicComponent("uv-switch"), __easycom_2$1);
    const _component_uv_row = resolveEasycom(vue.resolveDynamicComponent("uv-row"), __easycom_8);
    const _component_uv_slider = resolveEasycom(vue.resolveDynamicComponent("uv-slider"), __easycom_3);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_3$1);
    const _component_uv_pick_color = resolveEasycom(vue.resolveDynamicComponent("uv-pick-color"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode(_component_uv_row, { customStyle: "margin-bottom: 10px" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_col, {
            span: "3",
            offset: "1"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "text" }, "开关")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, { span: "8" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_switch, {
                onChange: $options.changeSwitch,
                modelValue: $data.lightSwitch,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.lightSwitch = $event),
                size: "30"
              }, null, 8, ["onChange", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uv_row, { customStyle: "margin-bottom: 10px" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_col, {
            span: "3",
            offset: "1"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "text" }, "亮度")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, { span: "8" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_slider, {
                modelValue: $data.lightBrightness,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.lightBrightness = $event),
                onChange: $options.changeLightBrightness,
                "block-size": "28",
                min: "0",
                max: "100",
                "block-color": "#1296db",
                showValue: ""
              }, null, 8, ["modelValue", "onChange"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uv_row, { customStyle: "margin-bottom: 10px" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_col, {
            span: "3",
            offset: "1"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "text" }, "颜色")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, { span: "4" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_button, {
                type: "primary",
                text: "打开颜色选择器",
                onClick: $options.openColor
              }, null, 8, ["onClick"]),
              vue.createVNode(_component_uv_pick_color, {
                ref: "pickerColor",
                onConfirm: $options.confirm
              }, null, 8, ["onConfirm"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, {
            span: "3",
            offset: "1"
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(
                vue.toDisplayString($data.color),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesTabbarLightLight = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-b8606b76"], ["__file", "D:/imformation/uni-app/stm32/pages/tabbar/light/light.vue"]]);
  const _imports_0 = "/static/temperatureIcon.png";
  const _imports_1 = "/static/humidityIcon.png";
  const _sfc_main$4 = {
    data() {
      return {
        tempature: "1",
        humidity: "1",
        maxTemperature: 0,
        maxHumidity: 0,
        buzzer: false,
        timer: null
      };
    },
    methods: {
      getT: function() {
        const that = this;
        that.timer = setInterval(function() {
          uni.getStorage({
            key: "temperature",
            success: function(res) {
              that.tempature = res.data;
            }
          });
          uni.getStorage({
            key: "humidity",
            success: function(res) {
              that.humidity = res.data;
            }
          });
          uni.getStorage({
            key: "buzzer",
            success: function(res) {
              that.buzzer = res.data == "true" ? true : false;
            }
          });
          uni.getStorage({
            key: "maxtemperature",
            success: function(res) {
              that.maxTemperature = res.data;
            }
          });
          uni.getStorage({
            key: "maxhumidity",
            success: function(res) {
              that.maxHumidity = res.data;
            }
          });
        }, 1e3);
      },
      maxH: function() {
        publish("/stm32", "maxhumidity:" + this.maxHumidity);
      },
      maxT: function() {
        publish("/stm32", "maxtemperature:" + this.maxTemperature);
      },
      buzzerSwitch: function() {
        publish("/stm32", "buzzer:" + this.buzzer);
      }
    },
    onShow() {
      this.getT();
      uni.getStorage({
        key: "username",
        fail: function() {
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
      uni.getStorage({
        key: "userid",
        fail: function() {
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
    },
    onHide() {
      clearInterval(this.timer);
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_col = resolveEasycom(vue.resolveDynamicComponent("uv-col"), __easycom_7);
    const _component_uv_row = resolveEasycom(vue.resolveDynamicComponent("uv-row"), __easycom_8);
    const _component_uv_switch = resolveEasycom(vue.resolveDynamicComponent("uv-switch"), __easycom_2$1);
    const _component_uv_slider = resolveEasycom(vue.resolveDynamicComponent("uv-slider"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode(_component_uv_row, { customStyle: "margin-bottom: 10px" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_col, { span: "6" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "block" }, [
                vue.createElementVNode("view", { class: "text" }, [
                  vue.createElementVNode("image", {
                    src: _imports_0,
                    style: { "width": "40px", "height": "40px" }
                  })
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "dynamictext" },
                  vue.toDisplayString($data.tempature) + "°C",
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, { span: "6" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "block" }, [
                vue.createElementVNode("view", { class: "text" }, [
                  vue.createElementVNode("image", {
                    src: _imports_1,
                    style: { "width": "40px", "height": "40px" }
                  })
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "dynamictext" },
                  vue.toDisplayString($data.humidity) + "%RH",
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uv_row, { customStyle: "margin-bottom: 10px" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_col, {
            span: "4",
            offset: "1"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "textone" }, "蜂鸣器测试")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, { span: "7" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_switch, {
                onChange: $options.buzzerSwitch,
                modelValue: $data.buzzer,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.buzzer = $event),
                size: "30"
              }, null, 8, ["onChange", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uv_row, { customStyle: "margin-bottom: 10px" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_col, {
            span: "3",
            offset: "1"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "textone" }, "温度阈值")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, { span: "8" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_slider, {
                "block-size": "28",
                onChange: $options.maxT,
                modelValue: $data.maxTemperature,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.maxTemperature = $event),
                min: "0",
                max: "100",
                "block-color": "#1296db",
                showValue: ""
              }, null, 8, ["onChange", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uv_row, { customStyle: "margin-bottom: 10px" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_col, {
            span: "3",
            offset: "1"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "textone" }, "湿度阈值")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_col, { span: "8" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_slider, {
                "block-size": "28",
                onChange: $options.maxH,
                modelValue: $data.maxHumidity,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.maxHumidity = $event),
                min: "0",
                max: "100",
                "block-color": "#1296db",
                showValue: ""
              }, null, 8, ["onChange", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesTabbarTemperatureTemperature = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-14769bcf"], ["__file", "D:/imformation/uni-app/stm32/pages/tabbar/temperature/temperature.vue"]]);
  const props = {
    props: {
      // 图片地址
      src: {
        type: String,
        default: ""
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "aspectFill"
      },
      // 宽度，单位任意
      width: {
        type: [String, Number],
        default: "300"
      },
      // 高度，单位任意
      height: {
        type: [String, Number],
        default: "225"
      },
      // 图片形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 圆角，单位任意
      radius: {
        type: [String, Number],
        default: 0
      },
      // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
      lazyLoad: {
        type: Boolean,
        default: true
      },
      // 是否开启observer懒加载，nvue不生效
      observeLazyLoad: {
        type: Boolean,
        default: false
      },
      // 开启长按图片显示识别微信小程序码菜单
      showMenuByLongpress: {
        type: Boolean,
        default: true
      },
      // 加载中的图标，或者小图片
      loadingIcon: {
        type: String,
        default: "photo"
      },
      // 加载失败的图标，或者小图片
      errorIcon: {
        type: String,
        default: "error-circle"
      },
      // 是否显示加载中的图标或者自定义的slot
      showLoading: {
        type: Boolean,
        default: true
      },
      // 是否显示加载错误的图标或者自定义的slot
      showError: {
        type: Boolean,
        default: true
      },
      // 是否需要淡入效果
      fade: {
        type: Boolean,
        default: true
      },
      // 只支持网络资源，只对微信小程序有效
      webp: {
        type: Boolean,
        default: false
      },
      // 过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 500
      },
      // 背景颜色，用于深色页面加载图片时，为了和背景色融合
      bgColor: {
        type: String,
        default: "#f3f4f6"
      },
      ...(_D = (_C = uni.$uv) == null ? void 0 : _C.props) == null ? void 0 : _D.image
    }
  };
  const _sfc_main$3 = {
    name: "uv-image",
    emits: ["click", "load", "error"],
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        // 图片是否加载错误，如果是，则显示错误占位图
        isError: false,
        // 初始化组件时，默认为加载中状态
        loading: true,
        // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
        backgroundStyle: {},
        // 用于fade模式的控制组件显示与否
        show: false,
        // 是否开启图片出现在可视范围进行加载（另一种懒加载）
        observeShow: !this.observeLazyLoad,
        elIndex: "",
        // 因为props的值无法修改，故需要一个中间值
        imgWidth: this.width,
        // 因为props的值无法修改，故需要一个中间值
        imgHeight: this.height,
        thresholdValue: 50
      };
    },
    watch: {
      src: {
        immediate: true,
        handler(n) {
          if (!n) {
            this.isError = true;
          } else {
            this.isError = false;
            this.loading = true;
          }
        }
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.imgWidth);
        style.height = this.$uv.addUnit(this.imgHeight);
        style.borderRadius = this.shape == "circle" ? "10000px" : this.$uv.addUnit(this.radius);
        style.overflow = this.radius > 0 ? "hidden" : "visible";
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      imageStyle() {
        let style = {};
        style.borderRadius = this.shape == "circle" ? "10000px" : this.$uv.addUnit(this.radius);
        return style;
      }
    },
    created() {
      this.elIndex = this.$uv.guid();
      this.observer = {};
      this.observerName = "lazyLoadContentObserver";
    },
    mounted() {
      this.show = true;
      if (this.observeLazyLoad)
        this.observerFn();
    },
    methods: {
      // 点击图片
      onClick() {
        this.$emit("click");
      },
      // 图片加载失败
      onErrorHandler(err) {
        this.loading = false;
        this.isError = true;
        this.$emit("error", err);
      },
      // 图片加载完成，标记loading结束
      onLoadHandler(event) {
        if (this.mode == "widthFix")
          this.imgHeight = "auto";
        if (this.mode == "heightFix")
          this.imgWidth = "auto";
        this.loading = false;
        this.isError = false;
        this.$emit("load", event);
        this.removeBgColor();
      },
      // 移除图片的背景色
      removeBgColor() {
        this.backgroundStyle = {
          backgroundColor: "transparent"
        };
      },
      // 观察图片是否在可见视口
      observerFn() {
        this.$nextTick(() => {
          uni.$once("onLazyLoadReachBottom", () => {
            if (!this.observeShow)
              this.observeShow = true;
          });
        });
        setTimeout(() => {
          this.disconnectObserver(this.observerName);
          const contentObserver = uni.createIntersectionObserver(this);
          contentObserver.relativeToViewport({
            bottom: this.thresholdValue
          }).observe(`.uv-image--${this.elIndex}`, (res) => {
            if (res.intersectionRatio > 0) {
              this.observeShow = true;
              this.disconnectObserver(this.observerName);
            }
          });
          this[this.observerName] = contentObserver;
        }, 50);
      },
      disconnectObserver(observerName) {
        const observer = this[observerName];
        observer && observer.disconnect();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$2);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      show: $data.show,
      mode: "fade",
      duration: _ctx.fade ? _ctx.duration : 0
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-image", [`uv-image--${$data.elIndex}`]]),
            onClick: _cache[2] || (_cache[2] = (...args) => $options.onClick && $options.onClick(...args)),
            style: vue.normalizeStyle([$options.wrapStyle, $data.backgroundStyle])
          },
          [
            !$data.isError && $data.observeShow ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: _ctx.src,
              mode: _ctx.mode,
              onError: _cache[0] || (_cache[0] = (...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
              onLoad: _cache[1] || (_cache[1] = (...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
              "show-menuv-by-longpress": _ctx.showMenuByLongpress,
              "lazy-load": _ctx.lazyLoad,
              class: "uv-image__image",
              style: vue.normalizeStyle([$options.imageStyle])
            }, null, 44, ["src", "mode", "show-menuv-by-longpress", "lazy-load"])) : vue.createCommentVNode("v-if", true),
            _ctx.showLoading && $data.loading ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "uv-image__loading",
                style: vue.normalizeStyle({
                  borderRadius: _ctx.shape == "circle" ? "50%" : _ctx.$uv.addUnit(_ctx.radius),
                  backgroundColor: _ctx.bgColor,
                  width: _ctx.$uv.addUnit(_ctx.width),
                  height: _ctx.$uv.addUnit(_ctx.height)
                })
              },
              [
                vue.renderSlot(_ctx.$slots, "loading", {}, () => [
                  vue.createVNode(_component_uv_icon, {
                    name: _ctx.loadingIcon,
                    width: _ctx.width,
                    height: _ctx.height
                  }, null, 8, ["name", "width", "height"])
                ], true)
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true),
            _ctx.showError && $data.isError && !$data.loading ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 2,
                class: "uv-image__error",
                style: vue.normalizeStyle({
                  borderRadius: _ctx.shape == "circle" ? "50%" : _ctx.$uv.addUnit(_ctx.radius),
                  width: _ctx.$uv.addUnit(_ctx.width),
                  height: _ctx.$uv.addUnit(_ctx.height)
                })
              },
              [
                vue.renderSlot(_ctx.$slots, "error", {}, () => [
                  vue.createVNode(_component_uv_icon, {
                    name: _ctx.errorIcon,
                    width: _ctx.width,
                    height: _ctx.height
                  }, null, 8, ["name", "width", "height"])
                ], true)
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration"]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-8fe9e33e"], ["__file", "D:/imformation/uni-app/stm32/uni_modules/uv-image/components/uv-image/uv-image.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        showPassword: true,
        passwordIcon: "lock",
        form: {
          userInfo: {
            id: "",
            username: "",
            password: ""
          }
        },
        rules: {
          "userInfo.username": {
            type: "string",
            required: true,
            message: "请填写用户名",
            trigger: ["blur", "change"]
          },
          "userInfo.password": {
            type: "string",
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"]
          }
        }
      };
    },
    onShow() {
      let that = this;
      uni.getStorage({
        key: "username",
        success: function(res) {
          that.form.userInfo.username = res.data;
        },
        fail: function() {
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
      uni.getStorage({
        key: "userid",
        success: function(res) {
          that.form.userInfo.id = res.data.toString();
        },
        fail: function() {
          uni.showToast({
            icon: "error",
            title: "未登录，请先登录"
          });
          setTimeout(function() {
            uni.reLaunch({
              url: "/pages/user/login/login"
            });
          }, 1e3);
        }
      });
    },
    methods: {
      lonoff: function() {
        uni.showToast({
          icon: "success",
          title: "注销成功"
        });
        setTimeout(function() {
          uni.reLaunch({
            url: "/pages/user/login/login"
          });
        }, 1e3);
        uni.clearStorage();
      },
      submit() {
        const that = this;
        uni.getStorage({
          key: "userid",
          success: function(res) {
            that.form.userInfo.id = res.data;
          }
        });
        this.$refs.uvFormRef.validate().then((res) => {
          uni.request({
            header: {
              "Content-Type": "application/json"
            },
            url: apiUrl + "/user/update",
            method: "POST",
            data: {
              "id": this.form.userInfo.id,
              "username": this.form.userInfo.username,
              "password": this.form.userInfo.password
            },
            dataType: "json",
            success: function(res2) {
              if (res2.data.code == "2000") {
                uni.showToast({
                  icon: "success",
                  title: "修改成功"
                });
                setTimeout(function() {
                  that.lonoff();
                }, 1e3);
              } else {
                uni.showToast({
                  icon: "success",
                  title: res2.data.message
                });
              }
            }
          });
        });
      },
      reset() {
        this.$refs.uvFormRef.resetFields();
        this.$refs.uvFormRef.clearValidate();
      },
      open() {
        this.$refs.popup.open();
      },
      hideKeyboard() {
        uni.hideKeyboard();
      },
      showPasswordMethod() {
        if (this.showPassword == false) {
          this.passwordIcon = "lock";
          this.showPassword = true;
        } else {
          this.passwordIcon = "lock-open";
          this.showPassword = false;
        }
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$3);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$1);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_3$1);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_4);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_5$1);
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_6);
    const _component_uv_col = resolveEasycom(vue.resolveDynamicComponent("uv-col"), __easycom_7);
    const _component_uv_row = resolveEasycom(vue.resolveDynamicComponent("uv-row"), __easycom_8);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(
          _component_uv_popup,
          {
            ref: "popup",
            mode: "center"
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "width": "700rpx", "height": "700rpx", "display": "flex", "justify-content": "space-evenly", "align-items": "center", "flex-direction": "column" } }, [
                vue.createElementVNode("view", { class: "h1" }, "修改密码"),
                vue.createElementVNode("view", { style: { "width": "500rpx" } }, [
                  vue.createVNode(_component_uv_form, {
                    labelPosition: "left",
                    labelWidth: "50px",
                    model: $data.form,
                    rules: $data.rules,
                    ref: "uvFormRef",
                    class: "form"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(
                        _component_uv_form_item,
                        {
                          label: "用户名",
                          prop: "userInfo.usernmae",
                          borderBottom: "",
                          ref: "item1"
                        },
                        {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_uv_input, {
                              modelValue: $data.form.userInfo.username,
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.userInfo.username = $event),
                              placeholder: "请输入用户名"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                          /* STABLE */
                        },
                        512
                        /* NEED_PATCH */
                      ),
                      vue.createVNode(
                        _component_uv_form_item,
                        {
                          label: "密码",
                          prop: "userInfo.password",
                          borderBottom: "",
                          ref: "item1"
                        },
                        {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_uv_input, {
                              modelValue: $data.form.userInfo.password,
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.userInfo.password = $event),
                              password: $data.showPassword,
                              placeholder: "请输入密码",
                              suffixIconStyle: "color: #909399"
                            }, {
                              suffix: vue.withCtx(() => [
                                vue.createVNode(_component_uv_icon, {
                                  name: $data.passwordIcon,
                                  color: "#black",
                                  size: "20",
                                  onClick: $options.showPasswordMethod
                                }, null, 8, ["name", "onClick"])
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["modelValue", "password"])
                          ]),
                          _: 1
                          /* STABLE */
                        },
                        512
                        /* NEED_PATCH */
                      ),
                      vue.createVNode(_component_uv_form_item, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_button, {
                            type: "primary",
                            text: "提交",
                            customStyle: "margin-top: 10px",
                            onClick: _cache[2] || (_cache[2] = ($event) => $options.submit())
                          }),
                          vue.createVNode(_component_uv_button, {
                            type: "error",
                            text: "重置",
                            customStyle: "margin-top: 10px",
                            onClick: _cache[3] || (_cache[3] = ($event) => $options.reset())
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["model", "rules"])
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createElementVNode("view", { class: "content" }),
        vue.createElementVNode("view", { class: "userIcon" }, [
          vue.createVNode(_component_uv_image, {
            src: "https://cdn.uviewui.com/uview/album/1.jpg",
            shape: "circle",
            width: "100px",
            height: "100px"
          }),
          vue.createElementVNode(
            "text",
            null,
            "用户名:" + vue.toDisplayString($data.form.userInfo.username),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "button" }, [
          vue.createVNode(_component_uv_row, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_col, { span: "4" }),
              vue.createVNode(_component_uv_col, { span: "4" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_button, {
                    type: "primary",
                    text: "修改信息",
                    onClick: $options.open
                  }, null, 8, ["onClick"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_col, { span: "4" })
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_row, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_col, { span: "4" }),
              vue.createVNode(_component_uv_col, { span: "4" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_button, {
                    type: "error",
                    text: "注销",
                    onClick: $options.lonoff
                  }, null, 8, ["onClick"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_col, { span: "4" })
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesTabbarUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-dd991dc9"], ["__file", "D:/imformation/uni-app/stm32/pages/tabbar/user/user.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        showPassword: true,
        passwordIcon: "lock",
        form: {
          userInfo: {
            username: "",
            password: ""
          }
        },
        rules: {
          "userInfo.username": {
            type: "string",
            required: true,
            message: "请填写用户名",
            trigger: ["blur", "change"]
          },
          "userInfo.password": {
            type: "string",
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"]
          }
        },
        radio: "",
        switchVal: false
      };
    },
    methods: {
      submit() {
        this.$refs.uvFormRef.validate().then((res) => {
          uni.request({
            header: {
              "Content-Type": "application/json"
            },
            url: apiUrl + "/user/register",
            method: "POST",
            data: {
              "username": this.form.userInfo.username,
              "password": this.form.userInfo.password
            },
            dataType: "json",
            success: (res2) => {
              if (res2.data.code == "2000") {
                uni.showToast({
                  icon: "success",
                  title: "注册成功"
                });
                setTimeout(function() {
                  uni.navigateBack(1);
                }, 1e3);
              } else {
                uni.showToast({
                  icon: "success",
                  title: res2.data.message
                });
              }
            }
          });
        });
      },
      // 重置
      reset() {
        this.$refs.uvFormRef.resetFields();
        this.$refs.uvFormRef.clearValidate();
      },
      login() {
        uni.navigateBack(1);
        this.$refs.uvFormRef.clearValidate();
      },
      hideKeyboard() {
        uni.hideKeyboard();
      },
      showPasswordMethod() {
        if (this.showPassword == false) {
          this.passwordIcon = "lock";
          this.showPassword = true;
        } else {
          this.passwordIcon = "lock-open";
          this.showPassword = false;
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$3);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$1);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_2$3);
    const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_3$1);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "head" }, [
          vue.createElementVNode("view", { class: "h1" }, "智能家居管理系统"),
          vue.createElementVNode("view", { class: "h2" }, "注册")
        ]),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createVNode(_component_uv_form, {
            labelPosition: "left",
            labelWidth: "50px",
            model: $data.form,
            rules: $data.rules,
            ref: "uvFormRef",
            class: "form"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "用户名",
                  prop: "userInfo.username",
                  borderBottom: "",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.form.userInfo.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.userInfo.username = $event),
                      placeholder: "请输入用户名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "密码",
                  prop: "userInfo.password",
                  borderBottom: "",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.form.userInfo.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.userInfo.password = $event),
                      password: $data.showPassword,
                      placeholder: "请输入密码",
                      suffixIconStyle: "color: #909399"
                    }, {
                      suffix: vue.withCtx(() => [
                        vue.createVNode(_component_uv_icon, {
                          name: $data.passwordIcon,
                          color: "#black",
                          size: "20",
                          onClick: $options.showPasswordMethod
                        }, null, 8, ["name", "onClick"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["modelValue", "password"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(_component_uv_button, {
                type: "primary",
                text: "提交",
                customStyle: "margin-top: 10px",
                onClick: _cache[2] || (_cache[2] = ($event) => $options.submit())
              }),
              vue.createVNode(_component_uv_button, {
                type: "primary",
                text: "登录",
                customStyle: "margin-top: 10px",
                onClick: _cache[3] || (_cache[3] = ($event) => $options.login())
              }),
              vue.createVNode(_component_uv_button, {
                type: "error",
                text: "重置",
                customStyle: "margin-top: 10px",
                onClick: _cache[4] || (_cache[4] = ($event) => $options.reset())
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesUserRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-bc9871d6"], ["__file", "D:/imformation/uni-app/stm32/pages/user/register/register.vue"]]);
  __definePage("pages/user/login/login", PagesUserLoginLogin);
  __definePage("pages/tabbar/home/home", PagesTabbarHomeHome);
  __definePage("pages/tabbar/light/light", PagesTabbarLightLight);
  __definePage("pages/tabbar/temperature/temperature", PagesTabbarTemperatureTemperature);
  __definePage("pages/tabbar/user/user", PagesTabbarUserUser);
  __definePage("pages/user/register/register", PagesUserRegisterRegister);
  const _sfc_main = {
    globalData: {
      username: "",
      userid: ""
    },
    onLaunch: function() {
      formatAppLog("log", "at App.vue:8", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:11", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:14", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/imformation/uni-app/stm32/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  uni.connectSocket = function(connectSocket) {
    return function(options2) {
      formatAppLog("log", "at main.js:28", options2);
      options2.success = options2.success || function() {
      };
      return connectSocket.call(this, options2);
    };
  }(uni.connectSocket);
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
