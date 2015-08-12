import Translator from '../src/Translator';

describe('Translator', function() {

	let translator;

	beforeEach(() => {
		const translations = {
			'hello': {
				en: 'Hello!',
				et: 'Tere!'
			},
			'admin.greet(name,age)': {
				en: 'Hello {name}, you are {age} years old!',
				et: 'Tere {age} aastane {name} ({age})'
			}
		};

		translator = new Translator(translations, 'en');
	});

	it('should translate simple simple strings', function() {
		let translation = translator.translate('hello');

		expect(translation).toEqual('Hello!');
	});

});