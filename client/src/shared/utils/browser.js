export const getTextContentsFromHtmlString = html => {
  let el = html.replace(/&lt;/g, "<");
  el = el.replace(/&gt;/g, ">");
  el = el.replace(/&quot;/g, "\"");
  el = el.replace(/&#10;/g, "");
  el = el.replace(/&amp;/g, "&");
  return el

};

export const copyToClipboard = value => {
  const $textarea = document.createElement("textarea");
  $textarea.value = value;
  document.body.appendChild($textarea);
  $textarea.select();
  document.execCommand("copy");
  document.body.removeChild($textarea);
};

export const isFocusedElementEditable = () =>
  !!document.activeElement.getAttribute("contenteditable") ||
  ["TEXTAREA", "INPUT"].includes(document.activeElement.tagName);
