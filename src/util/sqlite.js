// SQLite extension for SQLBricks
// Based on https://github.com/CSNW/sql-bricks-sqlite
import sql from 'sql-bricks'

const Update = sql.update;
const Insert = sql.insert;
const Select = sql.select;

// Insert & Update OR clauses (SQLite dialect)
Update.defineClause('or', '{{#if _or}}OR {{_or}}{{/if}}', { after: 'update' });
Insert.defineClause('or', '{{#if _or}}OR {{_or}}{{/if}}', { after: 'insert' });

const orMethods = Object.freeze({
  'orReplace': 'REPLACE',
  'orRollback': 'ROLLBACK',
  'orAbort': 'ABORT',
  'orFail': 'FAIL',
});

Object.keys(orMethods).forEach(method => {
  Insert.prototype[method] = Update.prototype[method] = function () {
    this._or = orMethods[method];
    return this;
  };
});

// TODO: shouldn't LIMIT/OFFSET use handleValue()? Otherwise isn't it vulnerable to SQL Injection?
Select.prototype.limit = function (val) {
  this._limit = val;
  return this;
};

Select.prototype.offset = function (val) {
  this._offset = val;
  return this;
};

Select.defineClause(
  'limit',
  function(opts) {
    if (this._limit == null) return ''
    return `LIMIT ${sql._handleValue(this._limit, opts)}`
  },
  { after: 'orderBy' }
);

Select.defineClause(
  'offset',
  function(opts) {
    if (this._offset == null) return ''
    return `OFFSET ${sql._handleValue(this._offset, opts)}`
  },
  { after: 'limit' }
);

export default sql
