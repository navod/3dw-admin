import connection from "../database.js";
import { QUERY } from "../queries.js";
import { v1 } from "uuid";

export const getAllUsers = async (req, res) => {
  try {
    const users = await connection.query(
      QUERY.USER.GET_ALL_USERS,
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

export const createUser = async (req, res) => {
  const { username, company, firstname, lastname, password, email, userRole } =
    req.body;
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    await connection.query(
      QUERY.USER.UNIQUE_EMAIL_USERNAME,
      [username, email],
      (err, result) => {
        if (!err) {
          if (result.length === 0) {
            const values = [
              [
                v1(),
                username,
                company,
                password,
                email,
                ip,
                userRole,
                firstname,
                lastname,
              ],
            ];

            connection.query(QUERY.USER.ADDUSER, [values], (err, result) => {
              if (!err) {
                return res
                  .status(200)
                  .json({ message: "user added", data: result });
              } else {
                throw err;
              }
            });
          } else {
            return res.status(200).json({ message: "user already exists" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const {
    userId,
    username,
    status,
    createdDate,
    lastActiveDate,
    createdIP,
    lastActiveIP,
    firstname,
    lastname,
  } = req.body;
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    await connection.query(
      QUERY.USER.UNIQUE_EMAIL_USERNAME,
      [username, null],
      (err, result) => {
        if (!err) {
          if (result.length === 0 || result.length === 1) {
            const values = [
              username,
              status,
              createdDate,
              lastActiveDate,
              createdIP,
              lastActiveIP,
              firstname,
              lastname,
              userId,
            ];

            connection.query(QUERY.USER.UPDATE_USER, values, (err, result) => {
              if (!err) {
                return res
                  .status(200)
                  .json({ message: "user updated", data: result });
              } else {
                throw err;
              }
            });
          } else {
            return res.status(200).json({ message: "user already exists" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  const { searchText } = req.body;

  const username = searchText;
  const status = searchText;
  const firstname = searchText;
  const lastname = searchText;
  const values = [username, status, firstname, lastname];

  try {
    connection.query(QUERY.USER.SEARCH_USERS, values, (err, result) => {
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

export const getAllNewUsers = async (req, res) => {
  const today = new Date().toJSON().split("T")[0];

  try {
    const users = await connection.query(
      QUERY.USER.GET_ALL_NEW_USERS,
      today,
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

const checkLogin = async (email, password, res) => {
  await connection.query(QUERY.USER.LOGIN, [email, password], (err, result) => {
    if (!err) {
      if (result.length === 0) {
        res.status(200).json({ message: "User doen't exists" });
      } else {
        res.status(200).json({ data: result });
      }
    }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const lastActiveDate = new Date();
  try {
    await connection.query(
      QUERY.USER.LOGIN,
      [email, password],
      (err, result) => {
        if (!err) {
          if (result.length === 0) {
            res.status(200).json({ message: "User doen't exists" });
          } else {
            const status = "true";
            const values = [status, lastActiveDate, ip, result[0].userId];

            connection.query(QUERY.USER.UPDATE_STATUS, values, (err, data) => {
              if (err) {
                res.status(500).json({ message: err });
              } else {
                checkLogin(email, password, res);
              }
            });
          }
        } else {
          res.status(500).json({ message: err });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.query;

  try {
    const users = await connection.query(
      QUERY.USER.GET_USER,
      userId,
      (err, result, fields) => {
        if (!err) {
          result.forEach(data => {
            return res.status(200).json({ user: data });
          });
        } else {
          res.status(500).json({ message: err });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserStatus = async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const { userId } = req.query;
  const { status } = req.body;

  const lastActiveDate = new Date();
  try {
    const values = [status, lastActiveDate, ip, userId];

    connection.query(QUERY.USER.UPDATE_STATUS, values, (err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        return res.status(200).json({ user: "status updated" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
