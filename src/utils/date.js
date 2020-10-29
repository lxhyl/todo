

export const getDateBase = data => {
    data = new Date(data);
    let y = data.getFullYear(),
        mo = data.getMonth() + 1,
        d = data.getDate(),
        h = data.getHours(),
        mi = data.getMinutes(),
        s = data.getSeconds()

    return {
        y,
        mo: mo >= 10 ? mo : `0${mo}`,
        d: d >= 10 ? d : `0${d}`,
        h: h >= 10 ? h : `0${h}`,
        mi: mi >= 10 ? mi : `0${mi}`,
        s: s >= 10 ?  s : `0${s}`
    }
}


/*
*   是否是规定时间以后
*   @param data 所选的时间,
*   @return 是否是未来
*/
export const isFutureDate = (data, mi) => {
    data = Date.parse(data);
    let now = Date.now() + 1000 * 60 * mi;
    return data > now ? true : false;
}


// 如果同一年，则返回月以及月之后的
export const formatNearDate = data => {
    data = Date.parse(data);
    let baseDate = getDateBase(data);
    let oneH = 60 * 60 * 1000;
    let oneD = 24 * oneH;
    let oneM = 30 * oneD;
    let oneY = 365 * oneM;
    let now = Date.now();
    let timeGap = data - now;

    let result = ''
    /*
    *  会依次命中规则
    *  大于零
    */
    switch (true) {
        case timeGap < 0:
            result = `已超时，原（${baseDate.y}-${baseDate.mo}-${baseDate.d}/${baseDate.h}:${baseDate.mi}）`
            break
        case timeGap > oneY:
            result = `${baseDate.y}-${baseDate.mo}-${baseDate.d}/${baseDate.h}:${baseDate.mi}`
            break
        case timeGap > oneM:
            result = `${baseDate.mo}-${baseDate.d}/${baseDate.h}:${baseDate.mi}`
            break
        case timeGap > oneD:
            result = `${baseDate.d}日/${baseDate.h}:${baseDate.mi}(${Math.floor(timeGap/oneD)}天后)`
            break
        case timeGap > oneH:
            result = `${baseDate.h}点${baseDate.mi}分`
        default:
            result = `${baseDate.mi}分后`
    }
    return result;
}