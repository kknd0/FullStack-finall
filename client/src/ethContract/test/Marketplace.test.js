const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
        })

        it('marketname good', async () => {
            const marketname = await marketplace.marketname()
            assert.equal(marketname, 'Dapp University Maretplace')
        })
    })
    describe('products', async () => {
        let result, productCount
        before(async () => {
            result = await marketplace.createProduct(
                'iphone',
                web3.utils.toWei('1', 'ether'),
                { from: seller }
            )
            productCount = await marketplace.productCount()
        })
        it('create product', async () => {
            assert.equal(productCount, 1)
            const event = result.logs[0].args
            assert.equal(
                event.id.toNumber(),
                productCount.toNumber(),
                'id is correct'
            )
            assert.equal(event.name, 'iphone', 'name is correct')
            assert.equal(
                event.price,
                web3.utils.toWei('1', 'ether'),
                'price is correct'
            )
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.purchased, false, 'condition is correct')

            //FAILURE: Product must have a name
            await marketplace.createProduct(
                '',
                web3.utils.toWei('1', 'ether'),
                { from: seller }
            ).should.be.rejected
            //FAILURE: Product must have a price
            await marketplace.createProduct('iphone', 0, { from: seller })
                .should.be.rejected
        })

        it('lists product', async () => {
            const product = await marketplace.products(productCount)
            assert.equal(productCount, 1)
            assert.equal(
                product.id.toNumber(),
                productCount.toNumber(),
                'id is correct'
            )
            assert.equal(product.name, 'iphone', 'name is correct')
            assert.equal(
                product.price,
                web3.utils.toWei('1', 'ether'),
                'price is correct'
            )
            assert.equal(product.owner, seller, 'owner is correct')
            assert.equal(product.purchased, false, 'condition is correct')
        })

        it('sells products', async () => {
            //Track the seller balance before purchase
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            // SUCCESS: BUYER makes purchase
            result = await marketplace.purchaseProduct(productCount, {
                from: buyer,
                value: web3.utils.toWei('1', 'ether'),
            })
            // Check logs
            const event = result.logs[0].args
            assert.equal(
                event.id.toNumber(),
                productCount.toNumber(),
                'id is correct'
            )
            assert.equal(event.name, 'iphone', 'name is correct')
            assert.equal(
                event.price,
                web3.utils.toWei('1', 'ether'),
                'price is correct'
            )
            assert.equal(event.owner, buyer, 'owner is correct')
            assert.equal(event.purchased, false, 'condition is correct')

            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1', 'ether')
            price = new web3.utils.BN(price)

            console.log(oldSellerBalance, newSellerBalance, price)
            const exepectedBalance = oldSellerBalance.add(price)

            assert.equal(
                newSellerBalance.toString(),
                exepectedBalance.toString()
            )

            //FAILURE : Tries to buy a product that does not exits
            await marketplace.purchaseProduct(99, { from: buyer,value: web3.utils.toWei('1', 'ether') }).should.be.rejected
            //FAILURE : not enough ehter
            await marketplace.purchaseProduct(productCount, { from: buyer,value: web3.utils.toWei('0.5', 'ether') }).should.be.rejected
            //FAILURE : buyer is seller
            await marketplace.purchaseProduct(productCount, { from: seller,value: web3.utils.toWei('1', 'ether') }).should.be.rejected
            
        })
    })
})
