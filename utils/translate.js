function translate(query) {
  const translationType = localStorage.getItem("translationType");

  if (translationType === "baidu") {
    const appid = localStorage.getItem("appid");
    const secretKey = localStorage.getItem("secretKey");

    if (!appid || !secretKey) {
      alert("百度翻译api信息不全");
      return;
    }

    var salt = new Date().getTime();
    var from = "en";
    var to = "zh";
    var str1 = appid + query + salt + secretKey;
    var sign = MD5(str1);

    return new Promise((resolve) => {
      $.ajax({
        url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
        type: "get",
        dataType: "jsonp",
        data: {
          q: query,
          appid: appid,
          salt: salt,
          from: from,
          to: to,
          sign: sign,
        },
        success: function (data) {
          const result = data.trans_result[0].dst;
          resolve(result);
        },
      });
    });
  } else if (translationType === "google") {
    return new Promise((resolve) => {
      $.ajax({
        url: "https://translate.googleapis.com/translate_a/single",
        type: "get",
        data: {
          client: "gtx",
          dt: "t",
          sl: "en",
          tl: "zh-CN",
          q: query,
        },
        success: function (data) {
          const result = data[0][0][0];

          resolve(result);
        },
      });
    });
  } else {
    return Promise.reject(new Error("不支持对应翻译api"));
  }
}
