export default function parseDateToStr(datetojs){
    let date = new Date(datetojs);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${date.getFullYear()}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`
}