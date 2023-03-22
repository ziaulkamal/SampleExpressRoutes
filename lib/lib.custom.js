function generateSlug(string) {
  return string.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()
}

function generateDates() {
  const originDate = new Date().toISOString()
  return originDate.slice(0, 10)
}

function uniqueString() {
    return Date.now()
}

module.exports = { generateSlug, generateDates }
