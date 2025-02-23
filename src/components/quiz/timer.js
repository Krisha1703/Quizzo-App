const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours > 0 ? hours + ':' : ''}${formattedMinutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  };

export default formatTime;