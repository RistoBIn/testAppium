var { expect } = require('chai');

describe('Appium Testing', () => {

    // Adding time out to make sure the app is load prior to test is run
    beforeEach(() => {
        // $("~app-root").waitForDisplayed(11000, false)
    });

    it('Photo from Camera-Picker Test', async => {
        $("~btnCamera").click();

        driver.pause(5000);
        $("~CUShutterButton").click();
        driver.pause(5000);
        $$("~UIButton")[1].click();
        driver.pause(5000);

        const status = $("~btntype").getText();
        expect(status).to.equal("camera");
    });

    it('Photo from Gallery-Picker Test', async => {
        $("~btnGallery").click();

        driver.pause(7000);
        driver.touchAction([{ action: 'press', x: 100, y: 100 }, 'release']);

        driver.pause(5000);
        const status = $("~btntype").getText();
        expect(status).to.equal("gallery");
    });

    it('File from Document-Picker Test', async => {
        $("~btnDocument").click();

        driver.pause(5000);
        driver.touchAction([{ action: 'press', x: 100, y: 400 }, 'release']);
        driver.pause(5000);

        const status = $("~btntype").getText();
        expect(status).to.equal("gallery");
    });
});