export default function getArticlesForTheCurrentMonth(incomeOrExpensesItems = []){
    const beginningOfCurrentMonth = new Date(Date.now() - (new Date().getDate() * 86400 * 1000 + new Date().getHours() * 3600 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000) + 60 * 60 * 24 * 1000);
    return incomeOrExpensesItems.filter(item => item.date > beginningOfCurrentMonth);
}