export const QUERY = {
  USER: {
    GET_ALL_USERS:
      "SELECT userId,username,company,email,lastActiveDate,createdIP,lastActiveIP,isDeletd,userRole,createdDate,firstname,lastname,status FROM user",
    UNIQUE_EMAIL_USERNAME: "SELECT * FROM user where username=? OR email=?",
    ADDUSER:
      "INSERT INTO user (userId,username,company,password,email,createdIP,userRole,firstname,lastname) VALUES ?",
    UPDATE_USER:
      "UPDATE user SET username=?, status=?,createdDate=?,lastActiveDate=?,createdIP=?,lastActiveIP=?,firstname=?,lastname=?  WHERE userId=?",

    SEARCH_USERS: `SELECT userId,username,company,email,lastActiveDate,createdIP, lastActiveIP,isDeletd,userRole,
      createdDate,firstname,lastname,status FROM user where username LIKE '%' ? '%' OR status LIKE '%' ? '%'
      OR firstname LIKE '%' ? '% OR status lastname '%' ? '%''
      `,

    GET_USER:
      "SELECT userId,username,company,email,lastActiveDate,createdIP,lastActiveIP,isDeletd,userRole,createdDate,firstname,lastname,status FROM user WHERE userId=?",
    LOGIN:
      "SELECT userId,username,company,email,lastActiveDate,createdIP,lastActiveIP,isDeletd,userRole,createdDate,firstname,lastname,status FROM user where email=? AND password=?",

    UPDATE_STATUS:
      "UPDATE user SET status=?,lastActiveDate=?,lastActiveIP=?  WHERE userId=?",

    GET_ALL_NEW_USERS:
      "SELECT userId,username,company,email,lastActiveDate,createdIP,lastActiveIP,isDeletd,userRole,createdDate,firstname,lastname,status FROM user where  createdDate LIKE '%' ? '%'",
  },

  GROUP: {
    CREATE_GROUP:
      "INSERT INTO test.group (groupId,groupLevel,groupName) VALUES ?",

    CREATE_USER_GROUP: "INSERT INTO test.usergroup (groupId,userId) VALUES ?",

    GET_ALL_GROUPS: "SELECT * FROM test.group",

    UPDATE_GROUP:
      "UPDATE test.group SET groupName=?, groupLevel=? WHERE groupId=?",

    SEARCH_GROUP: `SELECT * FROM test.group where groupName LIKE '%' ? '%' OR groupLevel LIKE '%' ? '%'`,
  },
};
