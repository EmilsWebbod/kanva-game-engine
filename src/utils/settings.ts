interface ISettings {
  height: number;
  updateTime: number;
  width: number;
}

const settings: ISettings = {
  height:     500,
  updateTime: 100,
  width:      400
};

function calculateXDistanceFromScreenWidth(split: number) {
  return settings.width / split;
}

export default settings;
export { calculateXDistanceFromScreenWidth }