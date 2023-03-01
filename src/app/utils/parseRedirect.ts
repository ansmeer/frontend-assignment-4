export type Redirect = {
  route: string;
  queryParams?: { queryParams: { page: number } };
};

export function parseRedirectTo(redirectInput?: string): Redirect {
  const defaultRoute = { route: 'catalogue' };

  if (!redirectInput) {
    return defaultRoute;
  }

  const urlParts = redirectInput.split('?');

  if (urlParts.length === 1) {
    return { route: urlParts[0] };
  }

  const params = urlParts[1].split('=');
  const pageIndex = params.indexOf('page');
  const pageValue = parseInt(params[pageIndex + 1], 10);

  return {
    route: 'catalogue',
    queryParams: { queryParams: { page: pageValue } },
  };
}
