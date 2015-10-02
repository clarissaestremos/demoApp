# Read more about app structure at http://docs.appgyver.com

module.exports =

  rootView:
    location: "http://localhost/index.html"

  drawers:
    right:
      id: "leftDrawer"
      location: "http://localhost/index.html"
      showOnAppLoad: false
    options:
      animation: "swingingDoor"