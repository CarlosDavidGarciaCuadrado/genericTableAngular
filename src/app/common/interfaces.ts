export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface GenericTableConfig {
  canCreate?: boolean;
  canEdit?: boolean;
  canRemove?: boolean;
  canShowDetail?: boolean;
  canUpdate?: boolean;
  canUpdateState?: boolean;
  orderColumn?: any;
  actionColumnWidth?: number;
  applyInterline?: boolean;
  colorInterline?: ColorInterline;
}

interface ColorInterline {
  color0: string;
  color1: string;
}

export interface TableEventControl {
  action: string;
  object?: any;
  event: any;
}