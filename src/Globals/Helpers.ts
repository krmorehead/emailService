export class Helpers {
  public static extractInnerContentFromHTMLString(htmlString: string) {
    var span = document.createElement('span');
    span.innerHTML = htmlString;
    return span.textContent || span.innerText;
  };
}
