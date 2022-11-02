import '../styles/globals.css'
import { I18nextProvider } from 'react-i18next'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import React from 'react'
import i18n from '../utils/i18n'
import { i18n as i18nConfig } from '../next-i18next.config'
import { useEffect } from 'react'

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: i18nConfig.defaultLocale,
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: 'EN', title: 'English' },
        { value: 'ko', right: 'KO', title: '한국어' },
        { value: 'ja', right: 'JA', title: '日本語' },
      ],
    },
  },
}

export const decorators = [
  (Story, { globals }) => {
    useEffect(() => {
      i18n.changeLanguage(globals.locale)
    }, [globals.locale])

    return (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    )
  },
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  layout: 'fullscreen',
}
