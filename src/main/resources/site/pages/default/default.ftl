[#-- @ftlvariable name="locale" type="String" --]
[#-- @ftlvariable name="contentTypeClass" type="String" --]
[#-- @ftlvariable name="displayName" type="String" --]
[#-- @ftlvariable name="themeColor" type="String" --]
[#-- @ftlvariable name="headerRegion" type="com.enonic.xp.region.Region" --]
[#-- @ftlvariable name="mainRegion" type="com.enonic.xp.region.Region" --]
[#-- @ftlvariable name="asideRegion" type="com.enonic.xp.region.Region" --]
[#-- @ftlvariable name="footerColumns" type="java.util.ArrayList<String>" --]
[#-- @ftlvariable name="homeUrl" type="String" --]
[#-- @ftlvariable name="logoUrl" type="String" --]
[#-- @ftlvariable name="headerMenu" type="Object" --]
[#-- @ftlvariable name="showWithAside" type="java.lang.Boolean" --]

<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="view-transition" content="same-origin" />
  <meta name="theme-color" content="${themeColor}" />
  <link href="[@assetUrl path='styles/bundle.css'/]" rel="stylesheet">
  <link href="[@assetUrl path='styles/blocks.min.css'/]" rel="stylesheet">
  <link rel="icon" type="image/png" sizes="16x16" href="[@assetUrl path='images/favicon.svg'/]"/>
  <link rel="shortcut icon" data-th-href="[@assetUrl path='images/favicon.ico'/]"/>

  <script type="module" src="[@assetUrl path='hotwired__turbo/8.0.4/dist/turbo.es2017-esm.js'/]"></script>
  <script type="module" src="[@assetUrl path='blocks.mjs'/]"></script>
  <script type="module" src="[@assetUrl path='main.mjs'/]" data-turbo-track="reload"></script>

  <title>${displayName}</title>
</head>
<body class="default-page">
  <header class="page-header">
    <div class="container-lg">
      [#if logoUrl?has_content]
        <a
          id="home-link"
          href="${homeUrl}"
          data-turbo-preload
          data-turbo-permanent
        >
          <img
            src="${logoUrl}"
            alt="[@localize key="default.goToHomepage" locale=locale /]">
        </a>
      [/#if]

      <nav
        class="page-header-menu"
        [#if headerMenu.ariaLabel?has_content]aria-label="${headerMenu.ariaLabel}"[/#if]>

        [#list headerMenu.menuItems as menuItem]
          [@menuEntry menuItem=menuItem lastItem=headerMenu.menuItems?size == menuItem_index /]
        [/#list]
      </nav>
    </div>
  </header>

  <main id="main">
    <div class="article ${contentTypeClass}">

      <header data-portal-region="header" class="region-header">
        [#if headerRegion?has_content]
          [#list headerRegion.components as comp]
            [@component path=comp.path /]
          [/#list]
        [/#if]
      </header>

      <div data-portal-region="main" class="region-main">
        [#if mainRegion?has_content]
          [#list mainRegion.components as comp]
            [@component path=comp.path /]
          [/#list]
        [/#if]
      </div>
    </div>

    [#if showWithAside]
      <aside data-portal-region="aside" class="region-aside">
        [#if asideRegion?has_content]
          [#list asideRegion.components as comp]
            [@component path=comp.path /]
          [/#list]
        [/#if]
      </aside>
    [/#if]
  </main>

  <footer class="page-footer">
    <div class="container-lg">
      <div class="richtext">
        [#list footerColumns as column]
          [@processHtml value=column /]
        [/#list]
      </div>
    </div>
  </footer>
</body>
</html>

[#macro menuEntry menuItem lastItem=false]
  <a
    href="${menuItem.url}"
    [#if menuItem.newWindow]target="${menuItem.newWindow}"[/#if]
    [#if menuItem.isActive]aria-current="page"[/#if]>

    ${menuItem.title}
  </a>
[/#macro]
