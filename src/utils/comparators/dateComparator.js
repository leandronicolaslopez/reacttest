function dateComparator(sortOrder,a,b) {
    var orderMultiplier = sortOrder == 'asc' ? 1 : -1;

    var datea = new Date(a.date);
    var dateb = new Date(b.date);

    if(datea < dateb){
        return -1 * orderMultiplier;
    }
    if(datea > dateb){
        return 1 * orderMultiplier;
    }
    return 0;
}

module.exports = dateComparator;