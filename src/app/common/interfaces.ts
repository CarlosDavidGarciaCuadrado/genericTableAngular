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
  }

  export interface TableEventControl {
    action: string;
    object?: any;
    event: any;
  }