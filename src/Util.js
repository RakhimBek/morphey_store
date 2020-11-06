function shuffle(array) {
    let copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to is
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}


export default shuffle;