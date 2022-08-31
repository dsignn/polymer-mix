/**
 * @type {Function}
 */
export declare const StoragePaginationMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param {Number} page
         * @param {Number} itemPerPage
         * @param storage
         */
        observerPaginationEntities(page: any, itemPerPage: any, storage: any): void;
        /**
         * @private
         */
        getPagedEntities(): void;
    };
    [x: string]: any;
    readonly properties: {
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
        };
        /**
         * @type number
         */
        page: {
            type: NumberConstructor;
            notify: boolean;
            value: number;
        };
        /**
         * @type number
         */
        itemPerPage: {
            type: NumberConstructor;
            notify: boolean;
            value: number;
        };
        /**
         * @type number
         */
        totalItems: {
            type: NumberConstructor;
            notify: boolean;
            readOnly: boolean;
            value: number;
        };
        /**
         * @type object
         */
        filter: {
            type: ObjectConstructor;
            notify: boolean;
            value: {};
            observer: string;
        };
    };
};
