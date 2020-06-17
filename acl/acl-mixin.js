import {Acl} from "@dsign/library/src/permission/acl/Acl"
/**
 *
 * @type {Object}
 */
export const AclMixin = (superClass) => {

    return class extends superClass {

        static get properties() {
            return {
                /**
                 * @type AclInterface
                 */
                _aclService : {
                    type: Object,
                    readOnly: true,
                    observer: '_changeAclService'
                },

                _role : {
                    type: String,
                    readOnly: true,
                },

                /**
                 * @type Function
                 */
                isAllowed : {
                    type: Function,
                    computed: '__computeAllow(resource, privilege, _role, _aclService)'
                }
            };
        }

        /**
         * @param resource
         * @param privilege
         * @param role
         * @param aclService
         * @return {function(*=, *=)}
         * @private
         */
        __computeAllow(resource, privilege, role, aclService) {
            return (resource, privilege) => {

                let isAllowed = false;

                if (!!resource && !!aclService, !!this._role) {
                    isAllowed = this._aclService.isAllowed(this._role, resource, privilege);
                }
                return isAllowed;
            };
        }

        /**
         * @param newValue
         * @private
         */
        _changeAclService(newValue) {
            if (!newValue) {
                return;
            }

            newValue.getEventManager().on(Acl.CHANGE_ROLE, (evt) => {
                this._set_role(evt.data);
            });
        }
    }
};
