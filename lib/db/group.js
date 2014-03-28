'use strict';

// A group is a succession of dashboards to be displayed by some
// display.

module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Group.hasMany(models.Dashboard, { onDelete: 'cascade' });
        Group.hasMany(models.Display, { as: 'Displays',
                                        onDelete: 'restrict' });
      },
      unassigned: function() {
        // Return the default dashboard
        var db = require('../db');
        return Group.findOrCreate({ name: 'unassigned' },
                                  { description: 'Default group for unassigned displays' })
          .spread(function(unassigned, created) {
            if (created) {
              return db.Dashboard.create({ url: '/unassigned',
                                           description: 'Dashboards for unassigned display' })
                .then(function(dashboard) {
                  return unassigned.setDashboards([dashboard]);
                })
                .then(function(unassigneds) {
                  return unassigneds[0];
                });
            }
            return unassigned;
          });
      }
    }
  });

  return Group;
};