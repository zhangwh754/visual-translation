$(function () {
  const originDom = $("#origin");
  const translationDom = $("#translation");
  const fileTypeSelect = $("select[name='origin']");

  fileTypeSelect.val(localStorage.getItem("fileType") || "lsx");

  let isComposite = false;

  fileTypeSelect.on("change", function () {
    localStorage.setItem("fileType", $(this).val());
  });

  $("#action-1").on("click", function () {
    $(".block")
      .last()
      .after(
        `<span class="block" contenteditable="true" data-type="plain" style="" draggable="true"></span>`
      );
  });
  $("#action-2").on("click", function () {
    const val = translationDom.val();

    navigator.clipboard.writeText(val).then(() => {
      console.log("Text copied to clipboard");

      $("#action-2").toggleClass("active");

      setTimeout(() => {
        $("#action-2").toggleClass("active");
      }, 2000);
    });
  });
  $("#action-3").on("click", function () {
    const isEditable = $(".block").first().attr("contenteditable") === "true";

    $(".block").attr("contenteditable", !isEditable);
  });

  originDom.on("input", function () {
    $(".button").removeAttr("disabled");
    $(".panel-4").html("暂无修改");

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

    $(".panel-2").html(result);

    $('.block[contenteditable="true"]').on("input", function () {
      setTimeout(() => {
        if (isComposite) return;
        const result = convertHtmlToXML($(this).parent().parent().html());

        const originVal = translationDom.val();
        const convertVal = replaceContentAttribute(
          originVal,
          result.innerHTML,
          fileTypeSelect.val() === "lsx"
        );

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

  $(".panel-2").on("dragstart", ".block", dragstart);
  $(".panel-2").on("dragend", ".block", dragend);
  $(".panel-2").on("dragover", ".block", dragover);
  $(".panel-2").on("dragleave", ".block", dragleave);
  $(".panel-2").on("drop", ".block", drop);

  $(".panel-2").on("dbcl", ".block", drop);
});
