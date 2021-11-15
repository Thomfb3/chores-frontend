const filterChores = (choresArray, status) => {
   return choresArray.filter((chore) => {
        return chore.status === status;
    })
}

export default filterChores;