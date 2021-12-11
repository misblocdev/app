export const getLevelName = (tier) => {
    switch (tier) {
        case 0: 
            return 'BABY';
        case 1: 
            return 'BRONZE';
        case 2: 
            return 'SILVER';
        case 3: 
            return 'GOLD';
        case 4: 
            return 'PLATINUM';
        case 5: 
            return 'DIAMOND';
        default:
            return 'BABY'
    }
}