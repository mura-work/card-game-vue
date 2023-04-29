export const getGamePointFromSession = () => {
  const gamePoint = sessionStorage.getItem('gamePoint');
  if (gamePoint) {
    return Number(gamePoint);
  } else {
    return 1000; // 初期値
  }
};

export const setGamePointFromSession = (gamePoint: number) => {
  sessionStorage.setItem('gamePoint', JSON.stringify(gamePoint));
};
