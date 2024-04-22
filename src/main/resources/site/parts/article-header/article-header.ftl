[#-- @ftlvariable name="displayName" type="String" --]
[#-- @ftlvariable name="intro" type="String" --]
[#-- @ftlvariable name="media" type="Object" --]

[#import "../../mixins/media/media.ftl" as Media]

<div class="article-header flow container-lg">
  [#if media?has_content]
    [@Media.render media=media /]
  [/#if]

  <h1>${displayName}</h1>

  [#if intro?has_content]
    <div class="intro">${intro}</div>
	[/#if]
</div>
