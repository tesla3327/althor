const webshot = require('webshot');

const mobileOptions = {
  screenSize: {
    width: 375,
    height: 667,
  },
  userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
    + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};

const desktopOptions = {
  screenSize: {
    width: 1366,
    height: 768,
  },
};

const takeScreenshot = (hostname, mobile = false) => {
  const imgPath = `./images/${hostname}.${mobile ? 'mobile' : 'desktop'}.png`;

  webshot(hostname, imgPath, (mobile ? mobileOptions : desktopOptions), function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log((mobile ? 'Mobile' : 'Desktop') + ' screenshot saved!');
    }
  });

  return imgPath;
};

// const desktopScreen = (hostname) => {
//   const imgPath = `./images/${hostname}.desktop.png`;
//   webshot(hostname, imgPath, desktopOptions, function(err) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Desktop screenshot saved!');
//     }
//   });
//   return imgPath;
// };

// const mobileScreen = (hostname) => {
//   const imgPath = `./images/${hostname}.mobile.png`;
//   webshot(hostname, imgPath, mobileOptions, function(err) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Mobile screenshot saved!');
//     }
//   });
//   return imgPath;
// };

const screenshots = (hostname) => {
  console.log('Taking screenshots...');

  return {
    desktop: takeScreenshot(hostname, false),
    mobile: takeScreenshot(hostname, true),
  };
};

module.exports = {
  screenshots,
};
