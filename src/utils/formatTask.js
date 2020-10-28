import { isFutureDate } from './date'
import {DB_change} from '../indexedDB/index'

export const formatTask = tasks => {
    /*
    *  待办  类型为todo,并且时间在30分钟以后的  [30,+∞]
    */
    const todo = tasks.filter(item => item.type === 10 && isFutureDate(item.date, 30))
    /*
    *  紧急的  类型为100
    *         类型为10，并且是30分钟内的 [0,30]
    */
    const urgency = tasks.filter(item => item.type === 100 || (item.type === 10 && isFutureDate(item.date, 0) && !isFutureDate(item.date, 30)))
    // 改变类型并写入
    urgency.forEach(item => {
      if(item.type !== 100){
         item.type = 100;
         DB_change(item.id,item);
      }
    });
    /*
    *  已办 类型为20
    */
    const finished = tasks.filter(item => item.type === 20);
    /*
    *  超时 类型为30
    *       类型为10，但已过期 [-∞,0]
    */
    const overdue = tasks.filter(item =>item.type === 30 || (item.type === 10 && !isFutureDate(item.date, 0)))
    overdue.forEach(item => {
        if(item.type !== 30){
            item.type = 30;
            DB_change(item.id,item);
        }
    })
    let taskObj = {
        allTask:tasks,
        todo,
        urgency,
        finished,
        overdue
    }
    return taskObj
}


