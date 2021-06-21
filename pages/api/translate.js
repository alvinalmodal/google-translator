"use strict";

const _ = require("lodash");
const request = require("request-promise");

const translate = (sourceLang, targetLang, text) => {
  const data = {
    sl: sourceLang,
    tl: targetLang,
    q: text,
  };

  const url =
    "https://translate.google.com/translate_a/single" +
    "?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=" +
    targetLang +
    "&ie=UTF-8" +
    "&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";

  return request({
    method: "POST",
    uri: url,
    encoding: "UTF-8",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "User-Agent":
        "AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1",
    },
    form: data,
    json: true,
  })
    .then(function (json) {
      function Translation(json) {
        Object.assign(this, json);
        this.translation = this.sentences.reduce(
          (combined, trans) => combined + (trans.trans || ""),
          ""
        );
      }
      Translation.prototype.toString = function () {
        return this.translation;
      };

      const translation = new Translation(json);

      return translation;
    })
    .catch(function (err) {
      const newError = new Error(
        "Couldn't retrieve a valid JSON response. Perhaps the API has changed, please let us know."
      );
      newError.data = data;
      newError.statusCode = err.statusCode;
      newError.url = url;
      newError.body = err.error;
      throw newError;
    });
};

export default async (req, res) => {
  const { sourceLang, targetLang, query } = req.query;
  try {
    let translation = await translate(sourceLang, targetLang, query);
    res.status(200).json(translation);
  } catch (error) {
    res.status(400).json(error);
  }
};
