declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    constructor();
    validate(username: string, password: string): Promise<any>;
}
export {};
