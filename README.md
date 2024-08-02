# Item Starter for Enonic XP

## Usage XP 7

Then run the following commands to build and deploy it:

```bash
~ $ enonic project create -r ItemConsulting/starter-item

... Answer Wizard questions

~ $ cd <project-folder>
~/new-project $ enonic project deploy
```

## Storybook

You need to configure `xpResourcesDirPath` in _no.item.storybook.cfg_ to list both the _resources_ directory of this 
project and the resource directory of [lib-xp-item-blocks](https://github.com/ItemConsulting/lib-xp-item-blocks)

```ini
iAmNotFoolishEnoughToDeployThisInProduction=true
xpResourcesDirPath=/home/myuser/code/starter-item/src/main/resources,/home/myuser/code/lib-xp-item-blocks/src/main/resources
```
