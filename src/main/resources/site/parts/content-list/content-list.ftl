[#-- @ftlvariable name="displayName" type="String" --]
[#-- @ftlvariable name="children" type="java.util.ArrayList<Object>" --]
<h1>${displayName}</h1>

<ul class="content-list">
  [#list children as child]
    <li>
      <a href="${child.url}">
        ${child.displayName}
      </a>
    </li>
  [/#list]
</ul>
