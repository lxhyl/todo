

if (!window.indexedDB) {
    console.log('不支持数据库')
};




let db = window.indexedDB.open('todo', 1);


db.onerror = event => {
    console.log('打开数据库失败', event)
}
db.onsuccess = event => {
    db = event.target.result;
}
db.onupgradeneeded = event => {
    // 更新
    db = event.target.result;
    // 建表
    db.createObjectStore('todo', { keyPath: 'id' }).createIndex('id', 'id', { unique: true })
}




// 封装操作数据库的方法
// 由于都是异步，所以使用promise
// 操作开始必须开启一条事务，方法是建立在事务之上的。
/*
*  添加
*/
const DB_add = (data) => {
    const request = db.transaction(['todo'], 'readwrite').objectStore('todo').add(data)
    return new Promise((resolve, reject) => {
        request.onerror = event => {
            reject(event)
        }
        request.onsuccess = event => {
            resolve(200)
        }
    })
}
/*
* 获取这张表所有的数据
*/
const DB_getAll = () => {
    let result = [];
    let objectStore = db.transaction("todo").objectStore("todo");
    return new Promise((resolve, reject) => {
        objectStore.openCursor().onsuccess = event => {
            let data = event.target.result;
            if (data) {
                result.push(data.value);
                data.continue();
            } else {
                resolve(result);
            }
        }
        objectStore.openCursor().onerror = event => {
            reject(event)
        }
    })
}
/*
*  删除某条数据
*/
const DB_delete = (id) => {
    return new Promise((resolve,reject) => {
        let request = db.transaction(['todo'],'readwrite').objectStore('todo').delete(id);
        request.onsuccess = event => {
            resolve(200)
        }
        request.onerror = event => {
            reject(event)
        }
    })
}


export {
    DB_add,
    DB_getAll,
    DB_delete
}