'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('members', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    slug: { type: 'string', notNull: true, unique: true },
    name: { type: 'string', notNull: true, unique: true },
    address: { type: 'string' },
    email: { type: 'string' },
    fb_profile_url: { type: 'string' },
    intro: { type: 'text' },
    intro_url: { type: 'string' },
    member_since: { type: 'date' },
    phone: { type: 'string' },
  });
};

exports.down = function (db) {
  return db.dropTable('members');
};

exports._meta = {
  "version": 1
};
