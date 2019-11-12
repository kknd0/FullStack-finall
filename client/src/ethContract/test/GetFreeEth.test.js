const GetFreeEth = artifacts.require('./GetFreeEth.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('GetFreeEth', ([manager,customer]) => {
    let getfreeeth

    before(async () => {
        getfreeeth = await GetFreeEth.deployed({from:manager})
      
    })
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await getfreeeth.address
            assert.notEqual(address, 0x0)
        })
        it('Has a manager', async () =>{
            const _manager = await getfreeeth.manager()
            assert.equal(_manager,manager)
        })
    })
    describe('donate', async () =>{
        it('can donate', async()=>{
            const result = await getfreeeth.donate({from:manager,value: web3.utils.toWei('1', 'ether')})
            const result1 = await getfreeeth.donate({ from: customer,value: web3.utils.toWei('1', 'ether') })
        })
    

    })
   

    describe('sendEth',async()=>{
        it('receive the eth', async ()=>{
            const oldCustomerBalance = await web3.eth.getBalance(customer) 
            const expectCustomerBalance = +(oldCustomerBalance) + 200000000000000000
           const result = await getfreeeth.sendEth(customer,{from:manager})
          
           const newCustomerBalance = await web3.eth.getBalance(customer)
            assert.equal(expectCustomerBalance,newCustomerBalance,'equal')
            await getfreeeth.sendEth(customer,{from:customer}).should.be.rejected
        })
    })
    describe('sendEth',async()=>{
        it('receive the eth', async ()=>{

           const result = await getfreeeth.check()
           const _result = result.toString()
           assert.equal(_result,web3.utils.toWei('1.8', 'ether'))
            
        })
    })

})



