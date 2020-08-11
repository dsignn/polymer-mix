/**
 *
 * @type {Function}
 */
export declare const LocalizeMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param newValue
         */
        changedLocalizeService(newValue: any): void;
        /**
         * @param evt
         */
        changeLanguage(evt: any): void;
    };
    [x: string]: any;
    readonly properties: {
        /**
         * @type Localize
         */
        _localizeService: {
            type: ObjectConstructor;
            readOnly: boolean;
            notify: boolean;
            observer: string;
        };
    };
};
