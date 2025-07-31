const calculateBorrowBookReturnDate = (duration)=>{
    const borrowDate = new Date.now();
    const dueDate = new Date(borrowDate);
    switch (duration) {
        case duration=="1d":
            returnDate.setDate() + 1
        break;

        case duration=="1w":
            returnDate.setDate() + 7
        break;
        case duration=="1m":
            returnDate.setMonth() + 1
        break;
    
        default:
            break;
    }

    return {borrowDate,dueDate}
}