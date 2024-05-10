import type { SeedDataStruct } from '../model/seed';
declare class LocalStorage {
    savePath: string;
    private defaultData;
    private data;
    constructor(name: string, data: any);
    get(): Promise<SeedDataStruct>;
    set(data: any): Promise<SeedDataStruct>;
}
export default LocalStorage;
