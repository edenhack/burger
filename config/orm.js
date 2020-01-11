const connection = require("../config/connection.js");

const orm = {
    // Display all burgers in the db.
    selectAll: function (table, cb) {
        const queryString = "SELECT * FROM " + table + ";";

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Add a burger to the db.
    insert: function (table, cols, vals, cb) {
        const queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    },
    // Set burger devoured status to true.
    update: function (table, objColVals, condition, cb) {
        const queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    },
    // Delete a burger from the db.
    delete: function (table, condition, cb) {
        const queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    }
};

// Export the ORM object in module.exports.
module.exports = orm;