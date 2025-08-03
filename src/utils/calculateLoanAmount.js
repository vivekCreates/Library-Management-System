const feePerDay = 5;

const calculateBorrowBookLoanAmount = (dueDate,returnDate) =>{
    const due = new Date(dueDate);
    const returned = new Date(returnDate)

    const diffTime = returned - due;

    const diffDays = Math.ceil(diffTime/(1000*60*60*24));

    if(diffDays>0){
        return diffDays * feePerDay
    }else{
        return 0
    }
}

export default calculateBorrowBookLoanAmount