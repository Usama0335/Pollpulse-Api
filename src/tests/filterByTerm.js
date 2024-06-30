function filterByTerm(inputArray, searchTerm) {
    if (!searchTerm) 
        throw Error("searchTerm cannot be empty");
    
    const regex = new RegExp(searchTerm, "i");
    
    return inputArray.filter(function (arrayElement) {
        return arrayElement.name.match(regex);
    });
}

export default filterByTerm;