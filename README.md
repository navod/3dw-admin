# 3dw admin
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## APIs

contentType = `application/json`


 ####USER
	


- `GET` `/user/getAllUsers`

------------


- `POST` `/user/createUser`

```bash
  Example
  {
    "username":"user"						: String
    "company":"company"				: String
    "firstname":"jhon"						: String
    "lastname":"Ardon"					: String
    "password":"13213$%"			: String
    "email":"j@gmail.com"			: String
    "userRole":"Admin"					: String
}
```
------------
- `PUT` `/user/updateUser`

```bash
  Example
  {
    "userId":"14ef3430-291b-11ed-b7d6-83db24ca3729"  : String
    "username":"user"						: String
	  "status":"false"							: String
	"createdDate":"2022-08-31 16:23:01" 					 : new Date()
    "lastActiveDate":"2022-08-31 17:23:01" 				 : new Date()
	"createdIP":"192.168.1.13"										: String
    "lastActiveIP":"192.168.1.13"									: String
    "firstname":"jhon123"											:String 
    "lastname":"Albert" 												: String
}
```
------------
- `GET` `/user/searchUsers`

users can search by their username,status,firstname,lastname

```bash
  Example
  {
    "searchText":"fa"  : String
}
```
------------
- `POST` `/user/login`


```bash
  Example
  {
    "email":"j@gmail.com"						:_String
    "password":"13213$%"					 	:_String
 }
```
------------
- `GET` `/user/getUser/userId`


```bash
Example
- following example pass as a params
 params {
    "userId":"14ef3430-291b-11ed-b7d6-83db24ca3729"						:_String
 }
```

------------
- `GET` `/user/updateUser/status/userId`


```bash
  Example
  
- following example pass as a params
  {
    "userId":"14ef3430-291b-11ed-b7d6-83db24ca3729"						:_String
 }
 
 - pass as a  body
 {
    "status":"true"							: String
}
```
------------
- `GET` `/user/getAllNewUsers`

<br/>
 ####GROUP

------------
- `POST` `/group/createGroup`


```bash
  Example 
{
  "groupLevel":"2",
    "groupName":"titans",
    "users":[
        "06959090-2949-11ed-a096-5b42012bc1dd",
        "92492150-291d-11ed-9db0-679607ccbf4f"
    ]    
	
}
```
------------
- `GET` `/group/getAllGroups`

------------
- `PUT` `/group/updateGroup/groupId`

```bash
  Example
- following example pass as a params
  {
    "groupId":"dc4e13c0-2a2e-11ed-8b1b-bb4a41eb7e16"						:_String
 }
 
 - pass as a  body
 {
    "groupName":"gujarati titans"					: String
    "groupLevel":"52" 		:							: String
}
```
------------
- `GET` `/group/searchGroup`

users can search by groupName and groupLevel

```bash
  Example
  {
    "searchText":"fa"  : String
}
```
<br/>
<br/>
<br/>


