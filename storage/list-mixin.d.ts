/**
 * @type {Function}
 */
export declare const StorageListMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param {StorageInterface} newValue
         * @private
         */
        _changedStorage(newValue: any): void;
        /**
         *
         */
        getAll(): void;
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
         * @type Array
         */
        entities: {
            type: ArrayConstructor;
            notify: boolean;
            value: any[];
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
         * @type object
         */
        filter: {
            type: ObjectConstructor;
            value: {};
        };
        autoladEntities: {
            type: BooleanConstructor;
            value: boolean;
        };
    };
};
