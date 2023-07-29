const mysql = require('mysql');
const {creds} = require('../creds')



class Database {
    constructor(config) {
      this.connection = mysql.createConnection(config);
    }
  
    query(sql, args) {
      return new Promise((resolve, reject) => {
        this.connection.query(sql, args, (error, rows) => {
          if (error) {
            return reject(error);
          }
          resolve(rows);
        });
      });
    }
  
    close() {
      return new Promise((resolve, reject) => {
        this.connection.end((error) => {
          if (error) {
            return reject(error);
          }
          resolve();
        });
      });
    }
  }
  
const db = new Database(creds);



async function showUsers() {
  try {
    const results = await db.query('SELECT * FROM users', [1]);
    const result = [];
    results.forEach((el) => {
      result.push(el.username);
    });
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('< showUsers >');
  }
}

async function getUserByUsername(username){
  try{
    const result = await db.query(`SELECT * FROM users WHERE username = '${username}'`)
    if(result[0] != undefined){
      const menus = await db.query(`SELECT * FROM menu WHERE username = '${username}'`)
      const data = {}
      data.user = result[0]
      data.menus = menus
      
      menus.map((el, cont = 0) => {
        
        const id = el.id
        data.menus[cont] = JSON.parse(el.data)
        data.menus[cont].id = id
        cont += 1
      })
      
      return data
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('getUserByUsername - Done..');
  }
}


async function checkUserPass(username, password){
    try {
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
      
      const results = await db.query(query, [username, password])

      if(results != 0){
        
        return true
      } else {
        
        return false
      }

    } catch (error) {
      console.error(error);
    } finally {
      console.log('checkUserPass - Done..');
    }
}

async function insertItem(username, data) {

  
  try {

    

    
    data = JSON.stringify(data);
    console.log(data);

    
    

    const results = await db.query(
        `INSERT INTO menu (username, data) VALUES ('${username}', '${data}')`,
        [1],
    );
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('insertItem - Done..');
  }
}


async function deleteById(id) {
  try {
    
    

    const results = await db.query(
        `DELETE FROM menu WHERE id = ${id};`,
        [1],
    );
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('insertItem - Done..');
  }
}

async function ShowItems(username) {
  try {
    const results = await db.query(
        `SELECT * FROM menu WHERE username = '${username}'`,
        [1],
    );
    return results;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('insertItem - Done..');
  }
}

async function insertUser(username, password, data) {
  try {
    data = JSON.stringify(data);
    
    const results = await db.query(
        `INSERT INTO users (username, password, data) VALUES ('${username}', '${password}', '${data}')`,
        [1],
    );
    return results;
  } catch (error) {
    console.error(error);
    return false
  } finally {
    console.log('insertUser - Done..');
  }
}

deleteById(68)

module.exports = {showUsers, getUserByUsername, checkUserPass, insertItem, ShowItems, insertUser, deleteById}