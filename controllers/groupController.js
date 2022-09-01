import connection from "../database.js";
import { QUERY } from "../queries.js";
import { v1 } from "uuid";

export const createGroup = async (req, res) => {
  const { groupLevel, groupName, users } = req.body;

  try {
    await new Promise((resolve, reject) => {
      connection.beginTransaction(err => {
        if (!err) {
          const id = v1();
          const values = [[id, groupLevel, groupName]];

          connection.query(
            QUERY.GROUP.CREATE_GROUP,
            [values],
            (groupErr, result) => {
              if (!groupErr) {
                const userDataArray = [];

                users.forEach(data => {
                  userDataArray.push([id, data]);
                });

                // const usergroupData = [[id, users]];
                connection.query(
                  QUERY.GROUP.CREATE_USER_GROUP,
                  [userDataArray],
                  (userGroupErr, resluts) => {
                    if (!userGroupErr) {
                      resolve();

                      connection.commit(err => {
                        if (err) {
                          connection.rollback(() => {
                            connection.release();
                            return reject("Commit failed");
                          });
                        }
                      });
                      return res
                        .status(200)
                        .json({ message: "group created", data: resluts });
                    } else {
                      connection.rollback(() => {
                        return reject("Inserting to usergroup table failed");
                      });
                      return res.status(500).json({ error: userGroupErr });
                    }
                  }
                );
              } else {
                connection.rollback(() => {
                  connection.release();
                  return reject("Inserting group table failed", groupErr);
                });
                return res.status(500).json({ error: groupErr });
              }
            }
          );
        } else {
          connection.release();
          return res
            .status(500)
            .json({ message: "Error occurred while creating the transaction" });
        }
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await connection.query(
      QUERY.GROUP.GET_ALL_GROUPS,
      (err, result, fields) => {
        if (!err) {
          res.status(200).json({ data: result });
        } else {
          res.status(500).json({ message: err });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  const { groupName, groupLevel } = req.body;
  const { groupId } = req.query;

  try {
    const values = [groupName, groupLevel, groupId];

    connection.query(QUERY.GROUP.UPDATE_GROUP, values, (err, result) => {
      if (!err) {
        return res.status(200).json({ message: "group updated", data: result });
      } else {
        return res.status(500).json({ message: err });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const searchGroup = async (req, res) => {
  const { searchText } = req.body;

  const groupName = searchText;
  const groupLevel = searchText;
  const values = [groupName, groupLevel];

  try {
    connection.query(QUERY.GROUP.SEARCH_GROUP, values, (err, result) => {
      if (!err) {
        res.status(200).json({ data: result });
      } else {
        console.log(err);
        res.status(500).json({ message: err });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
