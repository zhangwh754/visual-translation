function createEditableBlock(content, style = "", isPlain = false) {
  const span = document.createElement("span");
  span.className = "block";
  span.setAttribute("contenteditable", "true");
  span.style = style;
  span.textContent = content;
  if (isPlain) span.dataset.type = "plain";
  return span;
}

function conventXMLTagsToHtml(XMLString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    XMLString.replaceAll("<br>", "<br/>"),
    "text/xml"
  );

  const rootContainer = document.createElement("div");

  const node = xmlDoc.firstChild;

  let style = "";

  Array.from(node.attributes).forEach(({ name, value }) => {
    if (name == "color") style += `color:#${value};`;
    if (name == "size") style += `font-size:${value}px;`;
    if (name == "face") style += `font-family:${value};`;
    if (name == "align") style += `text-align:${value};`;
  });

  const resultContainer = document.createElement(node.tagName);
  resultContainer.style = style;

  rootContainer.appendChild(resultContainer);

  // Traverse the XML and convert to HTML
  const nodes = xmlDoc.firstChild.childNodes;
  nodes.forEach((node) => {
    if (node.nodeType) {
      switch (node.tagName) {
        case "font":
          const color = node.getAttribute("color") || "";
          const size = node.getAttribute("size") || "";
          const face = node.getAttribute("face") || "";
          let style = "";

          if (color) style += `color:#${color};`;
          if (size) style += `font-size:${size}px;`;
          if (face) style += `font-family:${face};`;

          resultContainer.appendChild(
            createEditableBlock(node.textContent, style)
          );
          break;
        case "br":
          resultContainer.appendChild(document.createElement("br"));
          break;
        default:
          resultContainer.appendChild(
            createEditableBlock(node.textContent, "", true)
          );
      }
    }
  });

  return rootContainer.innerHTML;
}

function convertHtmlToXML(HTMLString) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(HTMLString, "text/html");

  const rootElement = document.createElement("div");
  const resultContainer = document.createElement(
    htmlDoc.body.childNodes[0].tagName
  );

  const rootStyle = htmlDoc.body.childNodes[0].style;
  const rootColor = rootStyle.color;
  const rootFace = rootStyle["font-family"];
  const rootSize = rootStyle["font-size"];
  const rootAlign = rootStyle["text-align"];

  if (rootColor) resultContainer.setAttribute("color", convertRGB(rootColor));
  if (rootFace) resultContainer.setAttribute("face", rootFace);
  if (rootSize) resultContainer.setAttribute("size", parseInt(rootSize));
  if (rootAlign) resultContainer.setAttribute("align", rootAlign);

  // 遍历 HTML 内容并转换为 XML
  const nodes = htmlDoc.body.childNodes[0];
  nodes.childNodes.forEach((node) => {
    if (node.nodeType) {
      switch (node.tagName?.toLowerCase()) {
        case "span":
          const isPlain = node.dataset?.type === "plain";

          if (isPlain) {
            resultContainer.appendChild(
              document.createTextNode(node.textContent)
            );
          } else {
            const font = document.createElement("font");
            font.textContent = node.textContent;

            const color = node.style.color;
            const face = node.style["font-family"];
            const size = node.style["font-size"];

            if (color) font.color = convertRGB(color);
            if (face) font.face = "Averia Serif";
            if (size) font.size = parseInt(size);

            resultContainer.appendChild(font);
          }
          break;
        case "br":
          resultContainer.appendChild(document.createElement("br"));
          break;
      }
    }
  });

  rootElement.appendChild(resultContainer); // 将转换的内容添加到根元素中

  return rootElement;
}

function convertRGB(rgbString) {
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  // 使用正则表达式执行匹配
  const match = rgbString.match(rgbRegex);

  let [_, r, g, b] = match;

  // 使用三元运算符确保每个颜色分量至少为0，最大为255
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // 使用toHexString方法将每个颜色分量转换为十六进制字符串
  const toHexString = function (str) {
    const hex = str.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  // 返回形如'#RRGGBB'的字符串
  return toHexString(r) + toHexString(g) + toHexString(b);
}

function replaceContentAttribute(xmlString, newValue) {
  // 使用 DOMParser 解析 XML 字符串
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "application/xml");

  // 查找 attribute 节点，并修改 id="Content" 的 value
  const contentAttribute = xmlDoc.querySelector('attribute[id="Content"]');
  if (contentAttribute) {
    contentAttribute.setAttribute("value", newValue);
  } else {
    console.warn("未找到 id 为 'Content' 的 attribute 节点。");
    return xmlString; // 未找到时返回原始 XML
  }

  // 使用 XMLSerializer 将修改后的 XML 转回字符串
  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
}
