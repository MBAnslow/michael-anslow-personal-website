export type PanelColourConfig = {
  panelColor: string
  accentColor: string
  detailsColor: string
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
    panelColor: '#edf7f8',
    accentColor: '#1c3273',
    detailsColor: '#566595',
    descriptionBackgroundColor: '#edebfa',
    descriptionBorderColor: '#ffffff',
    boxTitleOverlapColor: '#75336c',
    descriptionTextColor: '#e6a5fd',
    descriptionTextOutlineColor: '#955050',
    overlapTextColor: '#fffdfa',
    overlapTextOutlineColor: '#b53b3b',
  },
  '02': {
    panelColor: '#fbe7e5',
    accentColor: '#98392f',
    detailsColor: '#b16f68',
    descriptionBackgroundColor: '#ffd6ff',
    descriptionBorderColor: '#e2b6e2',
    boxTitleOverlapColor: '#d75b97',
    descriptionTextColor: '#fff0f5',
    descriptionTextOutlineColor: '#a32929',
    overlapTextColor: '#cccfff',
    overlapTextOutlineColor: '#982d9f',
  },
  '03': {
    panelColor: '#fbf2da',
    accentColor: '#aa821d',
    detailsColor: '#b59d69',
    descriptionBackgroundColor: '#f86659',
    descriptionBorderColor: '#83352f',
    boxTitleOverlapColor: '#ffa34d',
    descriptionTextColor: '#fbcbc6',
    descriptionTextOutlineColor: '#610000',
    overlapTextColor: '#fff799',
    overlapTextOutlineColor: '#d64c4c',
  },
  '04': {
    panelColor: '#f8e9e8',
    accentColor: '#863d1d',
    detailsColor: '#9b5f46',
    descriptionBackgroundColor: '#d0a471',
    descriptionBorderColor: '#8e3e3e',
    boxTitleOverlapColor: '#ffa970',
    descriptionTextColor: '#ffcc14',
    descriptionTextOutlineColor: '#3e0f0f',
    overlapTextColor: '#edf75e',
    overlapTextOutlineColor: '#454b16',
  },
  '05': {
    panelColor: '#eaf3f6',
    accentColor: '#386e85',
    detailsColor: '#647b87',
    descriptionBackgroundColor: '#a3d8e6',
    descriptionBorderColor: '#59a2b1',
    boxTitleOverlapColor: '#6870b1',
    descriptionTextColor: '#8e63a1',
    descriptionTextOutlineColor: '#fdf0ff',
    overlapTextColor: '#df77cc',
    overlapTextOutlineColor: '#feebff',
  },
}
