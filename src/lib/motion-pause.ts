let paused = false;

export const isMotionPaused = () => paused;

export const setMotionPaused = (value: boolean) => {
  paused = value;
};
