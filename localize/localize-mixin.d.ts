import '@polymer/iron-ajax/iron-ajax.js';
/**
 *
 * @type {Function}
 */
export declare const LocalizeMixin: (superClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * @param newValue
         */
        changedLocalizeService(newValue: any): void;
        /**
         * @param evt
         */
        changeLanguage(evt: any): void;
        /**
         *
         * @param path
         * @param language
         * @param merge
         */
        loadResources(path: any, language: any, merge: any): void;
        __onRequestResponse(event: any, language: any, merge: any): void;
        /**
         * @param proto
         * @private
         */
        __checkLocalizationCache(proto: any): void;
        /**
         Returns a computed `localize` method, based on the current `language`.
         */
        __computeLocalize(language: any, resources: any, formats: any): any;
    };
    [x: string]: any;
    readonly properties: {
        /**
         * @type Localize
         */
        _localizeService: {
            type: ObjectConstructor;
            readOnly: boolean;
            notify: boolean;
            observer: string;
        };
        /**
         * @string
         */
        language: {
            type: StringConstructor;
        };
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
        resources: {
            type: ObjectConstructor;
        };
        formats: {
            type: ObjectConstructor;
            value: () => {};
        };
        /**
         If true, will use the provided key when
         the translation does not exist for that key.
         */
        useKeyIfMissing: {
            type: BooleanConstructor;
            value: boolean;
        };
        /**
         Translates a string to the current `language`. Any parameters to the
         string should be passed in order, as follows:
         `localize(stringKey, param1Name, param1Value, param2Name, param2Value)`
         */
        localize: {
            type: FunctionConstructor;
            computed: string;
        };
        /**
         If true, will bubble up the event to the parents
         */
        bubbleEvent: {
            type: BooleanConstructor;
            value: boolean;
        };
    };
};
