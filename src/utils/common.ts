// generate string based on system date
export const getSystemDate = () => {
  const date = new Date();
  return new Date(Number(date)).toLocaleString();
};

// return number count
export const GetTitleNotificationTab = (count?: string) => {
  if (!count) {
    return;
  }
  const returnCount = Number(count) > 5 ? '5+' : count;
  return `${returnCount}`;
};
