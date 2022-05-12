import type { App } from '@solid/community-server';
import { fetch } from 'cross-fetch';
import { instantiateFromConfig, getTestConfigPath, getDefaultVariables } from './Config';

const port = 3000;
const baseUrl = `http://localhost:${port}/`;

describe('A Solid server with react template rendering', (): void => {
  let app: App;

  beforeAll(async(): Promise<void> => {
    const instances = await instantiateFromConfig(
      'urn:solid-server:test:Instances',
      getTestConfigPath('react-registration.json'),
      getDefaultVariables(port, baseUrl),
    ) as Record<string, any>;
    ({ app } = instances);
    await app.start();
  });

  afterAll(async(): Promise<void> => {
    await app.stop();
  });

  describe('viewing the registration page', (): void => {
    it('renders the component configured with the RegistrationRoute.', async(): Promise<void> => {
      const res = await fetch(`${baseUrl}idp/register/`, {
        method: 'GET',
        headers: { accept: 'text/html' },
      });
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toBe('<div></div>');
    });
  });
});
