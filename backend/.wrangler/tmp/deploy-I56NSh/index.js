var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/stream-hub.ts
var StreamHub = class {
  constructor(state) {
    this.broadcaster = null;
    this.streamInfo = null;
    this.comments = [];
    this.state = state;
  }
  static {
    __name(this, "StreamHub");
  }
  async fetch(request) {
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const name = url.searchParams.get("name") || "Guest";
    const title2 = url.searchParams.get("title");
    const description = url.searchParams.get("description");
    if (url.pathname === "/stream/status") {
      const viewers = this.state.getWebSockets("viewer").length;
      return new Response(JSON.stringify({
        live: this.broadcaster !== null,
        viewers,
        info: this.streamInfo,
        comments: this.comments.slice(-50)
      }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }
    if (request.method === "GET" && url.pathname === "/stream/comments") {
      return new Response(JSON.stringify({ comments: this.comments }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    const delMatch = url.pathname.match(/^\/stream\/comments\/(.+)$/);
    if (request.method === "DELETE" && delMatch) {
      const id2 = delMatch[1];
      this.comments = this.comments.filter((c) => c.id !== id2);
      this._broadcastAll({ type: "comment-deleted", id: id2 });
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }
    const { 0: client, 1: server } = new WebSocketPair();
    const tag = role === "broadcaster" ? "broadcaster" : "viewer";
    this.state.acceptWebSocket(server, [tag, `name:${name}`]);
    const id = crypto.randomUUID();
    server.serializeAttachment({ role: tag, id, name });
    if (role === "broadcaster") {
      for (const ws of this.state.getWebSockets("broadcaster")) {
        if (ws !== server) {
          try {
            ws.close(1e3, "New broadcaster");
          } catch {
          }
        }
      }
      this.broadcaster = server;
      this.streamInfo = {
        title: title2 || "Live Service",
        description: description || ""
      };
      const viewerCount = this.state.getWebSockets("viewer").length;
      server.send(JSON.stringify({
        type: "viewer-count",
        count: viewerCount
      }));
      this._broadcastViewers({
        type: "stream-started",
        info: this.streamInfo
      });
    } else {
      if (this.broadcaster) {
        server.send(JSON.stringify({
          type: "stream-info",
          info: this.streamInfo
        }));
        server.send(JSON.stringify({
          type: "chat-history",
          comments: this.comments.slice(-50)
        }));
        this.broadcaster.send(JSON.stringify({
          type: "viewer-joined",
          viewerId: id,
          name
        }));
      } else {
        server.send(JSON.stringify({ type: "stream-offline" }));
      }
      this._sendViewerCount();
    }
    return new Response(null, { status: 101, webSocket: client });
  }
  async webSocketMessage(ws, data) {
    try {
      const msg = JSON.parse(data);
      const session = ws.deserializeAttachment();
      if (!session) return;
      console.log(`Received message from ${session.role}:`, msg.type);
      if (session.role === "broadcaster") {
        switch (msg.type) {
          case "offer":
            console.log(`Forwarding offer to viewer ${msg.viewerId}`);
            const targetViewer = this._findViewer(msg.viewerId);
            if (targetViewer) {
              targetViewer.send(JSON.stringify({
                type: "offer",
                sdp: msg.sdp,
                viewerId: msg.viewerId
              }));
            }
            break;
          case "answer":
            console.log(`Forwarding answer to broadcaster from viewer ${msg.viewerId}`);
            if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
              this.broadcaster.send(JSON.stringify({
                type: "answer",
                sdp: msg.sdp,
                viewerId: msg.viewerId
              }));
            }
            break;
          case "ice-candidate":
            console.log(`Forwarding ICE candidate to viewer ${msg.viewerId}`);
            const candidateViewer = this._findViewer(msg.viewerId);
            if (candidateViewer) {
              candidateViewer.send(JSON.stringify({
                type: "ice-candidate",
                candidate: msg.candidate,
                viewerId: msg.viewerId
              }));
            }
            break;
          case "end-stream":
            console.log("Stream ended by broadcaster");
            this.streamInfo = null;
            this.broadcaster = null;
            this.comments = [];
            this._broadcastViewers({ type: "stream-ended" });
            break;
          case "chat":
            if (msg.comment?.text?.trim()) {
              const comment = {
                id: crypto.randomUUID(),
                name: session.name,
                text: msg.comment.text.trim().slice(0, 200),
                time: (/* @__PURE__ */ new Date()).toISOString()
              };
              this.comments.push(comment);
              if (this.comments.length > 200) this.comments.shift();
              this._broadcastAll({ type: "chat", comment });
            }
            break;
          default:
            console.log(`Unknown broadcaster message type: ${msg.type}`);
        }
      } else {
        switch (msg.type) {
          case "answer":
            console.log(`Viewer ${session.id} sending answer to broadcaster`);
            if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
              this.broadcaster.send(JSON.stringify({
                type: "answer",
                sdp: msg.sdp,
                viewerId: session.id
              }));
            }
            break;
          case "ice-candidate":
            console.log(`Viewer ${session.id} sending ICE candidate to broadcaster`);
            if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
              this.broadcaster.send(JSON.stringify({
                type: "ice-candidate",
                candidate: msg.candidate,
                viewerId: session.id
              }));
            }
            break;
          case "chat":
            if (msg.text?.trim()) {
              const comment = {
                id: crypto.randomUUID(),
                name: session.name,
                text: msg.text.trim().slice(0, 200),
                time: (/* @__PURE__ */ new Date()).toISOString()
              };
              this.comments.push(comment);
              if (this.comments.length > 200) this.comments.shift();
              this._broadcastAll({ type: "chat", comment });
            }
            break;
          default:
            console.log(`Unknown viewer message type: ${msg.type}`);
        }
      }
    } catch (err) {
      console.error("Error processing WebSocket message:", err);
    }
  }
  async webSocketClose(ws) {
    const session = ws.deserializeAttachment();
    console.log(`WebSocket closed for ${session?.role}: ${session?.id}`);
    if (session?.role === "broadcaster") {
      this.broadcaster = null;
      this.streamInfo = null;
      this._broadcastViewers({ type: "stream-ended" });
    } else if (session) {
      if (this.broadcaster) {
        try {
          this.broadcaster.send(JSON.stringify({
            type: "viewer-left",
            viewerId: session.id
          }));
        } catch {
        }
      }
      this._sendViewerCount();
    }
  }
  async webSocketError(ws) {
    console.error("WebSocket error occurred");
    await this.webSocketClose(ws);
  }
  _sendViewerCount() {
    const viewerCount = this.state.getWebSockets("viewer").length;
    if (this.broadcaster && this.broadcaster.readyState === WebSocket.OPEN) {
      try {
        this.broadcaster.send(JSON.stringify({
          type: "viewer-count",
          count: viewerCount
        }));
      } catch {
      }
    }
    this._broadcastViewers({
      type: "viewer-count",
      count: viewerCount
    });
  }
  _broadcastViewers(msg) {
    const data = JSON.stringify(msg);
    for (const ws of this.state.getWebSockets("viewer")) {
      try {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      } catch {
      }
    }
  }
  _broadcastAll(msg) {
    const data = JSON.stringify(msg);
    for (const ws of [...this.state.getWebSockets("viewer"), ...this.state.getWebSockets("broadcaster")]) {
      try {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      } catch {
      }
    }
  }
  _findViewer(viewerId) {
    for (const ws of this.state.getWebSockets("viewer")) {
      const s = ws.deserializeAttachment();
      if (s?.id === viewerId) return ws;
    }
    return null;
  }
};

// src/index.ts
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
var QSSN_URL = "https://qssn-d1-api.gastonsoftwaresolutions234.workers.dev/api/v1/emails/send";
var MINISTRY_NAME = "Massajja Tower of Intercessory Ministry";
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
  });
}
__name(json, "json");
function htmlRes(content) {
  return new Response(content, {
    headers: { "Content-Type": "text/html;charset=UTF-8" }
  });
}
__name(htmlRes, "htmlRes");
async function sendEmail(apiKey, to, subject, html) {
  const res = await fetch(QSSN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({ to, subject, html, from_name: MINISTRY_NAME })
  });
  return res.ok;
}
__name(sendEmail, "sendEmail");
function welcomeHtml(name) {
  return `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
      <div style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);padding:40px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:1px">${MINISTRY_NAME}</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-style:italic">"God First \u2014 Winning Souls, Setting Captives Free"</p>
      </div>
      <div style="padding:36px 32px">
        <h2 style="color:#1a1a1a;font-size:22px">Welcome, ${name}! \u{1F64F}</h2>
        <p style="color:#555;line-height:1.7">Thank you for subscribing to our ministry updates. You are now part of a growing community of believers standing in the gap for Uganda and the nations.</p>
        <p style="color:#555;line-height:1.7">You will receive notifications about:</p>
        <ul style="color:#555;line-height:2">
          <li>Upcoming revival services &amp; events</li>
          <li>Prayer alerts &amp; intercessory calls</li>
          <li>Ministry news &amp; community outreach updates</li>
        </ul>
        <p style="color:#555;line-height:1.7">We are glad to have you with us. May God bless you richly.</p>
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;text-align:center;color:#999;font-size:13px">
          <p>${MINISTRY_NAME} \xB7 Massajja, Wakiso District, Kampala, Uganda</p>
        </div>
      </div>
    </div>`;
}
__name(welcomeHtml, "welcomeHtml");
function updateHtml(title2, content, date) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title2}</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10)">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#c0392b 0%,#e67e22 60%,#f1c40f 100%);padding:40px 32px;text-align:center">
          <p style="margin:0 0 8px;color:rgba(255,255,255,0.8);font-size:12px;letter-spacing:3px;text-transform:uppercase">Ministry Update</p>
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:bold;letter-spacing:0.5px">${MINISTRY_NAME}</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-style:italic;font-size:14px">"God First \u2014 Winning Souls, Setting Captives Free"</p>
        </td>
      </tr>

      <!-- Date badge -->
      <tr>
        <td style="background:#fdf6ec;padding:14px 32px;border-bottom:1px solid #f0e0c8;text-align:center">
          <span style="color:#e67e22;font-size:13px;font-weight:bold;letter-spacing:1px">${date}</span>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 32px">
          <h2 style="margin:0 0 20px;color:#1a1a1a;font-size:26px;line-height:1.3;border-left:4px solid #c0392b;padding-left:16px">${title2}</h2>
          <p style="margin:0 0 24px;color:#444444;font-size:16px;line-height:1.8">${content}</p>
          <hr style="border:none;border-top:1px solid #eeeeee;margin:32px 0">

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:8px 0 24px">
                <a href="https://tower-of-intercessory-ministry.vercel.app/updates"
                   style="display:inline-block;background:linear-gradient(135deg,#c0392b,#e67e22);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:15px;font-weight:bold;letter-spacing:0.5px;box-shadow:0 4px 14px rgba(192,57,43,0.35)">
                  Read Full Update
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Divider -->
      <tr>
        <td style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);height:4px"></td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1a1a1a;padding:28px 32px;text-align:center">
          <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:bold">${MINISTRY_NAME}</p>
          <p style="margin:0 0 6px;color:#aaaaaa;font-size:12px">Massajja, Wakiso District, Kampala, Uganda</p>
          <p style="margin:16px 0 0;color:#666666;font-size:11px">You are receiving this because you subscribed to our ministry updates.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
