// import { JSDOM } from 'jsdom';

import {JSDOM} from "jsdom";

export class Helpers {
  public static extractInnerContentFromHTMLString(htmlString: string) {
    return htmlString;
  }

  // public static extractInnerContentFromHTMLString(htmlString: string) {
  //   const doc = new JSDOM('').window.document;
  //   var span = doc.createElement('span');
  //   span.innerHTML = htmlString;
  //   return span.textContent || span.innerText;
  // }
}