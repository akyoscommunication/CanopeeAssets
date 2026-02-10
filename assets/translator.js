import { messages, localeFallbacks } from '@canopee_app/var/translations/configuration';
import {createTranslator} from '@symfony/ux-translator';
/*
 * This file is part of the Symfony UX Translator package.
 *
 * If folder "../var/translations" does not exist, or some translations are missing,
 * you must warmup your Symfony cache to refresh JavaScript translations.
 *
 * If you use TypeScript, you can rename this file to "translator.ts" to take advantage of types checking.
 */

const translator = createTranslator({
    messages,
    localeFallbacks,
});

export const { trans } = translator;

export * from '@canopee_app/var/translations';
