import { convert } from 'html-to-text';

export class Helpers {
  public static extractInnerContentFromHTMLString(htmlString: string) {
    return convert(htmlString);
  }
}
