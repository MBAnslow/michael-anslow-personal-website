export type PanelColourConfig = {
  panelColor: string
  descriptionBackgroundColor: string
  descriptionBorderColor: string
  boxTitleOverlapColor: string
  descriptionTextColor: string
  descriptionTextOutlineColor: string
  overlapTextColor: string
  overlapTextOutlineColor: string
}

export const defaultPanelColourConfigs: Record<
  string,
  PanelColourConfig
> = {
  '01': {
    panelColor: '#d8eff1',
    descriptionBackgroundColor: '#ffe6a8',
    descriptionBorderColor: '#e5bd6c',
    boxTitleOverlapColor: '#75336c',
    descriptionTextColor: '#b3ff80',
    descriptionTextOutlineColor: '#a78686',
    overlapTextColor: '#fffdfa',
    overlapTextOutlineColor: '#ff5c5c',
  },
  '02': {
    panelColor: '#f6d5d1',
    descriptionBackgroundColor: '#ffd6ff',
    descriptionBorderColor: '#e2b6e2',
    boxTitleOverlapColor: '#d75b97',
    descriptionTextColor: '#ffe5ee',
    descriptionTextOutlineColor: '#a32929',
    overlapTextColor: '#b3b8ff',
    overlapTextOutlineColor: '#982d9f',
  },
  '03': {
    panelColor: '#faedc8',
    descriptionBackgroundColor: '#f86659',
    descriptionBorderColor: '#360f0c',
    boxTitleOverlapColor: '#ffab5c',
    descriptionTextColor: '#ffb0a8',
    descriptionTextOutlineColor: '#700000',
    overlapTextColor: '#fff9b8',
    overlapTextOutlineColor: '#d64c4c',
  },
  '04': {
    panelColor: '#f6d5d1',
    descriptionBackgroundColor: '#d09667',
    descriptionBorderColor: '#6f0b0b',
    boxTitleOverlapColor: '#ffb380',
    descriptionTextColor: '#f2c521',
    descriptionTextOutlineColor: '#3e0f0f',
    overlapTextColor: '#edf75e',
    overlapTextOutlineColor: '#454b16',
  },
  '05': {
    panelColor: '#d9eef3',
    descriptionBackgroundColor: '#74cce2',
    descriptionBorderColor: '#599fb1',
    boxTitleOverlapColor: '#2d4467',
    descriptionTextColor: '#8cb7ca',
    descriptionTextOutlineColor: '#383871',
    overlapTextColor: '#bdfbff',
    overlapTextOutlineColor: '#a6a6a6',
  },
}
