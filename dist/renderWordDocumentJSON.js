(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  // 创建元素
  function createElement(tagName, props, children) {
    return createElementNS(undefined, tagName, props, children);
  }
  function createElementNS(ns, tagName, props, children) {
    var result = ns ? document.createElementNS(ns, tagName) : document.createElement(tagName);
    Object.assign(result, props);
    children && appendChildren$1(result, children);
    return result;
  }
  function removeAllElements(elem) {
    elem.innerHTML = '';
  }
  function appendChildren$1(elem, children) {
    children.forEach(function (c) {
      return elem.appendChild(c);
    });
  }
  function createStyleElement(cssText) {
    return createElement("style", {
      innerHTML: cssText
    });
  }
  function appendComment(elem, comment) {
    elem.appendChild(document.createComment(comment));
  }
  function keyBy(array, by) {
    return array.reduce(function (a, x) {
      a[by(x)] = x;
      return a;
    }, {});
  }
  function escapeClassName(className) {
    return className === null || className === void 0 ? void 0 : className.replace(/[ .]+/g, '-').replace(/[&]+/g, 'and').toLowerCase();
  }
  function isObject(item) {
    return item && _typeof(item) === 'object' && !Array.isArray(item);
  }
  function mergeDeep(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (var key in source) {
        if (isObject(source[key])) {
          var _target$key;

          var val = (_target$key = target[key]) !== null && _target$key !== void 0 ? _target$key : target[key] = {};
          mergeDeep(val, source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }

    return mergeDeep.apply(void 0, [target].concat(sources));
  }

  // css 变量
  function renderDefaultStyle(className) {
    var c = className;
    var styleText = "\n.".concat(c, "-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } \n.").concat(c, "-wrapper>section.").concat(c, " { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }\n.").concat(c, " { color: black; }\nsection.").concat(c, " { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }\nsection.").concat(c, ">article { margin-bottom: auto; }\n.").concat(c, " table { border-collapse: collapse; }\n.").concat(c, " table td, .").concat(c, " table th { vertical-align: top; }\n.").concat(c, " p { margin: 0pt; min-height: 1em; }\n.").concat(c, " span { white-space: pre-wrap; overflow-wrap: break-word; }\n.").concat(c, " a { color: inherit; text-decoration: inherit; }\n");
    return createStyleElement(styleText);
  }

  var BasePart = /*#__PURE__*/function () {
    function BasePart() {
      _classCallCheck(this, BasePart);
    }

    _createClass(BasePart, [{
      key: "numberingClass",
      value: function numberingClass(id, lvl) {
        return "".concat(this.className, "-num-").concat(id, "-").concat(lvl);
      }
    }, {
      key: "numberingCounter",
      value: function numberingCounter(id, lvl) {
        return "".concat(this.className, "-num-").concat(id, "-").concat(lvl);
      }
    }, {
      key: "numFormatToCssValue",
      value: function numFormatToCssValue(format) {
        var mapping = {
          "none": "none",
          "bullet": "disc",
          "decimal": "decimal",
          "lowerLetter": "lower-alpha",
          "upperLetter": "upper-alpha",
          "lowerRoman": "lower-roman",
          "upperRoman": "upper-roman"
        };
        return mapping[format] || format;
      }
    }, {
      key: "processStyleName",
      value: function processStyleName(className) {
        return className ? "".concat(this.className, "_").concat(escapeClassName(className)) : this.className;
      }
    }, {
      key: "copyStyleProperties",
      value: function copyStyleProperties(input, output, attrs) {
        if (!input) return output;
        if (output == null) output = {};
        if (attrs == null) attrs = Object.getOwnPropertyNames(input);

        var _iterator = _createForOfIteratorHelper(attrs),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;
            if (input.hasOwnProperty(key) && !output.hasOwnProperty(key)) output[key] = input[key];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return output;
      }
    }, {
      key: "styleToString",
      value: function styleToString(selectors, values, cssText) {
        var result = "".concat(selectors, " {\r\n");

        for (var key in values) {
          result += "  ".concat(key, ": ").concat(values[key], ";\r\n");
        }

        if (cssText) result += cssText;
        return result + "}\r\n";
      }
    }, {
      key: "render",
      value: function render() {}
    }]);

    return BasePart;
  }();

  var RenderTheme = /*#__PURE__*/function (_BasePart) {
    _inherits(RenderTheme, _BasePart);

    var _super = _createSuper(RenderTheme);

    function RenderTheme(themePart, className) {
      var _this;

      _classCallCheck(this, RenderTheme);

      _this = _super.call(this);
      _this.themePart = themePart;
      _this.className = className;
      return _this;
    }

    _createClass(RenderTheme, [{
      key: "render",
      value: function render(styleContainer) {
        appendComment(styleContainer, "docxjs document theme values");
        this.renderTheme(styleContainer);
      }
    }, {
      key: "renderTheme",
      value: function renderTheme(styleContainer) {
        var variables = {};
        var fontScheme = this.themePart.props && this.themePart.props.fontScheme; // 字体

        if (fontScheme) {
          if (fontScheme.majorFont) {
            variables['--docx-majorHAnsi-font'] = fontScheme.majorFont.latinTypeface;
          }

          if (fontScheme.minorFont) {
            variables['--docx-minorHAnsi-font'] = fontScheme.minorFont.latinTypeface;
          }
        }

        var colorScheme = this.themePart.props && this.themePart.props.colorScheme; // 颜色

        if (colorScheme) {
          for (var _i = 0, _Object$entries = Object.entries(colorScheme.colors); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                k = _Object$entries$_i[0],
                v = _Object$entries$_i[1];

            variables["--docx-".concat(k, "-color")] = "#".concat(v);
          }
        }

        var cssText = this.styleToString(".".concat(this.className), variables);
        styleContainer.appendChild(createStyleElement(cssText));
      }
    }]);

    return RenderTheme;
  }(BasePart);

  var RenderStyle = /*#__PURE__*/function (_BasePart) {
    _inherits(RenderStyle, _BasePart);

    var _super = _createSuper(RenderStyle);

    function RenderStyle(stylesPart, options) {
      var _this;

      _classCallCheck(this, RenderStyle);

      _this = _super.call(this);
      _this.stylesPart = stylesPart;
      _this.styleMap = null;
      _this.options = _objectSpread2({
        debug: false
      }, options);
      _this.className = options.className;
      return _this;
    }

    _createClass(RenderStyle, [{
      key: "render",
      value: function render(styleContainer) {
        this.styleMap = this.processStyles(this.stylesPart.props);
        appendComment(styleContainer, "docxjs document styles");
        styleContainer.appendChild(this.renderStyles(this.stylesPart.props));
      }
    }, {
      key: "renderStyles",
      value: function renderStyles(styles) {
        var styleText = "";
        var defautStyles = keyBy(styles.filter(function (s) {
          return s.isDefault;
        }), function (s) {
          return s.target;
        });

        var _iterator = _createForOfIteratorHelper(styles),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var style = _step.value;
            var subStyles = style.styles;

            if (style.linked) {
              var linkedStyle = style.linked && this.stylesMap[style.linked];
              if (linkedStyle) subStyles = subStyles.concat(linkedStyle.styles);else if (this.options.debug) console.warn("Can't find linked style ".concat(style.linked));
            }

            var _iterator2 = _createForOfIteratorHelper(subStyles),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _style$target;

                var subStyle = _step2.value;
                //TODO temporary disable modificators until test it well
                var selector = "".concat((_style$target = style.target) !== null && _style$target !== void 0 ? _style$target : '', ".").concat(style.cssName); //${subStyle.mod ?? ''} 

                if (style.target != subStyle.target) selector += " ".concat(subStyle.target);
                if (defautStyles[style.target] == style) selector = ".".concat(this.className, " ").concat(style.target, ", ") + selector;
                styleText += this.styleToString(selector, subStyle.values);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return createStyleElement(styleText);
      }
    }, {
      key: "processStyles",
      value: function processStyles(styles) {
        var _this2 = this;

        var stylesMap = keyBy(styles.filter(function (x) {
          return x.id != null;
        }), function (x) {
          return x.id;
        });

        var _iterator3 = _createForOfIteratorHelper(styles.filter(function (x) {
          return x.basedOn;
        })),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var style = _step3.value;
            var baseStyle = stylesMap[style.basedOn];

            if (baseStyle) {
              style.paragraphProps = mergeDeep(style.paragraphProps, baseStyle.paragraphProps);
              style.runProps = mergeDeep(style.runProps, baseStyle.runProps);

              var _iterator5 = _createForOfIteratorHelper(baseStyle.styles),
                  _step5;

              try {
                var _loop = function _loop() {
                  var baseValues = _step5.value;
                  var styleValues = style.styles.find(function (x) {
                    return x.target == baseValues.target;
                  });

                  if (styleValues) {
                    _this2.copyStyleProperties(baseValues.values, styleValues.values);
                  } else {
                    style.styles.push(_objectSpread2(_objectSpread2({}, baseValues), {}, {
                      values: _objectSpread2({}, baseValues.values)
                    }));
                  }
                };

                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  _loop();
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            } else if (this.options.debug) {
              console.warn("Can't find base style ".concat(style.basedOn));
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        var _iterator4 = _createForOfIteratorHelper(styles),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _style = _step4.value;
            _style.cssName = this.processStyleName(_style.id);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return stylesMap;
      }
    }]);

    return RenderStyle;
  }(BasePart);

  var RenderNumbering = /*#__PURE__*/function (_BasePart) {
    _inherits(RenderNumbering, _BasePart);

    var _super = _createSuper(RenderNumbering);

    function RenderNumbering(numberingPart) {
      var _this;

      _classCallCheck(this, RenderNumbering);

      _this = _super.call(this);
      _this.numberingPart = numberingPart;
      return _this;
    }

    _createClass(RenderNumbering, [{
      key: "render",
      value: function render(styleContainer) {
        this.prodessNumberings(this.numberingPart.props);
        appendComment(styleContainer, "docxjs document numbering styles");
        styleContainer.appendChild(this.renderNumbering(this.numberingPart.props, styleContainer)); //styleContainer.appendChild(this.renderNumbering2(document.numberingPart, styleContainer));
      } // renderNumbering2(numberingPart: NumberingPartProperties, container: HTMLElement): HTMLElement {
      //     let css = "";
      //     const numberingMap = keyBy(numberingPart.abstractNumberings, x => x.id);
      //     const bulletMap = keyBy(numberingPart.bulletPictures, x => x.id);
      //     const topCounters = [];
      //     for(let num of numberingPart.numberings) {
      //         const absNum = numberingMap[num.abstractId];
      //         for(let lvl of absNum.levels) {
      //             const className = this.numberingClass(num.id, lvl.level);
      //             let listStyleType = "none";
      //             if(lvl.text && lvl.format == 'decimal') {
      //                 const counter = this.numberingCounter(num.id, lvl.level);
      //                 if (lvl.level > 0) {
      //                     css += this.styleToString(`p.${this.numberingClass(num.id, lvl.level - 1)}`, {
      //                         "counter-reset": counter
      //                     });
      //                 } else {
      //                     topCounters.push(counter);
      //                 }
      //                 css += this.styleToString(`p.${className}:before`, {
      //                     "content": this.levelTextToContent(lvl.text, num.id),
      //                     "counter-increment": counter
      //                 });
      //             } else if(lvl.bulletPictureId) {
      //                 let pict = bulletMap[lvl.bulletPictureId];
      //                 let variable = `--${this.className}-${pict.referenceId}`.toLowerCase();
      //                 css += this.styleToString(`p.${className}:before`, {
      //                     "content": "' '",
      //                     "display": "inline-block",
      //                     "background": `var(${variable})`
      //                 }, pict.style);
      //                 this.document.loadNumberingImage(pict.referenceId).then(data => {
      //                     var text = `.${this.className}-wrapper { ${variable}: url(${data}) }`;
      //                     container.appendChild(createStyleElement(text));
      //                 });
      //             } else {
      //                 listStyleType = this.numFormatToCssValue(lvl.format);
      //             }
      //             css += this.styleToString(`p.${className}`, {
      //                 "display": "list-item",
      //                 "list-style-position": "inside",
      //                 "list-style-type": listStyleType,
      //                 //TODO
      //                 //...num.style
      //             });
      //         }
      //     }
      //     if (topCounters.length > 0) {
      //         css += this.styleToString(`.${this.className}-wrapper`, {
      //             "counter-reset": topCounters.join(" ")
      //         });
      //     }
      //     return createStyleElement(css);
      // }

    }, {
      key: "renderNumbering",
      value: function renderNumbering(styleContainer) {
        var _this2 = this;

        var styleText = "";
        var rootCounters = [];

        var _iterator = _createForOfIteratorHelper(this.numberings),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var num = _step.value;
            var selector = "p.".concat(this.numberingClass(num.id, num.level));
            var listStyleType = "none";

            if (num.bullet) {
              (function () {
                var valiable = "--".concat(_this2.className, "-").concat(num.bullet.src).toLowerCase();
                styleText += _this2.styleToString("".concat(selector, ":before"), {
                  "content": "' '",
                  "display": "inline-block",
                  "background": "var(".concat(valiable, ")")
                }, num.bullet.style);

                _this2.document.loadNumberingImage(num.bullet.src).then(function (data) {
                  var text = ".".concat(_this2.className, "-wrapper { ").concat(valiable, ": url(").concat(data, ") }");
                  styleContainer.appendChild(createStyleElement(text));
                });
              })();
            } else if (num.levelText) {
              var counter = this.numberingCounter(num.id, num.level);

              if (num.level > 0) {
                styleText += this.styleToString("p.".concat(this.numberingClass(num.id, num.level - 1)), {
                  "counter-reset": counter
                });
              } else {
                rootCounters.push(counter);
              }

              styleText += this.styleToString("".concat(selector, ":before"), _objectSpread2({
                "content": this.levelTextToContent(num.levelText, num.suff, num.id, this.numFormatToCssValue(num.format)),
                "counter-increment": counter
              }, num.rStyle));
            } else {
              listStyleType = this.numFormatToCssValue(num.format);
            }

            styleText += this.styleToString(selector, _objectSpread2({
              "display": "list-item",
              "list-style-position": "inside",
              "list-style-type": listStyleType
            }, num.pStyle));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (rootCounters.length > 0) {
          styleText += this.styleToString(".".concat(this.className, "-wrapper"), {
            "counter-reset": rootCounters.join(" ")
          });
        }

        return createStyleElement(styleText);
      }
    }, {
      key: "levelTextToContent",
      value: function levelTextToContent(text, suff, id, numformat) {
        var _this3 = this,
            _suffMap$suff;

        var suffMap = {
          "tab": "\\9",
          "space": "\\a0"
        };
        var result = text.replace(/%\d*/g, function (s) {
          var lvl = parseInt(s.substring(1), 10) - 1;
          return "\"counter(".concat(_this3.numberingCounter(id, lvl), ", ").concat(numformat, ")\"");
        });
        return "\"".concat(result).concat((_suffMap$suff = suffMap[suff]) !== null && _suffMap$suff !== void 0 ? _suffMap$suff : "", "\"");
      }
    }, {
      key: "prodessNumberings",
      value: function prodessNumberings(numberings) {
        var _iterator2 = _createForOfIteratorHelper(numberings.filter(function (n) {
          return n.pStyleName;
        })),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _style$paragraphProps;

            var num = _step2.value;
            var style = this.findStyle(num.pStyleName);

            if (style !== null && style !== void 0 && (_style$paragraphProps = style.paragraphProps) !== null && _style$paragraphProps !== void 0 && _style$paragraphProps.numbering) {
              style.paragraphProps.numbering.level = num.level;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }]);

    return RenderNumbering;
  }(BasePart);

  var RenderFontTable = /*#__PURE__*/function (_BasePart) {
    _inherits(RenderFontTable, _BasePart);

    var _super = _createSuper(RenderFontTable);

    function RenderFontTable(fontsPart) {
      var _this;

      _classCallCheck(this, RenderFontTable);

      _this = _super.call(this);
      _this.fontsPart = fontsPart;
      return _this;
    }

    _createClass(RenderFontTable, [{
      key: "render",
      value: function render(styleContainer) {
        var _this2 = this;

        var _iterator = _createForOfIteratorHelper(this.fontsPart.props),
            _step;

        try {
          var _loop = function _loop() {
            var f = _step.value;

            // 
            var _iterator2 = _createForOfIteratorHelper(f.embedFontRefs),
                _step2;

            try {
              var _loop2 = function _loop2() {
                var ref = _step2.value;

                _this2.document.loadFont(ref.id, ref.key).then(function (fontData) {
                  var cssValues = {
                    'font-family': f.name,
                    'src': "url(".concat(fontData, ")")
                  };

                  if (ref.type == "bold" || ref.type == "boldItalic") {
                    cssValues['font-weight'] = 'bold';
                  }

                  if (ref.type == "italic" || ref.type == "boldItalic") {
                    cssValues['font-style'] = 'italic';
                  }

                  appendComment(styleContainer, "docxjs ".concat(f.name, " font"));

                  var cssText = _this2.styleToString("@font-face", cssValues);

                  styleContainer.appendChild(createStyleElement(cssText)); // this.refreshTabStops();
                });
              };

              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                _loop2();
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }]);

    return RenderFontTable;
  }(BasePart);

  var DomType = {
    Document: "document",
    Paragraph: "paragraph",
    Run: "run",
    Break: "break",
    NoBreakHyphen: "noBreakHyphen",
    Table: "table",
    Row: "row",
    Cell: "cell",
    Hyperlink: "hyperlink",
    Drawing: "drawing",
    Image: "image",
    Text: "text",
    Tab: "tab",
    Symbol: "symbol",
    BookmarkStart: "bookmarkStart",
    BookmarkEnd: "bookmarkEnd",
    Footer: "footer",
    Header: "header",
    FootnoteReference: "footnoteReference",
    EndnoteReference: "endnoteReference",
    Footnote: "footnote",
    Endnote: "endnote",
    SimpleField: "simpleField",
    ComplexField: "complexField",
    Instruction: "instruction",
    VmlPicture: "vmlPicture",
    VmlShape: "vmlShape"
  };

  var RenderBody = /*#__PURE__*/function (_BasePart) {
    _inherits(RenderBody, _BasePart);

    var _super = _createSuper(RenderBody);

    function RenderBody(document, options, styleMap, footnoteMap, endnoteMap, defaultTabSize) {
      var _this;

      _classCallCheck(this, RenderBody);

      _this = _super.call(this);
      _this.document = document;
      _this.currentPart = null;
      _this.tableVerticalMerges = [];
      _this.currentVerticalMerge = null;
      _this.tableCellPositions = [];
      _this.currentCellPosition = null;
      _this.currentEndnoteIds = [];
      _this.usedHederFooterParts = [];
      _this.currentTabs = [];
      _this.tabsTimeout = 0;
      _this.createElement = createElement;
      _this.options = _objectSpread2({
        breakPages: true,
        className: "docx",
        ignoreFonts: false,
        ignoreHeight: false,
        ignoreLastRenderedPageBreak: true,
        ignoreWidth: false,
        inWrapper: true,
        renderEndnotes: true,
        renderFooters: true,
        renderFootnotes: true,
        renderHeaders: true,
        trimXmlDeclaration: true,
        useBase64URL: false
      }, options);
      _this.className = _this.options.className || 'docx';
      _this.styleMap = styleMap;
      _this.footnoteMap = footnoteMap;
      _this.endnoteMap = endnoteMap;
      _this.defaultTabSize = defaultTabSize;
      return _this;
    }

    _createClass(RenderBody, [{
      key: "render",
      value: function render() {
        var result = []; // 遍历元素处理表格 处理父元素节点

        this.processElement(this.document); // 分页 一页一个section

        var sections = this.splitBySection(this.document.children);
        var prevProps = null;

        for (var i = 0, l = sections.length; i < l; i++) {
          this.currentFootnoteIds = [];
          var section = sections[i];
          var props = section.sectProps || this.document.props; // 创建当前页

          var sectionElement = this.createSection(this.className, props); // 渲染word解析出来的样式

          this.renderStyleValues(this.document.cssStyle, sectionElement); // 页眉页脚

          this.options.renderHeaders && this.renderHeaderFooter(props.headerRefs, props, result.length, prevProps != props, sectionElement);
          var contentElement = this.createElement("article"); // 渲染当前页

          this.renderElements(section.elements, contentElement);
          sectionElement.appendChild(contentElement);

          if (this.options.renderFootnotes) {
            this.renderNotes(this.currentFootnoteIds, this.footnoteMap, sectionElement);
          }

          if (this.options.renderEndnotes && i == l - 1) {
            this.renderNotes(this.currentEndnoteIds, this.endnoteMap, sectionElement);
          }

          this.options.renderFooters && this.renderHeaderFooter(props.footerRefs, props, result.length, prevProps != props, sectionElement);
          result.push(sectionElement);
          prevProps = props;
        }

        return result;
      }
    }, {
      key: "renderStyleValues",
      value: function renderStyleValues(style, ouput) {
        Object.assign(ouput.style, style);
      }
    }, {
      key: "renderElements",
      value: function renderElements(elems, into) {
        var _this2 = this;

        if (elems == null) return null;
        var result = elems.map(function (e) {
          return _this2.renderElement(e);
        }).filter(function (e) {
          return e != null;
        });
        if (into) appendChildren(into, result);
        return result;
      }
    }, {
      key: "renderElement",
      value: function renderElement(elem) {
        switch (elem.type) {
          // 段落
          case DomType.Paragraph:
            return this.renderParagraph(elem);
          // 书签开始

          case DomType.BookmarkStart:
            return this.renderBookmarkStart(elem);
          // 书签结束

          case DomType.BookmarkEnd:
            return null;
          //ignore bookmark end
          // run标签

          case DomType.Run:
            return this.renderRun(elem);
          // table

          case DomType.Table:
            return this.renderTable(elem);

          case DomType.Row:
            return this.renderTableRow(elem);

          case DomType.Cell:
            return this.renderTableCell(elem);
          // 超链接

          case DomType.Hyperlink:
            return this.renderHyperlink(elem);
          // 图形

          case DomType.Drawing:
            return this.renderDrawing(elem);
          // 图片

          case DomType.Image:
            return this.renderImage(elem);
          // 文本

          case DomType.Text:
            return this.renderText(elem);

          case DomType.Tab:
            return this.renderTab(elem);

          case DomType.Symbol:
            return this.renderSymbol(elem);

          case DomType.Break:
            return this.renderBreak(elem);

          case DomType.Footer:
            return this.renderContainer(elem, "footer");

          case DomType.Header:
            return this.renderContainer(elem, "header");
          // 脚注 尾注

          case DomType.Footnote:
          case DomType.Endnote:
            return this.renderContainer(elem, "li");

          case DomType.FootnoteReference:
            return this.renderFootnoteReference(elem);

          case DomType.EndnoteReference:
            return this.renderEndnoteReference(elem);

          case DomType.NoBreakHyphen:
            return this.createElement("wbr");

          case DomType.VmlPicture:
            return this.renderVmlPicture(elem);

          case DomType.VmlShape:
            return this.renderVmlShape(elem);
        }

        return null;
      }
    }, {
      key: "renderHeaderFooter",
      value: function renderHeaderFooter(refs, props, page, firstOfSection, into) {
        var _ref, _ref2;

        if (!refs) return;
        var ref = (_ref = (_ref2 = props.titlePage && firstOfSection ? refs.find(function (x) {
          return x.type == "first";
        }) : null) !== null && _ref2 !== void 0 ? _ref2 : page % 2 == 1 ? refs.find(function (x) {
          return x.type == "even";
        }) : null) !== null && _ref !== void 0 ? _ref : refs.find(function (x) {
          return x.type == "default";
        });
        var part = ref && this.document.findPartByRelId(ref.id, this.document.documentPart);

        if (part) {
          this.currentPart = part;

          if (!this.usedHederFooterParts.includes(part.path)) {
            this.processElement(part.rootElement);
            this.usedHederFooterParts.push(part.path);
          }

          this.renderElements([part.rootElement], into);
          this.currentPart = null;
        }
      }
    }, {
      key: "renderNotes",
      value: function renderNotes(noteIds, notesMap, into) {
        var notes = noteIds.map(function (id) {
          return notesMap[id];
        }).filter(function (x) {
          return x;
        });

        if (notes.length > 0) {
          var result = this.createElement("ol", null, this.renderElements(notes));
          into.appendChild(result);
        }
      }
    }, {
      key: "renderParagraph",
      value: function renderParagraph(elem) {
        var _elem$tabs, _style$paragraphProps, _elem$numbering, _style$paragraphProps2;

        var result = this.createElement("p");
        var style = this.findStyle(elem.styleName);
        (_elem$tabs = elem.tabs) !== null && _elem$tabs !== void 0 ? _elem$tabs : elem.tabs = style === null || style === void 0 ? void 0 : (_style$paragraphProps = style.paragraphProps) === null || _style$paragraphProps === void 0 ? void 0 : _style$paragraphProps.tabs; //TODO

        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        this.renderCommonProperties(result.style, elem);
        var numbering = (_elem$numbering = elem.numbering) !== null && _elem$numbering !== void 0 ? _elem$numbering : style === null || style === void 0 ? void 0 : (_style$paragraphProps2 = style.paragraphProps) === null || _style$paragraphProps2 === void 0 ? void 0 : _style$paragraphProps2.numbering;

        if (numbering) {
          result.classList.add(this.numberingClass(numbering.id, numbering.level));
        }

        return result;
      }
    }, {
      key: "renderClass",
      value: function renderClass(input, ouput) {
        if (input.className) ouput.className = input.className;
        if (input.styleName) ouput.classList.add(this.processStyleName(input.styleName));
      }
    }, {
      key: "renderChildren",
      value: function renderChildren(elem, into) {
        return this.renderElements(elem.children, into);
      }
    }, {
      key: "renderCommonProperties",
      value: function renderCommonProperties(style, props) {
        if (props == null) return;

        if (props.color) {
          style["color"] = props.color;
        }

        if (props.fontSize) {
          style["font-size"] = props.fontSize;
        }
      }
    }, {
      key: "renderBookmarkStart",
      value: function renderBookmarkStart(elem) {
        var result = this.createElement("span");
        result.id = elem.name;
        return result;
      }
    }, {
      key: "renderRun",
      value: function renderRun(elem) {
        if (elem.fieldRun) return null;
        var result = this.createElement("span");
        if (elem.id) result.id = elem.id;
        this.renderClass(elem, result);
        this.renderStyleValues(elem.cssStyle, result);

        if (elem.verticalAlign) {
          var wrapper = this.createElement(elem.verticalAlign);
          this.renderChildren(elem, wrapper);
          result.appendChild(wrapper);
        } else {
          this.renderChildren(elem, result);
        }

        return result;
      }
    }, {
      key: "renderTable",
      value: function renderTable(elem) {
        var result = this.createElement("table");
        this.tableCellPositions.push(this.currentCellPosition);
        this.tableVerticalMerges.push(this.currentVerticalMerge);
        this.currentVerticalMerge = {};
        this.currentCellPosition = {
          col: 0,
          row: 0
        };
        if (elem.columns) result.appendChild(this.renderTableColumns(elem.columns));
        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        this.currentVerticalMerge = this.tableVerticalMerges.pop();
        this.currentCellPosition = this.tableCellPositions.pop();
        return result;
      }
    }, {
      key: "renderTableColumns",
      value: function renderTableColumns(columns) {
        var result = this.createElement("colgroup");

        var _iterator = _createForOfIteratorHelper(columns),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var col = _step.value;
            var colElem = this.createElement("col");
            if (col.width) colElem.style.width = col.width;
            result.appendChild(colElem);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return result;
      }
    }, {
      key: "renderTableRow",
      value: function renderTableRow(elem) {
        var result = this.createElement("tr");
        this.currentCellPosition.col = 0;
        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        this.currentCellPosition.row++;
        return result;
      }
    }, {
      key: "renderTableCell",
      value: function renderTableCell(elem) {
        var result = this.createElement("td");

        if (elem.verticalMerge) {
          var key = this.currentCellPosition.col;

          if (elem.verticalMerge == "restart") {
            this.currentVerticalMerge[key] = result;
            result.rowSpan = 1;
          } else if (this.currentVerticalMerge[key]) {
            this.currentVerticalMerge[key].rowSpan += 1;
            result.style.display = "none";
          }
        }

        this.renderClass(elem, result);
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        if (elem.span) result.colSpan = elem.span;
        this.currentCellPosition.col++;
        return result;
      }
    }, {
      key: "renderHyperlink",
      value: function renderHyperlink(elem) {
        var result = this.createElement("a");
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        if (elem.href) result.href = elem.href;
        return result;
      }
    }, {
      key: "renderDrawing",
      value: function renderDrawing(elem) {
        var result = this.createElement("div");
        result.style.display = "inline-block";
        result.style.position = "relative";
        result.style.textIndent = "0px";
        this.renderChildren(elem, result);
        this.renderStyleValues(elem.cssStyle, result);
        return result;
      }
    }, {
      key: "renderImage",
      value: function renderImage(elem) {
        var result = this.createElement("img");
        this.renderStyleValues(elem.cssStyle, result);

        if (this.document) {
          this.document.loadDocumentImage(elem.src, this.currentPart).then(function (x) {
            result.src = x;
          });
        }

        return result;
      }
    }, {
      key: "renderText",
      value: function renderText(elem) {
        return this.htmlDocument.createTextNode(elem.text);
      }
    }, {
      key: "renderBreak",
      value: function renderBreak(elem) {
        if (elem["break"] == "textWrapping") {
          return this.createElement("br");
        }

        return null;
      }
    }, {
      key: "renderSymbol",
      value: function renderSymbol(elem) {
        var span = this.createElement("span");
        span.style.fontFamily = elem.font;
        span.innerHTML = "&#x".concat(elem["char"], ";");
        return span;
      }
    }, {
      key: "renderContainer",
      value: function renderContainer(elem, tagName) {
        return this.createElement(tagName, null, this.renderChildren(elem));
      }
    }, {
      key: "renderVmlPicture",
      value: function renderVmlPicture(elem) {
        var result = createSvgElement("svg");
        this.renderChildren(elem, result);
        setTimeout(function () {
          var bb = result.getBBox();
          result.setAttribute("width", "".concat(Math.round(bb.width)));
          result.setAttribute("height", "".concat(Math.round(bb.height)));
        });
        return result;
      }
    }, {
      key: "renderVmlShape",
      value: function renderVmlShape(elem) {
        if (elem.imagedata) {
          var image = createSvgElement("image");
          image.setAttribute("style", elem.cssStyleText);

          if (this.document) {
            this.document.loadDocumentImage(elem.imagedata.id, this.currentPart).then(function (x) {
              image.setAttribute("href", x);
            });
          }

          return image;
        }
      }
    }, {
      key: "numberingClass",
      value: function numberingClass(id, lvl) {
        return "".concat(this.className, "-num-").concat(id, "-").concat(lvl);
      }
    }, {
      key: "findStyle",
      value: function findStyle(styleName) {
        var _this$styleMap;

        return styleName && ((_this$styleMap = this.styleMap) === null || _this$styleMap === void 0 ? void 0 : _this$styleMap[styleName]);
      }
    }, {
      key: "splitBySection",
      value: function splitBySection(elements) {
        var _this3 = this;

        var current = {
          sectProps: null,
          elements: []
        };
        var result = [current];

        var _iterator2 = _createForOfIteratorHelper(elements),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var elem = _step2.value;

            if (elem.type == DomType.Paragraph) {
              var _s$paragraphProps;

              var s = this.findStyle(elem.styleName);

              if (s !== null && s !== void 0 && (_s$paragraphProps = s.paragraphProps) !== null && _s$paragraphProps !== void 0 && _s$paragraphProps.pageBreakBefore) {
                current.sectProps = sectProps;
                current = {
                  sectProps: null,
                  elements: []
                };
                result.push(current);
              }
            }

            current.elements.push(elem);

            if (elem.type == DomType.Paragraph) {
              var p = elem;
              var sectProps = p.sectionProps;
              var pBreakIndex = -1;
              var rBreakIndex = -1;

              if (this.options.breakPages && p.children) {
                pBreakIndex = p.children.findIndex(function (r) {
                  var _r$children$findIndex, _r$children;

                  rBreakIndex = (_r$children$findIndex = (_r$children = r.children) === null || _r$children === void 0 ? void 0 : _r$children.findIndex(_this3.isPageBreakElement.bind(_this3))) !== null && _r$children$findIndex !== void 0 ? _r$children$findIndex : -1;
                  return rBreakIndex != -1;
                });
              }

              if (sectProps || pBreakIndex != -1) {
                current.sectProps = sectProps;
                current = {
                  sectProps: null,
                  elements: []
                };
                result.push(current);
              }

              if (pBreakIndex != -1) {
                var breakRun = p.children[pBreakIndex];
                var splitRun = rBreakIndex < breakRun.children.length - 1;

                if (pBreakIndex < p.children.length - 1 || splitRun) {
                  var children = elem.children;

                  var newParagraph = _objectSpread2(_objectSpread2({}, elem), {}, {
                    children: children.slice(pBreakIndex)
                  });

                  elem.children = children.slice(0, pBreakIndex);
                  current.elements.push(newParagraph);

                  if (splitRun) {
                    var runChildren = breakRun.children;

                    var newRun = _objectSpread2(_objectSpread2({}, breakRun), {}, {
                      children: runChildren.slice(0, rBreakIndex)
                    });

                    elem.children.push(newRun);
                    breakRun.children = runChildren.slice(rBreakIndex);
                  }
                }
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var currentSectProps = null;

        for (var i = result.length - 1; i >= 0; i--) {
          if (result[i].sectProps == null) {
            result[i].sectProps = currentSectProps;
          } else {
            currentSectProps = result[i].sectProps;
          }
        }

        return result;
      }
    }, {
      key: "processElement",
      value: function processElement(element) {
        if (element.children) {
          var _iterator3 = _createForOfIteratorHelper(element.children),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var e = _step3.value;
              e.parent = element;

              if (e.type == DomType.Table) {
                this.processTable(e);
              } else {
                this.processElement(e);
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }
    }, {
      key: "createSection",
      value: function createSection(className, props) {
        var elem = this.createElement("section", {
          className: className
        });

        if (props) {
          if (props.pageMargins) {
            elem.style.paddingLeft = props.pageMargins.left;
            elem.style.paddingRight = props.pageMargins.right;
            elem.style.paddingTop = props.pageMargins.top;
            elem.style.paddingBottom = props.pageMargins.bottom;
          }

          if (props.pageSize) {
            if (!this.options.ignoreWidth) elem.style.width = props.pageSize.width;
            if (!this.options.ignoreHeight) elem.style.minHeight = props.pageSize.height;
          }

          if (props.columns && props.columns.numberOfColumns) {
            elem.style.columnCount = "".concat(props.columns.numberOfColumns);
            elem.style.columnGap = props.columns.space;

            if (props.columns.separator) {
              elem.style.columnRule = "1px solid black";
            }
          }
        }

        return elem;
      }
    }, {
      key: "isPageBreakElement",
      value: function isPageBreakElement(elem) {
        if (elem.type != DomType.Break) return false;
        if (elem["break"] == "lastRenderedPageBreak") return !this.options.ignoreLastRenderedPageBreak;
        return elem["break"] == "page";
      }
    }]);

    return RenderBody;
  }(BasePart);

  var backJSON = {
    "code": 200,
    "data": [{
      "type": "documentPart",
      "props": {
        "type": "document",
        "children": [{
          "type": "paragraph",
          "children": [{
            "type": "run",
            "parent": null,
            "children": [{
              "type": "text",
              "text": "这是一个用来测试",
              "id": 11
            }],
            "cssStyle": {},
            "id": 4,
            "parent_id": 2
          }, {
            "type": "run",
            "parent": null,
            "children": [{
              "type": "text",
              "text": "nodejs",
              "id": 12
            }],
            "cssStyle": {},
            "id": 5,
            "parent_id": 2
          }, {
            "type": "run",
            "parent": null,
            "children": [{
              "type": "text",
              "text": "解析",
              "id": 13
            }],
            "cssStyle": {},
            "id": 6,
            "parent_id": 2
          }, {
            "type": "run",
            "parent": null,
            "children": [{
              "type": "text",
              "text": "Word",
              "id": 14
            }],
            "cssStyle": {},
            "id": 7,
            "parent_id": 2
          }, {
            "type": "run",
            "parent": null,
            "children": [{
              "type": "text",
              "text": "文档",
              "id": 15
            }],
            "cssStyle": {},
            "id": 8,
            "parent_id": 2
          }, {
            "type": "run",
            "parent": null,
            "children": [{
              "type": "text",
              "text": ".doccccc",
              "id": 16
            }],
            "cssStyle": {},
            "id": 9,
            "parent_id": 2
          }],
          "cssStyle": {},
          "runProps": {},
          "paragraph_text": "这是一个用来测试nodejs解析Word文档.doccccc",
          "id": 2
        }, {
          "type": "paragraph",
          "children": [{
            "type": "run",
            "parent": null,
            "children": [{
              "type": "text",
              "text": "This is a test for parsing the Word file in node.",
              "id": 17
            }],
            "id": 10,
            "parent_id": 3
          }],
          "cssStyle": {},
          "runProps": {},
          "paragraph_text": "This is a test for parsing the Word file in node.",
          "id": 3
        }],
        "props": {
          "pageSize": {
            "width": "595.30pt",
            "height": "841.90pt",
            "orientation": ""
          },
          "pageMargins": {
            "left": "90.00pt",
            "right": "90.00pt",
            "top": "72.00pt",
            "bottom": "72.00pt",
            "header": "42.55pt",
            "footer": "49.60pt",
            "gutter": "0.00pt"
          },
          "columns": {
            "numberOfColumns": null,
            "space": "36.00pt",
            "separator": null,
            "equalWidth": true,
            "columns": []
          }
        },
        "cssStyle": {},
        "id": 1
      },
      "path": "word/document.xml"
    }, {
      "type": "extendedPropsPart",
      "props": {
        "template": "Normal.dotm",
        "pages": 1,
        "words": 12,
        "characters": 69,
        "application": "Microsoft Office Word",
        "lines": 1,
        "paragraphs": 1,
        "company": "",
        "appVersion": "16.0000"
      },
      "path": "docProps/app.xml"
    }, {
      "type": "settingsPart",
      "props": {
        "defaultTabStop": "21.00pt"
      },
      "path": "word/settings.xml"
    }, {
      "type": "stylesPart",
      "props": [{
        "id": null,
        "name": null,
        "target": null,
        "basedOn": null,
        "styles": [{
          "target": "span",
          "values": {
            "font-family": "Calibri"
          }
        }]
      }, {
        "id": "Normal",
        "isDefault": true,
        "name": "Normal",
        "target": "p",
        "basedOn": null,
        "styles": [{
          "target": "p",
          "values": {
            "text-align": "justify"
          }
        }, {
          "target": "span",
          "values": {
            "min-height": "10.50pt",
            "font-size": "10.50pt"
          }
        }],
        "linked": null,
        "paragraphProps": {},
        "runProps": {
          "fontSize": "10.50pt"
        }
      }, {
        "id": "DefaultParagraphFont",
        "isDefault": true,
        "name": "Default Paragraph Font",
        "target": "span",
        "basedOn": null,
        "styles": [],
        "linked": null
      }, {
        "id": "TableNormal",
        "isDefault": true,
        "name": "Normal Table",
        "target": "table",
        "basedOn": null,
        "styles": [{
          "target": "td",
          "values": {
            "padding-top": "0.00pt",
            "padding-left": "5.40pt",
            "padding-bottom": "0.00pt",
            "padding-right": "5.40pt"
          }
        }],
        "linked": null
      }, {
        "id": "NoList",
        "isDefault": true,
        "name": "No List",
        "target": null,
        "basedOn": null,
        "styles": [],
        "linked": null
      }],
      "path": "word/styles.xml"
    }, {
      "type": "themePart",
      "props": {
        "colorScheme": {
          "name": "Office",
          "colors": {
            "dk1": "000000",
            "lt1": "FFFFFF",
            "dk2": "44546A",
            "lt2": "E7E6E6",
            "accent1": "4472C4",
            "accent2": "ED7D31",
            "accent3": "A5A5A5",
            "accent4": "FFC000",
            "accent5": "5B9BD5",
            "accent6": "70AD47",
            "hlink": "0563C1",
            "folHlink": "954F72"
          }
        },
        "fontScheme": {
          "name": "Office",
          "majorFont": {
            "latinTypeface": "Calibri Light",
            "eaTypeface": "",
            "csTypeface": ""
          },
          "minorFont": {
            "latinTypeface": "Calibri",
            "eaTypeface": "",
            "csTypeface": ""
          }
        }
      },
      "path": "word/theme/theme1.xml"
    }, {
      "type": "corePropsPart",
      "props": {
        "title": "",
        "description": "",
        "subject": "",
        "creator": "pc",
        "keywords": "",
        "language": null,
        "lastModifiedBy": "Stuart Watt",
        "revision": 2
      },
      "path": "docProps/core.xml"
    }, {
      "type": "fontTablePart",
      "props": [{
        "name": "Calibri",
        "embedFontRefs": [],
        "family": "swiss"
      }, {
        "name": "SimSun",
        "embedFontRefs": [],
        "altName": "宋体",
        "family": "auto"
      }, {
        "name": "Times New Roman",
        "embedFontRefs": [],
        "family": "roman"
      }, {
        "name": "Calibri Light",
        "embedFontRefs": [],
        "family": "swiss"
      }],
      "path": "word/fontTable.xml"
    }],
    "msg": "ok"
  };

  var HtmlRenderer = /*#__PURE__*/function () {
    function HtmlRenderer(htmlDocument) {
      _classCallCheck(this, HtmlRenderer);

      this.htmlDocument = htmlDocument;
    }
    /**
     * 渲染函数
     * @param {*} document wordDocumnetJson
     * @param {*} bodyContainer 最外层的容器
     * @param {*} styleContainer style标签的容器
     * @param {*} options 选项
     */


    _createClass(HtmlRenderer, [{
      key: "render",
      value: function render(document, bodyContainer, styleContainer, options) {
        if (styleContainer === void 0) {
          styleContainer = null;
        }

        styleContainer = styleContainer || bodyContainer;
        var className = options.className || 'docx';
        var styleMap = null,
            footnoteMap = null,
            endnoteMap = null,
            defaultTabSize = [];
        removeAllElements(styleContainer);
        removeAllElements(bodyContainer);
        appendComment(styleContainer, "docxjs library predefined styles");
        styleContainer.appendChild(renderDefaultStyle(className)); // 渲染主题

        if (document.themePart) {
          new RenderTheme(document.themePart, className).render(styleContainer);
        } // 渲染style part


        if (document.stylesPart != null) {
          styleMap = new RenderStyle(document.stylesPart, options).render(styleContainer);
        } // 编号


        if (document.numberingPart) {
          new RenderNumbering(document.numberingPart).render(styleContainer);
        } // 脚注


        if (document.footnotesPart) {
          footnoteMap = keyBy(document.footnotesPart.notes, function (x) {
            return x.id;
          });
        } // 尾注


        if (document.endnotesPart) {
          endnoteMap = keyBy(document.endnotesPart.notes, function (x) {
            return x.id;
          });
        } // 设置


        if (document.settingsPart) {
          defaultTabSize = document.settingsPart.props && document.settingsPart.props.defaultTabStop ? document.settingsPart.props.defaultTabStop : null;
        } // 字体样式合集


        if (!options.ignoreFonts && document.fontTablePart) {
          new RenderFontTable(document.fontTablePart).render(styleContainer);
        }

        new RenderBody(document.documentPart.props, options, styleMap, footnoteMap, endnoteMap, defaultTabSize).render(); // if (this.options.inWrapper) {
        //     bodyContainer.appendChild(this.renderWrapper(sectionElements));
        // } else {
        //     appendChildren(bodyContainer, sectionElements);
        // }
        // this.refreshTabStops();
      }
    }]);

    return HtmlRenderer;
  }();

  function arrayToObject(data) {
    var obj = {};

    var _iterator = _createForOfIteratorHelper(data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        obj[key.type] = key;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return obj;
  } // 测试


  new HtmlRenderer(window.htmlDocument).render(arrayToObject(backJSON.data), document.getElementById('docx'), null, {
    className: 'docx'
  });

}));
