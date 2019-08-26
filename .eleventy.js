const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})
const markdownItAttrs = require('markdown-it-attrs')

module.exports = async function (eleventyConfig) {
  eleventyConfig.addFilter('md', function (content) {
    md.use(markdownItAttrs)
    return md.render(content)
  })

  eleventyConfig.addFilter('readableDate', function (content) {
    const result = content.split('T')
    const date = result[0].split('-')
    return `${date[2]}/${date[1]}/${date[0]} ${result[1]}`
  })

  eleventyConfig.addPassthroughCopy('assets')

  return {
    passthroughFileCopy: true
  }
}
