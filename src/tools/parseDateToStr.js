export default function parseDateToStr(datetojs){
    let date = new Date(datetojs);
    let Month = date.getMonth() + 1;
    return `${date.getFullYear()}-${Month >= 10 ? Month : `0${Month}`}-${date.getDate()}`
}