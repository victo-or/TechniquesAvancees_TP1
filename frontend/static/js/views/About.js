import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('About')
    }

    async getHtml(){
        return `
        <h1>About</h1>

        <p>🚀 Welcome to Meme Stocks Insider, where the stonk market meets memery! 🦍</p>
        
        <p>At Meme Stocks Insider, we're dedicated to tracking the top 10 most volatile and meme-worthy stocks that are making waves in the market. We'll keep you updated on GME's next rocket launch, AMC's popcorn-powered rallies, and the wild rides of the stonk world.</p>

        <p>Don't miss out on the next big meme stock, short squeeze, or meme-worthy market moment. Ready to dive into the meme stock madness? Let's ride the waves 🌊 of financial 📈 memery to the moon! 🚀🌌🌕</p>
        `
    }
}