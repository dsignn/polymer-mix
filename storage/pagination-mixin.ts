import {Storage} from "@dsign/library/src/storage/Storage";
import {Listener} from "@dsign/library/src/event/Listener";

/**
 * @type {Function}
 */
export const StoragePaginationMixin = (superClass) => {

    return class extends superClass {

        static get properties() {
            return {

                /**
                 * @type Array
                 */
                entities : {
                    type: Array,
                    notify: true,
                    value: []
                },

                /**
                 * @type StorageInterface
                 */
                _storage: {
                    type: Object,
                    notify: true,
                    readOnly: true
                },

                /**
                 * @type number
                 */
                page: {
                    type: Number,
                    notify: true,
                    value: 1
                },

                /**
                 * @type number
                 */
                itemPerPage: {
                    type: Number,
                    notify: true,
                    value: 20
                },

                /**
                 * @type number
                 */
                totalItems: {
                    type: Number,
                    notify: true,
                    readOnly: true,
                    value: 0
                },

                /**
                 * @type object
                 */
                filter: {
                    type: Object,
                    notify: true,
                    value: {},
                    observer: "getPagedEntities"
                }
            };
        }

        /**
         * @param {Number} page
         * @param {Number} itemPerPage
         * @param storage
         */
        observerPaginationEntities(page, itemPerPage, storage) {

            if (!page || !itemPerPage || !storage) {
                return;
            }

            this.getPagedEntities();


            this.listenerUpdate = new Listener(this.getPagedEntities.bind(this));
            storage.getEventManager().on(Storage.POST_SAVE, this.listenerUpdate);
            storage.getEventManager().on(Storage.POST_UPDATE, this.listenerUpdate);
            storage.getEventManager().on(Storage.POST_REMOVE, this.listenerUpdate);
        }

        /**
         * @private
         */
        getPagedEntities() {

            if (!this._storage) {
                return;
            }

            this._storage.getPaged(this.page, this.itemPerPage, this.filter)
                .then((data) => {
                    this.set('entities', data);
                    this._setTotalItems(data.totalItems);
                    this.notifyPath('totalItems');
                });


        }
    }
};
