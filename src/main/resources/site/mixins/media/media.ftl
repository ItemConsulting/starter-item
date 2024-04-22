[#macro render media class=""]
  [#if media.mediaSrc?has_content]
    <figure>
      <img
        src="${media.mediaSrc}"
        alt="${media.altText!""}"
        [#if class?has_content]class="${class}"[/#if]>

      [#if media.caption?has_content]
      <figcaption>${media.caption}</figcaption>
      [/#if]
    </figure>
  [/#if]
[/#macro]
