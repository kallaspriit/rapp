import React from 'react';
import t from '../services/translate';

export default class TranslatorView extends React.Component {

	render() {
		// replace translations
		t.setTranslations({
			'admin.title': {
				en: 'English title',
				et: 'Eestikeelne pealkiri'
			},
			'noValidTranslations': {
				ru: 'bljät'
			}
		});

		// add some more
		t.addTranslations({
			'admin.greet(name,age)': {
				en: 'Hello {name}, you are {age} years old!',
				et: 'Tere {age} aastane {name} ({age})'
			},
			'admin.invalidKey(name)': {
				en: 'Hello {foo}',
				et: 'Tere {foo}'
			}
		});

		let renderLanguage = function(language) {
			let chooseLanguage = function(e) {
				e.preventDefault();

				t.setLanguage(language);

				this.forceUpdate();
			}.bind(this);

			return (
				<li>
					<a key={language} href="#" onClick={chooseLanguage}>{language}</a>
					{t.language === language ? ' (current)' : ''}
				</li>
			);
		}.bind(this);

		function renderTranslations(translations) {
			function renderTranslation(translation) {
				function renderTranslationItem(translationLanguage) {
					return (
						<li>{translationLanguage}: {translation.translations[translationLanguage]}</li>
					);
				}

				return (
					<li>
						{translation.key}
						<ul>
							{Object.keys(translation.translations).map(renderTranslationItem)}
						</ul>
					</li>
				);
			}

			return (
				<ul>
					{translations.map(renderTranslation)}
				</ul>
			);
		}

		return (
			<div>
				<h2>Translator</h2>
				<p>
					Languages:
					<ul>
						{t.getLanguageKeys().map(renderLanguage)}
					</ul>
				</p>
				<p>Current language: {t.language}</p>
				<p>Simple: {t('admin.title')}</p>
				<p>Test: {t('admin.title')}</p>
				<p>Formatted: {t('admin.greet(name,age)', { name: 'Jack Sparrow', age: 25 })}</p>
				<p>Too few parameters: {t('admin.greet(name,age)', { name: 'Jack Sparrow' })}</p>
				<p>
					Too many parameters:
					{t('admin.greet(name,age)', { name: 'Jack Sparrow', age: 25, foo: 'bar' })}
				</p>
				<p>
					Invalid parameters provided:
					{t('admin.greet(name,age)', { name: 'Jack Sparrow', foo: 'bar' })}
				</p>
				<p>Invalid key: {t('foobar')}</p>
				<p>Missing language translation: {t('noValidTranslations')}</p>
				<p>Key doesn't match translation: {t('admin.invalidKey(name)', { name: 'Jack Sparrow' })}</p>
				<p>Get all translations: {renderTranslations(t.getTranslations())}</p>
				<p>Get translations in group "admin":{renderTranslations(t.getTranslations('admin'))}</p>
			</div>
		);
	}

}