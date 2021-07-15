export interface ISanitize {
  sanitize(model: any): any;
  sanitizeMany?(model: any[]): any;
}
