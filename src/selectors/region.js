export const getCurrentRegion = state => {
  const { regions } = state.region;

  if (regions && regions.length > 0) {
    return regions[0];
  }

  return null;
};

export const getRegions = state => state.region.regions;

export const getRegionsSelectDisabled = state => state.region.disabled;

export const getRotationCenterType = state => state.region.centerType;
export const getRotationCenterPoint = state => state.region.center;
