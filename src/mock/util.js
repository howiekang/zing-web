const responseBody = {
    message: '',
    timestamp: 0,
    result: null,
    code: 0
}

export const builderPage = (options,consumerKey) => {
  let totalCount = 5000;
  const parameters = getQueryParameters(options)
  console.info('parameters',parameters)

  const result = [];
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push(consumerKey(tmpKey))
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

export const builder = (data, message, code = 0, headers = {}) => {
    responseBody.result = data
    if (message !== undefined && message !== null) {
        responseBody.message = message
    }
    if (code !== undefined && code !== 0) {
        responseBody.code = code
        responseBody._status = code
    }
    if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
        responseBody._headers = headers
    }
    responseBody.timestamp = new Date().getTime()
    return responseBody
}

export const getQueryParameters = (options) => {
    const url = options.url
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
    return options.body && JSON.parse(options.body)
}
