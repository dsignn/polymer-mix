/**
 *
 * @type {Object}
 */
export declare const AclMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param resource
         * @param privilege
         * @param role
         * @param aclService
         * @return {function(*=, *=)}
         * @private
         */
        __computeAllow(resource: any, privilege: any, role: any, aclService: any): (resource: any, privilege: any) => boolean;
        /**
         * @param newValue
         * @private
         */
        _changeAclService(newValue: any): void;
    };
    [x: string]: any;
    readonly properties: {
        /**
         * @type AclInterface
         */
        _aclService: {
            type: ObjectConstructor;
            readOnly: boolean;
            observer: string;
        };
        _role: {
            type: StringConstructor;
            readOnly: boolean;
        };
        /**
         * @type Function
         */
        isAllowed: {
            type: FunctionConstructor;
            computed: string;
        };
    };
};
