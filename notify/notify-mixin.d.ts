/**
 * @type {Function}
 */
export declare const NotifyMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param notify
         */
        notify(notify: any): void;
    };
    [x: string]: any;
    readonly properties: {
        /**
         * @type Notify
         */
        _notifyService: {
            type: ObjectConstructor;
            readOnly: boolean;
            notify: boolean;
        };
    };
};