__name(updateHtml, "updateHtml");
function loginPage(error3 = "", otpSent = false) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Login \u2014 ${MINISTRY_NAME}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Georgia,serif;background:linear-gradient(135deg,#c0392b 0%,#e67e22 60%,#f1c40f 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:#fff;border-radius:20px;padding:48px 40px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.25);text-align:center}
.logo{width:90px;height:90px;border-radius:50%;object-fit:cover;border:4px solid #f1c40f;box-shadow:0 4px 20px rgba(192,57,43,0.3);margin-bottom:20px}
h1{font-size:20px;color:#1a1a1a;margin-bottom:4px}
.sub{color:#888;font-size:13px;margin-bottom:28px;font-style:italic}
input{width:100%;padding:14px 16px;border:1.5px solid #e0e0e0;border-radius:10px;font-size:15px;margin-bottom:16px;transition:border-color .2s;outline:none}
input:focus{border-color:#c0392b}
button{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:15px;border-radius:10px;font-size:16px;font-weight:bold;cursor:pointer;width:100%;letter-spacing:.5px;transition:opacity .2s;margin-bottom:10px}
button:hover{opacity:.9}
button.secondary{background:#f0f0f0;color:#333;font-size:14px;padding:12px}
.error{background:#fdf0f0;border:1px solid #f5c6cb;color:#c0392b;padding:12px;border-radius:8px;margin-bottom:16px;font-size:13px}
.success{background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;padding:12px;border-radius:8px;margin-bottom:16px;font-size:13px}
.footer{margin-top:24px;color:#bbb;font-size:11px}
</style>
</head><body>
<div class="card">
  <img src="/logo.jpg" class="logo" alt="Ministry Logo">
  <h1>Admin Portal</h1>
  <p class="sub">${MINISTRY_NAME}</p>
  ${error3 ? `<div class="error">${error3}</div>` : ""}
  ${otpSent ? `<div class="success">\u2713 A one-time password has been sent to the ministry email. It expires in 10 minutes.</div>` : ""}
  ${!otpSent ? `
  <form method="POST" action="/admin/request-otp">
    <button type="submit">Send One-Time Password to Email</button>
  </form>` : `
  <form method="POST" action="/admin/verify-otp">
    <input type="text" name="otp" placeholder="Enter 6-digit OTP" maxlength="6" required autofocus autocomplete="off">
    <button type="submit">Sign In</button>
  </form>
  <form method="POST" action="/admin/request-otp">
    <button type="submit" class="secondary">Resend OTP</button>
  </form>`}
  <p class="footer">Restricted access \u2014 authorized personnel only</p>
  <div style="margin-top:20px;background:#fff8e1;border:1px solid #f59e0b;border-radius:10px;padding:14px;text-align:left;font-size:12px;color:#92400e;line-height:1.7">
    <strong>Security Notice:</strong><br>
    &bull; Never share your OTP with anyone.<br>
    &bull; Do NOT sign in to your admin email on shared, public, or other people's devices. Anyone with access to your email can receive OTPs and access this portal.<br>
    &bull; Always sign out of your email after retrieving the OTP on any device that is not yours.
  </div>
</div>
</body></html>`;
}
__name(loginPage, "loginPage");
function adminPage() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Dashboard \u2014 ${MINISTRY_NAME}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Georgia,serif;background:#f0f0f0;min-height:100vh;padding:20px}
.wrap{max-width:1100px;margin:0 auto}
.header{background:linear-gradient(135deg,#c0392b 0%,#e67e22 60%,#f1c40f 100%);padding:20px 28px;border-radius:16px;color:#fff;margin-bottom:24px;display:flex;align-items:center;gap:16px;box-shadow:0 4px 20px rgba(192,57,43,0.25)}
.header img{width:56px;height:56px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.6);flex-shrink:0}
.header-text{flex:1}
.header h1{font-size:20px;margin-bottom:2px}
.header p{opacity:.85;font-size:12px}
.logout{background:rgba(255,255,255,0.2);color:#fff;border:1.5px solid rgba(255,255,255,0.5);padding:8px 18px;border-radius:8px;font-size:13px;font-weight:bold;cursor:pointer;text-decoration:none;transition:background .2s;white-space:nowrap}
.logout:hover{background:rgba(255,255,255,0.35)}
.grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}
@media(max-width:700px){.grid{grid-template-columns:1fr}}
.card{background:#fff;border-radius:14px;padding:22px;box-shadow:0 2px 14px rgba(0,0,0,0.07)}
.card h2{font-size:16px;margin-bottom:14px;color:#333;display:flex;align-items:center;gap:8px}
.badge{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;font-size:11px;padding:3px 10px;border-radius:20px;font-weight:bold}
.sub{background:#f9f9f9;padding:12px;border-radius:10px;margin-bottom:8px;display:flex;gap:12px;align-items:center;border:1px solid #f0f0f0}
.avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#c0392b,#f1c40f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:16px;flex-shrink:0}
.info{flex:1;min-width:0}
.name{font-weight:600;color:#222;font-size:14px}
.meta{font-size:12px;color:#888;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px}
label{display:block;font-size:13px;font-weight:600;color:#555;margin-bottom:5px}
input,textarea{width:100%;padding:11px 13px;border:1.5px solid #e0e0e0;border-radius:9px;font-family:inherit;font-size:14px;margin-bottom:14px;outline:none;transition:border-color .2s}
input:focus,textarea:focus{border-color:#c0392b}
textarea{resize:vertical;min-height:110px}
button[type=submit]{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:14px;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;width:100%;letter-spacing:.3px;transition:opacity .2s}
button[type=submit]:hover{opacity:.9}
button[type=submit]:disabled{opacity:.6;cursor:not-allowed}
.live-badge{display:inline-flex;align-items:center;gap:6px;background:#c0392b;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold}
.live-dot{width:8px;height:8px;border-radius:50%;background:#fff;animation:pulse 1.2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
video{width:100%;border-radius:10px;background:#000;max-height:220px}
.go-live-btn{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:13px;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;width:100%;margin-top:8px}
.end-btn{background:#333;color:#fff;border:none;padding:13px;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;width:100%;margin-top:8px}
.go-live-btn:disabled,.end-btn:disabled{opacity:.5;cursor:not-allowed}
</style>
</head><body><div class="wrap">

<div class="header">
  <img src="/logo.jpg" alt="Logo">
  <div class="header-text">
    <h1>Admin Dashboard</h1>
    <p>Manage subscribers and post ministry updates</p>
  </div>
  <a href="/logout" class="logout">Sign Out</a>
</div>

<div class="grid">
  <div class="card">
    <h2>Subscribers <span class="badge" id="cnt">0</span></h2>
    <div id="list"><div class="empty">Loading...</div></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div class="card">
      <h2>Go Live</h2>
      <div id="live-status" style="margin-bottom:12px;font-size:13px;color:#888">Not streaming</div>
      <video id="preview" autoplay muted playsinline style="display:none"></video>
      <label style="display:block;font-size:13px;font-weight:600;color:#555;margin:10px 0 5px">Stream Title</label>
      <input id="live-title" placeholder="e.g. Sunday Worship Service" style="width:100%;padding:11px 13px;border:1.5px solid #e0e0e0;border-radius:9px;font-size:14px;margin-bottom:10px">
      <label style="display:block;font-size:13px;font-weight:600;color:#555;margin-bottom:5px">Description (optional)</label>
      <input id="live-desc" placeholder="e.g. Join us for praise and worship" style="width:100%;padding:11px 13px;border:1.5px solid #e0e0e0;border-radius:9px;font-size:14px;margin-bottom:10px">
      <button class="go-live-btn" id="go-live-btn" onclick="startLive()">Start Live Stream</button>
      <button class="end-btn" id="end-live-btn" onclick="endLive()" style="display:none">End Stream</button>
      <div id="viewer-count" style="margin-top:10px;font-size:13px;color:#888;display:none">
        <span id="vc">0</span> viewers watching
      </div>
      <div id="chat-box" style="display:none;margin-top:14px;background:#f9f9f9;border-radius:10px;padding:10px;max-height:200px;overflow-y:auto;font-size:13px" id="chat-box"></div>
    </div>
    <div class="card">
      <h2>Post Update</h2>
      <form id="form">
        <label>Title</label>
        <input id="title" placeholder="e.g. Easter Revival Week Announced" required>
        <label>Message</label>
        <textarea id="msg" placeholder="Write your update here..." required></textarea>
        <label>Date (optional)</label>
        <input type="date" id="date">
        <div id="res"></div>
        <button type="submit" id="btn">Post Update &amp; Notify All Subscribers</button>
      </form>
    </div>
  </div>
</div>

<div class="card" style="margin-top:20px">
  <h2>Posted Updates <span class="badge" id="ucnt">0</span></h2>
  <div id="ulist"><div style="text-align:center;padding:30px;color:#bbb;font-size:14px">Loading...</div></div>
</div>

<div class="card" style="margin-top:20px">
  <h2>Live Chat Comments <span class="badge" id="ccnt">0</span></h2>
  <div id="clist"><div style="text-align:center;padding:30px;color:#bbb;font-size:14px">No comments yet.</div></div>
</div>

</div>
<script>
let subs=[];
let ws=null,pc=null,stream=null,viewers={};
let intentionalClose=false;
let notifiedLive=false;
let liveTitle='',liveDesc='';
const WS='wss://towerintercessoryministry.towerintercessoryministry.workers.dev/stream';

function connectWS(){
  if(intentionalClose)return;
  ws=new WebSocket(WS+'?role=broadcaster&title='+encodeURIComponent(liveTitle)+'&description='+encodeURIComponent(liveDesc));
  ws.onopen=()=>{
    document.getElementById('live-status').innerHTML='<span class="live-badge"><span class="live-dot"></span>LIVE</span>';
    document.getElementById('go-live-btn').style.display='none';
    document.getElementById('end-live-btn').style.display='block';
    // Only notify subscribers once per live session \u2014 not on every reconnect
    if(!notifiedLive){
      notifiedLive=true;
      fetch('/go-live',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:liveTitle,description:liveDesc})});
    }
  };
  ws.onerror=()=>{};
  ws.onmessage=async(e)=>{
    const msg=JSON.parse(e.data);
    if(msg.type==='viewer-joined'){
      const vid=msg.viewerId;
      const p=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
      viewers[vid]=p;
      stream.getTracks().forEach(t=>p.addTrack(t,stream));
      p.onicecandidate=(ev)=>{if(ev.candidate)ws.send(JSON.stringify({type:'ice-candidate',candidate:ev.candidate,viewerId:vid}));};
      const offer=await p.createOffer();
      await p.setLocalDescription(offer);
      ws.send(JSON.stringify({type:'offer',sdp:offer,viewerId:vid}));
    }
    if(msg.type==='answer'&&viewers[msg.viewerId]){
      await viewers[msg.viewerId].setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
    if(msg.type==='ice-candidate'&&viewers[msg.viewerId]){
      try{await viewers[msg.viewerId].addIceCandidate(new RTCIceCandidate(msg.candidate));}catch{}
    }
    if(msg.type==='viewer-left'&&viewers[msg.viewerId]){
      viewers[msg.viewerId].close();delete viewers[msg.viewerId];
    }
    if(msg.type==='viewer-count'){
      document.getElementById('vc').textContent=msg.count;
      document.getElementById('viewer-count').style.display='block';
    }
    if(msg.type==='chat'&&msg.comment){addComment(msg.comment);}
  };
  ws.onclose=(e)=>{
    if(intentionalClose)return;
    // Reconnect automatically \u2014 keep camera running
    document.getElementById('live-status').textContent='Reconnecting...';
    setTimeout(connectWS,2000);
  };
}

async function startLive(){
  liveTitle=document.getElementById('live-title').value||'Live Service';
  liveDesc=document.getElementById('live-desc').value||'';
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    const preview=document.getElementById('preview');
    preview.srcObject=stream;preview.style.display='block';
    intentionalClose=false;
    notifiedLive=false;
    connectWS();
  }catch(err){alert('Camera access denied or error: '+err.message);}
}

function addComment(c){
  const box=document.getElementById('chat-box');
  box.style.display='block';
  const t=new Date(c.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  box.innerHTML+='<div style="margin-bottom:6px"><span style="font-weight:600;color:#c0392b">'+c.name+'</span> <span style="color:#aaa;font-size:11px">'+t+'</span><br>'+c.text+'</div>';
  box.scrollTop=box.scrollHeight;
}

function endLive(){
  intentionalClose=true;
  notifiedLive=false;
  if(ws){ws.send(JSON.stringify({type:'end-stream'}));ws.close();}
  if(stream)stream.getTracks().forEach(t=>t.stop());
  Object.values(viewers).forEach(p=>p.close());
  viewers={};stream=null;ws=null;
  document.getElementById('preview').style.display='none';
  document.getElementById('preview').srcObject=null;
  document.getElementById('live-status').textContent='Not streaming';
  document.getElementById('go-live-btn').style.display='block';
  document.getElementById('end-live-btn').style.display='none';
  document.getElementById('viewer-count').style.display='none';
  document.getElementById('chat-box').style.display='none';
  // Keep chat history visible \u2014 don't wipe on end
}

async function load(){
  const r=await fetch('/subscribers');
  const d=await r.json();
  subs=d.subscribers||[];
  document.getElementById('cnt').textContent=subs.length;
  const el=document.getElementById('list');
  if(!subs.length){el.innerHTML='<div style="text-align:center;padding:40px;color:#bbb">No subscribers yet.</div>';return;}
  el.innerHTML=subs.map(s=>'<div class="sub"><div class="avatar">'+s.full_name[0].toUpperCase()+'</div><div class="info"><div class="name">'+s.full_name+'</div><div class="meta">'+s.email+' &nbsp;\xB7&nbsp; '+s.whatsapp+' &nbsp;\xB7&nbsp; '+s.location+'</div></div></div>').join('');
}

async function loadUpdates(){
  const r=await fetch('/updates');
  const d=await r.json();
  const updates=d.updates||[];
  document.getElementById('ucnt').textContent=updates.length;
  const el=document.getElementById('ulist');
  if(!updates.length){el.innerHTML='<div style="text-align:center;padding:30px;color:#bbb;font-size:14px">No updates posted yet.</div>';return;}
  el.innerHTML=updates.map(u=>\`
    <div id="upd-\${u.id}" style="background:#f9f9f9;border-radius:10px;padding:14px;margin-bottom:10px;border:1px solid #eee">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;color:#222;font-size:14px">\${u.title}</div>
          <div style="font-size:12px;color:#aaa;margin-top:2px">\${u.date}</div>
          <div style="font-size:13px;color:#666;margin-top:6px;line-height:1.5">\${u.content}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button onclick="editUpdate(\${u.id},'\${encodeURIComponent(u.title)}','\${encodeURIComponent(u.content)}','\${u.date}')"
            style="background:#e67e22;color:#fff;border:none;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:bold;cursor:pointer">Edit</button>
          <button onclick="deleteUpdate(\${u.id})"
            style="background:#c0392b;color:#fff;border:none;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:bold;cursor:pointer">Delete</button>
        </div>
      </div>
    </div>\`).join('');
}

async function deleteUpdate(id){
  if(!confirm('Delete this update?'))return;
  await fetch('/updates/'+id,{method:'DELETE'});
  loadUpdates();
}

function editUpdate(id,title,content,date){
  const t=decodeURIComponent(title);
  const c=decodeURIComponent(content);
  document.getElementById('upd-'+id).innerHTML=\`
    <div style="display:flex;flex-direction:column;gap:8px">
      <input id="et-\${id}" value="\${t.replace(/"/g,'&quot;')}" style="padding:9px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:14px">
      <textarea id="ec-\${id}" rows="3" style="padding:9px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:14px;resize:vertical">\${c}</textarea>
      <input type="date" id="ed-\${id}" value="\${date}" style="padding:9px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:14px">
      <div style="display:flex;gap:8px">
        <button onclick="saveUpdate(\${id})" style="background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:bold;cursor:pointer">Save & Notify Subscribers</button>
        <button onclick="loadUpdates()" style="background:#eee;color:#333;border:none;padding:9px 14px;border-radius:8px;font-size:13px;cursor:pointer">Cancel</button>
      </div>
    </div>\`;
}

async function saveUpdate(id){
  const title=document.getElementById('et-'+id).value;
  const content=document.getElementById('ec-'+id).value;
  const date=document.getElementById('ed-'+id).value||new Date().toDateString();
  const r=await fetch('/updates/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,content,date})});
  const d=await r.json();
  if(d.success)alert('Updated! Notified '+d.sent+' subscribers.');
  loadUpdates();
}
document.getElementById('form').onsubmit=async(e)=>{
  e.preventDefault();
  const btn=document.getElementById('btn');
  btn.disabled=true;btn.textContent='Posting & notifying '+subs.length+' subscribers...';
  document.getElementById('res').innerHTML='';
  const r=await fetch('/notify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:document.getElementById('title').value,content:document.getElementById('msg').value,date:document.getElementById('date').value||new Date().toDateString()})});
  const d=await r.json();
  btn.disabled=false;btn.textContent='Post Update & Notify All Subscribers';
  if(d.success){document.getElementById('res').innerHTML='<div class="ok">&#10003; Update posted! Emails sent to '+d.sent+'/'+d.total+' subscribers.'+(d.failed?' ('+d.failed+' failed)':'')+'</div>';document.getElementById('title').value='';document.getElementById('msg').value='';document.getElementById('date').value='';}
};
async function loadComments(){
  try{
    const r=await fetch('/stream/comments');
    const d=await r.json();
    const comments=d.comments||[];
    document.getElementById('ccnt').textContent=comments.length;
    const el=document.getElementById('clist');
    if(!comments.length){el.innerHTML='<div style="text-align:center;padding:30px;color:#bbb;font-size:14px">No comments yet.</div>';return;}
    el.innerHTML=comments.map(c=>\`
      <div id="cmt-\${c.id}" style="background:#f9f9f9;border-radius:10px;padding:12px 14px;margin-bottom:8px;border:1px solid #eee;display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="flex:1;min-width:0">
          <span style="font-weight:600;color:#c0392b;font-size:13px">\${c.name}</span>
          <span style="color:#aaa;font-size:11px;margin-left:8px">\${new Date(c.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
          <p style="margin:4px 0 0;font-size:13px;color:#444;line-height:1.4">\${c.text}</p>
        </div>
        <button onclick="deleteComment('\${c.id}')" style="background:#c0392b;color:#fff;border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:bold;cursor:pointer;flex-shrink:0">Delete</button>
      </div>\`).join('');
  }catch(e){console.error(e);}
}

async function deleteComment(id){
  if(!confirm('Delete this comment?'))return;
  await fetch('/stream/comments/'+id,{method:'DELETE'});
  loadComments();
}
load();loadUpdates();loadComments();setInterval(loadComments,5000);
<\/script></body></html>`;
}
__name(adminPage, "adminPage");
var index_default = {
  async fetch(request, env2) {
    const { method, url } = request;
    const { pathname } = new URL(url);
    const cookies = request.headers.get("Cookie") || "";
    if (method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    if (pathname === "/logout") {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/admin",
          "Set-Cookie": "admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
        }
      });
    }
    if (pathname === "/admin") {
      const lockout = await env2.OTP_STORE.get("otp_lockout");
      if (lockout) {
        const { until } = JSON.parse(lockout);
        const remaining = Math.ceil((until - Date.now()) / 6e4);
        return htmlRes(loginPage(`Too many failed attempts. Portal locked for ${remaining} more minute(s). Refreshing will not help.`, false));
      }
      if (!cookies.includes("admin_session=true")) {
        return htmlRes(loginPage());
      }
      return htmlRes(adminPage());
    }
    if (method === "POST" && pathname === "/admin/request-otp") {
      const lockout = await env2.OTP_STORE.get("otp_lockout");
      if (lockout) {
        const { until } = JSON.parse(lockout);
        const remaining = Math.ceil((until - Date.now()) / 6e4);
        return htmlRes(loginPage(`Portal is locked. Please wait ${remaining} more minute(s) before requesting a new OTP.`, false));
      }
      const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
      await env2.OTP_STORE.put("otp", JSON.stringify({ code: otp, used: false, attempts: 0 }), { expirationTtl: 600 });
      const otpHtml = `
        <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
          <div style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);padding:32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px">${MINISTRY_NAME}</h1>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px">Admin Portal - One-Time Password</p>
          </div>
          <div style="padding:36px;text-align:center">
            <p style="color:#555;margin-bottom:16px">Your one-time login code is:</p>
            <div style="font-size:42px;font-weight:bold;letter-spacing:12px;color:#c0392b;background:#fdf0f0;padding:20px;border-radius:12px;margin:0 auto 20px">${otp}</div>
            <p style="color:#888;font-size:13px">This code expires in <strong>10 minutes</strong> and can only be used once.</p>
            <div style="margin-top:24px;background:#fff8e1;border:1px solid #f59e0b;border-radius:10px;padding:16px;text-align:left">
              <p style="color:#92400e;font-size:13px;font-weight:bold;margin-bottom:8px">\u26A0 Security Warning</p>
              <ul style="color:#92400e;font-size:12px;line-height:1.8;padding-left:16px">
                <li>Never share this OTP with anyone \u2014 not even ministry staff.</li>
                <li>Do NOT allow your admin email to be signed in on any other device. Anyone with access to your email can receive OTPs and take over the admin portal.</li>
                <li>After reading this OTP, sign out of your email on shared or public devices immediately.</li>
                <li>If you did not request this OTP, your portal may be under attack \u2014 do nothing and the code will expire.</li>
              </ul>
            </div>
            <p style="color:#aaa;font-size:12px;margin-top:16px">If you did not request this, ignore this email.</p>
          </div>
        </div>`;
      await sendEmail(env2.QSSN_API_KEY, "towerintercessoryministry@gmail.com", `Admin OTP - ${MINISTRY_NAME}`, otpHtml);
      return htmlRes(loginPage("", true));
    }
    if (method === "POST" && pathname === "/admin/verify-otp") {
      const form = await request.formData();
      const entered = (form.get("otp") || "").trim();
      const lockout = await env2.OTP_STORE.get("otp_lockout");
      if (lockout) {
        const { until } = JSON.parse(lockout);
        const remaining = Math.ceil((until - Date.now()) / 6e4);
        return htmlRes(loginPage(`Too many failed attempts. Portal locked for ${remaining} more minute(s).`, false));
      }
      const stored = await env2.OTP_STORE.get("otp");
      if (!stored) return htmlRes(loginPage("OTP expired or not requested. Please request a new one.", false));
      const { code, used, attempts = 0 } = JSON.parse(stored);
      if (used) return htmlRes(loginPage("This OTP has already been used. Please request a new one.", false));
      if (entered !== code) {
        const newAttempts = attempts + 1;
        if (newAttempts >= 3) {
          await env2.OTP_STORE.delete("otp");
          await env2.OTP_STORE.put("otp_lockout", JSON.stringify({ until: Date.now() + 10 * 60 * 1e3 }), { expirationTtl: 600 });
          return htmlRes(loginPage("Too many failed attempts. Admin portal is locked for 10 minutes.", false));
        }
        await env2.OTP_STORE.put("otp", JSON.stringify({ code, used: false, attempts: newAttempts }), { expirationTtl: 600 });
        const remaining = 3 - newAttempts;
        return htmlRes(loginPage(`Invalid OTP. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`, true));
      }
      await env2.OTP_STORE.put("otp", JSON.stringify({ code, used: true, attempts }), { expirationTtl: 60 });
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/admin",
          "Set-Cookie": "admin_session=true; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400"
        }
      });
    }
    if (method === "POST" && pathname === "/subscribe") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON body" }, 400);
      }
      const { full_name, email, whatsapp, location } = body;
      if (!full_name || !email || !whatsapp || !location) {
        return json({ error: "All fields are required: full_name, email, whatsapp, location" }, 400);
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: "Invalid email address" }, 400);
      }
      try {
        await env2.DB.prepare(
          `INSERT INTO subscribers (full_name, email, whatsapp, location) VALUES (?, ?, ?, ?)`
        ).bind(full_name.trim(), email.trim().toLowerCase(), whatsapp.trim(), location.trim()).run();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("UNIQUE constraint failed") || msg.includes("UNIQUE")) {
          return json({ error: "This email is already subscribed." }, 409);
        }
        return json({ error: "Something went wrong. Please try again." }, 500);
      }
      try {
        await sendEmail(
          env2.QSSN_API_KEY,
          email.trim().toLowerCase(),
          `Welcome to ${MINISTRY_NAME}!`,
          welcomeHtml(full_name.trim())
        );
      } catch {
      }
      return json({ success: true, message: "Thank you for subscribing! God bless you." }, 201);
    }
    if (method === "GET" && pathname === "/subscribers") {
      const { results } = await env2.DB.prepare(
        "SELECT id, full_name, email, whatsapp, location, subscribed_at FROM subscribers ORDER BY subscribed_at DESC"
      ).all();
      return json({ subscribers: results });
    }
    if (method === "GET" && pathname === "/updates") {
      const { results } = await env2.DB.prepare(
        "SELECT id, title, content, date, created_at FROM updates ORDER BY created_at DESC"
      ).all();
      return json({ updates: results });
    }
    if (method === "POST" && pathname === "/notify") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON body" }, 400);
      }
      const { title: title2, content, date } = body;
      if (!title2 || !content) {
        return json({ error: "title and content are required" }, 400);
      }
      const postDate = date || (/* @__PURE__ */ new Date()).toDateString();
      await env2.DB.prepare(
        "INSERT INTO updates (title, content, date) VALUES (?, ?, ?)"
      ).bind(title2, content, postDate).run();
      const { results } = await env2.DB.prepare(
        "SELECT email, full_name FROM subscribers"
      ).all();
      let sent = 0;
      let failed = 0;
      for (const sub of results) {
        const ok = await sendEmail(
          env2.QSSN_API_KEY,
          sub.email,
          title2,
          updateHtml(title2, content, postDate)
        );
        ok ? sent++ : failed++;
      }
      return json({ success: true, sent, failed, total: results.length });
    }
    if (method === "POST" && pathname === "/contact") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      const { full_name, email, message } = body;
      if (!full_name || !email || !message) {
        return json({ error: "All fields are required" }, 400);
      }
      const html = `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
          <div style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);padding:32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px">${MINISTRY_NAME}</h1>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px">New Contact Message from Website</p>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;width:120px">From</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:14px;font-weight:bold">${full_name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:14px"><a href="mailto:${email}" style="color:#c0392b">${email}</a></td></tr>
            </table>
            <div style="margin-top:24px;background:#f9f9f9;border-left:4px solid #c0392b;padding:16px 20px;border-radius:0 8px 8px 0">
              <p style="margin:0;color:#333;font-size:15px;line-height:1.7">${message}</p>
            </div>
            <p style="margin-top:24px;color:#aaa;font-size:12px;text-align:center">Sent via the contact form on the ${MINISTRY_NAME} website</p>
          </div>
        </div>`;
      const ok = await sendEmail(
        env2.QSSN_API_KEY,
        "towerintercessoryministry@gmail.com",
        `New Message from ${full_name} - Website Contact Form`,
        html
      );
      if (!ok) return json({ error: "Failed to send message. Please try again." }, 500);
      return json({ success: true, message: "Your message has been sent. We'll get back to you soon. God bless!" }, 200);
    }
    if (method === "POST" && pathname === "/go-live") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      const { title: title2, description } = body;
      const { results } = await env2.DB.prepare(
        "SELECT email, full_name FROM subscribers"
      ).all();
      const liveHtml = /* @__PURE__ */ __name((name) => `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
          <div style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);padding:40px 32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:26px">${MINISTRY_NAME}</h1>
            <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.2);padding:6px 16px;border-radius:20px;margin-top:12px">
              <span style="width:10px;height:10px;border-radius:50%;background:#fff;display:inline-block"></span>
              <span style="color:#fff;font-weight:bold;font-size:14px;letter-spacing:1px">LIVE NOW</span>
            </div>
          </div>
          <div style="padding:36px 32px;text-align:center">
            <h2 style="color:#1a1a1a;font-size:22px;margin-bottom:8px">We are Live, ${name}!</h2>
            <h3 style="color:#c0392b;font-size:18px;margin-bottom:12px">${title2 || "Live Service"}</h3>
            ${description ? `<p style="color:#555;line-height:1.7;margin-bottom:24px">${description}</p>` : ""}
            <a href="https://tower-of-intercessory-ministry.vercel.app/live"
               style="display:inline-block;background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:bold;box-shadow:0 4px 14px rgba(192,57,43,0.35)">
              Watch Live Now
            </a>
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;color:#999;font-size:12px">
              <p>${MINISTRY_NAME} \xB7 Massajja, Wakiso District, Kampala, Uganda</p>
            </div>
          </div>
        </div>`, "liveHtml");
      let sent = 0, failed = 0;
      for (const sub of results) {
        const ok = await sendEmail(
          env2.QSSN_API_KEY,
          sub.email,
          `We are LIVE now - ${title2 || "Live Service"} | ${MINISTRY_NAME}`,
          liveHtml(sub.full_name)
        );
        ok ? sent++ : failed++;
      }
      return json({ success: true, sent, failed, total: results.length });
    }
    const deleteMatch = pathname.match(/^\/updates\/(\d+)$/);
    if (method === "DELETE" && deleteMatch) {
      const id = parseInt(deleteMatch[1]);
      await env2.DB.prepare("DELETE FROM updates WHERE id = ?").bind(id).run();
      return json({ success: true });
    }
    const editMatch = pathname.match(/^\/updates\/(\d+)$/);
    if (method === "PUT" && editMatch) {
      const id = parseInt(editMatch[1]);
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      const { title: title2, content, date } = body;
      if (!title2 || !content) return json({ error: "title and content required" }, 400);
      await env2.DB.prepare("UPDATE updates SET title=?, content=?, date=? WHERE id=?").bind(title2, content, date || (/* @__PURE__ */ new Date()).toDateString(), id).run();
      const { results } = await env2.DB.prepare("SELECT email, full_name FROM subscribers").all();
      let sent = 0, failed = 0;
      for (const sub of results) {
        const ok = await sendEmail(
          env2.QSSN_API_KEY,
          sub.email,
          `Updated: ${title2}`,
          updateHtml(title2, content, date || (/* @__PURE__ */ new Date()).toDateString())
        );
        ok ? sent++ : failed++;
      }
      return json({ success: true, sent, failed });
    }
    if (pathname === "/stream" || pathname === "/stream/status" || pathname.startsWith("/stream/comments")) {
      const id = env2.STREAM_HUB.idFromName("main");
      const hub = env2.STREAM_HUB.get(id);
      return hub.fetch(new Request(request.url, request));
    }
    return json({ error: "Not found" }, 404);
  }
};
export {
  StreamHub,
  index_default as default
};
//# sourceMappingURL=index.js.map
