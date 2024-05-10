declare class LocalConfig {
    private handle;
    private pkgHandle;
    private seedHandle;
    constructor();
    get(): Promise<import("../model/seed").SeedDataStruct>;
    updateSeedInfo(): Promise<import("../model/seed").SeedDataStruct>;
    reset(): Promise<import("../model/seed").SeedDataStruct>;
}
export default LocalConfig;
