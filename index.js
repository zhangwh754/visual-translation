$(function () {
  const originDom = $("#origin");
  const translationDom = $("#translation");
  const fileTypeSelect = $("select[name='origin']");

  fileTypeSelect.val(localStorage.getItem("fileType") || "lsx");

  let isComposite = false;

  fileTypeSelect.on("change", function () {
    localStorage.setItem("fileType", $(this).val());
  });

  originDom.on("input", function () {
    const xmlString = $(this).val();
    translationDom.val(xmlString);

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");

    if (fileTypeSelect.val() === "lsx") {
      var contentAttribute = xmlDoc.querySelector('attribute[id="Content"]');
      var value = contentAttribute.getAttribute("value");
    } else if (fileTypeSelect.val() === "xml") {
      var value = xmlDoc.firstChild.textContent;
    }

    const result = conventXMLTagsToHtml(value);
    console.log(result);

    $(".panel-2").html(result);

    $('.block[contenteditable="true"]').on("input", function () {
      setTimeout(() => {
        if (isComposite) return;
        const result = convertHtmlToXML($(this).parent().parent().html());

        console.log(result.innerHTML);

        const originVal = translationDom.val();
        const convertVal = replaceContentAttribute(originVal, result.innerHTML, fileTypeSelect.val() === "lsx");

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
