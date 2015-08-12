import log from '../services/log';

/**
 * Simple and minimal yet powerful translator.
 *
 * The translator.translate method has all other Translator class methods as well so you can use it directly as
 * translate('key') or call translate.language, translate.getLanguageKeys() etc.
 *
 * Translations format example:
 *   {
 *     'admin.greet(name,age)': {
 *       en: 'Hello {name}, you are {age} years old!',
 *       et: 'Tere {age} aastane {name} ({age})'
 *     }
 *   }
 *
 * Integration example in translate.js:
 *   import Translator from './Translator';
 *   const translator = new Translator(translations, 'en');
 *   export default translator.translate;
 *
 * Set or add translations:
 *   translator.setTranslations(translations) - replaces existing translations
 *   translator.addTranslations(translations) - keeps existing translations and adds new ones
 */
export default class Translator {

	/**
	 * Constructor.
	 *
	 * Accepts optional map of translations and active language key. If the first parameter is a string, it's expected
	 * to be the language so translations are omitted.
	 *
	 * @param {object} [translations={}] Map of translations with keys on first level and language keys on second
	 * @param {string} [language] Active language
	 */
	constructor(translations = {}, language = null) {
		// translations can be omitted
		if (typeof translations === 'string') {
			language = translations;
			translations = {};
		}

		this.translations = translations;
		this.language = language;

		this._augmentTranslate();
	}

	/**
	 * Translates given translation key.
	 *
	 * If no translation exists, returns the original key.
	 *
	 * @param {string} key Translation key to translate
	 * @param {object} [args] Optional map of arguments to replace in the translation
	 * @returns {string}
	 */
	translate(key, args) {
		if (typeof key !== 'string') {
			throw new Error('Expected the key to be a string but got "' + (typeof key) + '"');
		}

		if (typeof args !== 'undefined' && typeof args !== 'object' || args === null) {
			throw new Error('The second parameter is expected to be a object if set but got "' + (typeof args) + '"');
		}

		if (this.language === null) {
			throw new Error('Language has not been set');
		}

		const translations = this.translations[key];
		const providedArgumentNames = typeof args === 'object' && args !== null ? Object.keys(args) : [];

		if (typeof translations === 'undefined') {
			log.warn('translation for "' + key + '" not found');

			return key;
		}

		let translation = translations[this.language];

		if (typeof translation === 'undefined') {
			log.warn('translation for "' + key + '" in language "' + this.language + '" not found');

			return key;
		}

		if (providedArgumentNames.length > 0) {
			const keyArgumentNames = this._getKeyArgumentNames(key),
				translationArgumentNames = this._getTranslationArgumentNames(translation);

			if (!this._areArraysEqual(providedArgumentNames, translationArgumentNames)) {
				log.warn(
					'"' + key + '" translation "' + translation + '" expected argument'
					+ (translationArgumentNames.length > 1 ? 's' : '') + ' called "'
					+ translationArgumentNames.join('", "')
					+ '", but got "' + providedArgumentNames.join('", "') + '"'
				);
			}

			if (!this._areArraysEqual(keyArgumentNames, translationArgumentNames)) {
				log.warn(
					'"' + key + '" translation "' + translation + '" key contains argument'
					+ (keyArgumentNames.length > 1 ? 's' : '') + ' called "'
					+ keyArgumentNames.join('", "')
					+ '", but translation contains "' + translationArgumentNames.join('", "') + '"'
				);
			}

			providedArgumentNames.forEach(function(providedArgumentName) {
				const argumentValue = args[providedArgumentName];

				translation = translation.replace(new RegExp('\{' + providedArgumentName + '\}', 'g'), argumentValue);
			});
		}

		return translation;
	}

	/**
	 * Sets active language.
	 *
	 * @param {string} language Language to use
	 */
	setLanguage(language) {
		this.language = language;
		this.translate.language = this.language;
	}

	/**
	 * Returns active language.
	 *
	 * Returns null if not set.
	 *
	 * @returns {string|null}
	 */
	getLanguage() {
		return this.language;
	}

