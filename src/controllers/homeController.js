let getAboutPage = (req, res) => {
  return res.render('homepage.ejs')
}

module.exports = {
  getAboutPage: getAboutPage
}