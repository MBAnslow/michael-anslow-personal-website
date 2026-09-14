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
    panelColor: '#edf7f8',
    descriptionBackgroundColor: '#edebfa',
    descriptionBorderColor: '#ffffff',
    boxTitleOverlapColor: '#75336c',
    descriptionTextColor: '#d27ff0',
    descriptionTextOutlineColor: '#955050',
    overlapTextColor: '#fffdfa',
    overlapTextOutlineColor: '#b53b3b',
  },
  '02': {
    panelColor: '#fbe7e5',
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
    descriptionBackgroundColor: '#f86659',
    descriptionBorderColor: '#360f0c',
    boxTitleOverlapColor: '#ffa047',
    descriptionTextColor: '#fbc7c1',
    descriptionTextOutlineColor: '#700000',
    overlapTextColor: '#fff68f',
    overlapTextOutlineColor: '#d64c4c',
  },
  '04': {
    panelColor: '#f8e9e8',
    descriptionBackgroundColor: '#d09c71',
    descriptionBorderColor: '#6f0b0b',
    boxTitleOverlapColor: '#ffa970',
    descriptionTextColor: '#ffcc14',
    descriptionTextOutlineColor: '#3e0f0f',
    overlapTextColor: '#edf75e',
    overlapTextOutlineColor: '#454b16',
  },
  '05': {
    panelColor: '#eaf3f6',
    descriptionBackgroundColor: '#a3d8e6',
    descriptionBorderColor: '#59a2b1',
    boxTitleOverlapColor: '#334d70',
    descriptionTextColor: '#1d313a',
    descriptionTextOutlineColor: '#bde9ff',
    overlapTextColor: '#adf1ff',
    overlapTextOutlineColor: '#dd6495',
  },
}
