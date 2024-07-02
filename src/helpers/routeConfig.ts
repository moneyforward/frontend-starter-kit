export interface RouteConfig {
  key: string
  path: string
}

export const getHighlightRoute = (lng: string, pathname: string, routeConfigs: RouteConfig[]) => {
  let selectedKeys: string[] = []
  const selected = routeConfigs.find(route => `/${lng}${route.path}` === pathname)

  if (selected) {
    const basePath = selected.key.split('.')[0]
    selectedKeys = [basePath]
  }

  return {
    selectedKeys
  }
}
