import type { TemplateEngine, Template } from '@solid/community-server';
import { getTemplateFilePath } from '@solid/community-server';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Dict = NodeJS.Dict;

/**
 * Fills in React templates.
 */
export class ReactTemplateEngine<T extends Dict<any> = Dict<any>> implements TemplateEngine<T> {
  public async render(contents: T): Promise<string>;
  public async render<TCustom = T>(contents: TCustom, template: Template): Promise<string>;
  public async render<TCustom = T>(contents: TCustom, template?: Template): Promise<string> {
    const component = template ? this.requireTemplate(template) : null;
    if (component) {
      return renderToString(React.createElement(component, contents));
    }

    return '';
  }

  private requireTemplate(template: Template): React.ComponentClass | undefined {
    if (typeof template !== 'object' || !('templateString' in template)) {
      try {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        return require(getTemplateFilePath(template)!).default;
      } catch {
        // Do nothing to return undefined
      }
    }
  }
}
