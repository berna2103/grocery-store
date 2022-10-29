const convertTime = (created) => {
    const convertedTime = new Date(created * 1000).toLocaleTimeString();
    return convertedTime;
  };

  const convertDate = (created) => {
    const convertedDate = new Date(created * 1000).toLocaleDateString();
    return convertedDate;
  };

  export { convertDate, convertTime}