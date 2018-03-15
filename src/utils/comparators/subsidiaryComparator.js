function subsidiaryComparator(sortOrder,a,b) {
    let orderMultiplier = sortOrder == 'asc' ? 1 : -1;
    if(a.subsidiary.name < b.subsidiary.name){
        return -1 * orderMultiplier
    }
    if(a.subsidiary.name > b.subsidiary.name){
        return 1 * orderMultiplier
    }
    return 0;
}

module.exports = subsidiaryComparator;