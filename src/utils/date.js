import { numJoint0 ,floorNum} from './math'
const now = () => Date.now();
const dateObj = e => new Date(e);
const date2ms = e => Date.parse(e);

const oneMi = () => 60 * 1000;
const oneH = () => 60 * oneMi();
const oneD = () => 24 * oneH();
const oneW = () => 7 * oneD();
const oneMo = () => 30 * oneD();
const oneY = () => 365 * oneD();


const y = e => e.getFullYear();
const mo = e => e.getMonth() + 1;
const w = e => e.getDay() + 1;
const d = e => e.getDate();
const h = e => e.getHours();
const mi = e => e.getMinutes();
const s = e => e.getSeconds();



const isBigOne = (a, b) => {
    return a > b ? true : false
}
// 基础时间
export const getDateBase = date => {
    date = dateObj(date);
    return {
        y: y(date),
        mo: numJoint0(mo(date)),
        d: numJoint0(d(date)),
        h: numJoint0(h(date)),
        mi: numJoint0(mi(date)),
        s: numJoint0(s(date)),
    }
}

/*
*   是否是规定时间以后
*   @param date 所选的时间,
*   @param mi 未来多少时间
*/
export const isFutureDate = (date, mi) => {
    return isBigOne(date2ms(date), now() + oneMi() * mi);
}


/*
*  将ms转为多少时间以后
*/
export const ms2Date = (ms) => {
    let result = null;
    switch(true){
        case ms > oneY():
            result = `${floorNum(ms/oneY())}`;
            break
        case ms > oneMo():
            result = `${floorNum(ms/oneMo())}`;
            break
        case ms > oneW():
            result = `${floorNum(ms/oneW())}`;
            break
        case ms > oneD():
            result = `${floorNum(ms/oneD())}`;
            break
        case ms > oneH():
            result = `${floorNum(ms/oneH())}`;
            break
        case ms > oneMi():
            result = `${floorNum(ms/oneMi())}`;
            break
        default:
            result = `暂无匹配到的`
    }
    return result;
}



/*
*  同一年，返回：月，日，时，分
*  同年同月，返回：日，时，分
*  依次类推...
*/
export const formatNearDate = date => {
    date = date2ms(date);
    let baseDate = getDateBase(date);
    const { y, mo, d, h, mi } = baseDate;
    let timeGap = date - now();
    let result = null;
    /*
    *  会依次命中规则
    */
    switch (true) {
        case timeGap < 0:
            result = `已超时，原（${y}-${mo}-${d}/${h}:${mi}）`
            break
        case timeGap > oneY():
            result = `${y}-${mo}-${d}/${h}:${mi}`
            break
        case timeGap > oneMo():
            result = `${mo}-${d}/${h}:${mi}(${ms2Date(timeGap)}个月后)`
            break
        case timeGap > oneW():
            result = `${d}日/${h}:${mi}(${ms2Date(timeGap)}周后)`
            break
        case timeGap > oneD():
            result = `${d}日/${h}:${mi}(${ms2Date(timeGap)}天后)`
            break
        case timeGap > oneH():
            result = `${h}点${mi}分(${ms2Date(timeGap)}小时后)`
            break
        default:
            result = `${h}点${mi}分(${ms2Date(timeGap)}分钟后)`
    }
    return result;
}

export const getFullDate = date => {
    let baseDate = getDateBase(date);
    const { y, mo, d, h, mi } = baseDate;
    return `${y}-${mo}-${d}/${h}:${mi}`
}

