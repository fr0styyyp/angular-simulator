# Архитектурный рефакторинг Angular-приложения

## Что выбрали

- Архитектура приложения: feature based architecture + core/shared
- Паттерн UI/логики: применено для users user.service.ts хранит состояние а user-api.service.ts отвечает за запросы, но для posts такое не реализовано, post-api.service.ts совмещает оба
- Управление состоянием: rxjs
- Методология: элементы ddd но без четкого следования методологии

## Почему это подходит

до рефакторинга компоненты одного домена лежали прямо в src и на одном уровне с assets, то ест даже не внутри app, после вынесения в features/ все компоненты одного домена собраны в одном месте

## Почему не альтернативы

- Почему не Signals вместо RxJS: хороши для простых состоянии, но слабыдля для асинхронных запросов и обработок ошибок
- Почему не NgRx: здесь избыточен так как домены слабо связаны
- Почему не Layered: деление по слоям хуже для ориентации по проекту нежели деление по доменам, когда они не пересекаются 

## Дерево структуры проекта

.
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── core
│   │   │   ├── components
│   │   │   │   ├── footer
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   ├── footer.component.scss
│   │   │   │   │   └── footer.component.ts
│   │   │   │   ├── header
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   ├── header.component.scss
│   │   │   │   │   └── header.component.ts
│   │   │   │   ├── loader
│   │   │   │   │   ├── loader.component.html
│   │   │   │   │   ├── loader.component.scss
│   │   │   │   │   └── loader.component.ts
│   │   │   │   ├── message
│   │   │   │   │   ├── message.component.html
│   │   │   │   │   ├── message.component.scss
│   │   │   │   │   └── message.component.ts
│   │   │   │   └── not-found-page
│   │   │   │       ├── not-found-page.component.html
│   │   │   │       ├── not-found-page.component.scss
│   │   │   │       └── not-found-page.component.ts
│   │   │   ├── enums
│   │   │   │   ├── Color.ts
│   │   │   │   ├── Message.ts
│   │   │   │   ├── Mode.ts
│   │   │   │   ├── PhoneMode.ts
│   │   │   │   ├── Theme.ts
│   │   │   │   └── UserRole.ts
│   │   │   ├── interceptors
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── logging.interceptor.ts
│   │   │   ├── interfaces
│   │   │   │   ├── IAppConfig.ts
│   │   │   │   ├── IMessage.ts
│   │   │   │   ├── INavItem.ts
│   │   │   │   ├── ISelectOption.ts
│   │   │   │   └── IThemeState.ts
│   │   │   ├── services
│   │   │   │   ├── loader.service.ts
│   │   │   │   ├── local-storage.service.ts
│   │   │   │   ├── message.service.ts
│   │   │   │   └── theme.service.ts
│   │   │   └── tokens
│   │   │       ├── app-config.token.ts
│   │   │       └── date-format-token.ts
│   │   ├── features
│   │   │   ├── auth
│   │   │   │   ├── auth
│   │   │   │   │   ├── auth.component.html
│   │   │   │   │   ├── auth.component.scss
│   │   │   │   │   └── auth.component.ts
│   │   │   │   ├── guards
│   │   │   │   │   ├── admin.guard.ts
│   │   │   │   │   └── auth.guard.ts
│   │   │   │   ├── interceptors
│   │   │   │   │   └── auth-req.interceptor.ts
│   │   │   │   ├── interfaces
│   │   │   │   │   ├── IAuthResponse.ts
│   │   │   │   │   ├── IAuthUser.ts
│   │   │   │   │   └── IToken.ts
│   │   │   │   └── services
│   │   │   │       └── auth.service.ts
│   │   │   ├── home
│   │   │   │   ├── home-page
│   │   │   │   │   ├── home-page.component.html
│   │   │   │   │   ├── home-page.component.scss
│   │   │   │   │   └── home-page.component.ts
│   │   │   │   └── interfaces
│   │   │   │       ├── IBlog.ts
│   │   │   │       ├── ICard.ts
│   │   │   │       ├── IDestination.ts
│   │   │   │       ├── IGradientConfiguration.ts
│   │   │   │       └── IImpressionImage.ts
│   │   │   ├── language
│   │   │   │   ├── enums
│   │   │   │   │   └── Language.ts
│   │   │   │   ├── interfaces
│   │   │   │   │   └── ILanguage.ts
│   │   │   │   └── services
│   │   │   │       └── language.service.ts
│   │   │   ├── posts
│   │   │   │   ├── create-post
│   │   │   │   │   ├── create-post.component.html
│   │   │   │   │   ├── create-post.component.scss
│   │   │   │   │   └── create-post.component.ts
│   │   │   │   ├── interfaces
│   │   │   │   │   ├── IPost.ts
│   │   │   │   │   ├── IPostEditFormValue.ts
│   │   │   │   │   └── IPostResponse.ts
│   │   │   │   ├── post-detail
│   │   │   │   │   ├── post-detail.component.html
│   │   │   │   │   ├── post-detail.component.scss
│   │   │   │   │   └── post-detail.component.ts
│   │   │   │   ├── post-edit-dialog
│   │   │   │   │   ├── post-edit-dialog.component.html
│   │   │   │   │   ├── post-edit-dialog.component.scss
│   │   │   │   │   └── post-edit-dialog.component.ts
│   │   │   │   ├── posts
│   │   │   │   │   ├── posts.component.html
│   │   │   │   │   ├── posts.component.scss
│   │   │   │   │   └── posts.component.ts
│   │   │   │   ├── resolvers
│   │   │   │   │   └── post.resolver.ts
│   │   │   │   ├── services
│   │   │   │   │   └── post-api.service.ts
│   │   │   │   └── types
│   │   │   │       ├── postEditData.ts
│   │   │   │       └── postFormValue.ts
│   │   │   └── users
│   │   │       ├── create-user
│   │   │       │   ├── create-user.component.html
│   │   │       │   ├── create-user.component.scss
│   │   │       │   └── create-user.component.ts
│   │   │       ├── interfaces
│   │   │       │   └── IUser.ts
│   │   │       ├── services
│   │   │       │   ├── user-api.service.ts
│   │   │       │   └── user.service.ts
│   │   │       ├── user-card
│   │   │       │   ├── user-card.component.html
│   │   │       │   ├── user-card.component.scss
│   │   │       │   └── user-card.component.ts
│   │   │       ├── users-filter
│   │   │       │   ├── users-filter.component.html
│   │   │       │   ├── users-filter.component.scss
│   │   │       │   └── users-filter.component.ts
│   │   │       └── users-page
│   │   │           ├── users-page.component.html
│   │   │           ├── users-page.component.scss
│   │   │           └── users-page.component.ts
│   │   ├── homework-27.md
│   │   ├── homework-30.md
│   │   └── shared
│   │       ├── directives
│   │       │   ├── animated-gradient.directive.ts
│   │       │   └── bold-on-hover.directive.ts
│   │       └── pipes
│   │           ├── date.pipe.ts
│   │           ├── phone-mode.pipe.ts
│   │           └── plural.pipe.ts
│   ├── assets
│   │   ├── _fonts.scss
│   │   ├── _normalize.scss
│   │   ├── fonts
│   │   │   ├── next-art
│   │   │   │   └── NEXT ART_SemiBold.otf
│   │   │   └── nunito-sans
│   │   │       ├── NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf
│   │   │       └── NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf
│   │   └── styles.scss
│   ├── collection.ts
│   ├── index.html
│   ├── main.ts
│   └── sandbox
│       └── homework-28
│           ├── ITodo.ts
│           ├── IUser.ts
│           ├── cd-default
│           │   ├── cd-default.component.html
│           │   ├── cd-default.component.scss
│           │   └── cd-default.component.ts
│           ├── cd-on-push
│           │   ├── cd-on-push.component.html
│           │   ├── cd-on-push.component.scss
│           │   └── cd-on-push.component.ts
│           ├── child
│           │   ├── child.component.html
│           │   ├── child.component.scss
│           │   └── child.component.ts
│           └── parent
│               ├── parent.component.html
│               ├── parent.component.scss
│               └── parent.component.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json