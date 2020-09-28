export declare const ApiErrorMessageMixin: {
    new (): {
        [x: string]: any;
        changedLocalizeService(newValue: any): void;
        changeLanguage(evt: any): void;
    };
    [x: string]: any;
    readonly properties: {
        _localizeService: {
            type: ObjectConstructor;
            readOnly: boolean;
            notify: boolean;
            observer: string;
        };
    };
};
