import { bookBorrowDurationEnum } from "../constant.js";

const calculateBorrowBookReturnDate = (duration) => {
  const borrowDate = new Date();
  const dueDate = new Date(borrowDate);

  switch (duration) {
    case bookBorrowDurationEnum.DAY:
      dueDate.setDate(dueDate.getDate() + 1);
      break;

    case bookBorrowDurationEnum.WEEK:
      dueDate.setDate(dueDate.getDate() + 7);
      break;

    case bookBorrowDurationEnum.MONTH:
      dueDate.setMonth(dueDate.getMonth() + 1);
      break;

    default:
        throw new Error("Invalid duration");
  }

  return { borrowDate, dueDate };
};

export default calculateBorrowBookReturnDate;
