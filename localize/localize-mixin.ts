import {Listener} from '@dsign/library/src/event/Listener';
import {Localize} from '@dsign/library/src/localize/Localize';
import '@polymer/iron-ajax/iron-ajax.js';
import IntlMessageFormat from 'intl-messageformat'

/**
 *
 * @type {Function}
 */
export const LocalizeMixin = (superClass) => {

    return class extends superClass {

        static get properties() {
            return {
                /**
                 * @type Localize
                 */
                _localizeService: {
                    type: Object,
                    readOnly: true,
                    notify: true,
                    observer: 'changedLocalizeService'
                },

                /**
                 * @string
                 */
                language: {
                    type: String
                },

                /**
                 * @type object
                 * @description
                    The dictionary of localized messages, for each of the languages that
                    are going to be used. See http://formatjs.io/guides/message-syntax/ for
                    more information on the message syntax.

                    For example, a valid dictionary would be:
                    this.resources = {
                        'en': { 'greeting': 'Hello!' }, 'fr' : { 'greeting': 'Bonjour!' }
                    }
                 */
                resources: {type: Object},

                formats: {
                    type: Object,
                    value: function() {
                        return {
                        }
                    }
                },

                /**
                 If true, will use the provided key when
                 the translation does not exist for that key.
                 */
                useKeyIfMissing: {
                    type: Boolean,
                    value: false
                },

                /**
                 Translates a string to the current `language`. Any parameters to the
                 string should be passed in order, as follows:
                 `localize(stringKey, param1Name, param1Value, param2Name, param2Value)`
                 */
                localize: {
                    type: Function,
                    computed: '__computeLocalize(language, resources, formats)'
                },

                /**
                 If true, will bubble up the event to the parents
                 */
                bubbleEvent: {type: Boolean, value: false}

            };
        }

        /**
         *
         */
        constructor() {
            super();
            this.__localizationCache = {
                requests: {}, /* One iron-request per unique resources path. */
                messages: {}, /* Unique localized strings. Invalidated when the language,
                     formats or resources change. */
                ajax: null    /* Global iron-ajax object used to request resource files. */
            };
        }

        /**
         * @param newValue
         */
        changedLocalizeService(newValue) {
            if (!newValue) {
                return;
            }
            this.language = this._localizeService.getDefaultLang();
            this._evtListener = new Listener(this.changeLanguage.bind(this));
            this._localizeService.getEventManager().on(Localize.CHANGE_LANGUAGE, this._evtListener)
        }

        /**
         * @param evt
         */
        changeLanguage(evt) {
            this.language = evt.data.language;
        }

        /**
         *
         * @param path
         * @param language
         * @param merge
         */
        loadResources(path, language, merge) {
            var proto = this.constructor.prototype;

            // Check if localCache exist just in case.
            this.__checkLocalizationCache(proto);

            // If the global ajax object has not been initialized, initialize and cache
            // it.
            var ajax = proto.__localizationCache.ajax;
            if (!ajax) {
                ajax = proto.__localizationCache.ajax =
                    document.createElement('iron-ajax');
            }

            var request = proto.__localizationCache.requests[path];

            function onRequestResponse(event) {
                this.__onRequestResponse(event, language, merge);
            }

            if (!request) {
                ajax.url = path;
                var request = ajax.generateRequest();

                request.completes.then(
                    onRequestResponse.bind(this), this.__onRequestError.bind(this));

                // Cache the instance so that it can be reused if the same path is loaded.
                proto.__localizationCache.requests[path] = request;
            } else {
                request.completes.then(
                    onRequestResponse.bind(this), this.__onRequestError.bind(this));
            }
        }

        __onRequestResponse(event, language, merge) {
            var propertyUpdates = {resources: {}};
            var newResources = event.response;
            if (merge) {
                if (language) {
                    propertyUpdates.resources = Object.assign({}, this.resources || {});
                    propertyUpdates['resources.' + language] =
                        Object.assign(propertyUpdates.resources[language] || {}, newResources);
                } else {
                    propertyUpdates.resources = Object.assign(this.resources, newResources);
                }
            } else {
                if (language) {
                    propertyUpdates.resources = {};
                    propertyUpdates.resources[language] = newResources;
                    propertyUpdates['resources.' + language] = newResources;
                } else {
                    propertyUpdates.resources = newResources;
                }
            }
            if (this.setProperties) {
                this.setProperties(propertyUpdates);
            } else {
                for (var key in propertyUpdates) {
                    this.set(key, propertyUpdates[key]);
                }
            }
            this.fire(
                'app-localize-resources-loaded', event, {bubbles: this.bubbleEvent});
        }

        /**
         * @param proto
         * @private
         */
        __checkLocalizationCache(proto) {
            // do nothing if proto is undefined.
            if (proto === undefined)
                return;

            // In the event proto not have __localizationCache object, create it.
            if (proto['__localizationCache'] === undefined) {
                proto['__localizationCache'] = {requests: {}, messages: {}, ajax: null};
            }
        }

        /**
         Returns a computed `localize` method, based on the current `language`.
         */
        __computeLocalize(language, resources, formats) {
            var proto = this.constructor.prototype;

            // Check if localCache exist just in case.
            this.__checkLocalizationCache(proto);

            // Everytime any of the parameters change, invalidate the strings cache.
            if (!proto.__localizationCache) {
                proto['__localizationCache'] = {requests: {}, messages: {}, ajax: null};
            }
            proto.__localizationCache.messages = {};

            return function() {
                var key = arguments[0];
                if (!key || !resources || !language || !resources[language])
                    return;

                // Cache the key/value pairs for the same language, so that we don't
                // do extra work if we're just reusing strings across an application.
                var translatedValue = resources[language][key];

                if (!translatedValue) {
                    return this.useKeyIfMissing ? key : '';
                }

                var messageKey = key + translatedValue;
                var translatedMessage = proto.__localizationCache.messages[messageKey];

                if (!translatedMessage) {
                    translatedMessage = new IntlMessageFormat(translatedValue, language, formats);
                    proto.__localizationCache.messages[messageKey] = translatedMessage;
                }

                var args = {};
                for (var i = 1; i < arguments.length; i += 2) {
                    args[arguments[i]] = arguments[i + 1];
                }

                return translatedMessage.format(args);
            }.bind(this);
        }
    }
};
