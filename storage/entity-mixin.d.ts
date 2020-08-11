/**
 * @type {Function}
 */
export declare const StorageEntityMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @return {string}
         */
        getStorageUpsertMethod(): "update" | "save";
        /**
         * @param {StorageInterface} newValue
         * @private
         */
        _changedStorage(newValue: any): void;
        /**
         * @private
         */
        _autoUpdateFn(): void;
    };
    [x: string]: any;
    readonly properties: {
        /**
         * @type object
         */
        entity: {
            type: ObjectConstructor;
            notify: boolean;
            value: {};
        };
        /**
         * @type StorageInterface
         */
        _storage: {
            type: ObjectConstructor;
            notify: boolean;
            readOnly: boolean;
            observer: string;
        };
        /**
         * @type boolean
         */
        autoUpdateEntity: {
            type: BooleanConstructor;
            value: boolean;
        };
    };
};
