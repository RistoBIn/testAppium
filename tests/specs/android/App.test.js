var { expect } = require('chai');

describe('Appium Testing', () => {

    // Adding time out to make sure the app is load prior to test is run
    beforeEach(() => {
        // $("~app-root").waitForDisplayed(11000, false)
    });

    it('Photo from Camera-Picker Test', async => {
        $("~btnCamera").click();

        driver.pause(3000);
        driver.pressKeyCode(27);

        driver.pause(3000);
        driver.pressKeyCode(61);
        driver.pause(1000);
        driver.pressKeyCode(61);
        driver.pause(1000);
        driver.pressKeyCode(108);

        const status = $("~btntype").getText();
        expect(status).to.equal("camera");
    });

    it('Photo from Gallery-Picker Test', async => {
        const fs = require('fs');
        const contents = fs.readFileSync('./images/AI.jpg', { encoding: 'base64' });
        driver.pushFile("/mnt/sdcard/Pictures/test.jpg", contents)

        driver.pause(3000);
        
        $("~btnGallery").click();

        driver.pause(3000);
        driver.pressKeyCode(61);
        driver.pause(1000);
        driver.pressKeyCode(108);

        driver.pause(3000);
        driver.pressKeyCode(61);
        driver.pause(1000);
        driver.pressKeyCode(108);

        const status = $("~btntype").getText();
        expect(status).to.equal("gallery");
    });

    it('File from Document-Picker Test', async => {
        $("~btnDocument").click();

        let winRect = driver.getWindowRect();

        driver.pause(3000);
        driver.touchAction([{ action: 'press', x: winRect.width * 0.75, y: 400 }, 'release']);
        driver.pause(1000);
        driver.pressKeyCode(61);
        driver.pause(1000);
        driver.pressKeyCode(108);

        driver.pause(3000);
        driver.pressKeyCode(61);
        driver.pause(1000);
        driver.pressKeyCode(108);

        const status = $("~btntype").getText();
        expect(status).to.equal("document");
    });
});