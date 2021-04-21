// var { expect } = require('chai');

describe('Appium Testing', () => {

    // Adding time out to make sure the app is load prior to test is run
    beforeEach(() => {
        // $("~app-root").waitForDisplayed(11000, false)
    });

    it('Photo from Camera-Picker Test', async => {
        $("~btnCamera").click();

        driver.pause(5000);
        let selector = `type == 'XCUIElementTypeButton'`;
        let buttons = $$(`-ios predicate string:${selector}`);
        buttons[1].click();
        driver.pause(5000);

        driver.touchAction({ action: 'tap', x: 100, y: 100 });
        driver.pause(1000);

        selector = `type == 'XCUIElementTypeButton' AND label BEGINSWITH[c] 'Take'`;
        buttons = $$(`-ios predicate string:${selector}`);
        buttons[0].click();
        driver.pause(5000);

        selector = `type == 'XCUIElementTypeButton'`;
        buttons = $$(`-ios predicate string:${selector}`);
        buttons[1].click();
        driver.pause(5000);

        const elem = $("~imageview");
        expect(elem).toExist();
    });

    it('Photo from Gallery-Picker Test', async => {
        const fs = require('fs');
        const contents = fs.readFileSync('./images/AI.jpg', { encoding: 'base64' });
        driver.pushFile("/private/var/mobile/Media/DCIM//000.jpg", contents)

        $("~btnGallery").click();
        driver.pause(5000);

        driver.touchAction({ action: 'tap', x: 20, y: 200 });   // special for iPhone 11
        driver.pause(500);
        driver.touchAction({ action: 'tap', x: 50, y: 350 });   // special for iPhone 11
        driver.pause(5000);

        const elem = $("~imageview");
        expect(elem).toExist();
    });

    it('File from Document-Picker Test', async => {
        $("~btnDocument").click();

        driver.pause(5000);
        driver.touchAction({ action: 'tap', x: 20, y: 250 });   // special for iPhone 11
        driver.pause(500);

        driver.touchAction({ action: 'tap', x: 90, y: 225 });   // special for iPhone 11
        driver.pause(5000);

        const elem = $("~fileView");
        expect(elem).toExist();
    });
});