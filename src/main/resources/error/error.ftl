[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="imageSrc" type="String" --]
[#-- @ftlvariable name="message1" type="String" --]
[#-- @ftlvariable name="message2" type="String" --]
[#-- @ftlvariable name="debugMessage" type="String" --]
[#-- @ftlvariable name="locale" type="String" --]
[#-- @ftlvariable name="footerColumns" type="java.util.ArrayList<String>" --]
[#-- @ftlvariable name="homeUrl" type="String" --]
[#-- @ftlvariable name="headerMenu" type="java.util.ArrayList" --]
[#-- @ftlvariable name="searchUrl" type="String" --]
<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="view-transition" content="same-origin" />
    <meta name="theme-color" content="#020880" />

    <link href="[@assetUrl path='styles/bundle.css'/]" rel="stylesheet">
    <link rel="icon" type="image/svg" sizes="16x16" href="[@assetUrl path='images/favicon.svg'/]"/>
    <link rel="shortcut icon" data-th-href="[@assetUrl path='images/favicon.ico'/]"/>

    <script type="module" src="[@assetUrl path='hotwired__turbo/8.0.2/dist/turbo.es2017-esm.js'/]"></script>

    <title>${title!""}</title>
  </head>

  <body class="error-page">
    [#if debugMessage?has_content]
      <div class="debug-message">${debugMessage}</div>
    [/#if]

    <main id="main" class="error">
      <div class="error-info">
        <h1>${title!""}</h1>

        <p>${message1!""}</p>

        ${message2!""}
      </div>

      [#if imageSrc?has_content]
        <img src="${imageSrc}" alt="" />
      [/#if]
    </main>
  </body>
</html>
