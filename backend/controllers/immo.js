const puppeteer = require('puppeteer');


exports.getData = async (item) => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250 // slow down by 250ms
    })
    const page = await browser.newPage()

    // 2 - Naviguer jusqu'à l'URL cible
    await page.goto(item.url)
    await page.waitFor(1000) // fait une pause d'une seconde
    /*await page.click(
        '#recaptcha-anchor > div.recaptcha-checkbox-border',
    )*/
    await page.waitFor(1000) // fait une pause d'une seconde

    // 3 - Récupérer les données
    const resultImmo = await page.evaluate(immo => {

        let arrayTitle = Array.from(document.querySelectorAll(immo.title));
        let arrayPrice = Array.from(document.querySelectorAll(immo.price));
        let arrayLinks = Array.from(document.querySelectorAll(".Card__ContentZone-sc-7insep-3.gfORyM .CoveringLink-a3s3kt-0.dXJclF"));


        // On récupère le texte par objet de recherche
        arrayTitle = arrayTitle.map((title) => {
            return `${title.innerText}`;
        });

        arrayPrice = arrayPrice.map((price) => {
            return `${price.innerText}`;
        });


        arrayLinks = arrayLinks.map((link) => {
            return `${link.href}`;
        });



        let immos = [];

        if (arrayPrice.length === arrayTitle.length) {
            for (let i = 0; i < arrayTitle.length; i++) {
                immos.push({
                    title: arrayTitle[i],
                    price: arrayPrice[i],
                    link: arrayLinks[i]

                })

            }
        }

        return immos


    }, item);

    // 4 - Retourner les données (et fermer le navigateur)
    browser.close()


    return {
        resultImmo
    }
}