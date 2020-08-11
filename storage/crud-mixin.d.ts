/**
 * @type {Function}
 */
export declare const StorageCrudMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param evt
         * @param {CustomEvent} evt
         */
        _deleteEntity(evt: any): void;
        /**
         * @private
         */
        _deleteCallback(data: any): void;
        /**
         * @param evt
         * @param {CustomEvent} evt
         */
        _updateEntity(evt: any): void;
        /**
         * @param data
         * @private
         */
        _updateCallback(data: any): void;
        /**
         * @param evt
         * @param {CustomEvent} evt
         */
        _saveEntity(evt: any): void;
        /**
         * @param data
         * @private
         */
        _saveCallback(data: any): void;
    };
    [x: string]: any;
    readonly properties: {
        /**
         * @type StorageInterface
         */
        _storage: {
            type: ObjectConstructor;
            notify: boolean;
            readOnly: boolean;
        };
    };
};
