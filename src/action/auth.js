

export const isLogin = () => {
    const task = JSON.parse(localStorage.getItem('task'))
    const check = JSON.parse(localStorage.getItem('check'))
    if(task === null && check === true ) return true;
    return false;
}