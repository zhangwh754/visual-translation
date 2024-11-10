$(function () {
  const originDom = $("#origin");
  const translationDom = $("#translation");
  let isComposite = false;

  originDom.on("input", function () {
    const xmlString = $(this).val();
    translationDom.val(xmlString);

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
    var contentAttribute = xmlDoc.querySelector('attribute[id="Content"]');
    var value = contentAttribute.getAttribute("value");

    const result = conventXMLTagsToHtml(value);
    console.log(result);

    $(".panel-2").html(result);

    $('.block[contenteditable="true"]').on("input", function () {
      setTimeout(() => {
        if (isComposite) return;
        const result = convertHtmlToXML($(this).parent().parent().html());

        console.log(result.innerHTML);

        const originVal = translationDom.val();
        const convertVal = replaceContentAttribute(originVal, result.innerHTML);

        translationDom.val(convertVal);

        $(".panel-4").html(result.innerHTML.replace(/size="[^"]*"\s*/g, ""));
      }, 0);
    });

    $('.block[contenteditable="true"]').on("compositionstart", function () {
      isComposite = true;
    });

    $('.block[contenteditable="true"]').on("compositionend", function () {
      isComposite = false;
    });
  });
});
