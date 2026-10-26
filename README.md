# Item Starter for Enonic XP

This starter kit will set up an empty shell for your new Enonic XP 8 app, with Item's tech stack: FreeMarker,
Storybook, PostCSS, and TypeScript types generated from your content types and components.

It is based on [Enonic's TypeScript starter](https://github.com/enonic/starter-ts).

## Usage

You first need to install [Enonic CLI](https://developer.enonic.com/docs/enonic-cli/stable). Then run the following
commands to build and deploy it:

```bash
~ $ enonic project create -r ItemConsulting/starter-item
... Answer wizard question

~ $ cd <project-folder>
~/new-project $ enonic dev
```

Your brand new app should now be up and running on http://localhost:8080

## Storybook

Install the [Storybook app](https://market.enonic.com/vendors/item-consulting-as/storybook) in your sandbox, keep
`enonic dev` running, and start Storybook:

```bash
~/new-project $ npm run storybook
```

## Enonic XP 7

This version of the starter requires Enonic XP 8. For XP 7, use the
[`xp7` tag](https://github.com/ItemConsulting/starter-item/tree/xp7).
