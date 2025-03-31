[#-- @ftlvariable name="displayName" type="String" --]
[#-- @ftlvariable name="intro" type="String" --]
[#-- @ftlvariable name="media" type="Object" --]

<div class="article-header flow container-lg">
  <h1>${displayName}</h1>

  [#if intro?has_content]
    <div class="intro">${intro}</div>
	[/#if]
</div>
