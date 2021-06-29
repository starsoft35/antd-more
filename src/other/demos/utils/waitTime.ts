function waitTime<T = any>(time = 1000) {
  return new Promise<T>(resolve => {
    setTimeout(resolve, time);
  });
}

export default waitTime;