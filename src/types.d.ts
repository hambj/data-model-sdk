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

// TODO: add translator for segmentation
export type ISegmentation =
  | {
      category: string;
      name: string;
    }
  | {
      belongs: true;
      segmentation: {
        category: "string";
        name: "string";
      };
    };

// TODO: add translator for subscription
export interface ISubscription {
  name: number;
  subscribe: boolean;
}

export interface IAPIProfileBody {
  attributes?: IAPIProperty[];
  subscriptions?: ISubscription[];
  segmentations?: ISegmentation[];
  dataCollectionInformation?: {
    date: string;
    source: string;
    way: string;
  };
}

// TODO: make dataCollectionInformation mandatory on create / update

export interface IProfileRecord {
  profile?: { [key: string]: string };
  subscriptions?: ISubscription[];
  segmentations?: ISegmentation[];
  dataCollectionInformation?: {
    date: string;
    source: string;
    way: string;
  };
}
