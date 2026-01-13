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
          Object.defineProperty(Component.prototype, methodName, {
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
        function Component(props, context, updater) {
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
          isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement(object) {
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
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
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
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
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
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
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
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Activity = REACT_ACTIVITY_TYPE;
        exports.Children = fnName;
        exports.Component = Component;
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
        exports.isValidElement = isValidElement;
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

  // src/pages/Risicos.jsx
  var import_react4 = __toESM(require_react(), 1);

  // node_modules/zustand/esm/vanilla.mjs
  var createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
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

  // src/stores/appStore.js
  var initialBaten = [
    {
      id: "1",
      type: "domein",
      domein: "Mens",
      naam: "Verhoogde medewerkerstevredenheid",
      beschrijving: "Medewerkers ervaren meer betekenisvol klantcontact",
      indicator: "MTO-score klanttevredenheid",
      huidigeWaarde: "6.8",
      doelWaarde: "7.5",
      eigenaar: "HR-directeur",
      status: "in_progress"
    },
    {
      id: "2",
      type: "domein",
      domein: "Proces",
      naam: "Uniforme klantprocessen",
      beschrijving: "Alle sectoren werken volgens dezelfde klantstandaard",
      indicator: "% processen gestandaardiseerd",
      huidigeWaarde: "40%",
      doelWaarde: "90%",
      eigenaar: "Procesmanager",
      status: "pending"
    },
    {
      id: "3",
      type: "domein",
      domein: "Systeem",
      naam: "Integraal klantbeeld",
      beschrijving: "Eenduidig CRM met 360\xB0 klantoverzicht",
      indicator: "Datakwaliteitsscore",
      huidigeWaarde: "65%",
      doelWaarde: "95%",
      eigenaar: "IT-manager",
      status: "pending"
    },
    {
      id: "4",
      type: "domein",
      domein: "Cultuur",
      naam: "Klantgerichte mindset",
      beschrijving: "Organisatiebrede focus op klantwaarde",
      indicator: "Cultuurmeting klantfocus",
      huidigeWaarde: "6.2",
      doelWaarde: "7.8",
      eigenaar: "Directie",
      status: "pending"
    },
    {
      id: "5",
      type: "sector",
      sector: "Primair onderwijs",
      naam: "NPS verbetering PO",
      beschrijving: "Hogere klanttevredenheid in primair onderwijs",
      indicator: "NPS score PO",
      huidigeWaarde: "+15",
      doelWaarde: "+35",
      eigenaar: "Sectorhoofd PO",
      status: "in_progress"
    }
  ];
  var initialInspanningen = [
    {
      id: "1",
      type: "project",
      code: "P-001",
      naam: "CRM Selectie & Implementatie",
      beschrijving: "Selecteren en implementeren van nieuw CRM-systeem",
      domein: "Systeem",
      eigenaar: "IT-manager",
      leider: "Projectleider IT",
      startMaand: 1,
      eindMaand: 9,
      status: "in_progress",
      fase: "Fundament"
    },
    {
      id: "2",
      type: "project",
      code: "P-002",
      naam: "Klantreisanalyse",
      beschrijving: "In kaart brengen van alle klantreizen per sector",
      domein: "Proces",
      eigenaar: "Procesmanager",
      leider: "Business Analist",
      startMaand: 2,
      eindMaand: 5,
      status: "planned",
      fase: "Fundament"
    },
    {
      id: "3",
      type: "proces",
      code: "PR-001",
      naam: "Klachtenprocedure optimaliseren",
      beschrijving: "Stroomlijnen en verbeteren van klachtenafhandeling",
      domein: "Proces",
      eigenaar: "Kwaliteitsmanager",
      leider: "Proceseigenaar",
      startMaand: 3,
      eindMaand: 8,
      status: "planned",
      fase: "Implementatie"
    },
    {
      id: "4",
      type: "leer",
      code: "L-001",
      naam: "Training Klantgericht Werken",
      beschrijving: "Organisatiebrede training klantgerichtheid",
      domein: "Mens",
      eigenaar: "HR-directeur",
      leider: "L&D Manager",
      startMaand: 4,
      eindMaand: 12,
      status: "planned",
      fase: "Implementatie"
    },
    {
      id: "5",
      type: "systeem",
      code: "S-001",
      naam: "Data-integratie klantgegevens",
      beschrijving: "Koppelen van alle systemen met klantdata",
      domein: "Systeem",
      eigenaar: "Data Manager",
      leider: "Integratie Architect",
      startMaand: 6,
      eindMaand: 14,
      status: "planned",
      fase: "Implementatie"
    }
  ];
  var initialStakeholders = [
    {
      id: "1",
      naam: "Directie",
      rol: "Opdrachtgever",
      functie: "Algemeen Directeur",
      verantwoordelijkheden: ["Strategische richting", "Budgetgoedkeuring", "Escalatiepunt"]
    },
    {
      id: "2",
      naam: "Sponsorgroep",
      rol: "Sponsorgroep",
      functie: "MT-leden",
      verantwoordelijkheden: ["Draagvlak cre\xEBren", "Middelen vrijmaken", "Besluitvorming"]
    },
    {
      id: "3",
      naam: "Jan de Vries",
      rol: "Programma-eigenaar",
      functie: "Directeur Klantrelaties",
      verantwoordelijkheden: ["Baten realiseren", "Stakeholders managen", "Programmasturing"]
    },
    {
      id: "4",
      naam: "Maria Jansen",
      rol: "Programmamanager",
      functie: "Senior Programmamanager",
      verantwoordelijkheden: ["Dagelijkse leiding", "Planning", "Voortgangsrapportage"]
    }
  ];
  var initialRisicos = [
    {
      id: "1",
      titel: "Weerstand tegen verandering",
      beschrijving: "Medewerkers verzetten zich tegen nieuwe klantgerichte werkwijze",
      categorie: "Organisatie",
      kans: 4,
      impact: 4,
      score: 16,
      eigenaar: "Programmamanager",
      mitigatieMaatregel: "Betrekken medewerkers bij ontwerp, quick wins tonen, training en coaching",
      contingencyPlan: "Extra communicatie en individuele gesprekken met key influencers",
      status: "in_behandeling",
      trend: "stabiel",
      datumGeidentificeerd: "2025-09-15",
      reviewDatum: "2026-01-15"
    },
    {
      id: "2",
      titel: "CRM implementatie vertraagt",
      beschrijving: "Technische complexiteit of leveranciersproblemen vertragen CRM-implementatie",
      categorie: "Technisch",
      kans: 3,
      impact: 4,
      score: 12,
      eigenaar: "IT-manager",
      mitigatieMaatregel: "Strakke planning met buffers, regelmatig leveranciersoverleg",
      contingencyPlan: "Tijdelijke workaround met bestaande systemen",
      status: "open",
      trend: "stabiel",
      datumGeidentificeerd: "2025-10-01",
      reviewDatum: "2026-02-01"
    },
    {
      id: "3",
      titel: "Onvoldoende datakwaliteit",
      beschrijving: "Klantdata is verspreid en onbetrouwbaar, waardoor 360\xB0 klantbeeld niet lukt",
      categorie: "Technisch",
      kans: 4,
      impact: 3,
      score: 12,
      eigenaar: "Data & Tech manager",
      mitigatieMaatregel: "Data governance framework, data quality tooling, opschonactie",
      contingencyPlan: "Handmatige data-opschoning per sector",
      status: "in_behandeling",
      trend: "dalend",
      datumGeidentificeerd: "2025-09-20",
      reviewDatum: "2026-01-20"
    }
  ];
  var initialIssues = [
    {
      id: "1",
      titel: "Onduidelijke RACI voor klantcontact",
      beschrijving: "Het is niet duidelijk wie verantwoordelijk is voor klantcontact bij sectoroverstijgende vragen",
      categorie: "Organisatie",
      prioriteit: "hoog",
      impact: "Stakeholder relatie",
      impactOmschrijving: "Klanten krijgen tegenstrijdige informatie, langere doorlooptijden",
      eigenaar: "Programmamanager",
      oplossing: "RACI matrix opstellen en communiceren naar alle betrokkenen",
      status: "in_behandeling",
      datumGemeld: "2025-12-01",
      datumOpgelost: "",
      escalatieNodig: false
    },
    {
      id: "2",
      titel: "Budget voor training onvoldoende",
      beschrijving: "Het gereserveerde budget voor klantgerichtheidstraining is onvoldoende voor alle medewerkers",
      categorie: "Budget",
      prioriteit: "midden",
      impact: "Kostenverhoging",
      impactOmschrijving: "\u20AC50.000 extra budget nodig of training in fases uitrollen",
      eigenaar: "HR-directeur",
      oplossing: "Extra budget aanvragen of gefaseerde uitrol plannen",
      status: "wacht_op_besluit",
      datumGemeld: "2025-12-15",
      datumOpgelost: "",
      escalatieNodig: true
    }
  ];
  var useAppStore = create((set, get) => ({
    // State
    baten: initialBaten,
    inspanningen: initialInspanningen,
    stakeholders: initialStakeholders,
    risicos: initialRisicos,
    issues: initialIssues,
    // Baten actions
    addBaat: (baat) => set((state) => ({
      baten: [...state.baten, { ...baat, id: Date.now().toString() }]
    })),
    updateBaat: (id, updates) => set((state) => ({
      baten: state.baten.map((b) => b.id === id ? { ...b, ...updates } : b)
    })),
    deleteBaat: (id) => set((state) => ({
      baten: state.baten.filter((b) => b.id !== id)
    })),
    // Inspanningen actions
    addInspanning: (inspanning) => set((state) => ({
      inspanningen: [...state.inspanningen, { ...inspanning, id: Date.now().toString() }]
    })),
    updateInspanning: (id, updates) => set((state) => ({
      inspanningen: state.inspanningen.map((i) => i.id === id ? { ...i, ...updates } : i)
    })),
    deleteInspanning: (id) => set((state) => ({
      inspanningen: state.inspanningen.filter((i) => i.id !== id)
    })),
    // Stakeholders actions
    addStakeholder: (stakeholder) => set((state) => ({
      stakeholders: [...state.stakeholders, { ...stakeholder, id: Date.now().toString() }]
    })),
    updateStakeholder: (id, updates) => set((state) => ({
      stakeholders: state.stakeholders.map((s) => s.id === id ? { ...s, ...updates } : s)
    })),
    deleteStakeholder: (id) => set((state) => ({
      stakeholders: state.stakeholders.filter((s) => s.id !== id)
    })),
    // Risicos actions
    addRisico: (risico) => set((state) => ({
      risicos: [...state.risicos, { ...risico, id: Date.now().toString() }]
    })),
    updateRisico: (id, updates) => set((state) => ({
      risicos: state.risicos.map((r) => r.id === id ? { ...r, ...updates } : r)
    })),
    deleteRisico: (id) => set((state) => ({
      risicos: state.risicos.filter((r) => r.id !== id)
    })),
    // Issues actions
    addIssue: (issue) => set((state) => ({
      issues: [...state.issues, { ...issue, id: Date.now().toString() }]
    })),
    updateIssue: (id, updates) => set((state) => ({
      issues: state.issues.map((i) => i.id === id ? { ...i, ...updates } : i)
    })),
    deleteIssue: (id) => set((state) => ({
      issues: state.issues.filter((i) => i.id !== id)
    })),
    // Computed values
    getStats: () => {
      const state = get();
      return {
        totalBaten: state.baten.length,
        completedBaten: state.baten.filter((b) => b.status === "completed").length,
        totalInspanningen: state.inspanningen.length,
        activeInspanningen: state.inspanningen.filter((i) => i.status === "in_progress").length,
        totalStakeholders: state.stakeholders.length,
        openRisicos: state.risicos.filter((r) => r.status === "open" || r.status === "in_behandeling").length,
        hoogRisicos: state.risicos.filter((r) => (r.score || 0) >= 15).length,
        openIssues: state.issues.filter((i) => i.status === "open" || i.status === "in_behandeling").length
      };
    }
  }));

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
    const Component = (0, import_react3.forwardRef)(
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
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/download.js
  var __iconNode = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ];
  var Download = createLucideIcon("download", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/funnel.js
  var __iconNode2 = [
    [
      "path",
      {
        d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
        key: "sc7q7i"
      }
    ]
  ];
  var Funnel = createLucideIcon("funnel", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/minus.js
  var __iconNode3 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
  var Minus = createLucideIcon("minus", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/pen.js
  var __iconNode4 = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ]
  ];
  var Pen = createLucideIcon("pen", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/plus.js
  var __iconNode5 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/search.js
  var __iconNode6 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  var Search = createLucideIcon("search", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/trash-2.js
  var __iconNode7 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/trending-down.js
  var __iconNode8 = [
    ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
    ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
  ];
  var TrendingDown = createLucideIcon("trending-down", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/trending-up.js
  var __iconNode9 = [
    ["path", { d: "M16 7h6v6", key: "box55l" }],
    ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
  ];
  var TrendingUp = createLucideIcon("trending-up", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/triangle-alert.js
  var __iconNode10 = [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ];
  var TriangleAlert = createLucideIcon("triangle-alert", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode11 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode11);

  // src/pages/Risicos.jsx
  var impactLevels = [
    { value: 1, label: "Zeer Laag", color: "bg-green-100 text-green-800" },
    { value: 2, label: "Laag", color: "bg-lime-100 text-lime-800" },
    { value: 3, label: "Midden", color: "bg-yellow-100 text-yellow-800" },
    { value: 4, label: "Hoog", color: "bg-orange-100 text-orange-800" },
    { value: 5, label: "Zeer Hoog", color: "bg-red-100 text-red-800" }
  ];
  var kansLevels = [
    { value: 1, label: "Zeer Onwaarschijnlijk" },
    { value: 2, label: "Onwaarschijnlijk" },
    { value: 3, label: "Mogelijk" },
    { value: 4, label: "Waarschijnlijk" },
    { value: 5, label: "Zeer Waarschijnlijk" }
  ];
  var statussen = [
    { value: "open", label: "Open", color: "bg-blue-100 text-blue-800" },
    { value: "in_behandeling", label: "In behandeling", color: "bg-yellow-100 text-yellow-800" },
    { value: "gemitigeerd", label: "Gemitigeerd", color: "bg-green-100 text-green-800" },
    { value: "geaccepteerd", label: "Geaccepteerd", color: "bg-slate-100 text-slate-800" },
    { value: "gesloten", label: "Gesloten", color: "bg-gray-100 text-gray-600" }
  ];
  var categorieen = [
    "Organisatie",
    "Technisch",
    "Financieel",
    "Planning",
    "Stakeholders",
    "Externe factoren",
    "Resources"
  ];
  function getRisicoScoreColor(score) {
    if (score <= 4) return "bg-green-500";
    if (score <= 9) return "bg-lime-500";
    if (score <= 14) return "bg-yellow-500";
    if (score <= 19) return "bg-orange-500";
    return "bg-red-500";
  }
  function getRisicoScoreBgColor(score) {
    if (score <= 4) return "bg-green-100 text-green-800";
    if (score <= 9) return "bg-lime-100 text-lime-800";
    if (score <= 14) return "bg-yellow-100 text-yellow-800";
    if (score <= 19) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  }
  function RisicoForm({ risico, onSave, onCancel }) {
    const [form, setForm] = (0, import_react4.useState)(risico || {
      titel: "",
      beschrijving: "",
      categorie: "",
      kans: 3,
      impact: 3,
      eigenaar: "",
      mitigatieMaatregel: "",
      contingencyPlan: "",
      status: "open",
      trend: "stabiel",
      datumGeidentificeerd: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      reviewDatum: ""
    });
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({
        ...form,
        score: form.kans * form.impact
      });
    };
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "form-title"
      },
      /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-6 border-b border-slate-200" }, /* @__PURE__ */ React.createElement("h2", { id: "form-title", className: "text-xl font-semibold text-slate-800" }, risico ? "Risico bewerken" : "Nieuw risico toevoegen"), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: onCancel,
          className: "p-2 hover:bg-slate-100 rounded-lg",
          "aria-label": "Sluit formulier"
        },
        /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5 text-slate-500" })
      )), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "p-6 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Titel *"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "text",
          value: form.titel,
          onChange: (e) => setForm({ ...form, titel: e.target.value }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent",
          required: true,
          placeholder: "Korte, beschrijvende titel"
        }
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Categorie *"), /* @__PURE__ */ React.createElement(
        "select",
        {
          value: form.categorie,
          onChange: (e) => setForm({ ...form, categorie: e.target.value }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent",
          required: true
        },
        /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecteer categorie..."),
        categorieen.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))
      ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Beschrijving *"), /* @__PURE__ */ React.createElement(
        "textarea",
        {
          value: form.beschrijving,
          onChange: (e) => setForm({ ...form, beschrijving: e.target.value }),
          rows: 3,
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent",
          required: true,
          placeholder: "Beschrijf het risico en de mogelijke gevolgen"
        }
      )), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-medium text-slate-700 mb-3" }, "Risico Assessment"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm text-slate-600 mb-1" }, "Kans (1-5)"), /* @__PURE__ */ React.createElement(
        "select",
        {
          value: form.kans,
          onChange: (e) => setForm({ ...form, kans: parseInt(e.target.value) }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
        },
        kansLevels.map((k) => /* @__PURE__ */ React.createElement("option", { key: k.value, value: k.value }, k.value, " - ", k.label))
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm text-slate-600 mb-1" }, "Impact (1-5)"), /* @__PURE__ */ React.createElement(
        "select",
        {
          value: form.impact,
          onChange: (e) => setForm({ ...form, impact: parseInt(e.target.value) }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
        },
        impactLevels.map((i) => /* @__PURE__ */ React.createElement("option", { key: i.value, value: i.value }, i.value, " - ", i.label))
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm text-slate-600 mb-1" }, "Risicoscore"), /* @__PURE__ */ React.createElement("div", { className: `px-4 py-2 rounded-lg font-bold text-center ${getRisicoScoreBgColor(form.kans * form.impact)}` }, form.kans * form.impact)))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Mitigatiemaatregel"), /* @__PURE__ */ React.createElement(
        "textarea",
        {
          value: form.mitigatieMaatregel,
          onChange: (e) => setForm({ ...form, mitigatieMaatregel: e.target.value }),
          rows: 2,
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent",
          placeholder: "Welke maatregelen nemen we om het risico te verkleinen?"
        }
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Contingency Plan"), /* @__PURE__ */ React.createElement(
        "textarea",
        {
          value: form.contingencyPlan,
          onChange: (e) => setForm({ ...form, contingencyPlan: e.target.value }),
          rows: 2,
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent",
          placeholder: "Wat doen we als het risico zich voordoet?"
        }
      ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Eigenaar"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "text",
          value: form.eigenaar,
          onChange: (e) => setForm({ ...form, eigenaar: e.target.value }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent",
          placeholder: "Wie is verantwoordelijk?"
        }
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Status"), /* @__PURE__ */ React.createElement(
        "select",
        {
          value: form.status,
          onChange: (e) => setForm({ ...form, status: e.target.value }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
        },
        statussen.map((s) => /* @__PURE__ */ React.createElement("option", { key: s.value, value: s.value }, s.label))
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Trend"), /* @__PURE__ */ React.createElement(
        "select",
        {
          value: form.trend,
          onChange: (e) => setForm({ ...form, trend: e.target.value }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
        },
        /* @__PURE__ */ React.createElement("option", { value: "stijgend" }, "\u2191 Stijgend"),
        /* @__PURE__ */ React.createElement("option", { value: "stabiel" }, "\u2192 Stabiel"),
        /* @__PURE__ */ React.createElement("option", { value: "dalend" }, "\u2193 Dalend")
      ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Datum Ge\xEFdentificeerd"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "date",
          value: form.datumGeidentificeerd,
          onChange: (e) => setForm({ ...form, datumGeidentificeerd: e.target.value }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
        }
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Review Datum"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "date",
          value: form.reviewDatum,
          onChange: (e) => setForm({ ...form, reviewDatum: e.target.value }),
          className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
        }
      ))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-3 pt-4" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        },
        "Annuleren"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "submit",
          className: "px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#0066cc]"
        },
        "Opslaan"
      ))))
    );
  }
  function Risicos() {
    const { risicos, addRisico, updateRisico, deleteRisico } = useAppStore();
    const [showForm, setShowForm] = (0, import_react4.useState)(false);
    const [editingRisico, setEditingRisico] = (0, import_react4.useState)(null);
    const [filter, setFilter] = (0, import_react4.useState)("all");
    const [search, setSearch] = (0, import_react4.useState)("");
    const filteredRisicos = risicos.filter((r) => {
      const matchesFilter = filter === "all" || r.status === filter || r.categorie === filter;
      const matchesSearch = r.titel?.toLowerCase().includes(search.toLowerCase()) || r.beschrijving?.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    const sortedRisicos = [...filteredRisicos].sort((a, b) => (b.score || 0) - (a.score || 0));
    const handleSave = (form) => {
      if (editingRisico) {
        updateRisico(editingRisico.id, form);
      } else {
        addRisico(form);
      }
      setShowForm(false);
      setEditingRisico(null);
    };
    const handleEdit = (risico) => {
      setEditingRisico(risico);
      setShowForm(true);
    };
    const handleDelete = (id) => {
      if (confirm("Weet je zeker dat je dit risico wilt verwijderen?")) {
        deleteRisico(id);
      }
    };
    const getTrendIcon = (trend) => {
      switch (trend) {
        case "stijgend":
          return /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-4 h-4 text-red-500" });
        case "dalend":
          return /* @__PURE__ */ React.createElement(TrendingDown, { className: "w-4 h-4 text-green-500" });
        default:
          return /* @__PURE__ */ React.createElement(Minus, { className: "w-4 h-4 text-slate-400" });
      }
    };
    const stats = {
      totaal: risicos.length,
      open: risicos.filter((r) => r.status === "open").length,
      hoogRisico: risicos.filter((r) => (r.score || 0) >= 15).length,
      gemitigeerd: risicos.filter((r) => r.status === "gemitigeerd").length
    };
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-slate-800" }, "Risicolog"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-500" }, "Beheer en monitor programmarisico's")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/20240517-Werken-aan-Programmas-Template-risicolog.xlsx",
        download: true,
        className: "flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
      },
      /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4" }),
      "Download Template"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowForm(true),
        className: "flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#0066cc]"
      },
      /* @__PURE__ */ React.createElement(Plus, { className: "w-5 h-5" }),
      "Nieuw risico"
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-4 border border-slate-200" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-500" }, "Totaal Risico's"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-slate-800" }, stats.totaal)), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-4 border border-slate-200" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-500" }, "Open"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-blue-600" }, stats.open)), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-4 border border-slate-200" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-500" }, "Hoog Risico (\u226515)"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-red-600" }, stats.hoogRisico)), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-4 border border-slate-200" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-500" }, "Gemitigeerd"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-green-600" }, stats.gemitigeerd))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-4 items-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex-1 max-w-md" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        placeholder: "Zoeken...",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        className: "w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ React.createElement(Funnel, { className: "w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement(
      "select",
      {
        value: filter,
        onChange: (e) => setFilter(e.target.value),
        className: "px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
      },
      /* @__PURE__ */ React.createElement("option", { value: "all" }, "Alle risico's"),
      /* @__PURE__ */ React.createElement("optgroup", { label: "Status" }, statussen.map((s) => /* @__PURE__ */ React.createElement("option", { key: s.value, value: s.value }, s.label))),
      /* @__PURE__ */ React.createElement("optgroup", { label: "Categorie" }, categorieen.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c)))
    ))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-slate-50" }, /* @__PURE__ */ React.createElement("tr", { className: "text-left text-sm text-slate-500" }, /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "Score"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "Risico"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "Categorie"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "K \xD7 I"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "Eigenaar"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "Trend"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-4 font-medium" }, "Acties"))), /* @__PURE__ */ React.createElement("tbody", null, sortedRisicos.map((risico) => {
      const statusObj = statussen.find((s) => s.value === risico.status);
      return /* @__PURE__ */ React.createElement("tr", { key: risico.id, className: "border-t border-slate-100 hover:bg-slate-50" }, /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4" }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${getRisicoScoreColor(risico.score || 0)}` }, risico.score || 0)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-slate-800" }, risico.titel), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-500 line-clamp-1" }, risico.beschrijving))), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-slate-600" }, risico.categorie)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-slate-600" }, risico.kans, " \xD7 ", risico.impact)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 text-sm text-slate-600" }, risico.eigenaar || "-"), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4" }, /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${statusObj?.color || ""}` }, statusObj?.label || risico.status)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4" }, getTrendIcon(risico.trend)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => handleEdit(risico),
          className: "p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg",
          "aria-label": "Bewerk risico"
        },
        /* @__PURE__ */ React.createElement(Pen, { className: "w-4 h-4" })
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => handleDelete(risico.id),
          className: "p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg",
          "aria-label": "Verwijder risico"
        },
        /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" })
      ))));
    }))), sortedRisicos.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(TriangleAlert, { className: "w-12 h-12 text-slate-300 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-slate-500" }, "Geen risico's gevonden"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowForm(true),
        className: "mt-4 text-[#003366] hover:underline"
      },
      "Voeg je eerste risico toe"
    ))), showForm && /* @__PURE__ */ React.createElement(
      RisicoForm,
      {
        risico: editingRisico,
        onSave: handleSave,
        onCancel: () => {
          setShowForm(false);
          setEditingRisico(null);
        }
      }
    ));
  }
  var Risicos_default = Risicos;
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

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/download.js:
lucide-react/dist/esm/icons/funnel.js:
lucide-react/dist/esm/icons/minus.js:
lucide-react/dist/esm/icons/pen.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/trending-down.js:
lucide-react/dist/esm/icons/trending-up.js:
lucide-react/dist/esm/icons/triangle-alert.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
