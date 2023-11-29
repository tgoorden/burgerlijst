module.exports = function (eleventyConfig) {
    eleventyConfig.setLiquidOptions({
        dynamicPartials: false
    })

    eleventyConfig.addFilter('readableDate', function (content) {
        const result = content.split('T')
        const date = result[0].split('-')
        return `${date[2]}/${date[1]}/${date[0]} ${result[1]}`
    })

    return {
        passthroughFileCopy: true
    }
}
