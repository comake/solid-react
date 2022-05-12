import { ReactTemplateEngine } from '../../src/ReactTemplateEngine';

describe('A ReactTemplateEngine', (): void => {
  const contents = { data: 'a&b' };
  let templateEngine: ReactTemplateEngine;

  beforeEach((): void => {
    templateEngine = new ReactTemplateEngine();
  });

  it('uses the passed template.', async(): Promise<void> => {
    await expect(templateEngine.render(contents, { templateFile: './test/util/App.tsx' }))
      .resolves.toBe('<div>a&amp;b</div>');
  });

  it('returns an empty string if passed a templateString.', async(): Promise<void> => {
    await expect(templateEngine.render(contents, { templateString: 'app' }))
      .resolves.toBe('');
  });

  it('returns an empty string if the component does not exist.', async(): Promise<void> => {
    await expect(templateEngine.render(contents, { templateFile: 'foobar.tsx' }))
      .resolves.toBe('');
  });

  it('returns an empty string if not provided a template.', async(): Promise<void> => {
    await expect(templateEngine.render(contents))
      .resolves.toBe('');
  });
});
