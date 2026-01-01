var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _config, _connectionMutex, _db, _connection, _a, _db2, _b, _promise, _resolve, _c, _db3, _NodeSqliteIntrospector_instances, getTableMetadata_fn, _d, _config2, _e;
import { CompiledQuery, DefaultQueryCompiler, DEFAULT_MIGRATION_TABLE, DEFAULT_MIGRATION_LOCK_TABLE, sql } from "kysely";
var NodeSqliteAdapter = class {
  get supportsCreateIfNotExists() {
    return true;
  }
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return true;
  }
  async acquireMigrationLock() {
  }
  async releaseMigrationLock() {
  }
  get supportsOutput() {
    return true;
  }
};
var NodeSqliteDriver = (_a = class {
  constructor(config) {
    __privateAdd(this, _config);
    __privateAdd(this, _connectionMutex, new ConnectionMutex());
    __privateAdd(this, _db);
    __privateAdd(this, _connection);
    __privateSet(this, _config, { ...config });
  }
  async init() {
    __privateSet(this, _db, __privateGet(this, _config).database);
    __privateSet(this, _connection, new NodeSqliteConnection(__privateGet(this, _db)));
    if (__privateGet(this, _config).onCreateConnection) await __privateGet(this, _config).onCreateConnection(__privateGet(this, _connection));
  }
  async acquireConnection() {
    await __privateGet(this, _connectionMutex).lock();
    return __privateGet(this, _connection);
  }
  async beginTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async releaseConnection() {
    __privateGet(this, _connectionMutex).unlock();
  }
  async destroy() {
    var _a2;
    (_a2 = __privateGet(this, _db)) == null ? void 0 : _a2.close();
  }
}, _config = new WeakMap(), _connectionMutex = new WeakMap(), _db = new WeakMap(), _connection = new WeakMap(), _a);
var NodeSqliteConnection = (_b = class {
  constructor(db) {
    __privateAdd(this, _db2);
    __privateSet(this, _db2, db);
  }
  executeQuery(compiledQuery) {
    const { sql: sql$1, parameters } = compiledQuery;
    const rows = __privateGet(this, _db2).prepare(sql$1).all(...parameters);
    return Promise.resolve({ rows });
  }
  async *streamQuery() {
    throw new Error("Streaming query is not supported by SQLite driver.");
  }
}, _db2 = new WeakMap(), _b);
var ConnectionMutex = (_c = class {
  constructor() {
    __privateAdd(this, _promise);
    __privateAdd(this, _resolve);
  }
  async lock() {
    while (__privateGet(this, _promise)) await __privateGet(this, _promise);
    __privateSet(this, _promise, new Promise((resolve) => {
      __privateSet(this, _resolve, resolve);
    }));
  }
  unlock() {
    const resolve = __privateGet(this, _resolve);
    __privateSet(this, _promise, void 0);
    __privateSet(this, _resolve, void 0);
    resolve == null ? void 0 : resolve();
  }
}, _promise = new WeakMap(), _resolve = new WeakMap(), _c);
var NodeSqliteIntrospector = (_d = class {
  constructor(db) {
    __privateAdd(this, _NodeSqliteIntrospector_instances);
    __privateAdd(this, _db3);
    __privateSet(this, _db3, db);
  }
  async getSchemas() {
    return [];
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = __privateGet(this, _db3).selectFrom("sqlite_schema").where("type", "=", "table").where("name", "not like", "sqlite_%").select("name").$castTo();
    if (!options.withInternalKyselyTables) query = query.where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    const tables = await query.execute();
    return Promise.all(tables.map(({ name }) => __privateMethod(this, _NodeSqliteIntrospector_instances, getTableMetadata_fn).call(this, name)));
  }
  async getMetadata(options) {
    return { tables: await this.getTables(options) };
  }
}, _db3 = new WeakMap(), _NodeSqliteIntrospector_instances = new WeakSet(), getTableMetadata_fn = async function(table) {
  var _a2, _b2, _c2, _d2, _e2, _f;
  const db = __privateGet(this, _db3);
  const autoIncrementCol = (_f = (_e2 = (_d2 = (_c2 = (_b2 = (_a2 = (await db.selectFrom("sqlite_master").where("name", "=", table).select("sql").$castTo().execute())[0]) == null ? void 0 : _a2.sql) == null ? void 0 : _b2.split(/[\(\),]/)) == null ? void 0 : _c2.find((it) => it.toLowerCase().includes("autoincrement"))) == null ? void 0 : _d2.split(/\s+/)) == null ? void 0 : _e2[0]) == null ? void 0 : _f.replace(/["`]/g, "");
  return {
    name: table,
    columns: (await db.selectFrom(sql`pragma_table_info(${table})`.as("table_info")).select([
      "name",
      "type",
      "notnull",
      "dflt_value"
    ]).execute()).map((col) => ({
      name: col.name,
      dataType: col.type,
      isNullable: !col.notnull,
      isAutoIncrementing: col.name === autoIncrementCol,
      hasDefaultValue: col.dflt_value != null
    })),
    isView: true
  };
}, _d);
var NodeSqliteQueryCompiler = class extends DefaultQueryCompiler {
  getCurrentParameterPlaceholder() {
    return "?";
  }
  getLeftIdentifierWrapper() {
    return '"';
  }
  getRightIdentifierWrapper() {
    return '"';
  }
  getAutoIncrement() {
    return "autoincrement";
  }
};
var NodeSqliteDialect = (_e = class {
  constructor(config) {
    __privateAdd(this, _config2);
    __privateSet(this, _config2, { ...config });
  }
  createDriver() {
    return new NodeSqliteDriver(__privateGet(this, _config2));
  }
  createQueryCompiler() {
    return new NodeSqliteQueryCompiler();
  }
  createAdapter() {
    return new NodeSqliteAdapter();
  }
  createIntrospector(db) {
    return new NodeSqliteIntrospector(db);
  }
}, _config2 = new WeakMap(), _e);
export {
  NodeSqliteDialect
};
