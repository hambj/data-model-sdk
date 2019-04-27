export interface IActitoCredentials {
  user: string;
  password: string;
  entity: string;
  env: "test" | "prod";
}

export interface IAPIProperty {
  name: string;
  value: string | boolean;
}

export interface ISegmentation {
  category: string;
  name: string;
}

export interface ISubscription {
  id: number;
  name: string;
}

export interface IAPIProfileBody {
  attributes: IAPIProperty[];
  subscriptions: ISubscription[];
  segmentations: ISegmentation[];
  dataCollectionInformation?: {
    date: string;
    source: string;
    way: string;
  };
}

export interface IProfileSpec {
  profile: { [key: string]: string };
  subscriptions?: ISubscription[];
  segmentations?: ISegmentation[];
  dataCollectionInformation?: {
    date: string;
    source: string;
    way: string;
  };
}
