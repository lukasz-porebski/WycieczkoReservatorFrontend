export class RoutingPathModel {
  public readonly path: string;
  public readonly absolutePath: string;

  constructor(path: string, previousRoute: string) {
    this.path = path;
    this.absolutePath = `/${previousRoute}/${path}`;
  }
}
