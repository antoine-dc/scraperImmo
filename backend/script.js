const puppeteer = require('puppeteer')

const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()

    // 2 - Naviguer jusqu'à l'URL cible
    await page.goto('http://books.toscrape.com/')
    await page.click(
        '#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img',
    )
    await page.waitFor(1000) // fait une pause d'une seconde

    // 3 - Récupérer les données
    const result = await page.evaluate(() => {
        let title = document.querySelector('h1').innerText
        let price = document.querySelector('.price_color').innerText
        return {
            title,
            price
        }
    })

    // 4 - Retourner les données (et fermer le navigateur)
    browser.close()
    return result
}

// Appelle la fonction getData() et affichage les données retournées
getData().then(value => {
    console.log(value)
})