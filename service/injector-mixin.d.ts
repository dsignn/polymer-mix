/**
 * @type {Function}
 */
export declare const ServiceInjectorMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param newValue
         */
        changeServices(newValue: any): void;
        /**
         * @param services
         * @param subContainer
         * @private
         */
        _searchService(services: any, subContainer?: any): void;
        /**
         * @param service
         * @param property
         * @private
         */
        _setService(service: any, property: any): void;
    };
    [x: string]: any;
    readonly properties: {
        services: {
            type: ObjectConstructor;
            observer: string;
        };
    };
};
