const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
router.get('/all', async (req, res) => {
  console.log('Scraping all products...');

  try {
    const products = [];

    
    // Logique de scraping pour 'protein.tn'

    const proteinResponse = await axios.get('https://protein.tn/shop/');
    const proteinHtml = proteinResponse.data;
    const protein$ = cheerio.load(proteinHtml);
    console.log('HTML loaded from protein.tn');

    protein$('.woocommerce-loop-product__title').each((i, title) => {
      console.log(`Processing product ${i}`);

      const url = protein$(title).find('a').attr('href');
      const name = protein$(title).find('a').text().trim();
      const priceParent = protein$(title).siblings('.price');
      const price = priceParent.find('.woocommerce-Price-amount').first().text().trim();
      const dpriceEl = priceParent.find('.woocommerce-Price-amount').last();
      const dprice = dpriceEl.length ? dpriceEl.text().trim() : null;
      const imageUrl = protein$(title).parent().prev().find('img').attr('src');

      products.push({
        name: name,
        price: price,
        dprice: dprice,
        url: url,
        imageUrl: imageUrl
      });

      console.log(`Added product ${i} from protein.tn`);
    });

    
    //Logique de scraping pour 'tuttosport.com.tn'

    const tuttoResponse = await axios.get('https://protein-shop-tunisia.tn/');
    const tuttoHtml = tuttoResponse.data;
    const tutto$ = cheerio.load(tuttoHtml);
    console.log('HTML loaded from protein.com.tn');

    tutto$('.product-title').each((i, title) => {
      console.log(`Processing product ${i}`);

      
      const url = tutto$(title).find('a').attr('href');
     const name = tutto$(title).find('a').text().trim();
     const priceParent = tutto$(title).siblings('.price');

  
      const price = priceParent.find('.woocommerce-Price-amount').first().text().trim();
      const dpriceEl = priceParent.find('.woocommerce-Price-amount').last();
      const dprice = dpriceEl.length ? dpriceEl.text().trim() : null;
      const imageUrl = tutto$(title).parent().prev().find('img').attr('data-src');

      products.push({
        name: name,
        price: price,
        dprice: dprice,
        url: url,
       imageUrl: imageUrl
      });

      console.log(`Added product ${i} from tuttosport.com.tn`);
    });

    












    console.log(`Found ${products.length} products from all sites`);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scraping products');
  }
});


module.exports = router;