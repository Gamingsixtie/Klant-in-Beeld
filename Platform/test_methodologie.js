(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component4.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component4(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function noop() {
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, props, owner, debugStack, debugTask) {
          var refProp = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            oldElement.props,
            oldElement._owner,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function validateChildKeys(node) {
          isValidElement2(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement2(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement2(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = false;
          if (null === children) invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement2(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement2(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ioInfo = payload._ioInfo;
            null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
            ioInfo = payload._result;
            var thenable = ioInfo();
            thenable.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 1;
                  payload._result = moduleObject;
                  var _ioInfo = payload._ioInfo;
                  null != _ioInfo && (_ioInfo.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
                }
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 2;
                  payload._result = error;
                  var _ioInfo2 = payload._ioInfo;
                  null != _ioInfo2 && (_ioInfo2.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              }
            );
            ioInfo = payload._ioInfo;
            if (null != ioInfo) {
              ioInfo.value = thenable;
              var displayName = thenable.displayName;
              "string" === typeof displayName && (ioInfo.name = displayName);
            }
            -1 === payload._status && (payload._status = 0, payload._result = thenable);
          }
          if (1 === payload._status)
            return ioInfo = payload._result, void 0 === ioInfo && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ioInfo
            ), "default" in ioInfo || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ioInfo
            ), ioInfo.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function releaseAsyncTransition() {
          ReactSharedInternals.asyncTransitions--;
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component4.prototype.isReactComponent = {};
        Component4.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component4.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        };
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component4.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component4.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          actQueue: null,
          asyncTransitions: 0,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
          deprecatedAPIs,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        var fnName = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement2(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Activity = REACT_ACTIVITY_TYPE;
        exports.Children = fnName;
        exports.Component = Component4;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.cacheSignal = function() {
          return null;
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            props,
            owner,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            validateChildKeys(arguments[key]);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i]);
          i = {};
          var key = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength) i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          key && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            key,
            i,
            getOwner(),
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement2;
        exports.lazy = function(ctor) {
          ctor = { _status: -1, _result: ctor };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: ctor,
            _init: lazyInitializer
          }, ioInfo = {
            name: "lazy",
            start: -1,
            end: -1,
            value: null,
            owner: null,
            debugStack: Error("react-stack-top-frame"),
            debugTask: console.createTask ? console.createTask("lazy()") : null
          };
          ctor._ioInfo = ioInfo;
          lazyType._debugInfo = [{ awaited: ioInfo }];
          return lazyType;
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
              "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
            ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create2, deps) {
          null == create2 && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useEffect(create2, deps);
        };
        exports.useEffectEvent = function(callback) {
          return resolveDispatcher().useEffectEvent(callback);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create2, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create2, deps);
        };
        exports.useInsertionEffect = function(create2, deps) {
          null == create2 && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create2, deps);
        };
        exports.useLayoutEffect = function(create2, deps) {
          null == create2 && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create2, deps);
        };
        exports.useMemo = function(create2, deps) {
          return resolveDispatcher().useMemo(create2, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.2.3";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // src/pages/Methodologie.jsx
  var import_react4 = __toESM(require_react(), 1);

  // node_modules/zustand/esm/vanilla.mjs
  var createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace2) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace2 != null ? replace2 : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState = () => state;
    const getInitialState = () => initialState;
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const api = { setState, getState, getInitialState, subscribe };
    const initialState = state = createState(setState, getState, api);
    return api;
  };
  var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

  // node_modules/zustand/esm/react.mjs
  var import_react = __toESM(require_react(), 1);
  var identity = (arg) => arg;
  function useStore(api, selector = identity) {
    const slice = import_react.default.useSyncExternalStore(
      api.subscribe,
      import_react.default.useCallback(() => selector(api.getState()), [api, selector]),
      import_react.default.useCallback(() => selector(api.getInitialState()), [api, selector])
    );
    import_react.default.useDebugValue(slice);
    return slice;
  }
  var createImpl = (createState) => {
    const api = createStore(createState);
    const useBoundStore = (selector) => useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
  };
  var create = ((createState) => createState ? createImpl(createState) : createImpl);

  // node_modules/zustand/esm/middleware.mjs
  function createJSONStorage(getStorage, options) {
    let storage;
    try {
      storage = getStorage();
    } catch (e) {
      return;
    }
    const persistStorage = {
      getItem: (name) => {
        var _a;
        const parse = (str2) => {
          if (str2 === null) {
            return null;
          }
          return JSON.parse(str2, options == null ? void 0 : options.reviver);
        };
        const str = (_a = storage.getItem(name)) != null ? _a : null;
        if (str instanceof Promise) {
          return str.then(parse);
        }
        return parse(str);
      },
      setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
      removeItem: (name) => storage.removeItem(name)
    };
    return persistStorage;
  }
  var toThenable = (fn) => (input) => {
    try {
      const result = fn(input);
      if (result instanceof Promise) {
        return result;
      }
      return {
        then(onFulfilled) {
          return toThenable(onFulfilled)(result);
        },
        catch(_onRejected) {
          return this;
        }
      };
    } catch (e) {
      return {
        then(_onFulfilled) {
          return this;
        },
        catch(onRejected) {
          return toThenable(onRejected)(e);
        }
      };
    }
  };
  var persistImpl = (config, baseOptions) => (set, get, api) => {
    let options = {
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => state,
      version: 0,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState
      }),
      ...baseOptions
    };
    let hasHydrated = false;
    const hydrationListeners = /* @__PURE__ */ new Set();
    const finishHydrationListeners = /* @__PURE__ */ new Set();
    let storage = options.storage;
    if (!storage) {
      return config(
        (...args) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
          );
          set(...args);
        },
        get,
        api
      );
    }
    const setItem = () => {
      const state = options.partialize({ ...get() });
      return storage.setItem(options.name, {
        state,
        version: options.version
      });
    };
    const savedSetState = api.setState;
    api.setState = (state, replace2) => {
      savedSetState(state, replace2);
      return setItem();
    };
    const configResult = config(
      (...args) => {
        set(...args);
        return setItem();
      },
      get,
      api
    );
    api.getInitialState = () => configResult;
    let stateFromStorage;
    const hydrate = () => {
      var _a, _b;
      if (!storage) return;
      hasHydrated = false;
      hydrationListeners.forEach((cb) => {
        var _a2;
        return cb((_a2 = get()) != null ? _a2 : configResult);
      });
      const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
      return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
        if (deserializedStorageValue) {
          if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
            if (options.migrate) {
              const migration = options.migrate(
                deserializedStorageValue.state,
                deserializedStorageValue.version
              );
              if (migration instanceof Promise) {
                return migration.then((result) => [true, result]);
              }
              return [true, migration];
            }
            console.error(
              `State loaded from storage couldn't be migrated since no migrate function was provided`
            );
          } else {
            return [false, deserializedStorageValue.state];
          }
        }
        return [false, void 0];
      }).then((migrationResult) => {
        var _a2;
        const [migrated, migratedState] = migrationResult;
        stateFromStorage = options.merge(
          migratedState,
          (_a2 = get()) != null ? _a2 : configResult
        );
        set(stateFromStorage, true);
        if (migrated) {
          return setItem();
        }
      }).then(() => {
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
        stateFromStorage = get();
        hasHydrated = true;
        finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
      }).catch((e) => {
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
      });
    };
    api.persist = {
      setOptions: (newOptions) => {
        options = {
          ...options,
          ...newOptions
        };
        if (newOptions.storage) {
          storage = newOptions.storage;
        }
      },
      clearStorage: () => {
        storage == null ? void 0 : storage.removeItem(options.name);
      },
      getOptions: () => options,
      rehydrate: () => hydrate(),
      hasHydrated: () => hasHydrated,
      onHydrate: (cb) => {
        hydrationListeners.add(cb);
        return () => {
          hydrationListeners.delete(cb);
        };
      },
      onFinishHydration: (cb) => {
        finishHydrationListeners.add(cb);
        return () => {
          finishHydrationListeners.delete(cb);
        };
      }
    };
    if (!options.skipHydration) {
      hydrate();
    }
    return stateFromStorage || configResult;
  };
  var persist = persistImpl;

  // src/data/methodologie.js
  var levensloopcycli = [
    {
      id: "verkennen",
      nummer: 1,
      naam: "Verkennen",
      beschrijving: "Kiezen om de opgave wel of niet aan te pakken als programma",
      duur: "Weken tot maanden",
      kernvraag: "Is dit echt een programma?",
      goNogo: "Sponsorgroep keurt programmavoorstel goed \u2192 Start Opbouw",
      resultaten: [
        "Initi\xEBle visie op de opgave",
        "Programmavoorstel",
        "Initi\xEBle businesscase",
        "Opbouwplan",
        "Go/No-go beslissing"
      ]
    },
    {
      id: "opbouwen",
      nummer: 2,
      naam: "Opbouwen",
      beschrijving: "Programma concreet inrichten zodat betrokkenen zich eraan verbinden",
      duur: "Maanden",
      kernvraag: "Hoe gaan we dit doen?",
      goNogo: "Eigenaar keurt programmaplan goed \u2192 Start Uitvoering",
      resultaten: [
        "Programmaplan",
        "Businesscase (uitgewerkt)",
        "Eerste cyclusplan",
        "Go/No-go op uitvoering"
      ]
    },
    {
      id: "uitvoeren",
      nummer: 3,
      naam: "Uitvoeren",
      beschrijving: "Realiseren van inspanningen, vermogens en baten",
      duur: "Jaren (in cycli van 6-9 maanden)",
      kernvraag: "Hoe houden we koers?",
      goNogo: "Einde cyclus: balans, reflectie, GO volgende cyclus of afbouw",
      resultaten: [
        "Cyclusplannen",
        "Voortgangsrapportages",
        "Bijstellingen",
        "Gerealiseerde baten"
      ]
    },
    {
      id: "afbouwen",
      nummer: 4,
      naam: "Afbouwen",
      beschrijving: "Zorgvuldig afronden, borging van opbrengsten",
      duur: "Maanden",
      kernvraag: "Zijn baten bereikt? Is organisatie klaar voor overdracht?",
      goNogo: "Sponsorgroep keurt afbouwplan goed \u2192 Afsluiting",
      resultaten: [
        "Programmareview",
        "Afbouwplan",
        "Afrondingsdocument",
        "Dechargedocument"
      ]
    }
  ];
  var themas = [
    {
      id: "kiezen",
      nummer: 1,
      naam: "Kiezen",
      subtitel: "Wel of niet programmatisch?",
      beschrijving: "Bepalen of de opgave geschikt is voor programma-aanpak",
      kleur: "#3b82f6",
      // blue
      icon: "CheckSquare",
      hoofdstukken: ["H1-H6"],
      kernvragen: [
        "Wat is de aard van de opgave?",
        "Zijn er meerdere afhankelijke baten?",
        "Zijn er meerdere organisatieonderdelen betrokken?",
        "Is dit meerjarig en strategisch?"
      ]
    },
    {
      id: "vormgeven",
      nummer: 2,
      naam: "Vormgeven",
      subtitel: "Visie, doelen, strategie",
      beschrijving: "Het programma inhoudelijk vormgeven met visie en doelen",
      kleur: "#8b5cf6",
      // purple
      icon: "Lightbulb",
      hoofdstukken: ["H7-H12"],
      kernvragen: [
        "Wat is de visie en ambitie?",
        "Welke baten willen we realiseren?",
        "Wat is de strategie/routekaart?",
        "Wat is de businesscase?"
      ]
    },
    {
      id: "organiseren",
      nummer: 3,
      naam: "Organiseren",
      subtitel: "Rollen, structuur, teams",
      beschrijving: "De organisatiestructuur en rollen inrichten",
      kleur: "#ec4899",
      // pink
      icon: "Users",
      hoofdstukken: ["H13-H16"],
      kernvragen: [
        "Wie is programma-eigenaar?",
        "Wie zijn de bateneigenaren?",
        "Hoe organiseren we de inspanningen?",
        "Wat is de governance-structuur?"
      ]
    },
    {
      id: "sturen",
      nummer: 4,
      naam: "Sturen",
      subtitel: "Plannen, monitoren, bijsturen",
      beschrijving: "Het programma op koers houden door sturing",
      kleur: "#f59e0b",
      // amber
      icon: "Compass",
      hoofdstukken: ["H17-H22"],
      kernvragen: [
        "Hoe monitoren we voortgang?",
        "Welke stuurparameters gebruiken we?",
        "Hoe rapporteren we?",
        "Wanneer en hoe sturen we bij?"
      ]
    },
    {
      id: "beslissen",
      nummer: 5,
      naam: "Beslissen",
      subtitel: "Wie beslist wat?",
      beschrijving: "Besluitvormingsstructuur en -processen",
      kleur: "#ef4444",
      // red
      icon: "Scale",
      hoofdstukken: ["H23-H25"],
      kernvragen: [
        "Wie beslist over wat?",
        "Hoe nemen we besluiten?",
        "Hoe leggen we besluiten vast?",
        "Wat zijn de Go/No-Go momenten?"
      ]
    },
    {
      id: "samenwerken",
      nummer: 6,
      naam: "Samenwerken",
      subtitel: "Stakeholders, communicatie",
      beschrijving: "Effectief samenwerken met alle betrokkenen",
      kleur: "#10b981",
      // emerald
      icon: "Handshake",
      hoofdstukken: ["H26-H29"],
      kernvragen: [
        "Wie zijn de stakeholders?",
        "Hoe managen we verwachtingen?",
        "Hoe communiceren we?",
        "Hoe gaan we om met weerstand?"
      ]
    },
    {
      id: "leiden",
      nummer: 7,
      naam: "Leiden",
      subtitel: "Leiderschap, eigenaarschap",
      beschrijving: "Leiderschap tonen en eigenaarschap stimuleren",
      kleur: "#6366f1",
      // indigo
      icon: "Crown",
      hoofdstukken: ["H30-H32"],
      kernvragen: [
        "Welk leiderschap is nodig?",
        "Hoe stimuleren we eigenaarschap?",
        "Hoe gaan we om met macht?",
        "Hoe bouwen we vertrouwen?"
      ]
    },
    {
      id: "ontwikkelen",
      nummer: 8,
      naam: "Ontwikkelen",
      subtitel: "Leren, verbeteren",
      beschrijving: "Continu leren en verbeteren als programma",
      kleur: "#14b8a6",
      // teal
      icon: "TrendingUp",
      hoofdstukken: ["H33-H35"],
      kernvragen: [
        "Hoe organiseren we leren?",
        "Welke reflectiemomenten plannen we?",
        "Hoe verbeteren we onze aanpak?",
        "Hoe borgen we kennis?"
      ]
    }
  ];
  var activiteiten = [
    // THEMA 1: KIEZEN
    // Verkennen
    {
      id: "k-v-1",
      themaId: "kiezen",
      cyclusId: "verkennen",
      naam: "Opgave verkennen",
      beschrijving: "Analyseer de huidige situatie en het vraagstuk",
      volgorde: 1,
      deliverables: ["Probleemanalyse", "Contextbeschrijving"],
      checklistItems: [
        "Huidige situatie beschreven",
        "Urgentie en belang bepaald",
        "Scope afgebakend"
      ]
    },
    {
      id: "k-v-2",
      themaId: "kiezen",
      cyclusId: "verkennen",
      naam: "Programma-criteria toetsen",
      beschrijving: "Bepaal of dit een programma-aanpak vereist",
      volgorde: 2,
      deliverables: ["Toetsing 6 criteria", "Advies werkwijze"],
      checklistItems: [
        "Meerdere baten ge\xEFdentificeerd",
        "Meerdere organisatieonderdelen betrokken",
        "Afhankelijkheden in kaart",
        "Meerjarig en strategisch bevestigd"
      ]
    },
    {
      id: "k-v-3",
      themaId: "kiezen",
      cyclusId: "verkennen",
      naam: "Programmavoorstel opstellen",
      beschrijving: "Stel het programmavoorstel op voor besluitvorming",
      volgorde: 3,
      deliverables: ["Programmavoorstel"],
      checklistItems: [
        "Visie en ambitie beschreven",
        "Globale scope en aanpak",
        "Eerste inschatting middelen",
        "Voorstel governance"
      ]
    },
    {
      id: "k-v-4",
      themaId: "kiezen",
      cyclusId: "verkennen",
      naam: "Go/No-Go Verkenning",
      beschrijving: "Verkrijg besluit van sponsorgroep om door te gaan",
      volgorde: 4,
      deliverables: ["Go/No-Go besluit", "Opbouwopdracht"],
      checklistItems: [
        "Sponsorgroep ge\xEFnformeerd",
        "Besluit genomen en vastgelegd",
        "Opbouwopdracht verstrekt (bij GO)"
      ],
      isGoNogo: true
    },
    // THEMA 2: VORMGEVEN
    // Verkennen
    {
      id: "v-v-1",
      themaId: "vormgeven",
      cyclusId: "verkennen",
      naam: "Initi\xEBle visie ontwikkelen",
      beschrijving: "Formuleer een eerste visie op de gewenste situatie",
      volgorde: 1,
      deliverables: ["Visieschets"],
      checklistItems: [
        "Gewenste eindsituatie beschreven",
        "Kernwaarden ge\xEFdentificeerd"
      ]
    },
    {
      id: "v-v-2",
      themaId: "vormgeven",
      cyclusId: "verkennen",
      naam: "Globale baten identificeren",
      beschrijving: "Identificeer de belangrijkste baten op hoofdlijnen",
      volgorde: 2,
      deliverables: ["Initi\xEBle batenlijst"],
      checklistItems: [
        "Hoofdbaten ge\xEFdentificeerd",
        "Per domein bekeken (MPSC)"
      ]
    },
    // Opbouwen
    {
      id: "v-o-1",
      themaId: "vormgeven",
      cyclusId: "opbouwen",
      naam: "Visie en ambitie uitwerken",
      beschrijving: "Werk de visie uit tot een gedragen ambitie",
      volgorde: 1,
      deliverables: ["Visiedocument", "Ambitiebeschrijving"],
      checklistItems: [
        "Visie uitgewerkt en gevalideerd",
        "Ambitie SMART geformuleerd",
        "Draagvlak bij stakeholders"
      ]
    },
    {
      id: "v-o-2",
      themaId: "vormgeven",
      cyclusId: "opbouwen",
      naam: "Batenstructuur opstellen",
      beschrijving: "Maak de volledige batenstructuur met indicatoren",
      volgorde: 2,
      deliverables: ["Batenstructuur", "KPI-definities"],
      checklistItems: [
        "Domeinbaten gedefinieerd",
        "Sectorbaten gedefinieerd",
        "Indicatoren en doelwaarden vastgesteld",
        "Bateneigenaren toegewezen"
      ]
    },
    {
      id: "v-o-3",
      themaId: "vormgeven",
      cyclusId: "opbouwen",
      naam: "Businesscase uitwerken",
      beschrijving: "Maak de businesscase met kosten en baten",
      volgorde: 3,
      deliverables: ["Businesscase"],
      checklistItems: [
        "Kosten geschat",
        "Baten gekwantificeerd",
        "Terugverdientijd berekend",
        "Risicos ge\xEFdentificeerd"
      ]
    },
    {
      id: "v-o-4",
      themaId: "vormgeven",
      cyclusId: "opbouwen",
      naam: "Routekaart ontwikkelen",
      beschrijving: "Stel de meerjarige routekaart op",
      volgorde: 4,
      deliverables: ["Routekaart/Roadmap"],
      checklistItems: [
        "Fases gedefinieerd",
        "Mijlpalen bepaald",
        "Afhankelijkheden in kaart"
      ]
    },
    {
      id: "v-o-5",
      themaId: "vormgeven",
      cyclusId: "opbouwen",
      naam: "Programmaplan afronden",
      beschrijving: "Consolideer alles in het programmaplan",
      volgorde: 5,
      deliverables: ["Programmaplan"],
      checklistItems: [
        "Alle onderdelen ge\xEFntegreerd",
        "Review uitgevoerd",
        "Goedkeuring verkregen"
      ]
    },
    // THEMA 3: ORGANISEREN
    // Verkennen
    {
      id: "o-v-1",
      themaId: "organiseren",
      cyclusId: "verkennen",
      naam: "Kernrollen identificeren",
      beschrijving: "Bepaal wie eigenaar en manager worden",
      volgorde: 1,
      deliverables: ["Rolbeschrijving PE en PM"],
      checklistItems: [
        "Programma-eigenaar ge\xEFdentificeerd",
        "Programmamanager ge\xEFdentificeerd"
      ]
    },
    // Opbouwen
    {
      id: "o-o-1",
      themaId: "organiseren",
      cyclusId: "opbouwen",
      naam: "Governance-structuur ontwerpen",
      beschrijving: "Ontwerp de volledige governance-structuur",
      volgorde: 1,
      deliverables: ["Governance-schema", "Organigram"],
      checklistItems: [
        "Sponsorgroep samengesteld",
        "Bateneigenaren benoemd",
        "Overlegstructuur bepaald"
      ]
    },
    {
      id: "o-o-2",
      themaId: "organiseren",
      cyclusId: "opbouwen",
      naam: "Inspanningen defini\xEBren",
      beschrijving: "Definieer alle inspanningen (projecten, processen, etc.)",
      volgorde: 2,
      deliverables: ["Inspanningsoverzicht"],
      checklistItems: [
        "Projecten gedefinieerd",
        "Procesinspanningen gedefinieerd",
        "Leertrajecten gedefinieerd",
        "Systeemtrajecten gedefinieerd",
        "Inspanningsleiders toegewezen"
      ]
    },
    {
      id: "o-o-3",
      themaId: "organiseren",
      cyclusId: "opbouwen",
      naam: "RACI-matrix opstellen",
      beschrijving: "Maak de RACI-matrix voor alle beslissingen",
      volgorde: 3,
      deliverables: ["RACI-matrix"],
      checklistItems: [
        "Activiteiten/beslissingen ge\xEFdentificeerd",
        "RACI per activiteit bepaald",
        "Gevalideerd met betrokkenen"
      ]
    },
    // THEMA 4: STUREN
    // Opbouwen
    {
      id: "s-o-1",
      themaId: "sturen",
      cyclusId: "opbouwen",
      naam: "Stuurparameters bepalen",
      beschrijving: "Bepaal de 5 stuurparameters en hoe te meten",
      volgorde: 1,
      deliverables: ["Stuurparameters-definitie"],
      checklistItems: [
        "Doeltreffendheid gedefinieerd",
        "Tempo gedefinieerd",
        "Haalbaarheid gedefinieerd",
        "Wendbaarheid gedefinieerd",
        "Effici\xEBntie gedefinieerd"
      ]
    },
    {
      id: "s-o-2",
      themaId: "sturen",
      cyclusId: "opbouwen",
      naam: "Dashboard ontwerpen",
      beschrijving: "Ontwerp het stuurdashboard",
      volgorde: 2,
      deliverables: ["Dashboard-ontwerp"],
      checklistItems: [
        "KPIs geselecteerd",
        "Stuurlampen gedefinieerd",
        "Rapportageformat bepaald"
      ]
    },
    {
      id: "s-o-3",
      themaId: "sturen",
      cyclusId: "opbouwen",
      naam: "Eerste cyclusplan maken",
      beschrijving: "Maak het plan voor de eerste uitvoeringscyclus",
      volgorde: 3,
      deliverables: ["Cyclusplan 1"],
      checklistItems: [
        "Doelen cyclus 1 bepaald",
        "Inspanningen gepland",
        "Resources toegewezen",
        "Mijlpalen vastgesteld"
      ]
    },
    // Uitvoeren
    {
      id: "s-u-1",
      themaId: "sturen",
      cyclusId: "uitvoeren",
      naam: "Voortgang monitoren",
      beschrijving: "Monitor de voortgang op alle parameters",
      volgorde: 1,
      deliverables: ["Voortgangsrapportage"],
      checklistItems: [
        "Data verzameld",
        "Stuurlampen bijgewerkt",
        "Afwijkingen geanalyseerd"
      ],
      isCyclisch: true
    },
    {
      id: "s-u-2",
      themaId: "sturen",
      cyclusId: "uitvoeren",
      naam: "Bijsturen waar nodig",
      beschrijving: "Neem bijsturingsmaatregelen",
      volgorde: 2,
      deliverables: ["Bijsturingsacties"],
      checklistItems: [
        "Oorzaken geanalyseerd",
        "Maatregelen bepaald",
        "Acties uitgezet"
      ],
      isCyclisch: true
    },
    {
      id: "s-u-3",
      themaId: "sturen",
      cyclusId: "uitvoeren",
      naam: "Cyclus-evaluatie uitvoeren",
      beschrijving: "Evalueer de afgelopen cyclus",
      volgorde: 3,
      deliverables: ["Cyclus-evaluatie", "Volgend cyclusplan"],
      checklistItems: [
        "Resultaten ge\xEBvalueerd",
        "Lessen geleerd",
        "Volgende cyclus gepland"
      ],
      isCyclisch: true,
      isGoNogo: true
    },
    // THEMA 5: BESLISSEN
    // Opbouwen
    {
      id: "b-o-1",
      themaId: "beslissen",
      cyclusId: "opbouwen",
      naam: "Besluitvormingsstructuur ontwerpen",
      beschrijving: "Bepaal wie over wat beslist",
      volgorde: 1,
      deliverables: ["Besluitvormingsmatrix"],
      checklistItems: [
        "Besluiten ge\xEFnventariseerd",
        "Beslissers per type bepaald",
        "Escalatiepad vastgesteld"
      ]
    },
    {
      id: "b-o-2",
      themaId: "beslissen",
      cyclusId: "opbouwen",
      naam: "Go/No-Go momenten plannen",
      beschrijving: "Plan alle Go/No-Go momenten",
      volgorde: 2,
      deliverables: ["Go/No-Go kalender"],
      checklistItems: [
        "Momenten ge\xEFdentificeerd",
        "Criteria per moment bepaald",
        "In planning opgenomen"
      ]
    },
    {
      id: "b-o-3",
      themaId: "beslissen",
      cyclusId: "opbouwen",
      naam: "Go/No-Go Opbouw",
      beschrijving: "Verkrijg besluit om te starten met uitvoering",
      volgorde: 3,
      deliverables: ["Go/No-Go besluit uitvoering"],
      checklistItems: [
        "Programmaplan gepresenteerd",
        "Businesscase goedgekeurd",
        "Resources vrijgemaakt",
        "Besluit vastgelegd"
      ],
      isGoNogo: true
    },
    // THEMA 6: SAMENWERKEN
    // Opbouwen
    {
      id: "sw-o-1",
      themaId: "samenwerken",
      cyclusId: "opbouwen",
      naam: "Stakeholderanalyse uitvoeren",
      beschrijving: "Breng alle stakeholders in kaart",
      volgorde: 1,
      deliverables: ["Stakeholderanalyse", "Stakeholdermatrix"],
      checklistItems: [
        "Stakeholders ge\xEFdentificeerd",
        "Belangen in kaart gebracht",
        "Invloed en houding bepaald"
      ]
    },
    {
      id: "sw-o-2",
      themaId: "samenwerken",
      cyclusId: "opbouwen",
      naam: "Communicatieplan opstellen",
      beschrijving: "Maak het communicatieplan",
      volgorde: 2,
      deliverables: ["Communicatieplan"],
      checklistItems: [
        "Doelgroepen bepaald",
        "Boodschappen geformuleerd",
        "Kanalen gekozen",
        "Frequentie bepaald"
      ]
    },
    // THEMA 7: LEIDEN
    // Opbouwen
    {
      id: "l-o-1",
      themaId: "leiden",
      cyclusId: "opbouwen",
      naam: "Leiderschapsstijl bepalen",
      beschrijving: "Bepaal welk leiderschap nodig is",
      volgorde: 1,
      deliverables: ["Leiderschapsvisie"],
      checklistItems: [
        "Situatie geanalyseerd",
        "Stijl gekozen",
        "Afspraken gemaakt"
      ]
    },
    // THEMA 8: ONTWIKKELEN
    // Opbouwen
    {
      id: "on-o-1",
      themaId: "ontwikkelen",
      cyclusId: "opbouwen",
      naam: "Leerplan opstellen",
      beschrijving: "Plan de leermomenten en reflecties",
      volgorde: 1,
      deliverables: ["Leerplan"],
      checklistItems: [
        "Reflectiemomenten gepland",
        "Leervragen geformuleerd",
        "Kennisborging bepaald"
      ]
    },
    // Uitvoeren
    {
      id: "on-u-1",
      themaId: "ontwikkelen",
      cyclusId: "uitvoeren",
      naam: "Reflectiesessies uitvoeren",
      beschrijving: "Voer geplande reflecties uit",
      volgorde: 1,
      deliverables: ["Reflectieverslag"],
      checklistItems: [
        "Sessie voorbereid",
        "Sessie uitgevoerd",
        "Lessen vastgelegd"
      ],
      isCyclisch: true
    },
    // AFBOUWEN - voor alle relevante thema's
    {
      id: "af-1",
      themaId: "sturen",
      cyclusId: "afbouwen",
      naam: "Eindmeting uitvoeren",
      beschrijving: "Voer de eindmeting van alle KPIs uit",
      volgorde: 1,
      deliverables: ["Eindmeting KPIs"],
      checklistItems: [
        "Alle KPIs gemeten",
        "Vergeleken met doelwaarden",
        "Analyse opgesteld"
      ]
    },
    {
      id: "af-2",
      themaId: "vormgeven",
      cyclusId: "afbouwen",
      naam: "Batenrealisatie evalueren",
      beschrijving: "Evalueer welke baten zijn gerealiseerd",
      volgorde: 2,
      deliverables: ["Batenevaluatie"],
      checklistItems: [
        "Per baat ge\xEBvalueerd",
        "Realisatiegraad bepaald",
        "Resterende acties ge\xEFdentificeerd"
      ]
    },
    {
      id: "af-3",
      themaId: "organiseren",
      cyclusId: "afbouwen",
      naam: "Overdracht organiseren",
      beschrijving: "Organiseer overdracht naar de lijn",
      volgorde: 3,
      deliverables: ["Overdrachtsplan", "Overdrachtsdocument"],
      checklistItems: [
        "Ontvanger bepaald",
        "Kennisoverdracht gepland",
        "Documentatie compleet"
      ]
    },
    {
      id: "af-4",
      themaId: "beslissen",
      cyclusId: "afbouwen",
      naam: "Programma afsluiten",
      beschrijving: "Formele afsluiting en decharge",
      volgorde: 4,
      deliverables: ["Afrondingsdocument", "Dechargedocument"],
      checklistItems: [
        "Eindevaluatie uitgevoerd",
        "Lessen gedocumenteerd",
        "Decharge verleend"
      ],
      isGoNogo: true
    }
  ];
  var documentTemplates = [
    // ==================== VERKENNEN ====================
    {
      id: "doc-1",
      naam: "Verkenningsopdracht",
      cyclusId: "verkennen",
      themaId: "kiezen",
      verplicht: true,
      beschrijving: "Document waarmee het verkenningsstadium officieel start",
      templateBestand: "20240517-Werken-aan-Programmas-Template-verkenningsopdracht.docx"
    },
    {
      id: "doc-2",
      naam: "Programmavoorstel",
      cyclusId: "verkennen",
      themaId: "kiezen",
      verplicht: true,
      beschrijving: "Eerste beeld van opgave, visie en globale aanpak",
      templateBestand: "20240517-Werken-aan-Programmas-Template-programmavoorstel.docx"
    },
    {
      id: "doc-3",
      naam: "Visiedocument",
      cyclusId: "verkennen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Gedragen visie met verleden, heden, beweeg-redenen en toekomst",
      templateBestand: "20240521-Werken-aan-Programmas-Template-visiestatement.docx"
    },
    {
      id: "doc-4",
      naam: "Initi\xEBle Businesscase",
      cyclusId: "verkennen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Eerste inschatting van kosten, baten en haalbaarheid",
      templateBestand: "20240517-Werken-aan-Programmas-Template-business-case.docx"
    },
    {
      id: "doc-5",
      naam: "Opbouwopdracht",
      cyclusId: "verkennen",
      themaId: "kiezen",
      verplicht: true,
      beschrijving: "Goedkeuring om door te gaan naar opbouwstadium",
      templateBestand: "20240517-Werken-aan-Programmas-Template-opbouwplan.docx"
    },
    // ==================== OPBOUWEN ====================
    {
      id: "doc-6",
      naam: "Programmaplan",
      cyclusId: "opbouwen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Volledig uitgewerkt plan voor het programma",
      templateBestand: "20250422-Werken-aan-Programmas-Template-programmaplan.docx"
    },
    {
      id: "doc-7",
      naam: "Businesscase (uitgewerkt)",
      cyclusId: "opbouwen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Volledige kosten-batenanalyse en zakelijke rechtvaardiging",
      templateBestand: "20240517-Werken-aan-Programmas-Template-business-case.docx"
    },
    {
      id: "doc-8",
      naam: "Doelen-Inspanningennetwerk (DIN)",
      cyclusId: "opbouwen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Visualisatie samenhang tussen visie, doelen, baten, vermogens en inspanningen"
    },
    {
      id: "doc-9",
      naam: "Beschrijving Vermogens",
      cyclusId: "opbouwen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Uitwerking van de te ontwikkelen capabilities",
      templateBestand: "20240517-Werken-aan-Programmas-Template-beschrijving-vermogens.docx"
    },
    {
      id: "doc-10",
      naam: "Batenstructuur",
      cyclusId: "opbouwen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Overzicht van alle baten met indicatoren en eigenaren",
      templateBestand: "20240517-Werken-aan-Programmas-Template-batenprofiel.docx"
    },
    {
      id: "doc-11",
      naam: "Batenrealisatieplan",
      cyclusId: "opbouwen",
      themaId: "sturen",
      verplicht: true,
      beschrijving: "Planning wanneer welke baten tot welk niveau gerealiseerd worden"
    },
    {
      id: "doc-12",
      naam: "Routekaart/Roadmap",
      cyclusId: "opbouwen",
      themaId: "vormgeven",
      verplicht: true,
      beschrijving: "Meerjarige planning met plateaus en mijlpalen"
    },
    {
      id: "doc-13",
      naam: "Governance-schema",
      cyclusId: "opbouwen",
      themaId: "organiseren",
      verplicht: true,
      beschrijving: "Organigram met rollen, verantwoordelijkheden en overlegstructuur"
    },
    {
      id: "doc-14",
      naam: "Inspanningsoverzicht",
      cyclusId: "opbouwen",
      themaId: "organiseren",
      verplicht: true,
      beschrijving: "Overzicht van alle projecten, processen en andere inspanningen"
    },
    {
      id: "doc-15",
      naam: "Projectplan",
      cyclusId: "opbouwen",
      themaId: "organiseren",
      verplicht: false,
      beschrijving: "Plan per individueel project binnen het programma",
      templateBestand: "20240524-Werken-aan-Programmas-Template-projectplan.docx"
    },
    {
      id: "doc-16",
      naam: "RACI-matrix",
      cyclusId: "opbouwen",
      themaId: "organiseren",
      verplicht: true,
      beschrijving: "Wie is Responsible, Accountable, Consulted, Informed"
    },
    {
      id: "doc-17",
      naam: "Afhankelijkhedenlog",
      cyclusId: "opbouwen",
      themaId: "organiseren",
      verplicht: false,
      beschrijving: "Register van afhankelijkheden tussen inspanningen",
      templateBestand: "20240517-Werken-aan-Programmas-Template-afhankelijkhedenlog.xlsx"
    },
    {
      id: "doc-18",
      naam: "Cyclusplan",
      cyclusId: "opbouwen",
      themaId: "sturen",
      verplicht: true,
      beschrijving: "Gedetailleerd plan voor de komende cyclus",
      templateBestand: "20240517-Werken-aan-Programmas-Template-cyclusplan.docx"
    },
    {
      id: "doc-19",
      naam: "Stakeholderanalyse",
      cyclusId: "opbouwen",
      themaId: "samenwerken",
      verplicht: true,
      beschrijving: "Analyse van stakeholders, belangen en be\xEFnvloedingsstrategie"
    },
    {
      id: "doc-20",
      naam: "Communicatieplan",
      cyclusId: "opbouwen",
      themaId: "samenwerken",
      verplicht: false,
      beschrijving: "Plan voor interne en externe communicatie"
    },
    {
      id: "doc-21",
      naam: "Leerplan",
      cyclusId: "opbouwen",
      themaId: "ontwikkelen",
      verplicht: false,
      beschrijving: "Plan voor leermomenten, reflecties en kennisborging"
    },
    // ==================== UITVOEREN ====================
    {
      id: "doc-22",
      naam: "Voortgangsrapportage",
      cyclusId: "uitvoeren",
      themaId: "sturen",
      verplicht: true,
      beschrijving: "Periodieke rapportage over voortgang en stuurparameters",
      templateBestand: "20240517-Werken-aan-Programmas-Template-voortgangsrapportage-programma.docx"
    },
    {
      id: "doc-23",
      naam: "Risicolog",
      cyclusId: "uitvoeren",
      themaId: "sturen",
      verplicht: true,
      beschrijving: "Register van risico's met beoordeling en maatregelen",
      templateBestand: "20240517-Werken-aan-Programmas-Template-risicolog.xlsx"
    },
    {
      id: "doc-24",
      naam: "Issuelog",
      cyclusId: "uitvoeren",
      themaId: "sturen",
      verplicht: true,
      beschrijving: "Register van issues die moeten worden opgelost",
      templateBestand: "20240517-Werken-aan-Programmas-Template-issuelog.xlsx"
    },
    {
      id: "doc-25",
      naam: "BWA-log (Besluiten-Wijzigingen-Acties)",
      cyclusId: "uitvoeren",
      themaId: "beslissen",
      verplicht: false,
      beschrijving: "Gecombineerd register voor besluiten, wijzigingen en acties",
      templateBestand: "20240517-Werken-aan-Programmas-Template-besluiten-wijzigingen-en-actieslog-BWA.xlsx"
    },
    {
      id: "doc-26",
      naam: "Beslisdocument",
      cyclusId: "uitvoeren",
      themaId: "beslissen",
      verplicht: true,
      beschrijving: "Template voor Go/No-Go beslissingen",
      templateBestand: "20240517-Werken-aan-Programmas-Template-beslisdocument.docx"
    },
    {
      id: "doc-27",
      naam: "Cyclus-evaluatie",
      cyclusId: "uitvoeren",
      themaId: "sturen",
      verplicht: true,
      beschrijving: "Evaluatie aan het einde van elke cyclus",
      templateBestand: "20240517-Werken-aan-Programmas-Template-evaluatiedocument.docx"
    },
    {
      id: "doc-28",
      naam: "Budgetbewaking",
      cyclusId: "uitvoeren",
      themaId: "sturen",
      verplicht: false,
      beschrijving: "Financi\xEBle monitoring van het programmabudget",
      templateBestand: "20240517-Werken-aan-Programmas-Template-bewaken-programmabudgetten.xlsx"
    },
    // ==================== AFBOUWEN ====================
    {
      id: "doc-29",
      naam: "Afbouwopdracht",
      cyclusId: "afbouwen",
      themaId: "beslissen",
      verplicht: true,
      beschrijving: "Bevestiging dat het programma kan worden afgebouwd",
      templateBestand: "20240517-Werken-aan-Programmas-Template-afbouwopdracht.docx"
    },
    {
      id: "doc-30",
      naam: "Programmareview",
      cyclusId: "afbouwen",
      themaId: "sturen",
      verplicht: true,
      beschrijving: "Eindreview van het gehele programma"
    },
    {
      id: "doc-31",
      naam: "Overdrachtsplan",
      cyclusId: "afbouwen",
      themaId: "organiseren",
      verplicht: true,
      beschrijving: "Plan voor overdracht van resultaten naar de lijn"
    },
    {
      id: "doc-32",
      naam: "Geleerde Lessen",
      cyclusId: "afbouwen",
      themaId: "ontwikkelen",
      verplicht: true,
      beschrijving: "Documentatie van lessen voor toekomstige programma's",
      templateBestand: "20240517-Werken-aan-Programmas-Template-geleerde-lessen.docx"
    },
    {
      id: "doc-33",
      naam: "Afrondingsdocument",
      cyclusId: "afbouwen",
      themaId: "beslissen",
      verplicht: true,
      beschrijving: "Documentatie van de afronding en oogst van het programma"
    },
    {
      id: "doc-34",
      naam: "Dechargedocument",
      cyclusId: "afbouwen",
      themaId: "beslissen",
      verplicht: true,
      beschrijving: "Formele ontslaging van programmarollen",
      templateBestand: "20240517-Werken-aan-Programmas-Template-dechargedocument.docx"
    }
  ];
  function getActiviteitenVoorThemaEnCyclus(themaId, cyclusId) {
    return activiteiten.filter((a) => a.themaId === themaId && a.cyclusId === cyclusId).sort((a, b) => a.volgorde - b.volgorde);
  }
  function getDocumentenVoorCyclus(cyclusId) {
    return documentTemplates.filter((d) => d.cyclusId === cyclusId);
  }

  // src/stores/methodologieStore.js
  var initialVoortgang = {
    // Huidige positie
    huidigeCyclus: "verkennen",
    huidigeThema: "kiezen",
    cyclusNummer: 0,
    // Nog niet in uitvoeren
    huidigeWeek: 1,
    // Week 1 van Verkennen
    // Activiteiten voortgang: { activiteitId: { status, completedItems, notities, datum } }
    activiteiten: {
      // Nog niets afgerond - we beginnen net
    },
    // Documenten: { documentId: { status, path, versie, datum } }
    documenten: {
      // Nog geen documenten
    },
    // Go/No-Go besluiten
    besluiten: [
      // Nog geen besluiten genomen
    ]
  };
  var useMethodologieStore = create(
    persist(
      (set, get) => ({
        // State
        voortgang: initialVoortgang,
        // Huidige positie wijzigen
        setCyclus: (cyclusId) => set((state) => ({
          voortgang: { ...state.voortgang, huidigeCyclus: cyclusId }
        })),
        setThema: (themaId) => set((state) => ({
          voortgang: { ...state.voortgang, huidigeThema: themaId }
        })),
        // Activiteit voortgang
        updateActiviteit: (activiteitId, updates) => set((state) => ({
          voortgang: {
            ...state.voortgang,
            activiteiten: {
              ...state.voortgang.activiteiten,
              [activiteitId]: {
                ...state.voortgang.activiteiten[activiteitId],
                ...updates
              }
            }
          }
        })),
        toggleChecklistItem: (activiteitId, item) => set((state) => {
          const current = state.voortgang.activiteiten[activiteitId] || { completedItems: [], status: "not_started" };
          const completedItems = current.completedItems || [];
          const isCompleted = completedItems.includes(item);
          const newCompletedItems = isCompleted ? completedItems.filter((i) => i !== item) : [...completedItems, item];
          const activiteit = activiteiten.find((a) => a.id === activiteitId);
          const totalItems = activiteit?.checklistItems?.length || 0;
          let newStatus = "not_started";
          if (newCompletedItems.length === totalItems) {
            newStatus = "completed";
          } else if (newCompletedItems.length > 0) {
            newStatus = "in_progress";
          }
          return {
            voortgang: {
              ...state.voortgang,
              activiteiten: {
                ...state.voortgang.activiteiten,
                [activiteitId]: {
                  ...current,
                  completedItems: newCompletedItems,
                  status: newStatus,
                  datum: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
                }
              }
            }
          };
        }),
        // Document voortgang
        updateDocument: (documentId, updates) => set((state) => ({
          voortgang: {
            ...state.voortgang,
            documenten: {
              ...state.voortgang.documenten,
              [documentId]: {
                ...state.voortgang.documenten[documentId],
                ...updates
              }
            }
          }
        })),
        // Besluit toevoegen
        addBesluit: (besluit) => set((state) => ({
          voortgang: {
            ...state.voortgang,
            besluiten: [...state.voortgang.besluiten, { ...besluit, id: `gnG-${Date.now()}` }]
          }
        })),
        // Computed getters
        getActiviteitStatus: (activiteitId) => {
          const state = get();
          return state.voortgang.activiteiten[activiteitId]?.status || "not_started";
        },
        getDocumentStatus: (documentId) => {
          const state = get();
          return state.voortgang.documenten[documentId]?.status || "not_started";
        },
        // Voortgang per thema berekenen
        getThemaVoortgang: (themaId, cyclusId) => {
          const state = get();
          const themaActiviteiten = activiteiten.filter(
            (a) => a.themaId === themaId && a.cyclusId === cyclusId
          );
          if (themaActiviteiten.length === 0) return { percentage: 0, completed: 0, total: 0 };
          const completed = themaActiviteiten.filter(
            (a) => state.voortgang.activiteiten[a.id]?.status === "completed"
          ).length;
          return {
            percentage: Math.round(completed / themaActiviteiten.length * 100),
            completed,
            total: themaActiviteiten.length
          };
        },
        // Voortgang per cyclus berekenen
        getCyclusVoortgang: (cyclusId) => {
          const state = get();
          const cyclusActiviteiten = activiteiten.filter((a) => a.cyclusId === cyclusId);
          if (cyclusActiviteiten.length === 0) return { percentage: 0, completed: 0, total: 0 };
          const completed = cyclusActiviteiten.filter(
            (a) => state.voortgang.activiteiten[a.id]?.status === "completed"
          ).length;
          return {
            percentage: Math.round(completed / cyclusActiviteiten.length * 100),
            completed,
            total: cyclusActiviteiten.length
          };
        },
        // Totale programma voortgang
        getTotaleVoortgang: () => {
          const state = get();
          const totalActiviteiten = activiteiten.length;
          const completed = Object.values(state.voortgang.activiteiten).filter(
            (a) => a.status === "completed"
          ).length;
          return {
            percentage: Math.round(completed / totalActiviteiten * 100),
            completed,
            total: totalActiviteiten
          };
        },
        // Volgende actie bepalen
        getVolgendeActie: () => {
          const state = get();
          const { huidigeCyclus, huidigeThema } = state.voortgang;
          const huidigeActiviteiten = activiteiten.filter((a) => a.themaId === huidigeThema && a.cyclusId === huidigeCyclus).sort((a, b) => a.volgorde - b.volgorde);
          for (const activiteit of huidigeActiviteiten) {
            const status = state.voortgang.activiteiten[activiteit.id]?.status;
            if (status !== "completed") {
              return activiteit;
            }
          }
          const themaIndex = themas.findIndex((t) => t.id === huidigeThema);
          if (themaIndex < themas.length - 1) {
            const volgendThema = themas[themaIndex + 1];
            const volgendeActiviteiten = activiteiten.filter((a) => a.themaId === volgendThema.id && a.cyclusId === huidigeCyclus).sort((a, b) => a.volgorde - b.volgorde);
            if (volgendeActiviteiten.length > 0) {
              return volgendeActiviteiten[0];
            }
          }
          return null;
        },
        // Reset voor demo
        resetVoortgang: () => set({ voortgang: initialVoortgang })
      }),
      {
        name: "methodologie-storage"
      }
    )
  );

  // src/data/programmaData.js
  var programmaInfo = {
    naam: "Klant in Beeld",
    organisatie: "Cito",
    visie: `Cito BV ontwikkelt zich tot een organisatie die vanuit een outside-in perspectief werkt,
waarin mens, proces en systeem verbonden zijn en dit onderdeel wordt van de cultuur,
zodat dienstverlening en samenwerking blijvend aansluiten bij de behoeften van klanten.`,
    methodiek: "Voordoen \u2192 Samen doen \u2192 Zelf doen",
    startDatum: "2025-09-01",
    geplandeDuur: "24 maanden",
    huidigeStatus: "Opbouwen"
  };
  var sectoren = [
    {
      id: "po",
      naam: "Primair Onderwijs",
      afkorting: "PO",
      kleur: "#3b82f6",
      baateigenaar: {
        naam: "Sectormanager PO",
        rol: "Baateigenaar"
      },
      klantreizen: 5,
      huidigeWerkfase: 3,
      werkfaseStatus: "Richting einde",
      beschrijving: "Basisscholen en speciaal onderwijs"
    },
    {
      id: "vo",
      naam: "Voortgezet Onderwijs",
      afkorting: "VO",
      kleur: "#8b5cf6",
      baateigenaar: {
        naam: "Sectormanager VO",
        rol: "Baateigenaar"
      },
      klantreizen: 5,
      huidigeWerkfase: 3,
      werkfaseStatus: "Richting einde",
      beschrijving: "Middelbare scholen"
    },
    {
      id: "professionals",
      naam: "Professionals / Zakelijk",
      afkorting: "ZAK",
      kleur: "#f59e0b",
      baateigenaar: {
        naam: "Sectormanager Zakelijk",
        rol: "Baateigenaar"
      },
      klantreizen: 3,
      huidigeWerkfase: 2,
      werkfaseStatus: "Begin",
      beschrijving: "Zakelijke markt en professionals"
    }
  ];
  var stuurparameters = [
    {
      id: "doeltreffendheid",
      naam: "Doeltreffendheid",
      vraag: "Bereiken we de juiste effecten?",
      indicatoren: ["NPS trend", "Batenrealisatie %"],
      status: "groen",
      toelichting: "Op koers voor geplande baten"
    },
    {
      id: "tempo",
      naam: "Tempo",
      vraag: "Liggen we op schema?",
      indicatoren: ["Mijlpalen gehaald", "Doorlooptijd"],
      status: "geel",
      toelichting: "Sector Professionals loopt achter"
    },
    {
      id: "haalbaarheid",
      naam: "Haalbaarheid",
      vraag: "Kunnen we dit realiseren?",
      indicatoren: ["Resources beschikbaar", "Afhankelijkheden"],
      status: "groen",
      toelichting: "Voldoende capaciteit"
    },
    {
      id: "wendbaarheid",
      naam: "Wendbaarheid",
      vraag: "Kunnen we bijsturen waar nodig?",
      indicatoren: ["Wijzigingen doorgevoerd", "Besluitsnelheid"],
      status: "groen",
      toelichting: "Flexibele aanpak werkt"
    },
    {
      id: "efficientie",
      naam: "Effici\xEBntie",
      vraag: "Doen we het met de juiste inzet?",
      indicatoren: ["Budget realisatie", "Uren vs planning"],
      status: "groen",
      toelichting: "Binnen budget"
    }
  ];
  var documentenRegister = [
    // Verkenningsfase documenten
    {
      id: "doc-verkenning-1",
      naam: "Programmavoorstel Klant in Beeld",
      type: "Programmavoorstel",
      cyclus: "verkennen",
      thema: "kiezen",
      status: "gereed",
      versie: "1.0",
      datum: "2025-09-15",
      eigenaar: "Programma-eigenaar",
      verplicht: true
    },
    {
      id: "doc-verkenning-2",
      naam: "Initi\xEBle Businesscase",
      type: "Businesscase",
      cyclus: "verkennen",
      thema: "vormgeven",
      status: "gereed",
      versie: "1.0",
      datum: "2025-10-01",
      eigenaar: "Programma-eigenaar",
      verplicht: true
    },
    {
      id: "doc-verkenning-3",
      naam: "Opbouwopdracht",
      type: "Opdracht",
      cyclus: "verkennen",
      thema: "kiezen",
      status: "gereed",
      versie: "1.0",
      datum: "2025-10-15",
      eigenaar: "Sponsorgroep",
      verplicht: true
    },
    // Opbouwfase documenten
    {
      id: "doc-opbouw-1",
      naam: "Programmaplan Klant in Beeld",
      type: "Programmaplan",
      cyclus: "opbouwen",
      thema: "vormgeven",
      status: "in_bewerking",
      versie: "0.9",
      datum: "2025-12-01",
      eigenaar: "Programmamanager",
      verplicht: true
    },
    {
      id: "doc-opbouw-2",
      naam: "Batenstructuur",
      type: "Batenstructuur",
      cyclus: "opbouwen",
      thema: "vormgeven",
      status: "gereed",
      versie: "1.0",
      datum: "2025-11-15",
      eigenaar: "Programma-eigenaar",
      verplicht: true
    },
    {
      id: "doc-opbouw-3",
      naam: "Governance-schema",
      type: "Governance",
      cyclus: "opbouwen",
      thema: "organiseren",
      status: "gereed",
      versie: "1.0",
      datum: "2025-11-20",
      eigenaar: "Programmamanager",
      verplicht: true
    },
    {
      id: "doc-opbouw-4",
      naam: "Inspanningsoverzicht",
      type: "Inspanningsoverzicht",
      cyclus: "opbouwen",
      thema: "organiseren",
      status: "in_bewerking",
      versie: "0.8",
      datum: "2025-12-01",
      eigenaar: "Programmamanager",
      verplicht: true
    },
    {
      id: "doc-opbouw-5",
      naam: "Routekaart/Roadmap",
      type: "Roadmap",
      cyclus: "opbouwen",
      thema: "vormgeven",
      status: "gereed",
      versie: "1.0",
      datum: "2025-11-25",
      eigenaar: "Programmamanager",
      verplicht: true
    },
    {
      id: "doc-opbouw-6",
      naam: "Stakeholderanalyse",
      type: "Stakeholderanalyse",
      cyclus: "opbouwen",
      thema: "samenwerken",
      status: "gereed",
      versie: "1.0",
      datum: "2025-10-30",
      eigenaar: "Programmamanager",
      verplicht: true
    },
    {
      id: "doc-opbouw-7",
      naam: "Communicatieplan",
      type: "Communicatieplan",
      cyclus: "opbouwen",
      thema: "samenwerken",
      status: "niet_gestart",
      versie: "-",
      datum: null,
      eigenaar: "Programmamanager",
      verplicht: false
    },
    {
      id: "doc-opbouw-8",
      naam: "Cyclusplan Cyclus 1",
      type: "Cyclusplan",
      cyclus: "opbouwen",
      thema: "sturen",
      status: "niet_gestart",
      versie: "-",
      datum: null,
      eigenaar: "Programmamanager",
      verplicht: true
    },
    // Uitvoeringsfase documenten (per cyclus)
    {
      id: "doc-uitvoer-1",
      naam: "Voortgangsrapportage Template",
      type: "Voortgangsrapportage",
      cyclus: "uitvoeren",
      thema: "sturen",
      status: "beschikbaar",
      versie: "1.0",
      eigenaar: "Programmamanager",
      verplicht: true,
      frequentie: "Per cyclus"
    },
    {
      id: "doc-uitvoer-2",
      naam: "Besluitenlogboek",
      type: "Besluitenlogboek",
      cyclus: "uitvoeren",
      thema: "beslissen",
      status: "actief",
      versie: "Lopend",
      eigenaar: "Programmamanager",
      verplicht: true
    }
  ];
  var batenProfielen = [
    {
      id: "bp1",
      baatId: "b1",
      naam: "Hogere klanttevredenheid",
      formulering: "Zelfstandig naamwoord + vergrotende trap",
      omschrijving: "Klanten ervaren een betere dienstverlening doordat medewerkers proactief en klantgericht werken, waardoor de algehele tevredenheid stijgt.",
      eigenaar: "Alle sectormanagers (gezamenlijk)",
      indicator: "Net Promoter Score (NPS)",
      meeteenheid: "NPS score (-100 tot +100)",
      meetfrequentie: "Kwartaal",
      // Programma-brede waarden (gemiddeld)
      nulmeting: { waarde: "+15", datum: "2025-09", bron: "Klanttevredenheidsonderzoek 2025" },
      doel: { waarde: "+35", datum: "2027-09" },
      // SECTOR-SPECIFIEKE WAARDEN
      perSector: {
        po: {
          nulmeting: "+18",
          doel: "+40",
          prioriteit: "hoog",
          eigenaar: "Sectormanager PO",
          toelichting: "Basisscholen hebben al redelijke NPS, focus op excellentie"
        },
        vo: {
          nulmeting: "+12",
          doel: "+32",
          prioriteit: "hoog",
          eigenaar: "Sectormanager VO",
          toelichting: "Middelbare scholen vragen meer aandacht, complexere relaties"
        },
        professionals: {
          nulmeting: "+8",
          doel: "+28",
          prioriteit: "kritiek",
          eigenaar: "Sectormanager Zakelijk",
          toelichting: "Zakelijke markt heeft laagste NPS, hoogste prioriteit"
        }
      },
      tussenDoelen: [
        { waarde: "+20", datum: "2026-03" },
        { waarde: "+25", datum: "2026-09" },
        { waarde: "+30", datum: "2027-03" }
      ],
      domeinen: {
        mens: { impact: "hoog", toelichting: "Vaardigheden klantgericht werken, outside-in denken" },
        proces: { impact: "midden", toelichting: "Uniforme klantbenadering, feedback verwerken" },
        systeem: { impact: "laag", toelichting: "CRM voor klanthistorie en preferences" },
        cultuur: { impact: "hoog", toelichting: "Outside-in mindset, klant centraal stellen" }
      },
      benodigd: [
        "Trainingen outside-in werken",
        "Klantinteractie standaarden",
        "Feedbackloop met klanten"
      ],
      risicos: ["Weerstand tegen verandering", "Overbelasting medewerkers"]
    },
    {
      id: "bp2",
      baatId: "b2",
      naam: "Lagere ongewenste klantuitstroom",
      formulering: "Zelfstandig naamwoord + vergrotende trap",
      omschrijving: "Minder klanten vertrekken ongewenst doordat we proactief signalen oppikken en actie ondernemen voordat klanten afhaken.",
      eigenaar: "Alle sectormanagers (gezamenlijk)",
      indicator: "Churn percentage",
      meeteenheid: "Percentage klanten dat vertrekt",
      meetfrequentie: "Maandelijks",
      nulmeting: { waarde: "12%", datum: "2025-09", bron: "Salesforce CRM" },
      doel: { waarde: "6%", datum: "2027-09" },
      perSector: {
        po: {
          nulmeting: "8%",
          doel: "4%",
          prioriteit: "midden",
          eigenaar: "Sectormanager PO",
          toelichting: "Relatief stabiele klantbasis, focus op behoud"
        },
        vo: {
          nulmeting: "14%",
          doel: "7%",
          prioriteit: "hoog",
          eigenaar: "Sectormanager VO",
          toelichting: "Hogere churn door concurrentie, actieve retentie nodig"
        },
        professionals: {
          nulmeting: "18%",
          doel: "8%",
          prioriteit: "kritiek",
          eigenaar: "Sectormanager Zakelijk",
          toelichting: "Hoogste churn, contracten lopen af zonder verlenging"
        }
      },
      tussenDoelen: [
        { waarde: "10%", datum: "2026-03" },
        { waarde: "8%", datum: "2026-09" },
        { waarde: "7%", datum: "2027-03" }
      ],
      domeinen: {
        mens: { impact: "midden", toelichting: "Proactief signaleren, klantgesprekken voeren" },
        proces: { impact: "hoog", toelichting: "Retentieproces, escalatieprocedure" },
        systeem: { impact: "hoog", toelichting: "Churn-signalen detecteren, alerts" },
        cultuur: { impact: "midden", toelichting: "Eigenaarschap klantrelatie" }
      },
      benodigd: [
        "Churn-prediction model",
        "Retentie playbook",
        "Escalatieprocedure"
      ],
      risicos: ["Data niet beschikbaar", "Te laat signaleren"]
    },
    {
      id: "bp3",
      baatId: "b3",
      naam: "Betere aansluiting op klantbehoefte",
      formulering: "Zelfstandig naamwoord + vergrotende trap",
      omschrijving: "Onze producten en diensten sluiten beter aan bij wat klanten daadwerkelijk nodig hebben, gemeten aan minder klachten en meer gebruik.",
      eigenaar: "Programma-eigenaar",
      indicator: "Klachten per 1000 klanten",
      meeteenheid: "Aantal klachten",
      meetfrequentie: "Maandelijks",
      nulmeting: { waarde: "45", datum: "2025-09", bron: "Klachtenregistratie" },
      doel: { waarde: "20", datum: "2027-09" },
      perSector: {
        po: {
          nulmeting: "35",
          doel: "15",
          prioriteit: "midden",
          eigenaar: "Sectormanager PO",
          toelichting: "Product-markt fit is redelijk, fine-tuning nodig"
        },
        vo: {
          nulmeting: "52",
          doel: "22",
          prioriteit: "hoog",
          eigenaar: "Sectormanager VO",
          toelichting: "Veel klachten over examenproducten, aanpassing nodig"
        },
        professionals: {
          nulmeting: "60",
          doel: "25",
          prioriteit: "kritiek",
          eigenaar: "Sectormanager Zakelijk",
          toelichting: "Mismatch tussen aanbod en zakelijke behoeften"
        }
      },
      tussenDoelen: [
        { waarde: "38", datum: "2026-03" },
        { waarde: "30", datum: "2026-09" },
        { waarde: "25", datum: "2027-03" }
      ],
      domeinen: {
        mens: { impact: "hoog", toelichting: "Klant begrijpen, behoeften identificeren" },
        proces: { impact: "hoog", toelichting: "Feedback verwerken in productontwikkeling" },
        systeem: { impact: "midden", toelichting: "Klantfeedback vastleggen en analyseren" },
        cultuur: { impact: "hoog", toelichting: "Klant centraal in besluitvorming" }
      },
      benodigd: [
        "Klantreisanalyses",
        "Voice of Customer programma",
        "Product feedback loops"
      ],
      risicos: ["Interne focus blijft domineren", "Klantinput niet gehoord"]
    },
    {
      id: "bp4",
      baatId: "b4",
      naam: "Proactieve klantrelaties",
      formulering: "Zelfstandig naamwoord + vergrotende trap",
      omschrijving: "Medewerkers nemen het initiatief in klantcontact in plaats van alleen te reageren op vragen of klachten.",
      eigenaar: "Alle sectormanagers (gezamenlijk)",
      indicator: "Percentage proactieve contacten",
      meeteenheid: "Percentage van alle contactmomenten",
      meetfrequentie: "Maandelijks",
      nulmeting: { waarde: "20%", datum: "2025-09", bron: "CRM contactregistratie" },
      doel: { waarde: "60%", datum: "2027-09" },
      perSector: {
        po: {
          nulmeting: "25%",
          doel: "65%",
          prioriteit: "hoog",
          eigenaar: "Sectormanager PO",
          toelichting: "Al wat proactief, maar kan veel beter"
        },
        vo: {
          nulmeting: "18%",
          doel: "55%",
          prioriteit: "hoog",
          eigenaar: "Sectormanager VO",
          toelichting: "Reactief gedrag dominant, cultuuromslag nodig"
        },
        professionals: {
          nulmeting: "15%",
          doel: "70%",
          prioriteit: "kritiek",
          eigenaar: "Sectormanager Zakelijk",
          toelichting: "Zakelijke klanten verwachten proactief contact"
        }
      },
      tussenDoelen: [
        { waarde: "30%", datum: "2026-03" },
        { waarde: "40%", datum: "2026-09" },
        { waarde: "50%", datum: "2027-03" }
      ],
      domeinen: {
        mens: { impact: "hoog", toelichting: "Proactieve houding, initiatief nemen" },
        proces: { impact: "hoog", toelichting: "Contactmomenten plannen, triggers defini\xEBren" },
        systeem: { impact: "hoog", toelichting: "Alerts, reminders, contacthistorie" },
        cultuur: { impact: "midden", toelichting: "Van reactief naar proactief" }
      },
      benodigd: [
        "Proactief contactplan per segment",
        "CRM alerts en triggers",
        "Training proactief klantcontact"
      ],
      risicos: ["Overbelasting door meer contactmomenten", "Klanten ervaren spam"]
    },
    {
      id: "bp5",
      baatId: "b5",
      naam: "Effici\xEBntere interne samenwerking",
      formulering: "Zelfstandig naamwoord + vergrotende trap",
      omschrijving: "Sectoren en afdelingen werken beter samen rondom klanten, waardoor doorlooptijden korter worden en dubbel werk vermindert.",
      eigenaar: "Programmamanager",
      indicator: "Gemiddelde doorlooptijd klantvraag",
      meeteenheid: "Dagen",
      meetfrequentie: "Maandelijks",
      nulmeting: { waarde: "14 dagen", datum: "2025-09", bron: "Procesmetingen" },
      doel: { waarde: "5 dagen", datum: "2027-09" },
      perSector: {
        po: {
          nulmeting: "10 dagen",
          doel: "4 dagen",
          prioriteit: "midden",
          eigenaar: "Sectormanager PO",
          toelichting: "Redelijk effici\xEBnt, optimalisatie mogelijk"
        },
        vo: {
          nulmeting: "16 dagen",
          doel: "6 dagen",
          prioriteit: "hoog",
          eigenaar: "Sectormanager VO",
          toelichting: "Complexe vragen, veel handoffs tussen teams"
        },
        professionals: {
          nulmeting: "18 dagen",
          doel: "5 dagen",
          prioriteit: "kritiek",
          eigenaar: "Sectormanager Zakelijk",
          toelichting: "Zakelijke klanten accepteren geen lange doorlooptijd"
        }
      },
      tussenDoelen: [
        { waarde: "11 dagen", datum: "2026-03" },
        { waarde: "8 dagen", datum: "2026-09" },
        { waarde: "6 dagen", datum: "2027-03" }
      ],
      domeinen: {
        mens: { impact: "midden", toelichting: "Samenwerken over grenzen, communicatie" },
        proces: { impact: "hoog", toelichting: "Overdrachtsprocessen, heldere routing" },
        systeem: { impact: "midden", toelichting: "Gedeelde systemen, workflow tools" },
        cultuur: { impact: "hoog", toelichting: "Sectoroverstijgend denken, gezamenlijke verantwoordelijkheid" }
      },
      benodigd: [
        "Sectoroverstijgende werkafspraken",
        "Shared service desk",
        "Workflow automatisering"
      ],
      risicos: ["Silo-denken blijft bestaan", "Onduidelijke verantwoordelijkheden"]
    },
    {
      id: "bp6",
      baatId: "b6",
      naam: "Betrouwbaar integraal klantbeeld",
      formulering: "Zelfstandig naamwoord + vergrotende trap",
      omschrijving: "E\xE9n betrouwbaar 360\xB0 klantbeeld in onze systemen, zodat elke medewerker de volledige klanthistorie kan zien.",
      eigenaar: "Data & Tech manager",
      indicator: "Datakwaliteit score",
      meeteenheid: "Percentage complete en correcte klantrecords",
      meetfrequentie: "Maandelijks",
      nulmeting: { waarde: "65%", datum: "2025-09", bron: "Data quality assessment" },
      doel: { waarde: "95%", datum: "2027-09" },
      perSector: {
        po: {
          nulmeting: "70%",
          doel: "95%",
          prioriteit: "midden",
          eigenaar: "Data & Tech manager",
          toelichting: "Beste datakwaliteit, standaard voor anderen"
        },
        vo: {
          nulmeting: "62%",
          doel: "95%",
          prioriteit: "hoog",
          eigenaar: "Data & Tech manager",
          toelichting: "Veel legacy data, opschoning nodig"
        },
        professionals: {
          nulmeting: "55%",
          doel: "95%",
          prioriteit: "kritiek",
          eigenaar: "Data & Tech manager",
          toelichting: "Zakelijke data verspreid, integratie urgent"
        }
      },
      tussenDoelen: [
        { waarde: "75%", datum: "2026-03" },
        { waarde: "85%", datum: "2026-09" },
        { waarde: "90%", datum: "2027-03" }
      ],
      domeinen: {
        mens: { impact: "midden", toelichting: "Data invoeren en gebruiken, discipline" },
        proces: { impact: "midden", toelichting: "Data-governance, kwaliteitscontrole" },
        systeem: { impact: "hoog", toelichting: "360\xB0 klantview, integraties, master data" },
        cultuur: { impact: "laag", toelichting: "Data-gedreven werken accepteren" }
      },
      benodigd: [
        "Data governance framework",
        "CRM integratie project",
        "Data quality tooling"
      ],
      risicos: ["Legacy systemen moeilijk te integreren", "Weerstand tegen data invoer"]
    }
  ];
  var batenDomeinenMatrix = batenProfielen.map((bp) => ({
    baat: bp.naam,
    indicator: bp.indicator,
    eigenaar: bp.eigenaar,
    domeinen: bp.domeinen
  }));

  // node_modules/react-router/dist/development/chunk-EPOLDU6W.mjs
  var React3 = __toESM(require_react(), 1);
  var React22 = __toESM(require_react(), 1);
  var React32 = __toESM(require_react(), 1);
  var React4 = __toESM(require_react(), 1);
  var React9 = __toESM(require_react(), 1);
  var React8 = __toESM(require_react(), 1);
  var React7 = __toESM(require_react(), 1);
  var React6 = __toESM(require_react(), 1);
  var React5 = __toESM(require_react(), 1);
  var React10 = __toESM(require_react(), 1);
  var React11 = __toESM(require_react(), 1);
  var import_meta = {};
  function invariant(value, message) {
    if (value === false || value === null || typeof value === "undefined") {
      throw new Error(message);
    }
  }
  function warning(cond, message) {
    if (!cond) {
      if (typeof console !== "undefined") console.warn(message);
      try {
        throw new Error(message);
      } catch (e) {
      }
    }
  }
  function createPath({
    pathname = "/",
    search = "",
    hash = ""
  }) {
    if (search && search !== "?")
      pathname += search.charAt(0) === "?" ? search : "?" + search;
    if (hash && hash !== "#")
      pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
    return pathname;
  }
  function parsePath(path) {
    let parsedPath = {};
    if (path) {
      let hashIndex = path.indexOf("#");
      if (hashIndex >= 0) {
        parsedPath.hash = path.substring(hashIndex);
        path = path.substring(0, hashIndex);
      }
      let searchIndex = path.indexOf("?");
      if (searchIndex >= 0) {
        parsedPath.search = path.substring(searchIndex);
        path = path.substring(0, searchIndex);
      }
      if (path) {
        parsedPath.pathname = path;
      }
    }
    return parsedPath;
  }
  var _map;
  _map = /* @__PURE__ */ new WeakMap();
  function matchRoutes(routes, locationArg, basename = "/") {
    return matchRoutesImpl(routes, locationArg, basename, false);
  }
  function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
    let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    let pathname = stripBasename(location.pathname || "/", basename);
    if (pathname == null) {
      return null;
    }
    let branches = flattenRoutes(routes);
    rankRouteBranches(branches);
    let matches = null;
    for (let i = 0; matches == null && i < branches.length; ++i) {
      let decoded = decodePath(pathname);
      matches = matchRouteBranch(
        branches[i],
        decoded,
        allowPartial
      );
    }
    return matches;
  }
  function convertRouteMatchToUiMatch(match, loaderData) {
    let { route, pathname, params } = match;
    return {
      id: route.id,
      pathname,
      params,
      data: loaderData[route.id],
      loaderData: loaderData[route.id],
      handle: route.handle
    };
  }
  function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
    let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
      let meta = {
        relativePath: relativePath === void 0 ? route.path || "" : relativePath,
        caseSensitive: route.caseSensitive === true,
        childrenIndex: index,
        route
      };
      if (meta.relativePath.startsWith("/")) {
        if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
          return;
        }
        invariant(
          meta.relativePath.startsWith(parentPath),
          `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
        );
        meta.relativePath = meta.relativePath.slice(parentPath.length);
      }
      let path = joinPaths([parentPath, meta.relativePath]);
      let routesMeta = parentsMeta.concat(meta);
      if (route.children && route.children.length > 0) {
        invariant(
          // Our types know better, but runtime JS may not!
          // @ts-expect-error
          route.index !== true,
          `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
        );
        flattenRoutes(
          route.children,
          branches,
          routesMeta,
          path,
          hasParentOptionalSegments
        );
      }
      if (route.path == null && !route.index) {
        return;
      }
      branches.push({
        path,
        score: computeScore(path, route.index),
        routesMeta
      });
    };
    routes.forEach((route, index) => {
      if (route.path === "" || !route.path?.includes("?")) {
        flattenRoute(route, index);
      } else {
        for (let exploded of explodeOptionalSegments(route.path)) {
          flattenRoute(route, index, true, exploded);
        }
      }
    });
    return branches;
  }
  function explodeOptionalSegments(path) {
    let segments = path.split("/");
    if (segments.length === 0) return [];
    let [first, ...rest] = segments;
    let isOptional = first.endsWith("?");
    let required = first.replace(/\?$/, "");
    if (rest.length === 0) {
      return isOptional ? [required, ""] : [required];
    }
    let restExploded = explodeOptionalSegments(rest.join("/"));
    let result = [];
    result.push(
      ...restExploded.map(
        (subpath) => subpath === "" ? required : [required, subpath].join("/")
      )
    );
    if (isOptional) {
      result.push(...restExploded);
    }
    return result.map(
      (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
    );
  }
  function rankRouteBranches(branches) {
    branches.sort(
      (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
        a.routesMeta.map((meta) => meta.childrenIndex),
        b.routesMeta.map((meta) => meta.childrenIndex)
      )
    );
  }
  var paramRe = /^:[\w-]+$/;
  var dynamicSegmentValue = 3;
  var indexRouteValue = 2;
  var emptySegmentValue = 1;
  var staticSegmentValue = 10;
  var splatPenalty = -2;
  var isSplat = (s) => s === "*";
  function computeScore(path, index) {
    let segments = path.split("/");
    let initialScore = segments.length;
    if (segments.some(isSplat)) {
      initialScore += splatPenalty;
    }
    if (index) {
      initialScore += indexRouteValue;
    }
    return segments.filter((s) => !isSplat(s)).reduce(
      (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
      initialScore
    );
  }
  function compareIndexes(a, b) {
    let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
    return siblings ? (
      // If two routes are siblings, we should try to match the earlier sibling
      // first. This allows people to have fine-grained control over the matching
      // behavior by simply putting routes with identical paths in the order they
      // want them tried.
      a[a.length - 1] - b[b.length - 1]
    ) : (
      // Otherwise, it doesn't really make sense to rank non-siblings by index,
      // so they sort equally.
      0
    );
  }
  function matchRouteBranch(branch, pathname, allowPartial = false) {
    let { routesMeta } = branch;
    let matchedParams = {};
    let matchedPathname = "/";
    let matches = [];
    for (let i = 0; i < routesMeta.length; ++i) {
      let meta = routesMeta[i];
      let end = i === routesMeta.length - 1;
      let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
      let match = matchPath(
        { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
        remainingPathname
      );
      let route = meta.route;
      if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
        match = matchPath(
          {
            path: meta.relativePath,
            caseSensitive: meta.caseSensitive,
            end: false
          },
          remainingPathname
        );
      }
      if (!match) {
        return null;
      }
      Object.assign(matchedParams, match.params);
      matches.push({
        // TODO: Can this as be avoided?
        params: matchedParams,
        pathname: joinPaths([matchedPathname, match.pathname]),
        pathnameBase: normalizePathname(
          joinPaths([matchedPathname, match.pathnameBase])
        ),
        route
      });
      if (match.pathnameBase !== "/") {
        matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
      }
    }
    return matches;
  }
  function matchPath(pattern, pathname) {
    if (typeof pattern === "string") {
      pattern = { path: pattern, caseSensitive: false, end: true };
    }
    let [matcher, compiledParams] = compilePath(
      pattern.path,
      pattern.caseSensitive,
      pattern.end
    );
    let match = pathname.match(matcher);
    if (!match) return null;
    let matchedPathname = match[0];
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    let captureGroups = match.slice(1);
    let params = compiledParams.reduce(
      (memo2, { paramName, isOptional }, index) => {
        if (paramName === "*") {
          let splatValue = captureGroups[index] || "";
          pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
        }
        const value = captureGroups[index];
        if (isOptional && !value) {
          memo2[paramName] = void 0;
        } else {
          memo2[paramName] = (value || "").replace(/%2F/g, "/");
        }
        return memo2;
      },
      {}
    );
    return {
      params,
      pathname: matchedPathname,
      pathnameBase,
      pattern
    };
  }
  function compilePath(path, caseSensitive = false, end = true) {
    warning(
      path === "*" || !path.endsWith("*") || path.endsWith("/*"),
      `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
    );
    let params = [];
    let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
      /\/:([\w-]+)(\?)?/g,
      (_, paramName, isOptional) => {
        params.push({ paramName, isOptional: isOptional != null });
        return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
      }
    ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    if (path.endsWith("*")) {
      params.push({ paramName: "*" });
      regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
    } else if (end) {
      regexpSource += "\\/*$";
    } else if (path !== "" && path !== "/") {
      regexpSource += "(?:(?=\\/|$))";
    } else {
    }
    let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
    return [matcher, params];
  }
  function decodePath(value) {
    try {
      return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
    } catch (error) {
      warning(
        false,
        `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
      );
      return value;
    }
  }
  function stripBasename(pathname, basename) {
    if (basename === "/") return pathname;
    if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
      return null;
    }
    let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
    let nextChar = pathname.charAt(startIndex);
    if (nextChar && nextChar !== "/") {
      return null;
    }
    return pathname.slice(startIndex) || "/";
  }
  var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
  var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
  function resolvePath(to, fromPathname = "/") {
    let {
      pathname: toPathname,
      search = "",
      hash = ""
    } = typeof to === "string" ? parsePath(to) : to;
    let pathname;
    if (toPathname) {
      if (isAbsoluteUrl(toPathname)) {
        pathname = toPathname;
      } else {
        if (toPathname.includes("//")) {
          let oldPathname = toPathname;
          toPathname = toPathname.replace(/\/\/+/g, "/");
          warning(
            false,
            `Pathnames cannot have embedded double slashes - normalizing ${oldPathname} -> ${toPathname}`
          );
        }
        if (toPathname.startsWith("/")) {
          pathname = resolvePathname(toPathname.substring(1), "/");
        } else {
          pathname = resolvePathname(toPathname, fromPathname);
        }
      }
    } else {
      pathname = fromPathname;
    }
    return {
      pathname,
      search: normalizeSearch(search),
      hash: normalizeHash(hash)
    };
  }
  function resolvePathname(relativePath, fromPathname) {
    let segments = fromPathname.replace(/\/+$/, "").split("/");
    let relativeSegments = relativePath.split("/");
    relativeSegments.forEach((segment) => {
      if (segment === "..") {
        if (segments.length > 1) segments.pop();
      } else if (segment !== ".") {
        segments.push(segment);
      }
    });
    return segments.length > 1 ? segments.join("/") : "/";
  }
  function getInvalidPathError(char, field, dest, path) {
    return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
      path
    )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
  }
  function getPathContributingMatches(matches) {
    return matches.filter(
      (match, index) => index === 0 || match.route.path && match.route.path.length > 0
    );
  }
  function getResolveToMatches(matches) {
    let pathMatches = getPathContributingMatches(matches);
    return pathMatches.map(
      (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
    );
  }
  function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
    let to;
    if (typeof toArg === "string") {
      to = parsePath(toArg);
    } else {
      to = { ...toArg };
      invariant(
        !to.pathname || !to.pathname.includes("?"),
        getInvalidPathError("?", "pathname", "search", to)
      );
      invariant(
        !to.pathname || !to.pathname.includes("#"),
        getInvalidPathError("#", "pathname", "hash", to)
      );
      invariant(
        !to.search || !to.search.includes("#"),
        getInvalidPathError("#", "search", "hash", to)
      );
    }
    let isEmptyPath = toArg === "" || to.pathname === "";
    let toPathname = isEmptyPath ? "/" : to.pathname;
    let from;
    if (toPathname == null) {
      from = locationPathname;
    } else {
      let routePathnameIndex = routePathnames.length - 1;
      if (!isPathRelative && toPathname.startsWith("..")) {
        let toSegments = toPathname.split("/");
        while (toSegments[0] === "..") {
          toSegments.shift();
          routePathnameIndex -= 1;
        }
        to.pathname = toSegments.join("/");
      }
      from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
    }
    let path = resolvePath(to, from);
    let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
    let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
    if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
      path.pathname += "/";
    }
    return path;
  }
  var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
  var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
  var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
  var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
  var ErrorResponseImpl = class {
    constructor(status, statusText, data2, internal = false) {
      this.status = status;
      this.statusText = statusText || "";
      this.internal = internal;
      if (data2 instanceof Error) {
        this.data = data2.toString();
        this.error = data2;
      } else {
        this.data = data2;
      }
    }
  };
  function isRouteErrorResponse(error) {
    return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
  }
  function getRoutePattern(matches) {
    return matches.map((m) => m.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
  }
  var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  function parseToInfo(_to, basename) {
    let to = _to;
    if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
      return {
        absoluteURL: void 0,
        isExternal: false,
        to
      };
    }
    let absoluteURL = to;
    let isExternal = false;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        warning(
          false,
          `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    }
    return {
      absoluteURL,
      isExternal,
      to
    };
  }
  var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  var validMutationMethodsArr = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ];
  var validMutationMethods = new Set(
    validMutationMethodsArr
  );
  var validRequestMethodsArr = [
    "GET",
    ...validMutationMethodsArr
  ];
  var validRequestMethods = new Set(validRequestMethodsArr);
  var DataRouterContext = React3.createContext(null);
  DataRouterContext.displayName = "DataRouter";
  var DataRouterStateContext = React3.createContext(null);
  DataRouterStateContext.displayName = "DataRouterState";
  var RSCRouterContext = React3.createContext(false);
  var ViewTransitionContext = React3.createContext({
    isTransitioning: false
  });
  ViewTransitionContext.displayName = "ViewTransition";
  var FetchersContext = React3.createContext(
    /* @__PURE__ */ new Map()
  );
  FetchersContext.displayName = "Fetchers";
  var AwaitContext = React3.createContext(null);
  AwaitContext.displayName = "Await";
  var NavigationContext = React3.createContext(
    null
  );
  NavigationContext.displayName = "Navigation";
  var LocationContext = React3.createContext(
    null
  );
  LocationContext.displayName = "Location";
  var RouteContext = React3.createContext({
    outlet: null,
    matches: [],
    isDataRoute: false
  });
  RouteContext.displayName = "Route";
  var RouteErrorContext = React3.createContext(null);
  RouteErrorContext.displayName = "RouteError";
  var ENABLE_DEV_WARNINGS = true;
  var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
  var ERROR_DIGEST_REDIRECT = "REDIRECT";
  var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
  function decodeRedirectErrorDigest(digest) {
    if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
      try {
        let parsed = JSON.parse(digest.slice(28));
        if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
          return parsed;
        }
      } catch {
      }
    }
  }
  function decodeRouteErrorResponseDigest(digest) {
    if (digest.startsWith(
      `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
    )) {
      try {
        let parsed = JSON.parse(digest.slice(40));
        if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
          return new ErrorResponseImpl(
            parsed.status,
            parsed.statusText,
            parsed.data
          );
        }
      } catch {
      }
    }
  }
  function useHref(to, { relative } = {}) {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useHref() may be used only in the context of a <Router> component.`
    );
    let { basename, navigator } = React22.useContext(NavigationContext);
    let { hash, pathname, search } = useResolvedPath(to, { relative });
    let joinedPathname = pathname;
    if (basename !== "/") {
      joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
    }
    return navigator.createHref({ pathname: joinedPathname, search, hash });
  }
  function useInRouterContext() {
    return React22.useContext(LocationContext) != null;
  }
  function useLocation() {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useLocation() may be used only in the context of a <Router> component.`
    );
    return React22.useContext(LocationContext).location;
  }
  var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
  function useIsomorphicLayoutEffect(cb) {
    let isStatic = React22.useContext(NavigationContext).static;
    if (!isStatic) {
      React22.useLayoutEffect(cb);
    }
  }
  function useNavigate() {
    let { isDataRoute } = React22.useContext(RouteContext);
    return isDataRoute ? useNavigateStable() : useNavigateUnstable();
  }
  function useNavigateUnstable() {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useNavigate() may be used only in the context of a <Router> component.`
    );
    let dataRouterContext = React22.useContext(DataRouterContext);
    let { basename, navigator } = React22.useContext(NavigationContext);
    let { matches } = React22.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
    let activeRef = React22.useRef(false);
    useIsomorphicLayoutEffect(() => {
      activeRef.current = true;
    });
    let navigate = React22.useCallback(
      (to, options = {}) => {
        warning(activeRef.current, navigateEffectWarning);
        if (!activeRef.current) return;
        if (typeof to === "number") {
          navigator.go(to);
          return;
        }
        let path = resolveTo(
          to,
          JSON.parse(routePathnamesJson),
          locationPathname,
          options.relative === "path"
        );
        if (dataRouterContext == null && basename !== "/") {
          path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
        }
        (!!options.replace ? navigator.replace : navigator.push)(
          path,
          options.state,
          options
        );
      },
      [
        basename,
        navigator,
        routePathnamesJson,
        locationPathname,
        dataRouterContext
      ]
    );
    return navigate;
  }
  var OutletContext = React22.createContext(null);
  function useResolvedPath(to, { relative } = {}) {
    let { matches } = React22.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
    return React22.useMemo(
      () => resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        relative === "path"
      ),
      [to, routePathnamesJson, locationPathname, relative]
    );
  }
  function useRoutesImpl(routes, locationArg, dataRouterState, onError, future) {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useRoutes() may be used only in the context of a <Router> component.`
    );
    let { navigator } = React22.useContext(NavigationContext);
    let { matches: parentMatches } = React22.useContext(RouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    let parentPathname = routeMatch ? routeMatch.pathname : "/";
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
    let parentRoute = routeMatch && routeMatch.route;
    if (ENABLE_DEV_WARNINGS) {
      let parentPath = parentRoute && parentRoute.path || "";
      warningOnce(
        parentPathname,
        !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
        `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
      );
    }
    let locationFromContext = useLocation();
    let location;
    if (locationArg) {
      let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
      invariant(
        parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase),
        `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
      );
      location = parsedLocationArg;
    } else {
      location = locationFromContext;
    }
    let pathname = location.pathname || "/";
    let remainingPathname = pathname;
    if (parentPathnameBase !== "/") {
      let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
      let segments = pathname.replace(/^\//, "").split("/");
      remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
    }
    let matches = matchRoutes(routes, { pathname: remainingPathname });
    if (ENABLE_DEV_WARNINGS) {
      warning(
        parentRoute || matches != null,
        `No routes matched location "${location.pathname}${location.search}${location.hash}" `
      );
      warning(
        matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
        `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
      );
    }
    let renderedMatches = _renderMatches(
      matches && matches.map(
        (match) => Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: joinPaths([
            parentPathnameBase,
            // Re-encode pathnames that were decoded inside matchRoutes.
            // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
            // `new URL()` internally and we need to prevent it from treating
            // them as separators
            navigator.encodeLocation ? navigator.encodeLocation(
              match.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
            ).pathname : match.pathname
          ]),
          pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
            parentPathnameBase,
            // Re-encode pathnames that were decoded inside matchRoutes
            // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
            // `new URL()` internally and we need to prevent it from treating
            // them as separators
            navigator.encodeLocation ? navigator.encodeLocation(
              match.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
            ).pathname : match.pathnameBase
          ])
        })
      ),
      parentMatches,
      dataRouterState,
      onError,
      future
    );
    if (locationArg && renderedMatches) {
      return /* @__PURE__ */ React22.createElement(
        LocationContext.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...location
            },
            navigationType: "POP"
            /* Pop */
          }
        },
        renderedMatches
      );
    }
    return renderedMatches;
  }
  function DefaultErrorComponent() {
    let error = useRouteError();
    let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
    let stack = error instanceof Error ? error.stack : null;
    let lightgrey = "rgba(200,200,200, 0.5)";
    let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
    let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
    let devInfo = null;
    if (ENABLE_DEV_WARNINGS) {
      console.error(
        "Error handled by React Router default ErrorBoundary:",
        error
      );
      devInfo = /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React22.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React22.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React22.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
    }
    return /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React22.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ React22.createElement("pre", { style: preStyles }, stack) : null, devInfo);
  }
  var defaultErrorElement = /* @__PURE__ */ React22.createElement(DefaultErrorComponent, null);
  var RenderErrorBoundary = class extends React22.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: props.location,
        revalidation: props.revalidation,
        error: props.error
      };
    }
    static getDerivedStateFromError(error) {
      return { error };
    }
    static getDerivedStateFromProps(props, state) {
      if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
        return {
          error: props.error,
          location: props.location,
          revalidation: props.revalidation
        };
      }
      return {
        error: props.error !== void 0 ? props.error : state.error,
        location: state.location,
        revalidation: props.revalidation || state.revalidation
      };
    }
    componentDidCatch(error, errorInfo) {
      if (this.props.onError) {
        this.props.onError(error, errorInfo);
      } else {
        console.error(
          "React Router caught the following error during render",
          error
        );
      }
    }
    render() {
      let error = this.state.error;
      if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
        const decoded = decodeRouteErrorResponseDigest(error.digest);
        if (decoded) error = decoded;
      }
      let result = error !== void 0 ? /* @__PURE__ */ React22.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ React22.createElement(
        RouteErrorContext.Provider,
        {
          value: error,
          children: this.props.component
        }
      )) : this.props.children;
      if (this.context) {
        return /* @__PURE__ */ React22.createElement(RSCErrorHandler, { error }, result);
      }
      return result;
    }
  };
  RenderErrorBoundary.contextType = RSCRouterContext;
  var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
  function RSCErrorHandler({
    children,
    error
  }) {
    let { basename } = React22.useContext(NavigationContext);
    if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      let redirect2 = decodeRedirectErrorDigest(error.digest);
      if (redirect2) {
        let existingRedirect = errorRedirectHandledMap.get(error);
        if (existingRedirect) throw existingRedirect;
        let parsed = parseToInfo(redirect2.location, basename);
        if (isBrowser && !errorRedirectHandledMap.get(error)) {
          if (parsed.isExternal || redirect2.reloadDocument) {
            window.location.href = parsed.absoluteURL || parsed.to;
          } else {
            const redirectPromise = Promise.resolve().then(
              () => window.__reactRouterDataRouter.navigate(parsed.to, {
                replace: redirect2.replace
              })
            );
            errorRedirectHandledMap.set(error, redirectPromise);
            throw redirectPromise;
          }
        }
        return /* @__PURE__ */ React22.createElement(
          "meta",
          {
            httpEquiv: "refresh",
            content: `0;url=${parsed.absoluteURL || parsed.to}`
          }
        );
      }
    }
    return children;
  }
  function RenderedRoute({ routeContext, match, children }) {
    let dataRouterContext = React22.useContext(DataRouterContext);
    if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
      dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
    }
    return /* @__PURE__ */ React22.createElement(RouteContext.Provider, { value: routeContext }, children);
  }
  function _renderMatches(matches, parentMatches = [], dataRouterState = null, onErrorHandler = null, future = null) {
    if (matches == null) {
      if (!dataRouterState) {
        return null;
      }
      if (dataRouterState.errors) {
        matches = dataRouterState.matches;
      } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
        matches = dataRouterState.matches;
      } else {
        return null;
      }
    }
    let renderedMatches = matches;
    let errors = dataRouterState?.errors;
    if (errors != null) {
      let errorIndex = renderedMatches.findIndex(
        (m) => m.route.id && errors?.[m.route.id] !== void 0
      );
      invariant(
        errorIndex >= 0,
        `Could not find a matching route for errors on route IDs: ${Object.keys(
          errors
        ).join(",")}`
      );
      renderedMatches = renderedMatches.slice(
        0,
        Math.min(renderedMatches.length, errorIndex + 1)
      );
    }
    let renderFallback = false;
    let fallbackIndex = -1;
    if (dataRouterState) {
      for (let i = 0; i < renderedMatches.length; i++) {
        let match = renderedMatches[i];
        if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
          fallbackIndex = i;
        }
        if (match.route.id) {
          let { loaderData, errors: errors2 } = dataRouterState;
          let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
          if (match.route.lazy || needsToRunLoader) {
            renderFallback = true;
            if (fallbackIndex >= 0) {
              renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
            } else {
              renderedMatches = [renderedMatches[0]];
            }
            break;
          }
        }
      }
    }
    let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
      onErrorHandler(error, {
        location: dataRouterState.location,
        params: dataRouterState.matches?.[0]?.params ?? {},
        unstable_pattern: getRoutePattern(dataRouterState.matches),
        errorInfo
      });
    } : void 0;
    return renderedMatches.reduceRight(
      (outlet, match, index) => {
        let error;
        let shouldRenderHydrateFallback = false;
        let errorElement = null;
        let hydrateFallbackElement = null;
        if (dataRouterState) {
          error = errors && match.route.id ? errors[match.route.id] : void 0;
          errorElement = match.route.errorElement || defaultErrorElement;
          if (renderFallback) {
            if (fallbackIndex < 0 && index === 0) {
              warningOnce(
                "route-fallback",
                false,
                "No `HydrateFallback` element provided to render during initial hydration"
              );
              shouldRenderHydrateFallback = true;
              hydrateFallbackElement = null;
            } else if (fallbackIndex === index) {
              shouldRenderHydrateFallback = true;
              hydrateFallbackElement = match.route.hydrateFallbackElement || null;
            }
          }
        }
        let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
        let getChildren = () => {
          let children;
          if (error) {
            children = errorElement;
          } else if (shouldRenderHydrateFallback) {
            children = hydrateFallbackElement;
          } else if (match.route.Component) {
            children = /* @__PURE__ */ React22.createElement(match.route.Component, null);
          } else if (match.route.element) {
            children = match.route.element;
          } else {
            children = outlet;
          }
          return /* @__PURE__ */ React22.createElement(
            RenderedRoute,
            {
              match,
              routeContext: {
                outlet,
                matches: matches2,
                isDataRoute: dataRouterState != null
              },
              children
            }
          );
        };
        return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React22.createElement(
          RenderErrorBoundary,
          {
            location: dataRouterState.location,
            revalidation: dataRouterState.revalidation,
            component: errorElement,
            error,
            children: getChildren(),
            routeContext: { outlet: null, matches: matches2, isDataRoute: true },
            onError
          }
        ) : getChildren();
      },
      null
    );
  }
  function getDataRouterConsoleError(hookName) {
    return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function useDataRouterContext(hookName) {
    let ctx = React22.useContext(DataRouterContext);
    invariant(ctx, getDataRouterConsoleError(hookName));
    return ctx;
  }
  function useDataRouterState(hookName) {
    let state = React22.useContext(DataRouterStateContext);
    invariant(state, getDataRouterConsoleError(hookName));
    return state;
  }
  function useRouteContext(hookName) {
    let route = React22.useContext(RouteContext);
    invariant(route, getDataRouterConsoleError(hookName));
    return route;
  }
  function useCurrentRouteId(hookName) {
    let route = useRouteContext(hookName);
    let thisRoute = route.matches[route.matches.length - 1];
    invariant(
      thisRoute.route.id,
      `${hookName} can only be used on routes that contain a unique "id"`
    );
    return thisRoute.route.id;
  }
  function useRouteId() {
    return useCurrentRouteId(
      "useRouteId"
      /* UseRouteId */
    );
  }
  function useNavigation() {
    let state = useDataRouterState(
      "useNavigation"
      /* UseNavigation */
    );
    return state.navigation;
  }
  function useMatches() {
    let { matches, loaderData } = useDataRouterState(
      "useMatches"
      /* UseMatches */
    );
    return React22.useMemo(
      () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
      [matches, loaderData]
    );
  }
  function useRouteError() {
    let error = React22.useContext(RouteErrorContext);
    let state = useDataRouterState(
      "useRouteError"
      /* UseRouteError */
    );
    let routeId = useCurrentRouteId(
      "useRouteError"
      /* UseRouteError */
    );
    if (error !== void 0) {
      return error;
    }
    return state.errors?.[routeId];
  }
  function useNavigateStable() {
    let { router } = useDataRouterContext(
      "useNavigate"
      /* UseNavigateStable */
    );
    let id = useCurrentRouteId(
      "useNavigate"
      /* UseNavigateStable */
    );
    let activeRef = React22.useRef(false);
    useIsomorphicLayoutEffect(() => {
      activeRef.current = true;
    });
    let navigate = React22.useCallback(
      async (to, options = {}) => {
        warning(activeRef.current, navigateEffectWarning);
        if (!activeRef.current) return;
        if (typeof to === "number") {
          await router.navigate(to);
        } else {
          await router.navigate(to, { fromRouteId: id, ...options });
        }
      },
      [router, id]
    );
    return navigate;
  }
  var alreadyWarned = {};
  function warningOnce(key, cond, message) {
    if (!cond && !alreadyWarned[key]) {
      alreadyWarned[key] = true;
      warning(false, message);
    }
  }
  var USE_OPTIMISTIC = "useOptimistic";
  var useOptimisticImpl = React32[USE_OPTIMISTIC];
  var MemoizedDataRoutes = React32.memo(DataRoutes);
  function DataRoutes({
    routes,
    future,
    state,
    onError
  }) {
    return useRoutesImpl(routes, void 0, state, onError, future);
  }
  function Router({
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = "POP",
    navigator,
    static: staticProp = false,
    unstable_useTransitions
  }) {
    invariant(
      !useInRouterContext(),
      `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
    );
    let basename = basenameProp.replace(/^\/*/, "/");
    let navigationContext = React32.useMemo(
      () => ({
        basename,
        navigator,
        static: staticProp,
        unstable_useTransitions,
        future: {}
      }),
      [basename, navigator, staticProp, unstable_useTransitions]
    );
    if (typeof locationProp === "string") {
      locationProp = parsePath(locationProp);
    }
    let {
      pathname = "/",
      search = "",
      hash = "",
      state = null,
      key = "default"
    } = locationProp;
    let locationContext = React32.useMemo(() => {
      let trailingPathname = stripBasename(pathname, basename);
      if (trailingPathname == null) {
        return null;
      }
      return {
        location: {
          pathname: trailingPathname,
          search,
          hash,
          state,
          key
        },
        navigationType
      };
    }, [basename, pathname, search, hash, state, key, navigationType]);
    warning(
      locationContext != null,
      `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
    );
    if (locationContext == null) {
      return null;
    }
    return /* @__PURE__ */ React32.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ React32.createElement(LocationContext.Provider, { children, value: locationContext }));
  }
  var defaultMethod = "get";
  var defaultEncType = "application/x-www-form-urlencoded";
  function isHtmlElement(object) {
    return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
  }
  function isButtonElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
  }
  function isFormElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
  }
  function isInputElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
  }
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  function shouldProcessLinkClick(event, target) {
    return event.button === 0 && // Ignore everything but left clicks
    (!target || target === "_self") && // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event);
  }
  var _formDataSupportsSubmitter = null;
  function isFormDataSubmitterSupported() {
    if (_formDataSupportsSubmitter === null) {
      try {
        new FormData(
          document.createElement("form"),
          // @ts-expect-error if FormData supports the submitter parameter, this will throw
          0
        );
        _formDataSupportsSubmitter = false;
      } catch (e) {
        _formDataSupportsSubmitter = true;
      }
    }
    return _formDataSupportsSubmitter;
  }
  var supportedFormEncTypes = /* @__PURE__ */ new Set([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  ]);
  function getFormEncType(encType) {
    if (encType != null && !supportedFormEncTypes.has(encType)) {
      warning(
        false,
        `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
      );
      return null;
    }
    return encType;
  }
  function getFormSubmissionInfo(target, basename) {
    let method;
    let action;
    let encType;
    let formData;
    let body;
    if (isFormElement(target)) {
      let attr = target.getAttribute("action");
      action = attr ? stripBasename(attr, basename) : null;
      method = target.getAttribute("method") || defaultMethod;
      encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
      formData = new FormData(target);
    } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
      let form = target.form;
      if (form == null) {
        throw new Error(
          `Cannot submit a <button> or <input type="submit"> without a <form>`
        );
      }
      let attr = target.getAttribute("formaction") || form.getAttribute("action");
      action = attr ? stripBasename(attr, basename) : null;
      method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
      encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
      formData = new FormData(form, target);
      if (!isFormDataSubmitterSupported()) {
        let { name, type, value } = target;
        if (type === "image") {
          let prefix = name ? `${name}.` : "";
          formData.append(`${prefix}x`, "0");
          formData.append(`${prefix}y`, "0");
        } else if (name) {
          formData.append(name, value);
        }
      }
    } else if (isHtmlElement(target)) {
      throw new Error(
        `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
      );
    } else {
      method = defaultMethod;
      action = null;
      encType = defaultEncType;
      body = target;
    }
    if (formData && encType === "text/plain") {
      body = formData;
      formData = void 0;
    }
    return { action, method: method.toLowerCase(), encType, formData, body };
  }
  var objectProtoNames2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  var ESCAPE_LOOKUP = {
    "&": "\\u0026",
    ">": "\\u003e",
    "<": "\\u003c",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  function escapeHtml(html) {
    return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
  }
  function invariant2(value, message) {
    if (value === false || value === null || typeof value === "undefined") {
      throw new Error(message);
    }
  }
  function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
    let url = typeof reqUrl === "string" ? new URL(
      reqUrl,
      // This can be called during the SSR flow via PrefetchPageLinksImpl so
      // don't assume window is available
      typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
    ) : reqUrl;
    if (trailingSlashAware) {
      if (url.pathname.endsWith("/")) {
        url.pathname = `${url.pathname}_.${extension}`;
      } else {
        url.pathname = `${url.pathname}.${extension}`;
      }
    } else {
      if (url.pathname === "/") {
        url.pathname = `_root.${extension}`;
      } else if (basename && stripBasename(url.pathname, basename) === "/") {
        url.pathname = `${basename.replace(/\/$/, "")}/_root.${extension}`;
      } else {
        url.pathname = `${url.pathname.replace(/\/$/, "")}.${extension}`;
      }
    }
    return url;
  }
  async function loadRouteModule(route, routeModulesCache) {
    if (route.id in routeModulesCache) {
      return routeModulesCache[route.id];
    }
    try {
      let routeModule = await import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        route.module
      );
      routeModulesCache[route.id] = routeModule;
      return routeModule;
    } catch (error) {
      console.error(
        `Error loading route module \`${route.module}\`, reloading page...`
      );
      console.error(error);
      if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
      import_meta.hot) {
        throw error;
      }
      window.location.reload();
      return new Promise(() => {
      });
    }
  }
  function isPageLinkDescriptor(object) {
    return object != null && typeof object.page === "string";
  }
  function isHtmlLinkDescriptor(object) {
    if (object == null) {
      return false;
    }
    if (object.href == null) {
      return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
    }
    return typeof object.rel === "string" && typeof object.href === "string";
  }
  async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
    let links = await Promise.all(
      matches.map(async (match) => {
        let route = manifest.routes[match.route.id];
        if (route) {
          let mod = await loadRouteModule(route, routeModules);
          return mod.links ? mod.links() : [];
        }
        return [];
      })
    );
    return dedupeLinkDescriptors(
      links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
        (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
      )
    );
  }
  function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
    let isNew = (match, index) => {
      if (!currentMatches[index]) return true;
      return match.route.id !== currentMatches[index].route.id;
    };
    let matchPathChanged = (match, index) => {
      return (
        // param change, /users/123 -> /users/456
        currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
        // e.g. /files/images/avatar.jpg -> files/finances.xls
        currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
      );
    };
    if (mode === "assets") {
      return nextMatches.filter(
        (match, index) => isNew(match, index) || matchPathChanged(match, index)
      );
    }
    if (mode === "data") {
      return nextMatches.filter((match, index) => {
        let manifestRoute = manifest.routes[match.route.id];
        if (!manifestRoute || !manifestRoute.hasLoader) {
          return false;
        }
        if (isNew(match, index) || matchPathChanged(match, index)) {
          return true;
        }
        if (match.route.shouldRevalidate) {
          let routeChoice = match.route.shouldRevalidate({
            currentUrl: new URL(
              location.pathname + location.search + location.hash,
              window.origin
            ),
            currentParams: currentMatches[0]?.params || {},
            nextUrl: new URL(page, window.origin),
            nextParams: match.params,
            defaultShouldRevalidate: true
          });
          if (typeof routeChoice === "boolean") {
            return routeChoice;
          }
        }
        return true;
      });
    }
    return [];
  }
  function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
    return dedupeHrefs(
      matches.map((match) => {
        let route = manifest.routes[match.route.id];
        if (!route) return [];
        let hrefs = [route.module];
        if (route.clientActionModule) {
          hrefs = hrefs.concat(route.clientActionModule);
        }
        if (route.clientLoaderModule) {
          hrefs = hrefs.concat(route.clientLoaderModule);
        }
        if (includeHydrateFallback && route.hydrateFallbackModule) {
          hrefs = hrefs.concat(route.hydrateFallbackModule);
        }
        if (route.imports) {
          hrefs = hrefs.concat(route.imports);
        }
        return hrefs;
      }).flat(1)
    );
  }
  function dedupeHrefs(hrefs) {
    return [...new Set(hrefs)];
  }
  function sortKeys(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    for (let key of keys) {
      sorted[key] = obj[key];
    }
    return sorted;
  }
  function dedupeLinkDescriptors(descriptors, preloads) {
    let set = /* @__PURE__ */ new Set();
    let preloadsSet = new Set(preloads);
    return descriptors.reduce((deduped, descriptor) => {
      let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
      if (alreadyModulePreload) {
        return deduped;
      }
      let key = JSON.stringify(sortKeys(descriptor));
      if (!set.has(key)) {
        set.add(key);
        deduped.push({ key, link: descriptor });
      }
      return deduped;
    }, []);
  }
  function useDataRouterContext2() {
    let context = React8.useContext(DataRouterContext);
    invariant2(
      context,
      "You must render this element inside a <DataRouterContext.Provider> element"
    );
    return context;
  }
  function useDataRouterStateContext() {
    let context = React8.useContext(DataRouterStateContext);
    invariant2(
      context,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    );
    return context;
  }
  var FrameworkContext = React8.createContext(void 0);
  FrameworkContext.displayName = "FrameworkContext";
  function useFrameworkContext() {
    let context = React8.useContext(FrameworkContext);
    invariant2(
      context,
      "You must render this element inside a <HydratedRouter> element"
    );
    return context;
  }
  function usePrefetchBehavior(prefetch, theirElementProps) {
    let frameworkContext = React8.useContext(FrameworkContext);
    let [maybePrefetch, setMaybePrefetch] = React8.useState(false);
    let [shouldPrefetch, setShouldPrefetch] = React8.useState(false);
    let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
    let ref = React8.useRef(null);
    React8.useEffect(() => {
      if (prefetch === "render") {
        setShouldPrefetch(true);
      }
      if (prefetch === "viewport") {
        let callback = (entries) => {
          entries.forEach((entry) => {
            setShouldPrefetch(entry.isIntersecting);
          });
        };
        let observer = new IntersectionObserver(callback, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => {
          observer.disconnect();
        };
      }
    }, [prefetch]);
    React8.useEffect(() => {
      if (maybePrefetch) {
        let id = setTimeout(() => {
          setShouldPrefetch(true);
        }, 100);
        return () => {
          clearTimeout(id);
        };
      }
    }, [maybePrefetch]);
    let setIntent = () => {
      setMaybePrefetch(true);
    };
    let cancelIntent = () => {
      setMaybePrefetch(false);
      setShouldPrefetch(false);
    };
    if (!frameworkContext) {
      return [false, ref, {}];
    }
    if (prefetch !== "intent") {
      return [shouldPrefetch, ref, {}];
    }
    return [
      shouldPrefetch,
      ref,
      {
        onFocus: composeEventHandlers(onFocus, setIntent),
        onBlur: composeEventHandlers(onBlur, cancelIntent),
        onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
        onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
        onTouchStart: composeEventHandlers(onTouchStart, setIntent)
      }
    ];
  }
  function composeEventHandlers(theirHandler, ourHandler) {
    return (event) => {
      theirHandler && theirHandler(event);
      if (!event.defaultPrevented) {
        ourHandler(event);
      }
    };
  }
  function PrefetchPageLinks({ page, ...linkProps }) {
    let { router } = useDataRouterContext2();
    let matches = React8.useMemo(
      () => matchRoutes(router.routes, page, router.basename),
      [router.routes, page, router.basename]
    );
    if (!matches) {
      return null;
    }
    return /* @__PURE__ */ React8.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
  }
  function useKeyedPrefetchLinks(matches) {
    let { manifest, routeModules } = useFrameworkContext();
    let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React8.useState([]);
    React8.useEffect(() => {
      let interrupted = false;
      void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
        (links) => {
          if (!interrupted) {
            setKeyedPrefetchLinks(links);
          }
        }
      );
      return () => {
        interrupted = true;
      };
    }, [matches, manifest, routeModules]);
    return keyedPrefetchLinks;
  }
  function PrefetchPageLinksImpl({
    page,
    matches: nextMatches,
    ...linkProps
  }) {
    let location = useLocation();
    let { future, manifest, routeModules } = useFrameworkContext();
    let { basename } = useDataRouterContext2();
    let { loaderData, matches } = useDataRouterStateContext();
    let newMatchesForData = React8.useMemo(
      () => getNewMatchesForLinks(
        page,
        nextMatches,
        matches,
        manifest,
        location,
        "data"
      ),
      [page, nextMatches, matches, manifest, location]
    );
    let newMatchesForAssets = React8.useMemo(
      () => getNewMatchesForLinks(
        page,
        nextMatches,
        matches,
        manifest,
        location,
        "assets"
      ),
      [page, nextMatches, matches, manifest, location]
    );
    let dataHrefs = React8.useMemo(() => {
      if (page === location.pathname + location.search + location.hash) {
        return [];
      }
      let routesParams = /* @__PURE__ */ new Set();
      let foundOptOutRoute = false;
      nextMatches.forEach((m) => {
        let manifestRoute = manifest.routes[m.route.id];
        if (!manifestRoute || !manifestRoute.hasLoader) {
          return;
        }
        if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
          foundOptOutRoute = true;
        } else if (manifestRoute.hasClientLoader) {
          foundOptOutRoute = true;
        } else {
          routesParams.add(m.route.id);
        }
      });
      if (routesParams.size === 0) {
        return [];
      }
      let url = singleFetchUrl(
        page,
        basename,
        future.unstable_trailingSlashAwareDataRequests,
        "data"
      );
      if (foundOptOutRoute && routesParams.size > 0) {
        url.searchParams.set(
          "_routes",
          nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
        );
      }
      return [url.pathname + url.search];
    }, [
      basename,
      future.unstable_trailingSlashAwareDataRequests,
      loaderData,
      location,
      manifest,
      newMatchesForData,
      nextMatches,
      page,
      routeModules
    ]);
    let moduleHrefs = React8.useMemo(
      () => getModuleLinkHrefs(newMatchesForAssets, manifest),
      [newMatchesForAssets, manifest]
    );
    let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
    return /* @__PURE__ */ React8.createElement(React8.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
      // these don't spread `linkProps` because they are full link descriptors
      // already with their own props
      /* @__PURE__ */ React8.createElement("link", { key, nonce: linkProps.nonce, ...link })
    )));
  }
  function mergeRefs(...refs) {
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }
  var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  try {
    if (isBrowser2) {
      window.__reactRouterVersion = // @ts-expect-error
      "7.12.0";
    }
  } catch (e) {
  }
  function HistoryRouter({
    basename,
    children,
    history,
    unstable_useTransitions
  }) {
    let [state, setStateImpl] = React10.useState({
      action: history.action,
      location: history.location
    });
    let setState = React10.useCallback(
      (newState) => {
        if (unstable_useTransitions === false) {
          setStateImpl(newState);
        } else {
          React10.startTransition(() => setStateImpl(newState));
        }
      },
      [unstable_useTransitions]
    );
    React10.useLayoutEffect(() => history.listen(setState), [history, setState]);
    return /* @__PURE__ */ React10.createElement(
      Router,
      {
        basename,
        children,
        location: state.location,
        navigationType: state.action,
        navigator: history,
        unstable_useTransitions
      }
    );
  }
  HistoryRouter.displayName = "unstable_HistoryRouter";
  var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
  var Link = React10.forwardRef(
    function LinkWithRef({
      onClick,
      discover = "render",
      prefetch = "none",
      relative,
      reloadDocument,
      replace: replace2,
      state,
      target,
      to,
      preventScrollReset,
      viewTransition,
      unstable_defaultShouldRevalidate,
      ...rest
    }, forwardedRef) {
      let { basename, unstable_useTransitions } = React10.useContext(NavigationContext);
      let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
      let parsed = parseToInfo(to, basename);
      to = parsed.to;
      let href = useHref(to, { relative });
      let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
        prefetch,
        rest
      );
      let internalOnClick = useLinkClickHandler(to, {
        replace: replace2,
        state,
        target,
        preventScrollReset,
        relative,
        viewTransition,
        unstable_defaultShouldRevalidate,
        unstable_useTransitions
      });
      function handleClick(event) {
        if (onClick) onClick(event);
        if (!event.defaultPrevented) {
          internalOnClick(event);
        }
      }
      let link = (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        /* @__PURE__ */ React10.createElement(
          "a",
          {
            ...rest,
            ...prefetchHandlers,
            href: parsed.absoluteURL || href,
            onClick: parsed.isExternal || reloadDocument ? onClick : handleClick,
            ref: mergeRefs(forwardedRef, prefetchRef),
            target,
            "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
          }
        )
      );
      return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React10.createElement(React10.Fragment, null, link, /* @__PURE__ */ React10.createElement(PrefetchPageLinks, { page: href })) : link;
    }
  );
  Link.displayName = "Link";
  var NavLink = React10.forwardRef(
    function NavLinkWithRef({
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      viewTransition,
      children,
      ...rest
    }, ref) {
      let path = useResolvedPath(to, { relative: rest.relative });
      let location = useLocation();
      let routerState = React10.useContext(DataRouterStateContext);
      let { navigator, basename } = React10.useContext(NavigationContext);
      let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useViewTransitionState(path) && viewTransition === true;
      let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
      let locationPathname = location.pathname;
      let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
      if (!caseSensitive) {
        locationPathname = locationPathname.toLowerCase();
        nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
        toPathname = toPathname.toLowerCase();
      }
      if (nextLocationPathname && basename) {
        nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
      }
      const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
      let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
      let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
      let renderProps = {
        isActive,
        isPending,
        isTransitioning
      };
      let ariaCurrent = isActive ? ariaCurrentProp : void 0;
      let className;
      if (typeof classNameProp === "function") {
        className = classNameProp(renderProps);
      } else {
        className = [
          classNameProp,
          isActive ? "active" : null,
          isPending ? "pending" : null,
          isTransitioning ? "transitioning" : null
        ].filter(Boolean).join(" ");
      }
      let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
      return /* @__PURE__ */ React10.createElement(
        Link,
        {
          ...rest,
          "aria-current": ariaCurrent,
          className,
          ref,
          style,
          to,
          viewTransition
        },
        typeof children === "function" ? children(renderProps) : children
      );
    }
  );
  NavLink.displayName = "NavLink";
  var Form = React10.forwardRef(
    ({
      discover = "render",
      fetcherKey,
      navigate,
      reloadDocument,
      replace: replace2,
      state,
      method = defaultMethod,
      action,
      onSubmit,
      relative,
      preventScrollReset,
      viewTransition,
      unstable_defaultShouldRevalidate,
      ...props
    }, forwardedRef) => {
      let { unstable_useTransitions } = React10.useContext(NavigationContext);
      let submit = useSubmit();
      let formAction = useFormAction(action, { relative });
      let formMethod = method.toLowerCase() === "get" ? "get" : "post";
      let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
      let submitHandler = (event) => {
        onSubmit && onSubmit(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        let submitter = event.nativeEvent.submitter;
        let submitMethod = submitter?.getAttribute("formmethod") || method;
        let doSubmit = () => submit(submitter || event.currentTarget, {
          fetcherKey,
          method: submitMethod,
          navigate,
          replace: replace2,
          state,
          relative,
          preventScrollReset,
          viewTransition,
          unstable_defaultShouldRevalidate
        });
        if (unstable_useTransitions && navigate !== false) {
          React10.startTransition(() => doSubmit());
        } else {
          doSubmit();
        }
      };
      return /* @__PURE__ */ React10.createElement(
        "form",
        {
          ref: forwardedRef,
          method: formMethod,
          action: formAction,
          onSubmit: reloadDocument ? onSubmit : submitHandler,
          ...props,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      );
    }
  );
  Form.displayName = "Form";
  function ScrollRestoration({
    getKey,
    storageKey,
    ...props
  }) {
    let remixContext = React10.useContext(FrameworkContext);
    let { basename } = React10.useContext(NavigationContext);
    let location = useLocation();
    let matches = useMatches();
    useScrollRestoration({ getKey, storageKey });
    let ssrKey = React10.useMemo(
      () => {
        if (!remixContext || !getKey) return null;
        let userKey = getScrollRestorationKey(
          location,
          matches,
          basename,
          getKey
        );
        return userKey !== location.key ? userKey : null;
      },
      // Nah, we only need this the first time for the SSR render
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    if (!remixContext || remixContext.isSpaMode) {
      return null;
    }
    let restoreScroll = ((storageKey2, restoreKey) => {
      if (!window.history.state || !window.history.state.key) {
        let key = Math.random().toString(32).slice(2);
        window.history.replaceState({ key }, "");
      }
      try {
        let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
        let storedY = positions[restoreKey || window.history.state.key];
        if (typeof storedY === "number") {
          window.scrollTo(0, storedY);
        }
      } catch (error) {
        console.error(error);
        sessionStorage.removeItem(storageKey2);
      }
    }).toString();
    return /* @__PURE__ */ React10.createElement(
      "script",
      {
        ...props,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: `(${restoreScroll})(${escapeHtml(
            JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY)
          )}, ${escapeHtml(JSON.stringify(ssrKey))})`
        }
      }
    );
  }
  ScrollRestoration.displayName = "ScrollRestoration";
  function getDataRouterConsoleError2(hookName) {
    return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function useDataRouterContext3(hookName) {
    let ctx = React10.useContext(DataRouterContext);
    invariant(ctx, getDataRouterConsoleError2(hookName));
    return ctx;
  }
  function useDataRouterState2(hookName) {
    let state = React10.useContext(DataRouterStateContext);
    invariant(state, getDataRouterConsoleError2(hookName));
    return state;
  }
  function useLinkClickHandler(to, {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition,
    unstable_defaultShouldRevalidate,
    unstable_useTransitions
  } = {}) {
    let navigate = useNavigate();
    let location = useLocation();
    let path = useResolvedPath(to, { relative });
    return React10.useCallback(
      (event) => {
        if (shouldProcessLinkClick(event, target)) {
          event.preventDefault();
          let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
          let doNavigate = () => navigate(to, {
            replace: replace2,
            state,
            preventScrollReset,
            relative,
            viewTransition,
            unstable_defaultShouldRevalidate
          });
          if (unstable_useTransitions) {
            React10.startTransition(() => doNavigate());
          } else {
            doNavigate();
          }
        }
      },
      [
        location,
        navigate,
        path,
        replaceProp,
        state,
        target,
        to,
        preventScrollReset,
        relative,
        viewTransition,
        unstable_defaultShouldRevalidate,
        unstable_useTransitions
      ]
    );
  }
  var fetcherId = 0;
  var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
  function useSubmit() {
    let { router } = useDataRouterContext3(
      "useSubmit"
      /* UseSubmit */
    );
    let { basename } = React10.useContext(NavigationContext);
    let currentRouteId = useRouteId();
    let routerFetch = router.fetch;
    let routerNavigate = router.navigate;
    return React10.useCallback(
      async (target, options = {}) => {
        let { action, method, encType, formData, body } = getFormSubmissionInfo(
          target,
          basename
        );
        if (options.navigate === false) {
          let key = options.fetcherKey || getUniqueFetcherId();
          await routerFetch(key, currentRouteId, options.action || action, {
            unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
            preventScrollReset: options.preventScrollReset,
            formData,
            body,
            formMethod: options.method || method,
            formEncType: options.encType || encType,
            flushSync: options.flushSync
          });
        } else {
          await routerNavigate(options.action || action, {
            unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
            preventScrollReset: options.preventScrollReset,
            formData,
            body,
            formMethod: options.method || method,
            formEncType: options.encType || encType,
            replace: options.replace,
            state: options.state,
            fromRouteId: currentRouteId,
            flushSync: options.flushSync,
            viewTransition: options.viewTransition
          });
        }
      },
      [routerFetch, routerNavigate, basename, currentRouteId]
    );
  }
  function useFormAction(action, { relative } = {}) {
    let { basename } = React10.useContext(NavigationContext);
    let routeContext = React10.useContext(RouteContext);
    invariant(routeContext, "useFormAction must be used inside a RouteContext");
    let [match] = routeContext.matches.slice(-1);
    let path = { ...useResolvedPath(action ? action : ".", { relative }) };
    let location = useLocation();
    if (action == null) {
      path.search = location.search;
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      let hasNakedIndexParam = indexValues.some((v) => v === "");
      if (hasNakedIndexParam) {
        params.delete("index");
        indexValues.filter((v) => v).forEach((v) => params.append("index", v));
        let qs = params.toString();
        path.search = qs ? `?${qs}` : "";
      }
    }
    if ((!action || action === ".") && match.route.index) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    }
    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    return createPath(path);
  }
  var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
  var savedScrollPositions = {};
  function getScrollRestorationKey(location, matches, basename, getKey) {
    let key = null;
    if (getKey) {
      if (basename !== "/") {
        key = getKey(
          {
            ...location,
            pathname: stripBasename(location.pathname, basename) || location.pathname
          },
          matches
        );
      } else {
        key = getKey(location, matches);
      }
    }
    if (key == null) {
      key = location.key;
    }
    return key;
  }
  function useScrollRestoration({
    getKey,
    storageKey
  } = {}) {
    let { router } = useDataRouterContext3(
      "useScrollRestoration"
      /* UseScrollRestoration */
    );
    let { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
      "useScrollRestoration"
      /* UseScrollRestoration */
    );
    let { basename } = React10.useContext(NavigationContext);
    let location = useLocation();
    let matches = useMatches();
    let navigation = useNavigation();
    React10.useEffect(() => {
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = "auto";
      };
    }, []);
    usePageHide(
      React10.useCallback(() => {
        if (navigation.state === "idle") {
          let key = getScrollRestorationKey(location, matches, basename, getKey);
          savedScrollPositions[key] = window.scrollY;
        }
        try {
          sessionStorage.setItem(
            storageKey || SCROLL_RESTORATION_STORAGE_KEY,
            JSON.stringify(savedScrollPositions)
          );
        } catch (error) {
          warning(
            false,
            `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
          );
        }
        window.history.scrollRestoration = "auto";
      }, [navigation.state, getKey, basename, location, matches, storageKey])
    );
    if (typeof document !== "undefined") {
      React10.useLayoutEffect(() => {
        try {
          let sessionPositions = sessionStorage.getItem(
            storageKey || SCROLL_RESTORATION_STORAGE_KEY
          );
          if (sessionPositions) {
            savedScrollPositions = JSON.parse(sessionPositions);
          }
        } catch (e) {
        }
      }, [storageKey]);
      React10.useLayoutEffect(() => {
        let disableScrollRestoration = router?.enableScrollRestoration(
          savedScrollPositions,
          () => window.scrollY,
          getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0
        );
        return () => disableScrollRestoration && disableScrollRestoration();
      }, [router, basename, getKey]);
      React10.useLayoutEffect(() => {
        if (restoreScrollPosition === false) {
          return;
        }
        if (typeof restoreScrollPosition === "number") {
          window.scrollTo(0, restoreScrollPosition);
          return;
        }
        try {
          if (location.hash) {
            let el = document.getElementById(
              decodeURIComponent(location.hash.slice(1))
            );
            if (el) {
              el.scrollIntoView();
              return;
            }
          }
        } catch {
          warning(
            false,
            `"${location.hash.slice(
              1
            )}" is not a decodable element ID. The view will not scroll to it.`
          );
        }
        if (preventScrollReset === true) {
          return;
        }
        window.scrollTo(0, 0);
      }, [location, restoreScrollPosition, preventScrollReset]);
    }
  }
  function usePageHide(callback, options) {
    let { capture } = options || {};
    React10.useEffect(() => {
      let opts = capture != null ? { capture } : void 0;
      window.addEventListener("pagehide", callback, opts);
      return () => {
        window.removeEventListener("pagehide", callback, opts);
      };
    }, [callback, capture]);
  }
  function useViewTransitionState(to, { relative } = {}) {
    let vtContext = React10.useContext(ViewTransitionContext);
    invariant(
      vtContext != null,
      "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
    );
    let { basename } = useDataRouterContext3(
      "useViewTransitionState"
      /* useViewTransitionState */
    );
    let path = useResolvedPath(to, { relative });
    if (!vtContext.isTransitioning) {
      return false;
    }
    let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
    let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
    return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
  }

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react3 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react2 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react2.forwardRef)(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => (0, import_react2.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react2.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component4 = (0, import_react3.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react3.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component4.displayName = toPascalCase(iconName);
    return Component4;
  };

  // node_modules/lucide-react/dist/esm/icons/arrow-right.js
  var __iconNode = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ];
  var ArrowRight = createLucideIcon("arrow-right", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/building.js
  var __iconNode2 = [
    ["path", { d: "M12 10h.01", key: "1nrarc" }],
    ["path", { d: "M12 14h.01", key: "1etili" }],
    ["path", { d: "M12 6h.01", key: "1vi96p" }],
    ["path", { d: "M16 10h.01", key: "1m94wz" }],
    ["path", { d: "M16 14h.01", key: "1gbofw" }],
    ["path", { d: "M16 6h.01", key: "1x0f13" }],
    ["path", { d: "M8 10h.01", key: "19clt8" }],
    ["path", { d: "M8 14h.01", key: "6423bh" }],
    ["path", { d: "M8 6h.01", key: "1dz90k" }],
    ["path", { d: "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3", key: "cabbwy" }],
    ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
  ];
  var Building = createLucideIcon("building", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/calendar.js
  var __iconNode3 = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
    ["path", { d: "M3 10h18", key: "8toen8" }]
  ];
  var Calendar = createLucideIcon("calendar", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/chart-column.js
  var __iconNode4 = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }]
  ];
  var ChartColumn = createLucideIcon("chart-column", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var __iconNode5 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("chevron-down", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/chevron-right.js
  var __iconNode6 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var ChevronRight = createLucideIcon("chevron-right", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/circle-alert.js
  var __iconNode7 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ];
  var CircleAlert = createLucideIcon("circle-alert", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/circle-check-big.js
  var __iconNode8 = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
  ];
  var CircleCheckBig = createLucideIcon("circle-check-big", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/circle.js
  var __iconNode9 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
  var Circle = createLucideIcon("circle", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/clock.js
  var __iconNode10 = [
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
  ];
  var Clock = createLucideIcon("clock", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/compass.js
  var __iconNode11 = [
    [
      "path",
      {
        d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
        key: "9ktpf1"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
  ];
  var Compass = createLucideIcon("compass", __iconNode11);

  // node_modules/lucide-react/dist/esm/icons/crown.js
  var __iconNode12 = [
    [
      "path",
      {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
        key: "1vdc57"
      }
    ],
    ["path", { d: "M5 21h14", key: "11awu3" }]
  ];
  var Crown = createLucideIcon("crown", __iconNode12);

  // node_modules/lucide-react/dist/esm/icons/download.js
  var __iconNode13 = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ];
  var Download = createLucideIcon("download", __iconNode13);

  // node_modules/lucide-react/dist/esm/icons/external-link.js
  var __iconNode14 = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ];
  var ExternalLink = createLucideIcon("external-link", __iconNode14);

  // node_modules/lucide-react/dist/esm/icons/file-text.js
  var __iconNode15 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ];
  var FileText = createLucideIcon("file-text", __iconNode15);

  // node_modules/lucide-react/dist/esm/icons/handshake.js
  var __iconNode16 = [
    ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3", key: "efffak" }],
    [
      "path",
      {
        d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
        key: "9pr0kb"
      }
    ],
    ["path", { d: "m21 3 1 11h-2", key: "1tisrp" }],
    ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", key: "1uvwmv" }],
    ["path", { d: "M3 4h8", key: "1ep09j" }]
  ];
  var Handshake = createLucideIcon("handshake", __iconNode16);

  // node_modules/lucide-react/dist/esm/icons/layout-grid.js
  var __iconNode17 = [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
  ];
  var LayoutGrid = createLucideIcon("layout-grid", __iconNode17);

  // node_modules/lucide-react/dist/esm/icons/lightbulb.js
  var __iconNode18 = [
    [
      "path",
      {
        d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
        key: "1gvzjb"
      }
    ],
    ["path", { d: "M9 18h6", key: "x1upvd" }],
    ["path", { d: "M10 22h4", key: "ceow96" }]
  ];
  var Lightbulb = createLucideIcon("lightbulb", __iconNode18);

  // node_modules/lucide-react/dist/esm/icons/list.js
  var __iconNode19 = [
    ["path", { d: "M3 5h.01", key: "18ugdj" }],
    ["path", { d: "M3 12h.01", key: "nlz23k" }],
    ["path", { d: "M3 19h.01", key: "noohij" }],
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M8 12h13", key: "1za7za" }],
    ["path", { d: "M8 19h13", key: "m83p4d" }]
  ];
  var List = createLucideIcon("list", __iconNode19);

  // node_modules/lucide-react/dist/esm/icons/play.js
  var __iconNode20 = [
    [
      "path",
      {
        d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
        key: "10ikf1"
      }
    ]
  ];
  var Play = createLucideIcon("play", __iconNode20);

  // node_modules/lucide-react/dist/esm/icons/scale.js
  var __iconNode21 = [
    ["path", { d: "M12 3v18", key: "108xh3" }],
    ["path", { d: "m19 8 3 8a5 5 0 0 1-6 0zV7", key: "zcdpyk" }],
    ["path", { d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1", key: "1yorad" }],
    ["path", { d: "m5 8 3 8a5 5 0 0 1-6 0zV7", key: "eua70x" }],
    ["path", { d: "M7 21h10", key: "1b0cd5" }]
  ];
  var Scale = createLucideIcon("scale", __iconNode21);

  // node_modules/lucide-react/dist/esm/icons/square-check-big.js
  var __iconNode22 = [
    [
      "path",
      { d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344", key: "2acyp4" }
    ],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
  ];
  var SquareCheckBig = createLucideIcon("square-check-big", __iconNode22);

  // node_modules/lucide-react/dist/esm/icons/target.js
  var __iconNode23 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
  ];
  var Target = createLucideIcon("target", __iconNode23);

  // node_modules/lucide-react/dist/esm/icons/trending-up.js
  var __iconNode24 = [
    ["path", { d: "M16 7h6v6", key: "box55l" }],
    ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
  ];
  var TrendingUp = createLucideIcon("trending-up", __iconNode24);

  // node_modules/lucide-react/dist/esm/icons/users.js
  var __iconNode25 = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
  ];
  var Users = createLucideIcon("users", __iconNode25);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode26 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode26);

  // node_modules/lucide-react/dist/esm/icons/zap.js
  var __iconNode27 = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db"
      }
    ]
  ];
  var Zap = createLucideIcon("zap", __iconNode27);

  // src/pages/Methodologie.jsx
  var statusKleuren = {
    groen: "bg-green-500",
    geel: "bg-yellow-500",
    rood: "bg-red-500"
  };
  var themaIcons = {
    kiezen: SquareCheckBig,
    vormgeven: Lightbulb,
    organiseren: Users,
    sturen: Compass,
    beslissen: Scale,
    samenwerken: Handshake,
    leiden: Crown,
    ontwikkelen: TrendingUp
  };
  var cyclusKleuren = {
    verkennen: "#3b82f6",
    opbouwen: "#8b5cf6",
    uitvoeren: "#10b981",
    afbouwen: "#f59e0b"
  };
  var viewModes = [
    { id: "overzicht", naam: "Overzicht", icon: LayoutGrid },
    { id: "timeline", naam: "Timeline", icon: Calendar },
    { id: "detail", naam: "Detail", icon: List }
  ];
  function Methodologie() {
    const navigate = useNavigate();
    const { voortgang, getCyclusVoortgang, getTotaleVoortgang, getVolgendeActie } = useMethodologieStore();
    const [geselecteerdeCyclus, setGeselecteerdeCyclus] = (0, import_react4.useState)(null);
    const [geselecteerdThema, setGeselecteerdThema] = (0, import_react4.useState)(null);
    const [activeView, setActiveView] = (0, import_react4.useState)("overzicht");
    const [expandedSections, setExpandedSections] = (0, import_react4.useState)({
      baten: true,
      themas: true,
      faseverloop: false,
      sectoren: false
    });
    const totaal = getTotaleVoortgang();
    const volgendeActie = getVolgendeActie();
    const toggleSection = (section) => {
      setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };
    const getDocumentenVoorThema = (themaId) => {
      const templates = documentTemplates.filter((d) => d.themaId === themaId);
      const register = documentenRegister.filter((d) => d.thema === themaId);
      return { templates, register };
    };
    const CyclusDetailModal = ({ cyclus, onClose }) => {
      const kleur = cyclusKleuren[cyclus.id];
      const cyclusActiviteiten = activiteiten.filter((a) => a.cyclusId === cyclus.id);
      const cyclusDocumenten = getDocumentenVoorCyclus(cyclus.id);
      const registerDocs = documentenRegister.filter((d) => d.cyclus === cyclus.id);
      const activiteitenPerThema = {};
      cyclusActiviteiten.forEach((act) => {
        if (!activiteitenPerThema[act.themaId]) {
          activiteitenPerThema[act.themaId] = [];
        }
        activiteitenPerThema[act.themaId].push(act);
      });
      return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-auto" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "p-6 border-b flex items-center justify-between sticky top-0 z-10",
          style: { backgroundColor: kleur, borderColor: kleur }
        },
        /* @__PURE__ */ React.createElement("div", { className: "text-white" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm opacity-80" }, "Cyclus ", cyclus.nummer), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, cyclus.naam), /* @__PURE__ */ React.createElement("div", { className: "text-sm opacity-80 mt-1" }, cyclus.beschrijving)),
        /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "p-2 hover:bg-white/20 rounded-lg text-white" }, /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" }))
      ), /* @__PURE__ */ React.createElement("div", { className: "p-6 space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mb-1" }, "Kernvraag"), /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800" }, cyclus.kernvraag)), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mb-1" }, "Duur"), /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800" }, cyclus.duur)), /* @__PURE__ */ React.createElement("div", { className: "bg-amber-50 rounded-lg p-4 border border-amber-200" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-amber-600 mb-1" }, "Go/No-Go"), /* @__PURE__ */ React.createElement("div", { className: "font-medium text-amber-800 text-sm" }, cyclus.goNogo))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-slate-700 mb-3" }, "Resultaten van deze cyclus"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, cyclus.resultaten.map((res, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm" }, res)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-slate-700 mb-3" }, "Activiteiten per Thema"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, Object.entries(activiteitenPerThema).map(([themaId, acts]) => {
        const thema = themas.find((t) => t.id === themaId);
        if (!thema) return null;
        const Icon2 = themaIcons[themaId] || Circle;
        return /* @__PURE__ */ React.createElement("div", { key: themaId, className: "border border-slate-200 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-6 h-6 rounded flex items-center justify-center",
            style: { backgroundColor: thema.kleur }
          },
          /* @__PURE__ */ React.createElement(Icon2, { className: "w-3 h-3 text-white" })
        ), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800" }, thema.naam)), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2" }, acts.sort((a, b) => a.volgorde - b.volgorde).map((act) => /* @__PURE__ */ React.createElement("li", { key: act.id, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement(CircleCheckBig, { className: "w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-700" }, act.naam), act.deliverables && act.deliverables.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1 mt-1" }, act.deliverables.map((del, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded" }, del))))))));
      }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-slate-700 mb-3" }, "Documenten in deze cyclus"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, registerDocs.map((doc) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: doc.id,
          className: `p-3 rounded-lg border flex items-center gap-3 ${doc.status === "gereed" ? "bg-green-50 border-green-200" : doc.status === "in_bewerking" ? "bg-amber-50 border-amber-200" : doc.status === "actief" ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"}`
        },
        /* @__PURE__ */ React.createElement(FileText, { className: `w-5 h-5 ${doc.status === "gereed" ? "text-green-600" : doc.status === "in_bewerking" ? "text-amber-600" : doc.status === "actief" ? "text-blue-600" : "text-slate-400"}` }),
        /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800 text-sm truncate" }, doc.naam), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, doc.type, " \u2022 ", doc.status)),
        doc.verplicht && /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded" }, "Verplicht")
      )), registerDocs.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "col-span-2 text-sm text-slate-400 text-center py-4" }, "Geen documenten geregistreerd voor deze cyclus"))))));
    };
    const ThemaDetailModal = ({ thema, onClose }) => {
      const Icon2 = themaIcons[thema.id] || Circle;
      const { templates, register } = getDocumentenVoorThema(thema.id);
      return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-auto" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "p-6 border-b flex items-center justify-between sticky top-0 z-10",
          style: { backgroundColor: thema.kleur }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-white" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Icon2, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, thema.naam), /* @__PURE__ */ React.createElement("div", { className: "text-sm opacity-80" }, thema.subtitel))),
        /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "p-2 hover:bg-white/20 rounded-lg text-white" }, /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" }))
      ), /* @__PURE__ */ React.createElement("div", { className: "p-6 space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-slate-600" }, thema.beschrijving), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-400 mt-2" }, "Hoofdstukken: ", thema.hoofdstukken?.join(", "))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-slate-700 mb-3" }, "Kernvragen"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2" }, thema.kernvragen.map((vraag, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "flex items-start gap-2 text-slate-600" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold", style: { color: thema.kleur } }, "?"), /* @__PURE__ */ React.createElement("span", null, vraag))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-slate-700 mb-3" }, "Activiteiten per Cyclus"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, levensloopcycli.map((cyclus) => {
        const cyclusActiviteiten = getActiviteitenVoorThemaEnCyclus(thema.id, cyclus.id);
        const kleur = cyclusKleuren[cyclus.id];
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: cyclus.id,
            className: "border rounded-lg p-4",
            style: { borderColor: `${kleur}40` }
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React.createElement(
            "div",
            {
              className: "w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold",
              style: { backgroundColor: kleur }
            },
            cyclus.nummer
          ), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800" }, cyclus.naam)),
          cyclusActiviteiten.length > 0 ? /* @__PURE__ */ React.createElement("ul", { className: "space-y-2" }, cyclusActiviteiten.map((act) => /* @__PURE__ */ React.createElement("li", { key: act.id, className: "text-sm text-slate-600 flex items-start gap-2" }, /* @__PURE__ */ React.createElement(CircleCheckBig, { className: "w-3 h-3 mt-1 text-green-500 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", null, act.naam)))) : /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-400" }, "Geen activiteiten in deze cyclus")
        );
      }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-slate-700 mb-3 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4" }), "Documenten voor dit thema"), templates.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mb-2" }, "Vereiste documenten (methodologie)"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, templates.map((doc) => {
        const cyclus = levensloopcycli.find((c) => c.id === doc.cyclusId);
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: doc.id,
            className: `p-3 rounded-lg border ${doc.verplicht ? "border-red-200 bg-red-50" : "border-slate-200 bg-slate-50"}`
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4 text-slate-600" }), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800 text-sm" }, doc.naam)),
          /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mt-1 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
            "span",
            {
              className: "px-1.5 py-0.5 rounded text-white text-[10px]",
              style: { backgroundColor: cyclusKleuren[doc.cyclusId] }
            },
            cyclus?.naam
          ), doc.verplicht && /* @__PURE__ */ React.createElement("span", { className: "text-red-600" }, "Verplicht"))
        );
      }))), register.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mb-2" }, "Actuele documenten (Klant in Beeld)"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, register.map((doc) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: doc.id,
          className: `p-3 rounded-lg border flex items-center gap-3 ${doc.status === "gereed" ? "bg-green-50 border-green-200" : doc.status === "in_bewerking" ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"}`
        },
        /* @__PURE__ */ React.createElement(FileText, { className: `w-5 h-5 flex-shrink-0 ${doc.status === "gereed" ? "text-green-600" : doc.status === "in_bewerking" ? "text-amber-600" : "text-slate-400"}` }),
        /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800 text-sm truncate" }, doc.naam), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, doc.versie !== "-" && `v${doc.versie} \u2022 `, doc.status === "gereed" ? "Gereed" : doc.status === "in_bewerking" ? "In bewerking" : "Niet gestart")),
        doc.status === "gereed" && /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4 text-green-600" })
      )))), templates.length === 0 && register.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-lg" }, "Geen documenten gekoppeld aan dit thema")))));
    };
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-slate-800" }, programmaInfo.naam), /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full" }, "Week ", voortgang.huidigeWeek)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 bg-slate-100 rounded-lg p-1" }, viewModes.map((mode) => {
      const Icon2 = mode.icon;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: mode.id,
          onClick: () => setActiveView(mode.id),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all ${activeView === mode.id ? "bg-white shadow-sm text-slate-800 font-medium" : "text-slate-500 hover:text-slate-700"}`
        },
        /* @__PURE__ */ React.createElement(Icon2, { className: "w-4 h-4" }),
        /* @__PURE__ */ React.createElement("span", null, mode.naam)
      );
    }))), volgendeActie && /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-4 text-white shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-white/70 uppercase tracking-wide" }, "Volgende Actie"), /* @__PURE__ */ React.createElement("div", { className: "text-lg font-semibold" }, volgendeActie.naam), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-white/80 flex items-center gap-2 mt-0.5" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 bg-white/20 rounded text-xs" }, themas.find((t) => t.id === volgendeActie.themaId)?.naam), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 bg-white/20 rounded text-xs" }, levensloopcycli.find((c) => c.id === volgendeActie.cyclusId)?.naam)))), /* @__PURE__ */ React.createElement("button", { className: "flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors" }, /* @__PURE__ */ React.createElement(Play, { className: "w-4 h-4" }), "Start"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Voortgang"), /* @__PURE__ */ React.createElement(ChartColumn, { className: "w-4 h-4 text-slate-400" })), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold text-slate-800" }, totaal.percentage, "%"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mt-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 h-2 bg-slate-100 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "h-full bg-blue-500 rounded-full transition-all",
        style: { width: `${totaal.percentage}%` }
      }
    )), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, totaal.completed, "/", totaal.total))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Cyclus"), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-3 h-3 rounded-full",
        style: { backgroundColor: cyclusKleuren[voortgang.huidigeCyclus] }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-bold text-slate-800 capitalize" }, voortgang.huidigeCyclus), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mt-1" }, levensloopcycli.find((c) => c.id === voortgang.huidigeCyclus)?.kernvraag)), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Status"), /* @__PURE__ */ React.createElement(CircleAlert, { className: "w-4 h-4 text-slate-400" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, stuurparameters.map((param) => /* @__PURE__ */ React.createElement("div", { key: param.id, className: "flex flex-col items-center" }, /* @__PURE__ */ React.createElement("div", { className: `w-4 h-4 rounded-full ${statusKleuren[param.status]}` }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 mt-1" }, param.naam.substring(0, 4)))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Sectoren"), /* @__PURE__ */ React.createElement(Users, { className: "w-4 h-4 text-slate-400" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, sectoren.map((sector) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: sector.id,
        onClick: () => navigate(`/sector/${sector.id}`),
        className: "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform",
        style: { backgroundColor: sector.kleur },
        title: sector.naam
      },
      sector.afkorting
    ))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement(Building, { className: "w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800" }, "Levensloopcycli"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "(klik voor details)")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, levensloopcycli.map((cyclus, index) => {
      const isHuidig = voortgang.huidigeCyclus === cyclus.id;
      const cyclusVoortgang = getCyclusVoortgang(cyclus.id);
      const isAfgerond = cyclusVoortgang.percentage === 100;
      const cyclusIndex = levensloopcycli.findIndex((c) => c.id === voortgang.huidigeCyclus);
      const isPast = index < cyclusIndex;
      const kleur = cyclusKleuren[cyclus.id];
      return /* @__PURE__ */ React.createElement("div", { key: cyclus.id, className: "flex items-center flex-1" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setGeselecteerdeCyclus(cyclus),
          className: `flex-1 p-4 rounded-xl text-left transition-all cursor-pointer hover:shadow-md ${isHuidig ? "ring-2 ring-offset-2 shadow-md" : isPast || isAfgerond ? "bg-slate-50" : "bg-slate-50/50"}`,
          style: {
            backgroundColor: isHuidig ? `${kleur}10` : void 0,
            ringColor: isHuidig ? kleur : void 0
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold",
            style: { backgroundColor: kleur }
          },
          cyclus.nummer
        ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800" }, cyclus.naam), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, cyclus.duur)), (isPast || isAfgerond) && /* @__PURE__ */ React.createElement(CircleCheckBig, { className: "w-5 h-5 text-green-500 ml-auto" }), isHuidig && /* @__PURE__ */ React.createElement(Clock, { className: "w-5 h-5 ml-auto", style: { color: kleur } })),
        /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement("div", { className: "h-1.5 bg-slate-200 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "h-full rounded-full transition-all",
            style: {
              width: `${cyclusVoortgang.percentage}%`,
              backgroundColor: kleur
            }
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500 mt-1" }, cyclusVoortgang.percentage, "%"))
      ), index < levensloopcycli.length - 1 && /* @__PURE__ */ React.createElement(ArrowRight, { className: `w-5 h-5 mx-3 ${isPast ? "text-green-500" : "text-slate-300"}` }));
    }))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => toggleSection("themas"),
        className: "w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Compass, { className: "w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement("h2", { className: "font-semibold text-slate-800" }, "8 Thema's"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 ml-2" }, "Doorlopend in elke cyclus")),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "Klik voor details"), expandedSections.themas ? /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-5 h-5 text-slate-400" }) : /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-slate-400" }))
    ), expandedSections.themas && /* @__PURE__ */ React.createElement("div", { className: "p-4 pt-0 grid grid-cols-4 gap-3" }, themas.map((thema) => {
      const Icon2 = themaIcons[thema.id] || Circle;
      const { templates, register } = getDocumentenVoorThema(thema.id);
      const docCount = templates.length + register.length;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: thema.id,
          onClick: () => setGeselecteerdThema(thema),
          className: "p-4 rounded-lg border-2 hover:shadow-md transition-all text-left group",
          style: {
            borderColor: `${thema.kleur}40`,
            backgroundColor: `${thema.kleur}05`
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-8 h-8 rounded-lg flex items-center justify-center",
            style: { backgroundColor: thema.kleur }
          },
          /* @__PURE__ */ React.createElement(Icon2, { className: "w-4 h-4 text-white" })
        ), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800" }, thema.naam)), docCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded" }, docCount, " docs")),
        /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, thema.subtitel)
      );
    }))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => toggleSection("baten"),
        className: "w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Target, { className: "w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement("h2", { className: "font-semibold text-slate-800" }, "Baten per Sector"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 ml-2" }, "6 baten \xD7 3 sectoren")),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-red-600 font-medium" }, "3 kritiek"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-amber-600 font-medium" }, "5 hoog"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-green-600 font-medium" }, "10 midden")), expandedSections.baten ? /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-5 h-5 text-slate-400" }) : /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-slate-400" }))
    ), expandedSections.baten && /* @__PURE__ */ React.createElement("div", { className: "p-4 pt-0" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-sm" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "border-b border-slate-200" }, /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-2 font-medium text-slate-600" }, "Baat"), /* @__PURE__ */ React.createElement("th", { className: "text-center py-3 px-2 font-medium text-slate-600" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-3 h-3 rounded", style: { backgroundColor: sectoren[0].kleur } }), "PO")), /* @__PURE__ */ React.createElement("th", { className: "text-center py-3 px-2 font-medium text-slate-600" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-3 h-3 rounded", style: { backgroundColor: sectoren[1].kleur } }), "VO")), /* @__PURE__ */ React.createElement("th", { className: "text-center py-3 px-2 font-medium text-slate-600" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-3 h-3 rounded", style: { backgroundColor: sectoren[2].kleur } }), "ZAK")))), /* @__PURE__ */ React.createElement("tbody", null, batenProfielen.slice(0, 6).map((baat) => /* @__PURE__ */ React.createElement("tr", { key: baat.id, className: "border-b border-slate-100 hover:bg-slate-50" }, /* @__PURE__ */ React.createElement("td", { className: "py-3 px-2" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800" }, baat.naam), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, baat.indicator)), ["po", "vo", "professionals"].map((sectorId, idx) => {
      const sectorData = baat.perSector?.[sectorId];
      const prioriteitKleur = {
        kritiek: "bg-red-100 text-red-700 border-red-200",
        hoog: "bg-amber-100 text-amber-700 border-amber-200",
        midden: "bg-green-100 text-green-700 border-green-200"
      };
      return /* @__PURE__ */ React.createElement("td", { key: sectorId, className: "py-3 px-2 text-center" }, sectorData ? /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, sectorData.nulmeting, " \u2192 ", /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-700" }, sectorData.doel)), /* @__PURE__ */ React.createElement("span", { className: `inline-block text-[10px] px-1.5 py-0.5 rounded border ${prioriteitKleur[sectorData.prioriteit]}` }, sectorData.prioriteit)) : /* @__PURE__ */ React.createElement("span", { className: "text-slate-300" }, "-"));
    })))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "Prioriteit:"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "px-1.5 py-0.5 rounded border bg-red-100 text-red-700 border-red-200" }, "kritiek")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "px-1.5 py-0.5 rounded border bg-amber-100 text-amber-700 border-amber-200" }, "hoog")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "px-1.5 py-0.5 rounded border bg-green-100 text-green-700 border-green-200" }, "midden"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => toggleSection("faseverloop"),
        className: "w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement("h2", { className: "font-semibold text-slate-800" }, "Faseverloop"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 ml-2" }, "Week-voor-week documentatie")),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded" }, "Week ", voortgang.huidigeWeek, " actief"), expandedSections.faseverloop ? /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-5 h-5 text-slate-400" }) : /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-slate-400" }))
    ), expandedSections.faseverloop && /* @__PURE__ */ React.createElement("div", { className: "p-6 pt-2" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm" }, "1"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-slate-800" }, "VERKENNEN"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, "Week 1-4"))), /* @__PURE__ */ React.createElement("div", { className: "relative pl-4 border-l-2 border-blue-200 space-y-4" }, [
      { week: 1, titel: "Programmavoorstel", doc: "Programmavoorstel (1 A4)", status: "actief" },
      { week: 2, titel: "Sessie baateigenaren", doc: "Sessie-verslag", status: "gepland" },
      { week: 3, titel: "Initi\xEBle businesscase", doc: "Businesscase v0.1", status: "gepland" },
      { week: 4, titel: "Opbouwplan + Go/No-Go", doc: "Opbouwopdracht", status: "gepland", goNogo: true }
    ].map((stap, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: `absolute -left-[21px] w-4 h-4 rounded-full ${stap.status === "gereed" ? "bg-green-500" : stap.status === "actief" ? "bg-blue-500" : "bg-slate-300"} flex items-center justify-center` }, stap.status === "gereed" && /* @__PURE__ */ React.createElement(CircleCheckBig, { className: "w-3 h-3 text-white" }), stap.status === "actief" && /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 text-white" })), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-lg ${stap.goNogo ? "bg-amber-50 border border-amber-200" : stap.status === "actief" ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "Week ", stap.week), stap.goNogo && /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded" }, "Go/No-Go")), /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800 text-sm mt-1" }, stap.titel), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mt-1 flex items-center gap-1" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-3 h-3" }), stap.doc)))), /* @__PURE__ */ React.createElement("div", { className: "relative py-2" }, /* @__PURE__ */ React.createElement("div", { className: "absolute -left-[21px] w-4 h-4 rounded-full bg-[#003366]" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#003366] text-white text-xs font-medium px-3 py-2 rounded-lg text-center" }, "FORMELE START OPBOUWFASE")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold text-sm" }, "2"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-slate-800" }, "OPBOUWEN"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, "Week 5-8"))), /* @__PURE__ */ React.createElement("div", { className: "relative pl-4 border-l-2 border-purple-200 space-y-4" }, [
      { week: 5, titel: "Verdieping baten per sector", doc: "Batenstructuur", status: "gepland" },
      { week: 6, titel: "Inspanningen identificeren", doc: "Inspanningsoverzicht", status: "gepland" },
      { week: 7, titel: "Programmaplan schrijven", doc: "Programmaplan", status: "gepland" },
      { week: 8, titel: "Go/No-Go eerste cyclus", doc: "Cyclusplan 1", status: "gepland", goNogo: true }
    ].map((stap, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: `absolute -left-[21px] w-4 h-4 rounded-full ${stap.status === "gereed" ? "bg-green-500" : stap.status === "actief" ? "bg-purple-500" : "bg-slate-300"} flex items-center justify-center` }, stap.status === "gereed" && /* @__PURE__ */ React.createElement(CircleCheckBig, { className: "w-3 h-3 text-white" }), stap.status === "actief" && /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 text-white" })), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-lg ${stap.goNogo ? "bg-amber-50 border border-amber-200" : stap.status === "actief" ? "bg-purple-50 border border-purple-200" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "Week ", stap.week), stap.goNogo && /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded" }, "Go/No-Go")), /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800 text-sm mt-1" }, stap.titel), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 mt-1 flex items-center gap-1" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-3 h-3" }), stap.doc)))), /* @__PURE__ */ React.createElement("div", { className: "relative py-2" }, /* @__PURE__ */ React.createElement("div", { className: "absolute -left-[21px] w-4 h-4 rounded-full bg-[#003366]" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#003366] text-white text-xs font-medium px-3 py-2 rounded-lg text-center" }, "START EERSTE CYCLUS (UITVOEREN)"))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-6 mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 rounded-full bg-green-500 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CircleCheckBig, { className: "w-3 h-3 text-white" })), /* @__PURE__ */ React.createElement("span", null, "Afgerond")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3 text-white" })), /* @__PURE__ */ React.createElement("span", null, "Actief")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 rounded-full bg-slate-300" }), /* @__PURE__ */ React.createElement("span", null, "Gepland")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded" }, "Go/No-Go"), /* @__PURE__ */ React.createElement("span", null, "Beslismoment"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement(Users, { className: "w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-semibold text-slate-800" }, "Sectoren")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, sectoren.map((sector) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: sector.id,
        onClick: () => navigate(`/sector/${sector.id}`),
        className: "p-4 rounded-lg border-2 hover:shadow-md transition-all text-left",
        style: { borderColor: `${sector.kleur}40` }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-2" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold",
          style: { backgroundColor: sector.kleur }
        },
        sector.afkorting
      ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-slate-800" }, sector.naam), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, sector.beschrijving))),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-slate-100" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "Baateigenaar: ", sector.baateigenaar.naam), /* @__PURE__ */ React.createElement(ExternalLink, { className: "w-4 h-4 text-slate-400" }))
    )))), geselecteerdeCyclus && /* @__PURE__ */ React.createElement(
      CyclusDetailModal,
      {
        cyclus: geselecteerdeCyclus,
        onClose: () => setGeselecteerdeCyclus(null)
      }
    ), geselecteerdThema && /* @__PURE__ */ React.createElement(
      ThemaDetailModal,
      {
        thema: geselecteerdThema,
        onClose: () => setGeselecteerdThema(null)
      }
    ));
  }
  var Methodologie_default = Methodologie;
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-router/dist/development/chunk-EPOLDU6W.mjs:
react-router/dist/development/index.mjs:
  (**
   * react-router v7.12.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-right.js:
lucide-react/dist/esm/icons/building.js:
lucide-react/dist/esm/icons/calendar.js:
lucide-react/dist/esm/icons/chart-column.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/circle-alert.js:
lucide-react/dist/esm/icons/circle-check-big.js:
lucide-react/dist/esm/icons/circle.js:
lucide-react/dist/esm/icons/clock.js:
lucide-react/dist/esm/icons/compass.js:
lucide-react/dist/esm/icons/crown.js:
lucide-react/dist/esm/icons/download.js:
lucide-react/dist/esm/icons/external-link.js:
lucide-react/dist/esm/icons/file-text.js:
lucide-react/dist/esm/icons/handshake.js:
lucide-react/dist/esm/icons/layout-grid.js:
lucide-react/dist/esm/icons/lightbulb.js:
lucide-react/dist/esm/icons/list.js:
lucide-react/dist/esm/icons/play.js:
lucide-react/dist/esm/icons/scale.js:
lucide-react/dist/esm/icons/square-check-big.js:
lucide-react/dist/esm/icons/target.js:
lucide-react/dist/esm/icons/trending-up.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/icons/zap.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
