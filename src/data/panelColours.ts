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
    descriptionBackgroundColor: '#edebfa',
    descriptionBorderColor: '#ffffff',
    boxTitleOverlapColor: '#75336c',
    descriptionTextColor: '#d27ff0',
    descriptionTextOutlineColor: '#955050',
    overlapTextColor: '#fffdfa',
    overlapTextOutlineColor: '#b53b3b',
  },
  '02': {
    panelColor: '#f6d5d1',
    descriptionBackgroundColor: '#ffd6ff',
    descriptionBorderColor: '#e2b6e2',
    boxTitleOverlapColor: '#d75b97',
    descriptionTextColor: '#fff0f5',
    descriptionTextOutlineColor: '#a32929',
    overlapTextColor: '#cccfff',
    overlapTextOutlineColor: '#982d9f',
  },
  '03': {
    panelColor: '#faedc8',
    descriptionBackgroundColor: '#f86659',
    descriptionBorderColor: '#360f0c',
    boxTitleOverlapColor: '#ffa047',
    descriptionTextColor: '#fbc7c1',
    descriptionTextOutlineColor: '#700000',
    overlapTextColor: '#fff68f',
    overlapTextOutlineColor: '#d64c4c',
  },
  '04': {
    panelColor: '#f6d5d1',
    descriptionBackgroundColor: '#d09c71',
    descriptionBorderColor: '#6f0b0b',
    boxTitleOverlapColor: '#ffa970',
    descriptionTextColor: '#ffcc14',
    descriptionTextOutlineColor: '#3e0f0f',
    overlapTextColor: '#edf75e',
    overlapTextOutlineColor: '#454b16',
  },
  '05': {
    panelColor: '#d9eef3',
    descriptionBackgroundColor: '#74cce2',
    descriptionBorderColor: '#59a2b1',
    boxTitleOverlapColor: '#334c70',
    descriptionTextColor: '#26404b',
    descriptionTextOutlineColor: '#3488b2',
    overlapTextColor: '#a9f4f9',
    overlapTextOutlineColor: '#c08c8c',
  },
}
