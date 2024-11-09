$(function () {
  const originDom = $("#origin");
  const translationDom = $("#translation");

  setTimeout(() => {
    const str = `<node id="TranslatedStringKey">
      <attribute id="Content" type="28" handle="hb910a935gbbcdg49bfga26fgdf13e794d3f0" value="&lt;p align='left'&gt;&lt;font color='a8a8a8' size='21' face='Averia Serif'&gt;Click on this node again to allocate it, granting:&lt;/font&gt;&lt;br&gt;&lt;font color='cb9780'&gt;»&lt;/font&gt; Unlock basic activation of &lt;font color=&quot;ebc808&quot; size=&quot;20&quot; face=&quot;Averia Serif&quot;&gt;Prosperity&lt;/font&gt;.&lt;br&gt;&lt;font color='cb9780'&gt;»&lt;/font&gt; &lt;font color=&quot;ebc808&quot; size=&quot;20&quot; face=&quot;Averia Serif&quot;&gt;Prosperity&lt;/font&gt; grants +1 Leadership.&lt;br&gt;&lt;font color='cb9780'&gt;»&lt;/font&gt; +1 Constitution.&lt;/p&gt;" />
      <attribute id="ExtraData" type="23" value="" />
      <attribute id="Speaker" type="22" value="" />
      <attribute id="Stub" type="19" value="True" />
      <attribute id="UUID" type="22" value="AMER_UI_Ascension_Life_TheRabbit_Node_3.0" />
      </node>`;

    originDom.val(str);
    translationDom.val(str);
    originDom.trigger("input");
  }, 1000);

  originDom.on("input", function () {
    const xmlString = $(this).val();

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
    var contentAttribute = xmlDoc.querySelector('attribute[id="Content"]');
    var value = contentAttribute.getAttribute("value");

    console.log(value);
  });
});
