export interface ActitoCredentials {
  user: string;
  password: string;
  entity: string;
  env: "test" | "prod";
}

interface Property {
  name: string;
  value: string;
}

export interface Segmentation {
  category: string;
  name: string;
}

export interface Subscription {
  id: number;
  name: string;
}

export interface ProfileBody {
  attributes: Property[];
  subscriptions: Subscription[];
  segmentations: Segmentation[];
}
