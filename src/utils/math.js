const num2str = num => num.toString(); 

export const numJoint0 = num => {
    num = num2str(num);
    return num >= 10 ? num : `0${num}`
}

export const floorNum = num => Math.floor(num);