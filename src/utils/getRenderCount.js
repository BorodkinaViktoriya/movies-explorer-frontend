export const getRenderStepCount = (width) => {
  if (width >= 1280) {
    return 3;
  }
  return 2;

}

export const getFirstRenderCount = (width) =>{
  if (width >= 1280) {
    return 12;
  }
  if (width >= 768) {
    return 8;
  }
  return 5;
}