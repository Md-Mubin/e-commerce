function slugGenerator(slugTitle) {
  return slugTitle
    .toString()
    .toLowerCase()
    .normalize("NFD")                 // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, "")  // Remove diacritics
    .replace(/[^a-z0-9 -]/g, "")      // Remove invalid characters
    .trim()                           // Trim whitespace
    .replace(/\s+/g, "-")             // Replace spaces with -
    .replace(/-+/g, "-");             // Replace multiple - with single -
}

module.exports = slugGenerator