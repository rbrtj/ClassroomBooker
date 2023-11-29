export const doTimesOverlap = (
  start1: string,
  end1: string,
  start2: string,
  end2: string,
): boolean => {
  const [startHour1, startMinute1] = start1.split(":").map(Number);
  const [endHour1, endMinute1] = end1.split(":").map(Number);
  const [startHour2, startMinute2] = start2.split(":").map(Number);
  const [endHour2, endMinute2] = end2.split(":").map(Number);

  const startDate1 = new Date(2023, 0, 1, startHour1, startMinute1);
  const endDate1 = new Date(2023, 0, 1, endHour1, endMinute1);
  const startDate2 = new Date(2023, 0, 1, startHour2, startMinute2);
  const endDate2 = new Date(2023, 0, 1, endHour2, endMinute2);

  return startDate1 < endDate2 && startDate2 < endDate1;
};
