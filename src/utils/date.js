export const getDateBase = data => {
    data = new Date(data);
    return {
        y:data.getFullYear(),
        mo:data.getMonth() + 1,
        d:data.getDate(),
        h:data.getHours(),
        mi:data.getMinutes(),
        s:data.getSeconds(),
    }
}
/*
*   是否是规定时间以后
*   @param data 所选的时间,
*   @return 是否是未来
*/
export const isFutureDate = (data,mi) => {
     data = Date.parse(data);
     let now = Date.now() + 1000 * 60 * mi;
     return data > now ? true : false ;
}

