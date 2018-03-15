function dateComparator(sortOrder,a,b) {
    let orderMultiplier = sortOrder == 'asc' ? 1 : -1;

    let datea = new Date(a.date);
    let dateb = new Date(b.date);

    if(datea < dateb){
        return -1 * orderMultiplier;
    }
    if(datea > dateb){
        return 1 * orderMultiplier;
    }
    return 0;
}

module.exports = dateComparator;