export interface PackageResponseInterface {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: Array<string>;
  date: string;
  links: object;
  author: object;
  publisher: object;
  maintainers: Array<object>;
}
