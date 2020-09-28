import {LocalizeMixin} from "./../localize/localize-mixin";

/**
 *
 * @param superClass
 * @constructor
 */
const ApiErrorMessage = (superClass) => {

    return class extends superClass{

        static get properties() {
            return {
                /**
                 * @type Localize
                 */
                _flattenService: {
                    readOnly: true
                }
            };
        }

        /**
         * @param ironForm
         * @param errorMessage
         */
        errorMessage(ironForm, errorMessage: object) {
            let elements = ironForm._getValidatableElements();
            let flattenErrors = this._flatten(errorMessage['errors']);

            for (const element of elements) {
                if (flattenErrors[element.getAttribute('name')]) {
                    element.invalid = true;
                    let message = this._localizeService ? this._localizeService.localize(flattenErrors[element.getAttribute('name')]) :
                        flattenErrors[element.getAttribute('name')];
                    element.errorMessage = message;
                }
            }
        }

        /**
         * @param error
         * @returns {*}
         * @private
         */
        _flatten(error: object) {
            let flatten = this._flattenService.flatten(error);

            for (let key in flatten) {
                let endIndex = key.lastIndexOf("[");
                if (endIndex != -1) {
                    flatten[key.substring(0, endIndex)] = flatten[key];
                    delete flatten[key];
                }
            }

            return flatten;
        }
    }
}

export const ApiErrorMessageMixin =  LocalizeMixin(ApiErrorMessage);