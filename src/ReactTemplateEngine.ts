import * as React from "react";
import { renderToString } from 'react-dom/server';
import type { TemplateEngine, Template } from '@solid/community-server';
import { getTemplateFilePath } from '@solid/community-server';
import Dict = NodeJS.Dict;

/**
 * Fills in React templates.
 */
export class ReactTemplateEngine<T extends Dict<any> = Dict<any>> implements TemplateEngine<T> {

  public constructor() {}

  public async render(contents: T): Promise<string>;
  public async render<TCustom = T>(contents: TCustom, template: Template): Promise<string>;
  public async render<TCustom = T>(contents: TCustom, template?: Template): Promise<string> {
    const Component = template ? this.requireTemplate(template) : null;
    if (Component) {
      return renderToString(React.createElement(Component, contents))
    }

    return ''
  }

  private requireTemplate(template: Template): React.ComponentClass | undefined {
    if (typeof template !== 'object' || !('templateString' in template)) {
      try {
        return require(getTemplateFilePath(template)!).default;
      } catch {
        // Do nothing to return undefined
      }
    }
  }
}
