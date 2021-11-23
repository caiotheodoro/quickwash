const {Builder, By, Key, until} = require('selenium-webdriver');
let mydate = "Nov 29, 2021";
async function schedule() {
  let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/dashboard');
    await driver.findElement(By.className('MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root makeStyles-signIn-4 css-1uvhdni-MuiButtonBase-root-MuiButton-root')).click();
    await driver.manage().setTimeouts({implicit: 10000});
    await driver.findElement(By.id("Modelo")).sendKeys("Fusion", Key.RETURN);
    await driver.manage().setTimeouts({implicit: 10000});
    await driver.findElement(By.id("Placa")).sendKeys("ASA5680", Key.RETURN);
    await driver.manage().setTimeouts({implicit: 10000});
    await driver.findElement(By.id("Premium")).click();
    await driver.manage().setTimeouts({implicit: 10000});
    await driver.findElement(By.xpath('//*[@data-testid="CalendarIcon"]')).click();
    await driver.manage().setTimeouts({implicit: 10000});
    await driver.wait(until.elementLocated(By.xpath('//*[@aria-label="'+ mydate + '"]')), 10000).click();
    await driver.findElement(By.className('MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-173nj1u-MuiButtonBase-root-MuiIconButton-root')).click();
    await driver.findElement(By.xpath('//*[@data-testid="CalendarIcon"]')).click();
    await driver.findElement(By.id("Observacao")).sendKeys("Cuidado: O Porta-Luvas está quebrado", Key.RETURN);
    await driver.findElement(By.id("Dinheiro")).click();
    await driver.findElement(By.className("MuiButton-root MuiButton-text MuiButton-textSecondary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1r42udf-MuiButtonBase-root-MuiButton-root")).click();
}

schedule();