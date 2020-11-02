import { isFutureDate } from './date'
import { DB_change } from '../indexedDB/index'

export const formatTask = tasks => {

    /*
    *  待办  类型为todo,并且时间在30分钟以后的  [30,+∞]
    */
    const todo = tasks.filter(item => item.type === 10 && isFutureDate(item.date, 30))
    /*
    *  紧急的  类型为40
    *         类型为10，并且是30分钟内的 [0,30]
    */
    const urgency = tasks.filter(item => item.type === 40 || (item.type === 10 && isFutureDate(item.date, 0) && !isFutureDate(item.date, 30)))
    // 改变类型并写入
    urgency.forEach(item => {
        if (item.type !== 40) {
            item.type = 40;
            DB_change(item.id, item);
        }
    });
    /*
    *  已办 类型为20
    */
    const finished = tasks.filter(item => item.type === 20);
    /*
    *  超时 类型为30
    *       类型为10或40但已过期 [-∞,0]
    */
    const overdue = tasks.filter(item => item.type === 30 || ((item.type === 10 || item.type === 40) && !isFutureDate(item.date, 0)))
    overdue.forEach(item => {
        if (item.type !== 30) {
            item.type = 30;
            DB_change(item.id, item);
        }
    })

    /*
    * sort会污染数据,所以先深拷贝数据
  *  时间顺序，时间由小至大排序
  */
    let copyTask = tasks.concat([]);
    const sortByDate = copyTask.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    let taskObj = {
        allTask: tasks, // 所有
        todo,  //待办
        urgency, // 紧急
        finished, // 已办
        overdue, // 超时
        sortByDate,//时间顺序
    }
    return taskObj
}


