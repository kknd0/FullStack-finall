pragma solidity ^0.5.0;

contract Marketplace {
    string public marketname;
    uint public productCount = 0;
    mapping(uint => Product) public products; //products[1] ...
    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreate(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );
        event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        marketname = "Dapp University Maretplace";
    }

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, 'You product needs a name');
        require(_price > 0, 'need a price');
        //Make sure parameters are corret
        //Create an event
        //Trigger an event
        productCount++;
        products[productCount] = Product({
            id:productCount,
            name:_name,
            price:_price,
            owner:msg.sender,
            purchased:false
        });
        emit ProductCreate(productCount,_name,_price,msg.sender,false);
    }
    function purchaseProduct(uint _id) public payable{
        //Fetch the product
        Product memory _product = products[_id];
        //Fetch the owner
        address payable _seller = _product.owner;

        require(_product.id > 0 && _product.id <= productCount, 'product id invalid');
        //poroduct is valid
        require(msg.value >= _product.price, 'not enough money');

        require(!_product.purchased, 'sold');

        require(_seller != msg.sender, 'its your own product');

        //Require that there is enough Ether in the transaction
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        //Update the product
        products[_id] = _product;
        address(_seller).transfer(msg.value);
        //pay
        emit ProductPurchased(productCount,_product.name,_product.price,msg.sender,false);
         //Trigger an event
    }


}