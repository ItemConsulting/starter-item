[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="blocks" type="String" --]

<div class="blocks-view">
  [#if title?has_content]
    <h2>${title}</h2>
  [/#if]

  ${blocks!""}
</div>