	/**
	 * Returns the list of language keys found on the first translation.
	 *
	 * @returns {array}
	 */
	getLanguageKeys() {
		let translationKeys = Object.keys(this.translations),
			firstTranslationKey = translationKeys.length > 0 ? translationKeys[0] : null;

		if (firstTranslationKey === null) {
			return [];
		}

		return Object.keys(this.translations[firstTranslationKey]);
	}

	/**
	 * Replaces current map of translations with the provided one.
	 *
	 * @param {object} translations Map of translations
	 */
	setTranslations(translations) {
		this.translations = translations;
		this.translate.translations = this.translations;
	}

	/**
	 * Adds provided translations to current map.
	 *
	 * @param {object} translations Map of translations
	 */
	addTranslations(translations) {
		// Object.assign(this.translations, translations);
		this.translations = { ...this.translations, translations };
	}

	/**
	 * Returns a list of translation keys.
	 *
	 * You can optionally provide a substring that all keys should start with.
	 *
	 * @param {string} [startingWith] Optional key start filter
	 * @returns {array}
	 */
	getTranslationKeys(startingWith) {
		return Object.keys(this.translations).filter((key) => {
			return typeof startingWith !== 'string' || key.substr(0, startingWith.length) === startingWith;
		});
	}

	/**
	 * Returns a list of translations with keys "key" and "translations".
	 *
	 * You can optionally provide a substring that all keys should start with.
	 *
	 * @param {string} [startingWith] Optional key start filter
	 * @returns {array}
	 */
	getTranslations(startingWith) {
		const keys = this.getTranslationKeys(startingWith);

		return keys.map((key) => {
			return {
				key: key,
				translations: this.translations[key]
			};
		});
	}

	/**
	 * Augments the translate method with other public properties of the object.
	 *
	 * @private
	 */
	_augmentTranslate() {
		this.translate = this.translate.bind(this);

		let keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).concat(Object.keys(this));

		keys.forEach((key) => {
			if (['translate', 'constructor'].indexOf(key) !== -1 || key.substr(0, 1) === '_') {
				return;
			}

			let value = this[key];

			if (typeof value === 'function') {
				this.translate[key] = this[key].bind(this);
			} else {
				this.translate[key] = this[key];
			}
		});
	}

	/**
	 * Parses key like "admin.greet(name,age)" to an array ['name', 'age'].
	 *
	 * @param {string} key Key to parse
	 * @returns {array} Array of argument names
	 * @private
	 */
	_getKeyArgumentNames(key) {
		const matches = key.match(/(\()(.*)(\))/);

		if (matches === null) {
			return [];
		}

		return matches[2].replace(/ /g, '').split(',');
	}

	/**
	 * Parses a translation like "Hello {name}, you are {age} years old!" to an array ['name', 'age'].
	 *
	 * @param {string} translation Translation to parse
	 * @returns {array} Array of argument names
	 * @private
	 */
	_getTranslationArgumentNames(translation) {
		const matches = translation.match(/(\{)(.*?)(\})/g),
			argumentNames = [];

		if (matches === null) {
			return [];
		}

		matches.map(function(match) {
			const argumentName = match.substr(1, match.length - 2);

			// avoid duplicates
			if (argumentNames.indexOf(argumentName) === -1) {
				argumentNames.push(argumentName);
			}
		});

		return argumentNames;
	}

	/**
	 * Returns whether the two arrays are equal or not.
	 *
	 * @param {array} a First array
	 * @param {array} b Second array
	 * @returns {boolean}
	 * @private
	 */
	_areArraysEqual(a, b) {
		if (!(a instanceof Array)) {
			throw new Error('Expected the first argument to be an array but got "' + (typeof a) + '"');
		}

		if (!(b instanceof Array)) {
			throw new Error('Expected the second argument to be an array but got "' + (typeof b) + '"');
		}

		if (a.length !== b.length) {
			return false;
		}

		for (let i = 0, l = a.length; i < l; i++) {
			if (a[i] instanceof Array && b[i] instanceof Array) {
				if (this._areArraysEqual(a[i], b[i])) {
					return false;
				}
			} else if (a[i] !== b[i]) {
				return false;
			}
		}

		return true;
	}

}