pragma solidity ^0.5.0;

contract GetFreeEth{
    address public manager;

    constructor() public{
        manager = msg.sender;
    }
    modifier restricted(){
        require(msg.sender == manager,'manager only');
        _;
    }
    function sendEth(address payable _customer) public restricted {
        address(_customer).transfer(200000000000000000);
    }
    function donate() public payable returns(uint) {
        return msg.value;
    }
    function check() public view  restricted returns(uint)  {
       return address(this).balance;
    }
}