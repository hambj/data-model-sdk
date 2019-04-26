export interface IActitoCredentials {
  user: string;
  password: string;
  entity: string;
  env: "test" | "prod";
}

export interface IProperty {
  name: string;
  value: string;
}

export interface ISegmentation {
  category: string;
  name: string;
}

export interface ISubscription {
  id: number;
  name: string;
}

export interface ProfileBody {
  attributes: IProperty[];
  subscriptions: ISubscription[];
  segmentations: ISegmentation[];
}
