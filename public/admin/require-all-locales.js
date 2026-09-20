/**
 * Blocks saving an entry until every translatable field is filled in for every
 * locale.
 *
 * Decap only validates one locale: on save it switches the left pane to the
 * default locale (lt) and runs validation on that pane alone, so `required`
 * never applies to the English side. An entry saved with an empty English pane
 * is written as the Lithuanian file only -- no en/<slug>.md is created at all.
 *
 * A `preSave` handler that throws aborts the save and surfaces the message as
 * an error toast, so that is where the check lives.
 *
 * Rules, per field declared `i18n: true` in config.yml:
 *   - required fields (anything without `required: false`) must be filled in
 *     every locale;
 *   - optional fields must be filled in every locale or in none -- translating
 *     a field into one language only is what we are trying to prevent.
 * Fields marked `i18n: duplicate` or `i18n: none` are copied or intentionally
 * single-language, so they are skipped.
 *
 * The check only runs once every locale actually has draft data. Decap loads the
 * locale files with `Promise.allSettled` and keeps only the fulfilled ones
 * (`getI18nEntry` in decap-cms-core/src/lib/i18n.ts), so a single failed read drops
 * that locale from the entry without logging anything -- the editor still opens, and
 * the pane can still show text restored from the local draft backup. Treating that as
 * a missing translation produces an error the editor cannot clear by typing, so this
 * case warns to the console and lets the save through instead.
 */
(function () {
  var configPromise = null;

  function loadConfig() {
    if (!configPromise) {
      configPromise = fetch('config.yml', { credentials: 'same-origin' })
        .then(function (res) {
          if (!res.ok) throw new Error('config.yml responded ' + res.status);
          return res.text();
        })
        .then(function (text) {
          return window.jsyaml.load(text);
        })
        .catch(function (error) {
          // Don't cache a failure, so a transient error doesn't disable the
          // check for the rest of the session.
          configPromise = null;
          throw error;
        });
    }
    return configPromise;
  }

  function isEmpty(value) {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  function isTranslatable(field) {
    return field.i18n === true || field.i18n === 'translate';
  }

  // Non-default locales keep their values under entry.i18n.<locale>.data;
  // the default locale lives in entry.data.
  function rawLocaleData(entry, locale, defaultLocale) {
    return locale === defaultLocale ? entry.data : (entry.i18n || {})[locale] && entry.i18n[locale].data;
  }

  function localeData(entry, locale, defaultLocale) {
    return rawLocaleData(entry, locale, defaultLocale) || {};
  }

  // Locales the draft holds no data object for at all. That is a load failure rather
  // than an untranslated field -- see the note at the top of the file.
  function unloadedLocales(entry, i18n) {
    return i18n.locales.filter(function (locale) {
      return !rawLocaleData(entry, locale, i18n.defaultLocale);
    });
  }

  function collectionI18n(collection, globalI18n) {
    if (!globalI18n || !collection.i18n) return null;
    var i18n = collection.i18n === true ? globalI18n : Object.assign({}, globalI18n, collection.i18n);
    var locales = i18n.locales || [];
    if (locales.length < 2) return null;
    return { locales: locales, defaultLocale: i18n.default_locale || locales[0] };
  }

  function findMissing(entry, collection, i18n) {
    var missingByLocale = {};

    (collection.fields || []).filter(isTranslatable).forEach(function (field) {
      var filled = i18n.locales.filter(function (locale) {
        return !isEmpty(localeData(entry, locale, i18n.defaultLocale)[field.name]);
      });

      var mustBeFilled = field.required !== false || filled.length > 0;
      if (!mustBeFilled || filled.length === i18n.locales.length) return;

      i18n.locales
        .filter(function (locale) {
          return filled.indexOf(locale) === -1;
        })
        .forEach(function (locale) {
          missingByLocale[locale] = missingByLocale[locale] || [];
          missingByLocale[locale].push(field.label || field.name);
        });
    });

    return missingByLocale;
  }

  window.CMS.registerEventListener({
    name: 'preSave',
    handler: function (data) {
      var entry = typeof data.entry.toJS === 'function' ? data.entry.toJS() : data.entry;

      return loadConfig()
        .then(function (config) {
          var collection = (config.collections || []).find(function (c) {
            return c.name === entry.collection;
          });
          if (!collection || !collection.fields) return;

          var i18n = collectionI18n(collection, config.i18n);
          if (!i18n) return;

          var unloaded = unloadedLocales(entry, i18n);
          if (unloaded.length > 0) {
            console.warn(
              '[require-all-locales] skipping check of "' +
                entry.slug +
                '": the draft carries no data for ' +
                unloaded.join(', ').toUpperCase() +
                '. Close the entry and reopen it before saving if a translation looks missing.',
            );
            return;
          }

          var missingByLocale = findMissing(entry, collection, i18n);
          var locales = Object.keys(missingByLocale);
          if (locales.length === 0) return;

          var detail = locales
            .map(function (locale) {
              return locale.toUpperCase() + ' is missing: ' + missingByLocale[locale].join(', ');
            })
            .join('; ');

          // Print what the check actually saw, so a disputed result can be
          // diagnosed from the browser console instead of guessed at.
          console.warn(
            '[require-all-locales] blocked save of "' + entry.slug + '" in ' + entry.collection + ':',
            i18n.locales.reduce(function (acc, locale) {
              var data = localeData(entry, locale, i18n.defaultLocale);
              acc[locale] = (collection.fields || []).filter(isTranslatable).reduce(function (f, field) {
                var v = data[field.name];
                f[field.name] = isEmpty(v) ? '(empty)' : typeof v === 'string' ? v.slice(0, 40) : v;
                return f;
              }, {});
              return acc;
            }, {}),
          );

          var message =
            'fill in every field in both languages before saving (' +
            detail +
            '). See the browser console for the values this check read.';
          var error = new Error(message);
          error.localeValidation = true;
          // The save-failure toast renders error.toString(); keep it readable.
          error.toString = function () {
            return message;
          };
          throw error;
        })
        .catch(function (error) {
          // A missing config.yml or js-yaml must not lock the editor out of
          // saving, so only our own validation error blocks the save.
          if (error && error.localeValidation) throw error;
          console.error('[require-all-locales] skipping check:', error);
        });
    },
  });
})();
